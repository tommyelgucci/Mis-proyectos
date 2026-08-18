# BANCO DE PREGUNTAS AI-103 — PARTE 17 (Q1450-Q1469)
## Domain 2: Tools — Protocolo Agent-to-Agent (A2A)
### Generado: 2026-08-18 | Fuente: módulo "Detección de agentes de Azure AI con A2A"

---

### Q1450
**¿Qué es el protocolo Agent-to-Agent (A2A), en una frase precisa?**

A) Una herramienta de Azure Monitor para medir la latencia entre agentes
B) Una manera estandarizada para que agentes de IA (incluso de diferentes proveedores o plataformas) se comuniquen, compartan contexto, invoquen las funcionalidades de otros e intercambien información de forma segura ✅
C) Un reemplazo directo de Azure AI Search para bases de conocimiento
D) Un lenguaje de programación específico para escribir agentes

**Explicación:** A2A es un protocolo de interoperabilidad: permite que agentes construidos en distintas plataformas o con distintos proveedores colaboren sin problemas, algo que antes requería integraciones ad-hoc entre sistemas desconectados.

---

### Q1451
**TRAMPA: Alguien confunde A2A con MCP y asume que ambos protocolos resuelven exactamente el mismo problema. ¿Cuál es la diferencia conceptual clave?**

A) No hay ninguna diferencia real entre ambos
B) MCP conecta un agente con herramientas y orígenes de datos externos (servidores de herramientas); A2A conecta un agente con OTRO agente como par colaborador, permitiendo que cada agente A2A incluso elija su propio LLM de forma independiente ✅
C) A2A solo funciona con modelos de OpenAI; MCP solo funciona con modelos de Azure
D) MCP requiere autenticación integrada; A2A nunca admite autenticación

**Explicación:** MCP estandariza cómo un agente descubre e invoca herramientas/datos. A2A estandariza cómo un agente descubre e invoca a OTRO agente completo (con su propio razonamiento). El módulo señala explícitamente la selección de modelo flexible como ventaja de A2A: cada agente puede usar el LLM que prefiera, a diferencia de algunos escenarios de MCP que dependen de una única conexión LLM compartida.

---

### Q1452
**¿Cuáles son las tres ventajas principales del protocolo A2A que describe el módulo?**

A) Menor costo de tokens, mayor velocidad de inferencia y compresión de contexto
B) Colaboración mejorada entre agentes de distintos proveedores/plataformas, selección de modelo flexible por agente, y autenticación integrada en el propio protocolo ✅
C) Cifrado cuántico, computación sin servidor y almacenamiento ilimitado
D) Compatibilidad exclusiva con agentes de un solo proveedor certificado por Microsoft

**Explicación:** Estas son las tres ventajas listadas explícitamente: (1) colaboración entre sistemas tradicionalmente desconectados, (2) cada agente A2A puede elegir su propio LLM, y (3) un marco de seguridad de autenticación ya incorporado en el protocolo, sin necesidad de diseñarlo por separado.

---

### Q1453
**¿Qué es una "aptitud del agente" (agent skill) dentro del protocolo A2A?**

A) Una puntuación numérica que mide qué tan "inteligente" es el agente
B) Un bloque de construcción que describe una función o funcionalidad específica que el agente puede realizar, comunicando a clientes u otros agentes qué tareas puede manejar ✅
C) Un permiso de Azure RBAC asignado al agente
D) El historial de versiones del modelo de lenguaje subyacente

**Explicación:** Una aptitud (`AgentSkill`) es la unidad atómica de funcionalidad que un agente expone — por ejemplo, "generar un título de blog" — y se describe con suficiente detalle para que otros agentes o clientes sepan cuándo invocarla.

---

### Q1454
**¿Cuáles son los elementos clave que componen una aptitud (`AgentSkill`) de un agente A2A?**

A) Solo un nombre; nada más es necesario
B) ID (identificador único), nombre legible, descripción detallada, etiquetas (tags) para categorización, ejemplos de uso, y los modos de entrada/salida admitidos ✅
C) Únicamente la clave de API y el endpoint del servidor
D) El número de versión de Python usado para implementarla

**Explicación:** Estos seis elementos (`id`, `name`, `description`, `tags`, `examples`, modos de entrada/salida) permiten que un agente de enrutamiento u otro cliente entienda exactamente qué hace la aptitud y cuándo usarla — coincide exactamente con el código real del ejercicio: `AgentSkill(id='generate_blog_title', name='Generate Blog Title', description=..., tags=['title'], examples=[...])`.

