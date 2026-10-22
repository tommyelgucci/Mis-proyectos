#!/usr/bin/env python3
"""Genera kontext-extra.js a partir de kontext-b2.html y kontext-c1.html.

Extrae del objeto APP de cada curso:
  - cards: tarjetas de vocabulario {de, es, ex}
  - gaps:  preguntas de opción múltiple con hueco (___) para el simulacro de Sprachbausteine

Uso: python3 tools/build_kontext_extra.py   (desde alodeutsch/)
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAX_GAPS = 90


def load_app(path: Path) -> dict:
    s = path.read_text(encoding="utf-8")
    i = s.index("const APP=") + len("const APP=")
    app, _ = json.JSONDecoder().raw_decode(s[i:])
    return app


def questions(app: dict):
    for l in app["lessons"]:
        yield from l.get("qs") or []
        for g in l.get("ab") or []:
            yield from g.get("qs") or []
    for m in app.get("missions") or []:
        yield from m.get("qs") or []


def clean(s) -> str:
    return re.sub(r"<[^>]+>", "", str(s)).strip()


def build(level: str) -> dict:
    app = load_app(ROOT / f"kontext-{level}.html")
    cards = []
    for c in app.get("cards") or []:
        de, es = clean(c.get("de", "")), clean(c.get("es", ""))
        if de and es:
            cards.append({"de": de, "es": es, "ex": clean(c.get("ex", ""))})
    gaps, seen = [], set()
    for q in questions(app):
        if q.get("t") not in (None, "mc") or not q.get("o") or "___" not in str(q.get("q", "")):
            continue
        if not 2 <= len(q["o"]) <= 4 or not isinstance(q.get("a"), int) or not 0 <= q["a"] < len(q["o"]):
            continue
        key = clean(q["q"])
        if key in seen:
            continue
        seen.add(key)
        gaps.append({"q": key, "o": [clean(o) for o in q["o"]], "a": q["a"], "e": clean(q.get("e", ""))})
    if len(gaps) > MAX_GAPS:  # muestreo uniforme y determinista
        step = len(gaps) / MAX_GAPS
        gaps = [gaps[int(i * step)] for i in range(MAX_GAPS)]
    return {"cards": cards, "gaps": gaps}


def main():
    data = {lv: build(lv) for lv in ("b2", "c1")}
    out = {
        "cards": {lv: d["cards"] for lv, d in data.items()},
        "gaps": {lv: d["gaps"] for lv, d in data.items()},
    }
    js = (
        "/* Generado por tools/build_kontext_extra.py a partir de kontext-b2.html y kontext-c1.html. No editar a mano. */\n"
        "window.KONTEXT_EXTRA=" + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n"
    )
    (ROOT / "kontext-extra.js").write_text(js, encoding="utf-8")
    print({lv: {"cards": len(d["cards"]), "gaps": len(d["gaps"])} for lv, d in data.items()}, len(js), "bytes")


if __name__ == "__main__":
    main()
