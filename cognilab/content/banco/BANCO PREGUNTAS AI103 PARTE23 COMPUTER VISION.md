# BANCO DE PREGUNTAS AI-103 — PARTE 23 (Q1800-Q1819)
## Domain 3 (real): Computer Vision — chat multimodal con imágenes y generación de video con Sora 2
### Generado: 2026-08-21 | Fuente: módulos "Desarrollo de una aplicación de IA generativa habilitada para la visión" y "Generación de vídeos con Microsoft Foundry"

---

### Q1800
**¿Qué tipo de modelo se necesita en Microsoft Foundry para procesar avisos que incluyen imágenes?**

A) Cualquier modelo de lenguaje, sin ningún requisito especial
B) Un modelo multimodal — que admita no solo datos textuales, sino también datos de imágenes (y, en algunos casos, audio), como Phi-4-multimodal-instruct, gpt-4.1 o gpt-4.1-mini ✅
C) Exclusivamente un modelo de embeddings
D) Un modelo de generación de video como Sora 2

**Explicación:** Para gestionar indicaciones que incluyen imágenes se requiere implementar un modelo de inteligencia artificial generativa multimodal. El módulo lista específicamente Phi-4-multimodal-instruct y las variantes gpt-4.1/gpt-4.1-mini de OpenAI como ejemplos disponibles en Microsoft Foundry.

---

### Q1801
**¿Cuál es la principal diferencia estructural entre un mensaje de un chat basado en texto y uno basado en visión?**

A) El mensaje basado en visión no puede incluir ningún texto, solo la imagen
B) El mensaje de usuario en un chat basado en visión está compuesto por varias partes que contienen un elemento de contenido de texto y un elemento de contenido de imagen, en vez de un único bloque de texto plano ✅
C) El chat basado en visión requiere un endpoint completamente distinto al de texto
D) No hay ninguna diferencia estructural entre ambos tipos de chat

**Explicación:** La técnica base (conexión al endpoint, envío de mensajes, procesamiento de respuestas) es la misma que en chats de texto. Lo que cambia es que el contenido del mensaje de usuario pasa de ser una cadena de texto simple a una lista de partes, típicamente un elemento `input_text` y un elemento `input_image`.

---

### Q1802
**Este código envía una imagen local mediante la API de Responses:
```python
image_path = Path("dragon-fruit.jpeg")
image_format = "jpeg"
with open(image_path, "rb") as image_file:
    image_data = base64.b64encode(image_file.read()).decode("utf-8")
data_url = f"data:image/{image_format};base64,{image_data}"

response = client.responses.create(
    model="gpt-4.1",
    input=[
        {"role": "developer", "content": "You are an AI assistant for chefs planning recipes."},
        {"role": "user", "content": [
            { "type": "input_text", "text": "What desserts could I make with this?"},
            { "type": "input_image", "image_url": data_url}
        ] }
    ]
)
```
¿Por qué se codifica la imagen local en Base64 en vez de enviar directamente la ruta del archivo?**

A) Porque el SDK de OpenAI no admite archivos locales bajo ninguna circunstancia
B) Porque `image_url` espera una URL (web o de datos); una imagen local no tiene una URL pública, así que se codifica su contenido binario en Base64 dentro de una cadena `data:image/...;base64,...` para poder enviarla como si fuera una URL ✅
C) Porque Base64 comprime la imagen y reduce su tamaño antes de enviarla
D) Porque el modelo `gpt-4.1` solo acepta imágenes en formato Base64, nunca URLs web

**Explicación:** El parámetro `image_url` acepta tanto una URL web real de una imagen como una "data URL" que embebe los datos binarios codificados en Base64 directamente en la cadena, con el prefijo `data:image/{formato};base64,{datos}`. Para un archivo local sin URL pública, Base64 es la única forma de incluirlo en el mensaje.

---

### Q1803
**¿Cuándo se recomienda usar la API ChatCompletions en vez de la API de Responses para enviar un mensaje basado en imágenes?**

