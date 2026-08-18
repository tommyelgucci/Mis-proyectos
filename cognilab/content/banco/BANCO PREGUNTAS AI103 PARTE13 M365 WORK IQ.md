# BANCO DE PREGUNTAS AI-103 — PARTE 13 (Q1250-Q1269)
## Domain 2: Tools — Integración del agente con Microsoft 365 y Work IQ
### Generado: 2026-08-18 | Fuente: módulo "Integración del agente con Microsoft 365"

---

### Q1250
**¿Qué recurso de Azure crea automáticamente el portal de Foundry al publicar un agente en Microsoft Teams?**

A) Azure Functions
B) Azure Bot Service ✅
C) Azure Cosmos DB
D) Azure Logic Apps

**Explicación:** El proceso de publicación desde el portal de Foundry crea un recurso de Azure Bot Service, que enruta los mensajes entre Microsoft 365 (Teams/Copilot) y el agente. Por eso el proveedor `Microsoft.BotService` debe estar registrado en la suscripción antes de publicar.

---

### Q1251
**¿Cuál es la diferencia principal entre el ámbito "compartido" y el ámbito "de organización" al publicar un agente en Microsoft 365?**

A) El ámbito compartido requiere más recursos de Azure que el de organización
B) El ámbito de organización requiere aprobación de un administrador antes de que el agente esté disponible para todos los usuarios del tenant; el compartido está disponible de inmediato bajo "Sus agentes" ✅
C) El ámbito compartido solo funciona dentro del área de juegos de Foundry, nunca en Teams real
D) El ámbito de organización ofrece mejor rendimiento técnico del modelo

**Explicación:** El ámbito compartido (Shared) aparece de inmediato en "Tus agentes" sin aprobación — ideal para pruebas y equipos pequeños. El ámbito de organización aparece en "Creado por su organización" pero requiere que un administrador apruebe la solicitud desde el Centro de administración de Microsoft 365 antes de estar disponible para todo el tenant — ideal para producción.

---

### Q1252
**TRAMPA: Un agente usa una herramienta de `file_search` contra un índice de Azure AI Search y funciona perfectamente en el área de juegos de Foundry. Después de publicarlo en Teams, la misma herramienta empieza a fallar con errores de permisos. ¿Cuál es la causa más probable?**

A) Azure AI Search dejó de estar disponible en la región
B) Al publicar, el agente recibe una identidad de Microsoft Entra distinta e independiente del proyecto de desarrollo; los permisos de tiempo de desarrollo no se transfieren automáticamente a esa nueva identidad, así que debe reasignarse el rol de RBAC correspondiente sobre el recurso ✅
C) Las herramientas de `file_search` se deshabilitan automáticamente fuera del área de juegos
D) Teams no admite agentes que usen herramientas de búsqueda

**Explicación:** Publicar un agente crea una "aplicación de agente" con su propia identidad de Entra, distinta de la identidad usada durante el desarrollo en el proyecto de Foundry. Cualquier recurso al que las herramientas del agente necesiten acceder (Azure AI Search, Storage, Cosmos DB, etc.) requiere que se le asignen explícitamente los roles RBAC adecuados a esta nueva identidad publicada — de lo contrario, herramientas que funcionaban en desarrollo fallan en producción.

---

### Q1253
**Al publicar un agente, ¿qué tres elementos crea Microsoft Foundry para la nueva "aplicación de agente"?**

A) Un nuevo modelo de lenguaje, un dataset de entrenamiento y un pipeline de MLOps
B) Una URL de invocación dedicada y estable, una identidad de Microsoft Entra distinta del proyecto de desarrollo, y aislamiento de los datos de interacción entre usuarios ✅
C) Una base de datos SQL, un contenedor Docker y un balanceador de carga
D) Un nuevo proyecto de Foundry completo, independiente del original

**Explicación:** La aplicación de agente publicada actúa como capa de enrutamiento estable: expone una URL de invocación que no cambia entre versiones, tiene su propia identidad de Entra (separada del proyecto), y aísla las interacciones de cada usuario para que no sean visibles entre sí.

