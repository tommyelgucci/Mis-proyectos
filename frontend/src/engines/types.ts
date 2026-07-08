/**
 * Interfaz común de todos los generadores de ejercicios (brief §3.3).
 * La respuesta correcta SIEMPRE se calcula, nunca se escribe a mano.
 * Los distractores son errores reales calculados.
 */
export interface Exercise {
  type: string;
  typeLabel: string;
  text: string;
  context?: string;
  options: string[];
  correct: string;
  explain: string;
  /** Datos extra específicos del motor (p.ej. terms/diffs en Zahlenreihen
      para la revelación visual de estructura). */
  meta?: Record<string, unknown>;
}

export type Generator = () => Exercise;

export interface GeneratorSpec {
  fn: Generator;
  label: string;
}

export type GeneratorMap = Record<string, GeneratorSpec>;
