# BANCO DE PREGUNTAS AI-103 — PARTE 23 (Q1800-Q1873)
## Domain 3 (real): Computer Vision — chat multimodal con imágenes, generación de video con Sora 2, generación de imágenes, y Content Understanding (análisis de imágenes, soluciones multimodales, y app cliente)
### Generado: 2026-08-21 | Fuente: módulos "Desarrollo de una aplicación de IA generativa habilitada para la visión", "Generación de vídeos con Microsoft Foundry", "Generación de imágenes con IA en Azure OpenAI", "Análisis de imágenes con Content Understanding", "Creación de una solución de análisis multimodal con Azure Content Understanding" y "Creación de una aplicación cliente de Azure Content Understanding"

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

### Q1820
**¿Qué son los "modelos de generación de imágenes", en una frase precisa?**

A) Sistemas de búsqueda que recuperan la imagen más parecida de un catálogo mantenido por Microsoft
B) Modelos de IA generativa que crean datos gráficos ORIGINALES a partir de entrada de lenguaje natural — no recuperan imágenes existentes, generan nuevas basadas en los datos con los que se entrenaron ✅
C) Modelos que solo pueden clasificar imágenes ya existentes en categorías predefinidas
D) Una función de edición de fotos integrada en el portal de Foundry, sin ningún componente de IA

**Explicación:** El módulo lo aclara explícitamente: "las imágenes generadas son originales; no se recuperan de un catálogo de imágenes mantenido... el modelo no es un sistema de búsqueda para buscar imágenes adecuadas: es un modelo de IA que genera nuevas imágenes basadas en los datos en los que se entrenó."

---

### Q1821
**¿Cuáles son dos familias de modelos de generación de imágenes disponibles en Microsoft Foundry, según el módulo?**

A) BERT y RoBERTa
B) La serie gpt-image-1 de OpenAI y la serie FLUX de Black Forest Labs ✅
C) Whisper y DALL-E únicamente, sin ninguna otra opción
D) Solo existe un modelo de generación de imágenes en todo Microsoft Foundry

**Explicación:** El módulo menciona explícitamente estas dos familias como ejemplos (no exhaustivos) de modelos de generación de imágenes disponibles en el catálogo de Microsoft Foundry: la serie gpt-image-1 de OpenAI, y la serie FLUX de Black Forest Labs.

---

### Q1822
**Al buscar un modelo de generación de imágenes en el catálogo de modelos de Microsoft Foundry, ¿por qué tarea de inferencia se debe filtrar, según la evaluación oficial del módulo?**

A) Imagen a texto
B) Texto a imagen ✅
C) Embeddings
D) Clasificación de imágenes

**Explicación:** Esta es la respuesta correcta de la evaluación oficial del módulo: para encontrar modelos de generación de imágenes en el catálogo, se filtra por la tarea de inferencia "Texto a imagen" (no "Imagen a texto", que describiría lo opuesto — generar descripciones a partir de una imagen — ni "Embeddings", que no genera contenido gráfico).

---

### Q1823
**Este código genera y guarda una imagen con la API de imágenes de OpenAI:
```python
img_results = client.images.generate(
    model="FLUX.1-Kontext-pro",
    prompt="A robot eating a cheeseburger.",
    n=1,
    size="1024x1024",
)
image_data = base64.b64decode(img_results.data[0].b64_json)
with open("image.png", "wb") as image_file:
    image_file.write(image_data)
```
¿En qué formato llega la imagen generada en `img_results.data[0].b64_json`, y qué paso adicional se necesita antes de poder guardarla como archivo?**

A) Llega como una URL pública lista para descargar directamente con `requests.get()`
B) Llega como una cadena de texto codificada en Base64; hay que decodificarla con `base64.b64decode(...)` para obtener los bytes binarios reales antes de escribirlos a un archivo ✅
C) Llega ya como un objeto de imagen de Python (`PIL.Image`) listo para guardar con `.save()`
D) Llega como un array de píxeles crudos sin ninguna codificación

**Explicación:** El modelo de generación de imágenes devuelve el contenido de la imagen como una cadena Base64 (`b64_json`), no como bytes binarios directos ni como una URL. `base64.b64decode(...)` convierte esa cadena de texto de vuelta a los bytes binarios reales de la imagen PNG, que recién entonces pueden escribirse a un archivo con `wb` (write binary).

---

### Q1824
**Este es el patrón de inicialización del cliente en el ejercicio de generación de imágenes:
```python
token_provider = get_bearer_token_provider(
    DefaultAzureCredential(exclude_environment_credential=True,
                           exclude_managed_identity_credential=True),
    "https://cognitiveservices.azure.com/.default"
)
client = OpenAI(
    base_url=endpoint,
    api_key=token_provider(),
)
```
¿Qué logra excluir explícitamente `exclude_environment_credential` y `exclude_managed_identity_credential` en `DefaultAzureCredential`?**

A) Deshabilita por completo cualquier autenticación, permitiendo llamadas anónimas
B) Fuerza a `DefaultAzureCredential` a omitir esos dos métodos de la cadena de credenciales y recurrir a otro mecanismo disponible (como la CLI de Azure autenticada localmente), para un comportamiento predecible durante el desarrollo ✅
C) Hace que el cliente use una clave de API codificada en el archivo `.env` en su lugar
D) Es un error de sintaxis; `DefaultAzureCredential` no admite parámetros de exclusión

**Explicación:** `DefaultAzureCredential` normalmente prueba varios métodos de autenticación en cadena. Excluir explícitamente algunos (aquí, la credencial de entorno y la identidad administrada) evita ambigüedad sobre qué credencial se está usando realmente durante el desarrollo local, forzando el comportamiento hacia la CLI de Azure — el mismo patrón usado en otros ejercicios de agentes A2A vistos anteriormente.

---

### Q1825
**En el área de juegos (playground) de generación de imágenes del portal de Microsoft Foundry, ¿qué dos opciones adicionales se pueden especificar más allá del propio texto del prompt?**

A) Solo el idioma del prompt, sin ninguna otra opción de configuración
B) La resolución (tamaño) de las imágenes generadas, y una imagen de referencia para que el modelo base su salida (sujeto a compatibilidad del modelo) ✅
C) El número exacto de tokens que puede usar el modelo, sin límite de resolución
D) El nombre del archivo de salida y la carpeta de destino en el equipo local

**Explicación:** El módulo señala que, además de escribir el prompt de texto, el área de juegos permite especificar la resolución deseada de la imagen y, si el modelo lo admite, proporcionar una imagen de referencia sobre la cual el modelo puede basar su salida.

---

### Q1826
**¿Qué parámetro de `client.images.generate(...)` controla cuántas imágenes se generan en una sola llamada?**

A) `count`
B) `n` ✅
C) `quantity`
D) `images`

**Explicación:** Tanto en el ejemplo del ejercicio (`n=1`) como en el código de la unidad de la API REST (`n=1`), el parámetro `n` es el que indica cuántas variaciones de imagen debe generar el modelo en esa llamada — no `count`, `quantity` ni `images`.

---

