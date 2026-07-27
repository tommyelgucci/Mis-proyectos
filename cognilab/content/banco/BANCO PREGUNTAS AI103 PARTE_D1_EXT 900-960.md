# BANCO DE PREGUNTAS AI-103 — DOMAIN 1 EXTENDIDO (Q900-Q960)
## Domain 1: SDK, Autenticación, Foundry Projects — cobertura adicional
### Generado: 2026-07-27 | Suplemento para compensar bancos originales perdidos (Q1-Q150)

---

**INSTRUCCIONES DE USO:** Mismo formato que el resto del banco: escenario/pregunta + 4 opciones + respuesta correcta marcada con ✅ + explicación de por qué es correcta y por qué las demás son trampa. Cubre temas de Domain 1 no repetidos en PARTE4 (deployment types, manejo de errores, rate limiting, RBAC, Key Vault, observabilidad, credenciales encadenadas, CI/CD).

---

### Q900
**¿Qué credential debe usarse en un pipeline de GitHub Actions que autentica contra Azure sin almacenar secretos de larga duración?**

A) `ClientSecretCredential` con secreto hardcodeado
B) `AzureCliCredential`
C) Federated identity vía OIDC con `DefaultAzureCredential` ✅
D) `InteractiveBrowserCredential`

**Explicación:** La federación de identidad OIDC (workload identity federation) permite que GitHub Actions obtenga tokens de Azure AD sin un secreto almacenado, y `DefaultAzureCredential` la detecta automáticamente en el entorno de CI configurado. `InteractiveBrowserCredential` requiere una sesión interactiva, imposible en un runner.

---

### Q901
**¿En qué orden intenta autenticarse `DefaultAzureCredential` quando corre en un entorno de desarrollo local sin variables de entorno configuradas?**

A) Siempre falla si no hay Managed Identity
B) Intenta Environment, Managed Identity, y finalmente cae en Azure CLI / VS Code credential ✅
C) Solo intenta API Key
D) Pregunta interactivamente la contraseña

**Explicación:** `DefaultAzureCredential` encadena varias estrategias en orden y usa la primera que funcione; en desarrollo local, tras fallar Environment y Managed Identity, recurre a la sesión de `az login` (Azure CLI) o VS Code, sin requerir configuración adicional del desarrollador.

---

### Q902
**Un servicio corre en una VM con una identidad administrada asignada por el usuario (user-assigned managed identity). ¿Qué parámetro adicional necesita `DefaultAzureCredential`?**

A) Ninguno, se detecta automáticamente siempre
B) `managed_identity_client_id=<client_id>` ✅
C) `tenant_id` obligatorio
D) `subscription_id`

**Explicación:** Cuando hay múltiples identidades administradas o se usa una asignada por el usuario, hay que indicar explícitamente su `client_id` para que el SDK sepa cuál usar; sin esto, puede fallar o usar la identidad del sistema por defecto (si existe).

---

### Q903
**¿Qué excepción del SDK de OpenAI se lanza típicamente cuando se excede el rate limit (HTTP 429)?**

A) `AuthenticationError`
B) `RateLimitError` ✅
C) `APITimeoutError`
D) `PermissionDeniedError`

**Explicación:** El SDK mapea el código HTTP 429 a `RateLimitError`, una excepción específica que el código cliente puede capturar para implementar backoff, distinta de errores de autenticación (401) o timeout de red.

---

### Q904
**¿Qué encabezado de respuesta HTTP indica cuánto esperar antes de reintentar tras un `RateLimitError`?**

A) `X-Wait-Time`
B) `Retry-After` ✅
C) `X-RateLimit-Reset`
D) `Rate-Limit-Delay`

**Explicación:** `Retry-After` es el encabezado estándar HTTP que indica en segundos cuánto debe esperar el cliente antes de reintentar; el SDK de OpenAI lo respeta automáticamente si `max_retries` está configurado.

---

### Q905
**¿Qué parámetro del constructor de `AzureOpenAI` controla cuántas veces reintenta automáticamente una request fallida?**

A) `retry_count`
B) `max_retries` ✅
C) `attempts`
D) `backoff_limit`

**Explicación:** `max_retries` (por defecto 2) configura reintentos automáticos con backoff exponencial para errores transitorios (429, 500, timeouts de red), sin que el desarrollador tenga que implementar su propio loop de reintentos para casos simples.

---

### Q906
**¿Qué diferencia hay entre el "nombre del modelo" y el "deployment name" en Azure OpenAI?**

A) Son siempre idénticos
B) El deployment name es un alias que el desarrollador elige al desplegar el modelo en el recurso, y es lo que se pasa como `model=` en el SDK ✅
C) El nombre del modelo se usa en el SDK, el deployment name solo en el portal
D) El deployment name identifica la suscripción de Azure

**Explicación:** En Azure OpenAI, el parámetro `model` de las llamadas SDK en realidad referencia el **deployment name** configurado por el usuario (ej. `"mi-gpt4o-prod"`), no necesariamente el nombre base del modelo (`gpt-4o`) — un error de examen frecuente es asumir que son lo mismo.

---

