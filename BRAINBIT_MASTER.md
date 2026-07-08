# 🧠 BrainBit — Archivo Maestro del Proyecto

> **Propósito de este documento:** retomar el proyecto desde cero en una cuenta de GitHub
> nueva y una conversación nueva de Claude Code. Contiene todo el contexto: qué es el
> proyecto, qué está hecho, cómo configurarlo y qué falta. Pégalo (o súbelo) al inicio
> de la nueva conversación junto con el zip del código.

---

## 1. Qué es BrainBit

Plataforma web unificada de estudio para preparar un **examen de aptitud ICT suizo**
(perfil: Informatiker/in EFZ Applikationsentwicklung). Unifica 6 mini-apps de
entrenamiento que antes eran HTML independientes, añade cuenta de usuario con
sincronización de progreso en la nube y un tutor de IA con Claude.

**⚠️ Regla importante:** NO usar nombres de marcas registradas de exámenes comerciales
en el nombre del repo, README, títulos, descripciones ni commits. Usar siempre términos
genéricos: "examen de aptitud ICT", "ICT-Eignungstest", "ICT Study Suite".

### Las 6 categorías de entrenamiento
1. 🧮 **Mathematik** — porcentajes, fracciones, estimación, proporciones, descuentos encadenados, transferencia de datos
2. 🔢 **Zahlenreihen** — series numéricas (aritmética, geométrica, Fibonacci, cuadrados, alternantes, entrelazadas…)
3. 💻 **Analyse & Programmierung** — pseudocódigo: bucles, condicionales, asignaciones, recursión (con trace-table stepper)
4. 👁️ **Konzentration & Merkfähigkeit** — comparación de bloques, vectores en cuadrícula, memoria diferida
5. 🕸️ **Vernetztes Denken** — pensamiento sistémico (teoría: Gomez & Probst 1987)
6. 📐 **Vorstellungsvermögen** — visualización espacial (plegado de cubos con CSS 3D)

---

## 2. Stack técnico (todo en tier gratuito)

| Capa | Tecnología | Hosting |
|---|---|---|
| Frontend | React 18 + TypeScript + Vite + Zustand | Vercel (o GitHub Pages) |
| Base de datos + Auth | Supabase (PostgreSQL + email/password) | Supabase free tier |
| Tutor IA | Claude API (`@anthropic-ai/sdk`) | — |
| Verificación | Scripts `tsx` con derivación independiente | CI local (`npm run verify`) |

---

## 3. Estructura del repo

```
/
├── BRAINBIT_MASTER.md          ← este archivo
├── README.md
├── docs/
│   ├── CLAUDE_CODE_BRIEF_ICT.md            (brief original del proyecto)
│   ├── 01_VERNETZTES_DENKEN_Documento_Maestro.md
│   └── SUPABASE_SETUP.md                   (guía de configuración, 5 min)
├── supabase/
│   └── schema.sql              (tablas + políticas RLS — ver §5)
└── frontend/
    ├── package.json            (scripts: dev, build, verify, lint)
    ├── .env.example            (variables necesarias — ver §6)
    ├── public/apps/            (las 6 apps HTML con shim localStorage+postMessage)
    └── src/
        ├── App.tsx             (pestañas: Inicio / Estudiar / Tutor IA / Progreso / Cuenta)
        ├── engines/            (generadores portados a TS: mathematik, zahlenreihen,
        │                        konzentration, analyse + mixedSprint())
        ├── pages/
        │   ├── Study.tsx       (grid de 6 categorías → visor iframe)
        │   ├── Tutor.tsx       (chat con Claude, historial por categoría)
        │   └── Account.tsx     (login/registro Supabase + estado de sync)
        ├── lib/
        │   ├── supabase.ts     (cliente; app funciona en modo local si no hay .env)
        │   └── claude.ts       (cliente Claude + system prompt del tutor)
        ├── utils/
        │   ├── storage-bridge.ts   (postMessage iframe→parent, store Zustand)
        │   ├── sync.ts             (sincronización nube↔local)
        │   └── merge-progress.ts   (fusión: máximo récord, unión de dominados)
        └── scripts/
            ├── verify-generators.ts  (1000 casos/tipo, 25 tipos, derivación independiente)
            └── verify-merge.ts       (casos de fusión local↔remoto)
```

---

## 4. Estado actual — Fases completadas

- ✅ **Fase 1 — Scaffolding:** estructura frontend + configuración Vite/TS
- ✅ **Fase 2 — Unificación UI:** las 6 apps integradas vía iframe con shim de storage;
  25 generadores portados a módulos TS; verificación con 25.000 casos (0 fallos)
- ✅ **Fase 3 — Autenticación:** Supabase Auth (email/password), sincronización de
  progreso con fusión inteligente, importación del historial localStorage
- ✅ **Fase 4 — Tutor IA:** chat con Claude (`claude-opus-4-8`), enfoque por categoría,
  historial persistido en Supabase

