# BANCO DE PREGUNTAS AI-103 — PARTE 18 (Q1500-Q1519)
## Domain 1: SDK/Auth — Desarrollo de agentes con Microsoft Foundry (Portal y Visual Studio Code)
### Generado: 2026-08-18 | Fuente: módulo "Desarrollo de agentes de inteligencia artificial con Microsoft Foundry y Visual Studio Code"

---

### Q1500
**¿Cuáles son los dos tipos principales de agente que admite Microsoft Foundry, y en qué se diferencian?**

A) Agentes gratuitos y agentes de pago
B) Agentes declarativos (definidos por configuración, ya sea basados en mensajes con un único modelo+instrucciones+herramientas, o de flujo de trabajo con orquestación multiagente en YAML) y agentes hospedados (en contenedores, creados e implementados con código, con control total sobre la lógica mientras la plataforma administra la infraestructura) ✅
C) Agentes síncronos y agentes asíncronos
D) Agentes locales y agentes en la nube, sin ninguna otra distinción

**Explicación:** Los agentes declarativos se definen por configuración en vez de código, con dos formas: basados en mensajes (un único agente con modelo, instrucciones, herramientas — el foco de este módulo) o de flujo de trabajo (YAML de orquestación multiagente). Los agentes hospedados, en cambio, se implementan en código y se ejecutan en contenedores gestionados por la plataforma Foundry.

---

### Q1501
**¿Qué distingue a un "agente basado en mensajes" (el tipo más común) de un "agente de flujo de trabajo" dentro de la categoría de agentes declarativos?**

A) Los agentes basados en mensajes nunca pueden usar herramientas
B) Un agente basado en mensajes es una única configuración de modelo + instrucciones + herramientas + avisos; un agente de flujo de trabajo define en YAML una orquestación de varios agentes colaborando para escenarios complejos ✅
C) Los agentes de flujo de trabajo no pueden probarse en el área de juegos
D) Solo los agentes de flujo de trabajo admiten selección de modelo

**Explicación:** Ambos son "declarativos" (configuración, no código), pero el basado en mensajes representa un solo agente independiente, mientras que el de flujo de trabajo describe cómo colaboran varios agentes — coincide con el concepto de orquestación multiagente visto en el módulo de Agent Framework.

---

### Q1502
**¿Cuáles son los campos de nivel superior de un archivo YAML de agente declarativo basado en mensajes, según el ejemplo del módulo?**

A) `endpoint`, `key`, `region`, `sku`
B) `version`, `name`, `description`, `id`, `metadata`, `model` (con `id` y `options` como `temperature`/`top_p`), `instructions` e `tools` ✅
C) `resourceGroup`, `subscriptionId`, `tenantId`
D) Solo `name` y `instructions`; el resto se genera automáticamente y no es editable

**Explicación:** Este es exactamente el esquema mostrado en el ejemplo `healthcare-assistant` del módulo: metadatos de identidad (`name`, `description`, `id`, `metadata` con autores/etiquetas), configuración del modelo (`model.id` y `model.options.temperature`/`top_p`), el prompt de sistema (`instructions`) y el arreglo `tools`.

---

### Q1503
**¿Qué rango de `temperature` recomienda el módulo para agentes empresariales que controlan tareas estructuradas?**

A) Entre 0.3 y 0.7 ✅
B) Siempre exactamente 0 para evitar cualquier variación
C) Entre 1.5 y 2.0 para maximizar la creatividad
D) La temperatura no afecta a los agentes empresariales, solo a los modelos de chat genéricos

**Explicación:** Valores bajos (0.1-0.3) producen salidas centradas y coherentes; valores altos (0.7-1.0) generan respuestas más creativas y variadas. Para tareas empresariales estructuradas, el punto medio (0.3-0.7) suele ser el más apropiado, balanceando consistencia con cierta flexibilidad.

---

### Q1504
**¿Cuáles son las ventajas de editar directamente el archivo YAML de un agente en lugar de usar solo el diseñador visual?**

A) El YAML no ofrece ninguna ventaja real sobre la interfaz visual
B) Control de versiones en Git, actualizaciones masivas simultáneas, creación de plantillas reutilizables, inclusión en revisiones de código estándar, y automatización mediante scripts que generan o modifican configuraciones ✅
C) Solo permite cambiar el nombre del agente; todo lo demás requiere la interfaz visual
D) El YAML solo es válido para agentes hospedados, nunca para declarativos

**Explicación:** Estas cinco ventajas (versionado, cambios masivos, plantillas, revisión de código, automatización) son las que el módulo atribuye explícitamente a trabajar con la configuración YAML directamente, complementando (no reemplazando) al diseñador visual — ambas vistas permanecen sincronizadas.

---

### Q1505
**¿Cuál es la diferencia clave entre "implementar" (deploy) y "publicar" (publish) un agente en Microsoft Foundry?**

