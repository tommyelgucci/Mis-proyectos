# Ejercicios prácticos — Domain 2 (Tools) del AI-103

## Por qué este documento existe

El banco de preguntas nuevo (`PARTE10`, `PARTE11`, `PARTE12`) evalúa si reconoces el código correcto de memoria (nombres de clases, parámetros, orden de pasos). Pero reconocer código en una opción múltiple **no es lo mismo** que saber escribirlo. Mucha gente reprueba AI-103 porque estudia solo la teoría (RAG, Responsible AI, arquitectura) y llega al examen sin haber tecleado nunca un `FunctionTool` o manejado un `mcp_approval_request` real.

Este documento reconstruye, con código completo y comentado, los 3 ejercicios prácticos de los módulos que convertiste (agente con herramientas personalizadas, integración MCP, Foundry IQ). Puedes:

1. **Copiar y correr la lógica localmente sin Azure** (con datos simulados) para entender el flujo antes de gastar créditos.
2. Cuando tengas una suscripción de Azure lista, conectar el mismo código a un proyecto real de Foundry siguiendo los pasos del portal.

> Nota de honestidad: los fragmentos de código marcados como "código del módulo" son textuales de la fuente oficial de Microsoft Learn. Las partes marcadas como "completado para este ejercicio" (como los datos de ejemplo de eventos astronómicos o el inventario) las escribí yo para que el ejercicio sea ejecutable de punta a punta, ya que el PDF original solo mostraba los fragmentos que el estudiante debía *agregar*, no el archivo starter completo del repositorio.

---

## Ejercicio 1 — Agente con función personalizada (`function_calling`)

**Qué practica:** `FunctionTool`, el ciclo `function_call` → ejecutar → `FunctionCallOutput`, `previous_response_id`.

### Paso 1 — Prerrequisitos (una sola vez)

```bash
python -m venv labenv
# Windows: .\labenv\Scripts\Activate.ps1
# macOS/Linux:
source labenv/bin/activate
pip install azure-ai-projects azure-identity openai
```

### Paso 2 — `functions.py` (la lógica de negocio, sin nada de Azure)

Esto es intencionalmente simple: son funciones Python normales. La parte de IA solo decide *cuándo* llamarlas.

```python
# functions.py
import json
from datetime import datetime

# --- Completado para este ejercicio: datos de ejemplo ---
EVENTS = [
    # (nombre, tipo, fecha_mmdd, fecha_str, continentes_visibles)
    ("Jupiter-Venus Conjunction", "conjunction", 501, "May 1st",
     {"north_america", "south_america", "europe"}),
    ("Perseid Meteor Shower", "meteor_shower", 812, "August 12th",
     {"north_america", "europe"}),
    ("Total Lunar Eclipse", "eclipse", 1008, "October 8th",
     {"australia", "asia", "south_america"}),
]

TELESCOPE_RATES = {"standard": 50, "advanced": 100, "premium": 175}
PRIORITY_MULTIPLIER = {"low": 0.8, "normal": 1.0, "high": 1.5}


def next_visible_event(location: str) -> str:
    """Devuelve el próximo evento astronómico visible desde una ubicación."""
    today = int(datetime.now().strftime("%m%d"))
    loc = location.lower().replace(" ", "_")
    for name, event_type, date, date_str, locs in EVENTS:
        if loc in locs and date >= today:
            return json.dumps({
                "event": name, "type": event_type,
                "date": date_str, "visible_from": sorted(locs),
            })
    return json.dumps({"message": f"No upcoming events found for {location}."})


def calculate_observation_cost(telescope_tier: str, hours: float, priority: str) -> str:
    """Calcula el costo de una sesión de observación."""
    rate = TELESCOPE_RATES.get(telescope_tier.lower(), TELESCOPE_RATES["standard"])
    multiplier = PRIORITY_MULTIPLIER.get(priority.lower(), 1.0)
    total = round(rate * hours * multiplier, 2)
    return json.dumps({
        "telescope_tier": telescope_tier, "hours": hours,
        "priority": priority, "total_cost_usd": total,
    })


def generate_observation_report(event_name: str, location: str, telescope_tier: str,
                                 hours: float, priority: str, observer_name: str) -> str:
    """Genera un reporte de texto y lo guarda en disco (igual que el ejercicio original)."""
    cost = json.loads(calculate_observation_cost(telescope_tier, hours, priority))
    report = (
        f"Observation Report for {observer_name}\n"
        f"Event: {event_name}\nLocation: {location}\n"
        f"Telescope: {telescope_tier} ({hours}h, priority: {priority})\n"
        f"Cost: ${cost['total_cost_usd']}\n"
    )
    filename = f"report-{event_name.replace(' ', '_')}.txt"
    with open(filename, "w") as f:
        f.write(report)
    return json.dumps({"status": "generated", "file": filename})
```

