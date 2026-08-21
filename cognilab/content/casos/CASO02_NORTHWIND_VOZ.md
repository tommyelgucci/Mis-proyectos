# CASO DE ESTUDIO 2 — NorthWind Airlines
## Domain: Domain 4
## Icon: ✈️

### ESCENARIO

NorthWind Airlines quiere modernizar su centro de atención telefónica con tres capacidades nuevas, todas construidas sobre Microsoft Foundry:

1. **Agente de voz en vivo:** durante una llamada real, un agente de IA debe conversar por voz con el cliente en tiempo real — incluyendo poder ser interrumpido a media respuesta sin sonar torpe.
2. **Control de calidad post-llamada:** todas las llamadas se graban; un equipo de QA necesita las transcripciones en inglés de llamadas que llegaron en cualquier idioma, para poder revisarlas de forma centralizada.
3. **Anonimización para analítica:** un equipo de marketing, distinto del de QA, quiere estudiar patrones en esas transcripciones, pero solo debe recibir versiones sin ningún dato personal identificable (nombres, teléfonos, números de reserva).

**Entorno actual:**
- Un recurso de Foundry (`northwind-cc-resource`) con un modelo `gpt-5` ya desplegado, usado hoy solo para chat de texto.
- Las grabaciones de llamadas se almacenan como archivos `.wav` en un contenedor de Azure Blob Storage.
- El equipo de desarrollo, familiarizado con el SDK de OpenAI por el chat de texto existente, propone inicialmente resolver TODO el proyecto (los tres objetivos) usando únicamente `client.audio.transcriptions.create()` con un modelo `gpt-4o-transcribe`, seguido de llamadas de texto al mismo `gpt-5` para "traducir y limpiar" cada transcripción con un prompt.

---

### Q1
**Para el objetivo 1 (conversación de voz en vivo con capacidad de interrupción natural), ¿es apropiado el enfoque que el equipo ya conoce (`client.audio.transcriptions.create()` + llamadas de texto a `gpt-5`)? ¿Por qué sí o por qué no?**

A) Sí, es apropiado; cualquier combinación de transcripción y modelo de texto puede simular una conversación en tiempo real si se llama con suficiente frecuencia
B) No es apropiado, pero solo porque `gpt-4o-transcribe` no admite archivos `.wav`
C) Sí es apropiado, siempre que se use `gpt-4o-mini-transcribe` en vez de `gpt-4o-transcribe`, ya que es más rápido
D) No es apropiado: ese patrón es de solicitud-respuesta discreta (transcribir un audio completo, luego generar texto). El objetivo 1 requiere una sesión continua de baja latencia con manejo nativo de turnos e interrupciones — exactamente lo que resuelve Voice Live API (WebSocket, eventos de servidor como `INPUT_AUDIO_BUFFER_SPEECH_STARTED`), no un pipeline de llamadas discretas ✅

**Explicación:** El objetivo 1 describe exactamente el caso de uso de Voice Live: conversación en tiempo real donde el sistema debe reaccionar de inmediato cuando el cliente empieza a hablar (interrumpiendo al agente). El patrón de transcripción discreta + llamada de texto no tiene forma de manejar interrupciones a media respuesta ni de mantener la latencia baja que una llamada telefónica real exige — es la distinción arquitectónica central entre operaciones discretas y una sesión continua sobre WebSocket.

---

### Q2
**Para el objetivo 2 (transcripciones en inglés de llamadas grabadas en cualquier idioma), ¿qué combinación de configuración es la más directa, evitando el paso intermedio de "transcribir y luego traducir con un prompt de texto" que propone el equipo?**

A) `SpeechTranslationConfig` con `speech_recognition_language` sin especificar (detección automática) y `add_target_language('en')`, usado con un `TranslationRecognizer` — traduce la voz de entrada directamente a texto en inglés, sin necesitar una llamada de texto separada para "traducir y limpiar" ✅
B) `client.audio.transcriptions.create()` con `gpt-4o-transcribe`, ya que este modelo traduce automáticamente cualquier idioma detectado al inglés sin configuración adicional
C) Azure Translator (`TextTranslationClient.translate()`) aplicado directamente sobre el archivo `.wav`, ya que admite tanto texto como audio como entrada
D) No existe una forma directa; siempre se requiere primero transcribir y luego traducir el texto por separado con dos llamadas

**Explicación:** Este es precisamente el servicio que combina ambos pasos en una sola operación: `TranslationRecognizer` (configurado con `SpeechTranslationConfig`) traduce la voz de entrada DIRECTAMENTE a texto en el idioma de destino, sin pasar por un paso intermedio de "transcribir en el idioma original y luego traducir ese texto con otro modelo" — el enfoque que el equipo proponía es más complejo e indirecto de lo necesario.

---

### Q3
**Para el objetivo 3 (anonimizar las transcripciones antes de compartirlas con marketing), ¿qué servicio y método específico resuelven esto directamente, sin que el equipo tenga que escribir su propia lógica de reemplazo de texto?**

