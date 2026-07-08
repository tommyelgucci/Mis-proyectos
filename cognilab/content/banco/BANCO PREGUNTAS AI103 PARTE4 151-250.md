# BANCO DE PREGUNTAS AI-103 — PARTE 4 (Q151-Q250)
## Domain 1: SDK, Autenticación y Fundamentos de Responses API
### Generado: 2026-07-08 | Continúa numeración desde BANCO_PREGUNTAS_AI103_PARTE3 (hasta Q150)

---

**INSTRUCCIONES DE USO:** Cada pregunta sigue formato examen real: escenario/pregunta + 4 opciones + respuesta correcta marcada + explicación de por qué es correcta Y por qué las demás son trampa.

---

### Q151
**¿Cuál método del cliente AzureOpenAI se usa para crear una respuesta con la Responses API?**

A) `client.chat.create()`
B) `client.completions.create()`
C) `client.responses.create()` ✅
D) `client.generate()`

**Explicación:** La Responses API introduce `client.responses.create()` como el método principal para interactuar con el modelo de forma orientada a agentes, distinto del método legacy `client.chat.completions.create()`. Las opciones A y D no existen en el SDK oficial.

---

### Q152
**Un desarrollador necesita leer el texto generado por el modelo usando la Responses API. ¿Qué atributo usa?**

A) `response.text`
B) `response.output_text` ✅
C) `response.message.content`
D) `response.result`

**Explicación:** `output_text` es el atributo específico de Responses API que consolida el texto de salida en un string directo, incluso si la respuesta tuvo múltiples bloques de contenido. Confundir esto con `choices[0].message.content` (de Chat Completions) es el error #1 reportado en el examen.

---

### Q153
**¿Qué parámetro reemplaza al array `messages` con `role: "system"` en la Responses API?**

A) `system_prompt`
B) `context`
C) `instructions` ✅
D) `directive`

**Explicación:** `instructions` es un parámetro de texto plano que se pasa directamente a `responses.create()`, simplificando la construcción del system message sin necesidad de estructurar un array de mensajes.

---

### Q154
**Un chatbot de soporte necesita mantener contexto de conversación en 5 turnos consecutivos sin re-enviar todo el historial. ¿Qué debe usar?**

A) `conversation_id`
B) `previous_response_id` ✅
C) `session_token`
D) `context_window`

**Explicación:** Cada llamada a `responses.create()` devuelve un `response.id`. Pasar ese ID como `previous_response_id` en la siguiente llamada permite que Azure gestione el estado internamente, reduciendo tokens enviados y latencia.

---

### Q155
**¿Qué credential class se recomienda para autenticación en producción sin exponer API keys?**

A) `StaticCredential`
B) `DefaultAzureCredential` ✅
C) `ManualCredential`
D) `APIKeyCredential`

**Explicación:** `DefaultAzureCredential` de `azure-identity` intenta múltiples métodos de autenticación en cascada (Managed Identity, Azure CLI, variables de entorno) sin requerir hardcodear secretos, siendo el estándar recomendado para producción.

---

### Q156
**Para un agente que corre en un flujo `async/await`, ¿desde dónde se importa el credential correcto?**

A) `from azure.identity import DefaultAzureCredential`
B) `from azure.identity.aio import DefaultAzureCredential` ✅
C) `from azure.core.aio import DefaultAzureCredential`
D) `from azure.async_identity import DefaultAzureCredential`

**Explicación:** El submódulo `.aio` contiene las versiones async-compatible de las clases de autenticación. Usar la versión síncrona en un contexto async puede bloquear el event loop.

---

### Q157
**¿Cuál es el scope correcto al generar un bearer token para Azure OpenAI?**

A) `"https://management.azure.com/.default"`
B) `"https://cognitiveservices.azure.com/.default"` ✅
C) `"https://openai.azure.com/.default"`
D) `"https://graph.microsoft.com/.default"`

**Explicación:** Azure OpenAI es parte de Azure Cognitive Services, por lo que el scope correcto para autenticación AAD es el de cognitiveservices, no un scope específico de OpenAI (que no existe) ni el de Azure Resource Manager (management).

---

### Q158
**¿Qué método del SDK genera el token provider para pasarlo a `AzureOpenAI(azure_ad_token_provider=...)`?**

A) `get_token()`
B) `create_bearer_token()`
C) `get_bearer_token_provider()` ✅
D) `azure_ad_token()`

**Explicación:** `get_bearer_token_provider(credential, scope)` de `azure.identity` devuelve una función callable que el SDK de OpenAI invoca automáticamente para refrescar el token cuando expira, evitando gestión manual.

---

### Q159
**¿Qué paquete de pip se necesita para trabajar con Azure AI Foundry Projects mediante SDK?**