### Q907
**Un desarrollador recibe `404 Resource not found` al llamar `responses.create(model="gpt-4o", ...)`. ¿Cuál es la causa más probable?**

A) El modelo gpt-4o fue descontinuado globalmente
B) El deployment name "gpt-4o" no existe en ese recurso de Azure OpenAI ✅
C) La API key expiró
D) El endpoint no soporta HTTPS

**Explicación:** Un 404 en este contexto casi siempre indica que no existe un deployment con ese nombre exacto en el recurso apuntado por `AZURE_OPENAI_ENDPOINT` — hay que verificar el nombre exacto del deployment en el portal, que puede diferir del nombre del modelo base.

---

### Q908
**¿Qué rol RBAC de Azure permite invocar modelos de Azure OpenAI sin permisos de administración del recurso?**

A) `Contributor`
B) `Cognitive Services OpenAI User` ✅
C) `Owner`
D) `Reader`

**Explicación:** `Cognitive Services OpenAI User` es un rol de bajo privilegio pensado específicamente para aplicaciones que solo necesitan invocar el modelo (inferencia), siguiendo el principio de mínimo privilegio — a diferencia de `Contributor`, que permite modificar el recurso.

---

### Q909
**¿Qué rol RBAC se necesita para desplegar o eliminar modelos en un recurso de Azure OpenAI?**

A) `Cognitive Services OpenAI User`
B) `Cognitive Services OpenAI Contributor` ✅
C) `Reader`
D) `Monitoring Contributor`

**Explicación:** Las operaciones de gestión (crear/eliminar deployments, cambiar cuotas) requieren el rol `Contributor` específico del servicio, mientras que el rol `User` solo alcanza para hacer inferencia.

---

### Q910
**¿Cuál es la forma recomendada de obtener un secreto (como una API key) almacenado en Azure Key Vault desde una aplicación Python?**

A) Descargarlo manualmente y pegarlo en el código
B) `SecretClient(vault_url=..., credential=DefaultAzureCredential()).get_secret(name)` ✅
C) Usar `requests.get()` directo a la URL del Key Vault
D) Guardarlo en un archivo `.env` versionado en git

**Explicación:** El SDK `azure-keyvault-secrets` con `SecretClient`, autenticado vía `DefaultAzureCredential`, es el patrón recomendado: evita exponer el secreto en texto plano en el código o en control de versiones.

---

### Q911
**¿Qué paquete de pip provee `SecretClient` para Azure Key Vault?**

A) `azure-keyvault`
B) `azure-keyvault-secrets` ✅
C) `azure-secrets-sdk`
D) `azure-vault-client`

**Explicación:** El SDK de Key Vault está dividido por tipo de recurso; `azure-keyvault-secrets` es específico para secretos (a diferencia de `azure-keyvault-keys` o `azure-keyvault-certificates`).

---

### Q912
**Una aplicación necesita registrar trazas (traces) de cada llamada al modelo para observabilidad en Application Insights. ¿Qué paquete facilita esto?**

A) `azure-monitor-opentelemetry` ✅
B) `azure-logging`
C) `azure-ai-telemetry`
D) `opencensus-azure`

**Explicación:** `azure-monitor-opentelemetry` integra instrumentación estándar de OpenTelemetry con Application Insights, permitiendo capturar automáticamente spans de llamadas HTTP del SDK de OpenAI sin instrumentación manual extensa.

---

### Q913
**¿Qué campo del objeto `response` permite conocer cuántos tokens consumió una llamada a la Responses API?**

A) `response.tokens`
B) `response.usage` (con `input_tokens` / `output_tokens`) ✅
C) `response.cost`
D) `response.billing`

**Explicación:** `response.usage` expone el desglose de tokens consumidos (entrada y salida), fundamental para monitorear costos y para lógicas de negocio que necesiten trackear consumo por usuario o sesión.

---

### Q914
**¿Cuál es la variable de entorno estándar para el nombre del deployment cuando el código necesita ser agnóstico del recurso específico?**

A) `AZURE_OPENAI_MODEL`
B) `AZURE_OPENAI_DEPLOYMENT` (o `AZURE_OPENAI_DEPLOYMENT_NAME`) ✅
C) `AOAI_MODEL_NAME`
D) `OPENAI_DEPLOYMENT_ID`

**Explicación:** Aunque no hay un estándar único obligatorio, la convención de samples oficiales de Microsoft usa `AZURE_OPENAI_DEPLOYMENT` (o su variante `_NAME`) para desacoplar el nombre del deployment del código fuente, facilitando portabilidad entre entornos.

---

### Q915
**¿Qué sucede si se instancia `AzureOpenAI` sin especificar `api_version`?**

A) El SDK siempre falla y exige el parámetro
B) El SDK puede usar una versión por defecto desactualizada, lo que puede omitir features nuevas ✅
C) Usa automáticamente la versión más reciente disponible
D) Se conecta al endpoint público de OpenAI en vez de Azure

**Explicación:** `api_version` es obligatorio en la práctica: si se omite o se usa un valor por defecto antiguo, features nuevas (como Responses API o ciertos parámetros de tools) pueden no estar disponibles o generar errores, por lo que se recomienda fijarlo explícitamente.

