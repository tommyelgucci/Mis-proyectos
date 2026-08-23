# 🧠 BrainBit — Archivo Maestro del Proyecto (v2)

> **Propósito:** backup completo para retomar el proyecto en una conversación nueva
> de Claude Code — con o sin acceso al repo original de GitHub. Contiene TODO el
> contexto: qué es el proyecto, qué está hecho, los contratos técnicos internos,
> cómo configurarlo y qué falta. Va acompañado de `brainbit-proyecto-completo.zip`
> con el código; este documento además contiene suficiente detalle para reconstruir
> cualquier pieza si hiciera falta. Ver §12 para el procedimiento exacto.

---

## 1. Qué es BrainBit

Plataforma web unificada de estudio para preparar exámenes de aptitud suizos de
dos carreras (`lib/tracks.ts`, ver §15): **Informatiker/in EFZ Applikationsentwicklung**
(la original) y, desde 2026-08-22, **Entwickler/in digitales Business EFZ** como
plan B — usan pruebas de aptitud distintas con temario parcialmente compartido.
Unifica mini-apps de entrenamiento que antes eran HTML independientes, añade
cuenta de usuario con sincronización de progreso en la nube y un tutor de IA
gratuito (Hugging Face).

> La regla de no nombrar al proveedor comercial del examen (que estaba acá)
> la sacó el propio dueño el 2026-08-22 — ya no aplica. Se puede usar el
> nombre real donde haga falta.

### Categorías de entrenamiento

| # | Categoría | Archivo HTML | Carrera(s) | Feature distintiva (NO perder) |
|---|---|---|---|---|
| 1 | 🧮 Mathematik | `mathematik-app.html` | ambas | 9 generadores infinitos + 30 ejercicios curados (16 nuevos: Ecuaciones y Aplicaciones, ver §15.11) |
| 2 | 🔢 Zahlenreihen | `zahlenreihen-app.html` | ICT | Revelación visual de la estructura de la serie |
| 3 | 💻 Analyse & Programmierung | `analyse-programmierung-app.html` | ICT | Trace-table stepper (ejecución paso a paso) |
| 4 | 👁️ Konzentration & Merkfähigkeit | `konzentration-merkfaehigkeit-app.html` | ambas | Memoria diferida con borrado real del DOM |
| 5 | 🕸️ Vernetztes Denken | `vernetztes-denken-app.html` | ambas | Teoría completa (Gomez & Probst 1987) + checklist |
| 6 | 📐 Vorstellungsvermögen | `vorstellungsvermoegen-app.html` | ICT | Plegado de cubos con CSS 3D |
| 7 | 🧩 Logik | `logik-app.html` | ambas (desde 2026-08-22) | Analogías verbales (pool por relación) + figurales (transform. de forma/color) |
| 8 | 📍 Coordenadas | `coordenadas-app.html` | Wirtschaft | Plano x/y real (con signos y cuadrantes) — reutiliza el look del tablero de Konzentration, no su mecánica de vector |
| 9 | 💻 Competencias digitales | `competencias-digitales-app.html` | Wirtschaft | Banco de 24 preguntas curadas (no generador) — es la única categoría de contenido puramente factual, ver §15.4 |
| 10 | 🤝 Escenarios de trabajo | `escenarios-trabajo-app.html` | Wirtschaft | Banco de 24 escenarios con respuesta "más recomendable" (no correcta en sentido matemático) — no se puntúa igual que el resto en el examen real, ver §15.5 |
| 11 | ✍️ Redacción | `redaccion-app.html` | Wirtschaft | Feedback por IA sin pass/fail para texto libre, MÁS un Sprint de opción múltiple sobre técnica de escritura (26 preguntas) — dos formatos, porque dos fuentes no coinciden en cuál usa el examen real, ver §15.7 y §15.12 |
| 12 | 🇩🇪 Deutsch | `deutsch-app.html` | Wirtschaft | Banco de 53 preguntas curadas, ortografía **suiza** (siempre "ss", nunca "ß"); Grammatik y Wortschatz reusan contenido real de Alodeutsch, ver §15.8 y §15.9 |
| 13 | 🇬🇧 Englisch | `englisch-app.html` | Wirtschaft | Banco de 54 preguntas curadas, inglés de oficina — no literario; Grammar y Vocabulary reusan contenido real de Aloenglish, ver §15.8 y §15.10 |

La columna "Carrera(s)" es la fuente de verdad de `Study.tsx` (`CATEGORIES[].tracks`)
y `progress-stats.ts` (`CATEGORY_META[].tracks`) — si se desincroniza, el
selector de carrera del header muestra categorías equivocadas. Ambos archivos
declaran el campo por separado a propósito (mismo motivo que el resto del
catálogo duplicado entre HTML y TS): son listas hermanas, no una única fuente
importada, así que un cambio de carrera en una categoría se edita en las dos.

---

## 2. Stack técnico (todo en tier gratuito)

| Capa | Tecnología | Hosting |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite + Zustand | Hugging Face Space (SDK: static) |
| Base de datos + Auth | Supabase (PostgreSQL + email/password + RLS) | Supabase free tier |
| Tutor IA + Sprint IA | Hugging Face Inference (router OpenAI-compatible, modelo `Qwen/Qwen2.5-7B-Instruct` por defecto) | Hugging Face free tier (con límites) |
| Verificación | Scripts `tsx` con derivación independiente | Local (`npm run verify`) |
| Deploy | GitHub Actions → build + push a HF Space | `.github/workflows/deploy-brainbit-to-hf.yml` |

Dependencias exactas: `@supabase/supabase-js ^2.41`, `zustand ^4.5`, `react ^18.3`,
`vite ^5`, `typescript ^5.2`, `tsx ^4.23` (dev). El cliente de IA (`lib/ai.ts`) usa
`fetch` directo — no requiere SDK adicional.

---

## 3. Estructura del repo

```
/
├── BRAINBIT_MASTER.md          ← este archivo
├── README.md
├── docs/
│   ├── CLAUDE_CODE_BRIEF_ICT.md              (brief original del proyecto)
│   ├── 01_VERNETZTES_DENKEN_Documento_Maestro.md
│   └── SUPABASE_SETUP.md                     (guía de configuración, 5 min)
├── supabase/
│   └── schema.sql              (tablas + políticas RLS — copia en §7)
└── frontend/
    ├── package.json            (scripts: dev, build, verify, lint)
    ├── .env.example
    ├── public/apps/            (las 6 apps HTML con shim inyectado — ver §5.3)
    └── src/
        ├── App.tsx             (pestañas: Inicio / Estudiar / Tutor IA / Progreso / Cuenta)
        ├── App.css             (sistema de diseño — tokens en §6)
        ├── engines/            (generadores TS: mathematik, zahlenreihen,
        │                        konzentration, analyse, index.ts con mixedSprint())
        ├── pages/
        │   ├── Study.tsx       (grid de 6 categorías → visor iframe + resumen de progreso)
        │   ├── Tutor.tsx       (chat IA vía Hugging Face, enfoque por categoría, historial Supabase)
        │   └── Account.tsx     (login/registro + estado de sync + modo local sin .env)
        ├── hooks/useAuth.ts    (sesión Supabase reactiva)
        ├── lib/
        │   ├── supabase.ts     (cliente; exporta supabaseEnabled — modo local si no hay .env)
        │   ├── ai.ts           (cliente Hugging Face + SYSTEM_PROMPT del tutor)
        │   └── ai-exercises.ts (generación de ejercicios IA + verificación — §8)
        ├── utils/
        │   ├── storage-bridge.ts   (postMessage iframe→parent, store Zustand)
        │   ├── sync.ts             (syncOnLogin, autosync, estados: idle/syncing/synced/error)
        │   └── merge-progress.ts   (fusión local↔remoto — reglas en §5.2)
        ├── styles/tutor.css
        └── scripts/
            ├── verify-generators.ts  (25 tipos × 1000 casos, derivación independiente)
            └── verify-merge.ts       (9 casos de fusión con las formas reales de datos)
```

---

## 4. Estado actual

### Fases completadas
- ✅ **Fase 1 — Scaffolding:** estructura frontend + Vite/TS
- ✅ **Fase 2 — Unificación UI:** 6 apps integradas vía iframe con shim de storage;
  25 generadores portados a TS; verificación 25.000 casos → 0 fallos
- ✅ **Fase 3 — Autenticación:** Supabase Auth, sincronización con fusión inteligente,
  importación automática del historial localStorage al iniciar sesión
- ✅ **Fase 4 — Tutor IA:** chat con IA, enfoque por categoría, historial en Supabase
- ✅ **Fase 5 — Sprint IA:** verificadores extraídos a `src/engines/verifiers.ts`
  (compartidos con el script), `lib/ai-exercises.ts` (generación con IA +
  verificación obligatoria y regeneración), `components/Quiz.tsx` (quiz nativo React)
  y `pages/AISprint.tsx` (mezcla curados+IA con badge "✨ IA" y contadores), accesible
  desde la card "✨ Sprint IA" en Estudiar. Spec original en §8.
- ✅ **Migración a Hugging Face:** el tutor y el Sprint IA usan Hugging Face
  Inference (gratis con límites) en vez de Claude — `lib/ai.ts` (`chatCompletion`,
  `chatWithTutor`). El deploy se hace a un HF Space estático vía GitHub Actions
  (`.github/workflows/deploy-brainbit-to-hf.yml`), ver §7.3.
- ✅ **DESPLEGADO Y FUNCIONANDO:** repo `tommyelgucci/Mis-proyectos` (rama `main`) →
  Space `GucciTommy/BrainBit` → URL pública directa (sin wrapper de HF):
  **https://guccitommy-brainbit.static.hf.space** — úsala para agregar a
  pantalla de inicio en el celular. La URL `huggingface.co/spaces/GucciTommy/BrainBit`
  también sirve pero muestra el wrapper/banner de HF encima.
  ⚠️ **El tutor/Sprint IA están DESACTIVADOS en esta versión pública** (ver §7.3.1
  — HF bloquea el push si detecta el token horneado en el bundle). Funcionan solo
  en local con `.env` propio.

