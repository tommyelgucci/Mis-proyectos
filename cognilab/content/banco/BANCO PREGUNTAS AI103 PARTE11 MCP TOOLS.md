# BANCO DE PREGUNTAS AI-103 — PARTE 11 (Q1150-Q1169)
## Domain 2: Tools — Integración de herramientas MCP (Model Context Protocol)
### Generado: 2026-08-18 | Fuente: módulo "Integración de herramientas de MCP con Azure AI Agents"

---

### Q1150
**¿Qué rol cumple el servidor MCP en la arquitectura cliente-servidor de MCP?**

A) Ejecuta directamente al agente de IA y procesa las solicitudes del usuario final
B) Hospeda definiciones de herramientas (funciones decoradas con `@mcp.tool()`) y las expone para que un cliente las descubra e invoque ✅
C) Administra las conexiones de red entre varios agentes de IA
D) Almacena el historial de conversación del agente

**Explicación:** El servidor MCP actúa como catálogo/registro de herramientas: hospeda funciones anotadas con `@mcp.tool()` y las sirve a través de una conexión (HTTP o stdio) para que un cliente MCP las descubra dinámicamente. No ejecuta al agente ni gestiona la conversación.

---

### Q1151
**¿Qué método usa un cliente MCP para obtener la lista de herramientas disponibles en el servidor?**

A) `session.get_catalog()`
B) `session.list_tools()` ✅
C) Leer un archivo `tools.json` estático desde el servidor
D) Suscribirse a un evento `on_tools_ready` vía WebSocket

**Explicación:** `await session.list_tools()` devuelve el catálogo actual de herramientas del servidor MCP. Este es un mecanismo de descubrimiento dinámico: no requiere codificar de forma dura cada herramienta en el cliente.

---

### Q1152
**Tienes este `server.py`:
```python
from fastmcp import FastMCP

mcp = FastMCP(name="Inventory")

@mcp.tool()
def get_inventory_levels() -> dict:
    return {"Moisturizer": 6, "Shampoo": 8, "Body Spray": 28}

@mcp.tool()
def get_weekly_sales() -> dict:
    return {"Moisturizer": 18, "Shampoo": 9, "Body Spray": 3}
```
¿Qué línea falta al final del archivo para que estas herramientas queden disponibles?**

A) `mcp.deploy()`
B) `mcp.run(show_banner=False)` ✅
C) `mcp.start(port=8080)`
D) No se necesita nada más; el decorador ya inicia el servidor

**Explicación:** `mcp.run(show_banner=False)` arranca el servidor MCP. El parámetro `show_banner=False` es importante: evita que se imprima un banner de inicio en `stdout`, lo cual corrompería el protocolo stdio (JSON-RPC) que usa el transporte cliente-servidor local.

---

### Q1153
**TRAMPA: Un desarrollador omite `show_banner=False` al llamar `mcp.run()` en un servidor MCP que se comunica por stdio con su cliente. ¿Qué consecuencia tiene esto?**

A) Ninguna; es solo un mensaje cosmético en la terminal
B) El banner impreso en `stdout` corrompe el protocolo de comunicación stdio del cliente MCP, ya que este canal se usa para mensajes JSON-RPC del propio protocolo ✅
C) El servidor se ejecuta más lento
D) El servidor rechaza conexiones de clientes remotos

**Explicación:** Cuando el transporte es stdio (`stdio_client`), stdout se reserva exclusivamente para los mensajes del protocolo MCP. Cualquier texto adicional (como un banner de bienvenida) se mezcla con esos mensajes y rompe el parseo del cliente — por eso el módulo insiste en usar `show_banner=False`.

---

### Q1154
**¿Qué hace `stdio_client(server_params)` en el código del cliente MCP?**

A) Crea un cliente HTTP para conectarse a un servidor MCP remoto
B) Arranca el servidor MCP como subproceso y establece un canal de entrada/salida estándar para la comunicación cliente-servidor local ✅
C) Convierte automáticamente las herramientas MCP en endpoints REST
D) Cifra la conexión con TLS mutuo

**Explicación:** En este patrón de laboratorio, el propio cliente es responsable de iniciar el servidor usando transporte de entrada/salida estándar (stdio), creando un canal de comunicación ligero para desarrollo local. En producción, servidor y cliente normalmente se ejecutan como procesos separados (o el servidor es remoto).

---

