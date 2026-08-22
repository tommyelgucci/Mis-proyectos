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

## Domain 3

**Q192:** ¿Orden recomendado de las estrategias de optimización?
**A:** Prompt Engineering → RAG → Fine-Tuning → Combinar si aún falta consistencia.

**Q193:** ¿Se pueden ajustar `temperature` y `top_p` juntos en la misma llamada?
**A:** Nunca — la regla de oro es ajustar solo uno de los dos.

**Q194:** ¿Frase clave que activa Chain-of-Thought de forma confiable?
**A:** "Take a step-by-step approach".

**Q195:** ¿Qué tipo de búsqueda de Azure AI Search se recomienda para aplicaciones de Gen AI?
**A:** Híbrida (Keywords + Vectorial combinados).

**Q196:** ¿Qué NO aprende bien el Fine-Tuning, y qué se usa en su lugar?
**A:** Hechos nuevos o datos que cambian seguido — para eso se usa RAG.

**Q197:** ¿Qué es LoRA (Low-Rank Adaptation)?
**A:** Congela el modelo base y entrena solo una matriz pequeña adicional, mucho más barato que ajustar todos los pesos.

---

## Domain 4

**Q198:** ¿Orden correcto de las cuatro fases de IA Responsable?
**A:** IDENTIFY → MEASURE → MITIGATE → MANAGE.

**Q199:** ¿Estándar internacional de referencia para gestión de riesgo de IA?
**A:** NIST AI RMF.

**Q200:** ¿A qué capa de mitigación corresponde Fine-Tuning?
**A:** Capa 1 (Modelo) — modifica el modelo mismo.

**Q201:** ¿A qué capa de mitigación corresponde Azure AI Content Safety?
**A:** Capa 2 (Seguridad) — filtra externamente, sin tocar el modelo.

**Q202:** ¿Cuáles son las cuatro categorías que evalúa Content Safety?
**A:** Hate, Sexual, Violence y Self-Harm.

**Q203:** ¿Un threshold `LOW` en Content Safety bloquea más o menos contenido?
**A:** MÁS — `LOW` significa máxima sensibilidad, no "poca protección".

**Q204:** ¿Orden correcto de un Phased Rollout?
**A:** Beta (5-10%) → Early Adopters (25-50%) → Full (100%) — nunca lanzar directo al 100%.

**Q205:** ¿Qué es un AI Impact Assessment, y qué NO es?
**A:** Documenta propósito y daños potenciales del sistema; NO es un documento de defensa legal ni un presupuesto de costos.

---

## Domain 4 (real)

**Q247:** ¿Límite de caracteres por documento y de elementos por colección en la API de detección de idioma?
**A:** Menos de 5120 caracteres por documento; máximo 1000 elementos por colección.

**Q248:** ¿Qué devuelve `recognize_pii_entities` además de las entidades detectadas?
**A:** `redacted_text` — el documento con la información sensible reemplazada por asteriscos.

**Q249:** ¿Qué exponen los servidores MCP a un agente de IA?
**A:** Un catálogo de herramientas (con descripciones) que el agente descubre y llama dinámicamente en tiempo de ejecución.

**Q250:** ¿Cómo se especifica a qué agente de Foundry se dirige una llamada con la API de respuestas de OpenAI?
**A:** Con `agent_reference` dentro de `extra_body`, indicando el `name` del agente.

**Q251:** ¿Qué credencial usa la autenticación basada en claves al conectar el servidor MCP de lenguaje a un agente?
**A:** `Ocp-Apim-Subscription-Key`, con la clave del proyecto de Foundry.

**Q252:** ¿Qué capacidad expone el servidor MCP de lenguaje además de idioma/NER/PII?
**A:** Text Analytics for Health — extrae entidades médicas (diagnósticos, medicamentos) de texto clínico.

**Q253:** ¿Qué familias de modelos usa `client.audio.transcriptions.create()` vs `client.audio.speech...create()` del SDK de OpenAI en Foundry?
**A:** `gpt-4o(-mini)-transcribe` para voz→texto; `gpt-4o(-mini)-tts` para texto→voz.