### Paso 3 — `agent.py` (código textual del módulo, con las 8 secciones ensambladas)

```python
# agent.py
import json
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import FunctionTool
from azure.identity import DefaultAzureCredential
from azure.ai.projects.models import PromptAgentDefinition, FunctionTool
from openai.types.responses.response_input_param import FunctionCallOutput, ResponseInputParam
from functions import next_visible_event, calculate_observation_cost, generate_observation_report

project_endpoint = "https://<tu-proyecto>.services.ai.azure.com/api/projects/<tu-proyecto>"
model_deployment = "gpt-4.1"

with (
    DefaultAzureCredential() as credential,
    AIProjectClient(endpoint=project_endpoint, credential=credential) as project_client,
    project_client.get_openai_client() as openai_client,
):
    # --- 1. Definir las 3 herramientas (JSON Schema de cada función) ---
    event_tool = FunctionTool(
        name="next_visible_event",
        description="Get the next visible event in a given location.",
        parameters={
            "type": "object",
            "properties": {
                "location": {"type": "string",
                    "description": "continent (e.g. 'north_america', 'south_america', 'australia')"},
            },
            "required": ["location"], "additionalProperties": False,
        },
        strict=True,
    )
    cost_tool = FunctionTool(
        name="calculate_observation_cost",
        description="Calculate the cost of an observation based on telescope tier, hours, and priority.",
        parameters={
            "type": "object",
            "properties": {
                "telescope_tier": {"type": "string", "description": "'standard', 'advanced', 'premium'"},
                "hours": {"type": "number", "description": "hours of observation"},
                "priority": {"type": "string", "description": "'low', 'normal', 'high'"},
            },
            "required": ["telescope_tier", "hours", "priority"], "additionalProperties": False,
        },
        strict=True,
    )
    report_tool = FunctionTool(
        name="generate_observation_report",
        description="Generate a report summarizing an astronomical observation",
        parameters={
            "type": "object",
            "properties": {
                "event_name": {"type": "string"}, "location": {"type": "string"},
                "telescope_tier": {"type": "string"}, "hours": {"type": "number"},
                "priority": {"type": "string"}, "observer_name": {"type": "string"},
            },
            "required": ["event_name", "location", "telescope_tier", "hours", "priority", "observer_name"],
            "additionalProperties": False,
        },
        strict=True,
    )

    # --- 2. Crear el agente con las 3 herramientas ---
    agent = project_client.agents.create_version(
        agent_name="astronomy-agent",
        definition=PromptAgentDefinition(
            model=model_deployment,
            instructions=(
                "You are an astronomy observations assistant that helps users find "
                "information about astronomical events and calculate telescope rental costs. "
                "Use the available tools to assist users with their inquiries."
            ),
            tools=[event_tool, cost_tool, report_tool],
        ),
    )

    # --- 3. Conversación + primer mensaje ---
    conversation = openai_client.conversations.create()
    input_list: ResponseInputParam = []
    user_input = ("Find me the next event I can see from South America and give me "
                  "the cost for 5 hours of premium telescope time at normal priority.")
    openai_client.conversations.items.create(
        conversation_id=conversation.id,
        items=[{"type": "message", "role": "user", "content": user_input}],
    )
    response = openai_client.responses.create(
        conversation=conversation.id,
        extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
        input=input_list,
    )
    if response.status == "failed":
        print(f"Response failed: {response.error}")

    # --- 4. Procesar los function_call que el agente decida hacer ---
    FUNCTIONS = {
        "next_visible_event": next_visible_event,
        "calculate_observation_cost": calculate_observation_cost,
        "generate_observation_report": generate_observation_report,
    }
    for item in response.output:
        if item.type == "function_call":
            result = FUNCTIONS[item.name](**json.loads(item.arguments))
            input_list.append(FunctionCallOutput(
                type="function_call_output", call_id=item.call_id, output=result,
            ))

    # --- 5. Devolver los resultados al agente para la respuesta final ---
    if input_list:
        response = openai_client.responses.create(
            input=input_list, previous_response_id=response.id,
            extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
        )
    print(f"AGENT: {response.output_text}")

    # --- 6. Limpieza ---
    project_client.agents.delete_version(agent_name=agent.name, agent_version=agent.version)
```

### Cómo practicar esto en 2 niveles

