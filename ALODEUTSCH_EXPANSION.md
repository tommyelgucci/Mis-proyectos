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

## 2. Cómo agregar un nivel nuevo

**B1, B2 y B2-C1 Beruf ya quedaron integrados siguiendo estos pasos —
úsalos como ejemplo real además de esta guía. Los 5 niveles de la Süper
App Deutsch original ya están todos presentes en Alodeutsch, con
contenido completo en los 5** (ver sección 3 para lo que aún falta:
mini-juegos, Hören y el módulo "Top 10 Errores" de A2).

1. Crear `<NIVEL>_MODS` y `<NIVEL>_DECKS` con el mismo formato que los
   niveles existentes (ver cualquiera como plantilla exacta de campos:
   `id,e,t,s,c,intro,secs,q` para módulos; `id,e,title,sub,color,cards`
   para decks).
2. Registrar el nivel en el objeto `LEVELS`:
   ```js
   nuevo: { label:'Nivel X', tab:'theorie', MODS:X_MODS, DECKS:X_DECKS,
            official:{name:'OfficialExamX',label:'Examen Oficial telc X'},
            simMinutes:25, simLabel:'Simulator rápido X' }
   ```
   (`official:false` si el nivel no tiene examen oficial, como A1.)
3. Si el nivel tiene examen oficial telc, **primero inspecciona el
   formato real de los datos** en `superapp_deutsch_4.html` antes de
   asumir que coincide con A2/B1/B2 — B2-C1 Beruf demostró que esto varía
   bastante (ver nota al final de esta sección). Solo después de
   confirmar el formato, escribe `OfficialExamX` (mismo patrón `el()`,
   `render<Partes>`, `answerMC/answerRF`, namespaceando
   `Store.gradeOfficial('x-'+key,...)` y los `id` de inputs con prefijo
   `oex-`) y agrega sus 2 pantallas HTML (`scr-x-official-exam`,
   `scr-x-official-part`). El botón de entrada ya está generalizado en
   `LevelUI.renderTheorie()` — con poner `official:{name:'OfficialExamX',...}`
   en `LEVELS.x` alcanza, no hay que tocar `LevelUI`.
4. Agregar la tarjeta al dashboard en `Route.levels` (quitar `locked:true`
   y poner `id:'x'`).
5. **No hace falta tocar** `scr-level`, `scr-module`, `scr-quiz-run`,
   `scr-flash-study`, `scr-simulator`, ni sus controladores — son
   compartidos por diseño.

**Nota sobre formatos de examen oficial no estándar (caso real: B2-C1
Beruf):** en el archivo original, `OFFICIAL_EXAM_B2C1` resultó tener una
forma completamente propia, distinta a A2/B1/B2 en las 3 partes
calificables:
- `hoeren` tiene **4** Teile (no 3), y cada uno con su propia forma:
  Teil 1 usa `gespraeche[]` (varias conversaciones cortas, cada una con
  su `dialog` y `aufgaben` que mezclan `typ:'rf'` y `typ:'abc'` en el
  mismo Teil); Teil 2 usa `vortrag`/`vortrag_titel` (un monólogo/charla);
  Teil 3 usa `saetze` (a-k) + `aufgaben` con `sprecher`/`text` para
  emparejar por audio; Teil 4 sí sigue el patrón estándar `dialog`+`aufgaben` rf.
- `leseverstehen` usa `eintraege`/`antworten` (foro tipo pregunta-respuesta
  con `<select>`) en vez de `anzeigen`, y el Teil 3 separa
  `aufgaben_rf` y `aufgaben_abc` en dos arrays distintos sobre el mismo texto.
- `sprachbausteine.teil1` es una entrevista con preguntas y respuestas
  alternadas (`gapline_pre[0]` + `text_gaps[]`) en vez de una sola carta;
  `sprachbausteine.teil2` sí sigue el patrón estándar de carta con huecos.
- `schriftlich`/`muendlich` en cambio son **más simples** que A2/B1/B2:
  ambos usan un array genérico `teile[]` (cada uno con `titel`, y
  `situacion`/`aufgabe`/`punkte` o solo `text`), fácil de recorrer con un loop.

La lección para el próximo nivel (si se agrega alguno más allá de los 5
originales): nunca asumas que el examen oficial de un nivel nuevo sigue
el mismo JSON shape que los anteriores — inspecciónalo primero
(`python3 -c "import json; print(json.load(open('archivo.json')).keys())"`
sobre la línea extraída) y diseña el controlador a partir de eso.

