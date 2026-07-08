/**
 * Sincronización de progreso con Supabase.
 * - syncOnLogin(): pull remoto → fusión con localStorage → push del resultado.
 *   Esto importa automáticamente el historial legacy de las 6 apps.
 * - startAutoSync(): cada cambio de progreso (postMessage de las apps) se
 *   sube con debounce de 2s.
 */
import { supabase } from '../lib/supabase';
import { useProgressStore, LEGACY_KEYS } from './storage-bridge';
import { mergeProgress } from './merge-progress';

export type SyncState = 'idle' | 'syncing' | 'synced' | 'error';

let syncListeners: Array<(s: SyncState) => void> = [];
let current: SyncState = 'idle';

function setSyncState(s: SyncState): void {
  current = s;
  syncListeners.forEach((fn) => fn(s));
}

export function getSyncState(): SyncState {
  return current;
}

export function onSyncState(fn: (s: SyncState) => void): () => void {
  syncListeners.push(fn);
  return () => {
    syncListeners = syncListeners.filter((f) => f !== fn);
  };
}

async function pushKeys(userId: string, keys: string[]): Promise<void> {
  if (!supabase) return;
  const rows = keys
    .map((key) => {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      try {
        return { user_id: userId, key, data: JSON.parse(raw), updated_at: new Date().toISOString() };
      } catch {
        return null;
      }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
  if (!rows.length) return;
  const { error } = await supabase.from('progress').upsert(rows);
  if (error) throw error;
}

/** Pull + fusión + push. Llamar al iniciar sesión. */
export async function syncOnLogin(userId: string): Promise<void> {
  if (!supabase) return;
  setSyncState('syncing');
  try {
    const { data: remoteRows, error } = await supabase
      .from('progress')
      .select('key, data');
    if (error) throw error;

    const remote = new Map<string, unknown>((remoteRows ?? []).map((r) => [r.key, r.data]));
    const store = useProgressStore.getState();

    for (const key of LEGACY_KEYS) {
      const rawLocal = localStorage.getItem(key);
      let local: unknown = null;
      if (rawLocal !== null) {
        try {
          local = JSON.parse(rawLocal);
        } catch {
          local = null;
        }
      }
      const merged = mergeProgress(local, remote.get(key) ?? null);
      if (merged != null) {
        localStorage.setItem(key, JSON.stringify(merged));
        store.setProgress(key, merged);
      }
    }

    await pushKeys(userId, [...LEGACY_KEYS]);
    setSyncState('synced');
  } catch (e) {
    console.error('syncOnLogin:', e);
    setSyncState('error');
  }
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const pendingKeys = new Set<string>();
let autoSyncStop: (() => void) | null = null;

/** Sube cambios de progreso con debounce mientras haya sesión. */
export function startAutoSync(userId: string): void {
  stopAutoSync();
  autoSyncStop = useProgressStore.subscribe((state, prev) => {
    for (const key of Object.keys(state.progress)) {
      if (state.progress[key] !== prev.progress[key]) pendingKeys.add(key);
    }
    if (!pendingKeys.size) return;
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const keys = [...pendingKeys];
      pendingKeys.clear();
      setSyncState('syncing');
      pushKeys(userId, keys)
        .then(() => setSyncState('synced'))
        .catch((e) => {
          console.error('autoSync:', e);
          setSyncState('error');
        });
    }, 2000);
  });
}

export function stopAutoSync(): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = null;
  pendingKeys.clear();
  autoSyncStop?.();
  autoSyncStop = null;
}
