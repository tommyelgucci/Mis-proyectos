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
genéricas de conversación, tú **escribes tu respuesta real** en un campo
de texto, Ola reacciona según lo que escribiste, traducción al español
opcional, controles de silenciar/altavoz/colgar, temporizador y puntos
de progreso) → `scr-call-summary` (preguntas practicadas + duración,
opción de repetir).

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

### 6.1 Rediseño: de "cuestionario con temporizador" a input real + reacciones por palabra clave

La versión original avanzaba sola con `setTimeout` después del saludo y
de cada feedback, y el botón "🎙 Antworten" no capturaba ningún texto —
era un teatro de dos clics sin memoria de lo que dijiste. El usuario lo
detectó viendo capturas de pantalla y pidió que se sintiera como una
conversación real. Se evaluaron dos caminos:

- **LLM real con backend** (Claude/Gemini conversando de verdad): requiere
  montar un backend (nunca se puede exponer una API key de pago en el
  cliente) y pagar por cada mensaje — rompe la arquitectura 100%
  estática/gratis del proyecto. El usuario decidió **no** ir por ahí.
- **Mejora sin backend (la que se implementó):** se eliminaron todos los
  `setTimeout` que avanzaban de pantalla sin que el usuario actuara.
  Ahora:
  1. Cuando Ola termina de hablar (saludo o una reacción), aparece un
     botón **"Weiter →"** — nada avanza hasta que el usuario lo toca
     (`OlaCall.continueFlow()`).
  2. Cuando Ola termina de hacer una pregunta, aparece un **campo de
     texto real** (`#call-input` + botón enviar) — el usuario escribe su
     respuesta en alemán de verdad, no un botón de "ya hablé"
     (`OlaCall.sendAnswer()`, con guard de texto vacío).
  3. `OlaCall.matchReaction(q, text)` busca palabras clave (`q.reactions[].kw`)
     dentro del texto escrito (países, profesiones, comidas, metas,
     lugares — una lista por cada una de las 5 preguntas) y, si encuentra
     una, Ola reacciona específicamente a eso (ej. escribes "Bolivien" →
     Ola menciona el Salar de Uyuni) en vez de un elogio genérico. Si no
     hay match, cae a `OlaCall.FEEDBACK` (pool de elogios variados, ya
     existente, ampliado de 5 a 7 frases).
  4. La reacción elegida se habla con el mismo `Speech.speak()` de
     siempre (audio dinámico real, no grabado) y también dispara el
     estado `showContinue()` — el ciclo pregunta→input→reacción→Weiter
     se repite hasta las 5 preguntas.

  Esto **no es un LLM** — es reconocimiento de palabras clave, así que
  solo reacciona bien a los temas ya cubiertos en `QUESTIONS[].reactions`.
  Sigue siendo 100% estático y gratis. Si el usuario decide más adelante
  que sí quiere una IA real conversando, el punto de entrada sería
  reemplazar `matchReaction()` por una llamada a un backend propio.

### 6.2 Sonidos que faltaban en el flujo de llamada (ring/accept/decline/hangup)

El usuario reportó que no se escuchaba nada al recibir la llamada, al
aceptarla ni al colgar. Diagnóstico real (no el que sugería un mensaje
externo pegado en el chat, que recomendaba "quitar los archivos .mp3 y
usar Web Audio API" — **esta app nunca tuvo archivos de audio**; `Sound`
ya es 100% Web Audio API con osciladores desde la sesión en que se
integró la llamada, y Quiz/Flashcards/Simulator/exámenes oficiales ya
usan `Sound.good/wrong/levelUp/end` desde entonces también — sección 7):
el gap real era que `OlaCall.ring()` no llamaba a `Sound` en absoluto
(pantalla de llamada entrante 100% muda) y `OlaCall.decline()` tampoco.
`accept()` sí llamaba a `Sound.connect()`, pero al ser el primer sonido
de la sesión en algunos casos, no había garantía de que fuera el primer
punto de desbloqueo del `AudioContext`.

Arreglado:
- `Sound.startRing()`/`stopRing()` — patrón de dos tonos que se repite
  cada 1.7s mientras `scr-call-incoming` está visible; arranca en
  `OlaCall.ring()`, que se dispara directo desde el `onclick` de la
  tarjeta "📞 Llamar a Ola" del dashboard — o sea, es el primer gesto de
  usuario de todo el flujo, ideal para crear+resumir el `AudioContext`
  sin depender de que accept() sea el primer intento.
