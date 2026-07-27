"""CogniLab backend — auth con contraseña + tutor IA + servir el frontend."""
import hmac
import os
import secrets
import time
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import ai

APP_PASSWORD = os.environ.get("APP_PASSWORD", "cognilab2026")
# En el Space el build de React queda en backend/static (ver Dockerfile); se
# puede apuntar a otro sitio para los tests o para servir un build de dev.
STATIC_DIR = Path(os.environ.get("STATIC_DIR") or Path(__file__).resolve().parent / "static")

app = FastAPI(title="CogniLab", docs_url=None, redoc_url=None)

TOKEN_TTL_SECONDS = 12 * 3600

# Tokens de sesión emitidos en este proceso (se invalidan al reiniciar el Space).
# Guardamos el instante de expiración: sin TTL el diccionario crecía sin límite
# y un token filtrado servía para siempre, porque el Space puede estar semanas
# sin reiniciarse.
_tokens: dict[str, float] = {}


def _prune_tokens(now: float) -> None:
    for token in [t for t, expires in _tokens.items() if expires <= now]:
        _tokens.pop(token, None)


class AuthBody(BaseModel):
    password: str


class ChatBody(BaseModel):
    messages: list[dict]


class ExplainBody(BaseModel):
    question: str
    correct: str
    explanation: str


def require_token(request: Request) -> None:
    auth = request.headers.get("Authorization", "")
    token = auth.removeprefix("Bearer ").strip()
    now = time.monotonic()
    _prune_tokens(now)
    if _tokens.get(token, 0.0) <= now:
        raise HTTPException(401, "No autorizado")


@app.post("/api/auth")
def auth(body: AuthBody):
    # compare_digest sobre str revienta con TypeError si la contraseña lleva
    # tildes o ñ ("contraseña2026" es un APP_PASSWORD de lo más natural aquí).
    # Ese 500 hacía que el frontend cayera a su contraseña por defecto, así que
    # poner un password con acentos abría la app en vez de protegerla.
    # Comparando bytes UTF-8 sigue siendo resistente a timing attacks.
    if not hmac.compare_digest(body.password.encode("utf-8"), APP_PASSWORD.encode("utf-8")):
        raise HTTPException(401, "Contraseña incorrecta")
    token = secrets.token_urlsafe(32)
    now = time.monotonic()
    _prune_tokens(now)
    _tokens[token] = now + TOKEN_TTL_SECONDS
    return {"token": token}


@app.get("/api/status")
def status():
    return {"ok": True, "ai": ai.available()}


@app.post("/api/ai/chat", dependencies=[Depends(require_token)])
async def ai_chat(body: ChatBody):
    text = await ai.chat(body.messages[-8:])  # limitar historial
    if text is None:
        raise HTTPException(503, "Tutor IA no disponible")
    return {"text": text}


@app.post("/api/ai/explain", dependencies=[Depends(require_token)])
async def ai_explain(body: ExplainBody):
    text = await ai.explain(body.question, body.correct, body.explanation)
    if text is None:
        raise HTTPException(503, "Tutor IA no disponible")
    return {"text": text}


# ───────── Servir el build de React (SPA) ─────────
if STATIC_DIR.exists():
    STATIC_ROOT = STATIC_DIR.resolve()
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")

    @app.get("/{path:path}")
    def spa(path: str):
        # resolve() + is_relative_to() no son decorativos: uvicorn entrega el
        # path crudo, así que sin esto un GET a "/../main.py" salía de static/
        # y servía cualquier archivo del contenedor (código fuente incluido).
        # Y esta ruta no pasa por require_token, o sea que era lectura arbitraria
        # sin contraseña. Comprobado con `curl --path-as-is`.
        candidate = (STATIC_ROOT / path).resolve()
        if path and candidate.is_relative_to(STATIC_ROOT) and candidate.is_file():
            return FileResponse(candidate)
        return FileResponse(STATIC_ROOT / "index.html")