### Q1155
**Después de `session = await exit_stack.enter_async_context(ClientSession(stdio, write))`, ¿qué llamada es obligatoria antes de poder listar o invocar herramientas?**

A) `session.connect()`
B) `await session.initialize()` ✅
C) `session.authenticate()`
D) `session.handshake(timeout=30)`

**Explicación:** `await session.initialize()` prepara la sesión MCP para descubrir y llamar herramientas registradas en el servidor. Sin esta llamada, `list_tools()` y `call_tool()` no son operaciones válidas.

---

### Q1156
**¿Por qué se envuelve cada herramienta MCP descubierta en esta función antes de dársela al agente?
```python
def make_tool_func(tool_name):
    async def tool_func(**kwargs):
        result = await session.call_tool(tool_name, kwargs)
        return result
    tool_func.__name__ = tool_name
    return tool_func

functions_dict = {tool.name: make_tool_func(tool.name) for tool in tools}
```**

A) Para convertir automáticamente el tipo de retorno a JSON válido
B) Para permitir que el agente invoque la herramienta sin bloquear el hilo, ya que `session.call_tool` es una operación asíncrona ✅
C) Porque `FunctionTool` solo acepta funciones asíncronas por especificación del SDK
D) Para habilitar reintentos automáticos ante fallos de red

**Explicación:** `session.call_tool` es una corrutina; envolver la invocación en una función async (`tool_func`) permite que el cliente llame a las herramientas del servidor MCP sin bloquear el resto de la aplicación mientras espera la respuesta.

---

### Q1157
**Al registrar las herramientas descubiertas de un servidor MCP propio como `FunctionTool` del agente, ¿qué patrón de código sigue el módulo?**

A) `tools=[mcp_tool]` donde `mcp_tool = MCPTool(server_url=...)` apunta directamente al servidor
B) Se construye un `FunctionTool` por cada herramienta descubierta (`for tool in tools: FunctionTool(name=tool.name, description=tool.description, parameters={...})`) y se agrupan en una lista para el agente ✅
C) Se genera automáticamente un archivo OpenAPI a partir del catálogo MCP
D) Se registra un único `FunctionTool` genérico llamado `mcp_dispatcher`

**Explicación:** Cuando hospedas tu propio servidor MCP y usas un cliente manual (no el `MCPTool` nativo de Azure para servidores remotos), cada herramienta descubierta con `session.list_tools()` se convierte en un `FunctionTool` individual, usando el `name` y `description` que expone el servidor.

---

### Q1158
**¿Cuál es la diferencia clave entre usar `MCPTool` (nativo de Azure AI Agent Service) y el patrón manual de cliente/servidor MCP con `FastMCP` + `ClientSession`?**

A) `MCPTool` solo funciona con modelos GPT-3.5; el patrón manual funciona con cualquier modelo
B) Con `MCPTool` no necesitas crear manualmente una sesión de cliente MCP ni envolver herramientas como `FunctionTool`; el servicio se conecta directamente al servidor MCP (remoto) y las invoca automáticamente ✅
C) `MCPTool` requiere Azure Functions como intermediario obligatorio
D) El patrón manual no admite aprobación humana de llamadas a herramientas

**Explicación:** `MCPTool` (parte del SDK de Azure AI Projects) simplifica el uso de servidores MCP remotos: solo defines `server_label`, `server_url` y opcionalmente `require_approval`/`allowed_tools`, y el servicio administra el descubrimiento e invocación. El patrón manual (`FastMCP` + `stdio_client` + `ClientSession`) es necesario cuando construyes y hospedas tu propio servidor MCP y quieres control total del puente cliente-agente.

---

### Q1159
**Dado `mcp_tool = MCPTool(server_label="api-specs", server_url="https://learn.microsoft.com/api/mcp", require_approval="always")`, ¿qué ocurre la primera vez que el agente intenta usar una herramienta de ese servidor?**

A) La invoca de inmediato sin restricciones
B) La respuesta del agente incluye un item `mcp_approval_request`, y el flujo debe pausarse hasta recibir una aprobación explícita antes de continuar ✅
C) Se lanza una excepción porque `require_approval` no es un parámetro válido
D) El servidor MCP rechaza la conexión por falta de autenticación

**Explicación:** Con `require_approval="always"` (el valor por defecto si no se especifica), cada invocación de herramienta genera un `mcp_approval_request` en `response.output`. El cliente debe responder con un `McpApprovalResponse(approval_request_id=..., approve=True/False)` para que el agente continúe.

