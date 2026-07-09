/**
 * Cliente de IA sobre Hugging Face Inference (router OpenAI-compatible),
 * usado por el tutor (Tutor.tsx) y el generador de ejercicios (ai-exercises.ts).
 *
 * Gratis con límites (no ilimitado): requiere un token de
 * https://huggingface.co/settings/tokens. El modelo es configurable vía
 * VITE_HF_MODEL; por defecto uno instruct multilingüe razonable.
 *
 * dangerouslyAllowBrowser (implícito): el token queda expuesto en el bundle
 * del navegador. Aceptable para uso personal; para publicar a terceros, mover
 * estas llamadas a un backend/edge function.
 */

const apiKey = import.meta.env.VITE_HF_API_KEY as string | undefined;
const model =
  (import.meta.env.VITE_HF_MODEL as string | undefined) || 'Qwen/Qwen2.5-7B-Instruct';

export const aiEnabled = Boolean(apiKey);

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function chatCompletion(
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {}
): Promise<string> {
  if (!apiKey) {
    throw new Error('Hugging Face API key no configurada (VITE_HF_API_KEY)');
  }

  const res = await fetch('https://router.huggingface.co/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: opts.maxTokens ?? 1024,
      temperature: opts.temperature ?? 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Hugging Face API error (${res.status}): ${text || res.statusText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    throw new Error('Respuesta de Hugging Face sin contenido de texto');
  }
  return content;
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