### Fases pendientes
- ⬜ **Fase 5 — Generador de ejercicios con IA:** Claude genera ejercicios nuevos →
  el código los verifica recalculando la solución → si falla, se regenera.
  Reutilizar los verificadores de `scripts/verify-generators.ts`.
- ⬜ **Fase 6 — Dashboard de progreso:** precisión por tipo, detección de puntos
  débiles, sugerencia de siguiente sesión (pestaña "Progreso" es placeholder).
- ⬜ **Fase 7 — Búsqueda en internet** (opcional): SerpAPI o similar.
- ⬜ **Deploy:** Vercel apuntando a `frontend/` (framework: Vite, build: `npm run build`,
  output: `dist`). Añadir las variables de entorno del §6 en el dashboard de Vercel.

---

## 5. Schema de Supabase (ejecutar en SQL Editor)

En el dashboard de Supabase → **SQL Editor** → **New query** → pegar y **Run**:

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

---

## 6. Variables de entorno (`frontend/.env`)

Copiar `frontend/.env.example` a `frontend/.env` y rellenar:

```
VITE_SUPABASE_URL=        ← Supabase → Project Settings → API → Project URL
VITE_SUPABASE_ANON_KEY=   ← Supabase → Project Settings → API → anon public key
VITE_CLAUDE_API_KEY=      ← console.anthropic.com → API Keys
```

**Nunca subir `.env` al repo** (ya está en `.gitignore`). Sin estas variables la app
funciona igualmente en modo local (progreso solo en el navegador, tutor desactivado).

Nota: la clave de Claude en el frontend queda expuesta en el navegador
(`dangerouslyAllowBrowser`). Aceptable para uso personal; antes de publicar la app
para terceros, mover las llamadas a Claude a un backend/edge function.

---

## 7. Comandos

```bash
cd frontend
npm install        # instalar dependencias
npm run dev        # desarrollo local (http://localhost:5173)
npm run verify     # verificación: 25 generadores × 1000 casos + fusión de progreso
npm run build      # build de producción (tsc + vite)
```

**Regla de calidad del proyecto:** todo generador de ejercicios se verifica
recalculando la solución por **derivación independiente** (parsear el enunciado y
derivar la respuesta sin reutilizar la fórmula del generador). Si un test falla,
comprobar primero si el error está en el test o en el generador. Mantener
`npm run verify` en verde antes de cada commit.

**No perder nunca** (features distintivas de las apps HTML): trace-table stepper
(Analyse), plegado CSS 3D (Vorstellungsvermögen), memoria diferida con borrado del
DOM (Konzentration), revelación de estructura en series (Zahlenreihen).

---

## 8. Precauciones para la cuenta nueva de GitHub

Causas probables de las suspensiones anteriores y cómo evitarlas:

1. **Sin marcas registradas** en nombre de repo, descripción, README o títulos
   (este repo ya está limpio; mantenerlo así).
2. **Asentar la cuenta antes de automatizar:** verificar email, activar 2FA, completar
   el perfil (nombre, bio, avatar) y usar la cuenta manualmente un par de días antes
   de conectar integraciones o hacer pushes masivos. Las cuentas recién creadas que
   inmediatamente conectan OAuth de terceros y suben mucho código de golpe disparan
   los filtros antispam automáticos de GitHub.
3. **Crear el repo a mano desde la web** (con README y licencia MIT desde el inicio)
   y subir el código en commits normales, no de una sola vez con herramientas externas.
4. **Registrarse en Supabase con email**, no con "Sign in with GitHub", y no conectar
   la integración GitHub↔Supabase — no es necesaria para este proyecto (el schema se
   pega a mano en el SQL Editor).
5. **Considera apelar la suspensión** de la cuenta anterior en
   https://support.github.com (categoría "Account suspension") — a menudo son falsos
   positivos automáticos y los reactivan. Crear cuentas nuevas repetidamente también
   puede disparar los filtros, así que si te la restauran, mejor.

---

## 9. Cómo empezar la nueva conversación de Claude Code

1. Crea la cuenta nueva de GitHub siguiendo el §8 y un repo vacío (p. ej. `brainbit`)
   con README y licencia.
2. Sube el contenido del zip del proyecto al repo (o pídele a Claude Code que lo haga
   desde el zip).
3. Abre una conversación nueva de Claude Code conectada a ese repo y di:

   > Lee `BRAINBIT_MASTER.md` en la raíz del repo. Es el archivo maestro del proyecto:
   > contiene el estado actual (Fases 1–4 completadas) y las fases pendientes.
   > Verifica que `npm run verify` y `npm run build` pasan en `frontend/`, y continúa
   > con la Fase 5 (o la fase que yo te indique).

4. Configura Supabase (§5) y el `.env` (§6) cuando quieras activar cuentas y tutor.