**Q254:** ¿Qué SDK/paquete usa Azure Speech en Foundry Tools, distinto del SDK de OpenAI?
**A:** `azure-cognitiveservices-speech`, con `SpeechConfig`/`SpeechRecognizer`/`SpeechSynthesizer`.

**Q255:** ¿Qué valor de `Reason` indica que el audio se procesó bien pero no había voz reconocible (no es error)?
**A:** `NoMatch` (distinto de `Canceled`, que sí es un error real).

**Q256:** ¿Qué objeto define el origen/destino del stream de audio (archivo vs micrófono/altavoz por defecto)?
**A:** `AudioConfig`.

**Q257:** ¿Qué propiedad de `SpeechConfig` cambia la voz usada en la síntesis?
**A:** `speech_synthesis_voice_name`.

**Q258:** ¿Qué método envía una descripción SSML (en vez de texto plano) al `SpeechSynthesizer`?
**A:** `speak_ssml_async()`.

**Q259:** ¿Por qué el servidor MCP de Voz de Azure requiere una cuenta de Azure Storage, a diferencia del servidor MCP de lenguaje?
**A:** Trabaja con archivos de audio binarios (no texto); necesita un contenedor de blobs para guardar/leer ese audio.

**Q260:** ¿Qué dos credenciales se configuran al conectar el servidor MCP de Voz vía portal de Foundry?
**A:** `Ocp-Apim-Subscription-Key` (clave del proyecto) y `X-Blob-Container-Url` (URL de SAS del contenedor).

**Q261:** ¿Qué transporte usa Voice Live API para comunicación en tiempo real, y por qué no HTTP tradicional?
**A:** WebSocket — mantiene una conexión bidireccional persistente de baja latencia para diálogo voz-a-voz.

**Q262:** ¿Qué evento de servidor de Voice Live debe manejar el cliente para detener la reproducción cuando el usuario interrumpe?
**A:** `ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED`.

**Q263:** ¿Qué protocolo usa Voice Live específicamente para el streaming de avatares (distinto del WebSocket de la sesión)?
**A:** WebRTC.

**Q264:** ¿Qué distingue arquitectónicamente a Voice Live de los modelos de voz generativos (SDK OpenAI) y el Azure Speech SDK clásico?
**A:** Es una sesión continua en tiempo real (WebSocket, VAD, interrupciones); los otros son solicitud-respuesta discreta.

**Q265:** ¿Cuál es la diferencia entre `translate()` y `transliterate()` en Azure Translator?
**A:** `translate` cambia el idioma/significado; `transliterate` cambia solo el sistema de escritura (mismo idioma).

**Q266:** ¿Qué limitación tiene la síntesis basada en eventos (`synthesizing` + `GetAudio()`) al traducir voz a voz?
**A:** Solo funciona para traducción 1:1 (un único idioma de destino), no para varios idiomas simultáneos.

**Q267:** ¿Qué objeto del SDK de Voz de Azure especifica los idiomas a los que se traduce la voz?
**A:** `SpeechTranslationConfig`.

**Q268:** ¿Qué tipo de dato es `translation_results.translations` al traducir voz a varios idiomas?
**A:** Un diccionario indexado por código de idioma de destino.

---

## Domain 1 (real)

**Q206:** ¿Valor de `--kind` para crear un Foundry Resource?
**A:** `AIServices`.

**Q207:** ¿Flag de `az cognitiveservices account create` para permitir múltiples proyectos?
**A:** `--allow-project-management`.

**Q208:** ¿Rol de Foundry para uso diario en un proyecto (llamar modelos, crear agentes)?
**A:** Foundry User (antes "Azure AI User").

**Q209:** ¿Rol de Foundry para crear proyectos nuevos?
**A:** Foundry Account Owner.

**Q210:** ¿Método de autenticación recomendado en producción?
**A:** Microsoft Entra ID + Managed Identity — sin secretos que gestionar ni rotar.

