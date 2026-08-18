# AI-103 EXTRA FLASHCARDS
## Repaso rápido P/R de los módulos de agentes añadidos (2026-08-18)
### Fuente: BANCO PARTE10-18 (herramientas personalizadas, MCP, Foundry IQ, M365/Work IQ, Agent Workflows, Agent Framework, orquestación multiagente, A2A, Foundry Portal/VS Code)

---

## Domain 2

**Q101:** ¿Quién ejecuta realmente el código de una función cuando un agente usa `function_calling`?
**A:** El cliente (tu app): el agente solo devuelve un `function_call` con nombre y argumentos; tú ejecutas la función y devuelves el resultado.

**Q102:** ¿Qué combinación de JSON Schema impide que el modelo invente parámetros fuera del esquema?
**A:** `additionalProperties: False` junto con `strict=True`.

**Q103:** ¿Qué campo de un item `function_call` usas para emparejar con el `FunctionCallOutput`?
**A:** `item.call_id`.

**Q104:** ¿Qué parámetro encadena una nueva respuesta a la anterior sin reenviar todo el historial?
**A:** `previous_response_id=response.id`.

**Q105:** ¿Cómo se comunica realmente `AzureFunctionTool` con la función (no es HTTP directo)?
**A:** Mediante colas de Storage (`AzureFunctionStorageQueue`): un `input_binding` y un `output_binding`.

**Q106:** ¿Cuántos tipos de autenticación admite `OpenApiTool`?
**A:** Tres: anónima, clave de API e identidad administrada.

**Q107:** ¿Qué hace `jsonref.loads()` al cargar una especificación OpenAPI, a diferencia de `json.loads()`?
**A:** Resuelve automáticamente las referencias `$ref` que reutilizan esquemas.

**Q108:** ¿Qué método limpia una versión de agente creada en un script de prueba?
**A:** `project_client.agents.delete_version(agent_name=, agent_version=)`.

**Q109:** ¿Por qué se describe la integración de herramientas personalizadas como "declarativa"?
**A:** El agente decide cuándo y cuáles herramientas invocar según el prompt y sus descripciones, sin lógica codificada de forma dura.

**Q110:** ¿En qué formato llegan los `arguments` de un `function_call` antes de usarlos?
**A:** Como una cadena JSON — hay que hacer `json.loads(item.arguments)`.

**Q111:** Un desarrollador solo hace `print(resultado)` tras ejecutar la función y espera la respuesta del agente. ¿Qué le falta?
**A:** Reenviar el resultado como `FunctionCallOutput` en una nueva llamada a `responses.create()` — imprimir en consola no se lo comunica al modelo.

**Q112:** ¿Qué clase agrupa `model`, `instructions` y `tools` antes de llamar a `create_version`?
**A:** `PromptAgentDefinition`.

**Q113:** ¿Qué método usa un cliente MCP para obtener la lista de herramientas de un servidor?
**A:** `await session.list_tools()`.

**Q114:** ¿Qué línea arranca un servidor `FastMCP` y por qué lleva ese parámetro?
**A:** `mcp.run(show_banner=False)` — evita que un banner en stdout corrompa el protocolo JSON-RPC del transporte stdio.

**Q115:** ¿Qué llamada es obligatoria en una `ClientSession` MCP antes de listar o invocar herramientas?
**A:** `await session.initialize()`.

**Q116:** ¿Cuál es la diferencia entre `MCPTool` nativo y el patrón manual `FastMCP` + `ClientSession`?
**A:** `MCPTool` conecta directo a un servidor MCP remoto sin sesión manual; el patrón manual es necesario cuando hospedas tu propio servidor.

**Q117:** ¿Qué objeto se envía de vuelta para aprobar una `mcp_approval_request` pendiente?
**A:** `McpApprovalResponse(approval_request_id=item.id, approve=True/False)`.

**Q118:** ¿Qué parámetro de `MCPTool` restringe qué herramientas concretas puede usar el agente?
**A:** `allowed_tools`.

