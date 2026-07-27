/**
 * Proxy a Groq. El token vive solo aquí (variable de entorno del contenedor),
 * nunca en el bundle del navegador.
 *
 * Ojo: este endpoint es alcanzable desde internet en cuanto la app se
 * despliega, así que NO puede ser un reenvío ciego — sin límites, cualquiera
 * que descubra la URL tendría un LLM gratis a cuenta de nuestra cuota de Groq.
 * De ahí la validación de forma, los topes y el rate limit de abajo.
 */
import { Router } from 'express';

const router = Router();
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Topes de la petición. Los usos reales de la app quedan holgados dentro:
// ai-exercises pide 1500 tokens, lesson 800, el tutor 1024 (default).
const MAX_TOKENS_CAP = 2048;
const MAX_MESSAGES = 40;
const MAX_CHARS = 24_000; // suma de todos los contenidos
const GROQ_TIMEOUT_MS = 30_000;
const ROLES = new Set(['system', 'user', 'assistant']);

// Rate limit por IP, en memoria. Suficiente para un despliegue de un solo
// contenedor como SnapDeploy (no hay varias réplicas que compartir estado).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 60;
const hits = new Map();

function rateLimit(req, res, next) {
  const now = Date.now();
  const ip = req.ip || 'desconocida';
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else if (entry.count >= RATE_MAX) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: `Demasiadas peticiones. Vuelve a intentarlo en ${Math.ceil(retryAfter / 60)} min.`,
    });
  } else {
    entry.count++;
  }

  // Purga perezosa: sin esto el Map crece sin límite en un proceso de larga vida.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }
  next();
}

/** Devuelve la lista de mensajes saneada, o un string con el motivo del rechazo. */
function validateMessages(messages) {
  if (!Array.isArray(messages)) return 'messages debe ser un array';
  if (messages.length === 0) return 'messages no puede estar vacío';
  if (messages.length > MAX_MESSAGES) return `messages excede el máximo de ${MAX_MESSAGES}`;

  let chars = 0;
  const clean = [];
  for (const m of messages) {
    if (typeof m !== 'object' || m === null) return 'cada mensaje debe ser un objeto';
    if (!ROLES.has(m.role)) return 'role inválido (debe ser system, user o assistant)';
    if (typeof m.content !== 'string' || m.content.length === 0) {
      return 'content debe ser un string no vacío';
    }
    chars += m.content.length;
    if (chars > MAX_CHARS) return `el contenido total excede ${MAX_CHARS} caracteres`;
    clean.push({ role: m.role, content: m.content });
  }
  return clean;
}

// Solo acepta números reales: con Number() de por medio, `null` y `''` se
// convertirían en 0 (finito) y machacarían el valor por defecto en vez de
// caer a él.
function clamp(value, min, max, fallback) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

router.get('/status', (req, res) => {
  res.json({ enabled: Boolean(GROQ_API_KEY) });
});

router.post('/complete', rateLimit, async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(503).json({ error: 'IA no configurada en el servidor (falta GROQ_API_KEY)' });
  }

  const { messages, maxTokens, temperature } = req.body || {};
  const validated = validateMessages(messages);
  if (typeof validated === 'string') {
    return res.status(400).json({ error: validated });
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
        messages: validated,
        max_tokens: clamp(maxTokens, 1, MAX_TOKENS_CAP, 1024),
        temperature: clamp(temperature, 0, 2, 0.7),
      }),
      // fetch de Node no tiene timeout por defecto: sin esto, un cuelgue de
      // Groq deja la petición abierta indefinidamente.
      signal: AbortSignal.timeout(GROQ_TIMEOUT_MS),
    });

    if (!groqRes.ok) {
      const text = await groqRes.text().catch(() => '');
      // El cuerpo del error de Groq puede traer detalles de la cuenta: se
      // registra en el servidor, pero al cliente solo le llega el código.
      console.error(`Groq error ${groqRes.status}: ${text}`);
      return res
        .status(502)
        .json({ error: `El servicio de IA respondió con error (${groqRes.status})` });
    }

    const data = await groqRes.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return res.status(502).json({ error: 'Respuesta de IA sin contenido de texto' });
    }
    res.json({ content });
  } catch (err) {
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
      return res.status(504).json({ error: 'El servicio de IA tardó demasiado en responder' });
    }
    console.error('Error contactando con Groq:', err);
    res.status(500).json({ error: 'Error contactando con el servicio de IA' });
  }
});

export default router;