---

### Q916
**¿Qué patrón es correcto para inicializar el cliente cuando el endpoint, la key y el api_version vienen de variables de entorno?**

A) `AzureOpenAI()` sin argumentos, siempre los detecta solo
B) `AzureOpenAI(azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"], api_key=os.environ["AZURE_OPENAI_API_KEY"], api_version=os.environ["AZURE_OPENAI_API_VERSION"])` ✅
C) `AzureOpenAI(config="env")`
D) `AzureOpenAI.from_env()`

**Explicación:** El SDK no lee automáticamente todas las variables de entorno por convención mágica (salvo algunas como `AZURE_OPENAI_API_KEY` en ciertas versiones); la forma explícita y portable es pasar los tres parámetros leídos manualmente desde `os.environ`.

---

### Q917
**¿Qué método de `AIProjectClient` lista las conexiones (connections) configuradas en el proyecto Foundry, como Bing Search o Azure AI Search?**

A) `project.get_connections()`
B) `project.connections.list()` ✅
C) `project.list_resources()`
D) `project.services()`

**Explicación:** El SDK organiza las operaciones en sub-clientes por tipo de recurso; `connections.list()` es el patrón consistente con el resto del SDK (`project.agents`, `project.inference`, etc.) para enumerar integraciones externas del proyecto.

---

### Q918
**Un agente en Foundry necesita usar Bing Grounding para búsquedas web con atribución de fuentes. ¿Qué se requiere configurar primero?**

A) Nada, está disponible por defecto en todo proyecto
B) Una conexión (connection) al recurso de Grounding with Bing Search en el proyecto Foundry ✅
C) Solo una API key de Bing en el código
D) Habilitar `web_search` sin configuración adicional

**Explicación:** A diferencia del tool genérico `web_search`, "Grounding with Bing Search" es un recurso de Azure separado que debe crearse y conectarse al proyecto Foundry antes de que el agente pueda usarlo, para cumplir con términos de licenciamiento de Bing.

---

### Q919
**¿Qué representa la jerarquía "Foundry Hub → Foundry Project" en Azure AI Foundry?**

A) Son sinónimos intercambiables
B) El Hub es el recurso de infraestructura compartida (redes, seguridad); el Project es el espacio de trabajo aislado para un equipo o solución ✅
C) El Project contiene múltiples Hubs
D) El Hub solo existe en la versión gratuita

**Explicación:** Un Hub centraliza configuración compartida (VNet, Key Vault, Storage) para gobernanza, mientras que dentro de él se crean uno o más Projects como espacios aislados de trabajo — entender esta jerarquía es clave para preguntas de arquitectura multi-equipo.

---

### Q920
**¿Qué ocurre con el token AAD obtenido vía `get_bearer_token_provider` cuando expira durante una sesión larga?**

A) La aplicación debe reiniciarse manualmente
B) El provider lo refresca automáticamente en la siguiente llamada, de forma transparente ✅
C) Lanza `TokenExpiredError` que hay que capturar manualmente
D) El SDK usa el token expirado igual y falla silenciosamente

**Explicación:** La función callable devuelta por `get_bearer_token_provider` gestiona el ciclo de vida del token internamente (incluyendo caché y refresco antes de expirar), por lo que el desarrollador no necesita lógica adicional de renovación.

---

### Q921
**¿Cuál es la principal razón para usar `ChainedTokenCredential` en vez de `DefaultAzureCredential` en un escenario avanzado?**

A) `ChainedTokenCredential` es más rápido siempre
B) Permite definir explícitamente y en orden personalizado solo las credenciales relevantes al escenario, evitando intentos innecesarios ✅
C) Es la única forma de usar Managed Identity
D) `DefaultAzureCredential` no funciona en producción

**Explicación:** `DefaultAzureCredential` prueba una cadena larga y genérica de credenciales (útil para desarrollo multi-entorno), lo que puede añadir latencia por intentos fallidos; `ChainedTokenCredential` permite optimizar especificando solo 1-2 credenciales relevantes para un despliegue específico y conocido.

---

### Q922
**Al ejecutar la app en un contenedor Docker sin Managed Identity ni sesión de `az login`, ¿qué credential de la cadena de `DefaultAzureCredential` es la más viable?**

A) `AzureCliCredential`
B) `EnvironmentCredential` (usando `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`) ✅
C) `VisualStudioCodeCredential`
D) `InteractiveBrowserCredential`

**Explicación:** Dentro de un contenedor no hay sesión interactiva de navegador, CLI ni identidad administrada (salvo que el orquestador la inyecte); la opción viable es un service principal vía variables de entorno, que `EnvironmentCredential` detecta automáticamente.

---

### Q923
**¿Qué método del SDK de Python permite listar los deployments disponibles en un recurso de Azure OpenAI mediante código (no portal)?**

A) `client.responses.list_deployments()`
B) No existe en el SDK de inferencia; se consulta vía el SDK de gestión (`azure-mgmt-cognitiveservices`) o el portal/CLI ✅
C) `client.deployments.get_all()`
D) `client.models.list()` siempre devuelve deployments