---

### Q1254
**¿Qué NO debe incluirse nunca en los campos de metadatos (nombre, descripción, información de contacto) al preparar la publicación de un agente?**

A) El nombre para mostrar del agente
B) Secretos, claves de API o información confidencial, ya que estos campos son visibles para cualquier usuario que descubra el agente en la tienda ✅
C) La URL de la política de privacidad
D) Los iconos en formato PNG

**Explicación:** El módulo advierte explícitamente: los metadatos de publicación (nombre, descripción, contacto, iconos, URLs de política) son visibles públicamente para los usuarios que encuentran el agente en la tienda de Teams, por lo que nunca deben contener secretos ni claves de API.

---

### Q1255
**¿Cuándo debería considerar usar el Microsoft 365 Agents Toolkit en lugar de publicar directamente desde el portal de Foundry?**

A) Para todas las implementaciones, sin excepción
B) Cuando necesite inicio de sesión único (SSO) personalizado más allá de la configuración predeterminada de Entra ID, lógica de middleware personalizada, o implementación en varios entornos (dev/staging/producción) ✅
C) Únicamente cuando el agente no usa ninguna herramienta
D) Solo cuando se publica en el ámbito compartido

**Explicación:** La publicación directa desde Foundry cubre la mayoría de escenarios en minutos y sin código adicional. El Agents Toolkit se reserva para necesidades avanzadas: SSO personalizado, middleware (procesamiento, logging, transformación entre Teams y el agente), múltiples entornos con configuraciones independientes, y pipelines CI/CD (GitHub Actions/Azure DevOps).

---

### Q1256
**¿Cuál es la arquitectura que introduce el enfoque del Microsoft 365 Agents Toolkit, a diferencia de la publicación directa?**

A) Teams/Copilot se conecta directamente al modelo de lenguaje, sin pasar por Foundry
B) Teams/Copilot → Aplicación proxy (creada con Agents Toolkit) → Agente de Foundry; la app proxy recibe mensajes vía Azure Bot Service, aplica middleware personalizado, reenvía al agente y devuelve la respuesta ✅
C) El Agents Toolkit reemplaza por completo a Azure Bot Service
D) Foundry se conecta directamente a Microsoft Graph sin pasar por Teams

**Explicación:** El Toolkit introduce una capa intermedia (aplicación proxy) entre Microsoft 365 y el agente de Foundry, dándote control total sobre cada paso del flujo de mensajes a cambio de mayor complejidad de implementación (horas/días de preparación en vez de minutos, y requiere escribir código de la app proxy).

---

### Q1257
**Más allá de Microsoft 365, ¿cuáles son otros canales de publicación disponibles para un agente de Foundry mencionados en el módulo?**

A) Solo Microsoft 365; no existen otros canales
B) Vista previa de aplicación web, un punto de conexión de API REST estable, y canales de Azure Bot Service como Slack, Telegram, Twilio (SMS) y Facebook ✅
C) Únicamente WhatsApp Business API
D) Solo aplicaciones móviles nativas de iOS/Android

**Explicación:** Foundry no limita la publicación a Microsoft 365: ofrece una vista previa web para demos, un endpoint de API REST estable para integrarlo en apps personalizadas, y los canales que expone Azure Bot Service (Slack, Telegram, Twilio SMS, Facebook, entre otros).

---

### Q1258
**¿Qué es Microsoft Work IQ, en una frase precisa?**

A) Un modelo de machine learning que analiza el desempeño de los empleados
B) Una CLI y un servidor MCP que conecta agentes de IA a los datos de Microsoft 365 Copilot (correos, reuniones, documentos, Teams, contactos) ✅
C) Un reemplazo directo de Microsoft Teams
D) Una extensión de Visual Studio Code exclusivamente para depuración

**Explicación:** Work IQ es tanto una herramienta de línea de comandos como un servidor MCP: permite a los agentes de IA consultar en lenguaje natural datos del área de trabajo (M365) a los que el usuario autenticado ya tiene acceso, sin necesidad de integrar cada API de Microsoft Graph manualmente.

