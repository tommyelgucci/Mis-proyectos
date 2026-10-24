#!/usr/bin/env python3
"""Amplía el camino B2 de Lernreise con 23 misiones (41-63) con dos ejercicios de Hören cada una
y sincroniza las copias en línea de alodeutsch.html y alodeutsch-offline.html.

Uso: python3 tools/build_b2_hoeren.py   (desde alodeutsch/). Es idempotente.
"""
import json

import build_c1_core as base
from b2_hoeren_data import C as B2

BEGIN = "// B2 HÖREN PATH: misiones 41-63 con dos ejercicios de Hören por misión.\n"
END_MARK = "/* END B2 HOEREN PATH */\n"


def patch(s):
    data = json.dumps(base.build(B2, "B2", 41), ensure_ascii=False)
    block = (BEGIN + f"const B2_HOEREN_MISSIONS={data};\n"
             "(function addB2HoerenPath(){const b2=worlds.find(w=>w.level==='B2');if(!b2)return;const seen=new Set(b2.missions.map(m=>m.title));B2_HOEREN_MISSIONS.forEach(m=>{if(!seen.has(m.title))b2.missions.push(m)});})();\n" + END_MARK)
    if BEGIN in s:
        i = s.index(BEGIN)
        j = s.index(END_MARK, i) + len(END_MARK)
        return s[:i] + block + s[j:]
    anchor = base.END_MARK
    i = s.index(anchor) + len(anchor)
    return s[:i] + block + s[i:]


def main():
    old = base.JS.read_text(encoding="utf-8")
    new = patch(old)
    base.JS.write_text(new, encoding="utf-8")
    base.sync_inline(new)
    print("lernreise.js:", len(old), "->", len(new))


if __name__ == "__main__":
    main()
