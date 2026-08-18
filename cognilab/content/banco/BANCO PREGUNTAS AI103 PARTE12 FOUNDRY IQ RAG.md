# BANCO DE PREGUNTAS AI-103 — PARTE 12 (Q1200-Q1219)
## Domain 2/3: Tools & Optimización — Foundry IQ, RAG y bases de conocimiento
### Generado: 2026-08-18 | Fuente: módulo "Construir agentes de IA mejorados con conocimiento con Foundry IQ"

---

### Q1200
**¿Cuáles son los tres pasos coordinados del proceso RAG (Retrieval-Augmented Generation)?**

A) Entrenar, validar, desplegar
B) Recuperar (buscar contenido relevante en bases de conocimiento), Aumentar (combinar ese contenido con la pregunta del usuario) y Generar (el agente produce la respuesta usando datos de entrenamiento + información recuperada) ✅
C) Indexar, fragmentar, incrustar
D) Preguntar, filtrar, responder

**Explicación:** RAG funciona en tres pasos: Retrieve (buscar contenido relevante), Augment (combinar ese contenido con la consulta para dar contexto fáctico) y Generate (el agente genera la respuesta apoyándose en la información recuperada, no solo en sus datos de entrenamiento).

---

### Q1201
**¿Qué es Foundry IQ, en una frase precisa?**

A) Un nuevo modelo de lenguaje de Microsoft que sustituye a GPT-4
B) Una plataforma de conocimiento administrada para agentes de IA, basada en Azure AI Search, que permite crear bases de conocimiento compartidas reutilizables por múltiples agentes ✅
C) Una herramienta de monitoreo de costos de Azure
D) Un servicio exclusivo para indexar únicamente documentos de SharePoint

**Explicación:** Foundry IQ es una plataforma de conocimiento administrada construida sobre Azure AI Search. En vez de que cada agente/equipo reconstruya su propio pipeline RAG (vector DB, embeddings, búsqueda), se crean bases de conocimiento una sola vez y cualquier agente autorizado se conecta a ellas.

---

### Q1202
**Organizativamente, ¿cómo agrupa Foundry IQ la información dentro de una base de conocimiento?**

A) Por ubicación técnica de almacenamiento (p. ej. "SharePoint Site A", "Contenedor Blob B")
B) Por dominio empresarial (p. ej. "Documentación del producto", "Políticas de RR. HH."), independientemente de dónde esté almacenada físicamente la información ✅
C) Por fecha de creación del documento únicamente
D) Por tamaño de archivo

**Explicación:** Foundry IQ organiza el conocimiento por dominio de negocio, no por sistema de almacenamiento. Una sola base de conocimiento ("Documentación del producto") puede combinar contenido proveniente de SharePoint, Blob Storage y OneLake a la vez, presentándose al agente como un origen unificado.

---

### Q1203
**¿Cuáles de estos son los seis tipos de origen de datos que admite Foundry IQ para construir una base de conocimiento?**

A) MySQL, PostgreSQL, MongoDB, Redis, Cosmos DB, SQL Server
B) Índice de Azure AI Search, Azure Blob Storage, la Web (vía Bing), SharePoint remoto, SharePoint indexado y OneLake ✅
C) Excel, Word, PowerPoint, PDF, correo electrónico y chat de Teams
D) GitHub, GitLab, Bitbucket, Jira, Confluence y Slack

**Explicación:** Los seis orígenes cubiertos son: Índice de Azure AI Search (ya indexado), Azure Blob Storage (acceso directo a archivos), la Web (tiempo real vía Bing), SharePoint remoto (tiempo real), SharePoint indexado (preprocesado en Azure AI Search) y OneLake (datos no estructurados de Microsoft Fabric).

---

### Q1204
**¿Cuál es la diferencia clave entre "SharePoint remoto" y "SharePoint indexado" como origen de datos en Foundry IQ?**

A) Son exactamente lo mismo, solo cambia el nombre en la interfaz
B) Remoto consulta SharePoint en tiempo real (siempre actual, respeta permisos automáticamente, sin mantenimiento de índice, búsqueda limitada); Indexado preprocesa el contenido en Azure AI Search (respuesta más rápida, búsqueda avanzada, pero requiere mantener el índice y depende de la programación de reindexado) ✅
C) Remoto solo funciona con SharePoint Online; Indexado solo funciona con SharePoint on-premises
D) Indexado es siempre más actual que Remoto porque se sincroniza cada segundo