**Explicación:** El SDK de OpenAI/inferencia está diseñado para consumir modelos, no para gestionarlos; listar o crear deployments es una operación de plano de control que requiere el SDK de gestión de Azure (`azure-mgmt-cognitiveservices`) o herramientas como Azure CLI/Portal.

---

### Q924
**¿Cuál es el propósito de `azure-ai-inference` como paquete separado de `openai`?**

A) Es un duplicado sin propósito
B) Provee un cliente unificado (`ChatCompletionsClient`, `EmbeddingsClient`) para modelos del catálogo de Foundry que no son de OpenAI (Llama, Mistral, etc.) ✅
C) Solo sirve para fine-tuning
D) Reemplaza completamente al SDK de OpenAI para todos los casos

**Explicación:** El catálogo de modelos de Azure AI Foundry incluye modelos de terceros con endpoints serverless; `azure-ai-inference` ofrece una interfaz consistente para esos modelos, mientras que los modelos de OpenAI siguen usándose vía el SDK `openai`/`AzureOpenAI`.

---

### Q925
**¿Qué parámetro del constructor de `AzureOpenAI` permite apuntar a un endpoint distinto al de Azure (por ejemplo, para pruebas locales con un proxy)?**

A) `proxy_url`
B) `base_url` ✅
C) `override_host`
D) `custom_endpoint`

**Explicación:** `base_url` sobrescribe el endpoint calculado a partir de `azure_endpoint`, útil en pruebas con mocks, proxies de red corporativa, o gateways como Azure API Management delante del recurso real.

---

### Q926
**Una organización usa Azure API Management (APIM) como gateway delante de Azure OpenAI para centralizar rate limiting entre equipos. ¿Qué cambia para el cliente SDK?**

A) El SDK de OpenAI no puede usarse con APIM
B) Solo cambia el `azure_endpoint` (o `base_url`) apuntando a la URL de APIM en vez del recurso directo ✅
C) Hay que reescribir el cliente desde cero con `requests`
D) Se pierde la capacidad de usar `previous_response_id`

**Explicación:** APIM actúa como proxy transparente que reenvía las requests al backend real; desde la perspectiva del SDK solo cambia la URL base a la que apunta, manteniendo el mismo contrato de API y por tanto toda la funcionalidad del SDK.

---

### Q927
**¿Qué excepción indica típicamente que la API key o el token AAD son inválidos o no tienen permiso sobre el recurso?**

A) `RateLimitError`
B) `AuthenticationError` (401) ✅
C) `NotFoundError`
D) `APIConnectionError`

**Explicación:** `AuthenticationError` mapea directamente al código HTTP 401, distinto de un 403 (permisos insuficientes con credencial válida) o un 429 (rate limit) — diferenciar estos códigos es clave para diagnosticar problemas de auth vs. de cuota.

---

### Q928
**¿Qué código HTTP y excepción son esperables si la identidad autenticada es válida pero carece del rol RBAC necesario sobre el recurso?**

A) 401 `AuthenticationError`
B) 403 `PermissionDeniedError` ✅
C) 429 `RateLimitError`
D) 500 `InternalServerError`

**Explicación:** Un 403 (Forbidden) indica que la identidad SÍ fue autenticada correctamente (a diferencia del 401) pero no tiene los permisos RBAC asignados sobre ese recurso específico — el fix típico es asignar el rol `Cognitive Services OpenAI User` a esa identidad.

---

### Q929
**¿Qué representa `APIConnectionError` en el SDK de OpenAI?**

A) Un error de autenticación
B) Un problema de red al intentar establecer la conexión (DNS, firewall, timeout de conexión) ✅
C) Un error de cuota excedida
D) Un error de parsing de la respuesta JSON

**Explicación:** `APIConnectionError` ocurre en la capa de transporte antes de recibir una respuesta HTTP válida — típico de problemas de red, VNet mal configurada, o el endpoint incorrecto, no de la lógica de negocio del modelo.

---

### Q930
**¿Qué patrón de manejo de errores es más robusto para una llamada a `responses.create()` en producción?**

A) No capturar excepciones, dejar que la app falle
B) Capturar excepciones específicas del SDK (`RateLimitError`, `APIConnectionError`, etc.) por separado con lógica de reintento/fallback apropiada para cada una ✅
C) Un único `except Exception` genérico que reintenta siempre
D) Ignorar errores y devolver un string vacío

**Explicación:** Cada tipo de error requiere una respuesta distinta: `RateLimitError` amerita backoff, `AuthenticationError` no debe reintentarse (fallará igual) sino alertar, y `APIConnectionError` puede reintentarse con timeout mayor. Un manejo diferenciado es la práctica recomendada.

---

### Q931
**¿Qué endpoint de red se debe permitir en un firewall corporativo restrictivo para que el SDK pueda alcanzar Azure OpenAI?**

A) `*.openai.com` únicamente
B) El endpoint específico del recurso, tipo `*.openai.azure.com` (o el dominio del private endpoint) ✅
C) No requiere ninguna regla de firewall
D) `*.microsoft.com` genérico