---

### Q1455
**¿Qué es la "tarjeta del agente" (agent card) y para qué sirve?**

A) Una factura de consumo de Azure generada mensualmente por agente
B) Un documento estructurado, como una "tarjeta de presentación digital", que un agente de enrutamiento o cliente puede recuperar para detectar las funcionalidades del agente (identidad, endpoint, capacidades, aptitudes, modos de E/S, soporte de autenticación) y cómo interactuar con él ✅
C) Un archivo de configuración exclusivo para definir el modelo de lenguaje del agente
D) Una interfaz gráfica de usuario integrada en el portal de Foundry

**Explicación:** La tarjeta del agente (`AgentCard`) es el mecanismo central de detección de A2A: incluye información de identidad (nombre, descripción, versión), la URL del endpoint del servicio A2A, las capacidades admitidas (streaming, notificaciones push), los modos de entrada/salida predeterminados, la lista de aptitudes, y si requiere autenticación.

---

### Q1456
**¿En qué endpoint estándar se expone típicamente la tarjeta del agente para que los clientes puedan detectarla automáticamente?**

A) `/api/v1/agent-info`
B) `/.well-known/agent-card.json` ✅
C) `/health`
D) `/openapi.json`

**Explicación:** El módulo especifica este punto de conexión conocido (`well-known`) como la ubicación estándar donde los clientes buscan la tarjeta del agente, permitiendo un descubrimiento automatizado sin necesidad de configuración manual del lado del cliente.

---

### Q1457
**¿Cuáles son los tres componentes esenciales para hospedar un servidor de agente A2A?**

A) Base de datos SQL, caché Redis y balanceador de carga
B) La tarjeta del agente (describe capacidades/aptitudes), el controlador de solicitudes (enruta al ejecutor y administra el ciclo de vida de tareas vía un almacén de tareas), y la aplicación de servidor (framework web como Starlette + servidor ASGI como Uvicorn) ✅
C) Solo el ejecutor del agente; nada más es necesario
D) Un contenedor Docker, un clúster de Kubernetes y un registro de contenedores

**Explicación:** Estos tres componentes trabajan juntos: la tarjeta describe qué puede hacer el agente, el controlador de solicitudes (`DefaultRequestHandler`) enruta las peticiones entrantes a los métodos del ejecutor (`execute`/`cancel`) usando un almacén de tareas (`TaskStore`), y la aplicación de servidor expone todo esto vía HTTP.

---

### Q1458
**Según la evaluación oficial del módulo, ¿cuál es el rol principal de un servidor A2A?**

A) Ejecuta directamente la lógica de negocio del agente sin ningún intermediario
B) Enruta las solicitudes entre los clientes y los agentes conectados ✅
C) Almacena respuestas estáticas del agente para reutilizarlas sin volver a invocar al modelo
D) Sustituye por completo al modelo de lenguaje subyacente

**Explicación:** Esta es literalmente la respuesta correcta de la evaluación oficial: el servidor actúa como puente/enrutador entre clientes/otros agentes y la lógica del agente hospedado, delegando el procesamiento real al ejecutor del agente.

---

### Q1459
**¿Qué dos operaciones principales debe implementar la interfaz `AgentExecutor`?**

A) `start` y `stop`
B) `execute` (procesa la solicitud entrante y genera respuestas/eventos) y `cancel` (controla la cancelación de una tarea en curso, que puede no ser compatible con agentes simples) ✅
C) `train` y `deploy`
D) `authenticate` y `authorize`

**Explicación:** `execute` es el corazón del ejecutor: accede a los detalles de la solicitud (vía `RequestContext`) y coloca los resultados en una cola de eventos (`EventQueue`) para el llamador. `cancel` maneja la interrupción de tareas en curso, aunque agentes simples pueden simplemente indicar que no la admiten.

---

### Q1460
**¿Qué dos objetos usa el ejecutor del agente para entender la solicitud entrante y comunicar los resultados de vuelta, respectivamente?**

A) `HttpRequest` y `HttpResponse`
B) `RequestContext` (para comprender la solicitud entrante) y `EventQueue` (para comunicar resultados o eventos al cliente) ✅
C) `SessionState` y `MemoryBuffer`
D) `AgentCard` y `AgentSkill`

**Explicación:** El `RequestContext` da al ejecutor acceso a la entrada del usuario y al contexto de la tarea; el `EventQueue` es el canal por el que el ejecutor envía mensajes, actualizaciones de estado de tarea o artefactos de vuelta al solicitante.