### Q1827
**En la app cliente de generación de imágenes del ejercicio, ¿qué ocurre si el usuario envía dos prompts seguidos como "Un robot comiendo pizza" y luego "Ahora ponlo en un restaurante"?**

A) El modelo recuerda automáticamente el primer prompt y genera una imagen consistente con ambos, igual que en un chat multiturno
B) Como la app simple del ejercicio no implementa lógica de historial de conversación, el segundo prompt se trata como una solicitud nueva sin ningún contexto del primero ✅
C) La aplicación lanza un error, ya que solo admite un prompt por sesión de ejecución
D) El segundo prompt sobrescribe automáticamente la imagen generada por el primero sin generar una nueva

**Explicación:** El módulo lo señala explícitamente, igual que en el ejercicio del chat con imágenes: "en esta app sencilla no hemos implementado lógica para retener el historial de conversación; así que el modelo tratará cada aviso como una solicitud nueva sin contexto del aviso anterior" — cada llamada a `images.generate()` es independiente.

---

### Q1828
**¿Qué es cierto sobre el `.env` de configuración en el ejercicio de generación de imágenes, respecto al endpoint que debe contener?**

A) Debe contener el endpoint del proyecto de Foundry, nunca el de Azure OpenAI
B) Debe contener específicamente el endpoint de Azure OpenAI con el formato `https://{foundry-resource-name}.openai.azure.com/openai/v1/`, no el endpoint del proyecto ✅
C) El `.env` no necesita ningún endpoint; se detecta automáticamente
D) Debe contener la URL pública de la imagen de referencia que se usará

**Explicación:** El mismo patrón de configuración visto en el ejercicio de chat con imágenes se repite aquí: la aplicación cliente necesita el endpoint de Azure OpenAI (no el endpoint del proyecto de Foundry, que es una URL distinta del mismo recurso) para que el SDK de OpenAI se conecte correctamente al modelo desplegado.

---

### Q1829
**¿Qué API REST se menciona como la vía alternativa al SDK de Python para generar imágenes desde una aplicación cliente?**

A) La API de Content Safety
B) La API de imágenes de OpenAI (OpenAI Images API), accesible tanto vía SDK específico del lenguaje como vía REST directo ✅
C) La API de Document Intelligence
D) No existe ninguna alternativa REST; solo el SDK de Python puede generar imágenes

**Explicación:** El módulo presenta el mismo patrón de generación de imágenes (`client.images.generate(...)`) tanto desde el SDK específico del lenguaje (Python de OpenAI, o el SDK de .NET de Azure OpenAI) como conceptualmente equivalente vía la API REST subyacente — la elección entre SDK y REST directo es de preferencia de implementación, no cambia el modelo ni el resultado.

---

### Q1830
**¿Qué SDKs específicos de lenguaje se mencionan como alternativas al SDK de Python de OpenAI para desarrollar aplicaciones cliente de generación de imágenes?**

A) Solo existe soporte para Python; ningún otro lenguaje puede usar estos modelos
B) OpenAI Projects para Microsoft .NET y OpenAI Projects para JavaScript ✅
C) Java y Go exclusivamente
D) Ruby on Rails y PHP

**Explicación:** El módulo aclara que, aunque el ejercicio se basa en el SDK de Python de OpenAI, se pueden desarrollar aplicaciones de IA con múltiples SDKs específicos de lenguaje, mencionando explícitamente OpenAI Projects para Microsoft .NET y OpenAI Projects para JavaScript como alternativas.

---

### Q1831
**Un candidato de examen que ya domina el chat con imágenes (input_image) asume que generar una imagen nueva usa el mismo método `client.responses.create()`. ¿Por qué esta suposición es incorrecta?**

A) No es incorrecta; `responses.create()` genera tanto texto como imágenes nuevas indistintamente
B) Generar una imagen nueva usa un método distinto, `client.images.generate(model=, prompt=, n=, size=)`, que devuelve datos de imagen (`b64_json`) — `responses.create()` es para conversaciones de chat (con o sin imágenes de ENTRADA), no para generar imágenes como salida ✅
C) `client.images.generate()` solo existe en la API REST, nunca en el SDK de Python
D) Ambos métodos requieren el mismo formato exacto de respuesta, solo cambia el nombre de la función

**Explicación:** Es un error fácil de cometer porque ambos escenarios (chat con imagen de entrada, y generación de imagen como salida) están dentro de "Computer Vision" y usan el mismo cliente `OpenAI`. Pero son operaciones distintas con métodos distintos: `responses.create()` con contenido `input_image` es para que el modelo ENTIENDA una imagen que se le envía; `images.generate()` es para que el modelo CREE una imagen nueva a partir de un prompt de texto.

---

### Q1832
**¿Qué es Azure Content Understanding, en una frase precisa?**

A) Un modelo de lenguaje que solo genera texto a partir de otro texto
B) Una herramienta de la plataforma Foundry que usa IA generativa para procesar y extraer perspectivas de diversos tipos de contenido (documentos, imágenes, vídeos, audio), transformando datos no estructurados en salida estructurada y accionable ✅
C) Un servicio exclusivo para generar imágenes nuevas a partir de prompts de texto
D) Una base de datos vectorial para almacenar embeddings de imágenes

**Explicación:** A diferencia de un modelo de generación de imágenes (que crea contenido nuevo), Content Understanding analiza contenido existente no estructurado (de varios tipos: documentos, imágenes, video, audio) y lo transforma en datos estructurados según un esquema definido por el usuario, listos para flujos de trabajo de automatización, análisis o búsqueda.

---

### Q1833
**¿Cuáles son los seis componentes del marco de Content Understanding, en el orden en que procesan el contenido?**

A) Modelo, Entrenamiento, Validación, Despliegue, Monitoreo, Reentrenamiento
B) Inputs (contenido de origen) → Analizador (define el procesamiento) → Extracción de contenido (OCR/transcripción/diseño) → Extracción de campos (pares clave-valor) → Puntuaciones de confianza (0 a 1) → Tierra/anclaje (regiones donde se extrajo cada valor), con Salida final en Markdown o JSON ✅
C) Solo existen dos componentes: entrada y salida, sin pasos intermedios
D) Índice, Analizador de búsqueda, Indexador, sin relación con extracción de campos

**Explicación:** El marco de Content Understanding procesa el contenido en fases bien definidas: recibe el contenido de origen (Inputs), lo procesa según la configuración del Analizador, extrae texto/metadatos normalizados (Extracción de contenido), genera pares clave-valor según un esquema (Extracción de campos), asigna una confiabilidad a cada valor (Puntuaciones de confianza), identifica dónde se encontró cada valor (Tierra/grounding), y entrega el resultado final estructurado.

---

### Q1834
**¿Cuál es la diferencia entre un "analizador creado previamente" (prebuilt) y un "analizador personalizado" en Content Understanding?**

