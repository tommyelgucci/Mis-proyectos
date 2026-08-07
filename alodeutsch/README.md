---
title: Alodeutsch
emoji: 🌟
colorFrom: yellow
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# Mis-proyectos

**Alodeutsch** — app de aprendizaje de alemán con Ola, tu compañera de estudio.

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