- `Sound.decline()` — tono corto descendente, distinto del ring, para
  cuando el usuario rechaza la llamada.
- `Sound.connect()` reforzado con una tercera nota ascendente (antes 2
  tonos, ahora 3) para que "conectando" se note más.
- `hangup()` ya disparaba `Sound.end()` vía `finish()` — se mantiene, ya
  que `ring()` ahora garantiza que el `AudioContext` esté desbloqueado
  desde el primer toque de toda la sesión de llamada.

Verificado con Playwright en Chromium real: `Sound.ctx.state==='running'`
inmediatamente después del clic en la tarjeta de llamada (no
`'suspended'`), el intervalo de ring se limpia correctamente al aceptar
y al rechazar, y las cuatro transiciones (ring→accept, ring→decline,
accept→hangup) no arrojan errores de consola.

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

## 10. Voice Input + Ruta Hugging Face

**Web Speech API integrado (actual):**

- Módulo Sprechen: micrófono 🎤 en la llamada con Ola, reconocimiento
  alemán (de-DE) via Web Speech API del navegador.
- Botón aparece solo en Chrome/Edge/Android; fallback automático a texto
  en Safari/iOS (cero ruptura de UX).
- Texto reconocido se escribe en vivo en el campo de input; usuario puede
  editar antes de enviar.
- Sin backend, sin costo, offline-capable.
- **Código:** `OlaCall.initRecognition()` + `toggleMic()` +
  `call-live-caption` para subtítulos en vivo.

**Ruta Hugging Face (futuro, arquitectura lista):**

Web Speech API cubre el caso de uso educativo actual (A2-B2 aprenden), pero
si en el futuro se quiere **precisión mejorada** o **entendimiento semántico**
de las respuestas:

1. **Reemplazar ASR**: Usar un modelo de Hugging Face como `facebook/wav2vec2-large-de`
   (speech-to-text alemán) en lugar de Web Speech API. Requiere backend
   (llamada a API HF o self-hosted).