**Q119:** ¿Cómo se pasan credenciales a un servidor MCP remoto que las requiere, usando `MCPTool`?
**A:** Con encabezados personalizados vía `update_headers`.

**Q120:** ¿Cuál es la diferencia fundamental entre `OpenApiTool` y MCP?
**A:** `OpenApiTool` describe una API fija en tiempo de diseño; MCP permite descubrimiento dinámico en tiempo de ejecución sin redeployar el agente.

**Q121:** ¿Cuáles son los tres pasos coordinados del proceso RAG?
**A:** Retrieve (recuperar), Augment (aumentar el prompt con ese contenido) y Generate (generar la respuesta).

**Q122:** ¿Qué es Foundry IQ, en una frase?
**A:** Una plataforma de conocimiento administrada sobre Azure AI Search para crear bases de conocimiento compartidas y reutilizables por varios agentes.

**Q123:** ¿Cuáles son los seis tipos de origen de datos que admite Foundry IQ?
**A:** Índice de Azure AI Search, Azure Blob Storage, la Web (vía Bing), SharePoint remoto, SharePoint indexado y OneLake.

**Q124:** Diferencia entre "SharePoint remoto" y "SharePoint indexado" como origen de Foundry IQ.
**A:** Remoto consulta en tiempo real (siempre actual, sin mantenimiento); Indexado preprocesa en Azure AI Search (más rápido y con búsqueda avanzada, pero depende del reindexado).

**Q125:** ¿Cómo expone Foundry IQ una base de conocimiento a un agente?
**A:** Como un servidor MCP más — el agente se conecta con el mismo `MCPTool(server_label=, server_url=.../knowledgebases/<nombre>/mcp)`.

**Q126:** ¿Cuáles son las cuatro características que debe tener una respuesta "correcta" con Foundry IQ?
**A:** Grounding (viene de la base de conocimiento), Cita, Relevancia e Integridad.

**Q127:** ¿Para qué sirven los "scoring profiles" (perfiles de puntuación) de Azure AI Search?
**A:** Priorizar campos/atributos específicos para que los resultados más relevantes aparezcan primero en el ranking.

**Q128:** ¿Qué cuatro tipos de consulta se recomienda usar para probar la recuperación de un agente antes de producción?
**A:** Fácticas simples, que requieren síntesis entre varios documentos, fuera de alcance, y ambiguas.

**Q129:** ¿Cuál es el ciclo automático de Foundry IQ al conectar un nuevo origen de datos?
**A:** Detección → Procesamiento (fragmentar e incrustar) → Indexación → Supervisión (reindexado automático ante cambios).

**Q130:** Al configurar una base de conocimiento, ¿qué dos modelos distintos se seleccionan?
**A:** Un modelo de embeddings (p. ej. `text-embedding-3-small`) para vectorizar, y un modelo de chat completions (p. ej. `gpt-5`) para generar la respuesta.

**Q131:** ¿Qué recurso de Azure crea el portal de Foundry al publicar un agente en Microsoft Teams?
**A:** Azure Bot Service.

**Q132:** Diferencia entre el ámbito "compartido" y el ámbito "de organización" al publicar en Microsoft 365.
**A:** Compartido está disponible de inmediato bajo "Sus agentes"; de organización requiere aprobación de un administrador del tenant.

**Q133:** Una herramienta `file_search` funciona en el área de juegos pero falla con errores de permisos tras publicarse en Teams. ¿Por qué?
**A:** El agente publicado recibe una identidad de Microsoft Entra distinta e independiente; hay que reasignarle los roles RBAC correspondientes.

**Q134:** ¿Qué es Microsoft Work IQ, en una frase?
**A:** Una CLI y un servidor MCP que conecta agentes de IA a los datos de Microsoft 365 Copilot (correos, reuniones, documentos, Teams).

**Q135:** ¿Cuál es la diferencia clave entre Work IQ y Foundry IQ?
**A:** Work IQ conecta con datos del área de trabajo (lo que la gente realmente hace y dice); Foundry IQ conecta con bases de conocimiento oficiales documentadas.