A) Son exactamente lo mismo; "personalizado" es solo otro nombre para "prebuilt"
B) Los analizadores prebuilt están listos para usar en escenarios comunes (facturas, recibos, análisis de centro de llamadas); los personalizados se crean con un esquema de campo propio para necesidades empresariales específicas ✅
C) Los analizadores personalizados solo pueden procesar audio, nunca imágenes
D) Los analizadores prebuilt requieren siempre entrenamiento previo con datos propios del usuario

**Explicación:** Content Understanding ofrece dos rutas: usar un analizador prebuilt ya optimizado para un escenario común (sin configuración adicional de esquema), o crear un analizador personalizado definiendo el propio esquema de campos cuando el caso de uso no encaja en ninguno de los prebuilt disponibles.

---

### Q1835
**¿Cuáles son los seis formatos de imagen que admite Content Understanding como entrada?**

A) Solo JPEG y PNG; ningún otro formato es compatible
B) JPEG, PNG, BMP, TIFF, HEIF, y PDF (documentos de una o varias páginas con imágenes incrustadas) ✅
C) GIF, WebP, SVG, ICO, AVIF y RAW
D) Solo formatos vectoriales: SVG y EPS

**Explicación:** La tabla de formatos admitidos del módulo incluye JPEG (fotos estándar), PNG (con transparencia), BMP (mapa de bits), TIFF (documentos escaneados de alta calidad), HEIF (formato de alta eficiencia), y PDF (documentos con imágenes incrustadas) — un rango más amplio que solo imágenes fotográficas comunes.

---

### Q1836
**¿Cuáles son los cuatro analizadores de imágenes preconfigurados que menciona el módulo, y para qué sirve cada uno?**

A) `prebuilt-image` (análisis general con descripción de figura), `prebuilt-receipt` (proveedores, artículos, totales y fechas de recibos), `prebuilt-invoice` (elementos de línea, importes y proveedor de facturas), y `prebuilt-idDocument` (información de documentos de identidad) ✅
B) Solo existe un analizador preconfigurado universal para cualquier tipo de imagen
C) `prebuilt-video`, `prebuilt-audio`, `prebuilt-text` y `prebuilt-chart`, sin ninguno específico para imágenes
D) Los cuatro analizadores preconfigurados requieren siempre entrenamiento adicional antes de poder usarse

**Explicación:** Cada analizador preconfigurado está optimizado para un escenario común: `prebuilt-image` para análisis general de imágenes con descripción de contenido, `prebuilt-receipt` para datos de recibos de compra, `prebuilt-invoice` para datos de facturas, y `prebuilt-idDocument` para documentos de identidad como licencias o pasaportes.

---

### Q1837
**¿Cuáles son los tres métodos de extracción que puede usar cada campo de un esquema de Content Understanding, y qué hace cada uno?**

A) `read`, `write`, `delete` — operaciones básicas de archivo, sin relación con análisis de contenido
B) `extract` (extraer valores que aparecen directamente en la imagen, p. ej. texto de una etiqueta), `classify` (clasificar el contenido entre opciones predefinidas, p. ej. "dañada"/"no dañada"), y `generate` (crear valores basados en el análisis, p. ej. una descripción de la escena) ✅
C) `ocr`, `transcribe`, `translate` — únicamente procesamiento de texto e idioma
D) Solo existe un método de extracción; todos los campos se procesan de la misma forma

**Explicación:** Estos tres métodos cubren necesidades distintas: `extract` toma un valor literal presente en la imagen (como leer un número de serie), `classify` asigna la imagen a una de varias categorías predefinidas (como el estado de un producto), y `generate` produce contenido nuevo basado en el análisis (como una descripción libre de lo que muestra la imagen) — no son intercambiables.

---

### Q1838
**Este es un esquema de ejemplo para analizar imágenes de producto:
```json
{
  "description": "Product image analyzer",
  "baseAnalyzerId": "prebuilt-image",
  "fieldSchema": {
    "fields": {
      "ProductName": {
        "type": "string",
        "method": "extract",
        "description": "Name of the product visible in the image"
      },
      "Condition": {
        "type": "string",
        "method": "classify",
        "description": "Condition of the product",
        "enum": ["new", "used", "damaged"]
      },
      "Description": {
        "type": "string",
        "method": "generate",
        "description": "Brief description of what the image shows"
      }
    }
  }
}
```
¿Por qué el campo `Condition` incluye una lista `enum` mientras que `ProductName` y `Description` no la tienen?**

A) Es un error del esquema; todos los campos deberían tener `enum`
B) `enum` define el conjunto cerrado de valores posibles porque `Condition` usa el método `classify` (elegir entre opciones predefinidas: "new", "used", "damaged"); `ProductName` (`extract`) y `Description` (`generate`) no tienen un conjunto fijo de valores posibles, así que no aplica `enum` ✅
C) `enum` es obligatorio solo para campos de tipo `string`, sin relación con el método usado
D) `enum` limita el número máximo de caracteres que puede tener el valor del campo

**Explicación:** El método `classify` necesita saber, de antemano, cuáles son las categorías válidas entre las que el modelo debe elegir — eso es exactamente lo que define `enum`. Los métodos `extract` y `generate` producen valores abiertos (un nombre leído de la imagen, o una descripción generada libremente), por lo que restringir a un conjunto fijo de opciones no tendría sentido para ellos.

---

### Q1839
**Este código analiza una imagen con Content Understanding:
```python
credential = DefaultAzureCredential()
client = ContentUnderstandingClient(
    endpoint=endpoint,
    credential=credential,
    api_version=api_version)

poller = client.begin_analyze(
    analyzer_id=analyzer_id,
    inputs=[AnalysisInput(data=file_bytes)],
)
result: AnalysisResult = poller.result()
```
¿Qué patrón de SDK ilustra el uso de `begin_analyze(...)` seguido de `poller.result()`?**

A) Una llamada síncrona simple donde `begin_analyze` ya devuelve el resultado final directamente
B) Un patrón de operación de larga duración (long-running operation): `begin_analyze` inicia el análisis y devuelve un objeto `poller` de inmediato, y `poller.result()` bloquea hasta que el análisis termine y entrega el resultado final ✅
C) Un patrón de suscripción a eventos donde `begin_analyze` requiere un callback obligatorio
D) `poller.result()` reintenta automáticamente el análisis hasta 3 veces si falla

**Explicación:** El prefijo `begin_` en el nombre del método, junto con el objeto `poller` retornado, es la convención estándar de los SDK de Azure para operaciones de larga duración (analizar una imagen no es instantáneo): se inicia la operación, se recibe un objeto para consultar su progreso, y `.result()` espera a que termine para devolver el resultado — el mismo patrón usado en Document Intelligence (`begin_analyze_document`) visto en Domain 5.

---

### Q1840
**Según los resultados de un análisis con Content Understanding, ¿qué representa específicamente el campo `source` (anclaje/"tierra") de un valor extraído, según la evaluación oficial del módulo?**

A) La URL donde se puede descargar la imagen original analizada
B) Información que identifica las regiones específicas en el contenido donde se extrajo cada valor — no está relacionado con conectar a Azure Storage ni con filtrar contenido dañino ✅
C) El nombre del analizador que se usó para procesar la imagen
D) La fecha y hora exacta en que se ejecutó el análisis

