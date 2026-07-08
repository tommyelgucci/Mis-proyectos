# BANCO DE PREGUNTAS AI-103 — PARTE 5 (Q176-Q350)
## Domain 2: Tools / Agentes (code_interpreter, web_search, file_search, function_calling)
### Generado: 2026-07-08

---

### Q176
**¿Cuál es la estructura JSON correcta para habilitar code_interpreter?**

A) `{"type": "python_sandbox"}`
B) `{"type": "code_interpreter", "container": {"type": "auto"}}` ✅
C) `{"type": "code_execution", "runtime": "python"}`
D) `{"tool": "code_interpreter"}`

**Explicación:** El campo `container` con `type: "auto"` es obligatorio; le indica a Azure que aprovisione automáticamente un contenedor de ejecución. Omitirlo causa error de configuración.

---

### Q177
**Un agente con code_interpreter intenta hacer un `requests.get()` a una API externa. ¿Qué ocurre?**

A) Funciona normalmente
B) Falla porque el sandbox no tiene acceso a red externa ✅
C) Funciona solo si la URL es HTTPS
D) Requiere configurar `network: true` en el tool

**Explicación:** code_interpreter es un sandbox aislado sin conectividad de red saliente, por diseño de seguridad. Cualquier necesidad de datos externos debe resolverse con `web_search` o `function_calling`.

---

### Q178
**¿Qué librerías Python están disponibles por defecto en code_interpreter?**

A) Solo la librería estándar
B) pandas, numpy, matplotlib entre otras científicas comunes ✅
C) Cualquier librería vía pip install en tiempo de ejecución
D) Solo librerías de Microsoft

**Explicación:** El entorno viene preconfigurado con librerías de ciencia de datos comunes (pandas, numpy, matplotlib, etc.) para análisis y visualización, sin necesidad ni posibilidad de instalar paquetes adicionales dinámicamente.

---

### Q179
**Si el código generado por el modelo en code_interpreter falla con un error de sintaxis, ¿qué comportamiento es típico?**

A) La sesión termina inmediatamente con error
B) El modelo detecta el error y reintenta con código corregido automáticamente ✅
C) Se requiere intervención manual del desarrollador
D) Se regresa un mensaje genérico sin reintento

**Explicación:** Una de las ventajas clave de code_interpreter es la autocorrección: el modelo observa el traceback del error y genera una versión corregida del código, iterando hasta lograr ejecución exitosa o alcanzar un límite de intentos.

---

### Q180
**¿Cuál es la estructura mínima para habilitar web_search?**

A) `{"type": "web_search", "region": "us"}`
B) `{"type": "web_search"}` ✅
C) `{"type": "internet_search", "enabled": true}`
D) `{"search": "web"}`

**Explicación:** A diferencia de otras tools, `web_search` no requiere parámetros adicionales en su forma básica — simplemente declarar el tipo es suficiente para que el modelo pueda invocarla cuando lo considere necesario.

---

### Q181
**¿web_search puede acceder a contenido detrás de un login o paywall?**

A) Sí, siempre
B) No, solo accede a contenido público indexado ✅
C) Sí, si se proveen credenciales en el tool config
D) Depende del dominio

**Explicación:** web_search opera sobre índices de búsqueda públicos; no tiene capacidad de autenticarse en sitios con contenido restringido, sin importar el dominio.

---

### Q182
**Una empresa necesita que su agente consulte noticias del día. ¿Qué tool es apropiada?**

A) `file_search`
B) `code_interpreter`
C) `web_search` ✅
D) `function_calling`

**Explicación:** Noticias del día son información pública y en constante cambio — el caso de uso textbook para `web_search`, que resuelve la limitación del cutoff de entrenamiento del modelo.

---

### Q183
**¿Qué parámetro es obligatorio al configurar file_search?**

A) `index_name`
B) `vector_store_ids` ✅
C) `document_path`
D) `search_type`

**Explicación:** file_search necesita saber en qué vector store(s) buscar; `vector_store_ids` es una lista (puede tener más de uno) de IDs previamente creados y poblados con documentos.

---

### Q184
**¿Cuál es la diferencia entre `vector_stores.file_batches.upload()` y `upload_and_poll()`?**

A) No hay diferencia funcional
B) `upload_and_poll()` sube Y espera a que termine la indexación antes de continuar ✅
C) `upload()` es más rápido pero menos confiable
D) `upload_and_poll()` solo funciona con archivos PDF

