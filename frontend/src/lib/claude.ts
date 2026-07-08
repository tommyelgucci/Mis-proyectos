import Anthropic from '@anthropic-ai/sdk';

const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;

// dangerouslyAllowBrowser: la clave queda expuesta en el navegador; solo para
// uso personal. Para publicar la app, mover esta llamada a un backend proxy.
export const client = apiKey
  ? new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
  : null;

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

export async function chatWithClaude(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  category?: string
): Promise<string> {
  if (!client) {
    throw new Error('Claude API key no configurado en .env');
  }

  const systemMsg =
    category && category !== 'general'
      ? `${SYSTEM_PROMPT}\n\nEnfoque actual: ${category}`
      : SYSTEM_PROMPT;

  const response = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 1024,
    system: systemMsg,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  const textContent = response.content.find((c) => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in Claude response');
  }

  return textContent.text;
}
