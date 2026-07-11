# 🌟 Aloenglish

App de Ola para aprender inglés (español → inglés, MCER A1–B2). Separada de
Alodeutsch: motor propio, contenido propio, progreso propio (`localStorage`
bajo la clave `aloenglish_progress_v1`).

## Estructura

```
aloenglish/
  index.html        ← frontend estático (un solo archivo, sin build step)
  backend/           ← Express: sirve index.html + proxya IA (Groq)
    server.js
    routes/ai.js
    package.json
    .env.example
  docker/
    Dockerfile       ← imagen para SnapDeploy
```

## Funcionalidad

- Quiz engine, flashcards con flip 3D, Simulator cronometrado, XP/racha
  diaria, mini-juegos (Build the sentence, Speed round).
- Dashboard A1–B2 (solo A1 con contenido fijo hoy; A2–B2 "Próximamente").
- **AI Practice** — generador de ejercicios bajo demanda: el estudiante
  escribe un tema libre + nivel, el backend le pide a Groq 5 preguntas
  nuevas (mc/fill) en el mismo formato que usa el Quiz engine, y se
  practican con la UI normal de quiz.

Si no hay backend detrás (por ejemplo, abriendo `index.html` suelto o
sirviéndolo desde un hosting puramente estático), la tarjeta "AI Practice"
consulta `/api/ai/status`, falla en silencio y muestra un toast avisando
que el generador no está disponible ahí — el resto de la app (quiz,
flashcards, simulator, mini-juegos, progreso) sigue funcionando igual.

## Desarrollo local

```bash
cd aloenglish/backend
cp .env.example .env        # completa GROQ_API_KEY (console.groq.com/keys)
npm install
npm run serve                # copia index.html a public/ y levanta :5000
```

Abre `http://localhost:5000`. Sin `GROQ_API_KEY`, todo funciona salvo
"AI Practice" (queda deshabilitado con gracia).

Scripts del backend:
- `npm run dev` — levanta el server con `--watch`, sin recopiar el frontend
  (útil si solo tocas `backend/`).
- `npm run build:web` — copia `../index.html` a `backend/public/index.html`.
- `npm run serve` — `build:web` + arrancar el server (lo mismo que hace el
  Dockerfile en producción).

## Deploy en SnapDeploy

Hugging Face Spaces ya no ofrece Docker en el tier gratis, así que
Aloenglish se despliega directo en SnapDeploy (servidor Node/Docker
persistente), igual que se hizo con BrainBit:

1. Conectar el repo/rama en el dashboard de SnapDeploy.
2. Apuntar el Dockerfile a `aloenglish/docker/Dockerfile`, con **contexto de
   build = `aloenglish/`** (no la raíz del repo — a diferencia de BrainBit,
   aquí no hay etapa de build de frontend porque `index.html` es estático).
3. Configurar la variable de entorno de runtime `GROQ_API_KEY` (y
   opcionalmente `GROQ_MODEL`) en el dashboard. Nunca va en el Dockerfile ni
   en el repo.

## Verificación hecha en esta sesión

- `npm install` en `aloenglish/backend` — sin errores.
- Servidor local: `/health` responde, `/api/ai/status` da `{"enabled":false}`
  sin `GROQ_API_KEY`, `/api/ai/generate-exercise` da 503 limpio sin key, y
  `/` sirve el `index.html` copiado a `public/`.
- Sintaxis validada con `node --check` en `server.js`, `routes/ai.js` y el
  `<script>` del `index.html`.

**Pendiente de probar con `GROQ_API_KEY` real** (no disponible en esta
sesión): que el generador devuelva JSON válido de Groq y se renderice como
quiz en el navegador — probarlo en local o ya desplegado antes de darlo por
cerrado.
