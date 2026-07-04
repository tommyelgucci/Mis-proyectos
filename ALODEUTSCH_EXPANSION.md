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
(`OFFICIAL_EXAM_A2`+`OfficialExamA2`, `OFFICIAL_EXAM_B1`+`OfficialExamB1`),
porque cada Modellprüfung real tiene un formato de datos ligeramente
distinto (ver `RESUMEN_APP_PARA_CLAUDE_CODE.md` original, sección 4.3) y no
vale la pena forzarlo a una forma común.

## 2. Cómo agregar un nivel nuevo (ej. B2-C1 Beruf)

**B1 y B2 ya quedaron integrados siguiendo estos pasos — úsalos como
ejemplo real además de esta guía.**

1. Crear `B2C1_MODS` y `B2C1_DECKS` con el mismo formato que
   `A1_MODS`/`B1_MODS`/`B2_MODS` y `A1_DECKS`/`B1_DECKS`/`B2_DECKS` (ver
   cualquiera de los arrays existentes como plantilla exacta de campos:
   `id,e,t,s,c,intro,secs,q` para módulos; `id,e,title,sub,color,cards`
   para decks).
2. Registrar el nivel en el objeto `LEVELS`:
   ```js
   b2c1: { label:'Nivel B2–C1 Beruf', tab:'theorie', MODS:B2C1_MODS, DECKS:B2C1_DECKS,
           official:{name:'OfficialExamB2C1',label:'Examen Oficial telc B2-C1 Beruf'},
           simMinutes:25, simLabel:'Simulator rápido B2-C1' }
   ```
   (`official:false` si el nivel no tiene examen oficial, como A1.)
3. Si el nivel tiene examen oficial telc, extraer `OFFICIAL_EXAM_B2C1` +
   escribir `OfficialExamB2C1` copiando el patrón de `OfficialExamB2` (mismo
   `el()`, `renderLeseverstehen/Sprachbausteine/Hoeren/Schriftlich/Muendlich`,
   `answerMC/answerRF`, y ojo con namespacear `Store.gradeOfficial('b2c1-'+key,...)`
   y los `id` de inputs con prefijo `oeb2c1-` para que no choquen con otros
   niveles — **ojo**: el formato real de `OFFICIAL_EXAM_B2C1` en el archivo
   original usa `gespraeche`/`typ:'rf'|'abc'` en el Hören, distinto al patrón
   `dialog`/`aufgaben` de A2/B1/B2, así que revisa el archivo real antes de
   asumir la misma estructura) y agregar sus 2 pantallas HTML
   (`scr-b2c1-official-exam`, `scr-b2c1-official-part`) igual que las de B2.
   El botón de entrada ya está generalizado en `LevelUI.renderTheorie()` —
   solo con poner `official:{name:'OfficialExamB2C1',...}` en `LEVELS.b2c1`
   alcanza.
4. Agregar la tarjeta al dashboard en `Route.levels` (quitar `locked:true`
   y poner `id:'b2c1'`).
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
- `B1_MODS` completo (40 módulos, B1.1+B1.2) — aquí solo se tomó una
  muestra de 4 (Verbo y Posición, El Pasado en B1, Voz Pasiva, Oraciones
  Relativas I). Faltan 36 módulos más: Infinitiv mit zu, Verbos con
  Preposición Obligatoria, Pronombres Preposicionales, Conectores de Dos
  Partes, Plusquamperfekt, Adjetivos Sustantivados, Reflexivos Recíprocos,
  Konjunktiv II Avanzado, Adverbios Locales, Oraciones Relativas II,
  Cartas Oficiales telc B1, Comprensión Auditiva/Lectora, Expresión Oral
  I/II, Gramática Aplicada B1.1, y todo el bloque B1.2 (Konnektoren
  Position 1, Konzessive/Temporale Konnektoren, Modalpartikeln, Konjunktiv
  II Vergangenheit, Passiv Vergangenheit, Adjektivdeklination Extrem,
  Relativsätze mit Präpositionen, Verben mit Bedeutungswechsel, Lesen
  Fortgeschritten, Beschwerde schreiben, Sprechen Teil 2/3, Berufswelt
  Vokabular, Simulacro General).
- `B1_DECKS` completo (40 mazos) — mismo caso, solo 4 migrados.
- `B1_HOEREN` — módulo de comprensión auditiva de B1, no migrado aún.
- `B2_MODS` completo (24 módulos) — aquí solo se tomó una muestra de 4
  (Zweiteilige Konnektoren I, Konjunktiv II, Relativsätze im Genitiv,
  Passivvarianten & Zustandspassiv). Faltan 20 módulos más: Zweiteilige
  Konnektoren II, Verben/Adjektive mit Präposition, Indefinite
  Relativsätze, Trennbare/untrennbare Verben, Konjunktiv II mit
  Modalverben, Futur I/II für Vermutungen, Plusquamperfekt,
  Nominalisierung, Nomen-Verb-Verbindungen (básico y avanzado),
  Partizipialattribute, Modale Partikeln, Subjektive Modalverben,
  Wortbildung, Infinitivsätze mit zu, Konnektoren avanzados, Redemittel
  Diskussion, Textkohärenz, Schreiben telc B2, Simulacro Oral.
  ⚠️ Al extraer el módulo 14 ("Nomen-Verb-Verbindungen Fortgeschritten")
  y otros de ese bloque, revisar primero con `grep` si tienen palabras sin
  umlaut real (ej. "berucksichtigen"/"Verfugung" en vez de
  "berücksichtigen"/"Verfügung") — son typos del archivo original que hay
  que corregir al copiar, no reproducir tal cual.