- **Sin Azure (hoy mismo):** copia solo `functions.py` y llama las 3 funciones directamente desde una terminal de Python para verificar la lógica. Esto no requiere ninguna cuenta.
- **Con Azure (cuando tengas el proyecto):** reemplaza `project_endpoint` por el endpoint real de tu proyecto de Foundry (Portal → tu proyecto → copiar "Project Endpoint"), corre `az login`, y ejecuta `python agent.py`.

---

## Ejercicio 2 — Servidor y cliente MCP propios (agente de inventario)

**Qué practica:** `FastMCP`, `@mcp.tool()`, `session.list_tools()`, `session.call_tool()`, envolver herramientas MCP como `FunctionTool`.

### `server.py` — el servidor MCP (expone herramientas)

```python
# server.py
from fastmcp import FastMCP

# Add references
mcp = FastMCP(name="Inventory")

# --- Completado para este ejercicio: datos de ejemplo ---
_INVENTORY = {"Moisturizer": 6, "Shampoo": 8, "Body Spray": 28, "Sunscreen": 42}
_WEEKLY_SALES = {"Moisturizer": 18, "Shampoo": 9, "Body Spray": 3, "Sunscreen": 22}

@mcp.tool()
def get_inventory_levels() -> dict:
    """Return current stock levels for all products."""
    return _INVENTORY

@mcp.tool()
def get_weekly_sales() -> dict:
    """Return units sold per product in the last 7 days."""
    return _WEEKLY_SALES

if __name__ == "__main__":
    # show_banner=False evita que el banner de inicio corrompa el protocolo stdio
    mcp.run(show_banner=False)
```

### `client.py` — el cliente MCP (descubre e invoca, y conecta con el agente de Azure)

```python
# client.py
import asyncio
import json
from contextlib import AsyncExitStack

from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import FunctionTool, PromptAgentDefinition
from openai.types.responses.response_input_param import FunctionCallOutput, ResponseInputParam

# Add references
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

server_params = StdioServerParameters(command="python", args=["server.py"])


class InventoryAgentClient:
    def __init__(self, project_endpoint: str, model_deployment: str):
        self.project_endpoint = project_endpoint
        self.model_deployment = model_deployment
        self.exit_stack = AsyncExitStack()

    async def connect_to_server(self):
        # Start the MCP server
        stdio_transport = await self.exit_stack.enter_async_context(stdio_client(server_params))
        stdio, write = stdio_transport
        # Create an MCP client session
        self.session = await self.exit_stack.enter_async_context(ClientSession(stdio, write))
        await self.session.initialize()
        # List available tools
        response = await self.session.list_tools()
        self.tools = response.tools
        print("\nConnected to server with tools:", [tool.name for tool in self.tools])

    async def build_agent(self):
        credential = DefaultAzureCredential()
        self.project_client = AIProjectClient(endpoint=self.project_endpoint, credential=credential)
        self.openai_client = self.project_client.get_openai_client()

        # Build a function for each tool
        def make_tool_func(tool_name):
            async def tool_func(**kwargs):
                result = await self.session.call_tool(tool_name, kwargs)
                return result
            tool_func.__name__ = tool_name
            return tool_func

        self.functions_dict = {tool.name: make_tool_func(tool.name) for tool in self.tools}

        # Create FunctionTool definitions for the agent
        mcp_function_tools: list[FunctionTool] = []
        for tool in self.tools:
            mcp_function_tools.append(FunctionTool(
                name=tool.name, description=tool.description,
                parameters={"type": "object", "properties": {}, "additionalProperties": False},
                strict=True,
            ))

        # Create the agent
        self.agent = self.project_client.agents.create_version(
            agent_name="inventory-agent",
            definition=PromptAgentDefinition(
                model=self.model_deployment,
                instructions="""
                You are an inventory assistant. Here are some general guidelines:
                - Recommend restock if item inventory < 10 and weekly sales > 15
                - Recommend clearance if item inventory > 20 and weekly sales < 5
                """,
                tools=mcp_function_tools,
            ),
        )
        self.conversation = self.openai_client.conversations.create()

    async def send_message(self, user_message: str) -> str:
        self.openai_client.conversations.items.create(
            conversation_id=self.conversation.id,
            items=[{"type": "message", "role": "user", "content": user_message}],
        )
        response = self.openai_client.responses.create(
            conversation=self.conversation.id,
            extra_body={"agent_reference": {"name": self.agent.name, "type": "agent_reference"}},
            input="",
        )
        input_list: ResponseInputParam = []
        # Process function calls
        for item in response.output:
            if item.type == "function_call":
                kwargs = json.loads(item.arguments)
                required_function = self.functions_dict.get(item.name)
                output = await required_function(**kwargs)
                input_list.append(FunctionCallOutput(
                    type="function_call_output", call_id=item.call_id,
                    output=output.content[0].text,
                ))
        # Send function call outputs back to the model and retrieve a response
        if input_list:
            response = self.openai_client.responses.create(
                input=input_list, previous_response_id=response.id,
                extra_body={"agent_reference": {"name": self.agent.name, "type": "agent_reference"}},
            )
        return response.output_text

    async def chat_loop(self):
        print("\nType a question about inventory (or 'quit' to exit).")
        while True:
            user_input = input("\nYou: ").strip()
            if user_input.lower() == "quit":
                break
            answer = await self.send_message(user_input)
            print(f"\nAgent response: {answer}")

    async def cleanup(self):
        self.project_client.agents.delete_version(
            agent_name=self.agent.name, agent_version=self.agent.version)
        await self.exit_stack.aclose()


async def main():
    client = InventoryAgentClient(
        project_endpoint="https://<tu-proyecto>.services.ai.azure.com/api/projects/<tu-proyecto>",
        model_deployment="gpt-4.1",
    )
    try:
        await client.connect_to_server()
        await client.build_agent()
        await client.chat_loop()
    finally:
        await client.cleanup()


if __name__ == "__main__":
    asyncio.run(main())
```

