# BANCO DE PREGUNTAS AI-103 — PARTE 15 (Q1350-Q1369)
## Domain 2: Tools — Microsoft Agent Framework
### Generado: 2026-08-18 | Fuente: módulo "Desarrollo de un agente de IA con Microsoft Agent Framework"

---

### Q1350
**¿Qué es Microsoft Agent Framework, según el propio módulo?**

A) Un servicio de Azure completamente nuevo y sin relación con SDKs anteriores
B) La "próxima generación" tanto de Semantic Kernel como de AutoGen, desarrollada por los mismos equipos de ingeniería: combina las abstracciones sencillas de agente de AutoGen con las características empresariales de Semantic Kernel (estado basado en sesión, seguridad de tipos, middleware, telemetría), y agrega flujos de trabajo basados en grafos ✅
C) Un reemplazo exclusivo para Azure OpenAI que no funciona con Foundry
D) Una biblioteca de solo lectura para inspeccionar agentes ya creados

**Explicación:** El módulo describe explícitamente a Agent Framework como la evolución conjunta de Semantic Kernel y AutoGen, unificando lo mejor de ambos (abstracciones simples + robustez empresarial) y sumando orquestación explícita multiagente mediante flujos de trabajo basados en grafos.

---

### Q1351
**Según la "matriz de proveedores" del módulo, ¿cuáles de los siguientes proveedores admiten historial de chat del lado del servicio (persistente)?**

A) Solo Claude de Anthropic y Amazon Bedrock
B) Servicio de agente de Foundry, Respuestas de Azure OpenAI, y Respuestas de OpenAI ✅
C) Todos los proveedores listados lo admiten por igual
D) Ninguno; el historial siempre debe gestionarse en memoria local

**Explicación:** Solo Foundry Agent Service, Azure OpenAI Responses y OpenAI Responses ofrecen historial de chat del lado del servicio en la matriz del módulo. Azure OpenAI Chat Completion, OpenAI Chat Completion, Claude, Bedrock, GitHub Copilot y Ollama NO lo admiten (requieren gestión de historial local en memoria).

---

### Q1352
**¿Por qué el módulo recomienda Foundry Agent Service como proveedor para producción?**

A) Porque es el único proveedor compatible con Python
B) Porque mantiene el historial de conversación en el lado del servicio automáticamente entre turnos, así el desarrollador no necesita gestionar el estado de la conversación manualmente, y la conversación puede continuar aunque la aplicación se reinicie o escale horizontalmente a varias instancias ✅
C) Porque es el proveedor más barato de todos
D) Porque no requiere ningún tipo de autenticación

**Explicación:** El historial del lado del servicio es la ventaja diferenciadora clave: sin él (como en proveedores sin soporte de historial de servicio), el estado vive solo en memoria del proceso de la aplicación, lo cual es frágil ante reinicios o escalado horizontal — un problema real en producción.

---

### Q1353
**¿Cuáles son las dos categorías amplias de herramientas que admite Agent Framework?**

A) Herramientas síncronas y herramientas asíncronas
B) Herramientas proporcionadas por el servicio (hospedadas y administradas por el proveedor, como code_interpreter, file_search, web_search, herramientas MCP hospedadas y Búsqueda de Azure AI) y herramientas de función personalizadas (escritas y registradas por el desarrollador) ✅
C) Herramientas gratuitas y herramientas de pago
D) Herramientas locales y herramientas en la nube

**Explicación:** Las herramientas proporcionadas por el servicio se habilitan solo con configuración (el proveedor ejecuta la lógica); las herramientas de función personalizadas son funciones de Python que tú escribes y registras directamente con el agente para lógica propia (llamar APIs internas, bases de datos, cálculos, etc.).

---

### Q1354
**¿Cuáles son los dos enfoques que admite Agent Framework para describir una función Python de forma que el modelo pueda invocarla de forma confiable?**

