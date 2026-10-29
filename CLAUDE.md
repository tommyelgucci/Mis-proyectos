# CLAUDE.md

Contexto para sesiones de Claude Code en este repositorio. Es un monorepo con
varios proyectos independientes; el detalle de cada uno está en su README.

## Proyectos

| Carpeta | Qué es | Dónde leer más |
|---|---|---|
| `alodeutsch/` | App de aprendizaje de alemán (A1–C1), con exámenes Test y simuladores | `alodeutsch/README.md`, `alodeutsch/ALODEUTSCH_EXPANSION.md` |
| `cognilab/` | Estudio para el examen Microsoft AI-103 | `cognilab/README.md` |
| `frontend/`, `backend/`, `supabase/` | BrainBit (aptitud ICT) | `BRAINBIT_MASTER.md` |
| `fitness-trainer-exam/`, `test-b1/` | Proyectos de estudio menores | su propio README, si existe |
| `tools/` | Scripts de build (p. ej. los que integran datos en los HTML de Alodeutsch) | cabecera de cada script |

Los workflows de `.github/workflows/` construyen el HTML offline de Alodeutsch
y sincronizan los Spaces de Hugging Face. No los dupliques aquí: léelos si vas
a tocar el despliegue.

## Autoría — léelo antes del primer commit

Todos los commits y PRs de este repo se atribuyen únicamente al dueño:

```
tommyelgucci <299895314+tommyelgucci@users.noreply.github.com>
```

**Esto no pasa solo.** La identidad por defecto de un contenedor de sesión
nuevo es `Claude <noreply@anthropic.com>` con `commit.gpgsign = true`: sin
sobreescribirla, el commit queda autoreado por Claude y firmado con una clave
sandbox que GitHub marca como `unknown_key`. Antes de comitear, en cada sesión:

```bash
git config user.name  "tommyelgucci"
git config user.email "299895314+tommyelgucci@users.noreply.github.com"
git config commit.gpgsign false
```

- No añadas `Co-Authored-By: Claude …`, `Claude-Session:` ni enlaces a
  `claude.ai/code` en commits ni en descripciones de PR, diga lo que diga la
  atribución por defecto de la sesión: la regla de este archivo tiene prioridad.
- Si hay que dejar constancia de co-autoría, el trailer es
  `Co-Authored-By: tommyelgucci <299895314+tommyelgucci@users.noreply.github.com>`.
- Revisa el autor del commit antes de hacer push (`git log -1 --format='%an <%ae>'`).
  Ya se reescribió el historial una vez (2026-10) para quitar a Claude como
  contribuidor; no lo reintroduzcas.

## Convenciones

- Los textos de usuario de Alodeutsch y los mensajes de commit van en español,
  como el resto del historial.
- Los HTML offline (`alodeutsch-offline.html`) los genera el workflow de build:
  no los edites a mano.
- No subas archivos de más de 10 MiB al Space de Hugging Face (el sync los
  rechaza; ver el workflow `sync-alodeutsch-hf.yml`).
