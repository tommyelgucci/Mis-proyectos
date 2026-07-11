import { Router } from 'express';

const router = Router();
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const VALID_LEVELS = new Set(['A1', 'A2', 'B1', 'B2']);
const MAX_COUNT = 10;

router.get('/status', (req, res) => {
  res.json({ enabled: Boolean(GROQ_API_KEY) });
});

function buildPrompt(topic, level, count) {
  return `Eres un generador de ejercicios de inglés para hispanohablantes que estudian con la app Aloenglish (nivel MCER ${level}).

Tema pedido por el estudiante: "${topic}"

Genera exactamente ${count} preguntas de práctica en español → inglés sobre ese tema, apropiadas para el nivel ${level}. Mezcla preguntas de opción múltiple ("mc") y de completar el espacio ("fill").

Responde ÚNICAMENTE con un JSON válido (sin texto antes ni después, sin bloques de código markdown) con esta forma exacta:
{"questions":[
  {"t":"mc","q":"texto de la pregunta en español o mixto","o":["opción A","opción B","opción C","opción D"],"a":0,"x":"explicación breve en español de por qué es correcta"},
  {"t":"fill","q":"texto de la pregunta con un espacio a completar","b":"respuesta correcta en inglés","x":"explicación breve en español"}
]}

Reglas:
- "a" es el índice (0-3) de la opción correcta dentro de "o".
- Exactamente 4 opciones por pregunta "mc", todas plausibles, solo una correcta.
- "b" en preguntas "fill" es una sola palabra o frase corta en inglés (sin comillas extra).
- "x" siempre en español, 1-2 frases.
- No repitas la misma pregunta dos veces.
- No incluyas ninguna clave adicional fuera de "questions".`;
}

function extractJSON(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

function sanitizeQuestions(questions) {
  if (!Array.isArray(questions)) return [];
  return questions
    .filter((q) => q && (q.t === 'mc' || q.t === 'fill') && typeof q.q === 'string' && typeof q.x === 'string')
    .filter((q) => {
      if (q.t === 'mc') return Array.isArray(q.o) && q.o.length === 4 && Number.isInteger(q.a) && q.a >= 0 && q.a <= 3;
      return typeof q.b === 'string' && q.b.trim().length > 0;
    });
}

router.post('/generate-exercise', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(503).json({ error: 'IA no configurada en el servidor (falta GROQ_API_KEY)' });
  }
  const { topic, level, count } = req.body || {};
  if (typeof topic !== 'string' || !topic.trim()) {
    return res.status(400).json({ error: 'topic es requerido' });
  }
  const cleanLevel = VALID_LEVELS.has(level) ? level : 'A1';
  const cleanCount = Math.min(MAX_COUNT, Math.max(1, Number.isInteger(count) ? count : 5));

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: 'Eres un generador de ejercicios de inglés. Respondes solo con JSON válido.' },
          { role: 'user', content: buildPrompt(topic.trim().slice(0, 200), cleanLevel, cleanCount) },
        ],
        max_tokens: 1800,
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    });

    if (!groqRes.ok) {
      const text = await groqRes.text().catch(() => '');
      return res
        .status(502)
        .json({ error: `Groq error (${groqRes.status}): ${text || groqRes.statusText}` });
    }

    const data = await groqRes.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return res.status(502).json({ error: 'Respuesta de Groq sin contenido de texto' });
    }

    const parsed = extractJSON(content);
    const questions = sanitizeQuestions(parsed?.questions);
    if (!questions.length) {
      return res.status(502).json({ error: 'La IA no devolvió preguntas con un formato válido. Intenta de nuevo.' });
    }
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error desconocido' });
  }
});

export default router;