---

### Q1259
**¿Cuál es la diferencia clave entre Work IQ y Foundry IQ, según el módulo?**

A) Son exactamente el mismo servicio con nombres distintos
B) Work IQ conecta al agente con datos del área de trabajo (correos, reuniones, chats de Teams — "lo que la gente realmente hace y dice"); Foundry IQ conecta con bases de conocimiento oficiales (documentación, políticas — "lo que está documentado oficialmente") ✅
C) Work IQ solo funciona con documentos PDF; Foundry IQ solo con datos de Teams
D) Foundry IQ requiere licencia de Copilot; Work IQ no requiere ninguna licencia

**Explicación:** El escenario de "Inteligencia combinada" del laboratorio ilustra la distinción: Work IQ refleja discusiones informales y actividad real del área de trabajo, mientras que Foundry IQ refleja documentación oficial. Usados juntos, permiten comparar lo documentado con lo realmente discutido y detectar inconsistencias.

---

### Q1260
**¿Qué requisito organizacional es obligatorio antes de que un usuario pueda usar Work IQ contra los datos de su tenant?**

A) Ninguno; Work IQ funciona sin configuración adicional en cualquier cuenta de Microsoft 365
B) Una licencia de Microsoft 365 Copilot y el consentimiento del administrador de Microsoft Entra para la aplicación Work IQ, ya que accede a datos de toda la organización ✅
C) Solo se requiere tener Node.js instalado
D) Solo se requiere una suscripción de Azure con rol de Contributor

**Explicación:** Work IQ solo funciona con cuentas habilitadas para M365 Copilot, y como accede a datos organizacionales a través de Microsoft Graph, requiere consentimiento administrativo explícito en Entra ID (cuentas organizacionales) antes de poder usarse.

---

### Q1261
**¿Qué modelo de seguridad sigue Work IQ al acceder a los datos de Microsoft 365 de un usuario?**

A) Acceso total a todos los datos del tenant, independientemente de los permisos del usuario
B) Acceso basado en permisos existentes (solo ve lo que el usuario ya tiene permiso de ver vía Microsoft Graph), sin almacenar los datos, con auditoría empresarial y visibilidad para administradores ✅
C) Los datos se copian y almacenan en una base de datos separada gestionada por Work IQ
D) El acceso es anónimo y no queda registrado en ningún log

**Explicación:** Work IQ hereda el modelo de seguridad de M365 Copilot: consulta a través de Microsoft Graph con la identidad autenticada del usuario (por lo que nunca ve más de lo que ese usuario ya podría ver), no persiste los datos localmente, y todo el acceso queda sujeto a las políticas de seguridad y auditoría de la organización.

---

### Q1262
**Este es el patrón de inicialización del cliente MCP de Work IQ:
```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

self.workiq_server_params = StdioServerParameters(
    command="npx",
    args=["-y", "@microsoft/workiq", "mcp"],
)

async def _fetch():
    async with stdio_client(self.workiq_server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools_result = await session.list_tools()
            return tools_result.tools

raw_tools = asyncio.run(_fetch())
```
¿Qué decisión de diseño ilustra el hecho de que se abra una nueva sesión MCP en cada operación, en vez de mantener una conexión persistente?**

A) Es un error del ejercicio; siempre se debe reutilizar la misma sesión para todas las operaciones
B) Es una decisión intencional del laboratorio: en vez de mantener una conexión persistente, cada llamada a una herramienta abre y cierra su propia sesión MCP usando los mismos `StdioServerParameters` guardados ✅
C) Significa que Work IQ no admite el protocolo MCP estándar
D) Obliga a reiniciar el agente de Foundry en cada llamada

**Explicación:** El módulo señala explícitamente este patrón: "Rather than maintaining a persistent connection, a new MCP session is opened per operation." `StdioServerParameters` solo almacena el comando y los argumentos para lanzar el subproceso del servidor MCP de Work IQ cada vez que se necesita.

---