**Explicación:** `upload()` retorna inmediatamente tras iniciar la subida sin garantizar que los archivos ya estén indexados y disponibles para búsqueda; `upload_and_poll()` bloquea hasta confirmar que el batch está en estado `completed`, evitando race conditions al hacer queries inmediatamente después.

---

### Q185
**¿Para qué sirve pasar `include=["file_search_call.results"]` en la llamada?**

A) Para forzar el uso de file_search
B) Para recuperar en la respuesta los chunks/documentos específicos que el modelo usó ✅
C) Para incluir archivos adicionales en la búsqueda
D) Para habilitar logging de la búsqueda

**Explicación:** Por defecto, la respuesta no expone qué fragmentos de documentos fueron recuperados internamente. El parámetro `include` permite inspeccionar esa información, útil para debugging, citación de fuentes o auditoría de precisión.

---

### Q186
**¿Qué formatos de archivo soporta típicamente file_search para indexación?**

A) Solo TXT
B) PDF, TXT, DOCX y formatos de texto similares ✅
C) Solo PDF
D) Cualquier formato binario incluyendo imágenes y video

**Explicación:** file_search está diseñado para contenido textual extraíble; soporta los formatos documentales comunes (PDF, TXT, DOCX, MD) pero no procesa contenido multimedia como imágenes o video directamente.

---

### Q187
**En function_calling, cuando el modelo decide usar una función, ¿qué tipo tiene el item en `response.output`?**

A) `"tool_use"`
B) `"function_call"` ✅
C) `"action_request"`
D) `"invoke"`

**Explicación:** El SDK marca estos items específicamente como `function_call`, permitiendo al desarrollador filtrar e identificar cuándo el modelo requiere ejecución externa versus cuándo generó una respuesta de texto normal.

---

### Q188
**¿Quién es responsable de ejecutar la lógica real de la función solicitada por el modelo?**

A) Azure OpenAI Service internamente
B) El modelo mismo, en un sandbox seguro
C) El código del cliente/desarrollador ✅
D) Un servicio intermediario de Microsoft

**Explicación:** Este es el concepto fundamental de function_calling: el modelo NUNCA ejecuta código arbitrario por razones de seguridad. Solo devuelve una intención estructurada (nombre + argumentos); el desarrollador implementa y ejecuta la función real en su propio entorno.

---

### Q189
**¿Qué campo es obligatorio para correlacionar el resultado de una función con su solicitud original?**

A) `function_name`
B) `call_id` ✅
C) `request_id`
D) `session_id`

**Explicación:** `call_id` es generado por el modelo en la solicitud (`function_call`) y debe repetirse exactamente en el mensaje de respuesta (`function_call_output`) para que el modelo pueda emparejar qué resultado corresponde a qué solicitud, especialmente relevante si hay múltiples llamadas simultáneas.

---

### Q190
**¿Cuál es el `type` correcto del mensaje que contiene el resultado de una función ejecutada?**

A) `"function_result"`
B) `"tool_response"`
C) `"function_call_output"` ✅
D) `"execution_result"`

**Explicación:** Es el tipo específico esperado por la API para que el modelo interprete correctamente el contenido como el resultado de una ejecución previamente solicitada, y no como un nuevo mensaje de usuario.

---

### Q191
**¿Cuántas llamadas a la API son necesarias como mínimo para completar un ciclo de function_calling?**

A) 1
B) 2 ✅
C) 3
D) Depende del número de funciones definidas

**Explicación:** Llamada 1: el modelo evalúa el input y devuelve una `function_call`. El cliente ejecuta la función localmente. Llamada 2: el cliente reenvía el resultado como `function_call_output`, y el modelo genera la respuesta final en lenguaje natural.

---

### Q192
**¿Qué pasa si el desarrollador olvida incluir `item` (el `function_call` original) en el array de mensajes antes del `function_call_output`?**

A) No importa, la API lo ignora
B) La API puede rechazar la solicitud o el modelo perder contexto de qué se solicitó ✅
C) Se ejecuta automáticamente sin problema
D) Solo afecta al logging

**Explicación:** El array de mensajes debe mantener la secuencia completa: input original → function_call del modelo → function_call_output del cliente, para que el modelo tenga el contexto completo al generar la respuesta final.

---

### Q193
**¿Cómo describe el desarrollador los parámetros esperados de una función personalizada al modelo?**

A) En un docstring de Python
B) Mediante un JSON Schema en el campo `parameters` de la definición del tool ✅
C) En un archivo de configuración separado
D) No es necesario, el modelo infiere los parámetros

**Explicación:** Siguiendo el estándar de function calling de OpenAI, cada función se describe con `name`, `description`, y `parameters` (JSON Schema con `type`, `properties`, `required`), permitiendo al modelo generar argumentos válidos y bien tipados.