### Fases pendientes
- ✅ **Fase 6 — Dashboard de progreso:** hecho (rama del experimento SnapDeploy).
  `pages/Progress.tsx` + `lib/progress-stats.ts` (agregación pura) +
  `scripts/verify-progress.ts` (48 comprobaciones, dentro de `npm run verify`).
  Muestra tiles de resumen, sugerencia de siguiente sesión, puntos débiles y
  detalle por categoría/tipo. Ver §14.
- ⬜ **Fase 7 — Búsqueda en internet** (opcional): SerpAPI o similar, vía backend.
- ✅ **RESUELTO — decisión del tutor en producción:** en vez de un proxy
  serverless para el Space de HF, el usuario optó por **clonar el proyecto a
  SnapDeploy** (hosting Docker/Node completo), donde un backend real resuelve
  el problema de raíz (el token nunca se hornea en ningún bundle). Ver §13
  para el detalle completo. El Space de HF (`main`) queda tal cual, sin
  tutor — es intencional, no un pendiente.

### 🧪 Rama experimento activa: `claude/snapdeploy-groq-experiment`
- ✅ Backend con Groq (`backend/routes/ai.js`), frontend apuntando al backend
  propio (no a HF directo), nueva función **"🎧 Clase con IA"** (narración
  por voz de un ejercicio verificado). Ver §13. `main`/HF Static **no se
  tocan** — esta rama es un clon experimental aparte.

---

## 5. Contratos técnicos internos (imprescindibles para extender sin romper)

### 5.1 Interfaz `Exercise` (todos los generadores la cumplen)

```ts
export interface Exercise {
  type: string;        // id del tipo, p.ej. 'percent'
  typeLabel: string;   // etiqueta visible, p.ej. 'Porcentajes'
  text: string;        // enunciado
  context?: string;    // contexto opcional (historia/tabla)
  options: string[];   // 2-4 opciones, únicas
  correct: string;     // SIEMPRE ∈ options; SIEMPRE calculada, nunca a mano
  explain: string;     // explicación paso a paso
  meta?: Record<string, unknown>; // datos del motor (p.ej. terms en series, code en analyse)
}
```

**Regla de oro:** la respuesta correcta se calcula; los distractores son errores
reales plausibles (también calculados). Invariantes verificadas: `correct ∈ options`,
sin duplicados, 2–4 opciones.

### 5.2 Los 25 tipos de generadores TS

- **mathematik (7):** `percent`, `fraction`, `estimate`, `inverse`, `direct`, `chained`, `data`
- **zahlenreihen (9):** `arith`, `geom`, `geomdiv`, `growdiff`, `square`, `altern`, `fib`, `multadd`, `interleaved` — todos exponen `meta.terms: number[]`
- **konzentration (4):** `blockdiff`, `samediff` (exponen `meta.html`), `vector`, `midpoint` (cuadrícula A–J × 1–10)
- **analyse (5):** `modloop`, `nested`, `cond`, `assign`, `rec` — todos exponen `meta.code` (pseudocódigo)

`engines/index.ts` exporta `mixedSprint()` para el futuro modo examen global.

### 5.3 Claves de storage y forma de los datos

Las 6 apps guardan su progreso en localStorage bajo estas claves:

```
vernetztes-denken-progress          { mastered: {id:true}, checklist: {id:true}, ... }
analyse-programmierung-progress     { stats: {tipo:{ok,total}}, best, mastered, ... }
konzentration-merkfaehigkeit-progress { stats: {tipo:{ok,total}}, best, memBest }
mathematik-progress                 { stats: {tipo:{ok,total}}, best, ... }
zahlenreihen-progress               { stats: {tipo:{ok,total}}, best, ... }
vorstellungsvermoegen-progress      { stats, best, ... }
```

**Shim inyectado en cada HTML:** reemplaza el `window.storage` original por un
adaptador async sobre localStorage que además notifica al parent:

```js
window.parent.postMessage(
  { source: 'brainbit-app', type: 'progress', key, value: String(value) }, '*'
);
```

`storage-bridge.ts` escucha esos mensajes (filtra por `source === 'brainbit-app'`),
mantiene un snapshot en Zustand y dispara el autosync a Supabase.

### 5.4 Reglas de fusión local↔remoto (`merge-progress.ts`)

Estrategia por campo, sin perder nunca nada:

| Campo | Regla |
|---|---|
| `best`, `memBest` | máximo de ambos |
| `mastered`, `checklist` | unión (dominado en cualquiera = dominado) |
| `stats` | por tipo de ejercicio, gana la entrada con más intentos (`total`) |
| resto | gana el valor local si existe (`l ?? r`) |
| un lado `null` | se conserva el otro |

### 5.5 Tabla `progress` en Supabase

Una fila por `(user_id, key)` donde `key` es la clave de storage del §5.3 y
`data` (jsonb) es el mismo JSON que usa la app. Al iniciar sesión:
descargar remoto → `mergeProgress(local, remoto)` → escribir resultado en
localStorage Y en Supabase (upsert).

---

## 6. Sistema de diseño (tokens CSS en `App.css`)

```css
:root {
  --bg: #F7F6F3;      /* fondo crema */
  --panel: #FFFFFF;
  --ink: #1C1C1C;     /* texto principal */
  --muted: #6B6864;
  --line: #D8D5CC;    /* bordes */
  --red: #D8232A;     /* acento principal (estilo suizo) */
  --pos: #1F7A4C;  --pos-bg: #E6F1EA;   /* correcto */
  --neg: #A63A22;  --neg-bg: #F6E9E3;   /* incorrecto */
  --amber: #B8860B;
  --purple: #7A2A63; --purple-bg: #F0E3EE;
  --blue: #2E6DA4;
}
```

Tipografía: Helvetica Neue / system sans. Header negro con franja de rayas rojas.
Las 6 apps HTML usan la misma paleta — coherencia visual total.

---

## 7. Configuración externa

### 7.1 Schema de Supabase (SQL Editor → New query → pegar → Run)

```sql
-- BrainBit — Schema de Supabase

-- Progreso por categoría. Una fila por (usuario, clave de storage).
create table if not exists public.progress (
  user_id    uuid not null references auth.users (id) on delete cascade,
  key        text not null,
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own"
  on public.progress for select
  using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own"
  on public.progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "progress_delete_own" on public.progress;
create policy "progress_delete_own"
  on public.progress for delete
  using (auth.uid() = user_id);

-- Historial del chat con el tutor IA.
create table if not exists public.chat_history (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  content    text not null,
  category   text,
  created_at timestamptz not null default now()
);

alter table public.chat_history enable row level security;

drop policy if exists "chat_select_own" on public.chat_history;
create policy "chat_select_own"
  on public.chat_history for select
  using (auth.uid() = user_id);

drop policy if exists "chat_insert_own" on public.chat_history;
create policy "chat_insert_own"
  on public.chat_history for insert
  with check (auth.uid() = user_id);
```

### 7.2 Variables de entorno (`frontend/.env`, copiar de `.env.example`)

```
VITE_SUPABASE_URL=        ← Supabase → Project Settings → API → Project URL
VITE_SUPABASE_ANON_KEY=   ← Supabase → Project Settings → API → anon public key
VITE_HF_API_KEY=          ← huggingface.co/settings/tokens (permiso "read" alcanza)
VITE_HF_MODEL=            ← opcional; por defecto Qwen/Qwen2.5-7B-Instruct
```

- **Nunca subir `.env` al repo** (está en `.gitignore`).
- Sin estas variables la app funciona en **modo local** (progreso solo en el
  navegador, tutor y Sprint IA desactivados) — es un modo soportado, no un error.
- El token de Hugging Face en frontend queda expuesto en el bundle (equivalente a
  `dangerouslyAllowBrowser`). Aceptable para uso personal; antes de publicar para
  terceros, mover estas llamadas a un backend o edge function de Supabase.
- Hugging Face Inference es **gratis con límites de uso**, no ilimitado — si el
  tutor empieza a fallar con error 429, se alcanzó el límite temporal.

### 7.3 Deploy a Hugging Face Space (estático, gratis) — YA CONFIGURADO Y LIVE

Estado real (no un ejemplo): repo `tommyelgucci/Mis-proyectos`, Space
`GucciTommy/BrainBit`, URL directa **https://guccitommy-brainbit.static.hf.space**
(la de `huggingface.co/spaces/GucciTommy/BrainBit` funciona pero muestra el
wrapper/banner de HF encima — usar `.static.hf.space` para uso real).

La app es una SPA 100% estática tras el build (sin backend propio), así que
encaja con un Space tipo "Static". El workflow
`.github/workflows/deploy-brainbit-to-hf.yml` construye `frontend/` y publica
`dist/` en cada push a `main` que toque `frontend/**`. Secrets ya cargados en
GitHub (Settings → Secrets and variables → Actions):
   - `HF_SYNC_TOKEN_OLA` — token HF con permiso **write**
   - `HF_BRAINBIT_SPACE_ID` = `GucciTommy/BrainBit`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — valores del §7.2
   - `VITE_HF_API_KEY` — **NO está cargado a propósito**, ver §7.3.1

Sin `HF_SYNC_TOKEN_OLA`/`HF_BRAINBIT_SPACE_ID` el workflow no falla: detecta que
faltan y omite el deploy (mismo patrón que el workflow existente `sync-to-hf.yml`
de `cognilab/`).

Para volver a desplegar tras un cambio: push a `main`, o disparo manual
(`workflow_dispatch`) desde la pestaña Actions de GitHub.

#### 7.3.1 ⚠️ Lección crítica: HF bloquea claves horneadas en Spaces estáticos