**Q136:** ¿Qué requisito organizacional es obligatorio antes de usar Work IQ contra un tenant?
**A:** Una licencia de Microsoft 365 Copilot y el consentimiento del administrador de Entra ID.

**Q137:** ¿Qué modelo de seguridad sigue Work IQ al acceder a datos de Microsoft 365?
**A:** Acceso basado en los permisos que el usuario autenticado ya tiene vía Microsoft Graph, sin almacenar los datos.

**Q138:** ¿Qué comando acepta el EULA de Work IQ antes del primer uso?
**A:** `workiq accept-eula`.

**Q139:** ¿Cuáles son los tres patrones de flujo de trabajo predefinidos en Microsoft Foundry?
**A:** Secuencial, human-in-the-loop y chat de grupo.

**Q140:** ¿Qué tipo de nodo procesa cada elemento de una lista sin duplicar la lógica del flujo de trabajo?
**A:** Un nodo `For each`.

**Q141:** ¿Cuáles son las cuatro categorías principales de nodos en el generador de flujos de trabajo de Foundry?
**A:** Invoke, Flujo, Transformación de datos y Chat básico (más el nodo End).

**Q142:** ¿Qué fórmula de Power Fx comprueba si una variable o entrada está vacía?
**A:** `IsBlank()`.

**Q143:** ¿Qué función de Power Fx aplica una fórmula a cada elemento de una lista o tabla?
**A:** `ForAll(tabla, fórmula)`.

**Q144:** ¿Cómo se invoca un flujo de trabajo (creado visualmente) desde código?
**A:** Igual que un agente individual: `extra_body={"agent_reference": {"name": workflow_name, "type": "agent_reference"}}`.

**Q145:** Diferencia práctica entre el evento `response.completed` y `response.output_item.done` con `WORKFLOW_ACTION`.
**A:** `response.completed` se dispara una vez al final; `response.output_item.done` se dispara por cada acción intermedia del flujo (progreso en tiempo real).

**Q146:** ¿Qué sucede automáticamente cada vez que se guarda un flujo de trabajo en el portal de Foundry?
**A:** Se crea una nueva versión inmutable, permitiendo revertir cambios.

**Q147:** ¿Qué es Microsoft Agent Framework, según el propio módulo?
**A:** La "próxima generación" unificada de Semantic Kernel y AutoGen, con orquestación multiagente basada en grafos.

**Q148:** ¿Qué proveedores admiten historial de chat del lado del servicio (persistente) en Agent Framework?
**A:** Foundry Agent Service, Azure OpenAI Responses y OpenAI Responses.

**Q149:** ¿Qué dos enfoques admite Agent Framework para describir una función Python al modelo?
**A:** Anotaciones de tipo `Annotated` (con la docstring como descripción) y el decorador `@tool`.

**Q150:** ¿Qué indica `approval_mode="never_require"` en el decorador `@tool`?
**A:** Que esa herramienta se ejecuta sin pedir aprobación humana antes de invocarse.

**Q151:** ¿Qué debe devolver una herramienta personalizada ante una entrada inesperada o un fallo, en vez de lanzar una excepción?
**A:** Un mensaje de error informativo que el modelo pueda usar para responder al usuario.

**Q152:** ¿Qué propiedad expone el texto final de la respuesta del agente, tanto en modo streaming como sin streaming?
**A:** `.text`.

**Q153:** ¿Qué tres datos mínimos requiere construir un `FoundryChatClient`?
**A:** `project_endpoint`, `model` (nombre de la implementación) y `credential`.

**Q154:** ¿Qué es el "middleware" en Agent Framework?
**A:** Hooks que interceptan, registran o modifican las acciones del agente antes y después de ejecutarse.

**Q155:** ¿Qué ofrece la "orquestación de flujo de trabajo" de Agent Framework?
**A:** Flujos basados en grafos: patrones secuencial, concurrente, de chat en grupo y de handoff entre agentes.