**Q211:** ¿Cuándo usar un SAS Token en vez de Entra ID o API Key?
**A:** Para acceso temporal y delegado a un recurso específico (p. ej. un blob de Storage), con expiración definida.

**Q212:** ¿Cómo se comparte infraestructura entre equipos dentro de Foundry?
**A:** Varios proyectos alojados sobre el mismo Foundry Resource, compartiendo red e identidad administrada.

**Q269:** ¿Las cinco categorías de funcionalidades de IA a identificar al planear una solución?
**A:** IA generativa/agentes, NLP, voz, Computer Vision, y extracción de información.

**Q270:** ¿Qué distingue a Content Understanding del resto de Foundry Tools?
**A:** Es la única multimodal: extrae datos de formularios, documentos, imágenes, video y audio combinados.

**Q271:** ¿Cómo se llamaban antes las Foundry Tools?
**A:** Antes "Azure AI Services", y antes de eso "Azure Cognitive Services" — mismo servicio, nombres históricos distintos.

**Q272:** ¿Qué extensión de VS Code se usa para administrar recursos de un proyecto Foundry?
**A:** Foundry Toolkit para Visual Studio Code.

**Q273:** ¿Qué mide el índice de calidad al comparar modelos en el catálogo de Foundry?
**A:** Precisión/coherencia de las respuestas en pruebas comparativas (benchmarks), no velocidad ni costo.

**Q274:** ¿Qué indica el benchmark de Throughput?
**A:** Qué tan rápido el modelo procesa solicitudes y devuelve respuestas completas (tokens/segundo).

**Q275:** ¿Qué distingue a WMDP como benchmark de seguridad?
**A:** Al revés que otros benchmarks de seguridad: un valor MÁS ALTO indica MÁS conocimiento peligroso, es decir, mayor riesgo — no mayor seguridad.

**Q276:** ¿Qué tipo de implementación de Foundry ofrece la cuota más alta para uso general?
**A:** Estándar global (Global Standard).

**Q277:** ¿Qué métrica de evaluación de generación mide la exactitud lingüística del texto producido?
**A:** Fluidez — distinta de Relevancia (si responde la pregunta) y Coherencia (si las ideas fluyen lógicamente).

**Q278:** ¿Los tres orígenes posibles de un dataset al configurar una evaluación en Foundry?
**A:** Subir un archivo (CSV/JSONL), usar un dataset existente, o generarlo sintéticamente (modelo generador + cantidad de filas + prompt descriptivo).

**Q279:** ¿Qué controla un Microsoft Foundry Hub que los proyectos conectados NO pueden deshabilitar?
**A:** La línea base de seguridad: puntos de conexión privados, identidades administradas obligatorias y cifrado en reposo.

**Q280:** ¿Qué tres servicios integra la arquitectura de seguridad de un Foundry Hub?
**A:** Microsoft Entra ID (RBAC), Azure Virtual Network (puntos de conexión privados) y Azure Key Vault.

**Q281:** ¿Las cuatro categorías de daño del filtrado de contenido de Azure OpenAI?
**A:** Odio, sexual, violencia y autolesión — cada una con umbral de gravedad configurable (bajo/medio/alto).

**Q282:** ¿Qué detecta Microsoft Defender para Contenedores en Azure Container Registry, y qué NO detecta la confianza de contenido (Content Trust)?
**A:** Defender detecta CVE (vulnerabilidades de software) en cada capa de la imagen; Content Trust solo verifica firma/integridad, no analiza vulnerabilidades.

**Q283:** ¿Diferencia entre roles RBAC de ACR (AcrPush/AcrPull/AcrDelete) y tokens con ámbito de repositorio?
**A:** Los roles RBAC dan acceso a todo el registro; los tokens con ámbito de repositorio limitan el acceso a repositorios específicos.

**Q284:** ¿Qué rol de Key Vault otorga exactamente `get`, `wrapKey`, `unwrapKey` para que un recurso de Foundry use una CMK?
**A:** Key Vault Crypto Service Encryption User.

**Q285:** ¿Tres requisitos de Key Vault para usar claves administradas por el cliente (CMK) en Foundry?
**A:** Mismo región/tenant que el Hub, protección contra purga habilitada, y solo claves RSA o RSA-HSM de 2048 bits.