A) Siempre; ChatCompletions es la única API que admite imágenes
B) Cuando se usa el punto de conexión de Azure OpenAI para enviar mensajes a modelos que no admiten la API de Responses ✅
C) Nunca; ChatCompletions fue descontinuada y no debe usarse
D) Solo cuando la imagen es más grande de 1 MB

**Explicación:** El módulo presenta ambas rutas: la API de Responses (usada con modelos como `gpt-4.1`) y, como alternativa, la API ChatCompletions para modelos que no admiten la API de Responses (en el ejemplo del módulo, `Phi-4-multimodal-instruct`) — ambas permiten enviar contenido de imagen, pero con una estructura de mensaje ligeramente distinta.

---

### Q1804
**Comparando estos dos fragmentos de envío de imagen:
```python
# API de Responses
{ "type": "input_image", "image_url": data_url}

# API ChatCompletions
{ "type": "image_url", "image_url": {"url": data_url}}
```
¿Cuál es la diferencia clave en cómo cada API estructura el campo `image_url`?**

A) Son exactamente idénticos; ambos SDK aceptan cualquiera de las dos formas indistintamente
B) En la API de Responses, `image_url` es directamente la cadena de la URL (`"type": "input_image", "image_url": data_url`); en ChatCompletions, `image_url` es un objeto anidado con la clave `"url"` (`"type": "image_url", "image_url": {"url": data_url}}`) ✅
C) La API de Responses no admite imágenes en absoluto; solo ChatCompletions las admite
D) ChatCompletions requiere el tipo `"input_image"`; la API de Responses requiere `"type": "image_url"`

**Explicación:** Aunque ambas APIs cumplen el mismo propósito, no comparten exactamente el mismo esquema JSON: Responses usa `type: "input_image"` con `image_url` como cadena directa; ChatCompletions usa `type: "image_url"` con `image_url` como un objeto que envuelve la URL bajo la clave `url`. Confundir ambas estructuras es un error común al portar código entre las dos APIs.

---

### Q1805
**TRAMPA: Un desarrollador construye este cliente para el chat con imágenes:
```python
credential = DefaultAzureCredential()
token_provider = get_bearer_token_provider(credential, "https://ai.azure.com/.default")
client = OpenAI(
    base_url=openai_endpoint,
    api_key=token_provider()
)
```
Y usa el endpoint del PROYECTO de Foundry (no el endpoint de Azure OpenAI) como `openai_endpoint`. ¿Por qué esto es un error, según las instrucciones del ejercicio?**

A) No es un error; el endpoint del proyecto y el de Azure OpenAI son intercambiables
B) El ejercicio advierte explícitamente que se debe usar el endpoint de Azure OpenAI con formato `https://{foundry-resource-name}.openai.azure.com/openai/v1/`, no el endpoint del proyecto — usar el incorrecto rompe la conexión del cliente `OpenAI` ✅
C) El error es usar `DefaultAzureCredential` en vez de una clave de API
D) El error es llamar a `token_provider()` con paréntesis en vez de pasar la referencia de la función

**Explicación:** El módulo señala esta distinción como un punto crítico de configuración: "Be sure to add the Azure OpenAI endpoint, not the project endpoint!" — son dos URLs distintas del mismo recurso Foundry, y el cliente `OpenAI` de este ejercicio específicamente necesita el endpoint de Azure OpenAI para funcionar correctamente.

---

### Q1806
**¿Qué patrón de tres pasos sigue la generación de video con Sora 2, según el módulo?**

A) Autenticar → Entrenar → Desplegar
B) Crear el trabajo (job) → sondear el estado (poll) hasta que termine → descargar el resultado ✅
C) Cargar la imagen → aplicar filtros → exportar
D) Generar el prompt → validar contenido → publicar directamente

**Explicación:** La generación de video es un proceso asincrónico: se envía una solicitud para crear el trabajo (`client.videos.create(...)`), se consulta periódicamente su estado hasta que cambia a un estado terminal, y finalmente se descarga el video ya generado (`client.videos.download_content(...)`).

---

### Q1807
**Este código crea un trabajo de generación de video:
```python
video = client.videos.create(
    model="sora-2",
    prompt="A robot walks through a rainy city street at dusk, neon signs reflecting in puddles",
    size="1280x720",
    seconds="4",
)
```
¿Qué valores admite el parámetro `seconds` según la tabla de parámetros del módulo?**