**No volver a intentar poner `VITE_HF_API_KEY` (ni ninguna clave HF real) como
secret de build en este workflow.** Ya se probó y falla siempre:

- Un Space **Static** no tiene servidor — cualquier `VITE_*` que se le pase al
  build queda literalmente escrito en el JS compilado (`assets/index-*.js`),
  visible para cualquiera que lo descargue.
- Hugging Face tiene un **pre-receive hook que escanea el contenido del push**
  y lo **rechaza** si detecta un token de HF válido adentro, con este error:
  `"It appears that one or more of your files contain valid Hugging Face
  secrets... Offending files: assets/index-*.js"` → `pre-receive hook declined`.
- **Se probó también con el Space en Private** por si acaso — falla exactamente
  igual. El bloqueo no depende de la visibilidad del Space.
- Por eso la versión pública actual se compiló y desplegó **sin**
  `VITE_HF_API_KEY`: `aiEnabled` da `false`, el tutor y el Sprint IA muestran su
  mensaje de "no configurada" pero el resto de la app funciona perfecto.

**La única forma correcta de tener el tutor en la versión pública** es que el
token viva en un servidor (nunca en el bundle del navegador) y el frontend le
hable a ese servidor en vez de a HF directo. Ya se intentó un backend Express +
Docker Space para esto (routes/ai.js, ver commit `7e3da7c`, revertido en
`8fd5344`) — funcionaba, pero **Hugging Face pide verificación de tarjeta para
Docker Spaces** aunque el tier sea gratis, así que se abandonó. Alternativa sin
tarjeta: una función serverless gratuita (Vercel/Cloudflare Workers) actuando de
proxy — el frontend sigue en HF Static, solo la llamada de IA sale hacia esa
función. Esto está pendiente de decidir/implementar, no lo asumas hecho.

---

## 8. Spec de la Fase 5 — Generador de ejercicios con IA

Objetivo: la IA genera ejercicios nuevos con más variedad, pero **nada llega al
usuario sin verificación por código** (misma filosofía del §9).

Flujo:
1. Prompt al modelo: "genera un ejercicio de tipo X" con el formato `Exercise` (§5.1)
   y 2-3 ejemplos few-shot de los generadores existentes.
2. Parsear la respuesta JSON → validar invariantes (correct ∈ options, únicas, 2-4).
3. **Verificar la solución recalculándola por código**: reutilizar los verificadores
   de `scripts/verify-generators.ts` (extraerlos a `src/engines/verifiers.ts` para
   compartirlos entre el script y la app).
4. Si la verificación falla → regenerar (máx. 3 intentos) y registrar el rechazo.
5. UI: badge "✨ IA" en ejercicios generados; contador de verificados/rechazados.
6. Mezcla por sesión: N curados (generadores TS) + M generados por IA.

Los tipos verificables por derivación independiente ya tienen verificador (los 25 del
§5.2). Para tipos nuevos sin verificador programático, no ofrecer generación IA.

---

## 9. Protocolo de calidad (regla del proyecto desde el brief original)

- Todo generador se verifica **recalculando la solución por derivación
  independiente**: parsear el enunciado/meta y derivar la respuesta SIN reutilizar
  la fórmula del generador.
- `npm run verify` = 25 tipos × 1000 casos + 9 casos de fusión. **Debe estar en
  verde antes de cada commit.**
- Si un test falla, comprobar primero si el error está en el TEST o en el generador
  (lección aprendida: un `?? 'error'` sobre un check que devuelve `null` en éxito
  hizo fallar tests con generadores correctos).
- Features distintivas de las apps HTML (tabla del §1): quedan intactas en sus HTML;
  cualquier migración futura a React debe reproducirlas antes de retirar el iframe.

---

## 10. Comandos

```bash
cd frontend
npm install        # instalar dependencias
npm run dev        # desarrollo local (http://localhost:5173)
npm run verify     # verificación completa (debe dar 0 fallos)
npm run build      # build de producción (tsc + vite)
```

---

## 11. Precauciones para la cuenta nueva de GitHub

Causas probables de las suspensiones anteriores y cómo evitarlas:

1. **Sin marcas registradas** en repo, README, títulos o commits (ya limpio).
2. **Asentar la cuenta antes de automatizar:** verificar email, activar 2FA,
   completar perfil (nombre, bio, avatar) y usarla manualmente un par de días antes
   de conectar integraciones o subir mucho código. Cuenta nueva + OAuth de terceros
   + push masivo inmediato = patrón que dispara los filtros antispam automáticos.
3. **Crear el repo a mano desde la web** (con README y licencia MIT desde el inicio)
   y subir el código en commits normales.
4. **Registrarse en Supabase con email**, NO con "Sign in with GitHub", y no conectar
   la integración GitHub↔Supabase — no hace falta para este proyecto (el schema se
   pega a mano en el SQL Editor).
5. **Apelar la suspensión anterior** en https://support.github.com (categoría
   "Account suspension"): suelen ser falsos positivos y los reactivan. Crear cuentas
   nuevas repetidamente también puede disparar los filtros.

---

## 12. Arranque de una conversación nueva de Claude Code

**Contexto real actual (no hipotético):** el proyecto YA está en GitHub
(`tommyelgucci/Mis-proyectos`, rama `main`) y YA está desplegado y funcionando en
**https://guccitommy-brainbit.static.hf.space**. Este zip/backup es por si se
pierde el acceso a esa cuenta de GitHub (como pasó antes) y hay que reconstruir
todo desde cero en una cuenta nueva. Si todavía tienes acceso al repo original,
NO hace falta este proceso — simplemente sigue trabajando ahí.

### Si hay que reconstruir desde cero (cuenta de GitHub perdida)

1. Cuenta nueva de GitHub siguiendo el §11 + repo nuevo (p. ej. `brainbit`) con
   README y licencia MIT.
2. Sube el contenido de `brainbit-proyecto-completo.zip` al repo (o dale el zip a
   Claude Code y pídele que lo suba).
3. En la conversación nueva de Claude Code conectada al repo, pega:

   > Lee `BRAINBIT_MASTER.md` en la raíz del repo: es el archivo maestro con todo el
   > contexto (estado, contratos técnicos en §5, fases pendientes en §4, y la
   > lección crítica sobre HF en §7.3.1 — NO intentar hornear VITE_HF_API_KEY en
   > el build de un Space estático, ya se probó y falla). Primero verifica que
   > `npm install && npm run verify && npm run build` pasan en `frontend/`.
   > Luego pregúntame cómo quiero resolver el tutor IA en producción (§4,
   > "Decisión pendiente") antes de tocar nada de eso — no asumas una opción.
   > Para cualquier otra cosa, sigue con la fase que yo te indique. Respeta el
   > protocolo de calidad del §9 y la regla de marcas del §1.

4. Recrea el proyecto de Supabase (§7.1) y el Space de Hugging Face (§7.3) —
   los datos/usuarios del Supabase original NO vienen en este zip (son de la
   nube, no archivos); si conservas acceso a ese proyecto de Supabase, puedes
   seguir usando las mismas credenciales en vez de crear uno nuevo.
5. Configura el `.env` (§7.2) cuando quieras probar cuentas sincronizadas y el
   tutor IA en local. Sin eso, la app funciona en modo local igualmente.

---

## 13. Experimento SnapDeploy — backend con Groq + "Clase con IA"

**Rama:** `claude/snapdeploy-groq-experiment` (creada desde `main`). El
Space de HF (`main`) queda **intacto** — el workflow de deploy a HF solo se
dispara con push a `main`, así que trabajar en esta rama no lo toca ni lo
re-despliega. Es un clon intencional: mismo código base, pero con un backend
real detrás en vez de llamar a HF directo desde el navegador.

### 13.1 Por qué esta rama existe

SnapDeploy (hosting del usuario) es un servidor Node/Docker completo, a
diferencia del Space estático de HF — **sí** soporta un backend persistente.
Eso resuelve de raíz el problema documentado en §7.3.1 (HF bloqueando pushes
con tokens horneados en el bundle): aquí el token de IA **nunca** llega al
navegador, vive solo como variable de entorno del contenedor.

### 13.2 Cambios respecto a `main`

- **Backend real** (antes placeholder vacío):
  - `backend/routes/ai.js` — `GET /status`, `POST /complete`, proxy a
    **Groq** (`https://api.groq.com/openai/v1/chat/completions`, API
    compatible con OpenAI), modelo `GROQ_MODEL` (default
    `openai/gpt-oss-120b` — cambiado el 2026-08-15, Groq decomisionó
    `llama-3.3-70b-versatile` el 16 de agosto de 2026).
  - `backend/server.js` — monta `/api/ai`, sirve `frontend/dist` como
    estático con fallback SPA si existe `./public/index.html`.
  - `backend/.env.example` — `PORT`, `GROQ_API_KEY`, `GROQ_MODEL`,
    `FRONTEND_URL`.
- **Frontend habla con el backend propio, no con HF directo:**
  - `frontend/src/lib/ai.ts` — `chatCompletion`/`checkAIEnabled` llaman a
    `/api/ai/*` (relativo — mismo origen en producción, proxy de Vite en dev).
  - `frontend/src/hooks/useAIEnabled.ts` — chequeo async cacheado.
  - `frontend/src/lib/ai-exercises.ts`, `frontend/src/pages/AISprint.tsx` —
    adaptados al chequeo async.
  - `frontend/.env.example` — ya no pide ninguna clave de IA (vive en
    `backend/.env`).