**Explicación:** Azure OpenAI usa el dominio `<recurso>.openai.azure.com`, distinto del OpenAI público (`api.openai.com`); en entornos con Private Endpoint, el dominio resuelve a una IP privada dentro de la VNet en vez de una IP pública.

---

### Q932
**¿Qué es un Private Endpoint en el contexto de un recurso de Azure OpenAI?**

A) Un endpoint solo accesible con API key, sin AAD
B) Una interfaz de red privada dentro de una VNet que evita exponer el recurso a internet público ✅
C) Un endpoint de solo lectura
D) Un endpoint exclusivo para modelos fine-tuned

**Explicación:** Private Endpoint asigna una IP privada dentro de la VNet del cliente al recurso de Azure OpenAI, permitiendo tráfico que nunca sale a la red pública de internet — un requisito común en escenarios de alta seguridad o cumplimiento normativo.

---

### Q933
**¿Qué implica la "data residency" al elegir la región de un recurso de Azure OpenAI?**

A) No tiene relevancia, todos los datos se procesan globalmente
B) Los datos de entrada/salida se procesan dentro de la región geográfica del recurso, relevante para cumplimiento regulatorio ✅
C) Solo afecta la latencia, nunca el cumplimiento normativo
D) Obliga a usar el mismo modelo en todas las regiones

**Explicación:** Elegir la región del recurso determina dónde se procesan los datos, un factor crítico para cumplir regulaciones como GDPR quando el negocio requiere que los datos no salgan de una jurisdicción específica.

---

### Q934
**¿Qué sucede si se solicita un modelo o feature no disponible en la región del recurso desplegado?**

A) Azure lo redirige automáticamente a otra región
B) La creación del deployment falla o el modelo no aparece como opción disponible en esa región ✅
C) Se factura el doble
D) Siempre funciona igual sin importar la región

**Explicación:** La disponibilidad de modelos y features varía por región; parte del trabajo de diseño de solución en AI-103 es verificar la disponibilidad regional antes de comprometerse con una arquitectura, ya que no hay redirección automática.

---

### Q935
**¿Qué comando de Azure CLI se usa típicamente para asignar el rol `Cognitive Services OpenAI User` a una identidad sobre un recurso?**

A) `az cognitiveservices assign-role`
B) `az role assignment create --role "Cognitive Services OpenAI User" --assignee <id> --scope <resource-id>` ✅
C) `az ad user add-role`
D) `az openai grant-access`

**Explicación:** La asignación de roles RBAC en Azure sigue el patrón genérico `az role assignment create`, aplicable a cualquier recurso incluyendo Cognitive Services/OpenAI, especificando el rol, la identidad (`--assignee`) y el alcance (`--scope`).

---

### Q936
**¿Por qué es recomendable asignar el rol RBAC a nivel del recurso específico de Azure OpenAI en vez de a nivel de toda la suscripción?**

A) A nivel de recurso es más lento
B) Sigue el principio de mínimo privilegio, limitando el acceso solo al recurso necesario ✅
C) A nivel de suscripción no es técnicamente posible
D) No hay diferencia práctica

**Explicación:** Asignar roles al `scope` más granular posible (el recurso, no el resource group ni la suscripción) reduce el "blast radius" si esa identidad se ve comprometida — un principio de seguridad recurrente en el dominio de Responsible AI y arquitectura segura.

---

### Q937
**¿Qué representa el campo `organization` en la configuración del SDK de OpenAI estándar (no Azure)?**

A) Es obligatorio también en `AzureOpenAI`
B) Identifica la organización en OpenAI público; no aplica ni se usa en `AzureOpenAI` ✅
C) Es el nombre del tenant de Azure AD
D) Reemplaza a `azure_endpoint`

**Explicación:** El parámetro `organization` pertenece al cliente `OpenAI` estándar (api.openai.com) para cuentas con múltiples organizaciones; en `AzureOpenAI`, la identidad del recurso se determina por `azure_endpoint` y las credenciales, no por este campo.

---

### Q938
**¿Qué ventaja ofrece usar un entorno virtual (`venv`) al desarrollar con el SDK de Azure AI?**

A) Ninguna, es opcional sin impacto
B) Aísla las dependencias del proyecto (versión del SDK, `azure-identity`, etc.) evitando conflictos con otros proyectos Python ✅
C) Es requerido por el SDK para autenticarse
D) Mejora la velocidad de las llamadas a la API

**Explicación:** Buenas prácticas generales de Python aplican también aquí: un `venv` (o equivalente) asegura reproducibilidad y evita que actualizaciones de una librería en un proyecto rompan otro que depende de una versión distinta del SDK.

---

### Q939
**¿Qué estrategia de testing es apropiada para probar la lógica de un agente sin consumir cuota real del modelo?**

A) Ejecutar siempre contra el endpoint real en cada test
B) Mockear el cliente (`AzureOpenAI` o sus métodos) para simular respuestas controladas en tests unitarios ✅
C) No es posible testear código que usa el SDK
D) Usar una API key de otro cliente

**Explicación:** Mockear el cliente (con `unittest.mock` o librerías similares) permite testear la lógica de la aplicación (parsing de `output_text`, manejo de `function_call`, etc.) de forma determinística, rápida y sin costo, reservando las llamadas reales para tests de integración específicos.