**Explicación:** Esta es la respuesta correcta de la evaluación oficial del módulo: el propósito del anclaje (`source`) es identificar las regiones específicas del contenido de origen donde se encontró cada valor extraído (p. ej. las coordenadas de un texto en la imagen) — permite verificar de dónde salió cada dato, no es una conexión de almacenamiento ni un mecanismo de moderación de contenido.

---

### Q1841
**Según la evaluación oficial del módulo, ¿qué indica una puntuación de confianza de 0.95 para un campo extraído?**

A) Hubo un error en la extracción y necesita revisión manual obligatoria
B) El valor puede ser de confianza para el procesamiento automatizado ✅
C) El campo se clasificó (`classify`) en vez de extraerse (`extract`)
D) La puntuación de confianza no tiene ningún significado práctico, es solo informativa

**Explicación:** Según el rango del módulo, confianza alta (0.9+) significa que el valor puede tratarse como confiable para procesamiento automatizado sin intervención humana — 0.95 cae claramente en ese rango. Confianza media (0.7-0.9) sugiere considerar revisión humana en aplicaciones críticas, y confianza baja (menor a 0.7) recomienda comprobación manual directa.

---

### Q1842
**¿Qué analizador preconfigurado usarías para extraer los nombres de proveedor y los totales de artículos de un recibo de compra, según la evaluación oficial del módulo?**

A) `prebuilt-image`
B) `prebuilt-invoice`
C) `prebuilt-receipt` ✅
D) `prebuilt-idDocument`

**Explicación:** Aunque `prebuilt-invoice` también extrae datos financieros, está diseñado específicamente para facturas (con sus propios campos como elementos de línea e información de proveedor formal); el escenario descrito —nombres de proveedor y totales de un recibo de COMPRA— corresponde exactamente al analizador `prebuilt-receipt`, optimizado para ese tipo de documento.

---

### Q1843
**TRAMPA: Un desarrollador que ya completó el ejercicio de chat con imágenes (que requería el endpoint de Azure OpenAI) asume que el endpoint para Content Understanding es el mismo tipo de endpoint. Según el ejercicio, ¿qué endpoint se debe usar realmente?**

A) El mismo endpoint de Azure OpenAI (`https://{recurso}.openai.azure.com/openai/v1/`) usado en el chat con imágenes
B) El endpoint del recurso Foundry con formato `https://{YOUR-RESOURCE-NAME}.services.ai.azure.com` — el ejercicio advierte explícitamente que NO es ni el endpoint del proyecto ni el endpoint de Azure OpenAI ✅
C) El endpoint del proyecto de Foundry, igual que en los ejercicios de agentes
D) No se necesita ningún endpoint; `ContentUnderstandingClient` se conecta automáticamente

**Explicación:** A diferencia de los ejercicios de chat/generación de imágenes con el SDK de OpenAI (que usan el endpoint de Azure OpenAI), Content Understanding usa su propio tipo de endpoint de servicio (`.services.ai.azure.com`) — el módulo lo señala explícitamente: "Be sure to add the ... Foundry resource endpoint, not the project endpoint or Azure OpenAI endpoint!" — tres tipos de endpoint distintos del mismo ecosistema Foundry, cada uno para un servicio diferente.

---

### Q1844
**¿Cuáles son las tres pautas de restricción de contenido que aplica Content Understanding, según el módulo?**

A) Solo bloquea contenido con derechos de autor, sin ninguna otra restricción
B) Filtra material dañino (violencia, odio, explotación); puede identificar atributos faciales en contenido de video/imagen mediante funcionalidades de descripción de caras; y el procesamiento de datos biométricos requiere aviso adecuado y consentimiento de los interesados ✅
C) No existe ninguna restricción de contenido; Content Understanding procesa cualquier imagen sin filtros
D) Las restricciones solo aplican a documentos de texto, nunca a imágenes o video

**Explicación:** El módulo enumera estas protecciones de IA responsable integradas: filtrado de contenido dañino (vía Azure AI Content Safety integrado), capacidades de descripción facial con las implicaciones de privacidad que conlleva, y el requisito explícito de consentimiento informado cuando se procesan datos biométricos — no es un servicio sin salvaguardas.

---

### Q1845
**¿Cuáles son las cuatro sugerencias del módulo para mejorar la precisión del análisis de imágenes?**

A) Usar siempre la resolución más baja posible, para procesar más rápido
B) Calidad de imagen alta (mayor resolución = más precisión), buena iluminación y contraste, un enfoque único por imagen (sujeto claro, no escenas desordenadas), y orientación coherente (vertical, no girada) ✅
C) Convertir siempre la imagen a escala de grises antes de analizarla
D) Analizar únicamente imágenes cuadradas; cualquier otra proporción reduce la precisión

**Explicación:** Estas cuatro recomendaciones prácticas del módulo apuntan directamente a la calidad de la señal de entrada: mayor resolución produce extracciones más precisas, buena iluminación asegura que texto y elementos visuales sean legibles, un sujeto claro (vs. escena desordenada) facilita el análisis, y la orientación coherente evita errores de procesamiento en imágenes giradas.

---

### Q1846
**¿Cuáles son los cuatro casos de uso empresariales de Content Understanding que menciona el módulo?**

A) Procesamiento inteligente de documentos (facturas, contratos), Buscar y RAG (ingestión multimodal en índices de búsqueda), Aplicaciones agénticas (estandarizar entradas desordenadas para agentes de IA), y Análisis e informes (extraer datos para decisiones fundamentadas) ✅
B) Solo sirve para generar imágenes nuevas a partir de descripciones de texto
C) Exclusivamente para transcripción de audio a texto, sin relación con imágenes o documentos
D) Únicamente para entrenar modelos de machine learning desde cero

**Explicación:** Estos cuatro casos de uso cubren escenarios empresariales distintos: convertir documentos no estructurados en datos accionables, alimentar índices de búsqueda/RAG con contenido multimodal ya descrito, transformar entradas de archivo desordenadas en formato predecible para que las consuman agentes de IA, y extraer campos para análisis e informes de negocio.

---

### Q1847
**Este código procesa los resultados de un análisis de Content Understanding:
```python
for field in result.contents[0].fields:
    if field == "Description":
        print(f"{field}:\n{result.contents[0].fields[field].value_string}\n")
    elif field == "Tags":
        print(f"{field}:")
        for tag in result.contents[0].fields[field].value_array:
            print(" -", tag.value_string)
```
¿Qué revela este código sobre cómo se representan los distintos tipos de valores de campo en el resultado?**

A) Todos los campos, sin importar su tipo, se acceden siempre con `.value_string`
B) Un campo de texto simple (como `Description`) se accede con `.value_string`, mientras que un campo de lista (como `Tags`, definido con "List of Strings") se accede con `.value_array` y requiere iterar sobre cada elemento para obtener su propio `.value_string` ✅
C) `Tags` siempre devuelve un único string separado por comas, nunca una lista real
D) El tipo de dato del campo se determina en tiempo de ejecución sin relación con el esquema definido

