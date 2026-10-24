#!/usr/bin/env python3
"""Añade las misiones de Hören (Hörtexte largos) a kontext-c1.html y reproduce textos largos por frases.

Uso: python3 tools/build_c1_hoeren.py   (desde alodeutsch/). Es idempotente.
"""
import html
import json
import re
from pathlib import Path

from c1_hoeren_data import H, RFN

ROOT = Path(__file__).resolve().parent.parent
PAGE = ROOT / "kontext-c1.html"

OLD_SAY = "const say=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='de-DE';u.rate=.9;speechSynthesis.speak(u)}catch(e){}};"
NEW_SAY = ("const say=t=>{try{speechSynthesis.cancel();const parts=String(t).replace(/\\s+/g,' ').match(/[^.!?;:]+[.!?;:]*\\s*/g)||[String(t)],ch=[];"
           "parts.forEach(p=>{const l=ch.length-1;if(l>=0&&ch[l].length+p.length<180)ch[l]+=p;else ch.push(p)});"
           "ch.forEach(c=>{const u=new SpeechSynthesisUtterance(c.trim());u.lang='de-DE';u.rate=.9;speechSynthesis.speak(u)})}catch(e){}};")


def esc(s):
    return html.escape(s, quote=True)


def mission(n, idx, title, text, qs, tf):
    qlist = []
    for i, (q, ok, w1, w2, e) in enumerate(qs):
        opts = [w1, w2]
        pos = (i + idx) % 3
        opts.insert(pos, ok)
        qlist.append({"q": q, "o": opts, "a": pos, "e": e})
    stmt, ans, expl = tf
    qlist.append({"q": f"Richtig oder falsch? „{stmt}“", "o": list(RFN), "a": ans, "e": expl})
    body = (
        f'<p><b>Hören:</b> escucha el texto (puedes repetirlo) y responde sin mirar la transcripción.</p>'
        f'<p><button class="btn" data-say="{esc(text)}">▶ Hörtext abspielen</button></p>'
        f'<details><summary>Transkript (ábrelo después de escuchar)</summary><p lang="de">{esc(text)}</p></details>'
    )
    return {"t": f"C1 · {n:02d} · Hören: {title}", "qs": qlist, "text": body}


def main():
    s = PAGE.read_text(encoding="utf-8")
    i = s.index("const APP=") + len("const APP=")
    app, end = json.JSONDecoder().raw_decode(s[i:])
    app["missions"] = [m for m in app["missions"] if " · Hören: " not in m["t"]]
    start = len(app["missions"]) + 1
    for k, (title, text, qs, tf) in enumerate(H):
        app["missions"].append(mission(start + k, k, title, text, qs, tf))
    s = s[:i] + json.dumps(app, ensure_ascii=False) + s[i + end:]
    if OLD_SAY in s:
        s = s.replace(OLD_SAY, NEW_SAY)
    elif NEW_SAY not in s:
        raise SystemExit("say() no encontrado")
    PAGE.write_text(s, encoding="utf-8")
    print("misiones:", len(app["missions"]))


if __name__ == "__main__":
    main()
