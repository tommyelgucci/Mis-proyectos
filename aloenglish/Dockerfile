# Aloenglish — SnapDeploy (servidor Node/Docker)
#
# Aloenglish es un frontend estático de un solo archivo (index.html, sin
# build step) + un backend Express que lo sirve y proxya la IA (Groq) para
# el generador de ejercicios. El token de Groq nunca se hornea en el
# navegador: vive solo como variable de entorno del contenedor.
#
# Contexto de build = carpeta aloenglish/ (index.html y backend/ como
# hermanos de este Dockerfile). En SnapDeploy: Root Directory = aloenglish,
# Dockerfile Path = Dockerfile (default), Build Context = . (default).

FROM node:22-slim
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev
COPY backend/ .
COPY index.html ./public/index.html

EXPOSE 5000
ENV PORT=5000
CMD ["node", "server.js"]
