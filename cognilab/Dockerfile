# CogniLab — HF Docker Space (free CPU tier)
# Etapa 1: build del frontend React
FROM node:22-slim AS frontend
WORKDIR /build
COPY frontend/package.json frontend/package-lock.json* ./
# ci y no install: respeta el lockfile, así el Space no se construye con
# versiones distintas de las probadas en local.
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Etapa 2: backend FastAPI sirviendo el build
FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
COPY --from=frontend /build/dist ./static

# HF Spaces expone el puerto 7860
EXPOSE 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