**Q286:** ¿Diferencia entre tiempo de rotación y tiempo de expiración de una clave en Key Vault?
**A:** Rotación = cuándo se genera automáticamente una nueva versión; Expiración = cuánto dura vigente cada versión antes de volverse inutilizable.

**Q287:** ¿Los tres modos de configuración del entorno de agentes de Foundry, de menor a mayor control?
**A:** Básico (almacenamiento de plataforma) → Estándar (recursos propios del cliente) → Estándar con aislamiento de red (VNet del cliente).

**Q288:** ¿Los tres modos de acceso saliente de una red virtual administrada de Foundry Hub?
**A:** Allow internet outbound (sin restricción), Allow only approved outbound (service tags/PE/FQDN — FQDN implica costo de Azure Firewall), y Disabled.

**Q289:** ¿Las cuatro categorías de daño de Azure AI Content Safety y su escala de gravedad?
**A:** Odio y equidad, sexual, violencia y autolesión — cada una de 0 (seguro) a 6 (alto riesgo).

**Q290:** ¿Se pueden deshabilitar los filtros predeterminados administrados por Microsoft en Azure OpenAI?
**A:** No — son el piso mínimo de IA responsable de Microsoft, se aplican siempre.

**Q291:** ¿Qué código HTTP devuelve Azure OpenAI cuando una solicitud/respuesta supera el umbral de gravedad configurado?
**A:** HTTP 400, con metadatos de filtrado de contenido.

**Q292:** ¿Diferencia entre filtros de contenido por categoría y escudos de aviso (Prompt Shields)?
**A:** Los filtros analizan QUÉ contiene el mensaje (odio/sexual/violencia/autolesión); los escudos detectan CÓMO se estructura un ataque (jailbreak, inyección de documentos).

**Q293:** ¿Cuántos términos admite una lista de bloqueo de Azure AI Content Safety, y qué tipos de coincidencia acepta?
**A:** Hasta 10.000 términos, con coincidencia exacta o patrones/expresiones regulares.

**Q294:** ¿Actúan las listas de bloqueo de forma dependiente de los filtros de categoría?
**A:** No — son independientes; un término bloqueado rechaza la solicitud aunque las categorías den "seguro".

**Q295:** ¿Por qué se evalúan primero las listas de bloqueo antes que los filtros de categoría?
**A:** Por rendimiento: la coincidencia exacta de cadenas es más rápida que la inferencia de ML, permitiendo rechazo rápido.

**Q296:** ¿A qué modelos está limitado el soporte de listas de bloqueo en Microsoft Foundry (ene. 2026)?
**A:** Exclusivamente a modelos de Azure OpenAI; la función está en public preview.

**Q297:** ¿Cuánta latencia añade típicamente Azure AI Content Safety a una solicitud?
**A:** 100-300 ms, imperceptible para la mayoría de apps interactivas.

**Q298:** ¿Requiere la integración de Content Safety con Azure OpenAI cambios en el código de la app cliente?
**A:** No — intercepta automáticamente el tráfico a nivel de implementación, sin importar si se usa REST, SDK o Azure OpenAI Studio.

**Q299:** ¿Los cuatro tipos de entidades de seguridad de Microsoft Entra ID?
**A:** Usuarios, grupos, entidades de servicio e identidades administradas.

**Q300:** ¿Cuándo usar una identidad administrada asignada por el usuario en vez de por el sistema?
**A:** Cuando varios recursos necesitan la misma identidad y permisos (se crea una vez y se reutiliza).

**Q301:** ¿Los tres elementos de una asignación de roles de Azure RBAC?
**A:** Entidad de seguridad (quién), definición de roles (qué) y ámbito (dónde).

**Q302:** ¿Cuándo se necesita una entidad de servicio en vez de una identidad administrada?
**A:** Al integrarse con sistemas externos a Azure (SQL Server local, Slack) que no admiten identidades administradas.