### Variante: conectar a un servidor MCP remoto ya existente (sin escribir tu propio servidor)

Esto es lo que hace `MCPTool` — mucho más simple porque Azure administra la sesión del cliente por ti:

```python
from azure.ai.projects.models import MCPTool

mcp_tool = MCPTool(
    server_label="api-specs",
    server_url="https://learn.microsoft.com/api/mcp",
    require_approval="always",
)
agent = project_client.agents.create_version(
    agent_name="MyAgent",
    definition=PromptAgentDefinition(
        model=model_deployment,
        instructions="You are a helpful agent that can use MCP tools to assist users.",
        tools=[mcp_tool],
    ),
)
```

Con `require_approval="always"`, cada llamada exige aprobar `mcp_approval_request` así:

```python
from openai.types.responses.response_input_param import McpApprovalResponse, ResponseInputParam

while True:
    input_list: ResponseInputParam = []
    for item in response.output:
        if item.type == "mcp_approval_request" and item.server_label == "api-specs":
            input_list.append(McpApprovalResponse(
                type="mcp_approval_response", approve=True, approval_request_id=item.id,
            ))
    if not input_list:
        break
    response = openai_client.responses.create(
        input=input_list, previous_response_id=response.id,
        extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
    )
```

**Cuándo usar cada patrón (pregunta típica de examen):**

| Escenario | Usa |
|---|---|
| Ya existe un servidor MCP remoto (de un tercero o de Azure) | `MCPTool` nativo — sin `ClientSession` manual |
| Vas a construir y hospedar tu propio servidor de herramientas | `FastMCP` + `ClientSession` + envolver cada tool como `FunctionTool` |

---

## Ejercicio 3 — Agente con Foundry IQ (conocimiento/RAG)

**Qué practica:** crear una base de conocimiento en el portal, conectarla a un agente, y manejar el mismo flujo de aprobación MCP visto arriba (porque Foundry IQ expone el conocimiento *como un servidor MCP*).

### Parte A — En el portal de Foundry (ai.azure.com), resumen de pasos

1. Crear un proyecto → **Build → Agents → Create agent** (despliega un modelo tipo `gpt-5` automáticamente).
2. Instrucciones del agente — usa siempre una instrucción **específica**, nunca vaga:
   ```text
   You are a helpful AI assistant for Contoso, specializing in outdoor camping and hiking products.
   You must ALWAYS search the knowledge base to answer questions about our products or product catalog.
   Provide detailed, accurate information and always cite your sources.
   If you don't find relevant information in the knowledge base, say so clearly.
   ```
3. **Knowledge → Add → Connect to Foundry IQ** → crear un recurso de Azure AI Search (tier Free/Basic).
4. Subir tus documentos fuente a **Azure Blob Storage** (un contenedor dedicado).
5. **Knowledge → Create a knowledge base** → origen = Azure Blob Storage → apuntar al contenedor → elegir modelo de embeddings (`text-embedding-3-small`) y modelo de chat (`gpt-5`).
6. Probar en el **playground** del portal antes de conectar código.
7. (Opcional, para practicar aprobaciones) En la extensión **Foundry Toolkit para VS Code**, sobre la tool `kb-knowledgebase...`, activa "Ask for approval for all tools".

