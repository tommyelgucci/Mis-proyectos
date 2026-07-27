import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import aiRoutes from './routes/ai.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// SnapDeploy sirve el contenedor detrás de su proxy: sin esto req.ip sería
// siempre la IP del proxy y el rate limit de /api/ai trataría a todo el
// mundo como un solo cliente. Se confía solo en el primer salto.
app.set('trust proxy', Number(process.env.TRUST_PROXY ?? 1));

// CORS cerrado por defecto: en producción frontend y backend comparten origen,
// así que no hace falta ninguna cabecera cross-origin. Dejarlo en `true`
// (reflejar cualquier origen) permitiría que cualquier web llamara a nuestro
// proxy de IA desde el navegador de sus visitantes. Solo se abre si se
// declara FRONTEND_URL explícitamente (desarrollo local).
app.use(
  cors({
    origin: process.env.FRONTEND_URL || false,
    credentials: true,
  })
);
app.use(express.json({ limit: '64kb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/ai', aiRoutes);

// Sirve el build de frontend/ (copiado a ./public por el Dockerfile). En
// desarrollo local ese directorio no existe — el frontend corre aparte con
// `npm run dev` y su proxy de Vite reenvía /api aquí (ver frontend/vite.config.ts).
const staticDir = path.join(__dirname, 'public');
const indexHtml = path.join(staticDir, 'index.html');
if (fs.existsSync(indexHtml)) {
  app.use(express.static(staticDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(indexHtml);
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ BrainBit backend running on http://localhost:${PORT}`);
});
