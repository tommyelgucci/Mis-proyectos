/**
 * Carreras (tracks) que BrainBit prepara. Cada categoría declara a qué
 * carrera(s) pertenece (`tracks` en Study.tsx y progress-stats.ts) — algunas,
 * como Vernetztes Denken o Konzentration, son parte del temario de ambas y
 * no se duplican, solo se muestran en los dos filtros.
 *
 * Nombres genéricos a propósito (regla del §1 de BRAINBIT_MASTER.md): nunca
 * el nombre real del examen comercial, solo el de la Lehre EFZ y una
 * descripción genérica de la prueba de aptitud.
 */

export type TrackId = 'ict' | 'wirtschaft';

export interface TrackMeta {
  id: TrackId;
  label: string;
  subtitle: string;
}

export const TRACKS: TrackMeta[] = [
  {
    id: 'ict',
    label: 'Informatiker/in EFZ',
    subtitle: 'Applikationsentwicklung · ICT-Eignungstest',
  },
  {
    id: 'wirtschaft',
    label: 'Digitales Business EFZ',
    subtitle: 'Eignungstest Wirtschaft & Administration',
  },
];

export const DEFAULT_TRACK: TrackId = 'ict';

export function isTrackId(value: unknown): value is TrackId {
  return value === 'ict' || value === 'wirtschaft';
}

/** A qué carrera(s) pertenece cada motor de engines/index.ts (Sprint IA, Clase con IA).
    Los ids de motor no siempre coinciden con el id de categoría de Study.tsx
    (p.ej. 'analyse' vs 'analyse-programmierung'), así que este mapa es propio. */
const ENGINE_TRACKS: Record<string, TrackId[]> = {
  mathematik: ['ict', 'wirtschaft'],
  zahlenreihen: ['ict'],
  konzentration: ['ict', 'wirtschaft'],
  analyse: ['ict'],
};

/** Desconocido → visible en ambas: mejor mostrar de más que ocultar un motor nuevo por olvido. */
export function engineTracks(engineId: string): TrackId[] {
  return ENGINE_TRACKS[engineId] ?? ['ict', 'wirtschaft'];
}
