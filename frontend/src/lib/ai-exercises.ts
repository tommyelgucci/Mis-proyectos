/**
 * Fase 5 — Generación de ejercicios con IA, con verificación obligatoria.
 *
 * Flujo (BRAINBIT_MASTER §8): prompt con few-shot de los generadores TS →
 * parsear JSON → invariantes → verifyExercise() (derivación independiente) →
 * si falla, regenerar (máx. MAX_ATTEMPTS) registrando cada rechazo.
 *
 * Ningún ejercicio llega al usuario sin pasar la verificación.
 */
import { checkAIEnabled, chatCompletion } from './ai';
import type { Exercise } from '../engines/types';
import { ENGINES } from '../engines';
import { verifyExercise, VERIFIABLE_TYPES } from '../engines/verifiers';

const MAX_ATTEMPTS = 3;

export interface AIGenResult {
  exercise: Exercise;
  /** Intentos consumidos (1 = aceptado a la primera). */
  attempts: number;
  /** Motivos de los rechazos previos, si los hubo. */
  rejected: string[];
}

/** Tipos de un motor elegibles para generación IA (solo los verificables). */
export function aiTypesFor(engineId: string): string[] {
  const engine = ENGINES[engineId];
  if (!engine) return [];
  return Object.keys(engine.generators).filter((t) => VERIFIABLE_TYPES.includes(t));
}

function buildPrompt(engineId: string, type: string): string {
  const spec = ENGINES[engineId].generators[type];
  // few-shot: 2 ejemplos reales del generador curado (incluyen meta, que el
  // verificador necesita en series/analyse/konzentration)
  const examples = [spec.fn(), spec.fn()];
  return [
    `Genera UN ejercicio nuevo de tipo "${type}" (${spec.label}) para un examen de aptitud ICT.`,
    `Debe seguir EXACTAMENTE el mismo formato JSON, estilo, idioma y estructura de enunciado que estos dos ejemplos (varía solo los números/valores, manteniendo los patrones de texto al pie de la letra, porque un verificador automático parsea el enunciado):`,
    '',
    JSON.stringify(examples[0], null, 2),
    '',
    JSON.stringify(examples[1], null, 2),
    '',
    'Reglas obligatorias:',
    '- "correct" debe ser matemáticamente correcta y estar incluida en "options".',
    '- Las opciones deben ser únicas (2-4) y los distractores plausibles.',
    '- Si los ejemplos incluyen "meta", tu ejercicio debe incluirla con la misma estructura y coherente con el enunciado.',
    '- Responde SOLO con el objeto JSON, sin markdown ni texto adicional.',
  ].join('\n');
}

function parseExercise(raw: string): Exercise | string {
  const text = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  let obj: unknown;
  try {
    obj = JSON.parse(text);
  } catch {
    return 'la respuesta no es JSON válido';
  }
  const ex = obj as Exercise;
  if (
    typeof ex !== 'object' || ex === null ||
    typeof ex.type !== 'string' ||
    typeof ex.text !== 'string' ||
    typeof ex.correct !== 'string' ||
    !Array.isArray(ex.options) ||
    ex.options.some((o) => typeof o !== 'string')
  ) {
    return 'JSON con forma inválida (faltan campos de Exercise)';
  }
  if (typeof ex.explain !== 'string') ex.explain = '';
  return ex;
}

/**
 * Genera un ejercicio con IA y lo verifica. Lanza Error si la API no está
 * configurada o si tras MAX_ATTEMPTS ningún candidato pasó la verificación.
 */
export async function generateAIExercise(engineId: string, type: string): Promise<AIGenResult> {
  if (!(await checkAIEnabled())) throw new Error('IA no configurada en el servidor (falta GROQ_API_KEY)');
  if (!aiTypesFor(engineId).includes(type)) {
    throw new Error(`El tipo "${type}" no tiene verificador — no es elegible para IA`);
  }

  const rejected: string[] = [];
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const raw = await chatCompletion(
      [{ role: 'user', content: buildPrompt(engineId, type) }],
      { maxTokens: 1500, temperature: 0.8 }
    );

    const parsed = parseExercise(raw);
    if (typeof parsed === 'string') {
      rejected.push(parsed);
      continue;
    }
    // forzar el tipo pedido: el verificador dispatcha por ex.type
    parsed.type = type;

    const err = verifyExercise(parsed);
    if (err) {
      rejected.push(err);
      continue;
    }
    return { exercise: parsed, attempts: attempt, rejected };
  }

  throw new Error(
    `IA rechazada ${MAX_ATTEMPTS} veces para "${type}": ${rejected.join(' | ')}`
  );
}