---

### Q1160
**¿Qué objeto se envía de vuelta al agente para aprobar una solicitud MCP pendiente, y qué dos campos clave requiere?**

A) `FunctionCallOutput`, con `call_id` y `output`
B) `McpApprovalResponse(type="mcp_approval_response", approve=True, approval_request_id=item.id)` ✅
C) `ToolApproval(id=item.id, granted=True)`
D) `AgentAction(action="approve", target=item.server_label)`

**Explicación:** La aprobación se envía como `McpApprovalResponse`, requiriendo `approval_request_id` (tomado de `item.id` en el `mcp_approval_request` recibido) y el booleano `approve`. No debe confundirse con `FunctionCallOutput`, que es específico del flujo de `function_calling` normal.

---

### Q1161
**Un agente puede emitir varias solicitudes de aprobación MCP en una misma respuesta. El módulo procesa esto con este patrón:
```python
while True:
    input_list: ResponseInputParam = []
    for item in response.output:
        if item.type == "mcp_approval_request" and item.server_label == "api-specs":
            input_list.append(McpApprovalResponse(
                type="mcp_approval_response",
                approve=True,
                approval_request_id=item.id,
            ))
    if not input_list:
        break
    response = openai_client.responses.create(
        input=input_list,
        previous_response_id=response.id,
        extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
    )
```
¿Qué patrón de control de flujo es este, y por qué es necesario en vez de un simple `if`?**

A) Un `if` simple que solo revisa la primera solicitud
B) Un bucle `while True` que recolecta todas las `mcp_approval_request` pendientes en cada iteración y termina cuando `input_list` queda vacío (ninguna aprobación pendiente) ✅
C) Un temporizador que espera 30 segundos antes de continuar
D) Una llamada recursiva a `create_version` por cada aprobación

**Explicación:** Como el agente puede requerir cero, una o varias aprobaciones (incluso en rondas sucesivas), el patrón correcto es iterar en un `while True`, recolectando y respondiendo las solicitudes pendientes en cada vuelta, y saliendo del bucle solo cuando no queden `mcp_approval_request` en la respuesta más reciente.

---

### Q1162
**¿Qué parámetro de `MCPTool` limita qué herramientas específicas del servidor puede usar el agente, en lugar de exponer el catálogo completo?**

A) `restricted_scope`
B) `allowed_tools` ✅
C) `tool_whitelist`
D) `visible_functions`

**Explicación:** `allowed_tools` (opcional) permite restringir el conjunto de herramientas accesibles de un servidor MCP concreto, útil cuando el servidor expone más funcionalidad de la que quieres habilitar para un agente determinado.

---

### Q1163
**¿Cómo se pasan credenciales (por ejemplo, un token de API) a un servidor MCP remoto que las requiere, al usar `MCPTool`?**

A) Incluyéndolas como texto plano dentro de `instructions` del agente
B) Mediante encabezados personalizados aplicados con `update_headers` sobre el objeto `MCPTool` ✅
C) No es posible; `MCPTool` solo admite servidores anónimos
D) Codificándolas en la propia `server_url` como query string

**Explicación:** `MCPTool` admite encabezados personalizados (claves de API, tokens OAuth, etc.) aplicados mediante `update_headers`, evitando exponer credenciales en el prompt o en la URL.

---

### Q1164
**¿Cuál es la ventaja principal de la "detección dinámica de herramientas" que habilita MCP, frente a integrar cada API manualmente en el código del agente?**

A) Reduce el costo de tokens del modelo en cada llamada
B) Permite agregar, actualizar o quitar herramientas del lado del servidor sin modificar ni volver a implementar el código del agente ✅
C) Elimina por completo la necesidad de definir `instructions`
D) Garantiza que el modelo nunca alucine una respuesta

**Explicación:** El valor central de MCP es el enfoque de "integración una vez": el agente descubre el catálogo de herramientas en tiempo de ejecución (`list_tools()` o el `MCPTool` nativo), así que cambios en el servidor (nuevas herramientas, actualizaciones) se reflejan automáticamente sin tocar el código ni redeployar el agente.

---

### Q1165
**TRAMPA: Alguien afirma que MCP es simplemente "otra forma de llamar a una API REST" y que no aporta nada distinto a `OpenApiTool`. ¿Qué diferencia fundamental están ignorando?**