**Q303:** ¿La jerarquía de ámbitos de gobernanza de Azure, de mayor a menor?
**A:** Grupos de administración → suscripciones → grupos de recursos → recursos.

**Q304:** ¿Los cuatro efectos principales de Azure Policy?
**A:** Audit (supervisa sin bloquear), Deny (bloquea creación), DeployIfNotExists (agrega config. faltante) y Modify (cambia propiedades).

**Q305:** ¿Diferencia entre el efecto Deny y el efecto Modify de Azure Policy?
**A:** Deny bloquea recursos nuevos pero no corrige los existentes; Modify corrige tanto nuevos como existentes automáticamente.

**Q306:** ¿Qué son las iniciativas de Azure Policy?
**A:** Agrupan varias directivas relacionadas en una sola unidad asignable (ej. Azure Security Benchmark, 200+ directivas).

**Q307:** ¿Qué límite recomienda el módulo para las exenciones de Azure Policy y por qué?
**A:** Menos del 5% de los recursos y con expiración, para evitar la "desviación de la política" (excepciones que se normalizan).

**Q308:** ¿Diferencia entre los roles de Foundry "Azure AI User" y "Azure AI Project Manager"?
**A:** Azure AI User es solo lectura; Azure AI Project Manager permite compilar, desarrollar y asignar roles a nivel de proyecto.

**Q309:** ¿Endpoint y URL de IMDS para obtener un token de identidad administrada?
**A:** `http://169.254.169.254/metadata/identity/oauth2/token` — HTTP GET especificando el recurso destino.

**Q310:** ¿Cada cuánto rota Azure automáticamente el certificado de una identidad administrada asignada por el sistema?
**A:** Cada 46 días, sin intervención del equipo de operaciones.

**Q311:** ¿Qué clave de partición recomienda el módulo para un almacén de conversaciones de agente en Cosmos DB, y por qué?
**A:** `userId` — mantiene todas las conversaciones de un usuario en la misma partición, evitando consultas entre particiones.

**Q312:** ¿Qué nivel de coherencia de Cosmos DB es óptimo para conversaciones de agente de IA?
**A:** Coherencia de Sesión — el usuario ve sus propias escrituras de inmediato, sin sincronización global.

**Q313:** ¿Cómo expira Cosmos DB automáticamente documentos antiguos sin trabajos por lotes?
**A:** TTL (período de vida) a nivel de contenedor, basado en la propiedad `_ts`.

**Q314:** ¿Cuántas RU consume aproximadamente una lectura vs. una escritura en Cosmos DB?
**A:** ~1 RU por lectura; 5-10 RU por escritura, según el tamaño del documento.

**Q315:** ¿Los tres modos de configuración del entorno de agentes de Foundry Agent Service?
**A:** Básica (almacenamiento de plataforma), Estándar (recursos propios del cliente), Estándar con aislamiento de red (VNet del cliente).

**Q316:** ¿Rendimiento mínimo que debe admitir Cosmos DB en la configuración Estándar de agentes de Foundry?
**A:** 3000 RU/s (aprovisionado o sin servidor).

**Q317:** ¿Son mutables los "hosts de capacidad" (capability hosts) de Foundry tras su creación?
**A:** No — son inmutables; cambiarlos requiere eliminar y volver a aprovisionar el host.

**Q318:** ¿Está disponible el aprovisionamiento de un entorno de agente Estándar directamente desde el portal de Foundry?
**A:** No — requiere programación o plantillas de implementación (ARM/Bicep).

---

## Domain 5

**Q213:** ¿Qué extrae Document Intelligence?
**A:** Campos estructurados y tipados (fecha, monto, tabla), con su ubicación.

**Q214:** ¿Qué produce Content Understanding?
**A:** Una representación limpia (Markdown/JSON) enriquecida, pensada para RAG/agentes.

**Q215:** ¿`build_mode` de Document Intelligence para documentos con formato variable entre muestras?
**A:** `NEURAL` (vs. `TEMPLATE` para formato fijo y consistente).

**Q216:** ¿Componente de Azure AI Search que define el schema de búsqueda (qué campos existen)?
**A:** El Índice (Index).

