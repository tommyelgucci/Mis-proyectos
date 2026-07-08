"""CogniLab backend — auth con contraseña + tutor IA + servir el frontend."""
import hmac
import os
import secrets
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import ai

APP_PASSWORD = os.environ.get("APP_PASSWORD", "cognilab2026")
STATIC_DIR = Path(__file__).resolve().parent / "static"

app = FastAPI(title="CogniLab", docs_url=None, redoc_url=None)

# Tokens de sesión emitidos en este proceso (se invalidan al reiniciar el Space).
_tokens: set[str] = set()


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
    if token not in _tokens:
        raise HTTPException(401, "No autorizado")


@app.post("/api/auth")
def auth(body: AuthBody):
    if not hmac.compare_digest(body.password, APP_PASSWORD):
        raise HTTPException(401, "Contraseña incorrecta")
    token = secrets.token_urlsafe(32)
    _tokens.add(token)
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
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")

    @app.get("/{path:path}")
    def spa(path: str):
        file = STATIC_DIR / path
        if path and file.is_file():
            return FileResponse(file)
        return FileResponse(STATIC_DIR / "index.html")
