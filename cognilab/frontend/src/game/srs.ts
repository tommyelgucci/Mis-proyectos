// Repetición espaciada de las flashcards (SM-2 simplificado).
//
// Vive acá y no dentro de Flashcards.tsx para poder testearlo sin montar el
// componente: es la regla que decide cuándo vuelve a aparecer cada tarjeta.
import type { SaveData } from "./storage";

export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsState {
  due: string; // YYYY-MM-DD
  interval: number; // días
  ease: number;
}

/** El ease nunca baja de acá: por debajo, los intervalos se estancan en 1 día. */
export const MIN_EASE = 1.3;
export const DEFAULT_EASE = 2.5;

export function nextInterval(
  grade: Grade,
  prevInterval: number,
  ease: number,
): { interval: number; ease: number } {
  switch (grade) {
    // interval 0 = vuelve a tocar hoy mismo.
    case "again":
      return { interval: 0, ease: Math.max(MIN_EASE, ease - 0.2) };
    case "hard":
      return { interval: Math.max(1, Math.round(prevInterval * 1.2)), ease: Math.max(MIN_EASE, ease - 0.15) };
    case "good":
      return { interval: prevInterval ? Math.round(prevInterval * ease) : 1, ease };
    case "easy":
      return { interval: prevInterval ? Math.round(prevInterval * ease * 1.4) : 3, ease: ease + 0.1 };
  }
}

/** Suma días a una fecha YYYY-MM-DD respetando el calendario local.
 *
 * Con setDate en vez de sumar milisegundos: en los cambios de hora un día no
 * dura 24 h y la aritmética de timestamps cae en la fecha equivocada. */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return formatDay(d);
}

export function formatDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Aplica una calificación y devuelve el nuevo estado de la tarjeta. */
export function gradeCard(prev: SrsState | undefined, grade: Grade, today: string): SrsState {
  const { interval, ease } = nextInterval(grade, prev?.interval ?? 0, prev?.ease ?? DEFAULT_EASE);
  return { interval, ease, due: addDays(today, interval) };
}

/** Una tarjeta toca hoy si nunca se vio o si su fecha ya venció. */
export function isDue(srs: SaveData["srs"], cardId: number | string, today: string): boolean {
  const state = srs[cardId];
  return !state || state.due <= today;
}
