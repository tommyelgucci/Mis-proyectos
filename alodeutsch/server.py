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
    scripts = (
        '<script src="/b1-class-practice.js"></script>\n'
        '<script src="/b1-class-writing-practice.js"></script>\n'
        '<script src="/b2-sicher-lessons.js"></script>\n'
        '<script src="/b22-sicher-lessons.js"></script>\n'
        '<script src="/b2-lesson-practice.js"></script>\n'
        '<script src="/b2-guided-study.js"></script>\n'
        '<script src="/c11-sicher-lessons.js"></script>\n'
        '<script src="/c12-sicher-lessons.js"></script>\n'
        '<script src="/b1-kahoot-mixed-review.js"></script>\n'
        '<script src="/b1-uebungstests-4-5.js"></script>\n'
        '<script src="/game-expansion.js"></script>\n'
        '<script src="/placement-expansion.js"></script>\n'
        '<script src="/lesson-narration.js"></script>\n'
        '<script src="/lernreise.js?v=20261019-backfix3"></script>\n'
        '<script src="/lila-runtime.js?v=20261019-orange-card-persistent11"></script>\n'
        '<script src="/ui-bugfix.js?v=20261019"></script>\n'
        '</body>'
    )
    html = html.replace('<script>', '<script src="/l11-quick-review.js"></script>\n<script>', 1).replace("</body>", scripts)

    # Make the incoming-call avatar part of the HTML actually served by FastAPI.
    # index.html is only a wrapper in the Hugging Face Space, so its visual patches
    # do not affect this route unless they are also applied here.
    incoming_ola = '<span class="ola-avatar" id="ola-call-incoming">🌟</span>'
    lila_caller = '<span class="ola-avatar lila-incoming-avatar" id="ola-call-incoming" role="img" aria-label="Lila llama a Ola"><svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><path d="M24 47Q39 28 54 48Q39 64 24 47ZM66 48Q81 28 96 47Q81 64 66 48Z" fill="#c9b5ff"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M33 82Q60 99 87 82Q79 104 60 104Q41 104 33 82Z" fill="#f8e8ff"/><path d="M25 82 15 88 30 93M95 82 105 88 90 93" fill="none" stroke="#6543a5" stroke-width="3" stroke-linecap="round"/><path d="M44 104 41 112M76 104 79 112" stroke="#ffc95d" stroke-width="4" stroke-linecap="round"/><path d="M37 30 29 22M83 30 91 22" stroke="#b89dff" stroke-width="4" stroke-linecap="round"/></svg><span class="lila-call-phone" aria-hidden="true">📞</span></span>'
    if incoming_ola in html:
        html = html.replace(incoming_ola, lila_caller, 1)

    lila_style = """<style id="alo-lila-incoming-call">
#scr-call-incoming.scr.on{position:fixed;inset:0;z-index:9999;min-height:100dvh;height:100%;overflow:auto;background:radial-gradient(ellipse at 50% 32%,#43306f 0%,#201735 42%,#11101c 100%);color:#fff;padding-top:env(safe-area-inset-top);box-sizing:border-box}
#scr-call-incoming .call-wrap{min-height:100%;padding-bottom:calc(28px + env(safe-area-inset-bottom))}
#scr-call-incoming .call-mid{gap:14px}
#scr-call-incoming .call-mid:before{content:"LLAMADA ENTRANTE";display:block;font-size:11px;letter-spacing:3px;font-weight:800;color:#c9b5ff;margin-bottom:4px}
#ola-call-incoming.lila-incoming-avatar{position:relative;width:min(48vw,196px);height:min(48vw,196px);min-width:164px;min-height:164px;display:inline-flex;align-items:center;justify-content:center;filter:drop-shadow(0 8px 22px rgba(112,75,190,.58));animation:lilaIncomingRing .72s ease-in-out infinite}
#ola-call-incoming.lila-incoming-avatar:before{content:"";position:absolute;inset:-17px;border:2px solid rgba(201,181,255,.48);border-radius:50%;animation:lilaRingWave 1.8s ease-out infinite;pointer-events:none}
#ola-call-incoming.lila-incoming-avatar:after{content:"";position:absolute;inset:-28px;border:1px solid rgba(201,181,255,.2);border-radius:50%;box-shadow:0 0 32px rgba(154,118,232,.18);pointer-events:none}
#ola-call-incoming.lila-incoming-avatar>svg{position:relative;z-index:1;display:block;width:100%;height:100%}
.lila-call-phone{position:absolute;z-index:2;right:-5px;bottom:-2px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:3px solid #fff;border-radius:50%;background:#36b86b;font-size:17px;box-shadow:0 3px 10px #172b1d35;animation:lilaPhonePulse 1.1s ease-in-out infinite}
#scr-call-incoming .call-name{font-size:34px;color:#fff;letter-spacing:.2px}
#scr-call-incoming .call-sub{max-width:310px;color:rgba(255,255,255,.7);font-size:14px}
#scr-call-incoming .call-status-label{color:#b7f5cb;font-size:14px}
#scr-call-incoming .call-actions-row{padding-bottom:calc(28px + env(safe-area-inset-bottom))}
#scr-call-incoming .call-action-label{color:rgba(255,255,255,.82);font-size:12px}
#call-mic-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;visibility:visible!important;opacity:1!important;overflow:visible!important;min-width:48px!important;min-height:48px!important;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif!important;font-size:24px!important;line-height:1!important;text-indent:0!important;-webkit-text-fill-color:currentColor!important;color:#fff!important;-webkit-appearance:none!important;appearance:none!important}#call-mic-btn *{visibility:visible!important;opacity:1!important}#call-mic-btn svg{display:block!important;visibility:visible!important;opacity:1!important;max-width:1.4em!important;max-height:1.4em!important}#call-mic-btn:empty:before{content:"🎤";display:inline-block!important;visibility:visible!important;opacity:1!important;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif!important;font-size:24px!important;line-height:1!important}
/* Render the call controls as explicit native emoji glyphs, independent of button text font. */
.call-ctrl-btn,.call-mic-btn{font-size:0!important;-webkit-text-fill-color:transparent!important}
.call-ctrl-btn:before,.call-mic-btn:before{display:inline-block!important;visibility:visible!important;opacity:1!important;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif!important;font-size:24px!important;font-style:normal!important;font-weight:400!important;line-height:1!important;text-indent:0!important;-webkit-text-fill-color:initial!important;color:initial!important;white-space:nowrap!important}
#call-btn-mute:before{content:"🎤"!important}
#call-btn-mute.active-toggle:before{content:"🔇"!important}
#call-btn-hangup:before{content:"📞"!important}
#call-btn-speaker:before{content:"🔊"!important}
#call-mic-btn:before{content:"🎤"!important}
/* Translation control: standalone emoji icon, stable layout on iPhone Safari. */
.call-translate-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;min-height:40px!important;margin-top:10px!important;padding:8px 14px!important;border:1px solid var(--border)!important;border-radius:999px!important;background:var(--card,#fff)!important;color:var(--ink-soft,var(--ink,#322849))!important;font-family:inherit!important;font-size:12px!important;font-weight:600!important;line-height:1.25!important;white-space:nowrap!important;-webkit-appearance:none!important;appearance:none!important;overflow:visible!important}
.call-translate-btn:before{content:"🌐"!important;display:inline-block!important;flex:0 0 auto!important;visibility:visible!important;opacity:1!important;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif!important;font-size:17px!important;line-height:1!important;-webkit-text-fill-color:initial!important;color:initial!important}
.call-translate-btn:active{transform:scale(.98)!important}
.call-translate-btn:focus-visible{outline:2px solid var(--ola,#d99b1f)!important;outline-offset:2px!important}
.call-ctrl-btn.hangup:before{content:"📞"!important}
@keyframes lilaIncomingRing{0%,100%{transform:rotate(0) translateY(0)}20%{transform:rotate(-7deg) translateY(-2px)}40%{transform:rotate(7deg) translateY(-2px)}60%{transform:rotate(-5deg) translateY(0)}80%{transform:rotate(5deg) translateY(0)}}
@keyframes lilaRingWave{0%{transform:scale(.88);opacity:.75}100%{transform:scale(1.3);opacity:0}}
@keyframes lilaPhonePulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
</style>"""
    html = html.replace("</head>", lila_style + "\n</head>", 1)

    # Keep Ola's speech button visible; previously it was hidden inline until
    # SpeechRecognition initialized, which fails in some iOS/webview browsers.
    hidden_mic = 'id="call-mic-btn" onclick="OlaCall.toggleMic()" aria-label="Hablar" style="display:none"'
    visible_mic = 'id="call-mic-btn" onclick="OlaCall.toggleMic()" aria-label="Hablar" style="display:inline-flex"'
    html = html.replace(hidden_mic, visible_mic, 1)
    mic_fallback = """<script id="alo-ola-mic-fallback">
(function(){
  const btn=document.getElementById('call-mic-btn');
  if(!btn) return;
  btn.style.display='inline-flex';
  btn.addEventListener('click',function(){
    if(window.SpeechRecognition||window.webkitSpeechRecognition) return;
    const caption=document.getElementById('call-live-caption');
    if(caption) caption.textContent='El reconocimiento de voz no está disponible en este navegador. Escribe tu respuesta abajo.';
    const input=document.getElementById('call-input');
    if(input) input.focus();
  });
})();
</script>"""
    html = html.replace("</body>", mic_fallback + "\n</body>", 1)

    # Use the same full-size yellow-footed Lila mascot on the real home screen.
    # This HTML is served by FastAPI; index.html branding patches do not reach it.
    home_lila = """<style id="alo-lila-home-mascot-style">
.alo-lila-home-mascot{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:clamp(180px,42vw,280px)!important;height:clamp(180px,42vw,280px)!important;min-width:clamp(180px,42vw,280px)!important;min-height:clamp(180px,42vw,280px)!important;flex:0 0 clamp(180px,42vw,280px)!important;vertical-align:middle!important;margin:0 12px 0 0!important}
.alo-lila-home-mascot svg{display:block!important;width:100%!important;height:100%!important;filter:drop-shadow(0 6px 12px rgba(112,75,190,.28))}
</style>
<script id="alo-lila-home-mascot">
(function(){
  var svg='<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 39 17 14 42 27Q60 17 78 27L103 14 99 42Q108 56 103 78Q96 103 60 108Q24 103 17 78Q12 56 21 39Z" fill="#9a76e8" stroke="#6543a5" stroke-width="3" stroke-linejoin="round"/><path d="M24 47Q39 28 54 48Q39 64 24 47ZM66 48Q81 28 96 47Q81 64 66 48Z" fill="#c9b5ff"/><ellipse cx="42" cy="52" rx="17" ry="19" fill="#fffaf2"/><ellipse cx="78" cy="52" rx="17" ry="19" fill="#fffaf2"/><circle cx="45" cy="53" r="7" fill="#38265c"/><circle cx="75" cy="53" r="7" fill="#38265c"/><circle cx="47" cy="50" r="2.5" fill="#fff"/><circle cx="77" cy="50" r="2.5" fill="#fff"/><path d="M54 65 60 72 66 65Z" fill="#ffc95d" stroke="#8e5d2b" stroke-width="1.5"/><path d="M33 82Q60 99 87 82Q79 104 60 104Q41 104 33 82Z" fill="#f8e8ff"/><path d="M25 82 15 88 30 93M95 82 105 88 90 93" fill="none" stroke="#6543a5" stroke-width="3" stroke-linecap="round"/><path d="M44 104 41 112M76 104 79 112" stroke="#ffc95d" stroke-width="4" stroke-linecap="round"/><path d="M37 30 29 22M83 30 91 22" stroke="#b89dff" stroke-width="4" stroke-linecap="round"/></svg>';
  function place(){
    var candidates=Array.prototype.slice.call(document.querySelectorAll('h1,h2,h3,h4,p,div,span,strong,label'));
    candidates=candidates.filter(function(el){
      if(el.closest('#scr-call-incoming')) return false;
      var text=(el.innerText||el.textContent||'').replace(/[⭐🌟★🦉🐦💜✨]/g,' ').replace(/\s+/g,' ').trim();
      return text.length<=100 && /hallo\s*,?\s*ich\s+bin\s+ola\b/i.test(text);
    });
    candidates.sort(function(a,b){return (a.innerText||a.textContent||'').trim().length-(b.innerText||b.textContent||'').trim().length});
    var target=candidates[0];
    if(!target) return;
    var scope=target.parentElement||target;
    scope.querySelectorAll('.alo-lila-brand-icon,.alo-lila-brand-large,.alo-lila-ola-icon,.alo-owl-art,.alo-owl-home-icon').forEach(function(old){old.remove()});
    if(target.querySelector('.alo-lila-home-mascot')) return;
    var el=document.createElement('span');
    el.className='alo-lila-home-mascot';
    el.setAttribute('role','img');
    el.setAttribute('aria-label','Lila, búho morado con patas amarillas');
    el.innerHTML=svg;
    target.insertBefore(el,target.firstChild);
  }
  place();
  var observer=new MutationObserver(function(){place()});
  observer.observe(document.body,{childList:true,subtree:true});
})();
</script>"""
    html = html.replace("</body>", home_lila + "\n</body>", 1)
    return html

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


