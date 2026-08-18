# BANCO DE PREGUNTAS AI-103 — PARTE 10 (Q1100-Q1119)
## Domain 2: Tools — Herramientas personalizadas (Function Calling, Azure Functions, OpenAPI)
### Generado: 2026-08-18 | Fuente: módulo "Compilar un agente con herramientas personalizadas" (Foundry Agent Service)

---

### Q1100
**¿Quién ejecuta realmente el código de una función cuando un agente usa `function_calling` (FunctionTool) en Foundry Agent Service?**

A) El propio modelo de lenguaje, dentro de su sandbox de inferencia
B) El servicio Foundry Agent, en un contenedor administrado por Microsoft
C) El cliente (tu código de aplicación): el agente solo devuelve un `function_call` con el nombre y los argumentos, y tú ejecutas la función y devuelves el resultado ✅
D) Azure Functions, de forma automática, sin intervención del desarrollador

**Explicación:** function_calling no ejecuta código por ti. El agente identifica que debe llamarse una función, devuelve un item `type: "function_call"` con `call_id` y `arguments` (JSON), y es responsabilidad del cliente parsear los argumentos, ejecutar la función local y devolver el resultado como `FunctionCallOutput` referenciando el mismo `call_id`. Esta es una trampa clásica del examen: mucha gente asume que "function calling" ejecuta código automáticamente.

---

### Q1101
**Tienes este fragmento:
```python
function_tool = FunctionTool(
    name="recent_snowfall",
    parameters={
        "type": "object",
        "properties": {
            "location": {"type": "string"},
        },
        "required": ["location"],
        "additionalProperties": False,
    },
    strict=True,
)
```
¿Qué garantiza `additionalProperties: False` combinado con `strict=True`?**

A) Que la función se ejecute más rápido
B) Que el modelo no pueda inventar parámetros fuera del esquema definido; solo puede enviar `location` ✅
C) Que la función solo pueda llamarse una vez por conversación
D) Que el resultado se cachee automáticamente

**Explicación:** `additionalProperties: False` en el JSON Schema de `parameters`, junto con `strict=True`, obliga al modelo a ceñirse exactamente al esquema declarado (solo las propiedades listadas, todas las `required` presentes), evitando llamadas con argumentos inventados o faltantes.

---

### Q1102
**Después de recibir un `response.output` con un item `type == "function_call"`, ¿qué campo del item usas para hacer coincidir la salida de tu función con la llamada original al construir el `FunctionCallOutput`?**

A) `item.name`
B) `item.call_id` ✅
C) `item.arguments`
D) `item.id`

**Explicación:** El `FunctionCallOutput` debe llevar `call_id=item.call_id` (el mismo identificador de la llamada original). `item.name` identifica qué función llamar y `item.arguments` es el JSON con los parámetros, pero el enlace entre petición y respuesta lo da `call_id`.

---

### Q1103
**Después de ejecutar la función y construir `FunctionCallOutput`, ¿cómo se le indica al agente que continúe la conversación usando ese resultado, sin reenviar todo el historial manualmente?**

A) Creando una nueva `conversation` desde cero
B) Llamando a `openai_client.responses.create(input=input_list, previous_response_id=response.id, ...)` ✅
C) Modificando directamente `agent.instructions`
D) Guardando el resultado en `agent.tools`

**Explicación:** `previous_response_id=response.id` encadena la nueva respuesta a la anterior, permitiendo enviar solo los `function_call_output` nuevos (`input_list`) sin repetir todo el contexto previo — el servicio mantiene el hilo de la conversación.

---

### Q1104
**TRAMPA: Un desarrollador cree que basta con definir `AzureFunctionTool` apuntando a la URL HTTP de su Azure Function para que el agente la invoque. Pero el código real de la herramienta se ve así:
```python
tool = AzureFunctionTool(
    azure_function=AzureFunctionDefinition(
        input_binding=AzureFunctionBinding(
            storage_queue=AzureFunctionStorageQueue(
                queue_name="STORAGE_INPUT_QUEUE_NAME",
                queue_service_endpoint="STORAGE_QUEUE_SERVICE_ENDPOINT",
            )
        ),
        output_binding=AzureFunctionBinding(
            storage_queue=AzureFunctionStorageQueue(
                queue_name="STORAGE_OUTPUT_QUEUE_NAME",
                queue_service_endpoint="STORAGE_QUEUE_SERVICE_ENDPOINT",
            )
        ),
        function=AzureFunctionDefinitionFunction(
            name="queue_trigger",
            description="Get weather for a given location",
            parameters={"type": "object", "properties": {"location": {"type": "string"}}},
        ),
    )
)
```
¿Cómo se comunica realmente `AzureFunctionTool` con la función, a la luz de este código?**