- **Nueva función "🎧 Clase con IA"** (card junto a "✨ Sprint IA" en
  Estudiar, `frontend/src/pages/Study.tsx`):
  - `frontend/src/hooks/useSpeech.ts` — wrapper de Web Speech API **portado
    de `cognilab/frontend/src/modes/Audio.tsx`** (ya probado en producción
    ahí): selección de voz (`es-MX`/`es-*`), velocidad, encadenado de
    segmentos con pausa, banderas en `useRef` para el ciclo de vida
    asíncrono de `speechSynthesis`.
    **Contrato a respetar:** `play`/`stop`/`pause`/`resume` son callbacks
    estables (deps `[]`) y la voz y la velocidad se leen desde refs, no del
    estado. Si se cambia a leerlas por closure, quien llame a `play()` desde
    un `useCallback` propio narrará con los valores del primer render —
    exactamente el bug por el que el slider de velocidad no hacía nada al
    pulsar "Siguiente ejercicio". `supported` es `false` si el navegador no
    trae `speechSynthesis` (hay que seguir mostrando los pasos escritos).
  - `frontend/src/lib/lesson.ts` — `generateLessonScript(exercise)`: la IA
    solo **redacta** una explicación pedagógica de un ejercicio YA
    VERIFICADO (motor curado, no generación IA) — nunca recalcula el
    resultado, por eso no pasa por `verifyExercise`. Fallback garantizado
    (guion mínimo desde `exercise.text`+`explain`) si la IA falla o no está
    configurada — la función nunca se rompe.
  - `frontend/src/pages/Clase.tsx` + `frontend/src/styles/clase.css` —
    "pizarra" que revela cada paso sincronizado con la narración (resalta el
    paso activo), controles de velocidad/voz, replay, siguiente ejercicio.
- **Deploy:** `Dockerfile` (raíz del repo) — build de dos etapas (frontend
  con `ARG VITE_SUPABASE_URL`/`ANON_KEY` en build-time, backend Node en
  runtime con `GROQ_API_KEY` como variable de entorno del contenedor, nunca
  como build arg). Puerto `5000` (configurable vía `PORT`).

### 13.3 Variables de entorno de esta rama

```
# frontend/.env (dev local)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# backend/.env (dev local)
PORT=5000
GROQ_API_KEY=      ← console.groq.com/keys
GROQ_MODEL=        ← opcional, default openai/gpt-oss-120b
FRONTEND_URL=http://localhost:5173
```

Desarrollo local con backend real:
```bash
cd backend && npm install && npm run dev     # puerto 5000
cd frontend && npm run dev                   # puerto 5173, proxea /api → :5000
```

### 13.4 Deploy a SnapDeploy — pendiente

No hay pasos exactos documentados todavía porque SnapDeploy es una
plataforma nueva sin precedente en este proyecto (a diferencia de HF, no
hay forma de pre-scriptear su dashboard). Cuando el código de esta rama esté
listo: sesión conjunta con el usuario para conectar el repo/rama, apuntar al
el `Dockerfile` de la raíz del repo (SnapDeploy lo detecta solo; no hace
falta indicar "Dockerfile Path" — su escaneo automático ignora ese campo si
no hay un Dockerfile físicamente en la raíz), y
configurar las variables de entorno de runtime (`GROQ_API_KEY`, build args
`VITE_SUPABASE_URL`/`ANON_KEY`) en su dashboard.

### 13.5 Endurecimiento del proxy de IA (obligatorio, ya aplicado)

El backend es alcanzable desde internet en cuanto se despliega. Un reenvío
ciego a Groq convierte la app en **un LLM gratis para cualquiera** que
descubra la URL, a cuenta de nuestra cuota (el tier gratis de Groq tiene
límite diario: si alguien lo drena, el tutor deja de funcionar para ti).
Proteger el token de que no llegue al bundle **no** protege su uso.

Medidas en `backend/routes/ai.js` y `backend/server.js` — no quitarlas:

| Medida | Valor | Por qué |
|---|---|---|
| Rate limit por IP | 60 peticiones / 10 min | Corta el abuso automatizado |
| Validación de `messages` | roles ∈ {system,user,assistant}, `content` string no vacío | Evita reenviar cargas arbitrarias |
| Tope de mensajes | 40 | Evita conversaciones infladas |
| Tope de caracteres | 24.000 en total | Evita quemar tokens de golpe |
| Tope de `max_tokens` | 2048 (la app pide como mucho 1500) | El cliente no decide cuánto gastamos |
| `temperature` | acotada a 0–2 | Rechaza valores absurdos |
| Timeout hacia Groq | 30 s | `fetch` de Node no trae timeout: un cuelgue dejaría la petición abierta para siempre |
| CORS | cerrado salvo que se defina `FRONTEND_URL` | `origin: true` reflejaba **cualquier** origen |
| `trust proxy` | 1 (`TRUST_PROXY`) | Sin esto el rate limit vería solo la IP del proxy de SnapDeploy y trataría a todo el mundo como un cliente |
| Errores de Groq | detalle solo al log, al cliente solo el código | El cuerpo del error puede traer datos de la cuenta |

### 13.6 Verificación

- `npm run verify` y `npm run build` en `frontend/` — deben seguir en verde
  (no se tocó ningún generador/verificador).
- Backend probado localmente con `curl`: `/health` responde, `/api/ai/status`
  da `{enabled:false}` sin `GROQ_API_KEY`, `/api/ai/complete` da 503 limpio.
- Pendiente de probar con `GROQ_API_KEY` real: Tutor IA, Sprint IA con
  generación, y Clase con IA narrando un ejercicio end-to-end en el
  navegador (Web Speech API no se puede probar por CLI, requiere navegador).

---

## 14. Fase 6 — Dashboard de progreso

Sustituye el placeholder de la pestaña "Progreso". Tres piezas:

- `frontend/src/lib/progress-stats.ts` — **toda** la lógica, en funciones puras
  sin React (así el script de verificación puede ejercitarlas).
- `frontend/src/pages/Progress.tsx` + `styles/progress.css` — solo pintan.
- `frontend/scripts/verify-progress.ts` — 48 comprobaciones, ya dentro de
  `npm run verify` (protocolo del §9).

### 14.1 El catálogo (`CATEGORY_META`) — mantenerlo sincronizado

Los ids y etiquetas de tipo están copiados de los `GENERATORS` de cada HTML, y
los denominadores de su UI de progreso. **Si tocas un HTML legacy, actualiza el
catálogo**, porque una clave de `stats` que no esté declarada se ignora en el
dashboard (a propósito: mejor ignorarla que pintar un tipo sin nombre).

| Categoría | Tipos | `best` de | `mastered` de | `memBest` de |
|---|---|---|---|---|
| Mathematik | 7 | 10 | 12 | — |
| Zahlenreihen | 9 | 10 | — | — |
| Analyse & Programmierung | 5 | 8 | 6 | — |
| Konzentration & Merkfähigkeit | 4 | 10 | — | 3 |
| Vernetztes Denken | — | — | 12 | — |
| Vorstellungsvermögen | — | — | 6 | — |

Las dos últimas no llevan `stats`: su progreso es solo `mastered`, y el
dashboard lo dice explícitamente en vez de mostrar un 0 % engañoso.

### 14.2 Decisiones que no son arbitrarias

- **`accuracy` es `number | null`, nunca 0 cuando no hay datos.** 0 intentos no
  es 0 % de acierto; la UI distingue "sin datos" de "0 %".
- **`MIN_ATTEMPTS = 10` para los puntos débiles** (§4). Un 0/1 no es una
  debilidad, es ruido. Los tipos con datos pero por debajo del mínimo se marcan
  con un punto ámbar discreto.
- **Empate de precisión → gana el de más intentos.** Entre dos tipos al 50 %, el
  de 40 intentos es una señal más sólida que el de 10.
- **`ok` se acota a `total`.** Un progreso fusionado o manipulado podría traer
  más aciertos que intentos y dar precisiones por encima del 100 %.
- **Todos los lectores son defensivos.** El progreso viene de localStorage y de
  Supabase: cualquier campo puede faltar, ser `null` o tener otro tipo. Un
  progreso corrupto debe degradar el dashboard, nunca tumbarlo (hay casos de
  prueba para `null`, strings, arrays, `NaN`, `Infinity` y negativos).

### 14.3 La sugerencia de siguiente sesión

Prioridad, de más a menos urgente: **0)** cuenta nueva sin nada hecho →
bienvenida con un punto de partida concreto; **1)** punto débil confirmado;
**2)** tipos sin estrenar; **3)** tipos con pocos datos; **4)** todo sólido →
pulir el más bajo.

⚠️ **El caso 0 tiene que ir primero.** Sin datos, TODOS los tipos están sin
estrenar, así que el caso 2 se dispara y saluda a un usuario nuevo con un "te
quedan 9 tipos sin probar" en vez de una bienvenida. Lo destapó
`verify-progress.ts`; hay un caso de prueba que lo fija.

### 14.4 Verificación

- `npm run verify` incluye las 48 comprobaciones de agregación.
- UI comprobada en navegador (Chromium headless) con progreso sembrado y en
  vacío, a 1280 px y 390 px: sin errores de consola. Dos fallos de layout que
  solo se veían renderizando y ya están corregidos: las etiquetas de tipo se
  truncaban (la barra se comía el ancho) y en móvil las filas de puntos débiles
  descuadraban, porque al ocultar la barra quedaban 4 elementos en una rejilla
  de 3 columnas.

---

## 15. Carreras (tracks) — plan B con Entwickler/in digitales Business EFZ

**Motivación:** el usuario puede no entrar a Informatiker/in EFZ y quiere una
segunda carrera preparada como respaldo. Esa carrera usa una prueba de aptitud
distinta (§1, regla de nombres) con temario parcialmente compartido con ICT.

### 15.1 Arquitectura de carreras

- `frontend/src/lib/tracks.ts` — módulo puro: `TrackId` (`'ict' | 'wirtschaft'`),
  `TRACKS` (id/label/subtitle por carrera) y `engineTracks(id)` (a qué carrera
  pertenece cada motor de `engines/index.ts`, para Sprint IA y Clase con IA).
- `frontend/src/hooks/useTrack.ts` — carrera activa, persistida en
  `localStorage` bajo `brainbit-track` (dato por dispositivo, no pasa por
  Supabase — igual que la elección de voz de Clase con IA).