A) Cualquier número entero entre 1 y 60
B) Únicamente 4, 8 o 12 segundos (el valor predeterminado es 4) ✅
C) Solo múltiplos de 10, hasta un máximo de 60
D) El parámetro `seconds` no existe; la duración se controla con `duration`

**Explicación:** A diferencia de un valor de duración libre, la tabla de parámetros del módulo especifica explícitamente que `seconds` solo admite 4, 8 o 12 como valores soportados, con 4 como predeterminado — no se puede pedir, por ejemplo, un video de 6 o 15 segundos.

---

### Q1808
**Este código sondea el estado de un trabajo de video hasta que termina:
```python
while video.status not in ["completed", "failed", "cancelled"]:
    print(f"Status: {video.status}. Waiting...")
    time.sleep(20)
    video = client.videos.retrieve(video.id)
```
¿Por qué la condición del `while` comprueba tres estados terminales distintos (`completed`, `failed`, `cancelled`) en vez de solo verificar si `video.status == "completed"`?**

A) Es un error del ejercicio; bastaría con comprobar únicamente `"completed"`
B) Porque un trabajo puede terminar en tres formas distintas (éxito, error, o cancelación), y el bucle debe dejar de sondear en cualquiera de esos tres casos — quedarse esperando solo `"completed"` haría que el bucle nunca termine si el trabajo falla o se cancela ✅
C) Porque `client.videos.retrieve()` solo funciona si se comprueban exactamente tres estados
D) Porque cada estado terminal requiere una llamada distinta de `time.sleep()`

**Explicación:** Un trabajo de video puede terminar exitosamente (`completed`), con un error (`failed`), o por cancelación (`cancelled`) — los tres son estados finales donde ya no tiene sentido seguir sondeando. Si el bucle solo comprobara `"completed"`, un trabajo que falla dejaría el programa esperando indefinidamente.

---

### Q1809
**¿Qué método se usa para modificar un video existente conservando su estructura general, y qué diferencia tiene frente a generar un video nuevo desde cero?**

A) `client.videos.create()` con el mismo `video_id` que el original
B) `client.videos.remix(video_id=..., prompt=...)`; a diferencia de crear un video nuevo, remix realiza ajustes dirigidos a un video existente (transiciones, diseño visual, estructura general) sin regenerarlo por completo ✅
C) `client.videos.edit()`, que reemplaza completamente el contenido original
D) No existe un método de remix; hay que descargar, editar manualmente y volver a subir el video

**Explicación:** `remix` está diseñado específicamente para ajustes dirigidos y focalizados sobre un video ya generado (p. ej. "misma iluminación, paleta nueva"), preservando sus elementos principales — no es equivalente a crear un video nuevo desde cero con `create()`, que no tiene relación con ningún video previo.

---

### Q1810
**¿Qué requisito específico deben cumplir las imágenes de referencia usadas con el parámetro `input_reference`?**

A) Deben pesar menos de 1 MB, sin ningún otro requisito
B) La resolución de la imagen debe coincidir exactamente con el tamaño de video de destino (p. ej. 1280x720), y debe estar en formato JPEG, PNG o WebP ✅
C) Deben contener obligatoriamente al menos una cara humana reconocible
D) Deben estar en formato Base64 únicamente; no se admiten archivos binarios directos

**Explicación:** El módulo especifica este requisito de forma explícita: la imagen de referencia (que actúa como primer fotograma) debe coincidir exactamente con la resolución objetivo del video, y solo se admiten los formatos JPEG, PNG o WebP — no cualquier resolución ni cualquier formato de imagen.

---

### Q1811
**TRAMPA: Un desarrollador intenta usar una foto de una persona sonriendo como imagen de referencia (`input_reference`) para animar un saludo. ¿Qué ocurre, según las restricciones actuales del módulo?**