A) `azure-ai-foundry`
B) `azure-ai-projects` ✅
C) `azure-foundry-sdk`
D) `azure-openai-projects`

**Explicación:** `azure-ai-projects` es el paquete oficial que expone `AIProjectClient`, el punto de entrada unificado para interactuar con recursos de un proyecto Foundry (modelos, conexiones, agentes).

---

### Q160
**¿Cómo se instancia un `AIProjectClient` a partir de un proyecto existente?**

A) `AIProjectClient(project_id=...)`
B) `AIProjectClient.from_connection_string(conn_str=..., credential=...)` ✅
C) `AIProjectClient.connect(url=...)`
D) `AIProjectClient.load(path=...)`

**Explicación:** El método de clase `from_connection_string` recibe la cadena de conexión del proyecto (obtenida en el portal de Foundry) y las credenciales, devolviendo un cliente listo para usar sub-clientes como OpenAI o Search.

---

### Q161
**Dentro de un `AIProjectClient`, ¿qué método obtiene un cliente compatible con el SDK de OpenAI?**

A) `project.openai()`
B) `project.get_openai_client()` ✅
C) `project.client("openai")`
D) `project.connect_openai()`

**Explicación:** `get_openai_client()` es el método documentado que devuelve una instancia lista de `AzureOpenAI` ya configurada con las credenciales y endpoint del proyecto, evitando configuración manual duplicada.

---

### Q162
**¿Qué versión de API se usa comúnmente en ejemplos oficiales de Responses API en 2026?**

A) `"2023-05-15"`
B) `"2024-02-01"`
C) `"2024-05-01-preview"` ✅
D) `"v1"`

**Explicación:** Las versiones "preview" con formato de fecha son estándar en Azure OpenAI para acceder a features nuevas como Responses API antes de su disponibilidad general (GA).

---

### Q163
**¿Cuál es la diferencia clave entre `AzureOpenAI` y `AsyncAzureOpenAI`?**

A) Ninguna, son alias
B) `AsyncAzureOpenAI` requiere una API key diferente
C) `AsyncAzureOpenAI` permite llamadas no bloqueantes con `await` ✅
D) `AsyncAzureOpenAI` solo funciona con Chat Completions

**Explicación:** `AsyncAzureOpenAI` implementa los mismos métodos pero como coroutines, permitiendo procesar múltiples requests concurrentemente sin bloquear el hilo principal — clave para agentes que hacen varias llamadas a herramientas en paralelo.

---

### Q164
**¿Qué evento de streaming contiene el fragmento de texto en Responses API?**

A) `response.delta`
B) `response.output_text.delta` ✅
C) `response.text.chunk`
D) `response.stream.data`

**Explicación:** El nombre completo y jerárquico del evento sigue la convención `response.<campo>.<acción>`, siendo `output_text.delta` el específico para fragmentos de texto incrementales.

---

### Q165
**En streaming, ¿cómo se accede al contenido de un evento delta?**

A) `event.content`
B) `event.text`
C) `event.delta` ✅
D) `event.chunk`

**Explicación:** El objeto evento expone `.delta` como el string con el fragmento nuevo de texto generado desde el último evento, permitiendo impresión progresiva tipo "streaming" en la UI.

---

### Q166
**¿Cuál es la forma correcta de abrir un stream con Responses API?**

A) `client.responses.create(stream=True)`
B) `with client.responses.stream(...) as stream:` ✅
C) `client.stream.responses(...)`
D) `async for chunk in client.responses(...)`

**Explicación:** Responses API usa un context manager dedicado `client.responses.stream()` que gestiona la conexión y el cierre correcto del stream, distinto del parámetro booleano `stream=True` de Chat Completions.

---

### Q167
**¿Qué variable de entorno es más común para el endpoint de Azure OpenAI?**

A) `OPENAI_URL`
B) `AZURE_OPENAI_ENDPOINT` ✅
C) `AOAI_HOST`
D) `AZURE_API_URL`

**Explicación:** `AZURE_OPENAI_ENDPOINT` es la convención estándar documentada por Microsoft, usada consistentemente en samples oficiales y SDKs.

---

### Q168
**¿Es seguro incluir `AZURE_OPENAI_API_KEY` directamente en el código fuente en producción?**

A) Sí, siempre que el repositorio sea privado
B) Sí, si se ofusca con base64
C) No, se recomienda `DefaultAzureCredential` o variables de entorno gestionadas ✅
D) Sí, es la práctica estándar de Microsoft

**Explicación:** Hardcodear secretos, incluso en repos privados, es una mala práctica de seguridad. Microsoft recomienda Managed Identity vía `DefaultAzureCredential`, o al menos gestión de secretos mediante Key Vault o variables de entorno de la plataforma de despliegue.

