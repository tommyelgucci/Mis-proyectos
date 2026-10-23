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

## Test Coach y cursos Kontext

- `kontext-b2.html` / `kontext-c1.html`: cursos Intensiv independientes. Envían cada respuesta y su estado a la app
  (por `postMessage` al abrirlos desde ella y por `BroadcastChannel` en el mismo origen).
- Las lecciones, los «Trucos» y el guion de Hörverstehen de C1 de los cursos Kontext se pueden escuchar con la voz del navegador
  (alemán para ejemplos y vocabulario, español para la explicación), con pausa y velocidad ajustable.
- `test-coach.js` (+ `test-coach-data.js`, `kontext-extra.js`): módulo que añade, para B1/B2/C1,
  diario de errores con repaso espaciado (Leitner), simulacros por parte, corrector de Schreiben,
  práctica de Sprechen, Hören con voz del navegador, tarjetas Kontext deduplicadas y copia de seguridad.
- `POST /api/coach` (opcional, requiere `HF_TOKEN`): corrección de Schreiben/Sprechen y compañero de diálogo.
  Límite de 20 peticiones por minuto y cliente. Sin token todo funciona con revisión local.
- `kontext-extra.js` se regenera con `python3 tools/build_kontext_extra.py` si cambian los cursos Kontext.
- Los tiempos y pesos de los simulacros son orientativos (versión reducida); verifica los criterios de tu convocatoria Test.

## Tema claro/oscuro

- `alo-theme.js` gestiona el tema (Auto / Claro / Oscuro): botón 🌓 en la barra superior (y en el pie del dashboard),
  preferencia en `localStorage` (`alodeutsch_theme`) y `data-theme` en `<html>` (un script mínimo en `<head>` lo aplica sin parpadeo).
- `alodeutsch.html` define las variables de color claras y oscuras (`--bg`, `--card`, `--ink`, …) y la mayoría de componentes las usan.
- Para los colores escritos a mano (Lernreise, juegos, estilos en línea) `alo-theme.js` genera en tiempo de ejecución,
  mientras el tema resuelto es oscuro, una hoja que invierte la luminosidad de esos colores respetando los acentos
  (`:where(:root[data-resolved="dark"])`, sin subir la especificidad).
- Kontext y el Test Coach usan la misma paleta. El tema se comparte entre pestañas (BroadcastChannel) y con los cursos Kontext
  abiertos desde la app (postMessage).
- Limitación: `ruta-aprendizaje.html` (página independiente de Lernreise) no incluye aún el gestor de tema.
