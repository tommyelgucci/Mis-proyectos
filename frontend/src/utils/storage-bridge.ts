import { create } from 'zustand';

/**
 * Puente de progreso: las 6 apps legacy (en iframe) envían su progreso
 * vía postMessage cada vez que guardan. Este store mantiene el snapshot
 * y servirá para el dashboard unificado y la sincronización con Supabase.
 */

export interface ProgressSnapshot {
  [storageKey: string]: unknown;
}

interface ProgressState {
  progress: ProgressSnapshot;
  setProgress: (key: string, value: unknown) => void;
}

export const LEGACY_KEYS = [
  'vernetztes-denken-progress',
  'analyse-programmierung-progress',
  'konzentration-merkfaehigkeit-progress',
  'mathematik-progress',
  'zahlenreihen-progress',
  'vorstellungsvermoegen-progress',
  'logik-progress',
] as const;

export const useProgressStore = create<ProgressState>((set) => ({
  progress: loadInitialProgress(),
  setProgress: (key, value) =>
    set((state) => ({ progress: { ...state.progress, [key]: value } })),
}));

function loadInitialProgress(): ProgressSnapshot {
  const snapshot: ProgressSnapshot = {};
  for (const key of LEGACY_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      try {
        snapshot[key] = JSON.parse(raw);
      } catch {
        snapshot[key] = raw;
      }
    }
  }
  return snapshot;
}

interface BridgeMessage {
  source: 'brainbit-app';
  type: 'progress';
  key: string;
  value: string;
}

function isBridgeMessage(data: unknown): data is BridgeMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as BridgeMessage).source === 'brainbit-app' &&
    (data as BridgeMessage).type === 'progress' &&
    typeof (data as BridgeMessage).key === 'string'
  );
}

let listening = false;

/** Llamar una vez al arrancar la app (idempotente). */
export function startStorageBridge(): void {
  if (listening) return;
  listening = true;
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;
    if (!isBridgeMessage(event.data)) return;
    let value: unknown = event.data.value;
    try {
      value = JSON.parse(event.data.value);
    } catch {
      /* se guarda como string */
    }
    useProgressStore.getState().setProgress(event.data.key, value);
  });
}
