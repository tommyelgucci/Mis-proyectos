---
title: CogniLab
emoji: 🧠
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
pinned: true
---

# 🧠 CogniLab — laboratorio de preparación Microsoft AI-103

App de estudio gamificada en español para preparar el examen **Microsoft AI-103: Azure AI Apps and Agents Developer Associate**. Incluye banco de preguntas, tarjetas de audio, flashcards, simulacros, seguimiento del progreso y tutor IA.

> **Importante:** la estructura histórica del banco usa cuatro bloques internos. El examen se organiza actualmente en cinco dominios oficiales. Consulta [content/AI103_OFFICIAL_BLUEPRINT_2026.md](content/AI103_OFFICIAL_BLUEPRINT_2026.md) para el mapa actualizado y el plan intensivo de repaso. La guía oficial de Microsoft es la fuente de verdad si hay diferencias.

## Dominios oficiales del examen

| Dominio | Peso oficial |
|---|---:|
| Plan and manage an Azure AI solution | 25–30 % |
| Implement generative AI and agentic solutions | 30–35 % |
| Implement computer vision solutions | 10–15 % |
| Implement text analysis solutions | 10–15 % |
| Implement information extraction solutions | 10–15 % |

Las cifras son rangos oficiales, no porcentajes exactos. Verifica la [guía oficial AI-103](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) antes de presentarte.

## Modos de estudio

| Modo | Qué hace |
|---|---|
| 🎯 Reto Diario | Preguntas del día e intentos anteriores |
| 📚 Práctica | Práctica por categorías y feedback con explicación |
| 🎓 Simulacro | Preguntas cronometradas |
| ⚡ Lightning | Repaso rápido contrarreloj |
| 💀 Muerte Súbita | Una respuesta incorrecta termina la ronda |
| ⚔️ Boss Battles | Retos por categorías |
| 🪤 Modo Trampa | Preguntas con distractores frecuentes |
| 🎧 Audio | Tarjetas narradas con Web Speech API |
| 🃏 Flashcards | Repaso espaciado |
| 🤖 Tutor IA | Ayuda contextual si el backend y el proveedor están configurados |
| 📊 Progreso | Estadísticas y progreso guardado en el navegador |

Los recuentos del banco pueden variar al añadir material o deduplicar preguntas; por eso este README no fija un total que pueda quedar desactualizado. Usa el recuento generado por la aplicación como cifra actual.

## Preparación de última semana

1. Abre [el mapa oficial y plan intensivo](content/AI103_OFFICIAL_BLUEPRINT_2026.md).
2. Haz un diagnóstico mixto y etiqueta los errores según los cinco dominios oficiales.
3. Prioriza IA generativa/agentes y planificación/administración por su mayor peso, pero reserva sesiones para visión, análisis de texto y extracción de información.
4. Contrasta nombres de SDK, parámetros y afirmaciones absolutas con la documentación oficial. Las preguntas de CogniLab son material de práctica, no preguntas oficiales del examen.

## Deploy en Hugging Face Spaces (gratis)

1. Crea un **Space** → tipo **Docker** → visibilidad **Private**.
2. Sube el contenido de esta carpeta (`cognilab/`) al Space, o configura la
   GitHub Action de sync (ver `.github/workflows/sync-to-hf.yml` en la raíz del repo).
3. En **Settings → Variables and secrets** del Space añade:
   - `APP_PASSWORD` (secret): tu contraseña de acceso. Sin él, usa `cognilab2026`.
   - `HF_TOKEN` (secret, opcional): token de HF con permiso *Inference* para activar el Tutor IA.
   - `AI_MODEL` (variable, opcional): modelo a usar, por defecto `meta-llama/Llama-3.1-8B-Instruct`.
4. Abre el Space, escribe tu contraseña y a estudiar. En iPad: **Compartir → Añadir a pantalla de inicio** para usarla como app.

> El Space gratuito se duerme tras inactividad; tarda ~1 min en despertar la primera vez. Tu progreso vive en el navegador (localStorage) — usa **Progreso → Exportar** como respaldo.

## Desarrollo local

```bash
# Datos (solo si cambias los .md del banco)
python3 scripts/parse_banco.py

# Frontend
cd frontend && npm install && npm run dev   # http://localhost:5173
npm test                                    # lógica de juego (racha, SRS, selección)

# Backend (opcional, para auth real + tutor IA)
cd backend && pip install -r requirements.txt
APP_PASSWORD=cognilab2026 uvicorn main:app --port 7860

# Tests del backend (auth, tokens y path traversal)
pip install -r backend/requirements-dev.txt
python -m pytest backend/test_security.py -q
```

Sin backend corriendo, el frontend acepta la contraseña por defecto `cognilab2026`
y el Tutor IA se desactiva (todo lo demás funciona offline).

## Añadir más preguntas

Deja nuevos archivos `BANCO*.md` (mismo formato: `### Qn`, opciones A-D con `✅`,
`**Explicación:**`) en `content/banco/` y corre `python3 scripts/parse_banco.py`.
El parser deduplica, marca trampas e infiere el domain por nombre de archivo.
