"""
Alodeutsch — backend del HF Space (Docker).

- Sirve alodeutsch.html (la app sigue siendo single-file, sin cambios de arquitectura).
- POST /api/ola: respuestas de Ola vía HF Inference API (Secret HF_TOKEN).
  Sin token o ante cualquier error responde 503 y el cliente cae al
  sistema de keywords local — la IA es un upgrade, nunca una dependencia.
- Contraseña opcional (Secret APP_PASSWORD): si está configurada, toda la
  app queda detrás de un login con cookie firmada. Sin ella, app abierta.
"""
import hashlib
import hmac
import os
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse

APP_DIR = Path(__file__).parent
APP_PASSWORD = os.environ.get("APP_PASSWORD", "").strip()
HF_TOKEN = os.environ.get("HF_TOKEN", "").strip()
AI_MODELS = ["Qwen/Qwen2.5-7B-Instruct", "meta-llama/Llama-3.2-3B-Instruct"]

SYSTEM_PROMPT = (
    "Eres Ola, una profesora de alemán amable practicando conversación con un "
    "estudiante hispanohablante de nivel A2-B1. El estudiante responde a una "
    "pregunta tuya en alemán. Tu tarea: (1) si su alemán tiene errores, corrige "
    "el más importante brevemente; (2) reacciona al CONTENIDO de su respuesta "
    "con calidez y naturalidad, maximo 2 frases cortas en alemán sencillo. "
    "Responde SIEMPRE en exactamente este formato, sin nada más:\n"
    "DE: <tu respuesta en alemán>\n"
    "ES: <traducción de tu respuesta al español>"
)


def _session_token() -> str:
    return hmac.new(
        APP_PASSWORD.encode(), b"alodeutsch-session", hashlib.sha256
    ).hexdigest()


LOGIN_HTML = """<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Alodeutsch</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Inter:wght@400;600&display=swap" rel="stylesheet">
<style>
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F4F9F4;font-family:'Inter',sans-serif}
.card{background:#fff;border:1.5px solid #DCEAE1;border-radius:22px;padding:36px 30px;max-width:320px;width:88%;text-align:center;box-shadow:0 8px 24px rgba(38,64,53,.08)}
.star{font-size:52px}.title{font-family:'Baloo 2';font-weight:800;font-size:22px;color:#264035;margin:8px 0 2px}
.sub{font-size:13px;color:#5C7568;margin-bottom:22px}
input{width:100%;box-sizing:border-box;padding:13px 16px;border-radius:50px;border:2px solid #DCEAE1;font-family:inherit;font-size:14px;text-align:center;outline:none}
input:focus{border-color:#DE9B1F}
button{width:100%;margin-top:12px;padding:13px;border-radius:50px;border:none;background:linear-gradient(135deg,#DE9B1F,#F0B84A);color:#fff;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;box-shadow:0 6px 16px rgba(222,155,31,.3)}
.err{color:#D6485B;font-size:12.5px;min-height:16px;margin-top:10px;font-weight:600}
</style></head><body>
<div class="card">
  <div class="star">🌟</div>
  <div class="title">Alodeutsch</div>
  <div class="sub">Ingresá la contraseña para practicar con Ola</div>
  <form id="f">
    <input type="password" id="pw" placeholder="Contraseña" autofocus autocomplete="current-password">
    <button type="submit">Entrar →</button>
    <div class="err" id="err"></div>
  </form>
</div>
<script>
document.getElementById('f').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const r = await fetch('/api/login', {method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({password: document.getElementById('pw').value})});
  if(r.ok) location.reload();
  else document.getElementById('err').textContent = 'Contraseña incorrecta';
});
</script></body></html>"""


app = FastAPI()


def _authed(request: Request) -> bool:
    if not APP_PASSWORD:
        return True
    cookie = request.cookies.get("session", "")
    return hmac.compare_digest(cookie, _session_token())


@app.get("/")
@app.get("/index.html")
@app.get("/alodeutsch.html")
def root(request: Request):
    if not _authed(request):
        return HTMLResponse(LOGIN_HTML, status_code=401)
    return FileResponse(APP_DIR / "alodeutsch.html", media_type="text/html")


@app.post("/api/login")
async def login(request: Request):
    body = await request.json()
    if APP_PASSWORD and hmac.compare_digest(
        str(body.get("password", "")), APP_PASSWORD
    ):
        resp = JSONResponse({"ok": True})
        resp.set_cookie(
            "session",
            _session_token(),
            max_age=30 * 24 * 3600,
            httponly=True,
            samesite="lax",
        )
        return resp
    return JSONResponse({"ok": False}, status_code=401)


@app.get("/api/health")
def health(request: Request):
    return {"ok": True, "ai": bool(HF_TOKEN), "locked": bool(APP_PASSWORD)}


def _ask_model(question: str, answer: str) -> dict:
    """Llama a la Inference API. Aislada para poder stubbearse en tests."""
    from huggingface_hub import InferenceClient

    last_error = None
    for model in AI_MODELS:
        try:
            client = InferenceClient(model=model, token=HF_TOKEN, timeout=15)
            out = client.chat_completion(
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {
                        "role": "user",
                        "content": f"Pregunta de Ola: {question}\nRespuesta del estudiante: {answer}",
                    },
                ],
                max_tokens=150,
                temperature=0.7,
            )
            text = out.choices[0].message.content.strip()
            de, es = "", ""
            for line in text.splitlines():
                if line.strip().upper().startswith("DE:"):
                    de = line.split(":", 1)[1].strip()
                elif line.strip().upper().startswith("ES:"):
                    es = line.split(":", 1)[1].strip()
            if de:
                return {"de": de, "es": es or de}
            last_error = ValueError(f"unparseable model output: {text[:80]}")
        except Exception as e:  # noqa: BLE001 — cualquier fallo → probar siguiente modelo
            last_error = e
    raise last_error or RuntimeError("no models configured")


@app.post("/api/ola")
async def ola(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    if not HF_TOKEN:
        return JSONResponse({"error": "ai-unavailable"}, status_code=503)
    body = await request.json()
    question = str(body.get("question", ""))[:500]
    answer = str(body.get("answer", ""))[:500]
    if not answer:
        return JSONResponse({"error": "empty"}, status_code=400)
    try:
        return _ask_model(question, answer)
    except Exception:  # noqa: BLE001 — el cliente cae a keywords
        return JSONResponse({"error": "ai-failed"}, status_code=503)