- `App.tsx` — selector de carrera en el header (dos pastillas), cabecera y
  hero cambian de texto según la activa; pasa `track` a `Study` y `Progress`.
- `Study.tsx` — `CATEGORIES[].tracks` filtra el grid de "Estudiar".
- `Progress.tsx` — filtra `readAllCategories(snapshot)` por `track` DESPUÉS de
  leer el snapshot completo: el progreso guardado de la otra carrera no se
  pierde al cambiar, solo se oculta. Las funciones puras de
  `progress-stats.ts` NO conocen las carreras — agregan sobre lo que se les
  pase, por diseño (ver comentario en ese archivo).
- `AISprint.tsx` / `Clase.tsx` — filtran los botones de motor con
  `engineTracks()` para no ofrecer Zahlenreihen/Analyse a un usuario en la
  carrera Wirtschaft.

### 15.2 Categoría nueva: Logik (Wirtschaft)

`logik-app.html` — mismo patrón que Mathematik (Sprint procedural +
Entrenamiento curado + Progreso con `stats`/`best`/`mastered`, ver §5.3 del
resto del documento). Dos generadores:

- **Analogías verbales** (`genVerbal`): 6 pools de pares de palabras por tipo
  de relación (sinónimo, antónimo, parte-todo, herramienta-función,
  causa-efecto, profesión-herramienta), 6 pares cada uno. Los distractores
  son la segunda palabra de OTROS pares del mismo pool — errores reales de
  "relación correcta, pareja incorrecta", no ruido al azar.
- **Analogías figurales** (`genFigural`): figuras `{forma, color}` sobre un
  ciclo fijo de 6 formas y 5 colores. La transformación cambia UN solo
  atributo, avanzando 1 o 2 pasos en su ciclo. Distractores calculados:
  aplicar el cambio al atributo que no varía, usar el paso equivocado, o no
  cambiar nada — los mismos tres errores que describe la Teoría de la app.

Contenido nuevo original, sin tomar nada de los repos externos consultados en
esta sesión (ninguno tenía analogías verbales/figurales — ver conversación:
manim, ML-foundations, varios de cálculo, y una tanda de "logic" que resultó
ser todo de entrevistas técnicas o programación funcional, género distinto al
de un test de aptitud).

**2026-08-22 — pasa a ser también de ICT.** Al revisar `alessiaaiello/multicheck`
(un clon Flutter no oficial del examen ICT, sin licencia declarada — se miró
solo su estructura, nunca se copió contenido) se vio que su enum de áreas
para el examen ICT incluye `logik` con subtemas "Numerische
Verarbeitungskapazität, Verbale Analogien, Figurale Analogien". No es una
fuente oficial, pero es una señal razonable de que las analogías son parte
del bloque "Potencial" compartido entre ambos exámenes, no exclusivo de
Wirtschaft. Se cambió `tracks` a `['ict', 'wirtschaft']` en `Study.tsx` y
`progress-stats.ts` — el contenido de la categoría no cambió, solo dónde se
muestra.

### 15.3 Categoría nueva: Coordenadas (Wirtschaft)

`coordenadas-app.html` — mismo patrón que Logik. Plano cartesiano x/y real
(rango −5..5, con signos y los 4 cuadrantes), NO el tablero de columnas
A-J/filas 1-10 que ya usa Konzentration para "Vector en tablero" — son
habilidades distintas del temario (leer/ubicar coordenadas con signo vs.
aplicar un desplazamiento). Reutiliza el CSS de esa grilla adaptado a 11
columnas y con las filas invertidas (y=5 arriba, y=−5 abajo, convención
matemática). Tres generadores:

- **Leer coordenadas** (`genRead`): un punto marcado, hay que dar su (x, y).
  Distractores calculados: ejes invertidos (y, x), signo de x cambiado, signo
  de y cambiado.
- **Ubicar el punto** (`genLocate`): dado un (x, y) objetivo, 4 puntos A-D en
  la grilla, uno coincide. **Bug real encontrado y corregido en esta misma
  sesión:** el punto objetivo se asignaba a su letra recorriendo A→D en
  orden, así que si la letra correcta caía al final (p.ej. D), los
  distractores de A/B/C se generaban SIN saber todavía cuál era el punto
  objetivo — podían coincidir con él por azar sin que el chequeo de
  duplicados lo detectara, superponiendo dos letras en la misma celda (una
  quedaba invisible, tapada por la otra al renderizar). Se arregla fijando
  el punto objetivo en `points` ANTES de generar los otros tres. Verificado
  en Chromium con Playwright corriendo varias rondas reales y confirmando
  que las 4 letras siempre aparecen distintas en la grilla.
- **Cuadrante** (`genQuadrant`): dado un punto, identificar I/II/III/IV por
  el signo de x e y. El generador excluye a propósito los puntos sobre un
  eje (x=0 o y=0, cuadrante indefinido); el caso SÍ se cubre como pregunta
  capciosa en el Entrenamiento curado (punto (0,−5), sin opciones de
  respuesta — es una pregunta abierta de "por qué", no de opción múltiple).

### 15.4 Categoría nueva: Competencias digitales (Wirtschaft)

`competencias-digitales-app.html` — distinta en NATURALEZA a Logik y
Coordenadas: no es contenido calculable (no hay fórmula que genere infinitas
preguntas sobre "qué extensión tiene un archivo Excel"). Es la primera
categoría de la app con contenido puramente factual desde una app HTML
propia (Vernetztes Denken ya lo era, pero sin Sprint).

Solución: `BANK` — 24 preguntas curadas y verificadas a mano (6 por bloque:
Seguridad, Archivos y datos, Internet y correo, Ofimática), cada una con 1
respuesta correcta + 3 distractores también autorados (no calculados, a
diferencia del resto de la app — acá no hay "error clásico" que derivar de
una fórmula, así que los distractores son opciones plausibles pero
incorrectas escritas directamente). La Teoría de la app es explícita sobre
esto: dice "banco de 24 preguntas curadas", nunca "ejercicios infinitos" —
importa no sobreprometer generación infinita donde no la hay.

El Sprint reutiliza el mismo `BANK` (no hay generador aparte) con
`pickUnique()`: dado un bloque, evita repetir una pregunta ya usada en esa
misma ronda mientras el banco de ese bloque no se agote (6 por bloque
alcanza de sobra para una ronda de 10). Verificado en Chromium con
Playwright: 10 preguntas de una ronda real, las 10 distintas entre sí, y
cada una con exactamente un botón marcado como respuesta correcta tras
contestar — confirma que el checker interno (comparación de string contra
`item.correct`) no falla para ninguna de las 24 preguntas del banco.

### 15.5 Categoría nueva: Escenarios de trabajo (Wirtschaft)

`escenarios-trabajo-app.html` — mismo patrón técnico que Competencias
digitales (`BANK` + `pickUnique()`), pero de naturaleza distinta a las
cuatro categorías anteriores: acá la opción "correct" no es un hecho
verificable (como "esta extensión es de Excel") ni un cálculo, es un
**juicio de criterio profesional** — la respuesta más recomendable según
principios estándar de conducta laboral (comunicar a tiempo, no evitar el
conflicto, no culpar, ser honesto), no una verdad matemática única.

**La Teoría de la app lo dice de forma explícita** en un `.fix-box`, sin
ambigüedad: a diferencia de Mathematik/Coordenadas, acá no hay una única
respuesta correcta, y en el examen real este bloque además **no se puntúa
igual** que el resto — mide estilo de trabajo, y las empresas lo pueden ver
como referencia, no como nota directa (dato de la investigación original
que motivó esta carrera, no una suposición). Aun documentando esto,
igual vale la pena entrenarlo: da criterio para responder con seguridad
en vez de dudar.

24 escenarios (6 por bloque: Atención al cliente, Trabajo en equipo,
Manejo de errores, Organización), cada uno con contexto + pregunta + 1
respuesta recomendada + 3 alternativas con fallas reales y distintas
(evitar el problema, reaccionar mal/culpar, ser desprolijo) — un patrón
que se repite lo bastante seguido como para explicarlo en la Teoría como
heurística de estudio. Verificado con un script standalone (Node, `eval`
sobre el array `BANK` extraído del HTML) que confirma: 24 ids únicos, cada
uno con exactamente 4 opciones sin duplicados, 6 por bloque — y en
Chromium con Playwright, una ronda de Sprint real con los 10 contextos
distintos entre sí y el checker de respuesta correcta funcionando en las
10.

**Bug de metodología encontrado (no del código, del script de prueba)
durante esta verificación:** el primer intento de chequear "sin
repeticiones" en el Sprint comparaba `.q-text` (el prompt, que es
literalmente "¿Qué conviene hacer?" en 21 de los 24 escenarios a
propósito) en vez de `.q-context` (que es lo que realmente distingue cada
escenario) — dio un falso positivo de "solo 2 de 10 preguntas únicas".
Corregido comparando el contexto; el resultado real es 10/10. Vale la
nota para quien reautomatice esta verificación más adelante.

### 15.6 Organización se suma a Mathematik (ambas carreras)

