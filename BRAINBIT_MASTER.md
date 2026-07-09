# 🧠 BrainBit — Archivo Maestro del Proyecto (v2)

> **Propósito:** backup completo para retomar el proyecto en una conversación nueva
> de Claude Code — con o sin acceso al repo original de GitHub. Contiene TODO el
> contexto: qué es el proyecto, qué está hecho, los contratos técnicos internos,
> cómo configurarlo y qué falta. Va acompañado de `brainbit-proyecto-completo.zip`
> con el código; este documento además contiene suficiente detalle para reconstruir
> cualquier pieza si hiciera falta. Ver §12 para el procedimiento exacto.

---

## 1. Qué es BrainBit

Plataforma web unificada de estudio para preparar un **examen de aptitud ICT suizo**
(perfil: Informatiker/in EFZ Applikationsentwicklung). Unifica 6 mini-apps de
entrenamiento que antes eran HTML independientes, añade cuenta de usuario con
sincronización de progreso en la nube y un tutor de IA gratuito (Hugging Face).

**⚠️ Regla innegociable:** NO usar nombres de marcas registradas de exámenes
comerciales en el nombre del repo, README, títulos, descripciones, commits ni código.
Usar siempre términos genéricos: "examen de aptitud ICT", "ICT-Eignungstest",
"ICT Study Suite". (El código ya está limpio; mantenerlo así.)

### Las 6 categorías de entrenamiento

| # | Categoría | Archivo HTML | Feature distintiva (NO perder) |
|---|---|---|---|
| 1 | 🧮 Mathematik | `mathematik-app.html` | — |
| 2 | 🔢 Zahlenreihen | `zahlenreihen-app.html` | Revelación visual de la estructura de la serie |
| 3 | 💻 Analyse & Programmierung | `analyse-programmierung-app.html` | Trace-table stepper (ejecución paso a paso) |
| 4 | 👁️ Konzentration & Merkfähigkeit | `konzentration-merkfaehigkeit-app.html` | Memoria diferida con borrado real del DOM |
| 5 | 🕸️ Vernetztes Denken | `vernetztes-denken-app.html` | Teoría completa (Gomez & Probst 1987) + checklist |
| 6 | 📐 Vorstellungsvermögen | `vorstellungsvermoegen-app.html` | Plegado de cubos con CSS 3D |

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
- ⬜ **Fase 6 — Dashboard de progreso:** la pestaña "Progreso" es un placeholder.
  Datos ya disponibles en el store del bridge: precisión por tipo (`stats`),
  récords (`best`), dominados (`mastered`). Mostrar: precisión por categoría/tipo,
  puntos débiles (menor % con ≥10 intentos), sugerencia de siguiente sesión.
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
    `llama-3.3-70b-versatile`).
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
GROQ_MODEL=        ← opcional, default llama-3.3-70b-versatile
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

### 13.5 Verificación

- `npm run verify` y `npm run build` en `frontend/` — deben seguir en verde
  (no se tocó ningún generador/verificador).
- Backend probado localmente con `curl`: `/health` responde, `/api/ai/status`
  da `{enabled:false}` sin `GROQ_API_KEY`, `/api/ai/complete` da 503 limpio.
- Pendiente de probar con `GROQ_API_KEY` real: Tutor IA, Sprint IA con
  generación, y Clase con IA narrando un ejercicio end-to-end en el
  navegador (Web Speech API no se puede probar por CLI, requiere navegador).
