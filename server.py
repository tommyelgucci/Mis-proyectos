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
import random
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


# ═══════════════════════════════════════════════════════════════════════
# MODO "SERVICE SUIZA" — la IA hace de cliente de café/restaurante suizo,
# el usuario practica de camarero/a. Escenario aleatorio server-side;
# sin sesión de servidor (stateless) — el cliente reenvía scenario+history
# en cada turno. Corrección suave vía TIPP, nunca rompe personaje.
# ═══════════════════════════════════════════════════════════════════════
SERVICE_MOODS = [
    {"key": "friendly", "de": "freundlich und entspannt"},
    {"key": "rushed", "de": "in Eile, möchte schnell bedient werden"},
    {"key": "indecisive", "de": "unentschlossen, überlegt lange zwischen Optionen"},
    {"key": "complaining", "de": "leicht unzufrieden, beschwert sich über Kleinigkeiten"},
]
SERVICE_ORDERS = [
    "ein Kaffee", "ein Kaffee mit Milch", "ein Tee", "ein Croissant",
    "ein Stück Kuchen", "das Tagesmenü", "ein Sandwich", "eine heisse Schokolade",
]
SERVICE_DIETS = [
    {"key": "none", "de": "keine besonderen Einschränkungen"},
    {"key": "vegan", "de": "vegan"},
    {"key": "gluten", "de": "glutenfrei (Zöliakie)"},
    {"key": "lactose", "de": "laktoseintolerant"},
    {"key": "nuts", "de": "Nussallergie"},
]
SERVICE_EXTRAS = [
    "keine Besonderheit", "möchte später noch etwas bestellen",
    "fragt nach dem WLAN-Passwort", "möchte die Rechnung getrennt",
    "ändert die Bestellung nach der ersten Wahl", "bittet um eine Empfehlung",
]


def _random_scenario() -> dict:
    return {
        "mood": random.choice(SERVICE_MOODS)["key"],
        "order": random.choice(SERVICE_ORDERS),
        "diet": random.choice(SERVICE_DIETS)["key"],
        "extra": random.choice(SERVICE_EXTRAS),
    }


def _service_system_prompt(scenario: dict) -> str:
    mood = next(m["de"] for m in SERVICE_MOODS if m["key"] == scenario.get("mood"))
    diet = next(d["de"] for d in SERVICE_DIETS if d["key"] == scenario.get("diet"))
    return (
        "Eres un/a cliente en un café/restaurante en Suiza. Hablas SOLO alemán, "
        "nivel de vocabulario A2-B1 (frases cortas y simples). El usuario es el/la "
        f"camarero/a que te atiende. Tu personalidad ahora: {mood}. "
        f"Tu pedido base: {scenario.get('order','')}. "
        "Restricción alimentaria (mencionala SOLO si es relevante para lo que "
        "pedís, por ejemplo preguntando si un plato la respeta — no la anuncies "
        f"de entrada sin motivo): {diet}. "
        f"Detalle adicional de la situación: {scenario.get('extra','')}. "
        "NUNCA salgas de personaje, nunca actúes como profesor/a ni corrijas al "
        "camarero/a vos mismo dentro de tu línea de cliente — solo respondé como "
        "cliente. Cuando la conversación llegue a un final natural (pediste la "
        "cuenta, te despediste, o el pedido quedó cerrado), agregá el marcador "
        "[ENDE] al final de tu línea DE.\n"
        "Responde SIEMPRE en exactamente este formato, sin nada más:\n"
        "DE: <tu línea en alemán, como cliente>\n"
        "ES: <traducción al español>\n"
        "TIPP: <SOLO si el camarero/a cometió un error de alemán importante en su "
        "último mensaje, una corrección breve en español; si no hubo error o es "
        "el primer turno, escribe exactamente TIPP: ->"
    )


def _parse_service_output(text: str) -> dict:
    de, es, tipp = "", "", None
    for line in text.splitlines():
        s = line.strip()
        if s.upper().startswith("DE:"):
            de = s.split(":", 1)[1].strip()
        elif s.upper().startswith("ES:"):
            es = s.split(":", 1)[1].strip()
        elif s.upper().startswith("TIPP:"):
            val = s.split(":", 1)[1].strip()
            if val and val not in ("-", "--", "—"):
                tipp = val
    done = "[ENDE]" in de
    de = de.replace("[ENDE]", "").strip()
    if not de:
        raise ValueError(f"unparseable service output: {text[:100]}")
    result = {"de": de, "es": es or de, "done": done}
    if tipp:
        result["tipp"] = tipp
    return result