- `B2_DECKS` completo (24 mazos) — mismo caso, solo 4 migrados.
- `B2_HOEREN` — módulo de comprensión auditiva de B2, no migrado aún.
- `B2C1_MODS`, `B2C1_DECKS`, `OFFICIAL_EXAM_B2C1` — nivel B2-C1 Beruf entero
  (próximo nivel a integrar).
- `A2_ERR_MOD` — el módulo "Top 10 Errores" que en el original aparece
  como tarjeta destacada en Theorie/Quiz de A2.

Todo este contenido existe ya, probado y completo, en
`superapp_deutsch_4.html` — es cuestión de copiarlo con el mismo criterio
usado para los módulos de muestra (extraer el bloque `{id:...}` tal cual,
sin reescritura).

## 4. Reglas que se mantuvieron del proyecto original

- Estándar suizo estricto: `ss`, nunca `ß` (`grep -c "ß" alodeutsch.html`
  debe dar `0`).
- Umlauts reales (ä/ö/ü) en alemán y español.
- Sin nombres personales en el contenido (se genericizaron "Steffen" →
  "Berger" y "Sharon" → "Nadia" en el examen oficial A2 extraído).
- Progreso en `localStorage`, namespaced por nivel (`a1-`, `a2-`, `b1-`,
  `b2-`, y a futuro `b2c1-`) para que nunca choquen entre sí.
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
- Voz propia: hoy Ola nunca "habla" con voz propia en la Theorie/Quiz, solo
  reacciona visualmente cuando `Speech.speak()` reproduce alemán. La
  llamada (`OlaCall`, ver sección 6) sí la hace hablar con voz alemana
  real, pero solo ahí.

## 6. Llamada con Ola — práctica de Sprechen ("videollamada")

Está integrada en `alodeutsch.html` (ya no es un archivo aparte). Se
accede desde una tarjeta destacada en el dashboard (`📞 Llamar a Ola`).
Flujo: `scr-call-incoming` (Ola te llama, aceptar/rechazar) →
`scr-call-connecting` → `scr-call-active` (Ola saluda, hace 5 preguntas
genéricas de conversación, tú marcas cuándo respondiste, feedback
variado, traducción al español opcional, controles de silenciar/
altavoz/colgar, temporizador y puntos de progreso) → `scr-call-summary`
(preguntas practicadas + duración, opción de repetir).

Piezas nuevas que trajo esta función y que se pueden reutilizar en
cualquier otro lugar de la app:
- `Sound` — tonos cortos por Web Audio API (`connect`/`good`/`end`), sin
  archivos de audio externos.
- `OlaCall` — controlador de la llamada; reutiliza el `Ola` avatar
  existente (los estados speaking/blink/celebrate ya se activan solos
  porque `OlaCall.say()` llama al `Speech.speak()` compartido, que ya
  dispara `Ola.setSpeaking()`).
- Las preguntas (`OlaCall.QUESTIONS`) son genéricas de conversación (no
  atadas a un nivel) — si se quiere una llamada por nivel más adelante,
  bastaría con parametrizar `OlaCall.QUESTIONS`/`GREETING`/`CLOSING` por
  `Current.levelId` en vez de usar un único set fijo.

## 7. Sonidos y motivación en TODA la app (estilo Duolingo)

En la primera versión de la llamada, `Sound` solo sonaba dentro de
`OlaCall`. Ahora está conectado en **toda la app**:

- `Sound.good()` (acierto) y `Sound.wrong()` (fallo, tono suave y corto,
  no punitivo) suenan en: `Quiz` (todo quiz de módulo y el Simulator
  rápido, que reutiliza el mismo motor), las tarjetas de estudio
  (`FlashUI.answer` — solo suena en "Sabía", nunca en "No sabía", para no
  castigar el autoreporte), y los 3 exámenes oficiales telc (A2, B1, B2)
  en cada pregunta calificable (`answerMC`, `answerRF`, `checkLVT1`,
  `checkLVT3`, `answerSBT1`, `answerSBT2`).
- `Sound.levelUp()` (arpegio ascendente de 4 notas) suena al completar
  con buen puntaje: un quiz de módulo o el Simulator (≥60%, con umbral
  extra en ≥80% para "GREAT"), o un mazo de flashcards (≥70%, extra en
  ≥90%). Los exámenes oficiales telc no disparan `levelUp` al terminar
  porque no tienen un momento de "fin de examen" bien definido (son
  scroll continuo, no un wizard) — sí suenan por pregunta.
- `Motivation` — objeto con 3 listas de frases cortas (`STUDY`, `GOOD`,
  `GREAT`) mostradas vía `App.toast()`. `STUDY` aparece con 40% de
  probabilidad al abrir un módulo de Theorie (`ModuleView.open`, para no
  saturar); `GOOD`/`GREAT` aparecen junto con `Sound.levelUp()` en los
  tres puntos de finalización de arriba.
- Todo el patrón `if(ok) Ola.blink();` de los exámenes oficiales se
  reemplazó por `if(ok){ Sound.good(); Ola.blink(); } else Sound.wrong();`
  — mismo cambio en los 14 sitios (A2×2, B1×6, B2×6), hecho con un solo
  reemplazo porque el texto era idéntico en los tres controladores.

Si se agrega un nivel nuevo con su propio examen oficial (B2-C1 Beruf),
replicar este mismo patrón `if(ok){ Sound.good(); Ola.blink(); } else
Sound.wrong();` en sus `answerMC`/`answerRF`/etc., y usar `Sound.levelUp()`
+ `Motivation.toast()` si ese nivel también tiene Simulator/Quiz (que ya
lo heredan gratis del motor compartido, sin tocar nada).