A) Son sinónimos exactos; ambos términos describen la misma acción
B) Implementar guarda la configuración del agente dentro del área de trabajo del proyecto (para pruebas/iteración con el equipo); publicar mueve el agente a un recurso de Azure administrado independiente ("aplicación de agente") con su propia URL de invocación estable, identidad de Entra y directiva de autenticación, accesible por consumidores externos sin acceso al proyecto ✅
C) Implementar requiere una suscripción de pago; publicar es siempre gratuito
D) Publicar solo está disponible para agentes hospedados, nunca para declarativos

**Explicación:** La diferencia clave es el ámbito (scope): la implementación mantiene el agente accesible solo dentro del proyecto; la publicación crea un endpoint dedicado con su propia identidad de seguridad, pensado para ser invocado por aplicaciones externas sin darles acceso al proyecto de Foundry completo.

---

### Q1506
**TRAMPA: Un agente usa una herramienta que llama a Azure AI Search y funciona perfectamente durante el desarrollo. Después de publicarlo como aplicación de agente, esa misma herramienta empieza a fallar con errores de autorización (403). ¿Por qué?**

A) Azure AI Search se desconecta automáticamente cuando un agente se publica
B) Al publicar, el agente recibe una identidad de Microsoft Entra dedicada e independiente de la identidad compartida del proyecto; los permisos de desarrollo no se transfieren automáticamente, por lo que hay que reasignar los roles RBAC correspondientes a la nueva identidad publicada ✅
C) Las herramientas se deshabilitan automáticamente 24 horas después de publicar
D) El error indica que el modelo de lenguaje fue eliminado durante la publicación

**Explicación:** Este es el mismo patrón de "identidad nueva tras publicar" visto en el módulo de integración con Microsoft 365: la aplicación de agente publicada tiene su propia identidad Entra, y omitir la reasignación de roles RBAC sobre los recursos a los que acceden sus herramientas es la causa más común de que integraciones que funcionaban en desarrollo fallen justo después de publicar.

---

### Q1507
**¿Qué tipo de autenticación admite el punto de conexión de una aplicación de agente publicada, según el módulo?**

A) Autenticación de clave de API únicamente
B) Identidad de Microsoft Entra: los llamantes deben tener el rol "Usuario de Azure AI" sobre el recurso de aplicación de agente; la autenticación por clave de API NO se admite para aplicaciones de agente ✅
C) Autenticación básica con usuario y contraseña
D) No requiere ninguna autenticación una vez publicado

**Explicación:** El módulo lo señala explícitamente como una advertencia importante: a diferencia de otros recursos de Azure que sí admiten claves de API, las aplicaciones de agente publicadas requieren Entra ID con el rol RBAC "Usuario de Azure AI" — un 403 Forbidden al llamar al endpoint casi siempre indica que falta ese rol.

---

### Q1508
**¿Qué característica clave tiene el punto de conexión de una aplicación de agente publicada respecto a la gestión del historial de conversación?**

A) Administra automáticamente el historial completo del lado del servidor, igual que un agente dentro del proyecto
B) Actualmente solo admite la API de respuestas SIN estado (stateless); el cliente debe almacenar el historial de conversación por su cuenta para lograr experiencias de varios turnos ✅
C) El historial se sincroniza automáticamente entre todos los clientes que llaman al mismo endpoint
D) No es posible tener conversaciones de varios turnos con un agente publicado bajo ninguna circunstancia

**Explicación:** Esto contrasta con el patrón usado dentro del proyecto (donde `openai_client.conversations.create()` mantiene el estado del lado del servicio): el endpoint de la aplicación de agente publicada es sin estado, así que el cliente que la consume debe gestionar y reenviar el historial de conversación él mismo en cada llamada para mantener contexto entre turnos.

---

### Q1509
**Al actualizar un agente publicado con una nueva versión, ¿qué sucede con la URL del punto de conexión y el tráfico existente?**

A) Se genera una nueva URL que los consumidores deben actualizar manualmente
B) La URL del punto de conexión permanece sin cambios, y la aplicación de agente enruta automáticamente el 100% del tráfico a la nueva versión, por lo que las integraciones existentes siguen funcionando sin interrupción ✅
C) El endpoint deja de funcionar hasta que se reconfiguren manualmente todos los clientes
D) Las versiones anteriores y nuevas reciben tráfico dividido 50/50 de forma permanente

**Explicación:** La estabilidad de la URL es una de las razones de ser de "publicar" un agente: la aplicación de agente actúa como capa de enrutamiento estable, de modo que republicar una versión actualizada no rompe a los consumidores externos que ya integraron el endpoint original.

---

### Q1510
**Al verificar manualmente un endpoint de aplicación de agente publicada con `curl`, ¿qué header de autenticación se necesita, y cómo se obtiene el valor en desarrollo?**

