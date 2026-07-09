# 🧠 BrainBit — Archivo Maestro del Proyecto (v2)

> **Propósito:** retomar el proyecto desde cero en una cuenta de GitHub nueva y una
> conversación nueva de Claude Code. Contiene TODO el contexto: qué es el proyecto,
> qué está hecho, los contratos técnicos internos, cómo configurarlo y qué falta.
> Va acompañado de `brainbit-proyecto-completo.zip` con el código; este documento
> además contiene suficiente detalle para reconstruir cualquier pieza si hiciera falta.

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

### Fases pendientes
- ⬜ **Fase 6 — Dashboard de progreso:** la pestaña "Progreso" es un placeholder.
  Datos ya disponibles en el store del bridge: precisión por tipo (`stats`),
  récords (`best`), dominados (`mastered`). Mostrar: precisión por categoría/tipo,
  puntos débiles (menor % con ≥10 intentos), sugerencia de siguiente sesión.
- ⬜ **Fase 7 — Búsqueda en internet** (opcional): SerpAPI o similar, vía backend.

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

### 7.3 Deploy a Hugging Face Space (estático, gratis)

La app es una SPA 100% estática tras el build (sin backend propio), así que
encaja con un Space tipo "Static". El workflow
`.github/workflows/deploy-brainbit-to-hf.yml` construye `frontend/` y publica
`dist/` en cada push a `main` que toque `frontend/**`. Configuración única:

1. Crea el Space: https://huggingface.co/new-space → SDK **Static**, público,
   p. ej. `tu-usuario/brainbit`.
2. Crea un token con permiso **write**: https://huggingface.co/settings/tokens
3. En GitHub → Settings → Secrets and variables → Actions, añade:
   - `HF_SYNC_TOKEN` — el token del paso 2
   - `HF_BRAINBIT_SPACE_ID` — `tu-usuario/brainbit`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — mismos valores del §7.2
   - `VITE_HF_API_KEY`, `VITE_HF_MODEL` (opcional) — mismos valores del §7.2
4. Push a `main` → la Action compila y publica; la app queda en
   `https://huggingface.co/spaces/tu-usuario/brainbit`.

Sin estos secrets el workflow no falla: detecta que faltan y omite el deploy
(mismo patrón que el workflow existente `sync-to-hf.yml` de `cognilab/`).

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

## 12. Arranque de la nueva conversación de Claude Code

1. Cuenta nueva de GitHub siguiendo el §11 + repo nuevo (p. ej. `brainbit`) con
   README y licencia MIT.
2. Sube el contenido de `brainbit-proyecto-completo.zip` al repo (o dale el zip a
   Claude Code y pídele que lo suba).
3. En la conversación nueva de Claude Code conectada al repo, pega:

   > Lee `BRAINBIT_MASTER.md` en la raíz del repo: es el archivo maestro con todo el
   > contexto (estado, contratos técnicos en §5, fases pendientes en §4). Primero
   > verifica que `npm install && npm run verify && npm run build` pasan en
   > `frontend/`. Después continúa con la Fase 5 según el spec del §8 (o la fase que
   > yo te indique). Respeta el protocolo de calidad del §9 y la regla de marcas del §1.

4. Configura Supabase (§7.1) y el `.env` (§7.2) cuando quieras activar cuentas
   sincronizadas y el tutor IA. Sin eso, la app funciona en modo local igualmente.