### Parte B — `agent_client.py` (conectar desde código, con manejo de aprobaciones)

```python
# agent_client.py
import json
import os
from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

load_dotenv()
project_endpoint = os.environ["PROJECT_ENDPOINT"]
agent_name = os.environ["AGENT_NAME"]  # p. ej. "product-expert-agent"

conversation_history = []

# Connect to the project and agent
credential = DefaultAzureCredential(
    exclude_environment_credential=True,
    exclude_managed_identity_credential=True,
)
project_client = AIProjectClient(credential=credential, endpoint=project_endpoint)
openai_client = project_client.get_openai_client()
agent = project_client.agents.get(agent_name=agent_name)
print(f"Connected to agent: {agent.name} (id: {agent.id})\n")
conversation = openai_client.conversations.create(items=[])
print(f"Created conversation (id: {conversation.id})\n")


def send_message_to_agent(user_message: str) -> str:
    openai_client.conversations.items.create(
        conversation_id=conversation.id,
        items=[{"type": "message", "role": "user", "content": user_message}],
    )
    conversation_history.append({"role": "user", "content": user_message})

    response = openai_client.responses.create(
        conversation=conversation.id,
        extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
        input="",
    )

    # Loop until a response has no pending approval requests (zero, one, or many)
    while True:
        approval_requests = [
            item for item in (getattr(response, "output", None) or [])
            if getattr(item, "type", None) == "mcp_approval_request"
        ]
        if not approval_requests:
            break
        approval_items = []
        for approval_request in approval_requests:
            print(f"[Approval required for: {approval_request.name}]")
            print(f"Server: {approval_request.server_label}")
            try:
                args = json.loads(approval_request.arguments)
                print(f"Arguments: {json.dumps(args, indent=2)}\n")
            except Exception:
                print(f"Arguments: {approval_request.arguments}\n")
            approved = input("Approve this action? (yes/no): ").strip().lower() in ["yes", "y"]
            approval_items.append({
                "type": "mcp_approval_response",
                "approval_request_id": approval_request.id,
                "approve": approved,
            })
        openai_client.conversations.items.create(
            conversation_id=conversation.id, items=approval_items)
        response = openai_client.responses.create(
            conversation=conversation.id,
            extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
            input="",
        )

    conversation_history.append({"role": "assistant", "content": response.output_text})
    return response.output_text


def display_conversation_history():
    for turn in conversation_history:
        print(f"{turn['role'].upper()}: {turn['content']}\n")


if __name__ == "__main__":
    print("Escribe una pregunta (o 'history' / 'quit').")
    while True:
        q = input("\nYou: ").strip()
        if q.lower() == "quit":
            break
        if q.lower() == "history":
            display_conversation_history()
            continue
        print(f"\nAgent: {send_message_to_agent(q)}")
```

`.env` de ejemplo:

```
PROJECT_ENDPOINT=https://<tu-proyecto>.services.ai.azure.com/api/projects/<tu-proyecto>
AGENT_NAME=product-expert-agent
```

### El patrón que se repite en los 3 ejercicios (y que el examen ama preguntar)

```
crear conversación → enviar mensaje → responses.create()
   → ¿hay function_call?          → ejecutar función → FunctionCallOutput → reenviar
   → ¿hay mcp_approval_request?   → aprobar/negar     → mcp_approval_response → reenviar
   → si no hay nada pendiente     → response.output_text es la respuesta final
```

Domina este diagrama de memoria (y sabe teclearlo) y la mayoría de las preguntas de código de Domain 2 dejan de ser un misterio.

---

## Checklist de práctica antes del examen

- [ ] Puedo escribir de memoria un `FunctionTool` completo con `parameters` en JSON Schema válido.
- [ ] Puedo explicar por qué el agente NO ejecuta la función (lo hace el cliente).
- [ ] Sé qué campo (`call_id`) conecta un `function_call` con su `FunctionCallOutput`.
- [ ] Puedo diferenciar cuándo usar `MCPTool` nativo vs. `FastMCP` + `ClientSession` manual.
- [ ] Sé qué pasa si omito `show_banner=False` en un servidor MCP por stdio.
- [ ] Puedo escribir el bucle de aprobación `mcp_approval_request` → `McpApprovalResponse`.
- [ ] Sé que Foundry IQ expone bases de conocimiento como servidores MCP (mismo flujo de aprobación).
- [ ] Puedo nombrar los 6 orígenes de datos de Foundry IQ y cuándo usar cada uno.
- [ ] Sé por qué una instrucción vaga ("usa la base de conocimiento") produce respuestas inconsistentes.