A) `X-API-Key`, obtenido desde el portal de Azure
B) `Authorization: Bearer <access-token>`, donde el token se obtiene con `az account get-access-token --resource https://ai.azure.com` ✅
C) `Cookie: session=<id>`, generado al iniciar sesión en el portal web
D) No se necesita ningún header; basta con la URL pública

**Explicación:** Como la autenticación es vía Entra ID (no clave de API), el flujo de verificación manual usa la CLI de Azure para obtener un token de acceso con el recurso `https://ai.azure.com`, y ese token se pasa como `Bearer` en el header `Authorization` de la solicitud HTTP al endpoint.

---

### Q1511
**En el ejercicio de la aplicación cliente, ¿qué código se usa para conectarse a un agente que YA fue creado previamente en el portal de Foundry (en vez de crear uno nuevo)?**

A) `project_client.agents.create_version(agent_name=..., definition=...)`
B) `agent = project_client.agents.get(agent_name=agent_name)` ✅
C) `Agent(client=client, name=..., instructions=...)`
D) `AgentsClient.new(name=agent_name)`

**Explicación:** A diferencia de los ejercicios que crean un agente nuevo desde código (`create_version`), este flujo asume que el agente `it-support-agent` ya existe (fue creado en el portal con sus herramientas e instrucciones configuradas visualmente), y el script cliente simplemente lo recupera con `project_client.agents.get(agent_name=agent_name)` para empezar a conversar con él.

---

### Q1512
**Cuando el intérprete de código genera un archivo (por ejemplo, un gráfico o CSV procesado) dentro de su entorno aislado, ¿qué mecanismo usa el código cliente para descargarlo localmente?**

A) El archivo se adjunta automáticamente como base64 en `response.output_text`, sin pasos adicionales
B) Se detecta una anotación de tipo `container_file_citation` en el contenido de la respuesta, y se descarga con `openai_client.containers.files.content.retrieve(file_id=..., container_id=...)`, usando el `file_id` y `container_id` de esa anotación ✅
C) Es necesario acceder manualmente al portal de Azure y descargar el archivo desde Azure Storage
D) El código interpreter nunca puede generar archivos descargables, solo texto

**Explicación:** El SDK expone las referencias a archivos generados en el sandbox del intérprete de código como anotaciones `container_file_citation` dentro del contenido del mensaje; el cliente usa esos identificadores (`file_id`, `container_id`) para recuperar el contenido binario real vía `openai_client.containers.files.content.retrieve(...)` y guardarlo localmente.

---

### Q1513
**¿Cuáles son las tres categorías en las que el catálogo de herramientas de Foundry organiza las herramientas disponibles?**

A) Gratuitas, de pago y en versión preliminar
B) Configuradas (herramientas integradas listas para usar, como intérprete de código y búsqueda de archivos), Catálogo (herramientas adicionales que se pueden agregar, incluidos servidores MCP) y Personalizado (herramientas propias vía especificaciones OpenAPI o implementaciones personalizadas) ✅
C) Locales, remotas e híbridas
D) De texto, de imagen y de audio

**Explicación:** Esta clasificación de tres niveles organiza el catálogo de herramientas tanto en el portal como en la extensión de VS Code, yendo desde lo más listo para usar (Configuradas) hasta lo completamente personalizado (Custom vía OpenAPI o implementación propia).

---

### Q1514
**¿Cuáles son los tres tipos de servidores MCP que admite el catálogo de herramientas de Foundry, y para qué se usa típicamente cada uno?**

A) Rápidos, lentos y en caché
B) Remotos (hospedados externamente, más comunes en producción), locales (se ejecutan en el equipo del desarrollador, útiles para probar herramientas personalizadas antes de implementar) y personalizados (implementaciones propias de servidor MCP adaptadas a necesidades específicas) ✅
C) Gratuitos, de prueba y empresariales
D) Solo existe un tipo de servidor MCP en Foundry; la distinción no aplica

**Explicación:** Esta clasificación refleja el ciclo de vida típico de desarrollo: se prueba con un servidor MCP local, se despliega en producción con uno remoto (o se construye un servidor personalizado completamente propio cuando las necesidades son muy específicas).

---

### Q1515
**Este fragmento de YAML define herramientas de un agente: `tools: - type: code_interpreter / - type: bing_grounding, bing_grounding: connection_id: "your-connection-id" / - type: file_search, file_search: vector_store_ids: - "vectorstore-123"`. ¿Qué patrón general siguen las entradas de este arreglo?**

A) Cada herramienta requiere una suscripción de Azure completamente separada
B) Cada entrada del arreglo `tools` especifica un `type`, y algunas herramientas requieren parámetros de configuración adicionales anidados bajo su propio nombre (como `connection_id` para `bing_grounding` o `vector_store_ids` para `file_search`), mientras que otras (como `code_interpreter`) no necesitan configuración extra ✅
C) Solo se puede declarar una herramienta por agente en el archivo YAML
D) El orden de las herramientas en el arreglo determina cuál se ejecuta primero en cada conversación

