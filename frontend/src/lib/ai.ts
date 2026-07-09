/**
 * Cliente de IA — habla con NUESTRO backend (backend/routes/ai.js), que a su
 * vez proxya a Hugging Face Inference. El token de HF vive solo en el
 * servidor: nunca se expone en el bundle del navegador.
 *
 * En desarrollo local, el proxy de Vite reenvía /api al backend en :5000
 * (ver frontend/vite.config.ts). En producción (Docker Space), backend y
 * frontend se sirven desde el mismo origen.
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

let statusPromise: Promise<boolean> | null = null;

/** Consulta una sola vez (cacheada) si el backend tiene la IA configurada. */
export function checkAIEnabled(): Promise<boolean> {
  if (!statusPromise) {
    statusPromise = fetch('/api/ai/status')
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d) => Boolean(d.enabled))
      .catch(() => false);
  }
  return statusPromise;
}

export async function chatCompletion(
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {}
): Promise<string> {
  const res = await fetch('/api/ai/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      maxTokens: opts.maxTokens,
      temperature: opts.temperature,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Error del servidor (${res.status})`);
  }
  if (typeof data.content !== 'string') {
    throw new Error('Respuesta del servidor sin contenido de texto');
  }
  return data.content;
}

export const SYSTEM_PROMPT = `Eres un tutor especializado en el examen ICT-Eignungstest de Informática (Applikationsentwicklung).

Tu rol es ayudar a los estudiantes a prepararse para el examen explicando conceptos en español, resolviendo dudas sobre:
- Matemáticas aplicadas (porcentajes, fracciones, estimaciones, inversas, directas)
- Series numéricas (aritmética, geométrica, Fibonacci, etc.)
- Análisis de pseudocódigo y lógica de programación
- Concentración y memoria (espacial, temporal)
- Razonamiento en red (resolución de problemas complejos)

Estilo de enseñanza:
- Explica paso a paso, con ejemplos concretos
- Adapta el nivel a la dificultad del tema
- Usa analogías cuando sea útil
- Haz preguntas de verificación para comprobar comprensión
- Ofrece ejercicios prácticos sugeridos

Si el estudiante pregunta sobre algo fuera del examen, redirígelo amablemente al material del examen.

Idioma: Español (Switzerland alemánico context).`;

export async function chatWithTutor(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  category?: string
): Promise<string> {
  const systemMsg =
    category && category !== 'general'
      ? `${SYSTEM_PROMPT}\n\nEnfoque actual: ${category}`
      : SYSTEM_PROMPT;

  return chatCompletion([{ role: 'system', content: systemMsg }, ...messages]);
}