A) Mediante una llamada HTTP directa a un `function_url`
B) Mediante colas de almacenamiento (`AzureFunctionStorageQueue`): un `input_binding` (cola de entrada) y un `output_binding` (cola de salida) definidos con `queue_name` y `queue_service_endpoint` ✅
C) Mediante gRPC sobre el SDK de Azure Functions
D) Mediante un webhook registrado en Azure API Management

**Explicación:** `AzureFunctionTool` no invoca HTTP directamente: se define con `AzureFunctionDefinition` que especifica un `input_binding` y un `output_binding`, ambos de tipo `AzureFunctionStorageQueue` (con `queue_name` y `queue_service_endpoint`). El agente coloca un mensaje en la cola de entrada; la Azure Function (con un trigger de cola) procesa y escribe la respuesta en la cola de salida.

---

### Q1105
**¿Cuántos tipos de autenticación admiten actualmente las herramientas `OpenApiTool` basadas en especificaciones OpenAPI 3.0 en Foundry Agent Service?**

A) Solo autenticación anónima
B) Tres: anónima, clave de API e identidad administrada ✅
C) Cuatro, incluyendo OAuth2 con PKCE
D) Ninguna; todas las llamadas OpenAPI requieren un proxy externo

**Explicación:** El servicio admite tres tipos de autenticación para herramientas OpenAPI 3.0: anónima (`OpenApiAnonymousAuthDetails`), clave de API y identidad administrada. En el ejemplo del módulo se usa `OpenApiAnonymousAuthDetails()` para una API pública sin autenticación.

---

### Q1106
**¿Qué clase del SDK envuelve una especificación OpenAPI (cargada como JSON) para registrarla como herramienta de un agente?**

A) `FunctionTool`
B) `OpenApiTool`, construida con `OpenApiFunctionDefinition(name=, spec=, description=, auth=)` ✅
C) `AzureFunctionTool`
D) `MCPTool`

**Explicación:** `OpenApiTool(openapi=OpenApiFunctionDefinition(name="get_weather", spec=openapi_weather, description=..., auth=OpenApiAnonymousAuthDetails()))` registra la especificación OpenAPI 3.0 (cargada típicamente con `jsonref.loads` para resolver referencias `$ref`) como una herramienta que el agente puede invocar.

---

### Q1107
**¿Cuál de las siguientes NO es una opción nativa de herramienta personalizada disponible en Foundry Agent Service según el módulo de introducción?**

A) Llamada a funciones (`FunctionTool`)
B) Azure Functions (`AzureFunctionTool`)
C) Especificaciones de OpenAPI 3.0 (`OpenApiTool`)
D) Contenedores Docker personalizados desplegados como herramienta ✅

**Explicación:** Las opciones cubiertas son: llamada a funciones, Azure Functions, herramientas de especificación OpenAPI y (mencionado como integración adicional) Azure Logic Apps para flujos low-code/no-code. No existe una opción nativa de "contenedor Docker" como tipo de herramienta.

---

### Q1108
**¿Qué patrón de código se usa para conectar de forma segura al proyecto de Foundry antes de crear un agente?**

A) `requests.get(project_endpoint, auth=api_key)`
B) `with (DefaultAzureCredential() as credential, AIProjectClient(endpoint=project_endpoint, credential=credential) as project_client, project_client.get_openai_client() as openai_client): ...` ✅
C) `openai.api_key = "sk-..."` seguido de `openai.Agent.create()`
D) `AIProjectClient.login(username, password)`

**Explicación:** El patrón estándar usa `DefaultAzureCredential` (que prueba múltiples métodos de identidad de Azure en cadena) como gestor de contexto junto con `AIProjectClient`, y de ahí se obtiene el cliente compatible con OpenAI vía `project_client.get_openai_client()`.

---

### Q1109
**Después de terminar de usar un agente en un script de prueba, ¿qué método limpia esa versión del agente?**

A) `project_client.agents.delete_version(agent_name=agent.name, agent_version=agent.version)` ✅
B) `agent.delete()`
C) `project_client.close()`
D) No es necesario; las versiones expiran automáticamente en 24 horas

**Explicación:** `project_client.agents.delete_version(agent_name=..., agent_version=...)` elimina explícitamente la versión creada del agente. Es buena práctica en scripts de prueba/ejercicio para evitar acumular versiones y costos.

---