**Explicación:** El esquema de campo definido al crear el analizador (tipo `String` para `Description`, "List of Strings" para `Tags`) determina la forma del valor en el resultado: un campo de texto simple expone `.value_string` directamente, mientras que un campo de lista expone `.value_array`, una colección donde cada elemento individual tiene a su vez su propio `.value_string`.

---

### Q1848
**¿Qué tipo de "tipo de analizador base" se debe configurar al crear un analizador personalizado, según el módulo?**

A) Solo existe un tipo de analizador base universal para cualquier tipo de contenido
B) El tipo de analizador base corresponde al tipo de contenido a procesar: documento, imagen, audio o vídeo ✅
C) El tipo de analizador base se determina automáticamente según el tamaño del archivo subido
D) El tipo de analizador base define únicamente el idioma del contenido, nunca su formato

**Explicación:** Al crear un analizador personalizado, una de las configuraciones fundamentales es elegir el tipo de analizador base según la naturaleza del contenido de origen (documento, imagen, audio o vídeo) — esto determina qué modelos de IA y capacidades de procesamiento subyacentes se aplican antes de definir el esquema de campos específico.

---

### Q1849
**Un candidato de examen que domina Document Intelligence (Domain 5) asume que Content Understanding es simplemente "lo mismo pero para imágenes". ¿Qué distingue realmente a Content Understanding de Document Intelligence según ambos módulos?**

A) No hay ninguna diferencia real; ambos servicios son intercambiables en cualquier escenario
B) Document Intelligence extrae campos tipados y estructurados de documentos (con modelos prebuilt/layout/custom específicos de documentos); Content Understanding es más amplio — procesa documentos, imágenes, video Y audio con analizadores configurables (extract/classify/generate) y produce tanto campos como una representación Markdown enriquecida pensada para RAG ✅
C) Content Understanding solo puede procesar audio, nunca imágenes ni documentos
D) Document Intelligence es la versión más nueva que reemplaza por completo a Content Understanding

**Explicación:** Ambos servicios extraen información estructurada, pero difieren en alcance y salida: Document Intelligence está especializado en documentos con modelos prebuilt/layout/custom orientados a campos tipados. Content Understanding es multimodal (documentos, imágenes, video, audio), con analizadores configurables mediante tres métodos de extracción (`extract`/`classify`/`generate`) y una salida que incluye tanto campos estructurados como una representación Markdown enriquecida — más cercana en propósito a lo que Content Understanding en el contexto de RAG (visto en Domain 5) ya hacía para bases de conocimiento de Foundry IQ.

---

### Q1850
**¿Por qué se describe Azure Content Understanding como un servicio que permite un "proceso de desarrollo sencillo y coherente para crear soluciones de análisis de contenido multiplataforma"?**

A) Porque solo puede analizar un tipo de contenido (imágenes), simplificando el alcance del servicio
B) Porque, sin él, las organizaciones a menudo necesitan crear soluciones basadas en varias tecnologías distintas según el formato (documentos, imágenes, audio, video); Content Understanding permite usar un único servicio con un flujo de trabajo consistente para todos esos formatos ✅
C) Porque elimina por completo la necesidad de definir un esquema, sin importar el tipo de contenido
D) Porque solo funciona dentro de Visual Studio Code, sin necesidad de ningún recurso de Azure

**Explicación:** El módulo señala explícitamente que extraer información de contenido no estructurado "puede ser difícil, laborioso y lento", y que las organizaciones normalmente necesitan varias tecnologías distintas según el formato. Content Understanding resuelve esto ofreciendo un servicio unificado con el mismo proceso de desarrollo (definir esquema → compilar analizador → usar analizador) sin importar si el contenido es un documento, una imagen, audio o video.

---

### Q1851
**¿Cuáles son las tres formas de desarrollar y gestionar una solución de Content Understanding, según el módulo?**

A) Solo mediante la API REST; no existe interfaz visual ni SDK
B) En el portal de Microsoft Foundry, en Content Understanding Studio, o mediante la API de Content Understanding ✅
C) Únicamente mediante Azure Machine Learning Studio
D) Solo mediante Visual Studio Code con una extensión oficial de Microsoft

**Explicación:** El módulo presenta estas tres rutas complementarias: el portal de Microsoft Foundry (para algunos modelos precompilados), Content Understanding Studio (interfaz visual dedicada para crear y probar analizadores personalizados), y la API de Content Understanding (para desarrollo programático completo).

---

### Q1852
**¿Cuáles son los cuatro tipos de contenido que Content Understanding puede analizar, con un ejemplo de cada uno según el módulo?**

A) Solo texto e imágenes; audio y video no son compatibles
B) Documentos y formularios (extraer valores de campo de una factura), Imágenes (identificar defectos en productos, detectar objetos), Sonido (resumir llamadas de conferencia, determinar opinión de clientes), y Vídeo (extraer puntos clave de videoconferencias, detectar actividad en material de seguridad) ✅
C) Solo código fuente y bases de datos estructuradas
D) Exclusivamente contenido generado por otros modelos de IA, nunca contenido humano original

**Explicación:** Estos son los cuatro tipos de contenido multimodal que el módulo describe con ejemplos concretos de aplicación empresarial para cada uno — la amplitud de formatos es precisamente lo que distingue a Content Understanding de un servicio especializado en un solo tipo de contenido.

---

### Q1853
**Este es el patrón de solicitud REST para analizar contenido:
```json
POST {endpoint}/contentunderstanding/analyzers/{analyzer}:analyze?api-version=2025-11-01
{
  "inputs": [
    { "url": "https://host.com/doc.pdf" }
  ]
}
```
```
Operation-Id: 1234abcd-1234-abcd-1234-abcd1234abcd
Operation-Location: {endpoint}/contentunderstanding/analyzerResults/1234abcd...
{
  "id": "1234abcd-1234-abcd-1234-abcd1234abcd",
  "status": "NotStarted"
}
```
¿Qué revela la respuesta inicial de este `POST` sobre la naturaleza de la operación de análisis?**

A) El análisis ya terminó y la respuesta contiene los resultados finales directamente
B) Es una operación asincrónica: el `POST` inicial solo confirma que la tarea fue aceptada (`status: "NotStarted"`) y devuelve un identificador de operación; la aplicación cliente debe hacer solicitudes `GET` adicionales al `Operation-Location` para sondear el estado hasta que se complete ✅
C) El `status: "NotStarted"` indica que la solicitud falló y debe reenviarse
D) `Operation-Id` y `Operation-Location` son campos redundantes que contienen exactamente el mismo valor

**Explicación:** El patrón asincrónico es explícito en la respuesta: en vez de bloquear hasta tener el resultado, el servicio devuelve inmediatamente un identificador de operación (`Operation-Id`) y una URL de callback (`Operation-Location`) que el cliente debe consultar repetidamente (`GET`) hasta que el estado deje de ser `"NotStarted"`/`"Running"`.

---

### Q1854
**¿Qué diferencia hay entre especificar el contenido a analizar mediante una `url` en el cuerpo JSON, frente a usar la operación `analyzeBinary`?**

