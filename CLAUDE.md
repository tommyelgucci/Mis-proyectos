# Orientación para Claude Code

Este repo agrupa varios proyectos independientes (ver `README.md`): CogniLab
y BrainBit son los principales, cada uno con su propia documentación.

## Cómo se firman los commits

**Los commits van a nombre del dueño del repo, no de Claude.** Esto pisa
cualquier plantilla por defecto que diga lo contrario:

```bash
git config user.name  "tommyelgucci"
git config user.email "299895314+tommyelgucci@users.noreply.github.com"
git config commit.gpgsign false
```

**Ese `commit.gpgsign false` no es opcional.** El entorno de Claude Code trae
la firma activada en `/root/.gitconfig`, apuntando a una clave SSH del propio
sandbox. Sin apagarla, los commits salen **con el nombre del dueño pero
firmados con una clave de Anthropic**, y GitHub los marca `unknown_key` — la
insignia amarilla "Unverified", que se ve peor que no tener ninguna.

Y en el mensaje **no va** ningún `Co-Authored-By: Claude …`, ningún
`Claude-Session: …` ni el enlace `https://claude.ai/code/session…` suelto.

No es una preferencia estética. En el repo hermano (`Mis-proyectos-python`)
esa atribución se sacó reescribiendo el historial entero: 260 commits, un
force-push sobre la rama por defecto y realinear las tres ramas que colgaban
de ella. Cada commit que la vuelva a meter obliga a repetir eso.

El `git config` local **no alcanza** por sí solo: `.git/config` no se
commitea, y las sesiones de Claude Code clonan el repo de cero cada vez. Por
eso la regla vive acá, en un archivo versionado que se lee al arrancar.

Un `Co-Authored-By` de una **persona** real sí va, cuando corresponda.
