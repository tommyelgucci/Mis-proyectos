import { Router } from 'express';

const router = Router();
const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

router.get('/status', (req, res) => {
  res.json({ enabled: Boolean(HF_API_KEY) });
});

router.post('/complete', async (req, res) => {
  if (!HF_API_KEY) {
    return res.status(503).json({ error: 'IA no configurada en el servidor (falta HF_API_KEY)' });
  }
  const { messages, maxTokens, temperature } = req.body || {};
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages debe ser un array' });
  }

  try {
    const hfRes = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: HF_MODEL,
        messages,
        max_tokens: maxTokens ?? 1024,
        temperature: temperature ?? 0.7,
      }),
    });

    if (!hfRes.ok) {
      const text = await hfRes.text().catch(() => '');
      return res
        .status(502)
        .json({ error: `Hugging Face error (${hfRes.status}): ${text || hfRes.statusText}` });
    }

    const data = await hfRes.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return res.status(502).json({ error: 'Respuesta de Hugging Face sin contenido de texto' });
    }
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error desconocido' });
  }
});

export default router;
