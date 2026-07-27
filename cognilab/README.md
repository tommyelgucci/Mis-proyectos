---
title: CogniLab
emoji: 🧠
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
pinned: true
---

# 🧠 CogniLab — Laboratorio privado AI-103

App de estudio gamificada para el examen **Microsoft AI-103 (Azure AI Engineer)**.
341 preguntas resueltas del banco + 100 flashcards + 40 tarjetas de audio, con XP,
niveles, jefes, rachas y tutor IA. Todo en español, pensada para iPad y costo $0.

## Modos

| Modo | Qué hace |
|---|---|
| 🎯 Reto Diario | 10 preguntas del día (incluye tus falladas) — mantiene tu racha |
| 📚 Práctica | Por domain o todas, feedback inmediato con explicación |
| 🎓 Simulacro | 60 preguntas cronometradas, ponderadas como el examen real |
| ⚡ Lightning | 60 segundos contrarreloj con combos |
| 💀 Muerte Súbita | Una fallada y se acabó |
| ⚔️ Boss Battles | Derrota al jefe de cada domain (3 vidas) y al JEFE FINAL |
| 🪤 Modo Trampa | Solo las preguntas-trampa que deciden el examen |
| 🎧 Audio | Tarjetas narradas + preguntas narradas con pausa para pensar (Web Speech API) |
| 🃏 Flashcards | Repetición espaciada (SM-2 simplificado) |
| 🤖 Tutor IA | Chat del temario + "explícamelo diferente" en cada fallada |
| 📊 Progreso | Readiness score, XP, logros, countdown al examen, export/import |

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
