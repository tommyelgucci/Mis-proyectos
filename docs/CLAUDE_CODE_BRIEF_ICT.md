# BRIEF PARA CLAUDE CODE — Proyecto ICT-Eignungstest Study Suite

> Documento de traspaso completo. Contiene todo lo necesario para entender, mantener o unificar
> las 6 apps de estudio existentes en una sola aplicación. Léelo entero antes de escribir código.

---

## 1 · CONTEXTO DEL PROYECTO

**Usuario:** Tommy, prepara el examen **ICT-Eignungstest (Informatiker/in EFZ Applikationsentwicklung)** en Suiza.
- Idioma de estudio: explicaciones en **español**, terminología del examen en **alemán**.
- ~5 horas diarias de estudio. También cursa CS50P/CS50x y curso de alemán (Migros).
- El examen mide velocidad y precisión bajo presión, no conocimiento avanzado.

**Historia del proyecto:** el contenido base venía de Gemini. Se detectaron y corrigieron varios
errores reales en él (ver §5). El estándar de calidad quedó definido por esas correcciones.

## 2 · LAS 6 APPS EXISTENTES (HTML autónomos, un archivo cada una)

| Archivo | Categoría | Contenido |
|---|---|---|
| `vernetztes-denken-app.html` | Pensamiento sistémico | 18 ejercicios curados (cadenas causales con signos +/−, bucles, retrasos, magnitudes). Diagrama tipo "línea de tren suiza". |
| `analyse-programmierung-app.html` | Trazado de código | 6 ejercicios curados con **trace-table stepper** interactivo + Sprint generativo (5 tipos de programa). |
| `konzentration-merkfaehigkeit-app.html` | Concentración/memoria | Sprint generativo (4 tipos) + simulador de **memoria diferida** con registros aleatorios que desaparecen del DOM. |
| `mathematik-app.html` | Matemáticas | Sprint generativo (7 tipos) + 11 ejercicios curados + teoría ampliada (tabla fracción↔decimal↔%, divisibilidad). |
| `zahlenreihen-app.html` | Series numéricas | Sprint generativo (9 familias de series) con revelación visual de la estructura (diferencias anotadas). |
| `vorstellungsvermoegen-app.html` | Visualización espacial | 6 ejercicios curados: redes de cubo plegables con **CSS 3D real** (cruz, escalera, T, Z, red imposible 2×3, rotación de 3 ejes). |

## 3 · ARQUITECTURA COMPARTIDA (respetarla en cualquier app nueva o unificada)

### 3.1 Sistema de diseño (idéntico en las 6)
```css
--bg:#F7F6F3; --panel:#FFFFFF; --ink:#1C1C1C; --muted:#6B6864; --line:#D8D5CC;
--red:#D8232A;   /* acento principal, rojo suizo */
--pos:#1F7A4C; --pos-bg:#E6F1EA;   /* correcto/positivo */
--neg:#A63A22; --neg-bg:#F6E9E3;   /* incorrecto/negativo */
--amber:#B8860B; --purple:#7A2A63; --purple-bg:#F0E3EE; --blue:#2E6DA4;
```
- Header negro con "rail" de guiones rojos (repeating-linear-gradient).
- Navegación por pestañas sticky: `Teoría / ⚡ Sprint / (extra) / Progreso`.
- Tipografía: Helvetica Neue; monoespaciada "SF Mono" para números/código.
- Niveles de ejercicio: `medio` (ámbar) / `avanzado` (rojo oscuro) / `extremo` (púrpura). Vernetztes usa además `basico` e `intermedio`.

### 3.2 Persistencia
`window.storage` (API async get/set del entorno de artifacts de Claude.ai; si se migra fuera,
sustituir por localStorage con la misma interfaz). Claves usadas:
- `vernetztes-denken-progress` → `{mastered, checklist}`
- `analyse-programmierung-progress` → `{mastered, stats, best}`
- `konzentration-merkfaehigkeit-progress` → `{stats, best, memBest}`
- `mathematik-progress` → `{mastered, stats, best}`
- `zahlenreihen-progress` → `{stats, best}`
- `vorstellungsvermoegen-progress` → `{mastered}`