---

### Q1461
**Según la evaluación oficial del módulo, ¿qué hace específicamente el ejecutor de agente en un agente A2A?**

A) Administra las conexiones de red de bajo nivel entre clientes y servidores
B) Procesa las solicitudes entrantes y genera respuestas o eventos ✅
C) Proporciona una interfaz gráfica para supervisar la actividad del agente
D) Sustituye la necesidad de definir una tarjeta de agente

**Explicación:** Nuevamente, coincide con la respuesta correcta de la evaluación oficial del módulo: el ejecutor traduce las solicitudes del protocolo A2A en invocaciones de la lógica de negocio del agente, y empaqueta el resultado como eventos/respuestas.

---

### Q1462
**Este fragmento del ejercicio crea el cliente del agente de título: `self.client = AgentsClient(endpoint=os.environ['PROJECT_ENDPOINT'], credential=DefaultAzureCredential(exclude_environment_credential=True, exclude_managed_identity_credential=True))`. ¿Qué logra excluir explícitamente `environment_credential` y `managed_identity_credential`?**

A) Deshabilita por completo la autenticación, permitiendo acceso anónimo
B) Fuerza a `DefaultAzureCredential` a omitir esos dos métodos de la cadena de credenciales y recurrir a otro mecanismo disponible (como la CLI de Azure autenticada localmente), útil para un comportamiento de autenticación predecible durante el desarrollo ✅
C) Hace que el agente se autentique usando una clave de API codificada en el código
D) Es un error de sintaxis que impediría ejecutar el código

**Explicación:** `DefaultAzureCredential` normalmente prueba varios métodos en cadena (entorno, identidad administrada, CLI de Azure, etc.). Excluir explícitamente algunos de ellos con parámetros `exclude_*` evita ambigüedad sobre qué credencial se está usando realmente, forzando el comportamiento hacia la credencial de la CLI de Azure en un entorno de desarrollo local.

---

### Q1463
**En el ejercicio, ¿qué hace `agent_executor = create_foundry_agent_executor(agent_card)`?**

A) Crea directamente el servidor HTTP que escuchará las solicitudes
B) Inicializa el ejecutor de agente que actúa como envoltorio (wrapper) del agente de Foundry ya creado, usando la tarjeta del agente como referencia de sus capacidades ✅
C) Genera automáticamente el archivo `.env` del proyecto
D) Reemplaza la necesidad de definir `AgentSkill`

**Explicación:** El ejecutor conecta la lógica específica del agente (creada con `AgentsClient`/`create_agent`) con el protocolo A2A genérico, permitiendo que el `DefaultRequestHandler` invoque `execute`/`cancel` sobre él sin conocer los detalles internos del agente de Foundry.

---

### Q1464
**Este código ensambla el servidor A2A: `a2a_app = A2AStarletteApplication(agent_card=agent_card, http_handler=request_handler)`. ¿Qué representa `request_handler` en este contexto?**

A) Un middleware de autenticación de terceros
B) Una instancia de `DefaultRequestHandler(agent_executor=agent_executor, task_store=InMemoryTaskStore())`, que enruta las solicitudes entrantes a los métodos del ejecutor y gestiona el ciclo de vida de las tareas mediante un almacén de tareas ✅
C) El propio modelo de lenguaje desplegado en Foundry
D) Una función anónima sin estado que solo registra logs

**Explicación:** `DefaultRequestHandler` combina el ejecutor del agente (la lógica) con un `TaskStore` (seguimiento de tareas, streaming, re-suscripciones) — incluso para agentes simples, el módulo aclara que se necesita un almacén de tareas para gestionar las interacciones de forma confiable.

---

### Q1465
**En el flujo del agente de enrutamiento (`routing_agent`), ¿qué pasos sigue al recibir un mensaje de usuario, según el módulo?**

A) Ejecuta directamente su propio modelo de lenguaje sin consultar a ningún otro agente
B) Inicia un hilo de conversación, usa `create_and_process` para evaluar qué agente remoto encaja mejor con el mensaje, enruta la solicitud por HTTP al agente adecuado mediante `send_message` (una llamada asíncrona que debe esperarse con `await`), y devuelve la respuesta del agente remoto al usuario a través del hilo ✅
C) Reenvía el mensaje sin procesar a todos los agentes registrados simultáneamente y descarta las respuestas duplicadas
D) Solo puede comunicarse con agentes que se ejecuten en el mismo proceso Python