---

### Q194
**Un agente tiene definidas `file_search` y `web_search` simultáneamente. ¿Quién decide cuál usar para cada query del usuario?**

A) El desarrollador debe especificarlo en cada llamada
B) El modelo decide automáticamente según el contexto de la pregunta ✅
C) Se usan ambas siempre en paralelo
D) Se usa la que fue declarada primero en el array

**Explicación:** Esta es la esencia del enfoque "agentic" de las Responses API: el modelo analiza la intención del usuario y elige la(s) herramienta(s) más apropiada(s) sin intervención explícita por query.

---

### Q195
**¿Qué servicio de Microsoft se recomienda para RAG a escala empresarial en vez de gestionar vector stores manualmente?**

A) Azure Cognitive Search Basic
B) Foundry IQ ✅
C) Azure Blob Storage indexado
D) Cosmos DB Vector Search

**Explicación:** Foundry IQ es la solución gestionada de Microsoft para conocimiento empresarial a gran escala, abstrayendo la complejidad de crear, mantener y escalar vector stores manualmente vía file_search básico.

---

### Q196
**¿Puede un mismo agente combinar `code_interpreter` y `function_calling` en la misma sesión?**

A) No, son mutuamente excluyentes
B) Sí, se pueden declarar múltiples tools y el modelo elige según necesidad ✅
C) Solo si están en llamadas separadas
D) Solo con aprobación explícita de Microsoft

**Explicación:** No existe restricción de exclusión mutua entre tools nativas (code_interpreter, web_search, file_search) y function_calling personalizado; todas pueden coexistir en el array `tools` de una misma llamada.

---

### Q197
**¿Qué patrón de código en Python se usa comúnmente para obtener la lista de archivos PDF de una carpeta antes de subirlos a file_search?**

A) `os.listdir()` sin filtro
B) `glob.glob("carpeta/*.pdf")` ✅
C) `open("carpeta")`
D) `pathlib.scan()`

**Explicación:** `glob.glob()` con un patrón wildcard es el método idiomático en Python para obtener listas de archivos que cumplen un patrón específico, usado en los ejercicios oficiales de Microsoft Learn (ej. Margie's Travel).

---

### Q198
**¿Qué sucede si defines una función en `tools` pero el modelo determina que no es necesaria para responder la query del usuario?**

A) Error, siempre debe usarse alguna tool declarada
B) El modelo responde directamente con texto sin invocar ninguna tool ✅
C) Se invoca por defecto la primera tool de la lista
D) La API rechaza la llamada

**Explicación:** Declarar tools las hace *disponibles*, no obligatorias. El modelo tiene autonomía para decidir si la pregunta puede responderse sin herramientas externas basándose en su conocimiento general.

---

### Q199
**Un desarrollador ve en `response.output` un item con `type: "message"`. ¿Qué representa?**

A) Un error del sistema
B) Contenido de texto generado directamente por el modelo (no una tool call) ✅
C) Un mensaje del usuario
D) Metadata de la sesión

**Explicación:** Los items de tipo `message` contienen el contenido conversacional normal del asistente, en contraste con `function_call` que representa una solicitud de ejecución de herramienta.

---

### Q200
**¿Cuál es un caso de uso apropiado para combinar `code_interpreter` + `file_search` en un mismo agente?**

A) Buscar noticias y generar un resumen
B) Analizar estadísticamente un dataset que está documentado en manuales internos de la empresa ✅
C) Ejecutar una API de terceros
D) Traducir texto a otro idioma

**Explicación:** file_search recupera contexto/documentación relevante (ej. definiciones de columnas, metodología), mientras code_interpreter ejecuta el análisis estadístico real sobre datos — un flujo natural de combinación complementaria.

---

*(Preguntas Q201-Q350 continúan cubriendo: multi-tool avanzado, Foundry IQ configuración, patrones de error handling en function_calling, streaming con tool calls, casos edge de vector stores, comparativas RAG gestionado vs manual, orquestación de agentes, y escenarios de integración ERP/CRM — consolidados en la Parte 6)*

---

## 📊 PROGRESO ACUMULADO

```
✅ Q1-Q150   → Bancos originales
✅ Q151-Q175 → Parte 4 (Domain 1)
✅ Q176-Q200 → Este documento, sección detallada (Domain 2 core)
⏳ Q201-Q350 → Domain 2 extendido (resumen de temas, pendiente detalle completo)
⏳ Q351-Q800 → Domains 3, 4 y escenarios mixtos
```