### Q1110
**¿Por qué se describe la integración de herramientas personalizadas como "declarativa" en lugar de "imperativa"?**

A) Porque el desarrollador debe escribir explícitamente el código que llama a cada función personalizada dentro del flujo del agente
B) Porque el propio agente decide, a partir del prompt del usuario y de los nombres/descripciones de las funciones, cuándo y cuáles herramientas invocar, sin lógica codificada de forma dura ✅
C) Porque las herramientas se definen usando YAML en vez de Python
D) Porque Azure genera automáticamente el código de las funciones a partir de una descripción en lenguaje natural

**Explicación:** No se escribe código que llame explícitamente a las funciones personalizadas; el agente "decide" invocar una función basándose en el mensaje del usuario y en nombres/parámetros bien documentados de las herramientas disponibles — de ahí la naturaleza declarativa que suele confundir a los desarrolladores nuevos en el patrón.

---

### Q1111
**Un agente tiene registradas tres `FunctionTool` distintas (`next_visible_event`, `calculate_observation_cost`, `generate_observation_report`). El usuario pide algo que requiere las dos primeras en el mismo turno. ¿Qué es cierto sobre `response.output` en ese caso?**

A) Solo puede contener un `function_call` por respuesta; el agente debe hacer dos turnos separados
B) Puede contener varios items `type == "function_call"` en la misma respuesta, y el código cliente debe iterar sobre todos ellos antes de reenviar los resultados ✅
C) El SDK ejecuta las funciones en paralelo automáticamente y solo devuelve el resultado combinado
D) El agente elige aleatoriamente cuál de las dos funciones llamar

**Explicación:** El agente puede emitir múltiples `function_call` en la misma respuesta cuando el prompt lo requiere (p. ej. "dame el próximo evento visible y el costo de 5 horas de telescopio"). El patrón correcto itera `for item in response.output: if item.type == "function_call": ...` procesando cada uno antes de enviar todos los `FunctionCallOutput` de vuelta.

---

### Q1112
**¿Qué formato deben tener los `arguments` de un `function_call` antes de poder usarlos como `**kwargs` de tu función Python?**

A) Ya vienen como un diccionario Python nativo
B) Vienen como una cadena JSON que debe parsearse con `json.loads(item.arguments)` antes de desempaquetarla ✅
C) Vienen codificados en base64
D) Vienen como XML según el estándar SOAP

**Explicación:** `item.arguments` es una cadena de texto en formato JSON. El patrón típico es `kwargs = json.loads(item.arguments)` y luego `resultado = mi_funcion(**kwargs)`.

---

### Q1113
**TRAMPA: ¿Cuál es el error en este código, que un desarrollador escribió creyendo que ya maneja correctamente el `function_call`?
```python
for item in response.output:
    if item.type == "function_call":
        args = json.loads(item.arguments)
        resultado = recent_snowfall(**args)
        print(resultado)  # el desarrollador cree que con esto ya terminó

# el desarrollador espera a que el agente genere la respuesta final
print(response.output_text)
```**

A) No hay ningún error, el flujo es correcto
B) Falta enviar el resultado de vuelta al agente como `FunctionCallOutput` en una nueva llamada a `responses.create()`; imprimirlo en consola no se lo comunica al modelo ✅
C) El error es usar `print()` en vez de `logging`
D) El error es que las funciones no deben ejecutarse nunca del lado del cliente

**Explicación:** El agente no "ve" la consola del desarrollador. Sin reenviar el resultado como `FunctionCallOutput(call_id=..., output=...)` en una nueva llamada a `responses.create()` (típicamente con `previous_response_id`), el agente nunca recibe el dato y no puede generar una respuesta final fundamentada en él.

---

### Q1114
**¿Qué ventaja aporta Azure Logic Apps como opción de integración mencionada junto a las herramientas personalizadas?**

A) Ejecuta modelos de lenguaje más grandes que GPT-4.1
B) Ofrece soluciones de código bajo o sin código para conectar flujos de trabajo, datos y servicios sin escribir una función personalizada completa ✅
C) Sustituye por completo al SDK de Azure AI Projects
D) Permite desplegar el agente sin necesidad de un proyecto de Foundry

**Explicación:** Azure Logic Apps se menciona como una vía complementaria de bajo código/sin código para conectar el agente con flujos de trabajo y servicios externos, útil cuando no se quiere (o no se puede) escribir una Azure Function o una especificación OpenAPI completa.

---

### Q1115
**En el escenario de negocio del módulo (atención al cliente en retail), ¿cuál es el beneficio principal de usar herramientas personalizadas en vez de solo las herramientas integradas (code_interpreter, file_search, web_search)?**