A) Comentarios `# TODO` y nombres de variable descriptivos
B) Anotaciones de tipo con `Annotated` (usando la docstring como descripción de la herramienta) y el decorador `@tool` (especificando nombre/descripción explícitos, con soporte de un esquema Pydantic para control preciso) ✅
C) Archivos XML de configuración externos
D) Únicamente comentarios de línea dentro del cuerpo de la función

**Explicación:** El marco admite `Annotated[tipo, Field(description=...)]` de Python (con la docstring de la función como descripción general) o el decorador `@tool` con nombre/descripción explícitos y, opcionalmente, un modelo Pydantic para definir el esquema de entrada con precisión. En cualquier caso, el marco genera el esquema automáticamente a partir de la firma.

---

### Q1355
**Este fragmento es del ejercicio real: `@tool(approval_mode="never_require") def submit_claim(to: Annotated[str, Field(description="Who to send the email to")], subject: ..., body: ...)`. ¿Qué indica `approval_mode="never_require"`?**

A) Que la herramienta nunca podrá ser invocada por el agente
B) Que esta herramienta específica se ejecuta sin pedir aprobación humana antes de invocarse — el patrón opuesto es requerir confirmación para acciones irreversibles, costosas o con datos sensibles ✅
C) Que la función requiere autenticación de Azure AD en cada llamada
D) Que el resultado de la función nunca se muestra al usuario

**Explicación:** El parámetro `approval_mode` del decorador `@tool` controla el patrón de aprobación de herramientas: cuando está activado (p. ej. `"always_require"` en escenarios sensibles), el agente se detiene antes de invocar la función y pide confirmación. `"never_require"` es lo opuesto — ejecución directa sin pausa, adecuado aquí porque la función solo simula el envío de un correo (imprime en consola).

---

### Q1356
**Un agente tiene registradas 3 herramientas de función distintas. ¿Qué lógica de enrutamiento adicional debe escribir el desarrollador para que el modelo elija la correcta según la conversación?**

A) Un árbol de decisión `if/elif/else` manual antes de invocar al agente
B) Ninguna: al pasar la lista de funciones al crear el agente, el modelo selecciona automáticamente la herramienta más adecuada para cada parte de la conversación, basándose en el contexto y en las descripciones de cada herramienta ✅
C) Un archivo de configuración YAML separado que mapea intents a funciones
D) Un segundo agente dedicado exclusivamente a enrutar llamadas a herramientas

**Explicación:** El marco controla la orquestación de herramientas automáticamente: no se necesita lógica de enrutamiento explícita. La calidad de esa selección automática depende enteramente de qué tan claras sean las descripciones de cada herramienta — de ahí la importancia de los procedimientos recomendados del módulo.

---

### Q1357
**Según los procedimientos recomendados del módulo, ¿qué debe hacer una herramienta personalizada cuando encuentra una entrada inesperada o falla un servicio externo?**

A) Lanzar la excepción sin capturarla, para que el desarrollador la vea en los logs
B) Devolver un mensaje de error informativo en lugar de generar una excepción, de modo que el modelo pueda usar ese texto para responder de forma útil al usuario ✅
C) Terminar el proceso de la aplicación inmediatamente
D) Reintentar la llamada indefinidamente hasta que tenga éxito

**Explicación:** El módulo enfatiza que las herramientas deben manejar sus propios errores devolviendo un mensaje descriptivo (en vez de una excepción sin manejar), porque el modelo usa directamente el valor devuelto para formar su respuesta — una excepción no controlada rompe ese flujo.

---

### Q1358
**¿Qué patrón de composición describe el módulo como "usar un agente como herramienta para otro agente"?**

A) Es técnicamente imposible en Agent Framework
B) Un agente interno puede convertirse en una herramienta de función y pasarse a un agente externo, que delega tareas específicas en él — un diseño modular donde agentes especializados controlan dominios concretos y un agente coordinador enruta solicitudes entre ellos ✅
C) Solo puede hacerse duplicando manualmente todo el código del agente interno
D) Requiere desplegar cada agente en una suscripción de Azure distinta