**Q156:** ¿Cuáles son los cinco patrones de orquestación multiagente del SDK de Agent Framework?
**A:** Concurrent (simultáneo), secuencial, handoff (entrega), chat en grupo y magentic.

**Q157:** ¿Cuándo conviene usar orquestación secuencial en vez de simultánea?
**A:** Cuando los pasos deben ejecutarse en un orden específico y cada uno depende de la salida del anterior.

**Q158:** ¿Es obligatorio combinar las salidas de todos los agentes en la orquestación simultánea (concurrent)?
**A:** No — cada agente puede producir un resultado independiente sin que se fusionen las salidas.

**Q159:** ¿Cuándo es más apropiado el patrón de "entrega" (handoff) que el secuencial?
**A:** Cuando el mejor agente para continuar no se conoce de antemano y se aclara sobre la marcha.

**Q160:** ¿Qué mecanismo enruta la tarea al agente adecuado en el patrón handoff?
**A:** Un edge group `switch-case`, siempre con un caso predeterminado (default) obligatorio.

**Q161:** ¿Cuál es el límite práctico de agentes recomendado para la orquestación de chat en grupo?
**A:** Tres o menos — más complica demasiado la administración del flujo de conversación.

**Q162:** ¿En qué orden real invoca el chat manager los cuatro métodos de `GroupChatManager` en cada ronda?
**A:** `should_request_user_input` → `should_terminate` → `filter_results` → `select_next_agent`.

**Q163:** ¿Qué es un bucle "maker-checker" en una orquestación de chat en grupo?
**A:** Un agente propone contenido (maker) y otro lo revisa y critica (checker), repitiendo el ciclo hasta un resultado satisfactorio.

**Q164:** ¿Qué mantiene el administrador de la orquestación magnética para planear dinámicamente?
**A:** Un "task ledger" (libro de tareas) con objetivos, subobjetivos y plan de ejecución.

**Q165:** ¿Cuándo debería evitarse el patrón de orquestación magnética?
**A:** Cuando la ruta de solución es fija/determinista, la velocidad es prioritaria, o la tarea es simple.

**Q166:** ¿Qué son los "ejecutores" (executors) dentro de un flujo de trabajo de Agent Framework?
**A:** Los trabajadores del flujo: pueden representar tanto agentes de IA como componentes de lógica personalizada.

**Q167:** ¿Qué tipo de edge (borde) envía un mensaje a varios ejecutores en paralelo?
**A:** Fan-Out (el opuesto, Fan-In, combina varios mensajes en uno).

**Q168:** ¿Qué garantiza el parámetro `output_from="all"` en `SequentialBuilder`?
**A:** Que se recopilen las salidas de TODOS los agentes participantes, no solo la del último.

**Q169:** ¿Qué es el protocolo Agent-to-Agent (A2A), en una frase?
**A:** Una forma estandarizada de que agentes de IA (incluso de distintas plataformas) se comuniquen, compartan contexto e invoquen las funcionalidades de otros.

**Q170:** ¿Cuál es la diferencia conceptual clave entre MCP y A2A?
**A:** MCP conecta un agente con herramientas/datos externos; A2A conecta un agente con OTRO agente como par, y cada uno puede elegir su propio LLM.

**Q171:** ¿Qué es una "aptitud del agente" (`AgentSkill`) en A2A?
**A:** Un bloque que describe una función específica que el agente puede realizar (id, name, description, tags, examples, modos de E/S).

**Q172:** ¿Qué es la "tarjeta del agente" (`AgentCard`) y para qué sirve?
**A:** Un documento estructurado con identidad, endpoint, capacidades y aptitudes — el mecanismo central de descubrimiento de A2A.

**Q173:** ¿En qué endpoint estándar se expone la tarjeta del agente para descubrimiento automático?
**A:** `/.well-known/agent-card.json`.

**Q174:** ¿Cuáles son los tres componentes esenciales para hospedar un servidor de agente A2A?
**A:** La tarjeta del agente, el controlador de solicitudes (con un `TaskStore`), y la aplicación de servidor (Starlette + Uvicorn).