Al revisar `alessiaaiello/multicheck` (§15.2, sin licencia — solo se miró
estructura) se vio que su "Organisation" no son preguntas de criterio como
el bloque "Organización" que ya existe dentro de Escenarios de trabajo:
son problemas de horarios/capacidad/dependencias **calculables** ("Tarea A
dura 30 min, tarea B 20 min, empiezan a las 09:10, ¿cuándo terminan?", "¿qué
orden de dependencias es posible?"). Eso encaja mejor con el patrón de
calidad del resto de BrainBit (verificable por derivación independiente,
como todo lo demás en Mathematik) que con el patrón de "criterio
profesional" de Escenarios de trabajo — así que se agregó como dos
generadores nuevos DENTRO de Mathematik (`engines/mathematik.ts` +
`mathematik-app.html`, mantenidos en paralelo como el resto del motor,
compartido entre ICT y Wirtschaft), sin tocar el bloque "Organización" ya
existente en Escenarios de trabajo — son dos ángulos distintos de la misma
palabra, conviven sin pisarse.

- **Horarios** (`genSchedule`): dos tareas secuenciales con duración y hora
  de inicio, hay que calcular la hora de fin. Distractores calculados:
  sumar solo la primera tarea, sumar/restar 15 minutos de más — los errores
  reales de sumar mal el acarreo de horas.
- **Dependencias** (`genDependency`): 3 tareas donde cada una necesita que
  la anterior ya esté terminada, hay que identificar el único orden
  posible entre 4 permutaciones. El verificador reconstruye el orden
  correcto parseando las dos frases de dependencia del contexto — nunca
  reimporta el array de datos del generador, lo deriva de cero.

Motor y app HTML actualizados en paralelo (9 generadores en cada uno,
antes 7); `verify-generators.ts` corrió los 1000 casos/tipo de ambos
generadores nuevos sin fallos antes de commitear. `masteredTotal` de
Mathematik sube de 12 a 14 (se sumaron 2 ejercicios curados nuevos, grupo
"E · Organisation" en el Entrenamiento).

### 15.7 Categoría nueva: Redacción (Wirtschaft) — modo de feedback por IA

`redaccion-app.html` — la pieza de infraestructura que faltaba (la sección
"Pendiente" de este documento la señalaba desde que se creó el track
Wirtschaft): un modo de respuesta libre, sin `verifyExercise`, sin
pass/fail, con feedback cualitativo de una IA. Es la categoría más
distinta de las once.

**No es una app TS ni usa `lib/ai.ts`.** Es una app HTML autocontenida como
el resto (no puede importar módulos TS), así que reimplementa en vanilla JS
exactamente el mismo contrato que ya usan el Tutor, Clase con IA y Sprint
IA: `GET /api/ai/status` → `{enabled}`, `POST /api/ai/complete` con
`{messages, maxTokens, temperature}` → `{content}`. Mismo backend
(`backend/routes/ai.js`, Groq), sin ruta nueva.

**10 consignas** (`PROMPTS`), mezcla de reflexión personal ("¿qué harías con
un año de vacaciones pagadas?", el ejemplo original de la investigación del
usuario) y escritura de trabajo corta (un correo de retraso a un cliente,
un aviso de llegada tarde, un mensaje a un compañero) — cubre tanto el
mini-ensayo como el "capacidad de formular ideas" del temario real.

**Contrato del feedback** (`buildFeedbackPrompt` / `parseFeedback`, mismo
patrón que `lesson.ts` de Clase con IA): se le pide a la IA un JSON con
`respondeConsigna` (si/parcial/no), `fortaleza`, `mejora`,
`erroresConcretos` (máx. 3, ortografía/gramática puntual) y
`comentarioGeneral`. `parseFeedback` nunca lanza: JSON inválido, con
fences de markdown, o con un campo obligatorio faltante → `null`, y la UI
cae al checklist manual. Verificado con un sandbox de Node (`vm`) aislando
la función del resto del script: 6 casos (JSON válido, con fences,
campo faltante, no-JSON, valor inválido en `respondeConsigna`, más de 3
errores) — los 6 se comportan como se diseñó.

**Nunca depende de que la IA esté disponible para dar valor:** el
`checklist-card` (4 preguntas de autoevaluación) se muestra siempre, no
solo como fallback. Si `GET /api/ai/status` da `enabled:false` (o falla),
el botón de feedback se deshabilita con una nota explicando por qué —
verificado en Chromium contra el `vite preview` estático (sin backend
real): el botón cae a "IA no disponible ahora" tal como se esperaba, sin
romper nada. El progreso persiste el texto escrito por consigna
(`drafts`) además de qué consignas se marcaron practicadas
(`mastered`) — confirmado que sobrevive un reload real del iframe.

`progress-stats.ts` (estado original, antes de la adenda de abajo): sin
`types` (no hay ok/total posible para feedback cualitativo), `sprintSize:
null` (no tiene sentido un Sprint cronometrado para escribir texto libre)
— mismo patrón que Vernetztes Denken, solo `masteredTotal`.

**2026-08-22 — se agrega un segundo banco, de opción múltiple.** Al revisar
`alessiaaiello/multicheck` (§15.2) se vio que ahí "Textschreiben" se testea
con opción múltiple sobre técnica de escritura (qué apertura responde a la
consigna, qué conector es correcto, qué orden da un texto claro) — no con
texto libre. Esto **contradice** la investigación original del usuario
(foros con gente que rindió el examen real, que describían un mini-ensayo
tipo "¿qué harías con un año libre?"). Ninguna de las dos fuentes es
oficial ni verificable desde acá, así que en vez de elegir una se cubrieron
las dos: el modo de texto libre (`Practicar`) queda intacto, y se agregó un
`BANK` nuevo de 10 preguntas de opción múltiple (`conectores` — 5, causa/
contraste/consecuencia; `estructura` — 5, apertura/orden/registro/
concisión) con su propio Sprint (`pickUnique()`, mismo patrón que
Competencias digitales y Escenarios de trabajo — sin repetir dentro de la
misma ronda). `progress-stats.ts` ahora sí declara `types` (los del banco
de opción múltiple, únicos con ok/total real) y `sprintSize: 10`;
`masteredTotal` sube de 10 a 20 porque son dos bancos de contenido
conviviendo en la misma categoría, cada uno con su propio conteo de
"dominado". Verificado igual que el resto: integridad del `BANK` con un
script de Node (10 ids únicos, 4 opciones sin duplicados, 5 por tipo), y
en Chromium con Playwright una ronda de Sprint real de 10 preguntas con el
checker de respuesta correcta funcionando en las 10.

### 15.8 Deutsch y Englisch (Wirtschaft) — temario completo

Cierra el único punto que quedaba pendiente del temario de Wirtschaft &
Administration (las otras cinco categorías —Logik, Coordenadas, Competencias
digitales, Escenarios de trabajo, Redacción— ya estaban). No hay ninguna app
previa de idiomas en BrainBit, así que Rechtschreibung/Spelling y
Leseverstehen/Reading son contenido nuevo de cero — pero **Grammatik y
Wortschatz (Deutsch) y Grammar (Englisch) sí reusan contenido real** de
Alodeutsch y Aloenglish, dos apps propias del dueño que viven como ramas de
este mismo repo, no como repos separados (`claude/alodeutsch-current-branch-*`,
`claude/aloenglish-app-separation-*` — el primer intento de esta sesión buscó
solo repos por nombre y no las encontró; eran ramas, no repos).

Concretamente:
- **Deutsch › Grammatik:** los 6 ítems (nämlich fuera de Posición 1,
  `wegen`+Genitiv, `verantwortlich für`, `zufrieden mit`, `sich auswirken
  auf`, inversión con `dann` en Posición 1) vienen de los módulos de
  gramática B1/B2 de `alodeutsch/alodeutsch.html`.
- **Deutsch › Wortschatz:** los 6 términos (`das Protokoll`, `die
  Tagesordnung`, `der Anhang`, `die Kündigungsfrist`, `die Probezeit`, `der
  Arbeitsvertrag`) vienen de sus módulos "Berufswelt Vokabular" (reuniones,
  llamadas, emails) y "Lesen Fortgeschritten" (Broschüren laborales) — el
  vocabulario de oficina que Alodeutsch ya tenía verificado.
- **Englisch › Grammar:** los 6 ítems (present perfect, condicionales tipo
  1/2/3, voz pasiva, `don't have to` vs. `mustn't`) vienen de los módulos A2/B1
  de `aloenglish/index.html`.
- **Englisch › Vocabulary:** los 6 phrasal verbs (`look for`, `look after`,
  `find out`, `run out of`, `set up`, `carry on`) vienen del módulo "Phrasal
  Verbs" (B2) de Aloenglish. Los pares verbo+significado son los de la
  fuente; las frases de ejemplo se adaptaron a un contexto de oficina (el
  original los enseña con ejemplos de vida cotidiana) para que encajen con
  el resto de Wirtschaft.
- **Englisch › Spelling/Reading** siguen siendo contenido nuevo: Aloenglish
  no tiene un módulo de ortografía ni textos cortos de lectura equivalentes.

No se copió texto tal cual donde el formato no coincidía (Alodeutsch/Aloenglish
usan `{t:'mc'|'fill', o:[...], a:índice}` con explicación en dos idiomas;
BrainBit usa `{correct, wrong:[...], explain}` en español) — se adaptó el
contenido (la palabra/frase correcta, las opciones, la explicación) al formato
del banco, verificando cada ítem contra la fuente antes de escribirlo.

**La distinción que importa al reusar contenido de un examen de pago (propio
o de terceros):** escribir preguntas nuevas y propias sobre los mismos temas
y formato de un examen que el dueño ya pagó y estudió — a partir de lo que
él describe de memoria, no de extraer el archivo — es exactamente lo mismo
que se hizo con Alodeutsch/Aloenglish en esta sección, y está bien: los
temas, el formato y el estilo de un examen no tienen copyright, solo la
redacción exacta de alguien la tiene. Lo que no está bien es procesar el
archivo original de un examen de terceros (decompilar un `.apk`, abrir un
dump de datos) y copiar o parafrasear de cerca su texto — eso sí reproduce
la expresión protegida de otro. `alodeutsch.html` tiene un ejemplo real de
esto último: sus bloques `OFFICIAL_EXAM_A2`/`OFFICIAL_EXAM_B1` están
marcados en el propio código como **"extraída de la Modellprüfung real"**
de telc — de ahí no se sacó nada, y es la misma razón por la que no se
procesó ningún archivo de terceros para Deutsch/Englisch.

`deutsch-app.html` y `englisch-app.html` — mismo patrón que Competencias
digitales: banco curado de **30 preguntas** (6 en Rechtschreibung/Spelling y
Leseverstehen/Reading, 9 en Grammatik/Grammar y Wortschatz/Vocabulary — más
grandes porque tienen mucho más material real de Alodeutsch/Aloenglish del
que sacar), sin generador procedural (son hechos del idioma, no algo
calculable). Cuatro bloques cada una:

| Deutsch | Englisch |
|---|---|
| Rechtschreibung | Spelling |
| Grammatik | Grammar |
| Wortschatz | Vocabulary |
| Leseverstehen | Reading |

**Detalle que importa:** Deutsch usa ortografía **suiza** a propósito —
siempre `ss`, nunca `ß` (el estándar en Suiza, a diferencia de Alemania). Si
se agrega contenido nuevo en alemán en cualquier parte del proyecto, esa
convención se mantiene.

Leseverstehen/Reading siguen el mismo formato de `context` + pregunta que ya
usa Escenarios de trabajo: un texto corto y la respuesta está literalmente
ahí, nunca por inferencia — es justamente lo que el examen evalúa.

Verificado igual que las demás categorías con banco: `tsc`/`vite build`,
`npm run verify` (con los 4 números de `scripts/verify-progress.ts`
actualizados — no son 3 como decía esta sección antes, sino 4: cantidad de
claves, cantidad de tipos, suma de `masteredTotal` Y `categoriesTotal`, que
también estaba hardcodeado y se había pasado por alto), un chequeo standalone
en Node de integridad del banco (ids únicos, 4 opciones únicas por pregunta,
6 o 9 preguntas por bloque según corresponda, explicación no trivial) y
Playwright en vivo: 30 tarjetas en el Banco de preguntas, exactamente 1
opción `.right` por pregunta en el Sprint, `window.reportMistake` cableado,
ambas categorías visibles solo en la carrera Wirtschaft (no en ICT), y el
dashboard de Progreso mostrando el total correcto (166 dominados posibles
en la carrera Wirtschaft, 178 en el catálogo completo).

**El catálogo completo son ahora 13 categorías**, no 11 — la próxima que se
agregue actualiza estos 4 números, no 3.

### 15.9 Deutsch — banco ampliado con `texto_38.txt` (Dart, app propia distinta)

El dueño subió `texto_38.txt`: el `expandedQuestionBank` de otra app propia
suya de práctica para el mismo tipo de examen ICT, escrita en Dart/Flutter.
Es contenido original y determinista — el propio comentario del archivo lo
dice: "Original practice material... without reproducing protected
Multicheck® exam questions" — no un extracto de un examen de pago, así que la
distinción de §15.8 (reusar temas/formato propios sí, procesar el archivo de
un examen de terceros no) no aplica acá: esto es la propia obra del dueño en
otra app, igual que Alodeutsch/Aloenglish.

El archivo cubre 12 áreas (Deutsch, Englisch, Textschreiben, Mathematik,
Logik, Konzentration, Kurzzeitgedächtnis, Merkfähigkeit,
Vorstellungsvermögen, Organisation, IT-Grundwissen, Vernetztes Denken). El
dueño pidió portarlo todo, en el orden en que aparece en el archivo — esta
entrada cubre solo el primer bloque, Deutsch; las demás áreas se documentan
en sus propias entradas a medida que se van portando.

`_germanSeeds` trae 24 ítems. Se excluyó 1 (ortografía de "Adresse") por ser
duplicado casi exacto de `r6`, que ya estaba en el banco desde antes de leer
este archivo. Los 23 restantes se repartieron en los 4 bloques existentes
según el `eyebrow` de cada seed:

| `eyebrow` del seed Dart | bloque BrainBit | cuántos |
|---|---|---|
| Rechtschreibung, Grossschreibung | rechtschreibung | 4 (r7-r10) |
| Wortbildung, Wortwahl, Wortbedeutung | wortschatz | 3 (w10-w12) |
| Kommasetzung, Kasus, Satzbau, Zeitform, Bezug, Aktiv/Passiv | grammatik | 8 (g10-g17) |
| Textverständnis, Präzision, Zusammenfassung, Schlussfolgerung, Informationsauswahl | leseverstehen | 8 (l7-l14) |

Los ítems de Textverständnis/Präzision/Zusammenfassung/Schlussfolgerung/
Informationsauswahl no traían un `context` separado del `prompt` (el Dart
original los junta en un solo campo) — se guardaron con el escenario dentro
de `q`, igual que el resto de Leseverstehen soporta (`context` es opcional
en `toExercise()`).

Deutsch pasa de 30 a **53 preguntas** (10 Rechtschreibung, 17 Grammatik, 12
Wortschatz, 14 Leseverstehen). Actualizados: `categories.ts` (subtitle),
`progress-stats.ts` (`masteredTotal: 53`), `verify-progress.ts` (suma global
201, no 178 — Englisch sigue en 30 hasta que le toque su turno en el orden
del archivo). Verificado con `npm run verify`, `vite build` y Playwright en
vivo (53 tarjetas en el Banco de preguntas, 10 preguntas de Sprint con
exactamente 1 opción `.right` cada una, 0 errores de consola).

### 15.10 Englisch — banco ampliado con `texto_38.txt`

Mismo origen y mismo criterio que §15.9, siguiente área en el orden del
archivo. `_englishSeeds` trae 24 ítems (8 Grammar, 8 Vocabulary, 8 Reading),
ninguno duplicado con lo que ya había — se agregaron los 24 completos:

| bloque Dart | bloque BrainBit | cuántos |
|---|---|---|
| Grammar | grammar | 8 (g10-g17) |
| Vocabulary | vocabulary | 8 (v10-v17) |
| Reading | reading | 8 (r7-r14) |

Los ítems de Reading traían el escenario y la pregunta en un solo `prompt`
en el Dart original; se separaron en `context` + `q` para seguir el mismo
formato que ya usaba `r1`-`r6`, en vez de meterlo todo en `q` como se hizo
con el Leseverstehen de Deutsch (ahí el Dart no tenía nada parecido a
`context` en ningún ítem del banco existente; acá sí, así que se mantuvo
consistente con el formato ya establecido).

Englisch pasa de 30 a **54 preguntas** (6 Spelling, 17 Grammar, 17
Vocabulary, 14 Reading). Actualizados: `categories.ts` (subtitle),
`progress-stats.ts` (`masteredTotal: 54`), `verify-progress.ts` (suma
global 225, no 201). Verificado igual que Deutsch: `npm run verify`, `vite
build` y Playwright en vivo (54 tarjetas, 10 preguntas de Sprint con
exactamente 1 `.right` cada una, 0 errores de consola).

### 15.11 Mathematik — 16 ejercicios curados nuevos con `texto_38.txt`

Mismo origen que §15.9/§15.10 (`texto_38.txt`, app propia distinta), tercera
área en el orden del archivo: `_mathQuestions()` trae 8 "Gleichungen"
(ecuaciones lineales `factor·x + suma = resultado`) más `_mathApplicationSeeds`,
8 problemas de aplicación (Verhältnis, Geschwindigkeit, Fläche, Durchschnitt,
Datenmenge, Brüche, Geometrie, Dreisatz).

**Por qué no se sumó como generador de Sprint, a diferencia de §15.6
(Organización):** los 9 generadores de `engines/mathematik.ts` producen
infinitas variantes calculando la respuesta en el momento — no son un banco
fijo, tienen su propio verificador de derivación independiente en
`verifiers.ts` y corren 1000 casos aleatorios en `verify-generators.ts`. Las
8 "Prozentrechnen" del Dart son literalmente el mismo cálculo que el
generador `percent` que ya existe (porcentaje de una base), así que ESAS se
descartaron por redundantes — no se documentan como ítems nuevos. El
"Dreisatz" (imprentas) también se descartó: es la misma proporcionalidad
directa que el generador `direct` ya cubre, solo con impresoras en vez de
un servidor.

Lo que sí es contenido nuevo (16 ítems, ninguno cubierto por los 9
generadores existentes) fue a la sección "Entrenamiento curado" — igual que
Deutsch/Englisch, revelar-solución, sin generador porque son ejercicios
puntuales con enunciado propio, no una fórmula parametrizable de la que
valga la pena escribir un motor + verificador nuevo:

- **F · Ecuaciones (8, `eq1`-`eq8`):** las 8 "Gleichungen" — resolver
  `factor·x + suma = resultado` para x. Resultado y sumandos se calcularon
  a mano desde las tuplas `(factor, suma, solución)` del Dart y se
  verificaron antes de escribirlos.
- **G · Aplicaciones (8, `ap1`-`ap8`):** los 8 `_mathApplicationSeeds` que
  no duplican un generador — escala de plano, velocidad de descarga,
  superficie de un rectángulo, promedio, conversión GB→MB, fracción
  restante en porcentaje, volumen de un cubo. Traducidos del alemán al
  español (el resto de Mathematik está en español) conservando la cifra y
  el resultado exactos del original.

Mathematik pasa de 14 a **30 ejercicios curados** (los 9 generadores de
Sprint no cambian). Actualizado: `progress-stats.ts` (`masteredTotal: 30`),
`verify-progress.ts` (suma global 241, no 225). `categories.ts` no
menciona una cantidad de preguntas en el subtitle de Mathematik, así que no
hizo falta tocarlo. Verificado con `npm run verify` (los 1000 casos/tipo de
los 9 generadores siguen pasando sin cambios), `vite build` y Playwright en
vivo (30 tarjetas curadas en total, 8 en Ecuaciones y 8 en Aplicaciones,
solución revelable en ambas secciones nuevas, 0 errores de consola).

### 15.12 Redacción — 16 preguntas nuevas de Sprint con `texto_38.txt`

Mismo origen que §15.9-§15.11, cuarta área en el orden del archivo:
`_writingSeeds` trae 16 ítems sobre técnica de escritura (planificación,
estructura, coherencia, precisión, registro, corrección). A diferencia de
Deutsch/Englisch/Mathematik, acá no hubo que decidir "banco curado vs.
generador": Redacción ya tenía exactamente el formato que le hacía falta —
un Sprint de opción múltiple sobre técnica de escritura (`BANK` con tipos
`conectores`/`estructura`), la misma clase de contenido que trae
`_writingSeeds`. Se sumaron los 16 completos, sin exclusiones:

| `eyebrow` del seed Dart | tipo BrainBit | cuántos |
|---|---|---|
| Kohärenz (2: contraste y consecuencia) | conectores | 2 (cx6-cx7) |
| Planung, Gliederung, Einleitung, Schluss, Absatzbau, Argumentation, Überarbeiten, Kürzen, Präzisieren, Stil, Adressaten, Quellen, Korrektur, Auftragstreue | estructura | 14 (ex6-ex19) |

Los 2 ítems de Kohärenz no traían el formato "completá la oración" que ya
usa `conectores` (el Dart pregunta directamente "¿qué conector muestra
contraste/consecuencia?") — se adaptaron a oraciones nuevas de oficina que
enseñan la misma idea (contraste → "en cambio", consecuencia → "por
consiguiente"), en vez de copiar la pregunta de opción-de-palabra-suelta,
para no romper la consistencia del bloque.

Traducido del alemán al español en los 16 ítems — Redacción, a diferencia
de Deutsch/Englisch, no es una categoría de idioma: es técnica de escritura
en español, así que el idioma del contenido nuevo tenía que cambiar, no el
contenido.

El `BANK` de Sprint pasa de 10 a **26 preguntas** (7 conectores, 19
estructura); las 10 consignas de texto libre no cambian. `masteredTotal`
pasa de 20 a **36** (26 + 10). Actualizado: `progress-stats.ts`
(`masteredTotal: 36` y su comentario), `verify-progress.ts` (suma global
257, no 241). Verificado con `npm run verify`, `vite build`, un chequeo
standalone de integridad del `BANK` (26 ids únicos, 4 opciones únicas por
pregunta) y Playwright en vivo (Sprint de 10 preguntas con exactamente 1
opción `.right` cada una, 0 errores de consola).

## 16. Fase 7 — Cuatro funciones de repaso (ideas rescatadas, contenido no)

**Contexto del incidente:** otro agente (Codex) hizo 4 commits directos a
`SnapDeploy-BrainBit` sin pasar por PR ni revisión. Tres traían contenido con
nombre comercial prohibido (§1) y señales de procedencia dudosa (texto de
ejercicio mezclando alemán y español, sugiriendo adaptación de un archivo de
examen real con copyright ajeno); el cuarto era un `docs/BRAINBIT_EXPANSION_ROADMAP.md`
sin autorización del dueño para publicarlo, aunque su contenido en sí no
violaba nada. Los 4 se revirtieron juntos en un solo commit bien documentado
(`7133416`, ver el propio mensaje del commit para el detalle). Esta sección
es lo que se rescató de esa idea: las 4 funciones que proponía el roadmap
descartado, **reimplementadas desde cero sin reusar ni una línea de su
contenido**, más algunas adaptadas del propio CogniLab del dueño (proyecto
separado del mismo dueño — sin problema de procedencia, pero sí adaptadas y
no copiadas porque su forma de datos es otra).

### 16.1 Cuaderno de errores (`lib/error-notebook.ts`)

Registro cross-categoría de lo fallado en un Sprint de opción múltiple. Las
9 apps con ese patrón (`mathematik`, `zahlenreihen`, `analyse-programmierung`,
`konzentration`, `logik`, `coordenadas`, `competencias-digitales`,
`escenarios-trabajo`, `redaccion`) reportan cada fallo a una clave compartida
de `localStorage` (`brainbit-mistakes`) vía `window.reportMistake()` /
`window.resolveMistake()` — funciones del shim al principio de cada HTML,
mismo patrón que ya usa `lesson.ts` para Clase con IA: la lógica real está
reimplementada en vanilla JS porque esas apps no importan TS. El id de cada
entrada (`categoryId::type::texto`) tiene que coincidir byte a byte entre
`lib/error-notebook.ts` (`makeMistakeId`) y las 9 copias del shim — si se
cambia el formato, hay que tocar los 10 archivos.

Un fallo se retira del cuaderno solo cuando se vuelve a acertar esa misma
pregunta en la app (no al cerrar la pestaña, no al mirarlo). El cuaderno
también permite "Descartar" manualmente desde `ErrorNotebook.tsx`.

**Gap conocido:** `vernetztes-denken-app.html` y `vorstellungsvermoegen-app.html`
no usan el patrón de Sprint con opción múltiple (son de checklist/plegado 3D
sin un momento discreto de "falló"), así que no reportan al cuaderno. No es
un olvido — no hay un hook natural donde engancharse sin rediseñar esas apps.

`utils/storage-bridge.ts` ganó un segundo tipo de mensaje del bridge
(`type:'mistake'`, antes solo existía `'progress'`) y un segundo slice en el
store de Zustand (`mistakes`, `setMistakes`, `removeMistakeEntry`).

`CATEGORIES` se movió de `Study.tsx` a `lib/categories.ts` en este mismo
cambio: `ErrorNotebook.tsx` lo necesita y a la vez `Study.tsx` importa
`ErrorNotebook`, así que dejarlo en `Study.tsx` habría sido un import circular.

### 16.2 Modo adaptativo en Sprint IA (`weightsForTypes` en `progress-stats.ts`)

Toggle en `AISprint.tsx`: cuando está activo, el ejercicio curado de cada
ronda se sortea con `pickWeighted()` (`engines/random.ts`, nuevo) en vez de
`pick()` uniforme, pesando cada tipo con `adaptiveWeight(accuracy, fewData)`
según la precisión real guardada en el bridge de progreso — 0% pesa 4×, 100%
pesa 0.5× (nunca 0: lo dominado se sigue repasando, solo que menos), y un
tipo con menos de `MIN_ATTEMPTS` queda en peso neutro para no sobre-enfocar
con datos insuficientes (mismo criterio que ya usa `fewData` en el resto del
dashboard).

`engineCategoryId()` (nuevo, en `lib/tracks.ts`, al lado de `engineTracks()`)
resuelve el mismo desfase de ids que ya documentaba ese archivo (`'analyse'`
del motor vs `'analyse-programmierung'` de la categoría).

### 16.3 Desafío diario con racha (`lib/daily-challenge.ts`)

8 ejercicios mixtos de los motores TS disponibles para la carrera activa, los
mismos para todos el mismo día: `pickDaily()` sortea con un PRNG mulberry32
(dominio público) sembrado por la fecha (`YYYY-MM-DD`, hora **local**, no
UTC — a propósito, para que el desafío no cambie a medianoche UTC para quien
no está en ese huso). Solo el sorteo de qué TIPOS aparecen es determinista;
el contenido de cada ejercicio lo sigue generando el motor con su propio
azar, como en el resto de BrainBit.

Adaptado de `pickDaily`/`touchDayStreak` del propio CogniLab, no copiado tal
cual: allí hay un banco fijo de preguntas y se pesa por las falladas
recientes; acá no hay banco fijo, son generadores infinitos.

La racha (`recordCompletion`) compara el último día completado contra "ayer":
un día salteado la corta y arranca de nuevo en 1; completar el desafío del
mismo día dos veces es idempotente (no suma ni resta, solo actualiza el
resultado guardado, para permitir repetir por práctica). `currentStreak()`
muestra la racha "en vivo" — si el último día completado es anterior a ayer,
devuelve 0 aunque el número guardado todavía no se haya "escrito" (eso pasa
recién en el próximo `recordCompletion`), para no mostrarle a nadie una racha
que ya se cortó.

Vive fuera de `progress-stats.ts`/`CATEGORY_META` a propósito: no es progreso
por tipo de ejercicio, es un widget independiente con su propia clave
(`brainbit-daily-challenge`).

### 16.4 Simulacro de examen con revisión final (`lib/exam.ts`)

20 preguntas mixtas de los mismos 4 motores TS que Sprint IA (nada de las
apps HTML), a contrarreloj (8 minutos — mismo ritmo por pregunta que el
Sprint de Mathematik, ~24s, escalado a 20 preguntas). La "dificultad
creciente" que pedía el roadmap descartado se resuelve reusando el modo
adaptativo de Sprint IA (§16.2) en vez de inventar un mecanismo aparte: cada
pregunta ya pesa hacia los tipos con menor precisión real.

`buildExamResult()` arma el resultado final y filtra la revisión (solo lo
fallado, en el orden en que se respondió, con la explicación de cada una) —
es lo único de esta función con lógica pura que vale la pena testear aparte;
el resto (timer, selección de preguntas) vive directo en `ExamSimulation.tsx`
igual que el resto de las páginas de sprint.

### 16.5 Verificación

Cuatro scripts nuevos, todos con sabotaje probado (se rompe la protección a
propósito, se corre el script, se confirma que falla lo que corresponde, se
restaura — protocolo del §9):

```bash
npm run verify   # ahora corre los 7 scripts en cadena, incluidos:
                  #  verify-error-notebook.ts · verify-adaptive.ts
                  #  verify-daily-challenge.ts · verify-exam.ts
```

Las 4 funciones nuevas se probaron además en Chromium real (Playwright):
Cuaderno de errores con dedup/resolve confirmados con `window.reportMistake`/
`resolveMistake` llamados directo; modo adaptativo con un tipo sembrado al
0% saliendo ~48% de las veces en 25 ejercicios (peso esperado ~50%, contra
~11% sin ponderar); Desafío diario completo con racha 1 y badge en la
tarjeta de `Study.tsx`; Simulacro completo con revisión coincidiendo
exactamente con lo fallado.
