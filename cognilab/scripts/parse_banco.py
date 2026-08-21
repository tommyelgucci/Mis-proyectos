#!/usr/bin/env python3
"""
CogniLab — Parser del banco de preguntas AI-103.

Lee los archivos BANCO*.md de content/banco/ y AI103_FINAL_100_QUESTIONS.md,
y genera:
  - frontend/src/data/questions.json   (preguntas tipo examen, 4 opciones)
  - frontend/src/data/quickCards.json  (100 preguntas rápidas P/R para flashcards)

Uso:  python3 scripts/parse_banco.py
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BANCO_DIR = ROOT / "content" / "banco"
QUICK_FILE = ROOT / "content" / "AI103_FINAL_100_QUESTIONS.md"
EXTRA_QUICK_FILE = ROOT / "content" / "AI103_EXTRA_FLASHCARDS.md"
OUT_DIR = ROOT / "frontend" / "src" / "data"

# Domain inferido por archivo de origen (tabla del handoff)
DOMAIN_BY_FILE = [
    ("PARTED1EXT", "Domain 1"),
    ("PARTED3EXT", "Domain 3"),
    ("PARTED4EXT", "Domain 4"),
    ("PARTE10", "Domain 2"),
    ("PARTE11", "Domain 2"),
    ("PARTE12", "Domain 2"),
    ("PARTE13", "Domain 2"),
    ("PARTE14", "Domain 2"),
    ("PARTE15", "Domain 2"),
    ("PARTE16", "Domain 2"),
    ("PARTE17", "Domain 2"),
    ("PARTE18", "Domain 1"),
    ("PARTE19", "Domain 3"),
    ("PARTE20", "Domain 4"),
    ("PARTE21", "Domain 1 (real)"),
    ("PARTE22", "Domain 5"),
    ("PARTE23", "Domain 3 (real)"),
    ("PARTE24", "Domain 4 (real)"),
    ("PARTE4", "Domain 1"),
    ("PARTE5", "Domain 2"),
    ("PARTE6B", "Domain 2"),
    ("PARTE6C", "Domain 2"),
    ("PARTE6D", "Domain 2"),
    ("PARTE6", "Domain 2"),
    ("PARTE7", "Domain 3"),
    ("PARTE8", "Domain 4"),
    ("PARTE9", "Cross"),
]

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

CHECK = "✅"  # ✅


FENCE_RE = re.compile(r"```[a-zA-Z0-9_-]*\n.*?```", re.DOTALL)


def norm_text(s: str) -> str:
    """Colapsa espacios en blanco, pero preserva los saltos de línea dentro de
    bloques ```código``` de varias líneas (para preguntas con código real del SDK)."""
    s = s.strip()

    def clean_prose(t: str) -> str:
        return re.sub(r"\s+", " ", t)

    def clean_code(t: str) -> str:
        return "\n".join(line.rstrip() for line in t.split("\n"))

    out = []
    pos = 0
    for m in FENCE_RE.finditer(s):
        out.append(clean_prose(s[pos:m.start()]))
        out.append(clean_code(m.group(0)))
        pos = m.end()
    out.append(clean_prose(s[pos:]))
    return unicodedata.normalize("NFC", "".join(out).strip())


def domain_for(filename: str) -> str:
    for key, domain in DOMAIN_BY_FILE:
        if key in filename.replace(" ", "").replace("_", ""):
            return domain
    return "Cross"


def parse_banco():
    questions = []
    seen_texts = set()
    dupes = 0
    next_id = 1
    files = sorted(BANCO_DIR.glob("*.md"))
    if not files:
        sys.exit(f"No hay archivos .md en {BANCO_DIR}")

    for f in files:
        text = f.read_text(encoding="utf-8")
        domain = domain_for(f.name)
        matches = QUESTION_RE.findall(text)
        n_headers = len(re.findall(r"^### Q\d+", text, re.MULTILINE))
        if len(matches) != n_headers:
            print(f"  AVISO {f.name}: {n_headers} headers pero {len(matches)} parseadas")

        for qnum, statement, a, b, c, d, expl in matches:
            options = {"A": a, "B": b, "C": c, "D": d}
            correct = None
            clean_options = {}
            for letter, opt in options.items():
                opt = opt.strip()
                if CHECK in opt:
                    correct = letter
                    opt = opt.replace(CHECK, "").strip()
                clean_options[letter] = norm_text(opt)
            if correct is None:
                print(f"  ERROR {f.name} {qnum}: sin respuesta marcada, se omite")
                continue

            statement = norm_text(statement)
            is_trap = statement.upper().startswith("TRAMPA")

            # Dedup por texto de enunciado (solapamiento Partes 8/9)
            key = statement.lower()
            if key in seen_texts:
                dupes += 1
                continue
            seen_texts.add(key)

            questions.append({
                "id": next_id,
                "origQ": qnum,
                "domain": domain,
                "question": statement,
                "options": clean_options,
                "correct": correct,
                "explanation": norm_text(expl),
                "isTrap": is_trap,
                "sourceFile": f.name,
            })
            next_id += 1
        print(f"  {f.name}: {len(matches)} preguntas [{domain}]")

    print(f"Duplicados omitidos: {dupes}")
    return questions


QUICK_RE = re.compile(
    r"^\*\*Q(\d+):\*\* (.+?)\n\*\*A:\*\* (.+?)(?=\n\n|\n\*\*Q|\Z)",
    re.MULTILINE | re.DOTALL,
)

QUICK_DOMAIN_RANGES = [
    (1, 20, "Domain 1"),
    (21, 45, "Domain 2"),
    (46, 65, "Domain 3"),
    (66, 90, "Domain 4"),
    (91, 100, "Cross"),
]


def parse_quick():
    if not QUICK_FILE.exists():
        print(f"AVISO: no existe {QUICK_FILE}, se omite quickCards")
        return []
    text = QUICK_FILE.read_text(encoding="utf-8")
    cards = []
    for num, q, a in QUICK_RE.findall(text):
        n = int(num)
        domain = next(d for lo, hi, d in QUICK_DOMAIN_RANGES if lo <= n <= hi)
        cards.append({
            "id": n,
            "domain": domain,
            "front": norm_text(q),
            "back": norm_text(a),
        })
    return cards


QUICK_SECTION_RE = re.compile(r"^## (.+?)\s*$", re.MULTILINE)


def parse_extra_quick():
    """Tarjetas adicionales agrupadas por dominio con encabezados '## Domain N'
    (a diferencia de AI103_FINAL_100_QUESTIONS.md, que usa rangos de ID fijos)."""
    if not EXTRA_QUICK_FILE.exists():
        return []
    text = EXTRA_QUICK_FILE.read_text(encoding="utf-8")
    sections = list(QUICK_SECTION_RE.finditer(text))
    cards = []
    for i, m in enumerate(sections):
        domain = m.group(1)
        start = m.end()
        end = sections[i + 1].start() if i + 1 < len(sections) else len(text)
        for num, q, a in QUICK_RE.findall(text[start:end]):
            cards.append({
                "id": int(num),
                "domain": domain,
                "front": norm_text(q),
                "back": norm_text(a),
            })
    return cards


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    print("Parseando bancos de preguntas...")
    questions = parse_banco()

    # Validaciones
    assert all(q["correct"] in "ABCD" for q in questions)
    assert all(q["explanation"] for q in questions)
    assert all(len(q["options"]) == 4 for q in questions)
    by_domain = {}
    for q in questions:
        by_domain[q["domain"]] = by_domain.get(q["domain"], 0) + 1
    traps = sum(1 for q in questions if q["isTrap"])

    (OUT_DIR / "questions.json").write_text(
        json.dumps(questions, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nquestions.json: {len(questions)} preguntas")
    for d in sorted(by_domain):
        print(f"  {d}: {by_domain[d]}")
    print(f"  Trampas marcadas: {traps}")

    print("\nParseando preguntas rápidas...")
    quick = parse_quick()
    extra_quick = parse_extra_quick()
    ids = [c["id"] for c in quick] + [c["id"] for c in extra_quick]
    assert len(ids) == len(set(ids)), "IDs de flashcards duplicados entre archivos"
    quick += extra_quick
    (OUT_DIR / "quickCards.json").write_text(
        json.dumps(quick, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"quickCards.json: {len(quick)} tarjetas ({len(extra_quick)} nuevas de hoy)")


if __name__ == "__main__":
    main()