---

### Q940
**¿Qué es una "system message" equivalente en la Responses API y por qué `instructions` la reemplaza favorablemente en muchos casos?**

A) No hay equivalente, hay que usar `input` con role system siempre
B) `instructions` cumple el mismo rol pero como parámetro de texto plano, simplificando el código sin construir arrays de mensajes ✅
C) `instructions` solo afecta el formato de salida, no el comportamiento del modelo
D) `instructions` es obsoleto y no se recomienda su uso

**Explicación:** Aunque sigue siendo posible incluir un mensaje con `role: "system"` dentro de `input`, `instructions` es la forma idiomática y recomendada en Responses API para definir el comportamiento base del agente de forma más simple y legible.

---

### Q941
**¿Qué sucede si se combinan `instructions` y un mensaje con `role: "system"` dentro de `input` en la misma llamada?**

A) Es un error de validación siempre
B) Ambos se consideran, pero puede generar comportamiento redundante o conflictivo; se recomienda usar solo uno de los dos mecanismos ✅
C) `instructions` se ignora completamente
D) El mensaje de `input` se ignora completamente

**Explicación:** Técnicamente el SDK no siempre bloquea la combinación, pero mezclar ambos mecanismos para el mismo propósito genera ambigüedad sobre qué instrucción prevalece — la práctica recomendada es elegir un solo mecanismo consistente en toda la aplicación.

---

### Q942
**¿Qué campo de la respuesta permite saber si la generación fue truncada por alcanzar el límite de tokens de salida?**

A) `response.truncated`
B) `response.status` o el `finish_reason`/`stop_reason` del item de salida indicando `"length"` o similar ✅
C) No es posible saberlo
D) `response.error`

**Explicación:** El SDK expone metadata sobre por qué terminó la generación (completada normalmente, truncada por longitud, detenida por filtro de contenido, etc.), fundamental para que la aplicación decida si debe continuar la generación o alertar al usuario.

---

### Q943
**¿Qué parámetro limita la cantidad máxima de tokens que el modelo puede generar en la respuesta?**

A) `max_input_tokens`
B) `max_output_tokens` (o equivalente según versión de API) ✅
C) `token_limit`
D) `response_size`

**Explicación:** Este parámetro acota el costo y la latencia de una respuesta al limitar cuántos tokens puede producir el modelo, independientemente de cuántos tokens tenga el prompt de entrada.

---

### Q944
**Un equipo quiere que dos entornos (staging y producción) usen el mismo código de aplicación pero apunten a recursos de Azure OpenAI distintos. ¿Cuál es la mejor práctica?**

A) Duplicar el código con endpoints hardcodeados por entorno
B) Externalizar `azure_endpoint`, `deployment` y credenciales vía variables de entorno o configuración inyectada por el pipeline de despliegue ✅
C) Usar el mismo recurso de Azure OpenAI para ambos entornos
D) Cambiar el código manualmente antes de cada despliegue

**Explicación:** Externalizar la configuración (12-factor app) permite que el mismo artefacto de código se despliegue sin cambios en distintos entornos, con el pipeline de CI/CD inyectando los valores correctos por entorno — evita hardcodear y reduce riesgo de errores humanos.

---

### Q945
**¿Qué implicancia tiene usar el mismo recurso de Azure OpenAI para staging y producción sin aislamiento?**

A) No hay ninguna implicancia negativa
B) Pruebas en staging pueden consumir la cuota/rate limit compartida con producción, afectando disponibilidad real ✅
C) Es la práctica recomendada por Microsoft
D) Reduce automáticamente los costos

**Explicación:** Compartir cuota (tokens por minuto) entre entornos significa que una carga de pruebas o un bug en staging puede degradar la experiencia de usuarios reales en producción — se recomienda aislar recursos (o al menos deployments) por entorno.

---

### Q946
**¿Qué es TPM (tokens per minute) en el contexto de cuotas de Azure OpenAI?**

A) Una métrica de facturación exclusiva de fine-tuning
B) El límite de throughput asignado a un deployment, que determina cuántos tokens puede procesar por minuto ✅
C) El tiempo promedio de respuesta del modelo
D) El número de usuarios concurrentes permitidos

**Explicación:** TPM es la unidad de cuota estándar de Azure OpenAI para deployments estándar (PTU es otra unidad para capacidad reservada); diseñar la arquitectura de una solución de alto tráfico requiere estimar y solicitar suficiente TPM para el deployment.

---

### Q947
**¿Qué es una PTU (Provisioned Throughput Unit) y cuándo conviene usarla en vez de un deployment estándar (pay-as-you-go)?**

A) Es lo mismo que TPM, solo con otro nombre
B) Capacidad de cómputo reservada con throughput garantizado y latencia predecible, conveniente para cargas de producción de alto volumen y consistentes ✅
C) Solo aplica a modelos de embeddings
D) Es obligatoria para cualquier deployment de producción