**Q175:** ¿Qué dos operaciones debe implementar la interfaz `AgentExecutor`?
**A:** `execute` (procesa la solicitud) y `cancel` (controla la cancelación de una tarea en curso).

**Q176:** ¿Qué dos objetos usa el executor de A2A para entender la solicitud y comunicar resultados?
**A:** `RequestContext` (solicitud entrante) y `EventQueue` (resultados/eventos de vuelta).

**Q177:** Diferencia entre "mensajes directos" y "respuestas basadas en tareas" en A2A.
**A:** Directos son salidas inmediatas; basadas en tareas representan trabajo en curso que puede requerir llamadas de seguimiento.

**Q178:** ¿Qué comunica el patrón `TaskUpdater` (`update_status` / `complete`) en el ejecutor A2A?
**A:** El progreso de la tarea en tiempo real y la señal explícita de finalización con el resultado.

---

## Domain 1

**Q179:** ¿Cuáles son los dos tipos principales de agente que admite Microsoft Foundry?
**A:** Agentes declarativos (por configuración: basados en mensajes o de flujo de trabajo) y agentes hospedados (código propio en contenedores).

**Q180:** ¿Qué rango de `temperature` recomienda el módulo para agentes empresariales de tareas estructuradas?
**A:** Entre 0.3 y 0.7.

**Q181:** ¿Cuál es la diferencia clave entre "implementar" (deploy) y "publicar" (publish) un agente en Foundry?
**A:** Implementar deja el agente dentro del proyecto para pruebas; publicar crea un recurso de Azure independiente con su propia URL, identidad de Entra y directiva de autenticación.

**Q182:** ¿Qué tipo de autenticación admite el endpoint de una aplicación de agente publicada?
**A:** Solo identidad de Microsoft Entra (rol "Usuario de Azure AI") — NO admite clave de API.

**Q183:** ¿El endpoint de una aplicación de agente publicada mantiene el historial de conversación automáticamente?
**A:** No — es sin estado (stateless); el cliente debe gestionar y reenviar el historial por su cuenta.

**Q184:** Al publicar una nueva versión de un agente, ¿cambia la URL del endpoint?
**A:** No — la URL permanece igual y el 100% del tráfico enruta automáticamente a la nueva versión.

**Q185:** ¿Qué header y qué comando se usan para probar manualmente un endpoint de agente publicado con `curl`?
**A:** `Authorization: Bearer <token>`, obtenido con `az account get-access-token --resource https://ai.azure.com`.

**Q186:** ¿Cuáles son las tres categorías del catálogo de herramientas de Foundry?
**A:** Configuradas (integradas listas para usar), Catálogo (incluye servidores MCP) y Personalizado (OpenAPI o implementación propia).

**Q187:** ¿Cuáles son los tres tipos de servidores MCP que admite el catálogo de herramientas de Foundry?
**A:** Remotos (producción), locales (desarrollo/pruebas) y personalizados.

**Q188:** ¿Qué recursos mínimos de Azure se necesitan para desarrollar agentes con Foundry, sea vía portal o VS Code?
**A:** Un proyecto de Microsoft Foundry y al menos una implementación de modelo de IA (p. ej. GPT-4.1).

**Q189:** Un agente `it-support-agent` ya creado en el portal se recupera con `project_client.agents.get(agent_name=agent_name)`. ¿Por qué el código no vuelve a definir `instructions` ni `tools`?
**A:** Porque el agente ya fue configurado visualmente en el portal; el script solo necesita recuperarlo por nombre, no redefinirlo.

**Q190:** ¿Qué recomienda el módulo como buena práctica al elegir entre una herramienta integrada y construir una integración personalizada?
**A:** Empezar con herramientas integradas (probadas y mantenidas) antes de crear soluciones personalizadas.

**Q191:** En producción, ¿qué debe implementar una aplicación cliente frente a errores transitorios y límites de velocidad de un agente publicado?
**A:** Reintentos con retroceso exponencial, manejo de rate limiting, y validación de entradas antes de enviarlas.

---