### Q1263
**Al convertir las herramientas descubiertas de Work IQ en herramientas del agente:
```python
from azure.ai.projects.models import PromptAgentDefinition, FunctionTool

workiq_tools = [
    FunctionTool(
        name=tool.name,
        description=tool.description,
        parameters=tool.inputSchema,
    )
    for tool in raw_tools
]

self.agent = self.project_client.agents.create_version(
    agent_name="workplace-intelligence-agent",
    definition=PromptAgentDefinition(
        model=self.model_deployment,
        instructions="You are a workplace intelligence assistant...",
        tools=workiq_tools,
    ),
)
```
¿De dónde proviene el JSON Schema usado en `parameters=tool.inputSchema`?**

A) Se escribe manualmente para cada herramienta, como en el ejercicio de function calling personalizado
B) Se toma directamente de `tool.inputSchema`, el esquema que el propio servidor MCP de Work IQ ya expone para cada herramienta descubierta ✅
C) Siempre es un objeto vacío `{}` porque Work IQ no define esquemas
D) Se genera automáticamente a partir de las `instructions` del agente

**Explicación:** A diferencia de escribir manualmente cada esquema (como en un `FunctionTool` de function calling personalizado), aquí el esquema (`tool.inputSchema`) ya viene definido por el servidor MCP y solo se reutiliza al construir el `FunctionTool` correspondiente — es el mismo principio de descubrimiento dinámico visto en la integración general de MCP.

---

### Q1264
**Este es el bucle de ejecución de herramientas de Work IQ:
```python
while True:
    if response.status == "failed":
        break
    input_list = []
    for item in response.output:
        if item.type == "function_call":
            kwargs = json.loads(item.arguments)
            async def _execute():
                async with stdio_client(self.workiq_server_params) as (read, write):
                    async with ClientSession(read, write) as session:
                        await session.initialize()
                        return await session.call_tool(item.name, kwargs)
            result = asyncio.run(_execute())
            input_list.append(FunctionCallOutput(
                type="function_call_output",
                call_id=item.call_id,
                output=result.content[0].text,
            ))
    if input_list:
        response = self.openai_client.responses.create(
            input=input_list,
            previous_response_id=response.id,
            extra_body={"agent_reference": {"name": self.agent.name, "type": "agent_reference"}},
        )
    else:
        break
```
¿Qué se envía de vuelta al agente después de invocar `session.call_tool(item.name, kwargs)`, y en qué se diferencia de simplemente imprimir el resultado?**

A) `FunctionCallOutput(type="function_call_output", call_id=item.call_id, output=result.content[0].text)`, en una nueva llamada a `responses.create(input=input_list, previous_response_id=response.id, ...)` ✅
B) El objeto `result` completo, sin procesar, como parámetro `raw_output`
C) Nada; el resultado se imprime solo en la terminal del desarrollador
D) Un nuevo objeto `Agent` reemplazando al anterior

**Explicación:** El patrón es idéntico al de function calling estándar: se extrae el texto del resultado (`result.content[0].text`), se empaqueta como `FunctionCallOutput` con el `call_id` original, y se reenvía con `previous_response_id` para que el agente continúe la conversación con la información recuperada.

---

### Q1265
**¿Qué diferencia hay entre el "modo CLI" y el "modo de servidor MCP" de Work IQ?**

A) Son tecnologías completamente distintas que acceden a datos diferentes
B) Ambos acceden a los mismos datos con los mismos permisos; la CLI (`workiq ask -q "..."`) es para consultas puntuales desde terminal o scripts, mientras que el modo servidor MCP permite que un asistente de IA (como GitHub Copilot en VS Code, o un agente de Foundry) consulte el contexto automáticamente durante la conversación ✅
C) El modo CLI requiere licencia de Copilot; el modo servidor MCP no la requiere
D) Solo el modo servidor MCP respeta los permisos del usuario autenticado

**Explicación:** Ambos modos comparten la misma base de datos y modelo de permisos vía Microsoft Graph. La diferencia es de interfaz: la CLI es explícita e ideal para scripts/consultas rápidas, mientras que el modo servidor MCP se integra de forma transparente en el flujo del asistente de IA, que decide cuándo consultar Work IQ según la conversación.

