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
from functools import lru_cache
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse

APP_DIR = Path(__file__).parent
APP_PASSWORD = os.environ.get("APP_PASSWORD", "").strip()
HF_TOKEN = os.environ.get("HF_TOKEN", "").strip()
AI_MODELS = ["Qwen/Qwen2.5-7B-Instruct", "meta-llama/Llama-3.2-3B-Instruct"]

def _support(lang: str) -> dict:
    """Idioma de apoyo del perfil: es (default) o en. Afecta solo el idioma
    de las traducciones/correcciones — el alemán es siempre el objetivo."""
    if lang == "en":
        return {"name": "English", "student": "English-speaking",
                "trans": "translation of your reply into English",
                "tip": "a brief correction in English"}
    return {"name": "español", "student": "hispanohablante",
            "trans": "traducción de tu respuesta al español",
            "tip": "una corrección breve en español"}


def _ola_system(lang: str) -> str:
    sup = _support(lang)
    return (
        "Eres Ola, una profesora de alemán amable practicando conversación con un "
        f"estudiante {sup['student']} de nivel A2-B1. El estudiante responde a una "
        "pregunta tuya en alemán. Tu tarea: (1) si su alemán tiene errores, corrige "
        f"el más importante brevemente EN {sup['name']}; (2) reacciona al CONTENIDO "
        "de su respuesta con calidez y naturalidad, maximo 2 frases cortas en alemán "
        "sencillo. Responde SIEMPRE en exactamente este formato, sin nada más:\n"
        "DE: <tu respuesta en alemán>\n"
        f"ES: <{sup['trans']}>"
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


@lru_cache(maxsize=1)
def _app_with_lesson11() -> str:
    """Attach the small lesson review and telc link to the served app."""
    html = (APP_DIR / "alodeutsch.html").read_text(encoding="utf-8")
    lesson_slot = "if(l.id===11) h+=L11AudioPractice.render()+L11Tenses.render();"
    assert html.count(lesson_slot) == 1
    html = html.replace(
        lesson_slot,
        lesson_slot + ' h+=`<div class="intro-box" style="margin-top:20px">'
        '<h3>⚡ Repaso de C y D</h3><p>12 preguntas sobre expresiones, '
        'tráfico e In der Fremde.</p>${L11FastReview.render()}</div>`;',
    )
    intro_end = '    </div>\n    <div class="exam-score-pill"'
    assert html.count(intro_end) == 1
    html = html.replace(
        intro_end,
        '      <p><a href="/telc-b1" target="_blank" rel="noopener">'
        '🎯 Abrir entrenador telc B1 actualizado</a></p>\n' + intro_end,
    )
    # Attach the B2.1 lesson screens to the existing single-page app.
    screen_slot = '<div id="scr-b1-official-exam" class="scr">'
    assert html.count(screen_slot) == 1
    html = html.replace(screen_slot, '''<div id="scr-b2-lessons" class="scr">
  <div id="b2-lessons-body" style="padding-bottom:30px"></div>
</div>
<div id="scr-b2-lesson" class="scr">
  <div id="b2-lesson-body" class="study-body" style="padding-top:14px;padding-bottom:30px"></div>
</div>
<div id="scr-b22-lessons" class="scr">
  <div id="b22-lessons-body" class="study-body" style="padding-bottom:30px"></div>
</div>
<div id="scr-b22-lesson" class="scr">
  <div id="b22-lesson-body" class="study-body" style="padding-top:14px;padding-bottom:30px"></div>
</div>
<div id="scr-c11-lessons" class="scr">
  <div id="c11-lessons-body" class="study-body" style="padding-bottom:30px"></div>
</div>
<div id="scr-c11-lesson" class="scr">
  <div id="c11-lesson-body" class="study-body" style="padding-top:14px;padding-bottom:30px"></div>
</div>
''' + screen_slot)
    nav_slot = "    'b1-lesson':'',"
    assert html.count(nav_slot) == 1
    html = html.replace(nav_slot, nav_slot + "\n    'b2-lessons':'📚 Sicher! B2.1 · Lektionen 1–6',\n    'b2-lesson':'',\n    'b22-lessons':'📚 Sicher! B2.2 · Lektionen 7–12',\n    'b22-lesson':'',\n    'c11-lessons':'📘 Sicher! C1 · Lektionen 1–12',\n    'c11-lesson':'',")
    level_slot = "    h+=`<div class=\"grid-label\">${lv.MODS.length} ${Lang.td('lvl.mods','Módulos de Gramática')}</div><div class=\"mod-grid\">`;"
    assert html.count(level_slot) == 1
    html = html.replace(level_slot, '''    if(Current.levelId==='b2'){
      const ls=B2Lessons.stats();
      h+=`<div class="center-cta" style="margin:12px 16px 18px;padding:24px 18px;background:linear-gradient(135deg,var(--sky),var(--lav));border:1.5px solid var(--border);border-radius:var(--r-xl)">
        <div style="font-size:43px;margin-bottom:6px">📚</div>
        <h2 style="font-family:'Baloo 2';font-size:21px;color:var(--ink);margin:0 0 7px">Sicher! B2.1 · Lektionen 1–6</h2>
        <p style="color:var(--ink-soft);font-size:13px;line-height:1.6">${Lang.current==='en'?'A lesson-by-lesson course with original explanations, vocabulary, exercises, writing and speaking.':'Curso por lecciones con explicaciones, vocabulario, ejercicios, escritura y práctica oral originales.'}</p>
        <div style="font-size:12px;color:var(--ink-faint);font-weight:700;margin-bottom:16px">${ls.attempted}/6 ${Lang.current==='en'?'lessons practised':'lecciones practicadas'} · ${ls.correct}/${ls.total} ✓</div>
        <button class="pill-btn" onclick="B2Lessons.open()">${Lang.current==='en'?'Open lessons →':'Abrir lecciones →'}</button>
      </div>`;
    }
''' + level_slot)
    html = html.replace(level_slot, "    if(Current.levelId==='b2') h+=B22Lessons.banner();\n    if(Current.levelId==='b2c1') h+=C11Lessons.banner();\n" + level_slot)
    assert '<script>' in html
    return html.replace('<script>', '<script src="/l11-quick-review.js"></script>\n<script>', 1).replace("</body>", '<script src="/b1-class-practice.js"></script>\n<script src="/b1-class-writing-practice.js"></script>\n<script src="/b2-sicher-lessons.js"></script>\n<script src="/b22-sicher-lessons.js"></script>\n<script src="/b2-lesson-practice.js"></script>\n<script src="/b2-guided-study.js"></script>\n<script src="/c11-sicher-lessons.js"></script>\n<script src="/c12-sicher-lessons.js"></script>\n<script src="/b1-kahoot-mixed-review.js"></script>\n<script src="/b1-uebungstests-4-5.js"></script>\n<script src="/game-expansion.js"></script>\n<script src="/placement-expansion.js"></script>\n<script src="/lesson-narration.js"></script>\n</body>')


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
    return HTMLResponse(_app_with_lesson11())


@app.get("/l11-quick-review.js")
def lesson11_review(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "l11-quick-review.js", media_type="application/javascript")


@app.get("/b1-class-practice.js")
def b1_class_practice(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b1-class-practice.js", media_type="application/javascript")


@app.get("/b1-class-writing-practice.js")
def b1_class_writing_practice(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b1-class-writing-practice.js", media_type="application/javascript")


@app.get("/b2-sicher-lessons.js")
def b2_sicher_lessons(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b2-sicher-lessons.js", media_type="application/javascript")


@app.get("/b22-sicher-lessons.js")
def b22_sicher_lessons(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b22-sicher-lessons.js", media_type="application/javascript")


@app.get("/b2-lesson-practice.js")
def b2_lesson_practice(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b2-lesson-practice.js", media_type="application/javascript")


@app.get("/b2-guided-study.js")
def b2_guided_study(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b2-guided-study.js", media_type="application/javascript")


@app.get("/c11-sicher-lessons.js")
def c11_sicher_lessons(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "c11-sicher-lessons.js", media_type="application/javascript")


@app.get("/c12-sicher-lessons.js")
def c12_sicher_lessons(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "c12-sicher-lessons.js", media_type="application/javascript")


@app.get("/b1-kahoot-mixed-review.js")
def b1_kahoot_mixed_review(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b1-kahoot-mixed-review.js", media_type="application/javascript")


@app.get("/b1-uebungstests-4-5.js")
def b1_uebungstests(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "b1-uebungstests-4-5.js", media_type="application/javascript")


@app.get("/game-expansion.js")
def game_expansion(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "game-expansion.js", media_type="application/javascript")


@app.get("/placement-expansion.js")
def placement_expansion(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "placement-expansion.js", media_type="application/javascript")


@app.get("/lesson-narration.js")
def lesson_narration(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "lesson-narration.js", media_type="application/javascript")


@app.get("/telc-b1")
def telc_b1(request: Request):
    if not _authed(request):
        return HTMLResponse(LOGIN_HTML, status_code=401)
    return FileResponse(APP_DIR / "ALOdeutsch_TELC_B1_Trainer.html", media_type="text/html")


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
            samesite="none",
            secure=True,
        )
        return resp
    return JSONResponse({"ok": False}, status_code=401)


@app.get("/api/health")
def health(request: Request):
    return {"ok": True, "ai": bool(HF_TOKEN), "locked": bool(APP_PASSWORD)}


def _ask_model(question: str, answer: str, lang: str = "es") -> dict:
    """Llama a la Inference API. Aislada para poder stubbearse en tests."""
    from huggingface_hub import InferenceClient

    last_error = None
    for model in AI_MODELS:
        try:
            client = InferenceClient(model=model, token=HF_TOKEN, timeout=15)
            out = client.chat_completion(
                messages=[
                    {"role": "system", "content": _ola_system(lang)},
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
    lang = "en" if body.get("lang") == "en" else "es"
    try:
        return _ask_model(question, answer, lang)
    except Exception:  # noqa: BLE001 — el cliente cae a keywords
        return JSONResponse({"error": "ai-failed"}, status_code=503)


def _tutor_system(lang: str) -> str:
    sup = _support(lang)
    return (
        "Eres un tutor de aleman paciente. El estudiante ya vio una explicacion "
        "de por que la respuesta correcta a una pregunta de quiz es la que es, "
        "pero no le quedo clara. Tu tarea: explicarsela de nuevo con OTRO enfoque "
        f"(otro ejemplo, otra analogia, otras palabras), en {sup['name']}, en maximo "
        "3 frases cortas. No repitas la explicacion original con las mismas palabras. "
        "Responde solo con la explicacion, sin saludos ni introducciones."
    )


def _ask_tutor(question: str, correct_answer: str, explanation: str, lang: str = "es") -> str:
    """Llama a la Inference API para una explicación alternativa. Aislada para tests."""
    from huggingface_hub import InferenceClient

    last_error = None
    for model in AI_MODELS:
        try:
            client = InferenceClient(model=model, token=HF_TOKEN, timeout=15)
            out = client.chat_completion(
                messages=[
                    {"role": "system", "content": _tutor_system(lang)},
                    {
                        "role": "user",
                        "content": (
                            f"Pregunta: {question}\n"
                            f"Respuesta correcta: {correct_answer}\n"
                            f"Explicación original: {explanation}"
                        ),
                    },
                ],
                max_tokens=150,
                temperature=0.7,
            )
            text = out.choices[0].message.content.strip()
            if text:
                return text
            last_error = ValueError("empty tutor output")
        except Exception as e:  # noqa: BLE001 — cualquier fallo → probar siguiente modelo
            last_error = e
    raise last_error or RuntimeError("no models configured")


@app.post("/api/tutor")
async def tutor(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    if not HF_TOKEN:
        return JSONResponse({"error": "ai-unavailable"}, status_code=503)
    body = await request.json()
    question = str(body.get("question", ""))[:500]
    correct_answer = str(body.get("correctAnswer", ""))[:300]