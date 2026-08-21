export interface Question {
  id: number;
  origQ: string;
  domain: string;
  question: string;
  options: Record<string, string>;
  correct: string;
  explanation: string;
  isTrap: boolean;
  sourceFile: string;
}

export interface QuickCard {
  id: number;
  domain: string;
  front: string;
  back: string;
}

export interface AudioCard {
  id: number;
  domain: string;
  domainColor: string;
  topic: string;
  shortTitle: string;
  content: string;
  keyPoint: string;
}

export type QuizModeId =
  | "practice"
  | "exam"
  | "lightning"
  | "survival"
  | "boss"
  | "traps"
  | "failed"
  | "daily";

/** Una pregunta ligada a un caso de estudio: mismo formato de opciones que
 * Question, pero identificada por string (p.ej. "CASO01-Q3") en vez de un id
 * numérico global del banco. */
export interface CaseStudyQuestion {
  id: string;
  question: string;
  options: Record<string, string>;
  correct: string;
  explanation: string;
}

/** Bloque de "estudio de caso" al estilo del examen real: un escenario largo
 * (con contexto de negocio, arquitectura actual y a veces código/config) y un
 * bloque fijo de preguntas que se responden en orden, sin poder regresar a
 * revisar una ya contestada. */
export interface CaseStudy {
  id: string;
  title: string;
  domain: string;
  icon: string;
  scenario: string;
  questions: CaseStudyQuestion[];
}