def _ask_service(system: str, user_content: str) -> str:
    """Llama a la Inference API para el modo Service. Aislada para poder stubbearse en tests."""
    from huggingface_hub import InferenceClient

    last_error = None
    for model in AI_MODELS:
        try:
            client = InferenceClient(model=model, token=HF_TOKEN, timeout=15)
            out = client.chat_completion(
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user_content},
                ],
                max_tokens=200,
                temperature=0.85,
            )
            return out.choices[0].message.content.strip()
        except Exception as e:  # noqa: BLE001 — probar el siguiente modelo
            last_error = e
    raise last_error or RuntimeError("no models configured")


def _valid_scenario(scenario: dict) -> bool:
    return isinstance(scenario, dict) and all(
        k in scenario for k in ("mood", "order", "diet", "extra")
    )


@app.post("/api/service/start")
async def service_start(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    if not HF_TOKEN:
        return JSONResponse({"error": "ai-unavailable"}, status_code=503)
    scenario = _random_scenario()
    system = _service_system_prompt(scenario)
    try:
        text = _ask_service(
            system,
            "Beginne das Gespräch als Kundin/Kunde. Grüsse und bestelle etwas, "
            "passend zu deiner Rolle.",
        )
        out = _parse_service_output(text)
        out["scenario"] = scenario
        return out
    except Exception:  # noqa: BLE001
        return JSONResponse({"error": "ai-failed"}, status_code=503)


@app.post("/api/service/reply")
async def service_reply(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    if not HF_TOKEN:
        return JSONResponse({"error": "ai-unavailable"}, status_code=503)
    body = await request.json()
    scenario = body.get("scenario") or {}
    history = body.get("history") or []
    answer = str(body.get("answer", ""))[:500]
    if not answer:
        return JSONResponse({"error": "empty"}, status_code=400)
    if not _valid_scenario(scenario):
        return JSONResponse({"error": "bad-scenario"}, status_code=400)
    system = _service_system_prompt(scenario)
    convo = "\n".join(
        f"{'Kunde' if h.get('role')=='client' else 'Kellner/in'}: {h.get('de','')}"
        for h in history[-8:]
        if isinstance(h, dict)
    )
    user_content = (
        f"{convo}\nKellner/in (letzte Antwort): {answer}\n\n"
        "Reagiere als Kunde auf diese Antwort."
    )
    try:
        text = _ask_service(system, user_content)
        return _parse_service_output(text)
    except Exception:  # noqa: BLE001
        return JSONResponse({"error": "ai-failed"}, status_code=503)


@app.post("/api/service/hint")
async def service_hint(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    if not HF_TOKEN:
        return JSONResponse({"error": "ai-unavailable"}, status_code=503)
    body = await request.json()
    scenario = body.get("scenario") or {}
    history = body.get("history") or []
    if not _valid_scenario(scenario):
        return JSONResponse({"error": "bad-scenario"}, status_code=400)
    last_client_line = ""
    for h in reversed(history):
        if isinstance(h, dict) and h.get("role") == "client":
            last_client_line = h.get("de", "")
            break
    system = (
        "Eres un asistente que ayuda a un/a estudiante de alemán (camarero/a en "
        "un café suizo) que no sabe qué responder. Da EXACTAMENTE 3 frases cortas "
        "en alemán, típicas de servicio de mesa, apropiadas para responder a lo "
        "que el cliente acaba de decir. Nivel A2-B1, simples y naturales."
    )
    user_content = (
        f'El cliente acaba de decir: "{last_client_line}"\n\n'
        "Dame 3 opciones de respuesta en este formato exacto:\n"
        "1. <frase en alemán> | <traducción al español>\n"
        "2. <frase en alemán> | <traducción al español>\n"
        "3. <frase en alemán> | <traducción al español>"
    )
    try:
        text = _ask_service(system, user_content)
        hints = []
        for line in text.splitlines():
            s = line.strip()
            if len(s) > 2 and s[0] in "123" and s[1] == ".":
                rest = s[2:].strip()
                if "|" in rest:
                    de, es = rest.split("|", 1)
                    hints.append({"de": de.strip(), "es": es.strip()})
        if not hints:
            raise ValueError(f"unparseable hints: {text[:100]}")
        return {"hints": hints[:3]}
    except Exception:  # noqa: BLE001
        return JSONResponse({"error": "ai-failed"}, status_code=503)