**Explicación:** El agente de enrutamiento actúa como orquestador de descubrimiento y delegación: no resuelve la tarea él mismo, sino que decide a qué agente remoto (título, esquema, etc.) delegar, envía el mensaje vía A2A sobre HTTP, y espera (`await`) la respuesta antes de continuar.

---

### Q1466
**¿Qué estructura tiene el `payload` que el agente de enrutamiento construye antes de enviarlo a un agente remoto?**

A) Un simple string de texto plano sin metadatos
B) Un diccionario con la clave `'message'` que incluye `role` (p. ej. `'user'`), `parts` (una lista con `{'kind': 'text', 'text': task}`) y un `messageId` único, que luego se envuelve en un `SendMessageRequest` con `MessageSendParams.model_validate(payload)` ✅
C) Directamente un objeto `FunctionCallOutput`, igual que en function calling
D) Un archivo YAML serializado como cadena base64

**Explicación:** Este es el formato de mensaje estándar de A2A: un rol, contenido dividido en "partes" (que podrían incluir texto u otros tipos de medios) y un identificador único de mensaje — empaquetado formalmente como `SendMessageRequest` antes de invocar `client.send_message(...)`.

---

### Q1467
**¿Qué diferencia hay entre las respuestas de un agente A2A que llegan como "mensajes directos" frente a "respuestas basadas en tareas"?**

A) Son términos intercambiables sin ninguna diferencia práctica
B) Los mensajes directos son salidas inmediatas (texto o contenido estructurado); las respuestas basadas en tareas son objetos que representan trabajo en curso y pueden requerir llamadas de seguimiento para comprobar el estado o recuperar el resultado final ✅
C) Los mensajes directos solo existen en solicitudes de streaming
D) Las respuestas basadas en tareas nunca pueden completarse exitosamente

**Explicación:** Un cliente A2A debe estar preparado para manejar ambos tipos: agentes simples suelen devolver mensajes directos de inmediato, mientras que agentes más avanzados (con tareas de larga duración) devuelven un objeto de tarea que el cliente puede consultar o incluso cancelar más adelante.

---

### Q1468
**En el ejecutor del agente de título, se usa un `TaskUpdater` con llamadas como `await task_updater.update_status(TaskState.working, message=...)` y finalmente `await task_updater.complete(message=...)`. ¿Qué propósito cumple este patrón?**

A) Solo sirve para fines de registro (logging) local, sin comunicarse con el cliente
B) Comunica al llamador (cliente o agente de enrutamiento) el progreso de la tarea en tiempo real (estado "working" con mensajes intermedios) y señala explícitamente cuándo la tarea ha finalizado, con el mensaje final del agente ✅
C) Reinicia automáticamente el agente si la tarea tarda demasiado
D) Cancela la tarea si se detecta cualquier mensaje intermedio

**Explicación:** `TaskUpdater` es el mecanismo por el cual el ejecutor reporta el ciclo de vida de una tarea A2A: actualizaciones de estado mientras se procesa (`TaskState.working`) y una señal final de finalización (`complete`) con el resultado, lo que permite a los clientes (incluidos otros agentes en streaming) seguir el progreso.

---

### Q1469
**En el ejemplo del escritor técnico (agente de título → agente de esquema, coordinados por un agente de enrutamiento), ¿qué habilita específicamente el protocolo A2A que no sería posible con un único agente monolítico?**

A) Que ambos agentes compartan exactamente el mismo prompt de instrucciones
B) Que dos agentes especializados e independientes (cada uno potencialmente en su propio servidor, con su propio modelo y aptitudes declaradas) sean descubiertos dinámicamente por un agente de enrutamiento y encadenados —la salida de uno (el título) se convierte en la entrada del otro (el esquema)— sin que el agente de enrutamiento necesite conocer su implementación interna ✅
C) Que el agente de enrutamiento ejecute directamente el código Python de los otros agentes en el mismo proceso
D) Que se elimine la necesidad de definir instrucciones para cualquiera de los agentes

**Explicación:** El valor de A2A es la composición desacoplada: el agente de enrutamiento solo necesita las tarjetas de agente (metadatos de descubrimiento) para saber qué aptitudes existen y a qué endpoint enviar cada solicitud — no necesita conocer cómo está implementado internamente el agente de título o el de esquema, lo que permite escalar o reemplazar agentes remotos sin tocar el orquestador.

---