A) MCP solo funciona con Python; OpenAPI funciona con cualquier lenguaje
B) `OpenApiTool` describe una API fija en tiempo de diseño mediante una especificación estática; MCP permite descubrimiento dinámico en tiempo de ejecución del catálogo de herramientas de un servidor, que puede cambiar sin volver a desplegar el agente ✅
C) MCP no admite autenticación, mientras que OpenAPI sí
D) No hay ninguna diferencia real entre ambos enfoques

**Explicación:** `OpenApiTool` requiere una especificación OpenAPI conocida de antemano (estática). MCP invierte el modelo: el agente consulta al servidor MCP en tiempo real (`session.list_tools()` o el descubrimiento nativo de `MCPTool`) y adapta su conjunto de herramientas dinámicamente, sin necesidad de conocer de antemano cada endpoint ni redeployar nada cuando el catálogo cambia.

---

### Q1166
**En el ejercicio del inventario, las instrucciones del agente incluyen reglas como "recomienda reabastecer si el inventario < 10 y las ventas semanales > 15". ¿Dónde se define esta lógica de negocio?**

A) Dentro del propio servidor MCP, como parte de la herramienta `get_inventory_levels`
B) En las `instructions` de `PromptAgentDefinition`, como reglas en lenguaje natural que el modelo aplica al razonar sobre los datos que las herramientas MCP le devuelven ✅
C) En un archivo de configuración `rules.yaml` leído por el cliente MCP
D) Como parámetros adicionales de `session.call_tool()`

**Explicación:** Las herramientas MCP (`get_inventory_levels`, `get_weekly_sales`) solo devuelven datos crudos. La lógica de decisión ("reabastecer si...") vive en las `instructions` del agente como reglas en lenguaje natural — el modelo combina los datos recuperados con esas reglas para generar la recomendación.

---

### Q1167
**¿Qué es cierto sobre la seguridad al usar servidores MCP según el módulo?**

A) MCP no ofrece ningún mecanismo de autenticación estandarizado
B) MCP proporciona un método de autenticación coherente que simplifica el acceso seguro entre varios servidores, evitando administrar claves o protocolos distintos por cada integración ✅
C) Toda comunicación MCP es anónima por diseño y no admite claves de API
D) La seguridad de MCP depende exclusivamente de Azure Active Directory

**Explicación:** Una de las ventajas listadas de MCP es la seguridad estandarizada: un método de autenticación coherente entre servidores MCP, lo que reduce la necesidad de gestionar credenciales y protocolos distintos por cada API integrada, facilitando el escalado de agentes.

---

### Q1168
**¿Qué texto imprime el ejercicio al conectar exitosamente el cliente MCP, y qué información contiene?**

A) `"Connected to server with tools:", [tool.name for tool in tools]` — la lista de nombres de las herramientas descubiertas en el servidor ✅
B) Solo un código HTTP 200
C) El contenido completo del archivo `server.py`
D) El número de versión del protocolo MCP

**Explicación:** Tras `response = await session.list_tools()` y `tools = response.tools`, el ejercicio imprime `"Connected to server with tools:", [tool.name for tool in tools]`, confirmando visualmente qué herramientas expone el servidor antes de registrarlas con el agente.

---

### Q1169
**¿Por qué muchas personas subestiman el peso del código MCP en el examen AI-103, y qué deberían practicar en su lugar?**

A) El examen no incluye nada sobre MCP; es un tema demasiado nuevo
B) Suelen memorizar solo la definición conceptual de MCP ("protocolo para exponer herramientas") sin practicar el flujo completo de código: `@mcp.tool()` → `session.list_tools()` → `session.call_tool()` → aprobar `mcp_approval_request` → `McpApprovalResponse` ✅
C) MCP solo se evalúa en la certificación AI-102, no en AI-103
D) Basta con saber que MCP significa "Model Context Protocol" para responder cualquier pregunta

**Explicación:** Igual que con function calling, el error común es quedarse en la definición teórica de MCP sin interiorizar el flujo de código real: cómo se decora una herramienta en el servidor, cómo la descubre y la invoca el cliente, y cómo se maneja el ciclo de aprobación (`mcp_approval_request` / `McpApprovalResponse`). El examen evalúa reconocer estos pasos y detectar cuándo falta uno.

---
