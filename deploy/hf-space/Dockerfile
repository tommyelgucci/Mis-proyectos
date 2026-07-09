# BrainBit — HF Docker Space
#
# El frontend se compila en GitHub Actions (no aquí), porque necesita las
# claves públicas de Supabase (VITE_SUPABASE_URL/ANON_KEY) horneadas en el
# bundle en tiempo de build, y usar GitHub Secrets para eso es más simple y
# fiable que depender de cómo HF pasa secrets al build de Docker. Este
# Dockerfile solo empaqueta el backend + el build ya listo.
#
# Contexto de build esperado (lo arma el workflow deploy-brainbit-to-hf.yml):
#   ./backend/   (código fuente del backend)
#   ./public/    (frontend/dist ya compilado)
#   ./Dockerfile (este archivo)

FROM node:22-slim
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev
COPY backend/ .
COPY public ./public

# HF Spaces (Docker) expone el puerto 7860
EXPOSE 7860
ENV PORT=7860
CMD ["node", "server.js"]