**Explicación:** Este patrón de composición (agente como herramienta de otro agente) es la base conceptual de los sistemas multiagente, tema que el propio módulo señala que se explora "con más profundidad en el módulo multiagente" — es decir, es un adelanto intencional de Domain 2 hacia arquitecturas multiagente.

---

### Q1359
**En el código del ejercicio, `client = FoundryChatClient(project_endpoint=os.getenv("PROJECT_ENDPOINT"), model=os.getenv("MODEL_DEPLOYMENT_NAME"), credential=AzureCliCredential())`. ¿Qué rol cumple este cliente?**

A) Es el propio agente; no se necesita ningún otro objeto
B) Es el puente entre la aplicación y el servicio Foundry Agent: controla la autenticación, el enrutamiento de solicitudes y la administración de sesiones del lado del servicio ✅
C) Solo sirve para validar el formato del archivo `.env`
D) Reemplaza la necesidad de definir `instructions` en el agente

**Explicación:** El cliente de chat de Foundry (`FoundryChatClient` en este ejercicio) es la capa de conexión: recibe credenciales, endpoint del proyecto y nombre del modelo desplegado, y gestiona todo el tráfico entre tu código y el servicio Foundry Agent — el objeto `Agent` se construye después, pasándole este cliente.

---

### Q1360
**¿Qué diferencia hay entre las respuestas "sin streaming" y "con streaming" (`run`) en Agent Framework, y qué tienen en común?**

A) Solo el modo streaming expone contenido de texto; el modo sin streaming no devuelve texto
B) Sin streaming, `run` espera a que el agente termine y devuelve un objeto de respuesta completo; con streaming, devuelve un flujo iterable de forma asíncrona con actualizaciones parciales. Ambos modos exponen una propiedad `text` que agrega todo el contenido textual de la salida, facilitando extraer la respuesta final sin importar el modo usado ✅
C) El modo streaming solo funciona con proveedores que no admiten historial de servicio
D) Sin streaming es exclusivo de aplicaciones de consola; streaming es exclusivo de aplicaciones web

**Explicación:** La elección entre sincrónico (`run` espera al resultado completo) y streaming (iteración asíncrona con actualizaciones incrementales) es sobre todo una decisión de experiencia de usuario — mostrar progreso incremental favorece interfaces interactivas — pero en ambos casos la propiedad `.text` de la respuesta da acceso uniforme al contenido final.

---

### Q1361
**¿Qué diferencia hay entre invocar el método de ejecución del agente una sola vez y usar una sesión/hilo de conversación (thread/session) a través de varios turnos?**

A) Son exactamente lo mismo; no existe diferencia funcional
B) Una sola llamada procesa un único intercambio (un mensaje de usuario, una respuesta); para que el agente recuerde intervenciones anteriores y mantenga una conversación real de varios turnos, se necesita una sesión/hilo que actúe como contenedor del estado de la conversación ✅
C) La sesión solo es necesaria si se usa streaming
D) Sin sesión, el agente no puede llamar ninguna herramienta

**Explicación:** Sin un objeto de sesión/hilo, cada llamada al agente es aislada — no hay memoria de turnos previos. La sesión (respaldada por almacenamiento del lado del servicio con el proveedor Foundry, o en memoria local con otros proveedores) es lo que convierte intercambios sueltos en una conversación coherente de varios turnos.

---

### Q1362
**TRAMPA: El material oficial del módulo presenta cierta inconsistencia de nombres entre el cuerpo de la unidad/ejercicio (`Agent`, `FoundryChatClient`) y su propia evaluación de conocimientos, que menciona `AzureAIAgentClient`, `ChatAgent` y `AgentThread`. ¿Cuál es la lección práctica más importante frente a este tipo de inconsistencia en material de estudio de un SDK en evolución activa?**

