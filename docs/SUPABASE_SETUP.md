# Configurar Supabase para BrainBit (5 minutos)

Ya tienes cuenta en [supabase.com](https://supabase.com). Sigue estos pasos una sola vez:

## 1 · Crear el proyecto

1. Entra a tu [dashboard de Supabase](https://supabase.com/dashboard)
2. Click en **New project**
3. Nombre: `brainbit` (o el que quieras)
4. **Database password**: genera una y guárdala (no la necesitarás a diario, pero guárdala)
5. Región: **Central EU (Frankfurt)** — la más cercana a Suiza
6. Click **Create new project** y espera ~2 minutos a que se aprovisione

## 2 · Crear las tablas

1. En el menú lateral: **SQL Editor** → **New query**
2. Abre el archivo [`supabase/schema.sql`](../supabase/schema.sql) de este repo
3. Copia TODO su contenido, pégalo en el editor y pulsa **Run**
4. Debe decir "Success. No rows returned"

Esto crea:
- `progress` — tu progreso por categoría, protegido para que solo tú puedas leerlo
- `chat_history` — historial del tutor IA (se usa en la Fase 4)

## 3 · Copiar las credenciales

1. En el menú lateral: **Project Settings** (engranaje) → **API**
2. Copia estos dos valores:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **anon public** key (una cadena larga que empieza por `eyJ...`)

> La clave `anon` es segura de usar en el navegador: la seguridad real la dan
> las políticas RLS del schema (cada usuario solo accede a sus propias filas).
> NUNCA copies la clave `service_role`.

## 4 · Configurar BrainBit

1. En la carpeta `frontend/`, copia `.env.example` a `.env`:
   ```bash
   cd frontend
   cp .env.example .env
   ```
2. Edita `.env` y pega tus valores:
   ```
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...tu-clave...
   ```
3. Reinicia el servidor de desarrollo (`npm run dev`)

## 5 · (Opcional) Desactivar confirmación por email

Por defecto Supabase pide confirmar el email al registrarse. Para uso personal
puedes desactivarlo:

1. **Authentication** → **Sign In / Up** → **Email**
2. Desactiva **Confirm email**

Si lo dejas activado, revisa tu bandeja tras registrarte y confirma el enlace.

## ¿Cómo funciona la sincronización?

- Al **iniciar sesión**, BrainBit descarga tu progreso de Supabase y lo
  **fusiona** con el progreso local de las 6 apps (se queda con el mejor
  récord, la unión de ejercicios dominados y las estadísticas más completas).
  Tu historial previo de las apps se importa automáticamente.
- Cada vez que **guardas progreso** en cualquier app (responder en un sprint,
  marcar un ejercicio dominado...), se sube a Supabase en segundo plano.
- Si no configuras `.env`, BrainBit funciona igual en **modo local**
  (localStorage), sin cuenta.

## Nota sobre el `.env`

El archivo `.env` está en `.gitignore` — tus credenciales **nunca se suben a
GitHub**. Solo `.env.example` (sin valores reales) está versionado.