---

### Q1266
**TRAMPA: Un desarrollador concluye que, como Work IQ "ya hace todo el trabajo pesado de RAG", no hace falta preocuparse por permisos ni por qué datos puede ver el agente. ¿Por qué esta suposición es incorrecta?**

A) Porque Work IQ nunca funciona con agentes de Foundry
B) Porque Work IQ solo puede acceder a los datos que el usuario autenticado ya tiene permiso de ver — el agente no obtiene acceso "extra" a datos de la organización más allá de lo que esa identidad podría consultar manualmente, y todo queda sujeto a auditoría ✅
C) Porque Work IQ requiere reescribir manualmente los permisos de cada documento antes de cada consulta
D) Porque Work IQ ignora por completo las políticas de seguridad del tenant

**Explicación:** El modelo de seguridad de Work IQ es "acceso basado en permisos": el agente no adquiere privilegios nuevos, simplemente actúa en nombre de la identidad autenticada a través de Microsoft Graph. Confundir "automatiza la búsqueda" con "no hay que pensar en permisos" es un error conceptual que el examen puede evaluar con un escenario de este tipo.

---

### Q1267
**Un candidato que ya estudió Foundry IQ y MCP a fondo asume que Work IQ es "exactamente lo mismo pero con otro nombre" y no le presta atención en el examen. ¿Qué detalle específico de Work IQ podría costarle una pregunta si no lo distingue de Foundry IQ/MCP genérico?**

A) Que Work IQ, a diferencia de un servidor MCP genérico, requiere explícitamente una licencia de Microsoft 365 Copilot y consentimiento administrativo de Entra ID — sin esto, ni siquiera el comando `workiq ask` funciona ✅
B) Que Work IQ no usa el protocolo MCP en absoluto
C) Que Work IQ solo puede ejecutarse dentro de Azure Functions
D) Que Work IQ reemplaza a `FunctionTool` con una clase llamada `WorkIQTool`

**Explicación:** Work IQ sí se basa en MCP (como Foundry IQ), y sus herramientas se envuelven igual como `FunctionTool`. Lo que lo distingue como caso de examen es su requisito duro de licencia M365 Copilot + consentimiento admin — sin esos dos elementos el laboratorio completo es inviable, algo que no aplica de la misma forma a un servidor MCP genérico o a `OpenApiTool`.

---

### Q1268
**¿Qué comando se usa para aceptar el Contrato de Licencia de Usuario Final (EULA) de Work IQ antes de poder usarlo por primera vez?**

A) `workiq accept-eula` ✅
B) `npm accept-license workiq`
C) `az workiq login`
D) No es necesario aceptar ningún EULA

**Explicación:** Después de instalar Work IQ globalmente (`npm install -g @microsoft/workiq`), el primer paso obligatorio antes de cualquier consulta es `workiq accept-eula`. Sin este paso, comandos como `workiq ask -q "..."` no funcionarán.

---

### Q1269
**Según el escenario de "Inteligencia combinada" (Work IQ + Foundry IQ juntos), ¿cuál es el valor de usar ambos a la vez frente a usar solo uno?**

A) Duplican el mismo resultado, por lo que no aporta ningún valor adicional
B) Permite comparar lo que está documentado oficialmente (Foundry IQ) contra lo que realmente se discute en el día a día (Work IQ), identificando brechas o inconsistencias entre la política oficial y la práctica real ✅
C) Foundry IQ deja de funcionar si Work IQ está activo en el mismo agente
D) Solo sirve para reducir el costo de tokens del modelo

**Explicación:** El "Key Insight" del laboratorio lo resume así: Work IQ dice qué está haciendo y diciendo realmente la gente; Foundry IQ dice qué está oficialmente documentado. Combinados, dan contexto completo para la toma de decisiones — por ejemplo, detectar que la política oficial de trabajo remoto no coincide con lo que realmente se está discutiendo en Teams.

---
