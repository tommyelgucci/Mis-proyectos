"""Tutor IA de CogniLab — cliente de HF Inference API (router OpenAI-compatible).

Si no hay HF_TOKEN configurado, los endpoints devuelven None y la app
sigue funcionando en modos offline (degradación elegante).
"""
import os

import httpx

HF_TOKEN = os.environ.get("HF_TOKEN", "")
# Modelo del free tier de HF Inference Providers; se puede cambiar por secret.
AI_MODEL = os.environ.get("AI_MODEL", "meta-llama/Llama-3.1-8B-Instruct")
API_URL = "https://router.huggingface.co/v1/chat/completions"

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
    payload = {
        "model": AI_MODEL,
        "messages": [{"role": "system", "content": SYSTEM_PROMPT}, *messages],
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
