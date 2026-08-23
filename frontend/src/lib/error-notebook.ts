/**
 * Cuaderno de errores: registro cross-categoría de ejercicios fallados en
 * cualquier Sprint (mathematik, zahlenreihen, analyse-programmierung,
 * konzentration, logik, coordenadas, competencias-digitales,
 * escenarios-trabajo, redaccion). Vernetztes Denken y Vorstellungsvermögen
 * no usan el mismo patrón de Sprint de opción múltiple y no escriben acá.
 *
 * La clave y el algoritmo de deduplicación (`makeMistakeId`) están
 * reimplementados en vanilla JS dentro de cada app HTML (public/apps/*.html,
 * dentro del shim `window.reportMistake`/`window.resolveMistake`) porque esas
 * apps no pueden importar este módulo. Si se cambia el formato de `id` acá,
 * hay que cambiarlo también ahí — son 9 archivos.
 */

export interface MistakeEntry {
  id: string;
  categoryId: string;
  categoryTitle: string;
  type: string;
  typeLabel: string;
  context: string;
  text: string;
  correct: string;
  chosen: string;
  explain: string;
  timestamp: number;
  seenCount: number;
}

export const MISTAKES_KEY = 'brainbit-mistakes';
export const MAX_MISTAKES = 200;

/** Debe coincidir byte a byte con el id que arma cada app HTML. */
export function makeMistakeId(categoryId: string, type: string, text: string): string {
  return `${categoryId}::${type}::${String(text).slice(0, 80)}`;
}

export function isMistakeEntry(value: unknown): value is MistakeEntry {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.categoryId === 'string' &&
    typeof v.type === 'string' &&
    typeof v.text === 'string' &&
    typeof v.correct === 'string' &&
    typeof v.timestamp === 'number'
  );
}

/** Robusta ante lo que sea que haya en localStorage: null, string suelta, array con basura. */
export function parseMistakes(raw: unknown): MistakeEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isMistakeEntry);
}

export function removeMistake(list: MistakeEntry[], id: string): MistakeEntry[] {
  return list.filter((m) => m.id !== id);
}

export function mistakesByCategory(list: MistakeEntry[]): Map<string, MistakeEntry[]> {
  const map = new Map<string, MistakeEntry[]>();
  for (const m of list) {
    const arr = map.get(m.categoryId) ?? [];
    arr.push(m);
    map.set(m.categoryId, arr);
  }
  return map;
}
