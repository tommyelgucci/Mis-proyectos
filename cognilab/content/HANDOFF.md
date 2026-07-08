# HANDOFF PARA CLAUDE CODE — AI-103 STUDY APP (v2 FINAL)
## Documento de traspaso completo y actualizado del proyecto de preparación AI-103
### Generado: 2026-07-08 | Reemplaza a HANDOFF_CLAUDE_CODE_AI103_STUDY_APP.md (v1)

---

## 🎯 INSTRUCCIÓN PRINCIPAL PARA CLAUDE CODE

Lee este documento completo primero. Luego lee los archivos fuente en el orden de prioridad indicado abajo. Tu tarea: **construir una app de estudio completa** que consolide TODO el material en una experiencia unificada con estos modos:

1. **Modo Audio** (prioridad #1 — el usuario aprende mejor escuchando)
2. **Modo Quiz/Simulador** (usando el banco de ~610 preguntas resueltas)
3. **Modo Flashcards** con repetición espaciada
4. **Tracker de progreso persistente** por dominio

**Regla de oro:** NO regeneres contenido desde cero. Parsea los archivos `.md` existentes (están estructurados con headers `###`, opciones A-D, marcador `✅`, y bloques `**Explicación:**`) para extraer preguntas/tarjetas a JSON. El contenido ya fue curado y validado — tu trabajo es la ingeniería, no la redacción.

---

## 👤 CONTEXTO DEL USUARIO (Tommy)

- **Examen:** Microsoft AI-103 (Azure AI Engineer Associate), planeado **principios de agosto 2026** (~3-4 semanas desde hoy)
- **Voucher:** 100% descuento, expira 18 octubre 2026
- **Idioma de estudio:** Español (todo el material está en español)
- **Estilo de aprendizaje:** **Auditivo** — la app de audio es el modo más importante
- **Nivel:** Python intermedio, sin experiencia Azure previa (usó free tier), ~3 horas/día de estudio
- **Estado:** Completó los 4 Learning Paths oficiales de Microsoft Learn + 3 assessments con puntaje perfecto. Todo el temario está cubierto; ahora está en fase de práctica intensiva.

---

## 📊 EL ACTIVO MÁS IMPORTANTE: BANCO DE ~610 PREGUNTAS RESUELTAS

Este es el corazón de la app. Cada pregunta tiene: enunciado (frecuentemente un escenario de negocio), 4 opciones A-D, respuesta correcta marcada con ✅, y explicación de por qué es correcta y por qué las otras son trampa.

### Archivos del banco en orden de numeración:

| # | Archivo | Rango | Contenido |
|---|---|---|---|
| 1 | `BANCO_PREGUNTAS_AI103_RESUELTO.md` | Q1-83 | Banco original multi-dominio |
| 2 | `BANCO_PREGUNTAS_AI103_PARTE3_84-150.md` | Q84-150 | Banco original continuación |
| 3 | `BANCO_PREGUNTAS_AI103_PARTE4_151-250.md` | Q151-175 | Domain 1: SDK, Auth, Responses API |
| 4 | `BANCO_PREGUNTAS_AI103_PARTE5_176-350.md` | Q176-200 | Domain 2: Tools core |
| 5 | `BANCO_PREGUNTAS_AI103_PARTE6_201-350.md` | Q201-240 | Domain 2: Multi-tool avanzado, edge cases |
| 6 | `BANCO_PREGUNTAS_AI103_PARTE6B_241-350.md` | Q241-275 | Domain 2: Escenarios por industria |
| 7 | `BANCO_PREGUNTAS_AI103_PARTE6C_276-350.md` | Q276-310 | Domain 2: Vector stores, function calling edge |
| 8 | `BANCO_PREGUNTAS_AI103_PARTE6D_311-350.md` | Q311-330 | Domain 2: Producción, cierre |
| 9 | `BANCO_PREGUNTAS_AI103_PARTE7_351-500.md` | Q351-485 | Domain 3: Prompt Eng, RAG, Fine-Tuning |
| 10 | `BANCO_PREGUNTAS_AI103_PARTE8_486-700.md` | Q486-570 | Domain 4: Responsible AI completo |
| 11 | `BANCO_PREGUNTAS_AI103_PARTE9_561-800.md` | Q561-758 | Cross-domain + trampas + síntesis |

**⚠️ Notas de parsing importantes:**
- Los nombres de archivo indican rangos "aspiracionales"; el rango REAL de preguntas detalladas está en la tabla de arriba. Algunos archivos contienen notas de "preguntas resumidas pendientes" que NO son preguntas completas — solo parsea los bloques que tienen el formato completo (### Q + opciones + ✅ + Explicación).
- Hay solapamiento de numeración entre Partes 8 y 9 (Q561-570 aparecen contextualizados distinto); al parsear, usa un ID único secuencial propio en vez de confiar ciegamente en el número Q original.
- Total real de preguntas completas parseables: **~610**.
- Formato de pregunta estándar en todos los archivos:
  ```
  ### Q123
  **Enunciado de la pregunta...**

  A) Opción incorrecta
  B) Opción correcta ✅
  C) Opción incorrecta
  D) Opción incorrecta

  **Explicación:** Texto de la explicación...
  ```
- El bloque "Trampas" (Q641-658 en Parte 9) tiene el prefijo **TRAMPA:** en el enunciado — son ideales para un modo especial de "trampas frecuentes" en la app.

---

## 📚 DOCUMENTOS MAESTROS DE CONTENIDO (para Modo Audio y Flashcards)

Estos consolidan el temario en formato narrativo/estructurado. Fuente ideal para generar tarjetas de audio (texto narrable) y flashcards:

| Archivo | Contenido | Uso sugerido en la app |
|---|---|---|
| `AI103_CONSOLIDATED_ONLY_RELEVANT.md` | Documento maestro original del temario | Fuente base multi-dominio |
| `RESPONSIBLE_AI_COMPLETE_GUIDE.md` | Domain 4: 6 pilares, 4 fases, 4 capas, Content Safety | Audio + flashcards Domain 4 |
| `AGENTS_TOOLS_COMPLETE_SDK_PATTERNS.md` | Domain 2: las 4 tools con código Python real | Audio + flashcards Domain 2 |
| `OPTIMIZATION_COMPLETE_GUIDE.md` | Domain 3: Prompt Eng, RAG, Fine-Tuning, LoRA | Audio + flashcards Domain 3 |
| `DOMAIN_2_MEGA_CONSOLIDATED.md` | Domain 2 arquitectura completa | Referencia profunda Domain 2 |
| `SDK_AUTHENTICATION_MASTER.md` | Domain 1: auth, Responses vs Chat Completions | Audio + flashcards Domain 1 |
| `AI103_MASTER_EXAM_PATTERNS.md` | 50 gotchas + 20 preguntas tipo | Modo "repaso de trampas" |
| `AI103_SCENARIO_DECISION_MATRIX.md` | Matriz keywords→solución + trampas clásicas | Modo "decisión rápida" |
| `AI103_QUICK_REFERENCE_CARD.md` | Tarjeta de repaso 24-48h pre-examen | Pantalla "último repaso" |
| `AI103_FINAL_100_QUESTIONS.md` | 100 preguntas rápidas formato corto (P/R directa) | Quiz modo rápido |

### Documentos de soporte (prioridad menor, leer solo si se necesita más contenido):
`ANALISIS_GEORGIA_AI103_COMPLETO.md`, `DOMAIN_2_DEEP_DIVE.md`, `GAP_ANALYSIS_STUDY_GUIDE_OFICIAL.md`, `PLAN_AI103_5SEMANAS.md`, `VIDEO_SUMMARIES_AI103.md`, `INSIDER_INFO_REDDIT_INTEGRATION.md`, `AJUSTE_FINAL_TIPS_QUIENPASO.md`, `RESUMEN_FINAL_MEGA.md`, `PYTHON_EXERCISES_AI103.md`, `PYTHON_SDK_PATTERNS_CRITICOS.md`, `AZURE_PORTAL_STEP_BY_STEP.md`, `SPACED_REPETITION_GUIDE.md`, `EXTENDED_DOMAIN_QUESTIONS_3_4_5.md`, `EXAM_SIMULATOR_GUIDE.md`

### Apps ya construidas (referencias de diseño, NO reconstruir desde cero):
- `ai103_audio_study.jsx` — **App de audio existente en React.** 40 tarjetas curadas, Web Speech API, filtros por domain, control de velocidad 0.5×-2×, avance automático, selector de voz en español, tracker de sesión. **Úsala como base de diseño y expándela** con todo el contenido nuevo.
- `ai103_exam_simulator.html` — Shell de UI de simulador (dark theme, modos de estudio). ⚠️ Dice "700+ preguntas" pero es solo interfaz sin datos cargados; el contenido real está en los archivos BANCO_*.
- `flashcards_ai103.html`, `spaced_repetition_tracker.html` — Referencias de UX para esos modos.

---

## 🧠 MAPA DEL EXAMEN (esqueleto de navegación de la app)

| Domain | Peso | Temas clave | Color sugerido (ya usado en app existente) |
|---|---|---|---|
| **Domain 1: SDK/Auth** | ~15-20% | Responses API (`output_text`, `instructions`, `previous_response_id`), DefaultAzureCredential, streaming, azure-ai-projects | Índigo `#6366f1` |
| **Domain 2: Tools** | ~30-35% ⭐ | code_interpreter (sin red), web_search, file_search (`vector_store_ids`), function_calling (`call_id`, 2 llamadas, cliente ejecuta) | Celeste `#0ea5e9` |
| **Domain 3: Optimización** | ~20-25% | Prompt Eng primero, Temperature XOR Top P, Chain-of-Thought, RAG (híbrida recomendada), Fine-Tuning/LoRA/JSONL | Verde `#10b981` |
| **Domain 4: Responsible AI** | ~20-25% | 6 pilares, IDENTIFY→MEASURE→MITIGATE→MANAGE, NIST AI RMF, 4 capas (FT=1, Content Safety=2), 4 categorías, LOW=máx sensibilidad | Ámbar `#f59e0b` |
| **Trampas** (meta-categoría) | — | Bloque Q641-658 + gotchas de los docs maestros | Rojo `#ef4444` |

---

## 🛠️ ESPECIFICACIÓN TÉCNICA SUGERIDA

### Stack recomendado
- **React + Vite** (local) o HTML/JS standalone (como los simuladores existentes). Decidir con el usuario.
- **Sin backend**: Web Speech API para audio (nativa del navegador, funciona en español), localStorage o archivo JSON para persistencia.

### Pipeline de datos (primera tarea de Claude Code)
1. Script de parsing (Python o Node) que lea los 11 archivos BANCO_* y extraiga a un `questions.json` con schema:
   ```json
   {
     "id": 151,
     "domain": "Domain 1",
     "question": "...",
     "options": {"A": "...", "B": "...", "C": "...", "D": "..."},
     "correct": "C",
     "explanation": "...",
     "isTrap": false,
     "sourceFile": "BANCO_PREGUNTAS_AI103_PARTE4_151-250.md"
   }
   ```
2. Inferir el `domain` del archivo de origen (ver tabla de rangos arriba).
3. Deduplicar/renumerar donde haya solapamiento (Q561-570).
4. Extraer también tarjetas de contenido de los docs maestros para audio/flashcards (headers `##`/`###` como título, cuerpo como contenido narrable, tablas convertidas a texto hablado).

### Modos de la app
1. **Audio:** expandir `ai103_audio_study.jsx` — todas las tarjetas de contenido + opción de narrar preguntas del quiz (pregunta → pausa → respuesta + explicación). Controles existentes: velocidad, auto-avance, selector voz, filtro domain.
2. **Quiz:** aleatorio o por domain; modo examen (60 preguntas cronometradas, mezcla ponderada por peso de domain) y modo práctica (feedback inmediato con explicación). Trackear aciertos por domain.
3. **Flashcards:** pregunta/keyPoint al frente, respuesta/explicación al reverso; algoritmo simple de repetición espaciada (again/hard/good/easy).
4. **Dashboard:** % dominado por domain, preguntas falladas (para re-quiz de solo falladas), racha de días, contador regresivo al examen (~principios de agosto 2026).

### Estética
Mantener el dark theme ya establecido: fondo degradado `#0f0f1a → #1a1a2e`, acentos por domain (tabla de arriba), tipografía Segoe UI/system-ui.

---

## ✅ TL;DR PARA CLAUDE CODE

> Tommy estudia para el AI-103 (examen ~agosto 2026, quedan 3-4 semanas). Aprende mejor escuchando. Existe una biblioteca de ~42 archivos en `/mnt/user-data/outputs/` con TODO el temario ya curado en español: **~610 preguntas resueltas con explicación** distribuidas en 11 archivos BANCO_* (formato consistente parseable), 10 documentos maestros de contenido por dominio, y una app de audio React ya funcional con 40 tarjetas (`ai103_audio_study.jsx`) que sirve de base de diseño. **Tu tarea:** (1) parsear los BANCO_* a JSON, (2) construir una app multi-modo (audio prioritario, quiz, flashcards, dashboard de progreso) reutilizando el diseño existente, (3) priorizar que funcione YA sobre perfección — el examen es en semanas. No regeneres contenido: extráelo de los archivos.

---

## 📅 CHECKLIST DE ARRANQUE SUGERIDO PARA CLAUDE CODE

- [ ] Leer este handoff completo
- [ ] Listar y verificar los 11 archivos BANCO_* disponibles
- [ ] Escribir y correr el script de parsing → `questions.json` (validar: ~610 preguntas, sin duplicados, todas con correct + explanation)
- [ ] Leer `ai103_audio_study.jsx` para heredar diseño y lógica de Web Speech API
- [ ] Confirmar con Tommy: ¿app local (Vite) o artifact/HTML standalone?
- [ ] Construir modo Quiz primero (mayor valor inmediato con el banco), luego expandir Audio, luego Flashcards/Dashboard
- [ ] Validar en español: voces del navegador, textos de UI
