---
title: Alodeutsch
emoji: 🌟
colorFrom: yellow
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# Alodeutsch

App de aprendizaje de alemán con Ola, tu compañera de estudio.

## Space dinámico (Docker)

El Space corre un backend FastAPI (`server.py`) que sirve la app y agrega:

- **IA para Ola** (`POST /api/ola`): respuestas reales vía Hugging Face
  Inference API. Requiere el Secret `HF_TOKEN` (token de HF con permiso
  Read). Sin token, Ola usa el sistema de keywords local — la app nunca
  se rompe.
- **Contraseña opcional**: Secret `APP_PASSWORD`. Si está configurado,
  la app pide login antes de cargar. Sin él, la app es pública.

Secrets se configuran en Settings → Variables and secrets del Space.

Para uso offline: descargar `alodeutsch.html` y abrirlo en el navegador
(funciona 100% sin servidor, con keywords en vez de IA).

## Deploy

La app vive en `alodeutsch/` dentro del monorepo, pero el Space la recibe en su
raíz: `.github/workflows/sync-alodeutsch-hf.yml` hace `cd alodeutsch` antes de
empujar, así que este README y el `Dockerfile` quedan donde HF los busca. Se
dispara en cada push a `main` que toque `alodeutsch/**`.

La raíz del repo no se usa para esta app — ahí vive el `Dockerfile` de BrainBit,
que SnapDeploy exige encontrar en la raíz.

## Telc Coach y cursos Kontext

- `kontext-b2.html` / `kontext-c1.html`: cursos Intensiv independientes. Envían cada respuesta y su estado a la app
  (por `postMessage` al abrirlos desde ella y por `BroadcastChannel` en el mismo origen).
- `telc-coach.js` (+ `telc-coach-data.js`, `kontext-extra.js`): módulo que añade, para B1/B2/C1,
  diario de errores con repaso espaciado (Leitner), simulacros por parte, corrector de Schreiben,
  práctica de Sprechen, Hören con voz del navegador, tarjetas Kontext deduplicadas y copia de seguridad.
- `POST /api/coach` (opcional, requiere `HF_TOKEN`): corrección de Schreiben/Sprechen y compañero de diálogo.
  Límite de 20 peticiones por minuto y cliente. Sin token todo funciona con revisión local.
- `kontext-extra.js` se regenera con `python3 tools/build_kontext_extra.py` si cambian los cursos Kontext.
- Los tiempos y pesos de los simulacros son orientativos (versión reducida); verifica los criterios de tu convocatoria telc.