---

### Q169
**¿Qué campo del objeto `response` se usa como `previous_response_id` en la siguiente llamada?**

A) `response.conversation_id`
B) `response.id` ✅
C) `response.uuid`
D) `response.session`

**Explicación:** Cada respuesta generada tiene un `id` único que Azure usa internamente para reconstruir el contexto de la conversación cuando se referencia en `previous_response_id`.

---

### Q170
**¿Qué sucede si NO se pasa `previous_response_id` en una nueva llamada dentro de una conversación multiturno?**

A) La API lanza un error
B) El modelo trata la llamada como una conversación completamente nueva, sin contexto previo ✅
C) Se usa automáticamente el último response_id de la sesión
D) Se reenvía el historial completo automáticamente

**Explicación:** Sin `previous_response_id`, el modelo no tiene forma de saber que hay contexto anterior — cada llamada es independiente salvo que el desarrollador gestione el historial manualmente vía `input` con mensajes completos.

---

### Q171
**¿Cuál es el propósito de `azure_ad_token_provider` en el constructor de `AzureOpenAI`?**

A) Almacenar la API key
B) Proveer una función que genera/refresca el token AAD automáticamente ✅
C) Configurar el proxy de red
D) Definir el timeout de la conexión

**Explicación:** En lugar de pasar un token estático (que expira), `azure_ad_token_provider` recibe una función callable (típicamente de `get_bearer_token_provider`) que el SDK invoca en cada request, garantizando un token siempre válido.

---

### Q172
**¿Qué tipo de excepción es más probable si el `api_version` especificado no soporta una feature usada (como `tools`)?**

A) `AuthenticationError`
B) `BadRequestError` o similar error de versión no soportada ✅
C) `TimeoutError`
D) `ConnectionError`

**Explicación:** Usar parámetros o endpoints de una feature que no existe en la versión de API especificada típicamente resulta en un error 400 (Bad Request) indicando parámetro desconocido o feature no disponible en esa versión.

---

### Q173
**¿Cuál es la ventaja principal de usar Managed Identity en un recurso de Azure (como App Service) en vez de Service Principal con secreto?**

A) Es más rápido
B) No requiere gestionar ni rotar credenciales manualmente ✅
C) Permite mayor rate limit
D) Es obligatorio por Microsoft

**Explicación:** Managed Identity es una identidad gestionada automáticamente por Azure AD, vinculada al recurso mismo, eliminando la necesidad de almacenar y rotar secretos — reduciendo superficie de ataque significativamente.

---

### Q174
**¿Qué patrón de código es correcto para múltiples turnos usando SOLO `input` (sin `previous_response_id`)?**

A) Enviar solo el último mensaje del usuario
B) Enviar un array completo con todo el historial de mensajes anteriores como `input` ✅
C) No es posible sin `previous_response_id`
D) Usar `context_history` como parámetro

**Explicación:** Es válido gestionar el historial manualmente reconstruyendo el array de mensajes completo en cada llamada — es más verboso y consume más tokens que `previous_response_id`, pero es una alternativa funcional cuando se necesita control total del contexto.

---

### Q175
**¿Qué objeto se puede inspeccionar para saber si el modelo generó una llamada a función versus texto normal?**

A) `response.type`
B) Iterar sobre `response.output` y verificar `item.type` ✅
C) `response.is_function_call`
D) `response.mode`

**Explicación:** `response.output` es una lista de items; cada uno tiene un campo `type` que puede ser `"message"` (texto normal) o `"function_call"` (solicitud de herramienta), permitiendo al desarrollador ramificar la lógica según corresponda.

---

*(Continúa Q176-Q250 con el mismo formato, cubriendo: deployment types, model versions, rate limiting, error handling patterns, connection strings, endpoint configuration regional, content filtering en requests, logging/observability SDK, retry policies, y edge cases de autenticación — ver Parte 5 para Domain 2 Tools extendido)*

---

## 📊 PROGRESO BANCO TOTAL

```
✅ Q1-Q150   → Bancos originales (BANCO_PREGUNTAS_AI103_RESUELTO + PARTE3)
✅ Q151-Q175 → Este documento (Domain 1 profundo)
⏳ Q176-Q250 → Pendiente (Domain 1 cont. + inicio Domain 2)
⏳ Q251-Q400 → Pendiente (Domain 2 Tools completo)
⏳ Q401-Q550 → Pendiente (Domain 3 Optimización completo)
⏳ Q551-Q700 → Pendiente (Domain 4 Responsible AI completo)
⏳ Q701-Q800 → Pendiente (Escenarios mixtos + trampas finales)
```

**Nota:** Este es el Parte 4 de una serie. Continuar con "siguiente parte" para avanzar hacia las 700-800 preguntas totales.