**Explicación:** El arreglo `tools` lista cada herramienta habilitada con su `type`; herramientas simples como `code_interpreter` no requieren más que eso, mientras que herramientas que dependen de recursos externos (una conexión de Bing, un almacén de vectores para búsqueda de archivos) necesitan sus propios parámetros de configuración anidados con el mismo nombre que el `type`.

---

### Q1516
**¿Qué recomienda el módulo como buena práctica al elegir entre una herramienta integrada y construir una integración personalizada?**

A) Siempre construir herramientas personalizadas, ya que las integradas están obsoletas
B) Comenzar con herramientas integradas antes de crear soluciones personalizadas, ya que las herramientas integradas están probadas, mantenidas y optimizadas para la plataforma ✅
C) Nunca usar herramientas integradas en agentes de producción
D) Las herramientas personalizadas y las integradas son mutuamente excluyentes; un agente solo puede usar un tipo

**Explicación:** Esta es una de las prácticas recomendadas listadas explícitamente: priorizar el catálogo de herramientas integradas (Configuradas/Catálogo) reduce la carga de mantenimiento y aprovecha componentes ya probados por la plataforma, reservando el desarrollo personalizado (OpenAPI, servidores MCP propios) para necesidades que realmente no cubre el catálogo existente.

---

### Q1517
**TRAMPA: Alguien concluye que como el portal de Foundry no requiere escribir código, no es adecuado para "desarrollo real" y solo la extensión de VS Code cuenta como desarrollo legítimo. ¿Por qué el módulo contradice esta idea?**

A) Porque el portal de Foundry en realidad requiere tanto código como VS Code
B) Porque ambos enfoques ofrecen funcionalidades completas de desarrollo de agentes (difieren principalmente en el estilo de interfaz, no en las capacidades); muchos equipos usan el portal para exploración inicial y revisión con partes interesadas, y VS Code para implementaciones detalladas con control de versiones — no son mutuamente excluyentes ✅
C) Porque VS Code en realidad no puede crear ni configurar agentes, solo puede verlos
D) Porque el portal de Foundry solo sirve para eliminar agentes, nunca para crearlos

**Explicación:** El módulo enfatiza que el flujo de trabajo típico de desarrollo (conectar al proyecto → crear agente → configurar instrucciones → agregar herramientas → probar → iterar → implementar → publicar → integrar) es el mismo independientemente del enfoque elegido; la elección depende de preferencias de flujo de trabajo y composición del equipo, no de cuál es "más real".

---

### Q1518
**¿Qué recursos de Azure son necesarios como mínimo para desarrollar agentes con el servicio Microsoft Foundry Agent, independientemente de si se usa el portal o VS Code?**

A) Un clúster de Azure Kubernetes Service y una base de datos Cosmos DB
B) Un proyecto de Microsoft Foundry (que organiza agentes, modelos y recursos relacionados) y al menos una implementación de modelo de IA (como GPT-4.1) que impulse al agente ✅
C) Azure Key Vault y Azure Functions son estrictamente obligatorios desde el primer agente
D) Ningún recurso de Azure es necesario; todo se ejecuta localmente sin conexión

**Explicación:** Estos dos son los recursos base compartidos por ambos enfoques de desarrollo. Servicios adicionales (Azure AI Search, Azure Storage, Key Vault, Azure Functions) se integran opcionalmente según las funcionalidades específicas que el agente necesite (por ejemplo, Key Vault para secretos o Functions para herramientas personalizadas), pero no son obligatorios para empezar.

---

### Q1519
**¿Qué debe hacer una aplicación cliente en producción que integra un agente publicado, según las "consideraciones de producción" del módulo, respecto a errores transitorios y límites de velocidad?**

A) Ignorar los errores transitorios; el servicio los reintenta automáticamente sin que el cliente haga nada
B) Implementar lógica de reintento con retroceso exponencial para errores transitorios, manejar la limitación de velocidad con estrategias de retroceso, y validar los datos de entrada antes de enviarlos al agente ✅
C) Detener permanentemente todas las llamadas al agente ante el primer error, sin reintentar nunca
D) Aumentar indefinidamente la frecuencia de solicitudes hasta que el error desaparezca

**Explicación:** El módulo lista el control de errores como un área operativa crítica en producción: reintentos con backoff exponencial para fallos transitorios, manejo específico de la limitación de velocidad (rate limiting), y validación de entradas antes de enviarlas — todo esto junto con supervisión (Application Insights), seguridad (identidades administradas, privilegio mínimo) y administración de costos (límites de longitud de respuesta, throttling).

---
