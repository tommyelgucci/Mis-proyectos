#!/usr/bin/env python3
"""Genera el camino principal C1 de Lernreise (40 misiones x 5 ejercicios) en lernreise.js
y sincroniza las copias en línea de alodeutsch.html y alodeutsch-offline.html.

Uso: python3 tools/build_c1_core.py   (desde alodeutsch/). Es idempotente.
"""
import json
import re
from pathlib import Path

from c1_core_data import C

ROOT = Path(__file__).resolve().parent.parent
JS = ROOT / "lernreise.js"
BEGIN = "// C1 CORE PATH: 40 misiones con vocabulario, gramática, dos ejercicios de Hören y Sprechen.\n"
END_MARK = "/* END C1 CORE PATH */\n"
MARKER_RE = re.compile(r'<script id="alo-lernreise-runtime-20261019">\n?')

OLD_LISTEN = "function listenText(text){try{if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text));u.lang='de-CH';u.rate=.82;window.speechSynthesis.speak(u)}catch(e){}}"
NEW_LISTEN = ("function listenText(text){try{if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();"
              "const parts=String(text).replace(/\\s+/g,' ').match(/[^.!?;:]+[.!?;:]*\\s*/g)||[String(text)],ch=[];"
              "parts.forEach(p=>{const l=ch.length-1;if(l>=0&&ch[l].length+p.length<180)ch[l]+=p;else ch.push(p)});"
              "ch.forEach(c=>{const u=new SpeechSynthesisUtterance(c.trim());u.lang='de-CH';u.rate=.82;window.speechSynthesis.speak(u)})}catch(e){}}")


def rot(correct, wrong, k):
    pos = k % 3
    o = list(wrong)
    o.insert(pos, correct)
    return o, pos


def build(data=None, level="C1", start=1):
    out = []
    for n, (title, vocab, gram, l1, l2, sp) in enumerate(data or C, start):
        qs = []
        de, es, d = vocab
        o, a = rot(es, d, n)
        qs.append([f"Wortschatz: ¿qué significa «{de}»?", o, a, f"«{de}» = {es}.", "Piensa en el contexto: ¿qué situación describe esta expresión?"])
        q, opts, expl = gram
        o, a = rot(opts[0], opts[1:], n + 1)
        qs.append([q, o, a, expl, "Fíjate en la posición del verbo, el caso y la preposición."])
        for j, (text, qq, opts, expl) in enumerate((l1, l2)):
            o, a = rot(opts[0], opts[1:], n + 2 + j)
            qs.append([f"🎧 Escucha el texto y responde: {qq}", o, a, f"Texto: «{text}» {expl}", "Puedes volver a escuchar el texto con el botón antes de contestar.", "listen", text])
        sen, meaning = sp
        qs.append([f"🎙️ Sprechen: di esta frase en voz alta: «{sen}»", [], 0, f"Modelo: «{sen}». Significado: {meaning}", "Presta atención a las pausas, el acento y la pronunciación.", "speak", sen])
        out.append({"title": f"{level} · {n:02d} · {title}", "qs": qs})
    return out


def patch_js(s):
    data = json.dumps(build(), ensure_ascii=False)
    block = (BEGIN +
             f"const C1_CORE_MISSIONS={data};\n"
             "(function addC1CorePath(){const c1=worlds.find(w=>w.level==='C1');if(!c1)return;const seen=new Set(c1.missions.map(m=>m.title));C1_CORE_MISSIONS.forEach(m=>{if(!seen.has(m.title))c1.missions.push(m)});})();\n" + END_MARK)
    if BEGIN in s:
        i = s.index(BEGIN)
        j = s.index(END_MARK, i) + len(END_MARK)
        s = s[:i] + block + s[j:]
    else:
        anchor = "(function addB2CorePath(){"
        i = s.index(anchor)
        j = s.index("\n", i) + 1
        s = s[:j] + block + s[j:]
    if OLD_LISTEN in s:
        s = s.replace(OLD_LISTEN, NEW_LISTEN)
    elif NEW_LISTEN not in s:
        raise SystemExit("listenText no encontrado")
    return s


def sync_inline(js):
    for name in ("alodeutsch.html", "alodeutsch-offline.html"):
        p = ROOT / name
        t = p.read_text(encoding="utf-8")
        m = MARKER_RE.search(t)
        j = t.index("</script>", m.end())
        t = t[:m.end()] + js + "\n" + t[j:]
        p.write_text(t, encoding="utf-8")


def main():
    old = JS.read_text(encoding="utf-8")
    new = patch_js(old)
    JS.write_text(new, encoding="utf-8")
    sync_inline(new)
    print("lernreise.js:", len(old), "->", len(new))


if __name__ == "__main__":
    main()