A) Uno de los dos conjuntos de nombres es simplemente falso y debe ignorarse por completo
B) Lo importante para el examen es reconocer el ROL de cada pieza (un cliente que conecta con el proveedor, un objeto de agente con instrucciones/herramientas, y un contenedor de estado de conversación por turnos) más que memorizar un nombre de clase exacto, ya que el SDK de Agent Framework está en desarrollo activo y los nombres de clases han cambiado entre versiones preliminares ✅
C) Significa que Microsoft Agent Framework no tiene una API estable y nunca debe usarse
D) Indica que el examen AI-103 nunca pregunta sobre Agent Framework

**Explicación:** Es una situación real y instructiva: el propio módulo de Microsoft Learn usa nombres de clase distintos en su unidad de código (`Agent`, `FoundryChatClient`) frente a su cuestionario de evaluación (`ChatAgent`, `AzureAIAgentClient`, `AgentThread`) para referirse a conceptos equivalentes — reflejo de un SDK en preview con renombrados frecuentes. La estrategia correcta de examen es anclarse en el concepto (cliente de conexión / definición de agente con instrucciones y herramientas / contenedor de estado conversacional) en vez de aferrarse a un nombre de clase que puede variar entre versiones.

---

### Q1363
**Según la unidad de creación de agentes, ¿cómo resuelve típicamente la autenticación Agent Framework al conectarse a un proyecto de Foundry?**

A) Siempre requiere una cadena de conexión con clave de API codificada en el código
B) Mediante credenciales de Azure — en la mayoría de los escenarios, `DefaultAzureCredential` resuelve automáticamente el mecanismo adecuado según el entorno (CLI de Azure durante desarrollo, identidad administrada en producción), sin necesidad de codificar claves ✅
C) Solo admite inicio de sesión interactivo con usuario y contraseña
D) Requiere desplegar un Azure Key Vault obligatoriamente antes de crear cualquier agente

**Explicación:** El texto de la unidad describe el patrón general con `DefaultAzureCredential` (cadena automática de mecanismos de credenciales). Nota práctica: el ejercicio concreto de laboratorio usa `AzureCliCredential()` explícitamente en vez de `DefaultAzureCredential()` para mantener el comportamiento predecible durante el aprendizaje — ambas son credenciales válidas de `azure-identity`, pero conviene reconocer que el concepto general (autenticación sin claves codificadas, vía Azure) es lo que se evalúa, no una única clase de credencial obligatoria.

---

### Q1364
**¿Qué pasos, en orden, describe el módulo para crear e interactuar con un agente de Foundry usando Agent Framework?**

A) Crear el agente → autenticarse → definir herramientas → desplegar un modelo personalizado
B) Configurar el proyecto de Foundry (endpoint + nombre de implementación del modelo) → configurar la autenticación → inicializar el cliente de chat de Foundry → crear el agente (instrucciones + herramientas opcionales) → establecer una sesión y ejecutar el agente ✅
C) Escribir el YAML del agente → subirlo al portal → generar el cliente automáticamente
D) Entrenar un modelo desde cero → conectar Agent Framework → publicar en Teams

**Explicación:** Esta es la secuencia coherente descrita explícitamente en la unidad "Creación de un agente de Azure AI con Microsoft Agent Framework": primero los datos de conexión al proyecto, luego autenticación, luego el cliente de chat, luego la definición del agente en sí, y finalmente abrir una sesión para ejecutar conversaciones.

---

### Q1365
**¿Qué funcionalidades admiten TODOS los agentes de Agent Framework por defecto, independientemente del proveedor de modelo subyacente, gracias a compartir la misma clase base?**

A) Solo generación de texto libre, sin ninguna otra capacidad
B) Llamadas a funciones automáticas, conversaciones de varios turnos, salidas estructuradas con seguridad de tipos, respuestas en streaming, y uso de herramientas proporcionadas por el servicio donde el proveedor lo admita ✅
C) Únicamente ejecución de código Python; nada más
D) Solo lectura de documentos PDF cargados manualmente