### 3.3 Patrón del motor Sprint (el corazón del proyecto)
```
GENERATORS = { tipo: {fn: genX, label: "..."} }
- Cada genX() devuelve: {type, text/code/html, options[3-4], correct, explain}
- La respuesta correcta SIEMPRE se CALCULA (nunca se escribe a mano).
- Los distractores son ERRORES REALES calculados (ver §4).
- Sprint: N preguntas / T segundos globales, HUD (progreso·timer·score),
  feedback inmediato con explicación, récord (best) y stats {tipo:{ok,total}} persistidos.
- Selección de tipos por el usuario (botones toggle, mínimo 1 activo).
- Casos degenerados (opciones que colisionan) se detectan y regeneran en bucle for(tries).
```

## 4 · ESPECIFICACIÓN DE GENERADORES (todos verificados por código)

### Mathematik (7) — verificados con ~9.000 casos
1. **percent**: p% de N. p∈{5..75 múltiplos de 5}, N múltiplo de 20 → respuesta entera. Distractores: ±5% de N.
2. **fraction**: comparar 3 fracciones del pool (valores distintos). Pregunta MAYOR/MENOR.
3. **estimate**: a×b con decimales tipo 19.95. **Regla crítica: la correcta es la opción MÁS CERCANA al valor exacto** (regla aportada por Tommy tras corregir un error mío, ver §5.4). Se evitan empates regenerando.
4. **inverse**: proporcionalidad inversa (días-persona). Distractor clave: el total en vez de los ADICIONALES.
5. **direct**: tasas (solicitudes/segundo). Distractor: aplicar lógica inversa.
6. **chained**: descuentos encadenados + IVA suizo 8.1% + redondeo a 0.05 CHF (`round(x/0.05)*0.05`). Distractores: sumar descuentos de golpe; olvidar IVA.
7. **data**: transferencia MB→Mb (×8) ÷ Mbps → min:seg. Distractor: olvidar ×8. Se fuerzan segundos enteros.

### Konzentration (4) — coordenadas verificadas con 10.000 casos
1. **blockdiff**: dos cadenas de 5-7 bloques, UN carácter mutado usando tabla de **pares confundibles** (M↔N, 8↔3, 6↔5, U↔V, 1↔7...). Sin I ni O en el alfabeto (confusión con 1/0). Pregunta: ¿qué bloque difiere?
2. **samediff**: 50% idénticas / 50% con mutación sutil. Respuesta binaria de velocidad.
3. **vector**: celda inicial (3-8 para no salirse) + vector [−2..2]² ≠ (0,0). Tablero visual A-J × 1-10. Distractores: invertir dirección de fila; intercambiar ejes. La solución se revela EN el tablero.
4. **midpoint**: 60% distancias pares (punto medio exacto), 40% impares → respuesta correcta: **«No hay celda única»**. La trampa del material de Gemini convertida en categoría entrenable.

Memoria diferida: registros generados (pools de nombres suizos, dispositivos SRV-LX/DB-DATA/FW-EDGE..., IPs de 3 rangos, incidencias con valores). Flujo: memorizar 40s → los registros se ELIMINAN del DOM → distractores matemáticos → quiz de opción múltiple donde los distractores son los datos de los OTROS registros.

### Zahlenreihen (9) — verificados con 27.000 series recalculadas por derivación independiente
arith · geom(×2,×3) · geomdiv(÷2, inicios divisibles por 32) · growdiff(diferencias +inc regulares) ·
square(n²+k) · altern(zigzag +p/−q; **el 7º término tras 6 mostrados aplica −q**) · fib · multadd(×2+c) ·
**interleaved** (dos series alternadas — la trampa nº1; distractor: continuar la serie equivocada).
Elemento distintivo: al responder, las diferencias (+7, −3, ×2...) se anotan en ámbar entre los términos.

### Analyse & Programmierung (5) — verificados con 25.000 programas ejecutados
Los distractores son **ejecuciones reales del programa con el bug mental típico**:
1. **modloop**: FOR+IF MOD. Bugs: límite exclusivo (hi−1); MOD invertido.
2. **nested**: FOR anidado con límite interno = I. Bug: creer que el límite interno es fijo (=N).
3. **cond**: IF/ELSE IF/ELSE con AND. Distractores: los valores de las ramas NO tomadas.
4. **assign**: A=B+C; B=A−C; C=A+B. Bug: usar valores iniciales en vez de actualizados.
5. **rec**: factorial/suma recursiva. Bug: descontar un nivel (F(n−1)).
Pseudocódigo abstracto en inglés (IF/FOR/WHILE), no PSeInt.