**Explicación:** PTU ofrece throughput garantizado (a diferencia del modelo estándar sujeto a rate limiting compartido de la región), a costo de un compromiso de capacidad reservada — la elección entre PTU y estándar es una decisión de arquitectura basada en volumen y previsibilidad de la carga.

---

### Q948
**¿Qué pasa si una aplicación en Responses API recibe un `function_call` pero el desarrollador no implementó ninguna lógica para ejecutar esa función?**

A) El SDK la ejecuta automáticamente de todos modos
B) La aplicación debe manejar ese caso explícitamente (por ejemplo, devolver un error o mensaje al modelo); el SDK nunca ejecuta funciones por su cuenta ✅
C) La conversación termina automáticamente con error
D) Azure OpenAI ejecuta la función en un sandbox remoto

**Explicación:** A diferencia de `code_interpreter` (que sí ejecuta código en un sandbox gestionado por Azure), `function_calling` delega SIEMPRE la ejecución real al código del cliente — el modelo solo describe la intención, nunca ejecuta nada por sí mismo.

---

### Q949
**¿Cuál es el propósito de fijar una versión exacta del paquete `openai` en `requirements.txt` (por ejemplo `openai==1.40.0`) en vez de usar un rango abierto?**

A) No tiene ningún beneficio real
B) Garantiza reproducibilidad del build y evita que un cambio breaking en una nueva versión rompa la app sin aviso ✅
C) Es obligatorio para que el SDK funcione
D) Mejora el rendimiento de las llamadas

**Explicación:** El pinning de versiones es una práctica estándar de ingeniería de software aplicable también a SDKs de IA en evolución rápida: evita que un `pip install` posterior traiga cambios incompatibles de API sin que el equipo lo haya validado.

---

### Q950
**¿Qué información NO debería registrarse en logs de una aplicación que usa Azure OpenAI, por razones de seguridad y privacidad?**

A) El nombre del deployment usado
B) La API key completa o el token AAD en texto plano ✅
C) La duración de la llamada
D) El código de estado HTTP de la respuesta

**Explicación:** Loggear secretos completos (API keys, tokens) es una vulnerabilidad común: si los logs se filtran o son accesibles por personal no autorizado, comprometen el recurso completo. Se recomienda loggear metadata operacional (latencia, status, deployment) pero nunca las credenciales mismas.

---

### Q951
**Un ingeniero recibe `AuthenticationError` a pesar de que la API key es correcta y no ha expirado. ¿Qué otra causa común debe investigar?**

A) La key nunca puede ser la causa correcta si es válida
B) Que la API key pertenezca a un recurso distinto al del `azure_endpoint` configurado ✅
C) Que el modelo esté sobrecargado
D) Que el `max_retries` sea muy bajo

**Explicación:** Un error muy común es mezclar la API key de un recurso de Azure OpenAI con el `azure_endpoint` de OTRO recurso — cada recurso tiene su propio par endpoint/key, y combinarlos incorrectamente produce errores de autenticación aunque la key en sí sea "válida" para otro recurso.

---

### Q952
**¿Cuál es la diferencia entre `azure-identity` y `azure-core` en el ecosistema de SDKs de Azure para Python?**

A) Son el mismo paquete con nombres distintos
B) `azure-identity` provee las clases de credenciales (auth); `azure-core` provee funcionalidad transversal compartida por todos los SDKs (políticas HTTP, paginación, excepciones base) ✅
C) `azure-core` es exclusivo de Azure OpenAI
D) `azure-identity` reemplaza completamente a `azure-core`

**Explicación:** `azure-core` es una dependencia base común a prácticamente todos los SDKs de Azure para Python (manejo de reintentos, logging HTTP, tipos de excepción base), mientras que `azure-identity` se especializa exclusivamente en mecanismos de autenticación.

---

### Q953
**¿Qué patrón de código es correcto para inicializar el credential UNA sola vez y reutilizarlo en múltiples clientes (por ejemplo, `AzureOpenAI` y `AIProjectClient`)?**

A) Crear una nueva instancia de `DefaultAzureCredential()` en cada llamada a la API
B) Instanciar `DefaultAzureCredential()` una vez a nivel de módulo/aplicación y pasarla a todos los clientes que la necesiten ✅
C) No es posible compartir credenciales entre distintos SDKs
D) Cada cliente requiere su propio tipo de credential incompatible entre sí

**Explicación:** `DefaultAzureCredential` internamente cachea tokens y tiene cierto costo de inicialización (prueba varias estrategias); crearla una sola vez y reutilizarla en todos los clientes del proceso es más eficiente y es el patrón recomendado en samples oficiales.

---

### Q954
**¿Qué implica que Azure OpenAI aplique un filtro de contenido (content filter) por defecto en cada request, incluso sin configuración adicional del desarrollador?**

A) Los filtros son opcionales y están deshabilitados por defecto
B) Azure aplica moderación automática de contenido dañino en input y output de forma predeterminada, salvo excepciones aprobadas explícitamente ✅
C) Solo se aplican si el desarrollador los activa manualmente
D) Los filtros solo aplican a modelos de imagen

