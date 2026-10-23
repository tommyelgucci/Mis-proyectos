#!/usr/bin/env python3
"""Integra los tests oficiales telc B2 (alodeutsch/b2-official-*.js) en alodeutsch/kontext-b2.html
como bloque de la Biblioteca telc. Idempotente."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "alodeutsch"
HTML = ROOT / "kontext-b2.html"
DATA = sorted(ROOT.glob("b2-official-u*.js")) + sorted(ROOT.glob("b2-official-m*.js"))
RENDER = ROOT / "b2-official-render.js"

CSS = """/*B2-OFFICIAL-CSS*/
.b2o-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.b2o-tabs button{margin:0!important}
.b2o-text,.b2o-info{background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin:10px 0}.b2o-text p{margin:.5em 0}.b2o-infos{display:grid;gap:8px}.b2o-info{margin:0;font-size:.95em}
.b2o-sel{font:inherit;max-width:100%;border:1.5px solid var(--line);border-radius:8px;padding:4px 6px;background:var(--paper);color:var(--ink)}
.b2o-gap{display:inline-block;background:var(--pril);border-radius:8px;padding:1px 6px;margin:1px 2px}.b2o-gap b{color:var(--prid)}
.b2o-q{padding:8px 0;border-bottom:1px dashed var(--line)}.b2o-rad label{display:block;margin:2px 0}.b2o-list p{margin:.3em 0}
.b2o-ok{color:var(--ok)}.b2o-bad{color:var(--bad)}.b2o-sol{color:var(--bad)}.b2o-score{font-size:1.1rem;margin:10px 0}
.b2o-box{display:flex;flex-wrap:wrap;gap:6px 14px;background:var(--bg);border:1px dashed var(--line);border-radius:10px;padding:8px 12px;margin:8px 0}
.b2o-tab{border-collapse:collapse;width:100%;margin:10px 0}.b2o-tab th,.b2o-tab td{border:1px solid var(--line);padding:6px 10px;text-align:left}
.b2o-act{margin:8px 0}
/*B2-OFFICIAL-CSS-END*/"""


def main():
    h = HTML.read_text(encoding="utf-8")
    h = re.sub(r"/\*B2-OFFICIAL-CSS\*/.*?/\*B2-OFFICIAL-CSS-END\*/\n?", "", h, flags=re.S)
    h = re.sub(r"<!--B2-OFFICIAL-START-->.*?<!--B2-OFFICIAL-END-->", "", h, flags=re.S)
    h = re.sub(r"<script>/\*B2-OFFICIAL-JS\*/.*?</script>\n?", "", h, flags=re.S)
    i = h.index("</style>")
    h = h[:i] + CSS + "\n" + h[i:]
    block = ('<!--B2-OFFICIAL-START--><details id="b2-official-tests"><summary>Offizielle Übungstests: Lesen, Sprachbausteine und Hören '
             'mit Lösungsschlüssel</summary><div class="lib-body"><div id="b2OfficialRoot"></div></div></details><!--B2-OFFICIAL-END-->')
    key = '<details id="anhang-b21">'
    assert h.count(key) == 1
    h = h.replace(key, block + key)
    scripts = "<script>/*B2-OFFICIAL-JS*/\n" + "\n".join(p.read_text(encoding="utf-8") for p in DATA) + "\n" + RENDER.read_text(encoding="utf-8") + "\n</script>\n"
    j = h.rindex("</body>")
    h = h[:j] + scripts + h[j:]
    HTML.write_text(h, encoding="utf-8")
    print("OK", len(h), "bytes;", [p.name for p in DATA])


main()