A) Son exactamente equivalentes; `analyzeBinary` es simplemente un alias más corto de la misma operación
B) `url` se usa cuando el archivo de contenido está hospedado en una ubicación accesible por internet; `analyzeBinary` se usa para enviar los datos del archivo binario directamente en la solicitud, sin necesidad de una URL pública ✅
C) `analyzeBinary` solo funciona con archivos de audio; `url` solo funciona con documentos
D) `url` requiere autenticación adicional que `analyzeBinary` no necesita

**Explicación:** El módulo distingue explícitamente estas dos formas de enviar contenido: si el archivo ya está accesible en una URL pública, se referencia directamente; si el archivo es local y no tiene URL pública (como en el ejercicio, que sube imágenes de tarjetas de presentación), se usa `analyzeBinary` para transmitir los bytes del archivo directamente en la solicitud.

---

### Q1855
**¿Cuáles son los cuatro pasos del proceso general para crear una solución de Content Understanding, en orden?**

A) Entrenar el modelo → Validar → Desplegar → Monitorear
B) Crear un recurso Foundry → Definir un esquema para la información a extraer → Compilar un analizador basado en el esquema → Usar el analizador para extraer o generar campos de contenido nuevo ✅
C) Escribir el código cliente → Desplegar en producción → Definir el esquema → Probar
D) Solo existen dos pasos: subir el archivo y leer el resultado; no hay configuración previa

**Explicación:** Este es el flujo general descrito por el módulo: primero se necesita la infraestructura (recurso Foundry), luego se define QUÉ información se quiere extraer (esquema), después se entrena/compila el analizador basado en ese esquema, y finalmente ese analizador reutilizable se usa contra contenido nuevo.

---

### Q1856
**¿Cuándo es suficiente usar analizadores precompilados directamente en el portal de Microsoft Foundry, y cuándo se necesita Content Understanding Studio en su lugar, según la sugerencia del módulo?**

A) El portal de Foundry siempre es suficiente; Content Understanding Studio es una herramienta obsoleta
B) Solo algunos modelos precompilados están disponibles directamente en el portal de Foundry; para crear y probar analizadores PERSONALIZADOS (con esquema propio), se necesita Content Understanding Studio ✅
C) Content Understanding Studio solo sirve para eliminar analizadores, nunca para crearlos
D) Ambas herramientas son completamente redundantes entre sí, sin ninguna diferencia funcional

**Explicación:** El portal de Foundry expone directamente ciertos analizadores ya precompilados (como servicios de IA listos para usar), pero cuando se necesita definir un esquema de campos propio para un caso de uso específico, hay que recurrir a Content Understanding Studio, la interfaz dedicada para ese flujo de trabajo.

---

### Q1857
**¿Qué recursos de Azure adicionales aprovisiona la creación de un proyecto en Content Understanding Studio, más allá del recurso Foundry mismo?**

A) Ninguno; un proyecto de Content Understanding Studio no requiere ningún recurso adicional
B) Almacenamiento (Storage) y un recurso de Key Vault, para guardar detalles sensibles como credenciales y claves ✅
C) Un clúster completo de Azure Kubernetes Service (AKS)
D) Una base de datos SQL Server dedicada exclusivamente al proyecto

**Explicación:** El módulo señala que crear un proyecto en Content Understanding Studio aprovisiona automáticamente los recursos de Azure necesarios para respaldar la solución: almacenamiento (para los archivos de contenido y esquemas) y un recurso Key Vault (para gestionar credenciales y claves sensibles de forma segura).

---

### Q1858
**Al definir un esquema en Content Understanding Studio a partir de un archivo de ejemplo, ¿qué dos enfoques describe el módulo para poblar los campos del esquema?**

A) Solo existe un enfoque: escribir manualmente cada campo sin ninguna asistencia automática
B) El servicio puede identificar automáticamente valores de datos en el contenido de ejemplo y asignarlos a los elementos del esquema (con datos de entrenamiento mínimos, gracias a la IA generativa), o el usuario puede etiquetar explícitamente campos en el contenido para mejorar el rendimiento del analizador ✅
C) Los campos del esquema solo pueden generarse ejecutando un script de Python externo, nunca desde la interfaz
D) El esquema se genera exclusivamente a partir de un archivo CSV subido por separado

**Explicación:** El módulo destaca esto como una ventaja de las capacidades de IA generativa de Content Understanding: en muchos casos, el servicio infiere automáticamente qué valores del contenido de ejemplo corresponden a qué campos, sin necesidad de mucho entrenamiento manual — aunque etiquetar explícitamente sigue siendo una opción para mejorar la precisión.

---

### Q1859
**Un desarrollador prueba el analizador `Layout` precompilado sobre una factura y luego prueba el analizador `Read` sobre el mismo archivo. ¿Qué diferencia observará entre ambos resultados, y qué tienen en común?**

A) `Layout` extrae únicamente texto plano sin estructura; `Read` extrae tablas y figuras además del texto
B) `Read` extrae elementos de texto (palabras, párrafos, fórmulas, códigos de barras); `Layout` extrae además tablas, figuras, estructura del documento, hipervínculos y anotaciones; ninguno de los dos extrae campos personalizados específicos (como montos de factura o nombres de proveedor) — para eso se necesita un analizador personalizado ✅
C) Ambos analizadores requieren obligatoriamente un modelo de IA generativa para funcionar
D) `Read` y `Layout` son exactamente el mismo analizador con dos nombres distintos en el portal

**Explicación:** El ejercicio del módulo señala esto explícitamente: los analizadores precompilados `Read` y `Layout` extraen contenido SIN requerir un modelo de IA generativa (procesamiento estructural/OCR), y `Layout` es un superconjunto de `Read` (añade tablas, figuras, estructura, hipervínculos, anotaciones) — pero ninguno de los dos identifica campos de negocio específicos como "monto total" o "nombre del proveedor"; eso exige definir un esquema personalizado.

---

### Q1860
**Este es un esquema de analizador de tarjeta de presentación usado para crearlo vía SDK:
```python
analyzer_definition = {
    "description": "Simple business card",
    "baseAnalyzerId": "prebuilt-document",
    "config": {"returnDetails": True},
    "fieldSchema": {
        "fields": {
            "ContactName": {"type": "string", "method": "extract", "description": "Name on business card"},
            "EmailAddress": {"type": "string", "method": "extract", "description": "Email address on business card"}
        }
    },
    "models": {
        "completion": "gpt-4.1",
        "embedding": "text-embedding-3-large"
    }
}
```
¿Qué propósito cumple específicamente la clave `"models"` en esta definición?**

A) Define qué versión del SDK de Python se debe usar para ejecutar el análisis
B) Especifica los modelos generativos concretos (de completions y de embeddings) que el analizador usará internamente para su procesamiento ✅
C) Determina el precio por análisis que se cobrará al proyecto de Foundry
D) Es un campo decorativo sin ningún efecto en el comportamiento del analizador