A) Funciona sin ningún problema; Sora 2 anima caras humanas sin restricciones
B) Las imágenes de referencia que contienen caras humanas se rechazan actualmente; se recomienda usar imágenes de paisajes, objetos o personajes animados en su lugar ✅
C) Funciona, pero el video resultante tarda el doble de tiempo en generarse
D) Solo funciona si la persona en la foto ha dado su consentimiento explícito por escrito

**Explicación:** El módulo señala esta restricción de responsable AI de forma explícita: "Actualmente se rechazan las imágenes de referencia que contienen caras humanas." Es una limitación vigente del servicio, no una opción configurable — hay que usar otro tipo de imagen de referencia (paisajes, objetos, personajes animados).

---

### Q1812
**Según las consideraciones de Responsible AI del módulo de generación de video, ¿cuáles son restricciones activas del modelo Sora 2?**

A) Solo se restringe el contenido violento; todo lo demás está permitido sin filtros
B) Solo contenido apto para audiencias menores de 18 años; se rechazan personajes y música con copyright; no se pueden generar personas reales (incluidas figuras públicas); las imágenes de referencia con caras humanas se rechazan actualmente ✅
C) No existe ninguna restricción de contenido; Sora 2 genera cualquier solicitud sin moderación
D) Las restricciones solo aplican a la API, nunca al área de juegos (playground) del portal

**Explicación:** Estas son las protecciones de IA responsable (RAI) integradas que el módulo enumera explícitamente para Sora 2, junto con la moderación de entrada y salida que aplica Azure en todos los modelos de generación de imágenes/video — no son opcionales ni configurables por el desarrollador.

---

### Q1813
**¿Cuáles son los límites operativos que menciona el módulo para trabajos de generación de video en producción?**

A) No hay ningún límite de concurrencia ni de tiempo de disponibilidad de los resultados
B) Hasta dos trabajos de creación de video simultáneos (límite de velocidad), y los videos completados solo están disponibles para descarga durante 24 horas (expiración del trabajo) ✅
C) Un máximo de un trabajo por día por cuenta de Azure, sin límite de tiempo de descarga
D) Los límites solo aplican al modelo `sora-2-pro`, no al modelo `sora-2` estándar

**Explicación:** Estas son las "consideraciones clave" que el módulo lista explícitamente: límite de velocidad de dos trabajos simultáneos, y una ventana de 24 horas para descargar un video ya completado antes de que deje de estar disponible — ambos son límites operativos a tener en cuenta al diseñar una aplicación que use esta API.

---

### Q1814
**Según la "anatomía de instrucción" recomendada para prompts de generación de video, ¿qué cuatro elementos debe describir un mensaje bien estructurado?**

A) Solo el nombre del modelo, la resolución, la duración y el formato de salida
B) Encuadre de cámara (tipo de plano y ángulo), descripción del asunto (detalles distintivos), acción (movimiento en ritmos concretos), e iluminación y paleta (estado de ánimo y color) — además del estilo estético general ✅
C) Únicamente el diálogo que dirán los personajes en el video
D) Solo se necesita una descripción genérica de una frase; más detalle empeora el resultado

**Explicación:** El módulo compara escribir un prompt de video con dárselo a un director de cine: cuanto más específico se sea sobre encuadre, sujeto, acción e iluminación/paleta (y opcionalmente el estilo), más control y coherencia se obtiene en el resultado — dejar algunos detalles abiertos, en cambio, puede producir resultados creativos inesperados.

---

### Q1815
**Según la tabla de "indicaciones débiles frente a fuertes" del módulo, ¿por qué "El ciclista pedalea tres veces, frena y se detiene en el paso de peatones" es una instrucción más fuerte que "La persona se mueve rápidamente"?**

A) Porque es una oración más larga, y las instrucciones más largas siempre producen mejores resultados
B) Porque describe la acción en ritmos concretos y observables (pedalear tres veces, frenar, detenerse) en vez de una descripción vaga y genérica ("rápidamente"), dándole al modelo una secuencia de movimiento específica que interpretar ✅
C) Porque menciona un vehículo específico (una bicicleta), y Sora 2 solo genera videos con vehículos
D) No hay ninguna diferencia real de calidad entre ambas instrucciones

