/**
 * Registro central de motores. Todos comparten la interfaz Exercise,
 * por lo que son componibles en un sprint mixto (Modo Examen — brief §7).
 */
import type { Exercise, GeneratorMap } from './types';
import { pick, shuffle } from './random';
import { MATHEMATIK_GENERATORS } from './mathematik';
import { ZAHLENREIHEN_GENERATORS } from './zahlenreihen';
import { KONZENTRATION_GENERATORS } from './konzentration';
import { ANALYSE_GENERATORS } from './analyse';

export type { Exercise, Generator, GeneratorSpec, GeneratorMap } from './types';
export { ri, pick, shuffle } from './random';
export { MATHEMATIK_GENERATORS } from './mathematik';
export { ZAHLENREIHEN_GENERATORS } from './zahlenreihen';
export { KONZENTRATION_GENERATORS } from './konzentration';
export { ANALYSE_GENERATORS } from './analyse';

export const ENGINES: Record<string, { label: string; generators: GeneratorMap }> = {
  mathematik: { label: 'Mathematik', generators: MATHEMATIK_GENERATORS },
  zahlenreihen: { label: 'Zahlenreihen', generators: ZAHLENREIHEN_GENERATORS },
  konzentration: { label: 'Konzentration', generators: KONZENTRATION_GENERATORS },
  analyse: { label: 'Analyse & Programmierung', generators: ANALYSE_GENERATORS },
};

/** Genera un sprint mixto tomando ejercicios de todas las categorías dadas. */
export function mixedSprint(n: number, engineIds: string[] = Object.keys(ENGINES)): Exercise[] {
  const qs: Exercise[] = [];
  for (let i = 0; i < n; i++) {
    const engine = ENGINES[engineIds[i % engineIds.length]];
    const gens = Object.values(engine.generators);
    qs.push(pick(gens).fn());
  }
  return shuffle(qs);
}
