# Alodeutsch — Plan de Expansión

> Cómo funciona la arquitectura de `alodeutsch.html` y cómo agregar B1, B2 y
> B2-C1 Beruf reutilizando el motor ya construido, sin duplicar código.

## 1. Qué cambió respecto a la Süper App Deutsch original

La app original (`superapp_deutsch_4.html`) repetía TODO el bloque de
pantallas y controladores por cada nivel: `Level`/`LevelB1`/`LevelB2`/
`LevelB2C1`, `Grammar`/`GrammarB1`/..., `QuizRun`/`QuizRunB1`/...,
`Flashcards`/`FlashcardsB1`/..., `Simulator`/`SimulatorB1`/... — 4 copias
casi idénticas de cada pieza.

`alodeutsch.html` reemplaza eso por **una sola implementación genérica**
por función (Opción B pedida):

| Pieza | Antes (por nivel) | Ahora (compartida) |
|---|---|---|
| Pantalla home del nivel (4 pestañas) | `scr-a2level`, `scr-b1level`, `scr-b2level`, `scr-b2c1level` | `scr-level` (una sola, reutilizada) |
| Controlador de pestañas | `Level`, `LevelB1`, `LevelB2`, `LevelB2C1` | `LevelUI` (una sola) |
| Visor de Theorie | `Grammar`, `GrammarB1`... | `ModuleView` |
| Ejecución de Quiz | `QuizRun`, `QuizRunB1`... | `QuizRunUI` |
| Estudio de Flashcards | `Flashcards`, `FlashcardsB1`... | `FlashUI` |
| Simulator rápido | `Simulator`, `SimulatorB1`... | `Simulator` (genérico, lee `curLevel()`) |
| Motor de preguntas mc/fill | `Quiz` | `Quiz` (sin cambios, ya era genérico) |

Lo único que **sí** sigue siendo por nivel es el examen oficial telc
(`OFFICIAL_EXAM_A2` + `OfficialExamA2`), porque cada Modellprüfung real
tiene un formato de datos ligeramente distinto (ver
`RESUMEN_APP_PARA_CLAUDE_CODE.md` original, sección 4.3) y no vale la pena
forzarlo a una forma común.

## 2. Cómo agregar un nivel nuevo (ej. B1)

1. Crear `B1_MODS` y `B1_DECKS` con el mismo formato que `A1_MODS`/`A2_MODS`
   y `A1_DECKS`/`A2_DECKS` (ver cualquiera de los dos arrays existentes
   como plantilla exacta de campos: `id,e,t,s,c,intro,secs,q` para módulos;
   `id,e,title,sub,color,cards` para decks).
2. Registrar el nivel en el objeto `LEVELS`:
   ```js
   b1: { label:'Nivel B1', tab:'theorie', MODS:B1_MODS, DECKS:B1_DECKS,
         official:true, simMinutes:20, simLabel:'Simulator rápido B1' }
   ```
3. Si el nivel tiene examen oficial telc, extraer `OFFICIAL_EXAM_B1` +
   escribir `OfficialExamB1` copiando el patrón de `OfficialExamA2` (mismo
   `el()`, `renderHoeren/Lesen/Sprachbausteine/Schreiben/Sprechen`,
   `answerMC/answerRF`) y agregar sus 2 pantallas HTML
   (`scr-b1-official-exam`, `scr-b1-official-part`) igual que las de A2.
   El botón de entrada se agrega en `LevelUI.renderTheorie()` (o se
   generaliza guardando el nombre del controlador en `LEVELS[id].official`
   en vez de un booleano).
4. Agregar la tarjeta al dashboard en `Route.levels` (quitar `locked:true`
   y poner `id:'b1'`).
5. **No hace falta tocar** `scr-level`, `scr-module`, `scr-quiz-run`,
   `scr-flash-study`, `scr-simulator`, ni sus controladores — son
   compartidos por diseño.

## 3. Contenido pendiente de migrar desde `superapp_deutsch_4.html`

El archivo original del usuario tiene, listos para extraer:

- `A2_MODS` completo (20 módulos) — aquí solo se tomó una muestra de 4
  (Wortstellung, SEIN, HABEN, Artikel & Kasus). Faltan 16 módulos más:
  WERDEN, Verbos Modales, Zeitformen, Adjektivdeklination, Preposiciones,
  Reflexive & Trennbare, Konjunktiv II, Passiv, Konnektoren, Gustos,
  Adverbios, Briefe & Bescheid, W-Fragen, Sprechen, Resumen Crítico,
  Gramática Aplicada.
- `A2_DECKS` completo (20 mazos) — mismo caso, solo 4 migrados.
- `A2_HOEREN`, `A2_ARTIKEL`, `A2_PRAEP` — módulo de comprensión auditiva y
  el mini-juego "Adivina el Artikel/Präposition" de A2, no migrados aún.
- `B1_MODS`, `B1_DECKS`, `B1_HOEREN`, `OFFICIAL_EXAM_B1` — nivel B1 entero.
- `B2_MODS`, `B2_DECKS`, `B2_HOEREN`, `OFFICIAL_EXAM_B2` — nivel B2 entero.
- `B2C1_MODS`, `B2C1_DECKS`, `OFFICIAL_EXAM_B2C1` — nivel B2-C1 Beruf entero.
- `A2_ERR_MOD` — el módulo "Top 10 Errores" que en el original aparece
  como tarjeta destacada en Theorie/Quiz de A2.

Todo este contenido existe ya, probado y completo, en
`superapp_deutsch_4.html` — es cuestión de copiarlo con el mismo criterio
usado para los 4 módulos de muestra (extraer el bloque `{id:...}` tal cual,
sin reescritura).

## 4. Reglas que se mantuvieron del proyecto original

- Estándar suizo estricto: `ss`, nunca `ß` (`grep -c "ß" alodeutsch.html`
  debe dar `0`).
- Umlauts reales (ä/ö/ü) en alemán y español.
- Sin nombres personales en el contenido (se genericizaron "Steffen" →
  "Berger" y "Sharon" → "Nadia" en el examen oficial A2 extraído).
- Progreso en `localStorage`, namespaced por nivel (`a1-`, `a2-`, y a
  futuro `b1-`, `b2-`, `b2c1-`) para que nunca choquen entre sí.
- Validar siempre antes de entregar: `grep -c "ß"`, `node -c` sobre el
  `<script>` extraído, `grep -o 'id="scr-...' | sort | uniq -c` para
  IDs de pantalla duplicados.

## 5. Ola — estado actual y posibles mejoras futuras

Ola es hoy un emoji 🌟 con 4 estados CSS (`olaBreathe` idle, `olaBlink`
parpadeo periódico cada 6-9s, `olaSpeak` mientras `Speech.speaking` es
`true`, `olaCelebrate` al terminar un quiz/mazo con buen puntaje). Ideas
para cuando el usuario quiera iterar la apariencia:

- Reemplazar el emoji por un SVG propio (permite más control de forma/
  color sin depender del renderizado de emoji del sistema operativo).
- Dar a Ola una paleta de "humor" (dorado normal / verde al acertar racha /
  ámbar suave al fallar, sin ser punitivo).
- Voz propia: hoy Ola nunca "habla" con voz propia, solo reacciona
  visualmente cuando `Speech.speak()` reproduce alemán. Se podría agregar
  frases motivacionales cortas en español narradas por Ola entre
  ejercicios.
