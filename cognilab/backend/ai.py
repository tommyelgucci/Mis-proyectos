"""Tutor IA de CogniLab — cliente de HF Inference API (router OpenAI-compatible).

Si no hay HF_TOKEN configurado, los endpoints devuelven None y la app
sigue funcionando en modos offline (degradación elegante).
"""
import json
import os
import re
from pathlib import Path

import httpx

HF_TOKEN = os.environ.get("HF_TOKEN", "")
# Modelo del free tier de HF Inference Providers; se puede cambiar por secret.
AI_MODEL = os.environ.get("AI_MODEL", "meta-llama/Llama-3.1-8B-Instruct")
API_URL = "https://router.huggingface.co/v1/chat/completions"

# El modelo del Tutor es un LLM genérico sin acceso al banco de preguntas de
# CogniLab, así que por sí solo no puede explicar un ejercicio de código
# concreto del banco (solo lo que "sabe" de entrenamiento). Para que sí
# pueda, el Dockerfile copia questions.json al lado de este archivo y aquí
# se hace una búsqueda simple por palabras clave sobre el último mensaje del
# usuario, inyectando las preguntas más relevantes (con su código y
# explicación real) como contexto antes de llamar al modelo.
QUESTIONS_FILE = Path(os.environ.get("QUESTIONS_FILE") or Path(__file__).resolve().parent / "questions.json")

try:
    _QUESTIONS = json.loads(QUESTIONS_FILE.read_text(encoding="utf-8")) if QUESTIONS_FILE.exists() else []
except Exception:
    _QUESTIONS = []

_STOPWORDS = {
    "de", "la", "el", "en", "que", "y", "a", "los", "las", "un", "una", "para",
    "con", "es", "del", "por", "se", "su", "al", "como", "qué", "cómo",
    "cual", "cuales", "este", "esta", "estos", "estas", "eso", "esa", "the",
    "and", "for", "not", "you", "sobre", "más", "pero", "sus", "les",
}
_WORD_RE = re.compile(r"[a-záéíóúñü0-9_]{3,}", re.IGNORECASE)


def _tokens(text: str) -> set[str]:
    return {t.lower() for t in _WORD_RE.findall(text)} - _STOPWORDS


def _search_questions(query: str, top_n: int = 2) -> list[dict]:
    q_tokens = _tokens(query)
    if not _QUESTIONS or not q_tokens:
        return []
    scored = []
    for q in _QUESTIONS:
        hay_tokens = _tokens(f"{q['question']} {q['explanation']}")
        score = len(q_tokens & hay_tokens)
        if q.get("origQ", "").lower() in query.lower():
            score += 10
        if score > 0:
            scored.append((score, q))
    scored.sort(key=lambda item: -item[0])
    return [q for _, q in scored[:top_n]]


def _format_context(matches: list[dict]) -> str:
    blocks = []
    for q in matches:
        correct = q["options"][q["correct"]]
        blocks.append(
            f"[{q.get('origQ', '')}] {q['question']}\n"
            f"Respuesta correcta: {q['correct']}) {correct}\n"
            f"Explicación: {q['explanation']}"
        )
    return "\n\n---\n\n".join(blocks)

SYSTEM_PROMPT = (
    "Eres el Tutor de CogniLab, experto en el examen Microsoft AI-103 "
    "(Azure AI Engineer: Responses API, RAG, Fine-Tuning, Responsible AI de "
    "Microsoft, y el ecosistema de herramientas y agentes de Azure AI Foundry: "
    "function calling/FunctionTool, AzureFunctionTool, OpenApiTool, MCP "
    "(FastMCP, MCPTool, aprobación de herramientas), Foundry IQ y bases de "
    "conocimiento RAG administradas, integración con Microsoft 365/Work IQ, "
    "flujos de trabajo de agentes (Agent Workflows, Power Fx), Microsoft "
    "Agent Framework, orquestación multiagente (secuencial, concurrente, "
    "handoff, chat en grupo, magentic), el protocolo Agent-to-Agent (A2A), y "
    "desarrollo de agentes con el portal de Foundry y VS Code). Respondes "
    "SIEMPRE en español, de forma clara y breve (máximo ~150 palabras), con "
    "analogías memorables cuando ayuden. Si la pregunta no es del temario, "
    "redirige amablemente al estudio."
)


def available() -> bool:
    return bool(HF_TOKEN)


async def chat(messages: list[dict]) -> str | None:
    """Envía la conversación al modelo. Devuelve None si no hay token o falla."""
    if not HF_TOKEN:
        return None
    system_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    last_user = next((m["content"] for m in reversed(messages) if m.get("role") == "user"), "")
    matches = _search_questions(last_user)
    if matches:
        system_messages.append({
            "role": "system",
            "content": (
                "Preguntas relacionadas del banco de CogniLab (con su código real y "
                "explicación oficial) que probablemente sean justo lo que el usuario está "
                "preguntando. Úsalas como referencia para responder con precisión en vez de "
                "quedarte en generalidades, pero no las cites literalmente ni menciones que "
                "vienen de un \"banco\":\n\n" + _format_context(matches)
            ),
        })
    payload = {
        "model": AI_MODEL,
        "messages": [*system_messages, *messages],
        "max_tokens": 400,
        "temperature": 0.7,
    }
    try:
        async with httpx.AsyncClient(timeout=45) as client:
            res = await client.post(
                API_URL,
                headers={"Authorization": f"Bearer {HF_TOKEN}"},
                json=payload,
            )
            res.raise_for_status()
            return res.json()["choices"][0]["message"]["content"]
    except Exception:
        return None


async def explain(question: str, correct: str, explanation: str) -> str | None:
    prompt = (
        f"Fallé esta pregunta del examen AI-103:\n\n«{question}»\n\n"
        f"La respuesta correcta es: {correct}\n"
        f"La explicación oficial dice: {explanation}\n\n"
        "Explícamela de otra forma, con una analogía sencilla y un truco "
        "para no volver a fallarla."
    )
    return await chat([{"role": "user", "content": prompt}])