2. **Mejorar keyword matching → NLP semántico**: Actualmente `matchReaction()`
   busca palabras clave exactas (`kw: ['palavra1','palavra2',...]`). Se
   podría reemplazar con:
   - Embeddings via Hugging Face (`sentence-transformers/distiluse-base-multilingual-cased-v2`)
   - Similaridad coseno entre respuesta del usuario y `reactions[]` descriptions
   - Más robusto a sinónimos y variaciones (ej: "soy cocinero" vs "trabajo
     como chef")

3. **Generar respuestas dinámicas**: Actualmente Ola responde con mensajes
   prefijados en `FEEDBACK`. Futuro: usar un modelo generativo de HF
   (`mistral`, `zephyr`, etc.) para generar feedback contextual.

**Por qué todavía no:** Web Speech API es suficiente para la propuesta
educativa actual (texto es fallback siempre disponible), agrega cero
latencia/costo, y mantiene la app 100% client-side. HF mejoraría precisión
pero añadiría complejidad (backend, latencia, costos).

**Cómo prepararlo:** La función `matchReaction(text)` que parsea las `QUESTIONS`
y elige `reactions[]` por keyword está isolada (línea ~1100 en OlaCall). Se
puede reemplazar su internals sin tocar `sendAnswer()` / `ring()` / cualquier
otra parte del flujo. Mismo patrón que Web Speech API: **entrada (texto) →
matching (hoy keyword, futuro HF) → salida (reacción)** — la interface es
estable, el motor es intercambiable.

## 11. Escalado de dificultad + corrección de errores en OlaCall

**Escalado de dificultad:**

- Ola empieza en **Stufe 1** (5 preguntas básicas: nombre/origen, profesión,
  comida favorita, metas del año, lugar para visitar).
- Tras **3 llamadas completas**, sube a **Stufe 2** (6 preguntas — se suman
  3 nuevas en pasado/más abiertas: fin de semana, sueño de vida, día perfecto).
- Tras 3 llamadas más, sube a **Stufe 3** (7 preguntas — se suman 3
  hipotéticas/reflexivas: qué harías con un millón, mayor desafío, qué
  cambiarías del pasado).
- El progreso vive en `Store.data.olaCall = {level, calls}` (mismo
  localStorage que el resto, `alodeutsch_progress_v1`); `bumpOlaCall()` en
  `Store` incrementa `calls` y sube `level` cada 3ª llamada (tope: 3).
- En cada llamada, `accept()` arma `sessionQuestions` filtrando `QUESTIONS`
  por `q.level<=level`, mezclando con `Util.shuffle` (ya existente, usado
  también en Quiz/Flashcards/Placement) y recortando al tamaño de
  `LEVEL_SIZES[level]` — nunca la misma secuencia fija dos veces.
- Badge visual `Stufe N` junto al nombre de Ola durante la llamada; toast
  `🎉 ¡Subiste de nivel!` al completar la 3ª/6ª/9ª llamada natural.
- `resetProgress()` (botón "Reiniciar progreso" del dashboard) reinicia
  `olaCall` a `{level:1,calls:0}` igual que el resto de las estadísticas —
  no hizo falta tocar esa función, ya recarga defaults vía `load()`.

**Corrección de errores comunes:**

- Antes de que Ola reaccione al contenido de la respuesta (`matchReaction`),
  `checkMistake(text)` revisa una lista curada de ~10 errores típicos de
  principiante: género de artículo (`der Frau`→`die Frau`, `die Mann`→`der
  Mann`, `der/die Kind/Auto/Haus/Buch`→`das ...`, `der/das Stadt`→`die
  Stadt`), "ich bin + infinitivo" en vez del verbo conjugado (`ich bin
  gehen`→`ich gehe`), "ich habe X Jahre" en vez de "ich bin X Jahre alt", y
  typos frecuentes (`wieviel`→`wie viel`, `Deutch/Duetsch/Dutsch`→`Deutsch`).
- Si hay match, Ola antepone una corrección en alemán (`✏️ Kleine Korrektur:
  Man sagt „X", nicht „Y"."`) antes de su reacción normal — sin traducir el
  error en sí, tal como se pidió.
- Igual que el keyword matching: **no hay LLM detrás**, es una lista de
  reglas (regex + `build()` para las dos correcciones que necesitan tomar
  una palabra capturada y conjugarla). Mismo principio de "romper la
  sensación de guion fijo sin backend" que ya regía el resto de OlaCall.

**Verificado con Playwright:** 3 llamadas consecutivas completas disparan
el toast de subida de nivel (`level:1→2`); Stufe 2 y 3 arman pools del
tamaño y mezcla de niveles correctos; los 7 patrones de corrección
probados (`der Auto`, `ich bin gehen`, `wieviel`, `Deutch`, `der Frau`,
más los negativos `das Auto`/`die Frau` que no deben dispararse)
detectan/no-detectan exactamente como se espera; `resetProgress()`
confirmado que reinicia el nivel a 1.

## 12. Mini-juegos: "Ordena la oración" + "Modo contrarreloj"

Primeros dos mini-juegos de la app (parte del pendiente de la sección 3),
accesibles desde tarjetas en el dashboard (mismo patrón `call-cta-card`
que "Llamar a Ola"):

**🧩 Ordena la oración (`SentenceOrder`, `#scr-sentence-order`):**
- Se muestra una frase en español; el usuario toca fichas de palabras en
  alemán en el orden correcto. Refuerza estructura (Verbo Pos. 2, etc.)
  sin exigir escritura ni ortografía.
- `SENTENCE_BANK` (5 frases iniciales) — agregar más es solo sumar objetos
  `{es, words:[...]}` al array.
- Botones: Reiniciar (re-mezcla), Comprobar (✓ verde + `Sound.good()` /
  ✗ rojo + `Sound.wrong()`), "Otra frase" (nueva ronda al azar).
- `open()` hace `App.go('sentence-order')` + `start()` — la tarjeta del
  dashboard inicializa el juego al entrar.

**⏱️ Modo contrarreloj (`SpeedMode`, `#scr-speedmode`):**
- Ronda de 60 segundos de vocabulario ES→DE con 4 opciones;
  `SPEEDMODE_VOCAB` (20 palabras con artículo — practica género de paso).
- Timer con clase `critical` (rojo + pulso `speedTick`) a los ≤10s;
  pantalla de resultado con "Jugar de nuevo"; `Sound.good()`/`Sound.wrong()`
  por respuesta y `Sound.end()` al terminar la ronda.
- La ronda arranca con el botón "Empezar", no al entrar a la pantalla —
  el timer nunca corre antes de que el usuario esté listo.
- **Limpieza del timer:** `App.goBack()` limpia `SpeedMode.timer` y apaga
  `running`, igual que ya hacía con Simulator y la llamada de Ola. Si se
  agrega otro modo con `setInterval`, replicar esa línea en `goBack()`.

**Pendiente relacionado (futuro):** conectar ambos juegos al sistema de
XP/racha cuando exista (hoy es solo mockup de diseño), y alimentar
`SPEEDMODE_VOCAB` desde los `DECKS` existentes (formato distinto `{f,b}`,
requiere un mapeo pequeño).

**Verificado con Playwright:** orden correcto → feedback ✓ ok; orden
inverso → feedback ✗ bad; "Otra frase" limpia el feedback; score solo
sube con respuestas correctas (3/5 aciertos → score 3); clase `critical`
aparece a los ≤10s; al llegar a 0 aparece el resultado; salir con "atrás"
a mitad de ronda detiene el timer (sin interval fantasma); regresión de
la llamada con Ola (badge Stufe + checkMistake) intacta; las 3 tarjetas
del dashboard presentes; cero errores de página.

## 13. Gamification: XP + racha diaria + meta diaria (Fase 1 del roadmap)

El "loop de hábito" que da motivo para volver cada día:

- **XP en toda la app**: +10 por respuesta correcta en Quiz/exámenes
  oficiales/Flashcards (insertado en las 19 ocurrencias del patrón
  `if(ok){ Sound.good(); Ola.blink(); }` con un solo replace, igual que
  se hizo con los sonidos en la sección 7), +15 por respuesta en la
  llamada con Ola, +5 por frase ordenada correcta, `score*2` al terminar
  una ronda de contrarreloj.
- **Racha diaria**: `Store.data.streak = {current, longest, lastDate,
  todayXP}`. La primera XP de cada día extiende la racha;
  `Gamification.checkDayRollover()` (llamado en cada carga) la rompe si
  pasó más de 1 día sin actividad — el widget nunca muestra una racha
  vieja como viva. Comparación por `Date().toDateString()` (día natural,
  sin horas).
- **Meta diaria**: `DAILY_GOAL = 50` XP; al cruzarla suena
  `Sound.levelUp()` + `Ola.celebrate()` + toast "🎯 ¡Meta diaria
  cumplida!".
- **Widget** `#streak-widget` en el dashboard (llama 🔥 + días de racha +
  XP total + barra de progreso de la meta), re-renderizado en cada
  `Gamification.add()` y cada visita al dashboard.
- `resetProgress()` también lo reinicia (mismo mecanismo que olaCall:
  borra la key y `load()` re-crea los defaults).

**Verificado con Playwright:** primera XP del día inicia racha; día
consecutivo la extiende (5→6); hueco de 3 días la resetea a 0 con solo
abrir la app; celebración al cruzar 50 XP; widget correcto; los 4 hooks
dan las cantidades correctas; persistencia tras reload; cero errores.

**Fases siguientes del roadmap (pendientes):** Fase 2 recompensas
sensoriales (combos con tono ascendente en contrarreloj, confetti,
haptics con `navigator.vibrate()`), Fase 3 variedad diaria (desafío del
día determinista por fecha, mini-juego Der/Die/Das, contrarreloj
alimentado por DECKS), Fase 4 retención (PWA instalable + notificación
local + pantalla de stats).

## 14. Ajustes UX de OlaCall tras prueba real del usuario en HF

El usuario probó en el Space y reportó "no corrige cuando hablo mal" y
"se queda en Stufe 1". Los screenshots probaron que la versión nueva SÍ
estaba desplegada (badge y 🎤 visibles); los problemas eran de diseño:

1. **Lista de correcciones demasiado corta**: "Ich liebe kafe" caía al
   elogio genérico porque "kafe" no estaba entre los ~10 patrones. Se
   agregaron ~14 más (ortografía frecuente: Kaffee/essen/kommen/heisse;
   umlauts faltantes que sin umlaut no son alemán válido: möchte/können/
   für/über/natürlich/tschüss/Grüsse/später/während; y "du bist +
   infinitivo" además de "ich bin + infinitivo"). Se excluyeron a
   propósito palabras ambiguas que existen sin umlaut (schon, wurde,
   musste) para evitar falsos positivos — regla a mantener si se amplía.
2. **Progreso de Stufe invisible**: subir requiere 3 llamadas COMPLETAS
   (todas las preguntas respondidas), pero la app no lo decía en ningún
   lado. Ahora el badge muestra "Stufe 1 · 2/3" y el resumen de llamada
   explica el resultado: progreso X/3 tras llamada completa, felicitación
   al subir, nota de nivel máximo en Stufe 3, o aviso "esta llamada no
   contó" si se colgó antes de terminar. La mecánica no cambió, solo la
   comunicación.
