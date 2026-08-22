import { create } from 'zustand';
import { MISTAKES_KEY, parseMistakes, removeMistake, type MistakeEntry } from '../lib/error-notebook';

/**
 * Puente de progreso: las apps legacy (en iframe) envían su progreso
 * vía postMessage cada vez que guardan. Este store mantiene el snapshot
 * y servirá para el dashboard unificado y la sincronización con Supabase.
 *
 * También recibe el cuaderno de errores (type:'mistake') por el mismo canal:
 * cada app ya deduplica y recorta a 200 entradas en localStorage antes de
 * avisar, así que acá solo hace falta reemplazar el snapshot completo.
 */

export interface ProgressSnapshot {
  [storageKey: string]: unknown;
}

interface ProgressState {
  progress: ProgressSnapshot;
  mistakes: MistakeEntry[];
  setProgress: (key: string, value: unknown) => void;
  setMistakes: (list: MistakeEntry[]) => void;
  removeMistakeEntry: (id: string) => void;
}

export const LEGACY_KEYS = [
  'vernetztes-denken-progress',
  'analyse-programmierung-progress',
  'konzentration-merkfaehigkeit-progress',
  'mathematik-progress',
  'zahlenreihen-progress',
  'vorstellungsvermoegen-progress',
  'logik-progress',
  'coordenadas-progress',
  'competencias-digitales-progress',
  'escenarios-trabajo-progress',
  'redaccion-progress',
] as const;

export const useProgressStore = create<ProgressState>((set) => ({
  progress: loadInitialProgress(),
  mistakes: loadInitialMistakes(),
  setProgress: (key, value) =>
    set((state) => ({ progress: { ...state.progress, [key]: value } })),
  setMistakes: (list) => set({ mistakes: list }),
  removeMistakeEntry: (id) =>
    set((state) => {
      const next = removeMistake(state.mistakes, id);
      try {
        localStorage.setItem(MISTAKES_KEY, JSON.stringify(next));
      } catch {
        /* localStorage puede fallar en modo privado; el store igual queda al día */
      }
      return { mistakes: next };
    }),
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

function loadInitialMistakes(): MistakeEntry[] {
  const raw = localStorage.getItem(MISTAKES_KEY);
  if (raw === null) return [];
  try {
    return parseMistakes(JSON.parse(raw));
  } catch {
    return [];
  }
}

interface BridgeMessage {
  source: 'brainbit-app';
  type: 'progress' | 'mistake';
  key: string;
  value: string;
}

function isBridgeMessage(data: unknown): data is BridgeMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as BridgeMessage).source === 'brainbit-app' &&
    ((data as BridgeMessage).type === 'progress' || (data as BridgeMessage).type === 'mistake') &&
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
    if (event.data.type === 'mistake') {
      useProgressStore.getState().setMistakes(parseMistakes(value));
    } else {
      useProgressStore.getState().setProgress(event.data.key, value);
    }
  });
}
