import { Router } from 'express';

const router = Router();
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

router.get('/status', (req, res) => {
  res.json({ enabled: Boolean(GROQ_API_KEY) });
});

router.post('/complete', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(503).json({ error: 'IA no configurada en el servidor (falta GROQ_API_KEY)' });
  }
  const { messages, maxTokens, temperature } = req.body || {};
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages debe ser un array' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        max_tokens: maxTokens ?? 1024,
        temperature: temperature ?? 0.7,
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
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error desconocido' });
  }
});

export default router;