**Q217:** ¿Componente de Azure AI Search que automatiza la ingesta de datos desde una fuente externa?
**A:** El Indexador (Indexer).

**Q241:** ¿Qué modelo de Document Intelligence usar para extraer texto/tablas de documentos con formatos muy variados, sin campos etiquetados fijos?
**A:** El modelo de diseño (Layout).

**Q242:** ¿Qué tres archivos se requieren al entrenar un modelo custom de Document Intelligence por API REST?
**A:** `ocr.json`, `fields.json` y `labels.json`, en el contenedor blob junto a los formularios de ejemplo.

**Q243:** ¿Qué usar cuando se procesan varios tipos de documento (factura, recibo) por un único endpoint que los enruta al modelo correcto?
**A:** Un modelo compuesto o un clasificador personalizado.

**Q244:** ¿Dónde coloca el indexador de Azure AI Search las imágenes extraídas de un documento de origen?
**A:** En la colección `normalized_images` del documento JSON jerárquico.

**Q245:** ¿Qué recurso necesita el indexador para usar aptitudes integradas de IA, y cuál es el límite del recurso gratuito incluido?
**A:** Un recurso de Foundry Tools; el recurso restringido gratuito limita a 20 documentos o menos.

**Q246:** ¿Cuáles son las 4 fases del procesamiento de una consulta en Azure AI Search?
**A:** Análisis de consultas → análisis léxico → recuperación de documentos → puntuación (TF/IDF).

**Q319:** ¿Las tres fases del flujo de trabajo de Azure Content Understanding?
**A:** Ingesta de contenido → análisis con IA (OCR + voz + NLU + modelos bidireccionales) → salida estructurada (JSON).

**Q320:** ¿Qué distingue al enfoque de Content Understanding frente al OCR básico?
**A:** El OCR solo extrae texto sin entender significado/relaciones; Content Understanding aplica un esquema para identificar campos y sus relaciones.

**Q321:** ¿Pueden extraerse campos con Content Understanding aunque su etiqueta en el documento difiera o falte?
**A:** Sí — los esquemas se aplican semánticamente ("Invoice No.", "Invoice #" o sin etiqueta → todos mapean a `InvoiceNumber`).

**Q322:** ¿Qué es un "analizador" (analyzer) en Content Understanding?
**A:** Una unidad que aplica un esquema de forma consistente a cada solicitud, generando resultados JSON predecibles.

**Q323:** ¿Cuatro analizadores precompilados nombrados en el módulo introductorio?
**A:** `prebuilt-invoice`, `prebuilt-imageSearch`, `prebuilt-audioSearch`, `prebuilt-videoSearch`.

**Q324:** ¿Comando para instalar el SDK de Python de Azure Content Understanding?
**A:** `python -m pip install azure-ai-contentunderstanding`.

**Q325:** ¿Es síncrono el análisis al llamar a `begin_analyze()` del SDK de Content Understanding?
**A:** No — es asíncrono; hay que sondear (`poller.result()`) hasta que el trabajo finalice.

**Q326:** ¿Qué dos propiedades expone cada elemento de `result.contents` tras el análisis?
**A:** `.markdown` (representación en Markdown) y `.fields` (campos estructurados extraídos).

**Q327:** ¿Los tres analizadores probados en el ejercicio del portal de Foundry, de menor a mayor capacidad?
**A:** Read (solo texto) → Layout (+ estructura/tablas) → Receipt (mapea valores a campos de datos).

**Q328:** Según el ejercicio, ¿qué tres operaciones describe Content Understanding al procesar contenido?
**A:** Extraer, clasificar y generar campos, con puntuaciones de confianza y fundamentación de origen.

---

## Domain 3 (real)

**Q218:** ¿Qué se necesita para procesar avisos con imágenes en Microsoft Foundry?
**A:** Un modelo multimodal (p. ej. Phi-4-multimodal-instruct, gpt-4.1).

**Q219:** ¿Cómo se incluye una imagen local (sin URL pública) en un mensaje?
**A:** Codificada en Base64 dentro de una `data:image/...;base64,...` URL.