**Explicación:** A diferencia de otras plataformas donde la moderación es opt-in, Azure OpenAI aplica el sistema de Content Safety por defecto a todas las requests como parte del compromiso de IA Responsable de Microsoft; deshabilitarlo requiere una solicitud de acceso modificado (modified content filtering) sujeta a revisión.

---

### Q955
**¿Qué campo de la respuesta indica que el contenido fue bloqueado por el filtro de contenido en vez de generado normalmente?**

A) `response.blocked`
B) El `finish_reason`/motivo de finalización con valor tipo `"content_filter"`, junto con detalles en metadata de la respuesta ✅
C) Un `HTTP 200` sin ninguna indicación especial
D) `response.status == "error"` genérico sin más detalle

**Explicación:** Cuando el filtro de contenido bloquea una generación, la API típicamente devuelve una respuesta (no necesariamente un error HTTP) con indicadores específicos de que el contenido fue filtrado, permitiendo a la aplicación distinguir este caso de un error técnico y responder apropiadamente al usuario.

---

### Q956
**¿Por qué es una mala práctica capturar `AuthenticationError` y simplemente reintentar la misma llamada varias veces?**

A) No es mala práctica, siempre se recomienda
B) Un error de autenticación no se resuelve solo con reintentos: la credencial sigue siendo inválida, y reintentar solo añade latencia sin solucionar la causa raíz ✅
C) El SDK bloquea automáticamente los reintentos en este caso
D) Reintentar `AuthenticationError` consume cuota de tokens

**Explicación:** A diferencia de errores transitorios (429, timeouts de red), un 401 indica un problema estructural (key inválida, token expirado sin refresco, permisos faltantes) que reintentar no resuelve — la respuesta correcta es alertar/loggear y corregir la configuración, no hacer retry-loop.

---

### Q957
**¿Qué ventaja de seguridad ofrece rotar periódicamente las API keys de un recurso de Azure OpenAI (cuando se usan, en vez de AAD)?**

A) Ninguna, las API keys de Azure nunca expiran ni se comprometen
B) Limita la ventana de exposición si una key se filtra accidentalmente (logs, repos públicos, etc.) ✅
C) Mejora el rendimiento de las llamadas
D) Es un requisito técnico del SDK, no de seguridad

**Explicación:** Azure OpenAI provee dos API keys por recurso precisamente para permitir rotación sin downtime (se cambia el tráfico a la key 2 mientras se regenera la key 1); rotar periódicamente reduce el riesgo si una key llegó a exponerse sin que el equipo lo supiera de inmediato.

---

### Q958
**¿Cuál es la mejor práctica entre usar API Key vs. Microsoft Entra ID (AAD) para autenticar un servicio interno de la misma organización que consume Azure OpenAI?**

A) API Key siempre, es más simple
B) Microsoft Entra ID vía Managed Identity, porque elimina la gestión de secretos y permite auditoría granular vía RBAC ✅
C) Ambas son equivalentes en seguridad
D) Depende únicamente de la latencia deseada

**Explicación:** Aunque la API Key es más rápida de implementar en un prototipo, para servicios de producción dentro de la misma organización Microsoft recomienda Entra ID/Managed Identity: no hay secreto que rotar ni filtrar, y el acceso queda auditado y controlado vía roles RBAC granulares.

---

### Q959
**¿Qué debería hacer un desarrollador si necesita que un script de un solo uso, ejecutado manualmente en su laptop, se autentique rápido para pruebas exploratorias?**

A) Crear una Managed Identity solo para esto
B) Usar `DefaultAzureCredential`, que caerá en `AzureCliCredential` tras un `az login` previo, sin necesitar configuración adicional ✅
C) Hardcodear una API key permanente en el script y no borrarla nunca
D) Es imposible autenticarse sin desplegar infraestructura

**Explicación:** Para uso exploratorio local, `DefaultAzureCredential` combinado con una sesión activa de `az login` es la vía más rápida y seguible sin crear infraestructura adicional ni exponer secretos de larga duración, ideal para scripts puntuales de desarrollo.

---

### Q960
**En un escenario de examen donde se describe una app que "debe funcionar sin gestionar secretos, corriendo en Azure App Service", ¿cuál es casi siempre la respuesta esperada?**

A) API Key almacenada en `.env`
B) System-assigned Managed Identity con `DefaultAzureCredential` ✅
C) `InteractiveBrowserCredential`
D) Compartir la API key del equipo por Slack

**Explicación:** Este es un patrón de pregunta recurrente en el examen: cuando el enunciado enfatiza "sin gestionar secretos" + "corriendo en un recurso de Azure" (App Service, Functions, AKS, VM), la respuesta correcta es casi siempre Managed Identity vía `DefaultAzureCredential`, el mecanismo diseñado exactamente para ese caso de uso.

---

## 📊 PROGRESO DE ESTE SUPLEMENTO

```
Q900-Q960 → 61 preguntas nuevas de Domain 1 (SDK/Auth), generadas para compensar
            la pérdida de los bancos originales Q1-Q150.
            Cobertura: credenciales encadenadas, RBAC, Key Vault, observabilidad,
            rate limiting, manejo de errores, deployments, PTU/TPM, content filter,
            CI/CD, redes/private endpoints, testing.
```
