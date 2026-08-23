/**
 * Simulacro de examen con revisión final (Fase 7).
 *
 * Solo cubre lo que ya tiene motor TS propio (mathematik, zahlenreihen,
 * konzentration, analyse-programmierung) — las apps HTML standalone quedan
 * fuera, igual que en Sprint IA. Es exactamente el alcance que el propio
 * roadmap.md de Codex proponía para esta función (idea rescatada, contenido
 * descartado — ver checkpoint.md).
 */
import type { Exercise } from '../engines/types';

export interface ExamAnswer {
  exercise: Exercise;
  selected: string;
  correct: boolean;
}

export interface ExamResult {
  total: number;
  correct: number;
  /** null si el simulacro no tuvo preguntas (no debería pasar, pero es más
      seguro que dividir por cero silenciosamente). */
  accuracy: number | null;
  /** Solo las falladas, en el orden en que se respondieron — es la revisión. */
  review: ExamAnswer[];
}

export function buildExamResult(answers: ExamAnswer[]): ExamResult {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  return {
    total,
    correct,
    accuracy: total > 0 ? Math.round((correct / total) * 100) : null,
    review: answers.filter((a) => !a.correct),
  };
}