**Q220:** ¿Patrón de tres pasos de la generación de video con Sora 2?
**A:** Crear el trabajo → sondear el estado → descargar el resultado.

**Q221:** ¿Qué duraciones admite el parámetro `seconds` de Sora 2?
**A:** Solo 4, 8 o 12 segundos (default 4).

**Q222:** ¿Qué método modifica un video existente sin regenerarlo desde cero?
**A:** `client.videos.remix(video_id=, prompt=)`.

**Q223:** ¿Qué tipo de imagen de referencia rechaza actualmente Sora 2?
**A:** Imágenes con caras humanas — usar paisajes, objetos o personajes animados.

**Q224:** ¿Límite de trabajos de video simultáneos y de disponibilidad del resultado?
**A:** Máximo 2 trabajos a la vez; el video completado expira a las 24 horas.

**Q225:** ¿Por qué tarea de inferencia se filtra en el catálogo de Foundry para encontrar modelos de generación de imágenes?
**A:** "Texto a imagen" (no "Imagen a texto" ni "Embeddings").

**Q226:** ¿En qué formato devuelve la imagen generada `client.images.generate()`?
**A:** Como cadena Base64 en `.data[0].b64_json` — hay que decodificarla con `base64.b64decode()`.

**Q227:** ¿Qué método genera una imagen nueva a partir de un prompt, a diferencia de `responses.create()`?
**A:** `client.images.generate(model=, prompt=, n=, size=)`.

**Q228:** ¿Son las imágenes generadas por estos modelos recuperadas de un catálogo?
**A:** No — son originales, creadas por el modelo a partir de sus datos de entrenamiento, no una búsqueda.

**Q229:** ¿Qué es Azure Content Understanding?
**A:** Herramienta de Foundry que usa IA generativa para extraer datos estructurados de documentos, imágenes, video y audio no estructurados.

**Q230:** ¿Cuáles son los tres métodos de extracción de un campo en un esquema de Content Understanding?
**A:** `extract` (valor literal), `classify` (categoría predefinida), `generate` (valor generado).

**Q231:** ¿Qué representa el campo `source` (anclaje/"tierra") en un resultado de Content Understanding?
**A:** Las regiones específicas del contenido donde se extrajo cada valor.

**Q232:** ¿Qué significa una puntuación de confianza de 0.9+ en Content Understanding?
**A:** El valor es confiable para procesamiento automatizado, sin necesidad de revisión humana.

**Q233:** ¿Qué analizador preconfigurado extrae proveedor y totales de un recibo de compra?
**A:** `prebuilt-receipt`.

**Q234:** ¿Qué endpoint debe usar la app cliente de Content Understanding (no el de proyecto ni el de Azure OpenAI)?
**A:** El del recurso Foundry: `https://{recurso}.services.ai.azure.com`.

**Q235:** ¿Cuáles son los 4 pasos para crear una solución de Content Understanding?
**A:** Crear recurso Foundry → definir esquema → compilar analizador → usar el analizador.

**Q236:** ¿Qué extrae el analizador precompilado `Read`, y qué añade `Layout` sobre él?
**A:** `Read` extrae texto (palabras, párrafos, fórmulas, códigos de barras); `Layout` añade tablas, figuras, estructura, hipervínculos y anotaciones.

**Q237:** ¿Qué método del SDK se usa para enviar una imagen local (sin URL pública) a analizar?
**A:** `begin_analyze_binary(analyzer_id=, binary_input=)`.

**Q238:** ¿El SDK de Content Understanding requiere escribir un bucle de sondeo manual como la API REST?
**A:** No — `poller.result()` maneja el sondeo automáticamente (patrón LROPoller).

**Q239:** ¿Qué parámetro de `begin_create_analyzer` permite sobrescribir un analizador existente con el mismo nombre?
**A:** `allow_replace=True`.

**Q240:** ¿Qué dos valores de configuración se necesitan para usar la API de Content Understanding?
**A:** El endpoint y la clave del recurso Foundry.

---
