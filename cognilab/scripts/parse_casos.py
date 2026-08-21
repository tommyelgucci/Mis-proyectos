#!/usr/bin/env python3
"""
CogniLab — Parser de casos de estudio AI-103.

Lee los archivos content/casos/*.md y genera
frontend/src/data/caseStudies.json: bloques de "estudio de caso" al estilo
del examen real (escenario largo + preguntas fijas en orden, sin volver
atrás), a diferencia de las preguntas sueltas del banco.

Uso:  python3 scripts/parse_casos.py
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CASOS_DIR = ROOT / "content" / "casos"
OUT_FILE = ROOT / "frontend" / "src" / "data" / "caseStudies.json"

CHECK = "✅"

FENCE_RE = re.compile(r"```[a-zA-Z0-9_-]*\n.*?```", re.DOTALL)

HEADER_RE = re.compile(
    r"^# CASO DE ESTUDIO \d+ — (.+?)\s*\n"
    r"## Domain: (.+?)\s*\n"
    r"## Icon: (.+?)\s*\n\n"
    r"### ESCENARIO\n(.*?)\n---\n",
    re.MULTILINE | re.DOTALL,
)

QUESTION_RE = re.compile(
    r"^### (Q\d+)\s*\n"
    r"\*\*(.+?)\*\*\s*\n+"
    r"A\) (.+?)\n"
    r"B\) (.+?)\n"
    r"C\) (.+?)\n"
    r"D\) (.+?)\n+"
    r"\*\*Explicación:\*\* (.+?)(?=\n---|\n### |\Z)",
    re.MULTILINE | re.DOTALL,
)


def norm_prose(s: str) -> str:
    """Recorta espacios sueltos por línea, preservando los saltos de línea
    reales (necesarios para listas numeradas/viñetas del escenario) y los
    párrafos (línea en blanco), y deja los bloques ```código``` intactos."""
    s = s.strip()

    def clean_paragraph(t: str) -> str:
        paragraphs = re.split(r"\n\s*\n", t)
        cleaned = []
        for p in paragraphs:
            if not p.strip():
                continue
            lines = [re.sub(r"[ \t]+", " ", line).strip() for line in p.split("\n")]
            cleaned.append("\n".join(line for line in lines if line))
        return "\n\n".join(cleaned)

    def clean_code(t: str) -> str:
        return "\n".join(line.rstrip() for line in t.split("\n"))

    out = []
    pos = 0
    for m in FENCE_RE.finditer(s):
        out.append(clean_paragraph(s[pos:m.start()]))
        out.append(clean_code(m.group(0)))
        pos = m.end()
    out.append(clean_paragraph(s[pos:]))
    return unicodedata.normalize("NFC", "\n\n".join(x for x in out if x).strip())


def norm_flat(s: str) -> str:
    """Igual que norm_prose pero aplanado a una sola línea de prosa (para
    enunciados de pregunta y opciones), preservando bloques de código."""
    s = s.strip()

    def clean_flat(t: str) -> str:
        return re.sub(r"\s+", " ", t)

    def clean_code(t: str) -> str:
        return "\n".join(line.rstrip() for line in t.split("\n"))

    out = []
    pos = 0
    for m in FENCE_RE.finditer(s):
        out.append(clean_flat(s[pos:m.start()]))
        out.append(clean_code(m.group(0)))
        pos = m.end()
    out.append(clean_flat(s[pos:]))
    return unicodedata.normalize("NFC", "".join(out).strip())


def parse_casos():
    cases = []
    files = sorted(CASOS_DIR.glob("*.md"))
    if not files:
        sys.exit(f"No hay archivos .md en {CASOS_DIR}")

    for f in files:
        text = f.read_text(encoding="utf-8")
        header = HEADER_RE.search(text)
        if not header:
            print(f"  ERROR {f.name}: no se encontró el encabezado esperado (# CASO.../## Domain/## Icon/### ESCENARIO), se omite")
            continue

        title, domain, icon, scenario_raw = header.groups()
        case_id = f.stem.split("_")[0]  # "CASO01_CONTOSO_LEGAL.md" -> "CASO01"

        body = text[header.end():]
        matches = QUESTION_RE.findall(body)
        n_headers = len(re.findall(r"^### Q\d+", body, re.MULTILINE))
        if len(matches) != n_headers:
            print(f"  AVISO {f.name}: {n_headers} headers pero {len(matches)} parseadas")

        questions = []
        for qnum, statement, a, b, c, d, expl in matches:
            options = {"A": a, "B": b, "C": c, "D": d}
            correct = None
            clean_options = {}
            for letter, opt in options.items():
                opt = opt.strip()
                if CHECK in opt:
                    correct = letter
                    opt = opt.replace(CHECK, "").strip()
                clean_options[letter] = norm_flat(opt)
            if correct is None:
                print(f"  ERROR {f.name} {qnum}: sin respuesta marcada, se omite")
                continue

            questions.append({
                "id": f"{case_id}-{qnum}",
                "question": norm_flat(statement),
                "options": clean_options,
                "correct": correct,
                "explanation": norm_flat(expl),
            })

        if not questions:
            print(f"  ERROR {f.name}: sin preguntas válidas, se omite el caso")
            continue

        cases.append({
            "id": case_id,
            "title": title.strip(),
            "domain": domain.strip(),
            "icon": icon.strip(),
            "scenario": norm_prose(scenario_raw),
            "questions": questions,
        })
        print(f"  {f.name}: {len(questions)} preguntas [{case_id} · {domain.strip()}]")

    return cases


def main():
    print("Parseando casos de estudio...")
    cases = parse_casos()
    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUT_FILE.write_text(json.dumps(cases, ensure_ascii=False, indent=2), encoding="utf-8")
    total_q = sum(len(c["questions"]) for c in cases)
    print(f"\ncaseStudies.json: {len(cases)} casos, {total_q} preguntas totales")


if __name__ == "__main__":
    main()