**Explicación:** Mientras que `fieldSchema` define QUÉ información extraer, la clave `models` define CON QUÉ modelos de IA generativa el analizador realiza ese procesamiento — en este caso, un modelo de completions (`gpt-4.1`) y uno de embeddings (`text-embedding-3-large`), coherente con el requisito del módulo de tener desplegados GPT-4.1, GPT-4.1-mini y text-embedding-3-large antes de poder usar Content Understanding.

---

### Q1861
**Este código crea un analizador con el SDK de Python:
```python
client = ContentUnderstandingClient(endpoint=endpoint, credential=credential)
analyzer_name = "business_card_analyser"
poller = client.begin_create_analyzer(analyzer_name, body=analyzer_definition)
result = poller.result()
print(f"Analyzer created: {result.analyzer_id}")
```
¿Qué patrón de diseño de SDK ilustra el prefijo `begin_` en `begin_create_analyzer`, igual que se vio antes con `begin_analyze`?**

A) Indica que el método es experimental y puede eliminarse en versiones futuras
B) Es la convención de los SDK de Azure para operaciones de larga duración: `begin_create_analyzer` inicia la creación del analizador (un proceso que toma tiempo) y devuelve un objeto `poller` de inmediato; `.result()` espera hasta que la creación termine ✅
C) `begin_` indica que el método solo puede llamarse una vez por sesión de cliente
D) Es simplemente una convención de nomenclatura sin relación con cómo se ejecuta la operación

**Explicación:** Igual que analizar contenido, CREAR un analizador tampoco es instantáneo (implica configurar el esquema y los modelos subyacentes), así que el SDK sigue el mismo patrón de operación de larga duración: `begin_create_analyzer` regresa control inmediatamente con un `poller`, y `.result()` bloquea hasta la finalización real.

---

### Q1862
**¿Cómo se crea un analizador usando la API REST directamente (en vez del SDK de Python), según el módulo?**

A) Mediante una solicitud `DELETE` al mismo endpoint usado para analizar contenido
B) Mediante una solicitud `PUT` al endpoint del analizador con la definición JSON del esquema en el cuerpo y la clave de API en el encabezado; la respuesta incluye un `Operation-Location` para sondear el estado de la creación ✅
C) No es posible crear analizadores vía API REST; solo el SDK de Python lo permite
D) Mediante una solicitud `GET` que incluye el esquema como parámetros de query string

**Explicación:** El patrón vía REST es simétrico al de análisis de contenido: una solicitud `PUT` (no `POST` como en analizar, ya que se está "poniendo"/definiendo un recurso con nombre específico) envía la definición del esquema, y la respuesta trae un `Operation-Location` que el cliente debe sondear con `GET` hasta que la creación del analizador se complete.

---

### Q1863
**TRAMPA: Un desarrollador que ya escribió su propio bucle de sondeo manual para la API REST (`while status == "Running": ...`) asume que necesita escribir la misma lógica al usar el SDK de Python. ¿Por qué esta suposición es innecesaria?**

A) Es correcta; el SDK de Python también requiere un bucle de sondeo manual idéntico al de REST
B) El SDK maneja el sondeo automáticamente a través del patrón `LROPoller`: llamar a `.result()` sobre el objeto devuelto por `begin_analyze`/`begin_create_analyzer` espera internamente hasta que la operación termine, sin que el desarrollador escriba su propio bucle ✅
C) El SDK nunca requiere esperar; siempre devuelve el resultado de forma instantánea
D) El sondeo manual solo es necesario si se usa `analyzeBinary` en vez de `analyze`

**Explicación:** El módulo lo aclara explícitamente en una nota: "El SDK maneja el sondeo automáticamente a través del patrón LROPoller — ¡no se necesita sondeo manual!" — esta es precisamente la ventaja de usar el SDK sobre la API REST directa, que sí exige implementar el bucle `while` de sondeo a mano.

---

### Q1864
**Comparando el acceso a campos extraídos vía SDK (`field_data.type`, `field_data.value`) frente a la respuesta JSON cruda de la API REST (`field_data['type']`, `field_data['valueString']`), ¿qué patrón general ilustra esta diferencia?**

A) El SDK y la API REST devuelven exactamente el mismo formato de datos, sin ninguna diferencia de acceso
B) El SDK ofrece acceso tipado y unificado a través de objetos Python (`.value` funciona para cualquier tipo); la API REST cruda expone el JSON tal cual, donde cada tipo de dato usa una clave distinta según su tipo (`valueString`, y análogamente otras para números, fechas, etc.) que hay que conocer de antemano ✅
C) La API REST siempre es más rápida que el SDK porque omite el paso de deserialización
D) El SDK solo puede leer campos de tipo `string`; para otros tipos es obligatorio usar la API REST

**Explicación:** Esta es una diferencia estructural real entre usar un SDK (que abstrae el tipo de dato detrás de una interfaz uniforme como `.value`) y consumir la API REST directamente (donde el nombre exacto de la clave JSON depende del tipo específico del campo, como `valueString` para texto) — el SDK reduce la carga de conocer el esquema de respuesta exacto de la API.

---

### Q1865
**En la respuesta JSON completa de un análisis de tarjeta de presentación, cada campo extraído incluye `confidence`, `source` y `spans`. ¿Qué representa cada uno?**

A) Los tres campos son sinónimos y contienen exactamente el mismo valor numérico
B) `confidence` es la puntuación de confiabilidad del valor extraído (0 a 1); `source` es la información de anclaje que indica dónde se encontró el valor en el documento (coordenadas); `spans` indica el offset y la longitud del texto dentro del contenido extraído ✅
C) `confidence` indica el tiempo en milisegundos que tardó la extracción; `source` es el nombre del analizador; `spans` es el número de páginas del documento
D) Estos tres campos solo aparecen cuando el análisis falla, nunca en un análisis exitoso

**Explicación:** Estos tres metadatos acompañan cada valor de campo extraído para dar contexto de calidad y trazabilidad: `confidence` cuantifica qué tan seguro está el modelo del valor, `source` (anclaje/"tierra", visto antes) ubica espacialmente de dónde salió el valor, y `spans` (`offset`/`length`) ubica textualmente esa misma información dentro del contenido extraído.

---

### Q1866
**Según la evaluación oficial del módulo de la app cliente, ¿qué dos valores de configuración se necesitan para usar la API de Azure Content Understanding?**

A) El nombre del grupo de recursos donde se implementa el servicio de Azure
B) El punto de conexión y la clave del recurso de Foundry ✅
C) El identificador de suscripción de Azure y el identificador de inquilino
D) Solo se necesita el nombre del analizador; ningún otro dato de configuración

**Explicación:** Esta es la respuesta correcta de la evaluación oficial: para conectarse a la API desde una aplicación cliente, se necesitan específicamente el endpoint y la clave de API del recurso Foundry — no el nombre del resource group ni los identificadores de suscripción/inquilino, que son datos de gestión de Azure, no de autenticación directa a la API.

---

### Q1867
**Según la evaluación oficial del módulo, ¿qué se debe especificar al llamar al método de análisis (`analyze`) para extraer campos del contenido?**