**Explicación:** Es una decisión de tradeoffs: Remoto prioriza actualidad y simplicidad (consulta en vivo, gobierno de permisos automático) a costa de capacidades de búsqueda más limitadas; Indexado prioriza velocidad y búsqueda avanzada (clasificación semántica, analizadores personalizados) a costa de que el contenido depende de cuándo se reindexó.

---

### Q1205
**¿Qué tipo de acceso ofrece la Web (vía Bing) como origen de datos, y cuál es su principal advertencia según el módulo?**

A) Acceso indexado y controlado; no tiene ninguna limitación
B) Acceso en tiempo real a contenido público de internet; la advertencia es que tienes menos control sobre las fuentes específicas referenciadas, por lo que si la precisión y verificación de origen son críticas conviene usar orígenes indexados y controlados ✅
C) Solo puede combinarse con OneLake, nunca con otros orígenes
D) Requiere que cada página web se suba manualmente como blob

**Explicación:** La Web ofrece información pública actual en tiempo real vía Bing, ideal para eventos recientes o datos que cambian con frecuencia — pero al depender de resultados de búsqueda externos, se pierde control fino sobre qué fuentes exactas respaldan cada respuesta, algo crítico en escenarios donde la trazabilidad importa.

---

### Q1206
**Este fragmento crea un agente con acceso a una base de conocimiento:
```python
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import PromptAgentDefinition, MCPTool

project_client = AIProjectClient(endpoint=project_endpoint, credential=credential)

# Connect to the product documentation knowledge base
knowledge_tool = MCPTool(
    server_label="product-docs",
    server_url=f"{search_endpoint}/knowledgebases/product-documentation/mcp",
)

agent = project_client.agents.create_version(
    agent_name="product-support-agent",
    definition=PromptAgentDefinition(
        model="gpt-4o-mini",
        instructions="Answer product questions using the knowledge base. Always cite your sources.",
        tools=[knowledge_tool],
    ),
)
```
¿Qué revela esto sobre cómo Foundry IQ expone sus bases de conocimiento a un agente?**

A) Foundry IQ usa una API completamente distinta y no relacionada con MCP
B) Foundry IQ expone cada base de conocimiento como un servidor MCP: el agente se conecta a ella con el mismo objeto `MCPTool` que usarías para cualquier otro servidor MCP remoto ✅
C) `MCPTool` solo puede usarse con servidores públicos, nunca con bases de conocimiento privadas
D) Es un error de sintaxis; las bases de conocimiento requieren `KnowledgeTool`, no `MCPTool`

**Explicación:** Foundry IQ construye sus bases de conocimiento sobre el mismo Protocolo de Contexto de Modelo (MCP): cada base de conocimiento se expone en una ruta `/knowledgebases/<nombre>/mcp`, y el agente la consume exactamente igual que cualquier otro servidor MCP, usando `MCPTool(server_label=, server_url=)`. Esto también implica que aplica el mismo flujo de aprobación (`mcp_approval_request` / `McpApprovalResponse`) visto en la integración de MCP.

---

### Q1207
**TRAMPA: Un desarrollador configura este agente y asume que basta para garantizar respuestas siempre fundamentadas y citadas:
```python
agent = project_client.agents.create_version(
    agent_name="hr-assistant",
    definition=PromptAgentDefinition(
        model="gpt-4o-mini",
        instructions="Answer HR questions using the knowledge base.",
        tools=[knowledge_tool],
    ),
)
```
¿Por qué esto es insuficiente según el módulo, y qué debería contener `instructions` en su lugar?**

A) Porque `instructions` no admite texto en inglés
B) Porque una instrucción vaga no especifica cuándo debe buscar, cómo debe citar, ni qué hacer si no encuentra información — el agente puede responder desde datos de entrenamiento, buscar sin citar, o comportarse de forma inconsistente ✅
C) Porque `instructions` solo se aplica a `code_interpreter`, no a herramientas de conocimiento
D) Porque las instrucciones deben escribirse siempre en formato JSON, nunca en texto libre

