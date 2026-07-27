# BrainBit — SnapDeploy (servidor Node/Docker completo)
#
# A diferencia del Space estático de Hugging Face, aquí el backend Express
# corre de forma persistente y sirve el frontend compilado + proxya la IA
# (Groq) — el token nunca se hornea en el bundle del navegador, vive solo
# como variable de entorno del contenedor.
#
# Vive en la raíz del repo (no en una subcarpeta) a propósito: el escaneo
# automático de SnapDeploy busca un Dockerfile en la raíz antes de mirar
# ningún campo manual de "Dockerfile Path", y bloqueaba el deploy en loop
# cuando este archivo vivía en docker/Dockerfile. Build context = raíz del
# repo (frontend/ y backend/ como hermanos de este Dockerfile).

# Etapa 1: build del frontend (Vite/React)
# VITE_SUPABASE_URL/ANON_KEY son públicas por diseño (igual que en el deploy
# de HF) pero Vite las necesita en tiempo de BUILD, no de runtime — por eso
# van como build args aquí.
FROM node:22-slim AS frontend-build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Etapa 2: backend Express sirviendo el build + proxy de IA
#
# GROQ_API_KEY se declara como ARG solo porque el panel de SnapDeploy
# únicamente ofrece un campo para rellenar variables cuando las detecta
# escaneando los ARG del Dockerfile — no tiene una sección aparte para
# variables de entorno de runtime puras. El valor igual termina como
# variable de entorno real del contenedor (ENV, abajo), nunca se usa en un
# RUN ni se hornea en el bundle del frontend — mismo efecto práctico que
# pasarla directo como env var, solo que así el dashboard de SnapDeploy
# puede pedírtela.
FROM node:22-slim
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev
COPY backend/ .
COPY --from=frontend-build /build/dist ./public

ARG GROQ_API_KEY
ENV GROQ_API_KEY=$GROQ_API_KEY

EXPOSE 5000
ENV PORT=5000
CMD ["node", "server.js"]