**Explicación:** El principio del módulo es describir la acción "en ritmos: pequeños pasos, gestos o pausas" en vez de adjetivos vagos como "rápidamente". Una secuencia concreta de movimientos observables le da al modelo información accionable sobre cómo debe verse el movimiento, mientras que un adverbio genérico deja demasiado a la interpretación.

---

### Q1816
**¿Por qué el módulo recomienda generar dos clips de 4 segundos y unirlos, en vez de generar directamente un solo clip de 8 segundos?**

A) Porque generar un clip de 8 segundos siempre falla técnicamente y nunca produce un resultado
B) Porque el modelo sigue las instrucciones de forma más confiable en clips más cortos; dos clips de 4 segundos suelen mantener mejor la coherencia con el prompt que un único clip más largo ✅
C) Porque el parámetro `seconds` no admite el valor 8 bajo ninguna circunstancia
D) Porque unir dos clips reduce a la mitad el costo de generación

**Explicación:** Esta es una sugerencia práctica explícita del módulo: aunque `seconds` sí admite el valor 8, la fidelidad del modelo a las instrucciones del prompt tiende a degradarse en clips más largos, por lo que dividir en clips más cortos y unirlos después suele dar mejores resultados que pedir un único clip largo.

---

### Q1817
**¿Qué característica de Sora 2 permite transformar imágenes existentes en contenido de video, según la tabla de funcionalidades del módulo?**

A) Video remix, que solo funciona sobre videos ya generados, nunca sobre imágenes
B) Imagen a video, usando el parámetro `input_reference` para que el modelo use la imagen como delimitador del primer fotograma mientras el prompt define lo que sucede después ✅
C) Generación de audio, que convierte descripciones de sonido en clips de imagen animada
D) Ninguna; Sora 2 solo puede generar video a partir de texto, nunca de imágenes

**Explicación:** La tabla de funcionalidades del módulo distingue "Texto a video" (generación pura desde prompt), "Imagen a video" (transformar una imagen existente en contenido de video usando `input_reference`) y "Video remix" (ajustes dirigidos a un video ya generado) como tres capacidades distintas de Sora 2.

---

### Q1818
**¿Qué debe hacer un desarrollador cuando el estado de un trabajo de video regresa `"failed"`, según el módulo?**

A) Reintentar automáticamente el mismo trabajo hasta 10 veces sin revisar la causa
B) Consultar `video.error` para obtener detalles sobre el problema que causó el fallo ✅
C) Nada; el módulo indica que los trabajos fallidos se reintentan automáticamente en segundo plano
D) Eliminar inmediatamente el proyecto de Foundry completo

**Explicación:** El módulo señala explícitamente: "Cuando se produce un error en un trabajo, consulte `video.error` para obtener detalles sobre el problema" — es el mecanismo indicado para diagnosticar por qué un trabajo específico terminó en estado `failed`, en vez de simplemente reintentar a ciegas.

---

### Q1819
**Un candidato de examen que ya domina el chat con imágenes (Domain 2/3) asume que la generación de video con Sora 2 usa exactamente el mismo patrón síncrono de "enviar mensaje, recibir respuesta". ¿Por qué esta suposición es incorrecta?**

A) Porque el chat con imágenes tampoco es síncrono; ambos requieren sondeo de estado
B) Porque la generación de video es asincrónica por naturaleza (puede tardar de 1 a 5 minutos): se crea un trabajo con `videos.create()`, se sondea su `status` en un bucle hasta un estado terminal, y solo entonces se descarga el resultado — muy distinto del intercambio directo de `responses.create()` → `response.output_text` del chat con imágenes ✅
C) Porque Sora 2 no tiene ningún concepto de "trabajo" o "estado"; genera el video de forma instantánea
D) Porque el chat con imágenes también tarda varios minutos en responder, igual que la generación de video

**Explicación:** El chat basado en visión (enviar texto + imagen, recibir texto de vuelta) es una operación síncrona típica de request/response. La generación de video, en cambio, es un proceso de larga duración que exige un patrón asíncrono de "crear trabajo → sondear estado → descargar resultado" — confundir ambos patrones lleva a código que no maneja correctamente la espera ni los estados intermedios del video.

---