**Explicación:** El módulo muestra explícitamente que una instrucción vaga produce comportamiento incoherente. Las instrucciones efectivas deben cubrir tres cosas: (1) cuándo recuperar — siempre usar la base de conocimiento, nunca depender de datos de entrenamiento; (2) cómo citar — formato exacto de atribución; (3) qué hacer cuando no hay respuesta — un mensaje de fallback definido.

---

### Q1208
**Según la tabla de comportamientos del módulo, de estas tres respuestas a "¿Cuál es nuestra política de vacaciones?", ¿cuál es la única aceptable para un agente empresarial?**

A) "La mayoría de las empresas ofrecen 2-3 semanas de vacaciones anualmente" (desde datos de entrenamiento)
B) "Usted obtiene 15 días de PTO anualmente" (buscó pero no citó la fuente)
C) "Usted recibe 15 días de permiso remunerado anualmente 【doc_id:1†Manual del Empleado 2024】" (búsqueda + cita + fundamentación) ✅
D) Las tres son igualmente aceptables mientras el número sea correcto

**Explicación:** Solo el tercer comportamiento cumple los tres requisitos de un agente empresarial fundamentado: usa la base de conocimiento (no supone desde datos de entrenamiento genéricos), y cita explícitamente el documento de origen, permitiendo verificación. La primera es información genérica potencialmente incorrecta; la segunda es correcta pero no verificable.

---

### Q1209
**¿Cuáles son las cuatro características que debe mostrar una respuesta "correcta" de un agente con Foundry IQ, según el módulo?**

A) Velocidad, brevedad, tono amistoso y uso de emojis
B) Puesta en tierra (grounding: viene de la base de conocimiento, no del entrenamiento), Cita (referencias de origen), Relevancia (responde realmente la pregunta) e Integridad (toda la información necesaria, no fragmentos) ✅
C) Longitud mínima de 500 palabras, uso de markdown, traducción automática y resumen ejecutivo
D) Costo mínimo de tokens, latencia menor a 1 segundo, uso de caché y compresión de respuesta

**Explicación:** Las cuatro características de calidad son: Grounding (la información procede de la base de conocimiento), Cita (cada afirmación fáctica incluye referencia de fuente), Relevancia (el contenido recuperado responde realmente la pregunta) e Integridad (se entrega toda la información necesaria, no solo un fragmento).

---

### Q1210
**¿Para qué sirven los "perfiles de puntuación" (scoring profiles) mencionados en la evaluación del módulo sobre bases de conocimiento de Foundry IQ?**

A) Para cifrar campos confidenciales durante la recuperación
B) Para priorizar campos o atributos específicos, haciendo que los resultados más relevantes para el negocio aparezcan primero en el ranking de búsqueda ✅
C) Para configurar cómo se fragmentan e incrustan los documentos
D) Para calcular el costo mensual de la suscripción de Azure AI Search

**Explicación:** Los perfiles de puntuación (scoring profiles) son una función de clasificación de Azure AI Search que boostea/prioriza campos específicos (por ejemplo, dar más peso al título que al cuerpo del documento), influyendo en qué resultados aparecen primero — no están relacionados con cifrado ni con la estrategia de fragmentación/embeddings.

---

### Q1211
**¿Qué cuatro tipos de consulta de prueba recomienda el módulo usar para validar el comportamiento de recuperación de un agente antes de producción?**

A) Consultas cortas, consultas largas, consultas en mayúsculas y consultas con emojis
B) Preguntas fácticas simples, preguntas que requieren síntesis entre varios documentos, preguntas fuera del alcance de la base de conocimiento y preguntas ambiguas ✅
C) Solo preguntas en inglés, solo preguntas en español, solo preguntas técnicas y solo preguntas generales
D) Preguntas de una palabra, de una frase, de un párrafo y de una página completa

**Explicación:** El plan de pruebas cubre: (1) fácticas simples → recuperación directa con cita; (2) que requieren síntesis → combinar varios documentos con múltiples citas; (3) fuera de alcance → retroceso elegante ("no tengo esa información..."); (4) ambiguas → aclaración o búsqueda centrada en el tema más probable.

---

### Q1212
**Un agente de soporte técnico orientado a clientes y un asistente interno de investigación usan Foundry IQ, pero con instrucciones muy distintas. ¿Cuál es la diferencia de enfoque entre ambos según el módulo?**

