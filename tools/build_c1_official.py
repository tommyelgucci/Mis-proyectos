#!/usr/bin/env python3
"""Integra los tests oficiales Test C1 (alodeutsch/c1-official-*.js) en el entrenador
alodeutsch/alodeutsch-c1-kontext.html. Idempotente: reemplaza lo ya insertado."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "alodeutsch"
HTML = ROOT / "alodeutsch-c1-kontext.html"
DATA = sorted(ROOT.glob("c1-official-u*.js"))
RENDER = ROOT / "c1-official-render.js"

CSS = """/*C1-OFFICIAL-CSS*/
.off-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.off-tabs button{padding:8px 12px}
.off-text{background:#f8fafc;border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin:12px 0;max-height:none}
.off-text p{margin:.6em 0}.off-para{margin:.8em 0}.off-para>b{display:inline-block;background:var(--navy);color:#fff;border-radius:6px;padding:0 8px;margin-bottom:4px}
.off-gap{display:inline-block;white-space:nowrap;background:#eaf0ff;border-radius:8px;padding:2px 6px;margin:1px 2px}.off-gap b{color:var(--blue)}
.off-sel,.off-in{font:inherit;border:1.5px solid var(--line);border-radius:8px;padding:5px 8px;background:#fff;color:var(--ink);max-width:100%}.off-in{min-width:220px;width:60%}
.off-q{padding:8px 0;border-bottom:1px dashed var(--line)}.off-q details{margin-top:6px}
.off-rad label{display:inline-block;margin:2px 12px 2px 0}.off-list p{margin:.35em 0}.off-ex{color:var(--muted);font-size:.95em}
.off-ok{color:var(--green);font-weight:800;margin-left:6px}.off-bad{color:var(--red);font-weight:800;margin-left:6px}
.off-score{font-size:1.1rem;margin:12px 0}.off-slide{border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin:10px 0;background:#fff}
.off-sol{background:#f1f8f4;border-radius:8px;padding:6px 10px;margin-top:6px}.off-self label{margin-right:8px}
.off-tab{border-collapse:collapse;width:100%;margin:10px 0}.off-tab th,.off-tab td{border:1px solid var(--line);padding:6px 10px;text-align:left}
/*C1-OFFICIAL-CSS-END*/"""

def main():
    h = HTML.read_text(encoding="utf-8")
    h = re.sub(r"/\*C1-OFFICIAL-CSS\*/.*?/\*C1-OFFICIAL-CSS-END\*/\n?", "", h, flags=re.S)
    h = re.sub(r"<!--C1-OFFICIAL-START-->.*?<!--C1-OFFICIAL-END-->\n?", "", h, flags=re.S)
    i = h.index("</style>")
    h = h[:i] + CSS + "\n" + h[i:]
    btn = """<button class="ghost" onclick="showView('official')">Offizielle Übungstests</button>"""
    if btn not in h:
        h = h.replace("""<button class="ghost" onclick="showView('writing')">Schreiben</button>""", btn + """<button class="ghost" onclick="showView('writing')">Schreiben</button>""", 1)
    h = h.replace("['course','test','writing','resources','progress'].forEach", "['course','test','official','writing','resources','progress'].forEach", 1)
    if "renderOfficialC1()" not in h:
        h = h.replace("if(view==='progress')renderProgress();", "if(view==='progress')renderProgress();if(view==='official'&&window.renderOfficialC1)renderOfficialC1();", 1)
    section = '<!--C1-OFFICIAL-START-->\n<section id="officialView" class="hidden"></section>\n<!--C1-OFFICIAL-END-->\n'
    h = h.replace('<section id="resourcesView"', section + '<section id="resourcesView"', 1)
    scripts = "<script>/*C1-OFFICIAL-JS*/\n" + "\n".join(p.read_text(encoding="utf-8") for p in DATA) + "\n" + RENDER.read_text(encoding="utf-8") + "\n</script>\n"
    h = re.sub(r"<script>/\*C1-OFFICIAL-JS\*/.*?</script>\n?", "", h, flags=re.S)
    j = h.rindex("</body>")
    h = h[:j] + scripts + h[j:]
    HTML.write_text(h, encoding="utf-8")
    print("OK", len(h), "bytes;", [p.name for p in DATA])

main()