## 3. Contenido pendiente de migrar desde `superapp_deutsch_4.html`

El archivo original del usuario tiene, listos para extraer:

- `A2_MODS` — **ya completo (20/20 módulos)**: Wortstellung, SEIN, HABEN,
  WERDEN, Verbos Modales, Zeitformen, Artikel & Kasus, Adjektivdeklination,
  Preposiciones, Reflexive & Trennbare, Konnektoren, Konjunktiv II, Passiv,
  Gustos, Adverbios, Briefe & Bescheid, W-Fragen, Sprechen (10 temas × 5
  preguntas, `_type:'sprechen'`), Resumen Crítico, Gramática Aplicada.
- `A2_DECKS` — **ya completo (20/20 mazos)**, mismo set que arriba.
  El módulo 18 (Sprechen) usa un renderer dedicado (`ModuleView.renderSprechen`
  + `spReveal`/`spNext`/`spPrev`/`spJump`) porque su forma de datos
  (`temas[].qs[]` con `joker:true/false`) no encaja en el `secs`/`q`
  estándar — ver sección 2 para el patrón a seguir si otro nivel trae un
  módulo con forma de datos distinta.
- `A2_HOEREN`, `A2_ARTIKEL`, `A2_PRAEP` — módulo de comprensión auditiva y
  el mini-juego "Adivina el Artikel/Präposition" de A2, no migrados aún.
- `A2_ERR_MOD` — el módulo "Top 10 Errores" de A2, no migrado aún (nota:
  el deck equivalente "Top 10 Errores" sí quedó migrado como parte del
  deck 19; falta el módulo de Theorie/Quiz correspondiente).
- `B1_MODS` — **ya completo (40/40 módulos, B1.1+B1.2)**: Verbo y
  Posición, El Pasado en B1, Infinitiv mit zu, Verbos con Preposición
  Obligatoria, Pronombres Preposicionales, Conectores de Dos Partes,
  Plusquamperfekt, Adjetivos Sustantivados, Reflexivos Recíprocos,
  Konjunktiv II Avanzado, Voz Pasiva, Adverbios Locales, Oraciones
  Relativas I/II, Cartas Oficiales telc B1, Comprensión Auditiva/Lectora,
  Expresión Oral I/II, Gramática Aplicada B1.1, y todo el bloque B1.2
  (Konnektoren Position 1 I/II, Konzessive/Temporale Konnektoren,
  Alternative und Einschränkung, Pronominaladverbien, Intensitätsadverbien,
  Modalpartikeln Basis/Fortgeschritten, Konjunktiv II Vergangenheit, Passiv
  Vergangenheit, Adjektivdeklination Extrem, Relativsätze mit
  Präpositionen, Verben mit Bedeutungswechsel, Lesen Fortgeschritten,
  Beschwerde schreiben, Sprechen Teil 2/3, Berufswelt Vokabular, Simulacro
  General B1.2).
- `B1_DECKS` — **ya completo (40/40 mazos)**, mismo set que arriba.
  Ninguno de los 40 módulos/decks de B1 usa una forma de datos especial
  (a diferencia del Sprechen de A2) — todos siguen el `secs`/`q` y
  `cards` estándar, así que no hizo falta ningún renderer nuevo.