A) No hay diferencia; ambos deben usar exactamente las mismas instrucciones
B) El de soporte prioriza alta precisión y evita adivinar ("Let me connect you with a specialist" si no hay respuesta clara); el de investigación puede sintetizar entre múltiples fuentes, citar todo lo usado e indicar su nivel de confianza al combinar documentos ✅
C) El de soporte nunca debe citar fuentes; el de investigación siempre debe ocultar las fuentes
D) Ambos deben ignorar la base de conocimiento y responder solo con datos de entrenamiento

**Explicación:** El módulo distingue estrategias de recuperación según el propósito del agente: los agentes de cara al cliente priorizan nunca adivinar y derivar a un humano si la documentación no cubre la pregunta; los asistentes internos de investigación tienen más libertad para sintetizar y correlacionar múltiples fuentes, siempre que citen todo e indiquen el nivel de confianza.

---

### Q1213
**Una vez en producción, ¿qué métricas recomienda monitorear el módulo para mantener la calidad de recuperación de un agente con Foundry IQ?**

A) Solo el costo mensual de la suscripción de Azure
B) Frecuencia de cita, frecuencia de uso de la respuesta por defecto ("no sé"), tipos de consulta más comunes y precisión de recuperación (si los documentos recuperados realmente contienen la respuesta) ✅
C) Solo el tiempo de actividad (uptime) del servicio
D) El número total de agentes creados en el proyecto

**Explicación:** El módulo enfatiza que las instrucciones y pruebas iniciales no son suficientes; en producción hay que monitorear si los agentes citan consistentemente, con qué frecuencia caen en la respuesta por defecto, qué categorías de preguntas predominan y si el contenido recuperado realmente contiene la respuesta — usando esos datos para refinar instrucciones y contenido.

---

### Q1214
**¿Cuál es la ventaja de "conocimiento compartido" que ofrece Foundry IQ frente a RAG tradicional cuando una organización necesita tres agentes distintos (soporte, RR.HH., desarrollador)?**

A) Con Foundry IQ solo puede existir un agente por proyecto de Azure
B) Con RAG tradicional se construirían y mantendrían tres sistemas de recuperación independientes; con Foundry IQ se crean bases de conocimiento una vez y varios agentes se conectan a las que necesiten, beneficiándose inmediatamente de cualquier mejora ✅
C) Foundry IQ elimina por completo la necesidad de tener más de un agente
D) El conocimiento compartido solo aplica a agentes del mismo equipo de desarrollo

**Explicación:** El valor de escalabilidad de Foundry IQ es evitar la duplicación de infraestructura RAG: una base de conocimiento de documentación de producto puede servir tanto al agente de soporte como al de desarrollo, y una base de políticas de RR.HH. solo al asistente de empleados — cada agente accede exactamente a lo que necesita, y las mejoras se propagan automáticamente a todos los agentes conectados.

---

### Q1215
**¿Qué pasos automáticos ejecuta Foundry IQ al conectar un nuevo origen de datos a una base de conocimiento?**

A) Detección → Procesamiento (fragmentación e incrustación para búsqueda semántica) → Indexación → Supervisión (reindexado automático ante cambios) ✅
B) Solo copia los archivos a una carpeta local sin procesarlos
C) Solicita aprobación manual de un administrador para cada documento
D) Convierte automáticamente todos los documentos a formato PDF

**Explicación:** El ciclo es: Detección (examina la ubicación de almacenamiento), Procesamiento (fragmenta e incrusta los documentos para búsqueda semántica), Indexación (el contenido queda disponible para búsqueda) y Supervisión (los cambios en los documentos disparan reindexado automático) — todo configurado una sola vez por origen de datos.

---

### Q1216
**En el ejercicio práctico de integración con Foundry IQ, este código maneja las solicitudes de aprobación que puede emitir el agente al usar la base de conocimiento:
```python
while True:
    approval_requests = [
        item for item in (getattr(response, "output", None) or [])
        if getattr(item, "type", None) == "mcp_approval_request"
    ]
    if not approval_requests:
        break
    approval_items = []
    for approval_request in approval_requests:
        approved = input("Approve this action? (yes/no): ").strip().lower() in ["yes", "y"]
        approval_items.append({
            "type": "mcp_approval_response",
            "approval_request_id": approval_request.id,
            "approve": approved,
        })
    openai_client.conversations.items.create(conversation_id=conversation.id, items=approval_items)
    response = openai_client.responses.create(
        conversation=conversation.id,
        extra_body={"agent_reference": {"name": agent.name, "type": "agent_reference"}},
        input="",
    )
```
¿Qué patrón describe mejor este código?**