**Explicación:** Al derivar todos los agentes de una clase base unificada, Agent Framework garantiza una interfaz coherente con este conjunto de capacidades comunes, permitiendo cambiar el proveedor de inferencia subyacente (configuración del cliente) sin reescribir la lógica del agente.

---

### Q1366
**¿Qué es un "middleware" en el contexto de Agent Framework, según la tabla de características del módulo?**

A) Un servidor intermedio de Azure obligatorio entre el cliente y Foundry
B) Ganchos (hooks) que permiten interceptar, registrar o modificar las acciones del agente antes y después de su ejecución ✅
C) Un tipo de herramienta personalizada exclusiva para llamadas HTTP
D) El nombre alternativo que recibe el objeto `Agent` en versiones antiguas del SDK

**Explicación:** El middleware de Agent Framework es un mecanismo de extensibilidad transversal: hooks que se ejecutan antes/después de las acciones del agente, útiles para logging, auditoría, transformación de datos o políticas de seguridad — no debe confundirse con un componente de infraestructura de red.

---

### Q1367
**¿Qué se necesita, como mínimo, para construir el `FoundryChatClient` en el ejercicio de la reclamación de gastos?**

A) Solo el nombre de la organización de Azure
B) El endpoint del proyecto de Foundry (`project_endpoint`), el nombre de la implementación del modelo (`model`) y una credencial de Azure (`credential`) ✅
C) Una clave de API de OpenAI y nada más
D) El identificador del recurso de Azure Bot Service

**Explicación:** `FoundryChatClient(project_endpoint=..., model=..., credential=...)` requiere estos tres datos: a dónde conectarse (endpoint del proyecto), qué modelo desplegado usar, y cómo autenticarse — sin claves de API codificadas, siguiendo el patrón de identidad de Azure.

---

### Q1368
**¿Qué proporciona `Orquestación de flujo de trabajo` como característica de Agent Framework, según la tabla de arquitectura del módulo?**

A) Solo permite ejecutar un único agente sin ningún tipo de coordinación
B) Flujos de trabajo basados en grafos para administrar patrones secuenciales, simultáneos (concurrentes), de chat en grupo y de "entrega" (handoff) entre agentes ✅
C) Es exclusivamente una herramienta de visualización sin capacidad de ejecución real
D) Reemplaza por completo al servicio Foundry Agent como proveedor de modelos

**Explicación:** Esta característica es la base técnica que conecta Agent Framework con el módulo de flujos de trabajo de Foundry visto anteriormente (Domain 2): permite orquestación explícita de varios agentes con distintos patrones (secuencial, concurrente, chat de grupo, handoff/entrega), útil para escenarios multiagente complejos.

---

### Q1369
**Un candidato de examen asume que Microsoft Agent Framework es simplemente "otro SDK más" sin relación con Semantic Kernel ni AutoGen, y que estudiar uno no le sirve para el otro. ¿Por qué esta suposición es incorrecta según el propio módulo?**

A) Porque Semantic Kernel y AutoGen fueron descontinuados por completo y ya no existen
B) Porque Agent Framework es explícitamente su sucesor unificado, construido por los mismos equipos de ingeniería, combinando las abstracciones de agente de AutoGen con las características empresariales de Semantic Kernel — los conceptos de ambos (sesiones con estado, seguridad de tipos, orquestación de agentes) se trasladan directamente ✅
C) Porque Agent Framework solo funciona con modelos de OpenAI, nunca con Azure
D) Porque Semantic Kernel y AutoGen nunca soportaron herramientas de función

**Explicación:** Entender esta continuidad evita perder tiempo estudiando cada SDK como un silo aislado: los conceptos centrales que el examen evalúa (administración de estado por sesión, invocación de herramientas con generación automática de esquema, telemetría/middleware, orquestación multiagente) son la evolución directa de ideas ya presentes en Semantic Kernel y AutoGen, ahora unificadas bajo una sola clase base `Agent`.

---