- `B1_HOEREN` — módulo de comprensión auditiva de B1, no migrado aún.
- `B2_MODS` — **ya completo (24/24 módulos, B2.1+B2.2)**: Zweiteilige
  Konnektoren I/II, Konjunktiv II (Gegenwart/Vergangenheit), Verben und
  Adjektive mit Präposition, Relativsätze im Genitiv, Indefinite
  Relativsätze, Trennbare/untrennbare Verben, Konjunktiv II mit
  Modalverben, Futur I/II für Vermutungen, Plusquamperfekt,
  Nominalisierung, Nomen-Verb-Verbindungen (básico y Fortgeschritten),
  Passivvarianten & Zustandspassiv, Partizipialattribute, Modale
  Partikeln, Subjektive Modalverben, Wortbildung, Infinitivsätze mit zu,
  Konnektoren avanzados, Redemittel Diskussion, Textkohärenz, Schreiben
  telc B2, Simulacro Oral.
  ⚠️ Nota real de calidad de datos encontrada al extraer los módulos 13-24
  (el bloque "Lektion 7-12" del original, con `c:` en hex en vez de
  nombre de color — estilísticamente distinto del resto de B2 pero
  funcionalmente idéntico, ya que `mod.c` no se usa en ningún renderer):
  este bloque tenía **muchos más typos que los ya documentados**
  ("berucksichtigen"/"Verfugung" en vez de "berücksichtigen"/"Verfügung",
  además de "zunachst", "Konfliktlosung", "Textkoharenz",
  "Infinitivsatze", "notig"/"mogen" sin umlaut) — y además **decenas de
  tildes españolas faltantes** en el mismo bloque (p.ej.
  "opinion"/"informacion"/"posicion"/"solucion"/"reaccion" sin tilde, y
  un error de gramática real: "Das konnte stimmen" debía ser "Das
  **könnte** stimmen" en el módulo de verbos modales subjetivos — Konjunktiv
  II, no Präteritum). Se corrigieron todos antes de integrar. Para
  cualquier nivel futuro, no asumas que solo faltan umlauts alemanes:
  revisa también tildes españolas con un grep de palabras terminadas en
  `-cion`/`-sion` sin acentuar.
- `B2_DECKS` — **ya completo (24/24 mazos)**, mismo set que arriba y
  mismos typos corregidos.
- `B2_HOEREN` — módulo de comprensión auditiva de B2, no migrado aún.
- `B2C1_MODS`/`B2C1_DECKS` — **ya completos**, no falta nada: el original
  solo tenía 6 módulos/6 decks en total y los 6 están migrados. Igual el
  `OFFICIAL_EXAM_B2C1` — extraído completo, con las 5 partes.

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
  `b2-`, `b2c1-`) para que nunca choquen entre sí.
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

## 8. Einstufungstest (Test de Ubicación Inicial)

**Este era un hueco real que se me había pasado por completo** — no
estaba ni siquiera anotado como pendiente en este documento, a
diferencia de los módulos de muestra (esos sí estaban documentados desde
el principio como "4 de 20/40/24, resto pendiente"). Ya está corregido:

- `PLACEMENT_BANK` — extraído **completo y verbatim** del original: 204
  preguntas (51 por nivel: a2/b1/b2/b2c1), 100% en alemán, con
  traducción oculta opcional y feedback en español.
- `PLACEMENT_SEGMENTS` + `Placement` — controlador que arma un intento de
  25 preguntas (6+6+6+7, mezcladas con Fisher-Yates cada vez, nunca
  repetido), reutilizando el mismo motor `Quiz` genérico (`keepOrder:true`
  + `onFinish`) que ya usan los quiz de módulo y el Simulator — no hizo
  falta escribir un motor de preguntas nuevo.
- Recomendación por umbral de dominio (70%) igual que el original, con
  **una mejora**: como Alodeutsch sí tiene Nivel A1 (que la Süper App
  original no tenía), si el desempeño en el tramo A2 es muy bajo (<40%),
  se recomienda A1 como piso — aunque no haya preguntas propias de A1 en
  el banco (no existían en el original; si se quiere, se pueden escribir
  6-8 preguntas de A1 a mano siguiendo el mismo formato `{t,q,o,a,x}` y
  agregar un segmento `a1` real al banco).
- Accesible desde el botón "🎯 Test de Ubicación Inicial" en la pantalla
  de bienvenida (`scr-welcome`), tal como en el original.

## 9. Qué es contenido "de muestra" (deliberado) vs. qué faltaba de verdad

Para que quede claro de cara al usuario qué se decidió a propósito y qué
fue un descuido real:

- **Deliberado y ya documentado desde el principio (sección 3):** A2, B1
  y B2 ya quedaron completos (20/20, 40/40 y 24/24 módulos y decks). Los
  mini-juegos `A2_ARTIKEL`/`A2_PRAEP` ("Adivina el Artikel" / "Elige la
  Präposition") tampoco se migraron aún; `A2_HOEREN`/`B1_HOEREN`/`B2_HOEREN`
  (sección de audio dentro de Theorie) tampoco, ni `A2_ERR_MOD` (módulo
  "Top 10 Errores" de A2). Todo esto es expansión
  incremental ya planeada, no un olvido.
- **Era un olvido real, ya corregido:** el Einstufungstest (sección 8 de
  este documento).