A) Las herramientas personalizadas son más baratas en todos los casos
B) Permiten que el agente ejecute acciones específicas del negocio (p. ej. buscar pedidos de un cliente en un sistema propio) que ninguna herramienta integrada puede realizar por sí sola ✅
C) Eliminan la necesidad de definir `instructions` en el agente
D) Solo funcionan si el agente usa el modelo `gpt-4.1`

**Explicación:** Las herramientas integradas cubren tareas genéricas (ejecutar código, buscar en documentos, buscar en la web). Cuando la tarea requiere lógica o datos propios de la empresa (consultar pedidos, calcular costos internos, invocar una API de terceros), se necesita una herramienta personalizada basada en código propio, Azure Functions o una especificación OpenAPI.

---

### Q1116
**¿Qué representa el parámetro `description` dentro de la definición de un `FunctionTool`, y por qué es tan importante como el esquema de `parameters`?**

A) Es solo un comentario decorativo que el SDK ignora en tiempo de ejecución
B) Es el texto que el modelo usa para decidir SI y CUÁNDO llamar a esa función frente a otras disponibles; una descripción ambigua produce invocaciones incorrectas o nulas ✅
C) Determina el límite de tokens de la respuesta de la función
D) Define el nombre que verá el usuario final en la interfaz de chat

**Explicación:** Dado que la selección de herramientas es declarativa (el modelo decide), la calidad de `name` y `description` es determinante: descripciones vagas o ambiguas hacen que el agente no sepa cuándo usar la herramienta, o confunda dos herramientas similares.

---

### Q1117
**¿Qué combinación de clases se usa para crear la definición completa de un agente con herramientas personalizadas antes de llamar a `create_version`?**

A) `PromptAgentDefinition(model=, instructions=, tools=[...])` ✅
B) `AgentConfig(model=, system_prompt=, functions=[...])`
C) `ChatCompletion(model=, messages=[...], tools=[...])`
D) `AssistantDefinition(engine=, prompt=, plugins=[...])`

**Explicación:** `PromptAgentDefinition` agrupa `model`, `instructions` y la lista `tools` (que puede mezclar `FunctionTool`, `AzureFunctionTool`, `OpenApiTool`, etc.). Esta definición se pasa a `project_client.agents.create_version(agent_name=, definition=...)`.

---

### Q1118
**TRAMPA: Un candidato al examen asume que como estudió mucha teoría sobre RAG, Responsible AI y arquitectura de agentes, puede saltarse la práctica de código de function calling porque "en el examen AI-103 solo preguntan conceptos". ¿Por qué esta suposición es peligrosa?**

A) Porque el examen es 100% teórico y no hay ninguna pregunta sobre código
B) Porque una parte significativa de las preguntas de Domain 2 presentan fragmentos de código reales (nombres de parámetros, clases del SDK, orden de pasos) y evalúan si sabes identificar qué falta, qué sobra o qué está mal, no solo definiciones ✅
C) Porque el examen requiere escribir código en un editor en vivo
D) Porque las preguntas de código valen el doble de puntos que las de teoría

**Explicación:** Muchas personas no aprueban AI-103 precisamente por subestimar el peso del código: el examen incluye preguntas que muestran un fragmento (parámetros de `FunctionTool`, bindings de `AzureFunctionTool`, el flujo `call_id` → `FunctionCallOutput`, etc.) y piden identificar el error o completar el paso correcto. Dominar solo la teoría conceptual sin practicar los patrones de código reales es una de las causas más comunes de reprobar.

---

### Q1119
**¿Qué sucede si registras un `FunctionTool` en el agente pero tu código cliente nunca implementa el manejo de `item.type == "function_call"` en `response.output`?**

A) El SDK lanza una excepción en tiempo de creación del agente
B) El agente puede seguir generando `function_call` cuando el prompt lo amerite, pero como nadie los procesa ni devuelve un resultado, la conversación queda incompleta o el agente responde sin la información real que necesitaba ✅
C) La función se ejecuta automáticamente en la nube de Azure sin intervención del cliente
D) Foundry rechaza el registro de la herramienta por falta de un manejador

**Explicación:** El registro de la herramienta y la ejecución del manejo del lado cliente son pasos independientes. Si falta el segundo, el agente seguirá "queriendo" invocar la función (porque así lo decidió el modelo), pero el ciclo function_call → resultado nunca se completa, y el usuario obtiene una respuesta sin la información esperada o el flujo se queda colgado esperando el `function_call_output`.

---