@app.get("/lila-runtime.js")
def lila_runtime_script(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "lila-runtime.js", media_type="application/javascript")


@app.get("/ui-bugfix.js")
def ui_bugfix_script(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "ui-bugfix.js", media_type="application/javascript; charset=utf-8")


@app.get("/lernreise.js")
def lernreise_script(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "lernreise.js", media_type="application/javascript")


@app.get("/ruta-aprendizaje.html")
def lernreise_page(request: Request):
    if not _authed(request):
        return HTMLResponse(LOGIN_HTML, status_code=401)
    return FileResponse(APP_DIR / "ruta-aprendizaje.html", media_type="text/html; charset=utf-8")


@app.get("/lernreise.js")
def lernreise_script(request: Request):
    if not _authed(request):
        return JSONResponse({"error": "unauthorized"}, status_code=401)
    return FileResponse(APP_DIR / "lernreise.js", media_type="application/javascript")


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
    explanation = str(body.get("explanation", ""))[:500]
    if not correct_answer:
        return JSONResponse({"error": "empty"}, status_code=400)
    lang = "en" if body.get("lang") == "en" else "es"
    try:
        text = _ask_tutor(question, correct_answer, explanation, lang)
        return {"text": text}
    except Exception:  # noqa: BLE001 — el cliente cae a "IA no disponible"
        return JSONResponse({"error": "tutor-failed"}, status_code=503)


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
    "einen Kaffee für ein Teammeeting", "ein allergenarmes Gebäck nach Rückfrage",
    "eine Reservierung für vier Personen",
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
    "fragt nach einem Beleg für die Spesenabrechnung",
    "möchte die Zutaten und mögliche Kreuzkontakte geklärt haben",
    "meldet einen Fehler auf der Quittung und bittet um Prüfung",
]