A) El nombre del recurso de Foundry
B) El nombre del analizador ✅
C) El `Operation-Location` que se devolvió cuando se creó el analizador
D) No es necesario especificar nada adicional más allá del archivo de contenido

**Explicación:** El `analyzer_id`/nombre del analizador es el dato clave que le dice al servicio QUÉ esquema y configuración aplicar al contenido enviado — el `Operation-Location` de la creación del analizador es un artefacto de esa operación anterior (crear el analizador), no algo que se reutiliza al invocar un análisis posterior.

---

### Q1868
**Según la evaluación oficial del módulo, ¿cómo se devuelven los campos extraídos en el resultado de un análisis?**

A) Como una lista de cadenas de texto genéricas, sin tipado
B) Como valores específicos del tipo (type-specific values) ✅
C) Como una sola masa de texto sin ninguna estructura
D) Siempre como un archivo PDF adjunto en la respuesta

**Explicación:** Esto refleja directamente la estructura vista en el JSON de respuesta y en el código del SDK: cada campo lleva asociado su propio `type` (string, number, etc.) y el valor correspondiente a ese tipo específico (`valueString` para texto, por ejemplo) — no es una lista plana de texto sin tipar.

---

### Q1869
**Este es el código real del ejercicio para crear un analizador, tomado directamente del archivo `create-analyzer.py`:
```python
poller = client.begin_create_analyzer(
    analyzer_id=analyzer,
    resource=analyzer_definition,
    allow_replace=True
)
result = poller.result()
```
¿Qué logra específicamente el parámetro `allow_replace=True`?**

A) Permite que el analizador se elimine automáticamente después de su primer uso
B) Permite que la operación reemplace (sobrescriba) un analizador existente que ya tenga el mismo `analyzer_id`, en vez de fallar con un error de nombre duplicado ✅
C) Hace que el analizador reemplace automáticamente al analizador `prebuilt-document` en todo el proyecto
D) Convierte el analizador de personalizado a precompilado

**Explicación:** Durante el desarrollo iterativo (como en el ejercicio, donde se puede volver a ejecutar `create-analyzer.py` varias veces mientras se ajusta el esquema), `allow_replace=True` evita que la operación falle simplemente porque ya existe un analizador con ese mismo nombre — permite iterar sin tener que eliminar manualmente la versión anterior primero.

---

### Q1870
**Este es el código real del ejercicio para analizar una imagen local:
```python
with open(image_file, "rb") as file:
    image_data = file.read()

poller = client.begin_analyze_binary(
    analyzer_id=analyzer,
    binary_input=image_data
)
result = poller.result()
```
¿Por qué se usa `begin_analyze_binary` en vez de `begin_analyze` con un parámetro `url` en este ejercicio específico?**

A) Porque `begin_analyze_binary` es la única función que existe; `begin_analyze` con `url` no es un método real del SDK
B) Porque la imagen de la tarjeta de presentación es un archivo LOCAL en el equipo del desarrollador, sin una URL pública accesible por internet — `begin_analyze_binary` permite enviar los bytes del archivo directamente, sin necesidad de hospedarlo primero en algún lugar ✅
C) Porque `begin_analyze_binary` es más rápido que `begin_analyze` en todos los casos, sin importar el origen del archivo
D) Porque el analizador `business_card_analyser` solo admite entrada binaria por diseño, nunca URLs

**Explicación:** Esta elección de método refleja directamente el origen del contenido: cuando el archivo ya está en una URL pública (como en los ejemplos anteriores con `https://host.com/...`), se usa `begin_analyze`/`AnalysisInput(url=...)`; cuando el archivo es local (como las imágenes de tarjetas de presentación descargadas del repositorio del ejercicio), se leen sus bytes y se envían directamente con `begin_analyze_binary`.

---

### Q1871
**Después de analizar una imagen con `begin_analyze_binary(...)` y guardar el resultado completo en un archivo `results.json` con `json.dump(dict(result), ...)`, ¿qué utilidad práctica tiene ese archivo, según el flujo del ejercicio?**

A) Ninguna; el archivo `results.json` es un artefacto temporal que se elimina automáticamente
B) Permite inspeccionar la respuesta JSON completa y cruda del analizador (todos los campos, confianzas, anclajes, spans) fuera del flujo del programa, útil para depurar el esquema o verificar exactamente qué datos devolvió el análisis ✅
C) `results.json` reemplaza automáticamente la necesidad de tener un archivo `.env` de configuración
D) Es el archivo que se debe subir de vuelta al analizador para "confirmar" el resultado

**Explicación:** Guardar el resultado completo en disco (en vez de solo imprimir los campos extraídos) le da al desarrollador acceso a la respuesta íntegra del análisis — incluyendo metadatos como confianza y anclaje que no se imprimen en el bucle simple de la consola — útil precisamente para depurar o entender a fondo la salida del analizador durante el desarrollo.

---

### Q1872
**Un candidato de examen que completó primero el módulo de "solución de análisis multimodal" (Content Understanding Studio) asume que el módulo de "aplicación cliente" (API/SDK) es solo una repetición del mismo contenido. ¿Cuál es la relación real entre ambos módulos, según la sugerencia explícita del primero?**

A) Son completamente independientes y no existe ninguna relación entre ellos
B) Son complementarios: el primer módulo (Content Understanding Studio) enseña a crear analizadores mediante la interfaz visual; el segundo módulo, explícitamente sugerido como continuación, enseña a hacer lo mismo (y consumir los analizadores) programáticamente mediante el SDK de Python o la API REST ✅
C) El segundo módulo reemplaza por completo el contenido del primero; el primero queda obsoleto
D) El segundo módulo solo cubre generación de video, sin relación con Content Understanding

**Explicación:** El módulo de la aplicación cliente lo señala explícitamente en su introducción: "Para obtener información sobre cómo crear analizadores de Azure Content Understanding, complete el módulo Creación de una solución de análisis multimodal con Azure Content Understanding" — son dos módulos secuenciales que cubren el mismo servicio desde dos ángulos: la interfaz visual (Studio) y el desarrollo programático (SDK/REST).

---

### Q1873
**Según la evaluación oficial del módulo de la solución multimodal, ¿para qué tipo de soluciones de IA está diseñada Azure Content Understanding, y qué NO es?**

A) Está diseñada para bots de chat que traducen automáticamente entre idiomas — NO es un servicio de análisis de contenido
B) Está diseñada para crear analizadores que extraen información de documentos, imágenes, vídeos y archivos de audio — NO es un traductor de chat ni un generador de imágenes a partir de descripciones ✅
C) Está diseñada exclusivamente para generar visualizaciones a partir de descripciones de texto
D) No tiene un propósito específico definido; es una herramienta genérica sin caso de uso claro

**Explicación:** Esta es la respuesta correcta de la evaluación oficial, y distingue claramente a Content Understanding de otros servicios de IA de Foundry con los que podría confundirse: no traduce (eso sería un servicio de lenguaje) y no genera imágenes nuevas (eso sería `images.generate`, visto antes en este mismo domain) — su propósito específico es analizar y extraer información de contenido existente en múltiples formatos.

---