## 5 · ERRORES DETECTADOS Y CORREGIDOS (historia de calidad — NO reintroducirlos)

1. **Gemini, Vernetztes E13**: clasificó el bucle B→D→C→B como refuerzo; el conteo real da 3 negativos (impar) → **estabilizador**. Regla: nº impar de negativos = balance; par = refuerzo.
2. **Gemini, Konzentration E1**: dijo "posición 14" para la discrepancia AM72/AN72; el conteo carácter a carácter da **posición 17**. Por eso las apps reportan «Bloque N, carácter local M».
3. **Gemini, punto medio E2/G7**: distancia impar (5) tratada como si tuviera respuesta única "F4 o F5". Correcto: **no existe celda única** — ahora es categoría del Sprint.
4. **Claude, estimación 49×19.95**: yo respondí "CHF 1000" por redondear ambos factores; Tommy detectó que el exacto (977.55) está más cerca de 970. **Regla incorporada al generador: la correcta es la opción más cercana al exacto; redondear solo UN factor.**
5. **Gemini, red escalonada**: contenía un bloque 2×2 imposible (4 caras en un vértice). Corregida a escalera de solape simple. El simulador de plegado confirma: bloques 2×2 y 2×3 llenos → caras superpuestas. Solo 11 de los 35 hexominós son redes válidas.
6. **Claude, verificador de zigzag**: mi propio test recalculaba el 7º término con +p en vez de −q — el generador era correcto, el test no. Lección: los tests también se verifican.

## 6 · PROTOCOLO DE VERIFICACIÓN OBLIGATORIO

Antes de afirmar cualquier resultado o entregar cualquier generador:
1. **Ejecutar el cálculo con código** (Node/Python), nunca a ojo.
2. Generadores: miles de casos aleatorios con **recálculo por derivación independiente** (no reusar la fórmula del generador).
3. Redes de cubo: **simulador de plegado con matrices de rotación** (marco local x=derecha, y=arriba, z=espectador; top/bottom rotan sobre x, left/right sobre y; validez = 6 normales distintas ±x,±y,±z; opuestas = normales opuestas). Validar primero contra una red de pares conocidos.
4. Tras parchear HTML: `new Function(scriptContent)` para chequear sintaxis JS.
5. Si el usuario detecta un error: reconocerlo explícitamente, verificar, corregir — nunca defender la respuesta original.

## 7 · SI SE UNIFICA EN UNA SOLA APP (recomendaciones)

- **Estructura**: pantalla de inicio con las 6 categorías → cada una conserva sus pestañas actuales. Un solo bundle de diseño (§3.1).
- **Storage**: unificar en una clave `ict-progress` con namespace por categoría, migrando las claves antiguas si existen.
- **Modo examen global**: sprint mixto que tome generadores de TODAS las categorías (ya comparten la misma interfaz `{options, correct, explain}` — son componibles).
- **Dashboard**: precisión por tipo across categorías; identificar los 3 tipos más débiles y sugerir entrenarlos.
- **No perder**: el trace-table stepper (Analyse), el plegado CSS 3D (Vorstellungsvermögen), la memoria diferida con borrado real del DOM (Konzentration), la revelación de estructura en series (Zahlenreihen) — son los elementos distintivos de cada categoría.
- **Pendiente de contenido**: glosario alemán de términos del examen (solicitado, aún no construido); categorías Deutsch/Englisch, IT-Grundwissen, Organisationsfähigkeit sin app propia.

## 8 · INVENTARIO DE ARCHIVOS

```
vernetztes-denken-app.html            (18 ejercicios curados)
analyse-programmierung-app.html       (6 curados + sprint 5 tipos)
konzentration-merkfaehigkeit-app.html (sprint 4 tipos + memoria generativa)
mathematik-app.html                   (sprint 7 tipos + 11 curados)
zahlenreihen-app.html                 (sprint 9 familias)
vorstellungsvermoegen-app.html        (6 curados, plegado 3D)
PLAN_ICT_ICT_12_SEMANAS.docx   (plan de estudio original)
01_VERNETZTES_DENKEN_Documento_Maestro.md (versión markdown archivada)
```