A) Se ignoran; Foundry IQ nunca requiere aprobación
B) Un bucle que revisa `response.output` en busca de items `type == "mcp_approval_request"`, solicita aprobación (por ejemplo, por consola) y reenvía `mcp_approval_response` para cada uno, repitiendo hasta que no queden solicitudes pendientes ✅
C) Se aprueban automáticamente en el servidor sin código adicional
D) Se requiere reiniciar el agente manualmente después de cada aprobación

**Explicación:** Igual que con cualquier `MCPTool`, la herramienta de conocimiento de Foundry IQ puede requerir aprobación por llamada (configurable en el portal a través de Foundry Toolkit). El cliente implementa un bucle que detecta `mcp_approval_request`, decide aprobar o denegar, y reenvía la decisión hasta que la respuesta ya no contenga solicitudes pendientes — el mismo patrón visto en la integración general de MCP.

---

### Q1217
**¿Cuál de las siguientes NO es una limitación real de los "agentes de IA simples" que RAG resuelve, según la tabla del módulo?**

A) Fechas límite de conocimiento (no acceden a información reciente)
B) Falta de acceso a datos privados de la organización
C) Costo de cómputo del modelo base, que RAG reduce a la mitad automáticamente ✅
D) Riesgo de respuestas fabricadas (alucinaciones) cuando falta fundamento fáctico

**Explicación:** La tabla del módulo lista como limitaciones: fechas límite de conocimiento, falta de acceso a datos privados, falta de contexto empresarial específico, respuestas fabricadas por falta de fundamento, y duplicación de esfuerzo de ingeniería entre equipos. RAG no promete reducir a la mitad el costo de cómputo del modelo; esa no es una de sus ventajas descritas.

---

### Q1218
**TRAMPA: Alguien concluye que, como Foundry IQ "automatiza todo", no importa qué instrucciones se le den al agente ni qué pruebas se hagan antes de producción. ¿Por qué el módulo contradice directamente esta idea?**

A) Porque Foundry IQ requiere pago adicional por cada instrucción configurada
B) Porque el módulo dedica una unidad completa a mostrar que sin instrucciones específicas (cuándo buscar, cómo citar, qué hacer si no hay respuesta) y sin pruebas sistemáticas por tipo de consulta, el comportamiento del agente es incoherente incluso con una base de conocimiento perfectamente indexada ✅
C) Porque Foundry IQ solo funciona si se desactivan las instrucciones del agente
D) Porque las pruebas solo son necesarias en agentes que no usan MCP

**Explicación:** El propio módulo advierte: "puede tener contenido perfectamente indexado con clasificación semántica excelente, pero si el agente no sabe cuándo o cómo usar la base de conocimiento, los usuarios obtienen resultados incoherentes". La automatización de indexación/recuperación no sustituye instrucciones claras ni pruebas sistemáticas — ambas siguen siendo responsabilidad del desarrollador, y son justamente el tipo de detalle que el examen AI-103 evalúa con preguntas de escenario y código, no solo de definición.

---

### Q1219
**¿Qué modelo se usa típicamente para generar los embeddings al configurar una base de conocimiento en el ejercicio práctico de Foundry IQ?**

A) `gpt-5`, el mismo modelo usado para chat completions
B) Un modelo de embeddings dedicado, como `text-embedding-3-small`, distinto del modelo de chat completions usado para generar respuestas ✅
C) No se requiere ningún modelo de embeddings; Foundry IQ indexa texto plano sin vectorizar
D) `whisper-1`, el modelo de transcripción de audio

**Explicación:** Al crear la base de conocimiento en el portal, se seleccionan dos modelos con roles distintos: un modelo de embeddings (p. ej. `text-embedding-3-small`) para vectorizar y buscar semánticamente el contenido indexado, y un modelo de chat completions (p. ej. `gpt-5`) para generar la respuesta final del agente a partir de lo recuperado.

---
