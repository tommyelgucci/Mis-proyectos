/**
 * "Clase con IA" — narra un ejercicio YA VERIFICADO (motor curado, no
 * generación IA) paso a paso, como una clase de YouTube: clara, entusiasta,
 * sin relleno.
 *
 * Importante: la IA nunca calcula ni inventa el resultado — el ejercicio ya
 * es correcto por construcción (mismo motor que pasó 1000 casos de
 * verificación por tipo). Su único trabajo es REDACTAR una explicación
 * pedagógica de la solución que ya tenemos (`exercise.correct` +
 * `exercise.explain`). Por eso no hace falta pasar el resultado por
 * verifyExercise() aquí — no hay nada nuevo que verificar.
 *
 * Si la IA no está disponible o su respuesta no se puede parsear, se cae a
 * un guion mínimo construido directo desde el texto ya verificado — la
 * función nunca se rompe, en el peor caso narra `text` + `explain` tal cual.
 */
import { chatCompletion } from './ai';
import type { Exercise } from '../engines/types';

export interface LessonStep {
  title: string;
  narration: string;
}

function fallbackScript(exercise: Exercise): LessonStep[] {
  return [
    { title: exercise.typeLabel, narration: exercise.context ? `${exercise.context}. ${exercise.text}` : exercise.text },
    { title: 'Solución', narration: `La respuesta es ${exercise.correct}. ${exercise.explain}` },
  ];
}

function buildPrompt(exercise: Exercise): string {
  return [
    'Eres un profesor explicando en video, estilo clase de YouTube bien hecha:',
    'claro, entusiasta, directo, sin relleno ni repetir el enunciado innecesariamente.',
    '',
    'Aquí tienes un ejercicio YA RESUELTO CORRECTAMENTE (no cambies el resultado,',
    'no inventes datos nuevos, solo explica estos pasos ya calculados de forma',
    'pedagógica en español):',
    '',
    JSON.stringify(
      {
        enunciado: exercise.text,
        contexto: exercise.context ?? null,
        respuestaCorrecta: exercise.correct,
        explicacionTecnica: exercise.explain,
      },
      null,
      2
    ),
    '',
    'Divide tu explicación en 3 a 5 pasos cortos, cada uno con un título breve y',
    'una narración hablada (1-3 frases, lenguaje natural para narrar en voz alta,',
    'nada de símbolos raros ni markdown). El último paso debe cerrar con la',
    'respuesta final de forma clara.',
    '',
    'Responde SOLO con un array JSON de objetos {"title": "...", "narration": "..."},',
    'sin markdown ni texto adicional.',
  ].join('\n');
}

function parseSteps(raw: string): LessonStep[] | null {
  const text = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  let obj: unknown;
  try {
    obj = JSON.parse(text);
  } catch {
    return null;
  }
  if (!Array.isArray(obj) || obj.length === 0) return null;
  const steps: LessonStep[] = [];
  for (const item of obj) {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof (item as LessonStep).title !== 'string' ||
      typeof (item as LessonStep).narration !== 'string'
    ) {
      return null;
    }
    steps.push({ title: (item as LessonStep).title, narration: (item as LessonStep).narration });
  }
  return steps;
}

/** Nunca lanza: si la IA falla o no está disponible, devuelve el fallback. */
export async function generateLessonScript(exercise: Exercise): Promise<LessonStep[]> {
  try {
    const raw = await chatCompletion(
      [{ role: 'user', content: buildPrompt(exercise) }],
      { maxTokens: 800, temperature: 0.7 }
    );
    const steps = parseSteps(raw);
    return steps ?? fallbackScript(exercise);
  } catch {
    return fallbackScript(exercise);
  }
}