A) `client.audio.speech.with_streaming_response.create()`, que genera automáticamente una versión de audio sin datos personales
B) `get_supported_languages()` de Azure Translator, que incluye una bandera opcional para anonimizar el resultado
C) `recognize_pii_entities()` de Azure Language, cuya respuesta incluye directamente `redacted_text` — una versión del texto con la información personal ya reemplazada por asteriscos, sin necesitar lógica de reemplazo propia ✅
D) Es necesario que el equipo escriba su propia expresión regular para detectar y quitar nombres, teléfonos y números de reserva

**Explicación:** Esta es exactamente la capacidad de extracción de PII de Azure Language: `recognize_pii_entities()` no solo identifica las entidades sensibles con su categoría y confianza, sino que además devuelve `redacted_text` — el texto ya enmascarado, listo para compartir con el equipo de marketing sin que el equipo de desarrollo tenga que implementar su propia lógica de detección o reemplazo.

---

### Q4
**El equipo de desarrollo, acostumbrado a hardcodear la clave del recurso durante el prototipo de chat de texto, quiere reutilizar ese mismo patrón para los tres nuevos objetivos de voz. ¿Qué deberían hacer en su lugar para los tres servicios (Voice Live, traducción de voz, extracción de PII), y por qué es el mismo patrón en los tres casos?**

A) Cada servicio requiere un mecanismo de autenticación completamente distinto e incompatible entre sí, así que no hay un patrón común que aplicar
B) Usar `DefaultAzureCredential()` (autenticación de Microsoft Entra ID) en vez de una clave estática en los tres casos — es el mismo patrón dual (clave para desarrollo simple, credencial gestionada para producción) que se repite consistentemente en todos los clientes de Foundry Tools vistos en esta ruta de aprendizaje ✅
C) Solo Voice Live admite autenticación por clave; los otros dos servicios exigen certificados de cliente
D) Deben generar una clave de API distinta para cada uno de los tres servicios y almacenarlas en el código fuente de cada módulo

**Explicación:** Este es el patrón de diseño consistente que atraviesa TODOS los SDK de Foundry Tools cubiertos: `TextAnalyticsClient`, `SpeechConfig`/`SpeechTranslationConfig`, `TextTranslationClient`, y la conexión de Voice Live admiten todos un parámetro de credencial (`token_credential`/`credential`) que acepta `DefaultAzureCredential()` — la misma recomendación de production-readiness aplica a los tres objetivos nuevos, no es necesario reinventar la autenticación por servicio.

---

### Q5
**Un cliente que llama en francés se queja de que, durante la llamada EN VIVO (objetivo 1), preferiría que el agente le respondiera también en francés en vez de en inglés. Según lo visto en el módulo de Voice Live, ¿la sesión de Voice Live traduce automáticamente entre idiomas del cliente y del agente?**

A) Sí, Voice Live incluye traducción automática de idioma como parte central de `session.update`, sin configuración adicional
B) No — Voice Live está diseñado para conversación fluida EN TIEMPO REAL con manejo de turnos e interrupciones (VAD semántico, streaming de audio), pero el módulo no lo describe como un servicio de traducción entre idiomas; el idioma de la conversación se configura (voz, instrucciones), no se traduce dinámicamente de un idioma a otro dentro de la misma sesión ✅
C) Sí, mediante el parámetro `turn_detection` con `type: "azure_semantic_vad"`, que traduce automáticamente el turno detectado
D) No, y no existe ninguna forma de que el agente responda en francés bajo ningún escenario

**Explicación:** Esta pregunta prueba la distinción entre servicios en vez de asumir que "todo lo de voz hace lo mismo": Voice Live resuelve la conversación fluida en tiempo real (baja latencia, interrupciones, VAD), pero no es el servicio de traducción entre idiomas descrito en el módulo — eso es responsabilidad de `SpeechTranslationConfig`/`TranslationRecognizer` (objetivo 2). Es perfectamente posible configurar la voz e instrucciones del agente de Voice Live en francés para que la CONVERSACIÓN completa ocurra en francés, pero eso es distinto de "traducir dinámicamente" un idioma a otro dentro de la misma sesión en vivo.

---

### Q6
**Durante una llamada en vivo, el cliente interrumpe al agente a media respuesta para corregir un dato. Según el patrón de manejo de eventos de Voice Live visto en el módulo, ¿qué debe hacer el CLIENTE (no el servidor) en el instante en que detecta esa interrupción?**

A) Al recibir el evento `INPUT_AUDIO_BUFFER_SPEECH_STARTED`, detener inmediatamente su propia reproducción de audio en curso (vaciando la cola de reproducción) — no esperar la confirmación del servidor, ya que la latencia de esa espera haría que el agente "hable sobre" el cliente ✅
B) Esperar a que el servidor confirme la interrupción antes de tomar cualquier acción, para evitar cortar el audio antes de tiempo
C) Cerrar la conexión WebSocket por completo y reiniciar la sesión desde cero
D) Ignorar la interrupción; Voice Live no permite que el usuario interrumpa al agente bajo ninguna configuración

**Explicación:** Este es el punto central del manejo de interrupciones visto en el módulo de Voice Live: la responsabilidad de detener la reproducción recae en el CLIENTE, al recibir `INPUT_AUDIO_BUFFER_SPEECH_STARTED` — reaccionar de inmediato (sin esperar más confirmación del servidor) es lo que evita que el agente siga hablando sobre el cliente durante el tiempo que tarda el servidor en procesar completamente la interrupción.

---