def _random_scenario() -> dict:
    return {
        "mood": random.choice(SERVICE_MOODS)["key"],
        "order": random.choice(SERVICE_ORDERS),
        "diet": random.choice(SERVICE_DIETS)["key"],
        "extra": random.choice(SERVICE_EXTRAS),
    }


def _service_system_prompt(scenario: dict, lang: str = "es") -> str:
    mood = next(m["de"] for m in SERVICE_MOODS if m["key"] == scenario.get("mood"))
    diet = next(d["de"] for d in SERVICE_DIETS if d["key"] == scenario.get("diet"))
    sup = _support(lang)
    return (
        "Eres un/a cliente en un café/restaurante en Suiza. Hablas SOLO alemán, "
        "nivel de vocabulario A2-B2 (frases claras, según la situación). El usuario es el/la "
        f"camarero/a que te atiende. Tu personalidad ahora: {mood}. "
        f"Tu pedido base: {scenario.get('order','')}. "
        "Restricción alimentaria (mencionala SOLO si es relevante para lo que "
        "pedís, por ejemplo preguntando si un plato la respeta — no la anuncies "
        f"de entrada sin motivo): {diet}. "
        f"Detalle adicional de la situación: {scenario.get('extra','')}. "
        "Si hay alergias, nunca garantices la seguridad del producto sin comprobar "
        "ingredientes y posible contacto cruzado con la cocina. "
        "NUNCA salgas de personaje, nunca actúes como profesor/a ni corrijas al "
        "camarero/a vos mismo dentro de tu línea de cliente — solo respondé como "
        "cliente. Cuando la conversación llegue a un final natural (pediste la "
        "cuenta, te despediste, o el pedido quedó cerrado), agregá el marcador "
        "[ENDE] al final de tu línea DE.\n"
        "Responde SIEMPRE en exactamente este formato, sin nada más:\n"
        "DE: <tu línea en alemán, como cliente>\n"
        f"ES: <{sup['trans'].replace('tu respuesta', 'tu línea')}>\n"
        "TIPP: <SOLO si el camarero/a cometió un error de alemán importante en su "
        f"último mensaje, {sup['tip']}; si no hubo error o es "
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
    body = {}
    try:
        body = await request.json()
    except Exception:  # noqa: BLE001 — body vacío/no-JSON permitido
        pass
    lang = "en" if body.get("lang") == "en" else "es"
    scenario = _random_scenario()
    system = _service_system_prompt(scenario, lang)
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
    lang = "en" if body.get("lang") == "en" else "es"
    system = _service_system_prompt(scenario, lang)
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
    lang = "en" if body.get("lang") == "en" else "es"
    sup = _support(lang)
    system = (
        "Eres un asistente que ayuda a un/a estudiante de alemán (camarero/a en "
        "un café suizo) que no sabe qué responder. Da EXACTAMENTE 3 frases cortas "
        "en alemán, típicas de servicio de mesa, apropiadas para responder a lo "
        "que el cliente acaba de decir. Nivel A2-B1, simples y naturales."
    )
    user_content = (
        f'El cliente acaba de decir: "{last_client_line}"\n\n'
        "Dame 3 opciones de respuesta en este formato exacto:\n"
        f"1. <frase en alemán> | <traducción al {sup['name']}>\n"
        f"2. <frase en alemán> | <traducción al {sup['name']}>\n"
        f"3. <frase en alemán> | <traducción al {sup['name']}>"
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