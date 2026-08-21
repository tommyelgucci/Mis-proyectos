# BANCO DE PREGUNTAS AI-103 — PARTE 22 (Q1750-Q1789)
## Domain 5: Information Extraction — Document Intelligence, Content Understanding y Azure AI Search
### Generado: 2026-08-21 | Fuente: guía "Domain 1 y Domain 5 en profundidad" + módulos MS Learn "Extracción de datos con Azure Document Intelligence" y "Creación de una solución de minería de conocimiento con Azure AI Search"

---

### Q1750
**¿Cuál es la distinción #1 del examen entre Document Intelligence y Content Understanding?**

A) Son dos nombres distintos para exactamente el mismo servicio
B) Document Intelligence extrae campos ESPECÍFICOS y ESTRUCTURADOS (fecha, monto, nombre, tabla); Content Understanding genera representaciones limpias y ENRIQUECIDAS del contenido, optimizadas para consumo por agentes y pipelines RAG ✅
C) Document Intelligence solo funciona con imágenes; Content Understanding solo funciona con PDFs nativos
D) Content Understanding es la versión gratuita de Document Intelligence

**Explicación:** Document Intelligence usa modelos prebuilt/custom para extraer campos tipados con su ubicación (bounding box) — ideal para sistemas downstream como un ERP. Content Understanding usa "analyzers" que combinan OCR y comprensión semántica multimodal para producir Markdown/JSON limpio, pensado para "grounding" de agentes, no para campos aislados.

---

### Q1751
**Un documento PDF de 40 páginas con texto, tablas y gráficas debe convertirse en contexto legible para un agente de RAG. ¿Qué servicio es el apropiado, y por qué?**

A) Document Intelligence, porque puede procesar cualquier tipo de documento sin importar el objetivo final
B) Content Understanding, porque el objetivo es una representación limpia y "groundable" para el agente, no la extracción de campos específicos tipados ✅
C) Ninguno de los dos; los agentes de RAG no pueden consumir PDFs con gráficas
D) Document Intelligence con el modelo `prebuilt-invoice`, ya que es el modelo más completo

**Explicación:** Esta es la pregunta clásica del examen sobre esta distinción: cuando el objetivo es alimentar contenido complejo (con gráficas, tablas, diagramas) como contexto legible a un agente o pipeline RAG, el servicio correcto es Content Understanding — no Document Intelligence, que está diseñado para campos estructurados, no para narrativa enriquecida.

---

### Q1752
**Se necesita extraer automáticamente el monto total y la fecha de vencimiento de miles de facturas para cargarlas a un sistema ERP. ¿Qué servicio es el apropiado, y por qué?**

A) Content Understanding, porque siempre es la opción más moderna
B) Document Intelligence, porque el objetivo es extracción estructurada de campos específicos y tipados para un sistema downstream ✅
C) Azure AI Search, ya que un ERP siempre requiere indexación previa
D) Ninguno; extraer campos de facturas requiere siempre un modelo custom entrenado desde cero

**Explicación:** Este caso es el opuesto conceptual del anterior: cuando el objetivo es obtener datos precisos y tipados (monto, fecha) para alimentar un sistema downstream como un ERP, el servicio correcto es Document Intelligence — en este caso además con un modelo prebuilt (`prebuilt-invoice`), ya entrenado por Microsoft para este tipo de documento común.

---

### Q1753
**¿Cuáles son los tres tipos de modelo de Document Intelligence, y cuándo se usa cada uno?**

A) Rápido, Estándar y Premium, diferenciados solo por velocidad de procesamiento
B) Prebuilt (ya entrenados por Microsoft para documentos comunes como facturas o recibos), Layout (extrae texto/tablas/estructura sin campos predefinidos), y Custom (entrenado por el usuario con sus propios documentos y campos) ✅
C) Texto, Imagen y Video, según el tipo de archivo de entrada
D) Solo existe un tipo de modelo; la distinción Prebuilt/Layout/Custom no aplica a Document Intelligence

**Explicación:** Prebuilt cubre documentos comunes ya entrenados por Microsoft (facturas, recibos, identificaciones, W-2, contratos). Layout extrae texto, tablas y estructura general sin campos predefinidos específicos. Custom se entrena con documentos y campos propios del negocio cuando ningún modelo prebuilt encaja.

---

### Q1754
**Este código usa un modelo prebuilt de Document Intelligence:
```python
with open("factura.pdf", "rb") as f:
    poller = client.begin_analyze_document(
        model_id="prebuilt-invoice",
        body=f
    )

resultado = poller.result()

for documento in resultado.documents:
    monto_total = documento.fields.get("InvoiceTotal")
    fecha_vencimiento = documento.fields.get("DueDate")
    print(f"Total: {monto_total.value_currency.amount}")
    print(f"Vence: {fecha_vencimiento.value_date}")
```
¿Qué patrón revela `documento.fields.get("InvoiceTotal")` sobre cómo Document Intelligence expone los datos extraídos?**

A) Devuelve texto plano sin ninguna estructura ni tipo de dato asociado
B) Los campos extraídos se acceden por nombre (`"InvoiceTotal"`, `"DueDate"`) y vienen tipados (p. ej. `.value_currency.amount`, `.value_date`), no como texto libre sin procesar ✅
C) Cada llamada a `.fields.get()` dispara una nueva solicitud de análisis al servicio
D) `documento.fields` solo existe cuando se usa el modelo `prebuilt-layout`, nunca con `prebuilt-invoice`

**Explicación:** Este es precisamente el valor de un modelo prebuilt: los campos relevantes de una factura ya vienen identificados por nombre y tipados según su naturaleza (moneda, fecha), listos para usarse directamente en código downstream, sin necesidad de parsear texto libre.

---

### Q1755
**Este código usa el modelo Layout:
```python
with open("contrato.pdf", "rb") as f:
    poller = client.begin_analyze_document(
        model_id="prebuilt-layout",
        body=f
    )

resultado = poller.result()

print(resultado.content)

for tabla in resultado.tables:
    print(f"Tabla con {tabla.row_count} filas x {tabla.column_count} columnas")
    for celda in tabla.cells:
        print(f"  [{celda.row_index},{celda.column_index}]: {celda.content}")
```
¿En qué se diferencia fundamentalmente este resultado del obtenido con `prebuilt-invoice`?**

A) Son idénticos; ambos devuelven exactamente los mismos campos con los mismos nombres
B) `prebuilt-layout` devuelve texto y tablas genéricas (`resultado.content`, `resultado.tables`) sin campos de negocio predefinidos; `prebuilt-invoice` devuelve campos específicos ya identificados semánticamente (`InvoiceTotal`, `DueDate`) ✅
C) `prebuilt-layout` solo puede procesar imágenes, nunca archivos PDF
D) `prebuilt-invoice` no puede extraer tablas, solo `prebuilt-layout` puede hacerlo

**Explicación:** Layout es un modelo genérico de extracción estructural (texto + tablas + posición), sin conocimiento semántico de qué representa cada dato — útil para cualquier documento cuando no existe un modelo prebuilt específico. Invoice, en cambio, ya "sabe" qué es un monto total o una fecha de vencimiento porque fue entrenado específicamente para facturas.

---

### Q1756
**Este código entrena un modelo Custom:
```python
poller = client.begin_build_document_model(
    BuildDocumentModelRequest(
        model_id="ordenes-compra-empresa",
        build_mode=DocumentBuildMode.TEMPLATE,
        azure_blob_source={
            "container_url": "https://milmacenamiento.blob.core.windows.net/training-docs"
        }
    )
)
```
¿Cuándo es más apropiado `TEMPLATE` frente a `NEURAL` como `build_mode`?**

A) `TEMPLATE` para documentos con variaciones de layout entre muestras; `NEURAL` para documentos con estructura fija
B) `TEMPLATE` para documentos con estructura fija y consistente (mismo formato siempre); `NEURAL` para documentos con variaciones de layout entre muestras (varios proveedores, formatos distintos) ✅
C) Ambos modos producen exactamente el mismo resultado; la elección es solo cosmética
D) `TEMPLATE` y `NEURAL` determinan el idioma del documento, no su estructura

**Explicación:** `TEMPLATE` funciona mejor cuando todos los documentos de entrenamiento comparten el mismo formato exacto (p. ej. siempre la misma plantilla de orden de compra interna). `NEURAL` es más robusto cuando el layout varía entre muestras (p. ej. facturas de proveedores distintos con formatos diferentes entre sí).

---

### Q1757
**¿Qué es un "Analyzer" de Content Understanding, y qué combina en su procesamiento?**

A) Un simple visor de PDF sin ninguna capacidad de extracción
B) La unidad configurable de Content Understanding que combina OCR con comprensión semántica multimodal para producir una salida estructurada (Markdown o JSON) a partir de un documento complejo ✅
C) Un componente exclusivo de Azure AI Search sin relación con Content Understanding
D) Un modelo que solo funciona con archivos de audio, nunca con documentos

**Explicación:** El flujo conceptual es: documento complejo (PDF/imagen/video) → Analyzer de Content Understanding → OCR + Layout + comprensión semántica → salida estructurada (Markdown o JSON) → contexto para un agente o pipeline RAG. El Analyzer es la pieza configurable central de este servicio.

---

### Q1758
**Este código crea y usa un Analyzer:
```python
analyzer_config = {
    "analyzerId": "manual-tecnico-markdown",
    "description": "Convierte manuales técnicos a Markdown para RAG",
    "config": {
        "returnDetails": True,
        "outputFormat": "markdown"
    }
}

client.begin_create_analyzer(
    analyzer_id="manual-tecnico-markdown",
    analyzer=analyzer_config
)

with open("manual_tecnico.pdf", "rb") as f:
    poller = client.begin_analyze(
        analyzer_id="manual-tecnico-markdown",
        body=f
    )

resultado = poller.result()
markdown_limpio = resultado.contents[0].markdown
```
¿Por qué `"outputFormat": "markdown"` es una decisión clave de configuración, según el módulo?**

A) Es irrelevante; el formato de salida no afecta cómo se puede usar el resultado
B) Markdown produce un formato estructurado pero legible que resulta ideal para indexarse en Azure AI Search o pasarse directamente como contexto/grounding a un agente, cerrando el ciclo entre extracción (Domain 5) y RAG con agentes (Domain 2) ✅
C) `outputFormat` solo acepta el valor `"json"`; `"markdown"` no es una opción válida
D) Cambiar `outputFormat` a `"markdown"` deshabilita el OCR interno del Analyzer

**Explicación:** El módulo señala explícitamente esta conexión entre dominios: el `markdown_limpio` resultante de Content Understanding es precisamente el tipo de contenido "limpio y groundeable" que después se indexa en un vector store para usarse con `file_search` en un agente — Content Understanding (Domain 5) alimenta directamente el pipeline RAG (Domain 2).

---

### Q1759
**¿Cuáles son los tres componentes de un índice de Azure AI Search, y qué controla cada uno?**

A) Frontend, Backend y Base de Datos, correspondientes a la arquitectura interna del servicio
B) Índice (Index): define el schema — qué campos existen y son buscables/filtrables/ordenables; Analizador (Analyzer): define cómo se procesa el texto antes de indexar (tokenización, idioma, sinónimos); Indexador (Indexer): automatiza la ingesta desde una fuente de datos hacia el índice ✅
C) Solo existe el Índice; Analizador e Indexador son sinónimos del mismo componente
D) Consulta, Resultado y Ranking, sin relación con cómo se construye el índice

**Explicación:** Estos tres componentes cubren etapas distintas: el Índice define la estructura de datos buscable, el Analizador (analyzer, distinto del "Analyzer" de Content Understanding) define el procesamiento lingüístico del texto antes de indexarlo, y el Indexador automatiza traer datos desde una fuente externa (Blob Storage, SQL) hacia el índice.

---

### Q1760
**Este código define el schema de un índice:
```python
campos = [
    SimpleField(name="id", type=SearchFieldDataType.String, key=True),
    SearchableField(
        name="contenido",
        type=SearchFieldDataType.String,
        analyzer_name="es.lucene"
    ),
    SimpleField(name="fecha_documento", type=SearchFieldDataType.DateTimeOffset, filterable=True, sortable=True),
    SearchField(
        name="vector_contenido",
        type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
        searchable=True,
        vector_search_dimensions=1536,
        vector_search_profile_name="perfil-vectorial"
    )
]
```
¿Qué combinación de campos en este schema es la base técnica que permite la búsqueda híbrida recomendada para Gen AI?**

A) Los campos `id` y `fecha_documento`, porque son los únicos filtrables
B) La combinación de un campo `searchable` de texto (`contenido`, con su propio `analyzer_name`) y un campo vector (`vector_contenido`, con `vector_search_dimensions`) — texto/keywords más embeddings es exactamente lo que habilita la búsqueda híbrida ✅
C) Solo el campo `vector_contenido`, ya que los campos de texto no participan en búsqueda híbrida
D) El campo `id`, porque actúa como clave primaria y determina el tipo de búsqueda

**Explicación:** La búsqueda híbrida (recomendada para Gen AI, repaso de Domain 2/3) combina coincidencia de texto/keywords con similitud vectorial por embeddings. Este schema define ambos tipos de campo en el mismo índice: `contenido` (searchable, con analizador de idioma) y `vector_contenido` (vector con dimensión de embeddings) — la base técnica necesaria para ese tipo de búsqueda combinada.

---

### Q1761
**¿Qué controla específicamente `analyzer_name="es.lucene"` en el campo `contenido` del schema de índice?**

A) El idioma en el que deben escribirse las consultas de búsqueda, rechazando cualquier otro idioma
B) Cómo se procesa el texto en español antes de indexarlo (tokenización, normalización, manejo de plurales y acentos específico del idioma), mejorando la relevancia de la búsqueda sobre contenido en ese idioma ✅
C) El modelo de embeddings usado para el campo vectorial del mismo documento
D) El tamaño máximo en caracteres que puede tener el campo `contenido`

**Explicación:** Un `analyzer` de Azure AI Search (distinto del "Analyzer" de Content Understanding, aunque comparten nombre) define cómo se tokeniza y normaliza el texto de un campo antes de indexarlo. `es.lucene` es un analizador específico para español, que maneja correctamente aspectos como acentos, plurales y variaciones morfológicas del idioma para mejorar la relevancia de las búsquedas.

---

### Q1762
**TRAMPA: Un compañero dice: "Voy a usar Document Intelligence con salida en Markdown para que mi agente de RAG pueda consultar el manual de usuario completo, incluyendo las gráficas explicadas en contexto." ¿Cuál es el error conceptual?**

A) No hay ningún error; Document Intelligence sí soporta salida en Markdown orientada a RAG
B) Document Intelligence está diseñado para extraer campos estructurados y tipados (JSON con datos específicos), no para generar representaciones narrativas en Markdown optimizadas para grounding de agentes con contenido multimodal complejo — el servicio correcto para este caso es Content Understanding ✅
C) El error es usar Markdown; Document Intelligence solo admite salida en XML
D) El error es mencionar "gráficas", ya que ningún servicio de IA puede procesar contenido visual

**Explicación:** Este es el error conceptual inverso al de la pregunta clásica del examen: Document Intelligence no produce el tipo de representación narrativa y enriquecida que necesita un agente de RAG para razonar sobre contenido multimodal complejo (gráficas explicadas en contexto) — esa es exactamente la función de Content Understanding.

---

### Q1763
**Para extraer el número de identificación fiscal y el monto de 10,000 recibos y cargarlos a un sistema contable, ¿qué servicio (o combinación) es el apropiado?**

A) Content Understanding únicamente, ya que procesa cualquier volumen de documentos
B) Document Intelligence (modelo prebuilt de recibos), porque el objetivo es obtener campos tipados y estructurados para un sistema downstream, no una representación narrativa ✅
C) Azure AI Search únicamente, sin pasar primero por ningún servicio de extracción
D) Ninguno de los servicios de IA de Foundry puede procesar recibos, solo facturas

**Explicación:** El caso de uso — campos específicos (identificación fiscal, monto) destinados a un sistema estructurado (contable) — es exactamente el escenario que Document Intelligence resuelve mejor, en este caso con un modelo prebuilt ya entrenado para recibos, sin necesidad de Content Understanding.

---

### Q1764
**Para convertir manuales técnicos con diagramas y tablas complejas en contenido que un agente de soporte pueda consultar vía RAG, ¿qué servicio es el apropiado?**

A) Document Intelligence con el modelo `prebuilt-layout`, porque puede extraer tablas
B) Content Understanding, porque el objetivo es una representación limpia y groundeable para RAG, no la extracción aislada de campos o tablas específicas ✅
C) Azure AI Search por sí solo, sin ningún paso previo de extracción o comprensión de contenido
D) Ninguno; los manuales técnicos con diagramas no pueden convertirse a un formato consumible por agentes

**Explicación:** Aunque `prebuilt-layout` puede extraer tablas, el objetivo aquí (contexto navegable y "groundeable" para un agente de RAG, incluyendo diagramas explicados en contexto) corresponde a Content Understanding, que combina OCR con comprensión semántica multimodal — no a la extracción estructural genérica de Document Intelligence.

---

### Q1765
**Un bufete legal recibe contratos ESCANEADOS (imágenes, no PDF nativo) y quiere: (a) extraer fecha de firma y partes involucradas a su sistema de gestión, y (b) que un agente de IA responda preguntas sobre el contenido completo del contrato. ¿Cuál es el orden correcto del pipeline de servicios?**

A) Solo se necesita Content Understanding; puede hacer ambas tareas simultáneamente sin ningún otro servicio
B) 1) Document Intelligence (modelo custom, `build_mode NEURAL` por la variación de formatos entre proveedores) para extraer los campos estructurados → sistema de gestión; 2) Content Understanding (`outputFormat: "markdown"`) para el contenido navegable completo; 3) Azure AI Search (índice con búsqueda híbrida) indexa ese Markdown; 4) el agente legal usa `file_search` sobre ese índice ✅
C) Primero Azure AI Search, luego Document Intelligence, y finalmente Content Understanding, en ese orden
D) Solo Document Intelligence es necesario; el agente puede consultar directamente el JSON de campos extraídos sin pasar por Azure AI Search

**Explicación:** Este pipeline conecta los tres dominios: Domain 5 (extracción con Document Intelligence + Content Understanding), Domain 1 (el índice y el agente viven en un Foundry Resource con RBAC apropiado), y Domain 2 (el agente usa `file_search` con `vector_store_ids` apuntando al índice resultante). `NEURAL` se elige porque los formatos de contrato varían entre distintos clientes/proveedores, no son una plantilla fija.

---

### Q1766
**¿Por qué se elige `build_mode NEURAL` (en vez de `TEMPLATE`) para entrenar el modelo custom de contratos del bufete legal del ejercicio anterior?**

A) `NEURAL` siempre es la opción por defecto recomendada, sin relación con las características de los documentos
B) Porque los contratos provienen de distintos clientes/proveedores con formatos variables entre sí, y `NEURAL` está diseñado para documentos con variaciones de layout entre muestras, a diferencia de `TEMPLATE` que asume estructura fija ✅
C) Porque `TEMPLATE` no admite documentos escaneados como imágenes, solo PDFs nativos
D) Porque `NEURAL` es más barato de ejecutar que `TEMPLATE`, independientemente del tipo de documento

**Explicación:** La elección entre `TEMPLATE` y `NEURAL` depende de la consistencia estructural de los documentos de entrenamiento: contratos de distintos clientes o proveedores rara vez comparten exactamente el mismo formato, por lo que `NEURAL` (robusto a variaciones de layout) es la elección correcta frente a `TEMPLATE` (pensado para un formato fijo y repetido).

---

### Q1767
**¿Qué representa `vector_search_dimensions=1536` en la definición de un campo vector de un índice de Azure AI Search?**

A) El número máximo de documentos que el índice puede almacenar
B) La dimensionalidad del vector de embeddings que se almacenará en ese campo — debe coincidir con la dimensión que produce el modelo de embeddings usado para generar esos vectores ✅
C) El número de resultados que devuelve cada búsqueda por defecto
D) El tiempo en segundos que tarda en indexarse cada documento

**Explicación:** Un campo vector en un índice de Azure AI Search almacena embeddings de una dimensión fija, determinada por el modelo de embeddings que los generó (p. ej. 1536 es una dimensión común de ciertos modelos de embeddings de OpenAI). Esta dimensión debe declararse explícitamente en el schema del índice para que coincida con los vectores que efectivamente se van a almacenar.

---

### Q1768
**Según el ejercicio de "elige el servicio correcto", un contrato requiere (a) extraer campos estructurados específicos (fecha, partes) Y (b) generar un resumen navegable en Markdown del contrato completo para un agente legal. ¿Qué combinación de servicios corresponde a este caso?**

A) Solo Document Intelligence, ya que puede generar tanto campos como resúmenes narrativos
B) Ambos en secuencia: Document Intelligence para los campos estructurados específicos, y Content Understanding para el resumen Markdown navegable que alimentará al agente legal vía RAG ✅
C) Solo Content Understanding, ya que sus analyzers también pueden devolver campos tipados con bounding box
D) Ninguno de los dos; este caso requiere un servicio de terceros fuera de Azure AI Foundry

**Explicación:** Cuando un mismo documento necesita AMBOS tipos de salida (campos tipados para un sistema downstream, y una representación narrativa groundeable para un agente), el patrón correcto no es elegir uno u otro, sino usar ambos servicios en secuencia sobre el mismo documento, cada uno para el propósito que resuelve mejor.

---

### Q1769
**¿Qué error de examen se comete al asumir que Document Intelligence y Content Understanding son intercambiables porque "ambos usan IA para leer documentos"?**

A) No es un error; ambos servicios producen exactamente la misma salida en todos los casos
B) Ignorar que cada uno está optimizado para un objetivo distinto (campos tipados y estructurados vs. representación enriquecida para RAG) lleva a elegir el servicio incorrecto en preguntas de escenario — el examen evalúa reconocer CUÁL usar según el objetivo final del caso de uso, no solo que "ambos leen documentos con IA" ✅
C) El error es que Content Understanding no usa IA en absoluto, solo reglas fijas
D) El error es que Document Intelligence solo puede usarse una vez por proyecto de Foundry

**Explicación:** Esta es la lección central de Domain 5 en el examen: reconocer que "leer documentos con IA" es una descripción demasiado genérica — la pregunta correcta siempre es "¿qué necesito al final: campos tipados para un sistema, o contenido enriquecido para un agente?", y esa respuesta determina cuál de los dos servicios usar (o si se necesitan ambos en secuencia).

---

### Q1770
**Un equipo necesita extraer texto y estructura de tabla de documentos con formatos muy distintos entre sí, sin identificar ningún campo etiquetado específico (ni "InvoiceTotal" ni ningún otro). ¿Qué modelo de Azure Document Intelligence es el apropiado?**

A) El modelo de lectura (Read), porque solo extrae texto plano sin estructura
B) El modelo de diseño (Layout), porque extrae texto, tablas, marcas de selección y estructura del documento sin necesitar campos etiquetados fijos ✅
C) El modelo `prebuilt-invoice`, porque es el más completo de todos
D) Un modelo personalizado neuronal, porque siempre es la opción más precisa

**Explicación:** El modelo de lectura solo extrae texto y detecta idioma. El modelo de diseño amplía eso agregando detección de tablas, marcas de selección y estructura del documento (incluyendo pares clave-valor opcionales), sin requerir un conjunto fijo de campos etiquetados — por eso es la respuesta oficial cuando se necesita estructura general en documentos de formato variable.

---

### Q1771
**¿Qué artefactos de entrenamiento se requieren al entrenar un modelo custom de Document Intelligence directamente por la API REST (no por Studio)?**

A) Solo los documentos de formulario de ejemplo, en un contenedor blob
B) Los formularios de ejemplo junto con un `ocr.json` por formulario, un único `fields.json`, y un `labels.json` por formulario, todo en un contenedor blob ✅
C) Un mínimo de 100 formularios etiquetados y un clasificador ya entrenado
D) Solo el `fields.json`; los demás archivos se generan automáticamente sin necesidad de subirlos

**Explicación:** Cuando se entrena por API REST (a diferencia de Studio, que genera estos archivos automáticamente detrás de escena), es responsabilidad del desarrollador subir al contenedor blob: un `ocr.json` por cada formulario de ejemplo, un único `fields.json` que describe los campos a extraer, y un `labels.json` por formulario que asigna los campos a su ubicación.

---

### Q1772
**Una empresa procesa tanto facturas como recibos y quiere un único punto de conexión que enrute automáticamente cada documento entrante al modelo de extracción correcto. ¿Qué deben usar?**

A) Un modelo neuronal personalizado que combine ambos tipos de campos en un solo esquema
B) El modelo de lectura preconstruido, aplicado antes de decidir manualmente qué hacer con cada documento
C) Un modelo compuesto o un clasificador personalizado, emparejado con los modelos de extracción individuales de factura y recibo ✅
D) Dos recursos de Document Intelligence separados, uno por tipo de documento, sin ningún enrutamiento automático

**Explicación:** Cuando se manejan varios tipos de formulario, cada uno con su propio modelo de extracción, la solución correcta es un modelo compuesto (o un clasificador personalizado) que primero clasifica el documento entrante y luego enruta la solicitud al modelo de extracción apropiado — sin que el cliente tenga que decidir manualmente qué modelo invocar.

---

### Q1773
**¿Qué diferencia principal existe entre un modelo de plantilla personalizado (`TEMPLATE`) y un modelo neuronal personalizado (`NEURAL`) en Document Intelligence?**

A) `TEMPLATE` requiere GPU para entrenar; `NEURAL` puede entrenarse en CPU
B) `TEMPLATE` es rápido/económico y funciona mejor con diseños visuales fijos y coherentes; `NEURAL` combina diseño y lenguaje, es más preciso en documentos semiestructurados o con diseño variable, pero tarda más y consume más recursos en entrenar ✅
C) `TEMPLATE` solo admite inglés; `NEURAL` admite más de 100 idiomas
D) No hay diferencia funcional real, solo cambia el nombre en el SDK

**Explicación:** La tabla comparativa del módulo es explícita: `TEMPLATE` entrena en minutos, es económico, admite más de 100 idiomas, y es ideal para formularios de diseño visual coherente (cuestionarios, formularios gubernamentales estándar). `NEURAL` tarda más, cuesta más, admite menos idiomas, pero ofrece mayor precisión en documentos semiestructurados o no estructurados donde el diseño varía entre instancias — además soporta campos superpuestos y detección de firma.

---

### Q1774
**¿Qué hace específicamente este fragmento de código del SDK de Document Intelligence?
```python
poller = document_analysis_client.begin_analyze_document(
    fileModelId,
    AnalyzeDocumentRequest(url_source=fileUri),
    locale=fileLocale
)
result = poller.result()
```**

A) Descarga el documento localmente antes de analizarlo, ya que `url_source` fuerza una copia local
B) Envía una solicitud de análisis asíncrona (Long-Running Operation) contra el modelo indicado, usando la URL del documento como origen; `poller.result()` bloquea hasta que el análisis termina y devuelve el `AnalyzeResult` ✅
C) Entrena un nuevo modelo personalizado a partir del documento en `fileUri`
D) Solo valida que el documento existe en la URL, sin extraer ningún dato

**Explicación:** `begin_analyze_document` sigue el patrón estándar de operaciones de larga duración (LRO) del SDK de Azure: la llamada inicial devuelve un objeto poller inmediatamente, y `poller.result()` es lo que espera (hace polling internamente) hasta que la operación complete, devolviendo entonces el resultado con los campos extraídos.

---

### Q1775
**En el código de análisis de factura, ¿por qué se accede a los campos así: `document.fields.get("VendorName").get('valueString')` y `document.fields.get("InvoiceTotal").get('confidence')` en vez de acceder a un atributo fijo tipo `document.vendor_name`?**

A) Es un error del ejemplo; debería usarse un atributo directo siempre
B) Porque cada campo extraído es un diccionario dinámico con su propio `valueString`/`valueCurrency` y `confidence`, ya que el conjunto de campos depende del modelo prebuilt usado (`prebuilt-invoice` en este caso) y no es fijo en el SDK ✅
C) Porque `document.fields` siempre está vacío hasta llamar a un método adicional
D) Porque `get()` es obligatorio por razones de seguridad del SDK, no por el diseño de los datos

**Explicación:** El resultado de un modelo prebuilt (como `prebuilt-invoice`) devuelve un diccionario de campos (`document.fields`) cuyas claves dependen del tipo de documento analizado — cada campo trae su propio valor tipado (`valueString`, `valueCurrency`, etc.) y su `confidence` individual, por lo que el acceso vía `.get()` es el patrón correcto para navegar esa estructura dinámica.

---

### Q1776
**TRAMPA: Un desarrollador entrena un modelo custom de plantilla (`TEMPLATE`) sobre formularios de reclamación de seguros que llegan de 15 aseguradoras distintas, cada una con su propio diseño visual. Después de entrenar, la precisión es baja para varias aseguradoras. ¿Cuál es la causa más probable?**

A) `TEMPLATE` nunca funciona bien, se debió usar `NEURAL` desde el inicio para cualquier caso
B) El modelo `TEMPLATE` asume un diseño visual coherente entre las muestras de entrenamiento; con 15 diseños distintos entre aseguradoras, lo apropiado es `NEURAL` (o un modelo compuesto con un `TEMPLATE` por aseguradora) ✅
C) El problema es el idioma; `TEMPLATE` no admite español
D) El problema es el tamaño del archivo, no el tipo de modelo elegido

**Explicación:** La trampa está en asumir "más aseguradoras = más datos = mejor". `TEMPLATE` está optimizado para diseño visual **coherente** entre muestras: si las 15 aseguradoras tienen 15 diseños distintos, el modelo de plantilla intentará generalizar sobre layouts incompatibles. La solución correcta es `NEURAL` (tolera variación de diseño) o, si se prefiere mantener `TEMPLATE` por su costo/velocidad, entrenar un modelo `TEMPLATE` por aseguradora y combinarlos en un modelo compuesto.

---

### Q1777
**Según los requisitos de entrada de Azure Document Intelligence, ¿cuál de las siguientes combinaciones es correcta?**

A) Formatos aceptados: solo PDF; tamaño máximo: 4 MB sin importar el nivel de precio
B) Formatos aceptados: JPEG, PNG, BMP, PDF y TIFF (el modelo de lectura también acepta formatos de Office); tamaño máximo: 500 MB en nivel estándar, 4 MB en nivel gratis ✅
C) Los documentos PDF protegidos con contraseña se procesan sin problema si se proporciona la contraseña en la solicitud
D) No existe límite de dimensiones para las imágenes de entrada

**Explicación:** El módulo especifica los requisitos exactos: formatos JPEG/PNG/BMP/PDF/TIFF (más formatos de Office solo para el modelo de lectura), tamaño bajo 500 MB (estándar) o 4 MB (gratis), imágenes entre 50x50 y 10,000x10,000 píxeles, PDFs bajo 17x17 pulgadas, y — importante — los PDF protegidos con contraseña NO son compatibles, sin excepción por proporcionar la contraseña.

---

### Q1778
**Un cliente necesita extraer el número de licencia, fecha de nacimiento y restricciones de una licencia de conducir, cumpliendo regulaciones de protección de datos. ¿Qué modelo prebuilt aplica y qué consideración legal señala explícitamente el módulo?**

A) `prebuilt-invoice`; no hay ninguna consideración legal especial
B) El modelo de documento de identificación (`prebuilt-idDocument`); el módulo advierte explícitamente que este modelo extrae información personal cubierta por leyes de protección de datos, por lo que se requiere permiso del individuo y cumplimiento legal aplicable ✅
C) El modelo de recibo; las licencias de conducir se procesan igual que un recibo de compra
D) Ningún modelo prebuilt cubre documentos de identificación; se requiere entrenamiento custom obligatoriamente

**Explicación:** El modelo de documento de identificación extrae nombres, fechas de nacimiento, números de documento y restricciones de licencias de conducir, IDs de la UE y pasaportes internacionales. El módulo incluye una nota "Importante" explícita: por tratarse de información personal, se debe tener permiso del individuo y cumplir con las leyes de protección de datos de la jurisdicción aplicable.

---

### Q1779
**¿Qué diferencia hay entre crear un recurso Foundry y crear un recurso dedicado de Azure Document Intelligence?**

A) No hay ninguna diferencia; ambos ofrecen exactamente los mismos modelos y precios
B) El recurso Foundry es una suscripción multiservicio que da acceso a varias herramientas de IA con un único endpoint/clave; el recurso dedicado de Document Intelligence es exclusivo para ese servicio — se recomienda Foundry si se planea usar varias herramientas, y el dedicado si el acceso es exclusivo a Document Intelligence ✅
C) El recurso dedicado no soporta modelos personalizados, solo prebuilt
D) El recurso Foundry solo funciona con el SDK de C#, nunca con Python

**Explicación:** Esta es la misma distinción de recursos que aplica en general en Foundry (Domain 1): un recurso Foundry consolida el acceso a múltiples servicios de IA bajo un único endpoint y clave, mientras que un recurso dedicado de Document Intelligence sirve exclusivamente para ese servicio. La elección depende de si se planea usar solo Document Intelligence o integrarlo con otras herramientas de Foundry.

---

### Q1780
**En la canalización de enriquecimiento de un indexador de Azure AI Search, ¿qué representa la colección `normalized_images` dentro del documento JSON jerárquico que se construye durante la indexación?**

A) Es un campo obsoleto que ya no se genera en versiones recientes del servicio
B) Es la colección donde el indexador coloca cada imagen extraída del documento de origen, permitiendo que aptitudes posteriores (como OCR) se ejecuten sobre cada imagen individualmente ✅
C) Es el resultado final del índice, listo para consultarse por los clientes
D) Es un campo que solo existe si el documento de origen es un PDF escaneado completo

**Explicación:** Cuando el origen de datos contiene imágenes, el indexador puede configurarse para extraerlas y colocarlas en `normalized_images` (image0, image1, ...) dentro de la estructura jerárquica del documento. Esto permite aplicar aptitudes por elemento del nivel jerárquico — por ejemplo, ejecutar OCR sobre cada imagen individual de la colección para extraer su texto.

---

### Q1781
**¿Qué aptitud (skill) se usaría para combinar el texto original de un documento con el texto extraído por OCR de sus imágenes incrustadas, en un único campo consultable?**

A) Una aptitud de traducción, ya que combina distintos orígenes de texto
B) Una aptitud de combinación (merge skill), que produce un campo como `merged_content` uniendo el contenido textual original con el texto extraído de cada imagen ✅
C) Una aptitud de detección de idioma, que fusiona automáticamente todos los campos de texto
D) No es posible combinar campos de distintos niveles jerárquicos del documento indexado

**Explicación:** Cada aptitud de la canalización agrega campos al documento jerárquico; los campos de salida de una aptitud pueden servir de entrada a otra posterior. Una aptitud de combinación toma el contenido de texto original y el texto extraído por OCR de cada imagen para producir un campo unificado (`merged_content`) que incluye todo el texto del documento, imágenes incluidas.

---

### Q1782
**¿Qué requiere el indexador para poder usar las aptitudes integradas (built-in skills) de Búsqueda de Azure AI, como detección de idioma o extracción de frases clave?**

A) Nada adicional; las aptitudes integradas funcionan sin ningún recurso de IA asociado
B) Acceso a un recurso de Foundry Tools: puede usarse el recurso de búsqueda restringido incluido (limitado a 20 documentos o menos) o adjuntar un recurso de Foundry Tools de la suscripción, que debe estar en la misma región que el recurso de Búsqueda de Azure AI ✅
C) Un modelo personalizado de Document Intelligence entrenado específicamente para el índice
D) Una función de Azure separada, ya que las aptitudes integradas en realidad son aptitudes personalizadas disfrazadas

**Explicación:** Las aptitudes integradas (como Azure Vision y Azure Language) requieren que el indexador tenga acceso a un recurso de Foundry Tools — ya sea el recurso restringido gratuito incluido con Búsqueda de Azure AI (tope de 20 documentos) o un recurso de Foundry Tools propio en la misma región que el servicio de búsqueda, sin ese límite.

---

### Q1783
**¿En qué se diferencia una aptitud personalizada (custom skill) de las aptitudes integradas del indexador?**

A) Las aptitudes personalizadas no pueden usarse junto con aptitudes integradas en el mismo conjunto de aptitudes
B) Una aptitud personalizada aplica lógica propia al contenido del documento del índice, típicamente como un "envoltorio" de un servicio externo — por ejemplo, una función de Azure que envía datos del documento a un modelo de Document Intelligence y devuelve campos extraídos al índice ✅
C) Las aptitudes personalizadas solo pueden ejecutarse localmente, nunca dentro de la canalización del indexador
D) Una aptitud personalizada reemplaza por completo el proceso de indexación, ignorando el origen de datos original

**Explicación:** Las aptitudes personalizadas extienden la canalización de enriquecimiento con lógica propia, frecuentemente implementada como una función de Azure que actúa de "envoltorio" alrededor de otro servicio — el ejemplo explícito del módulo es usar una aptitud personalizada para pasar el documento a un modelo de Azure Document Intelligence y traer de vuelta los campos extraídos como parte del enriquecimiento del índice.

---

### Q1784
**¿Qué atributo de un campo de índice de Azure AI Search determina si ese campo puede usarse en una expresión de filtro (`$filter`)?**

A) `searchable`
B) `filterable` ✅
C) `sortable`
D) `retrievable`

**Explicación:** Cada campo de índice se configura con atributos independientes: `key` (clave única), `searchable` (consultable por texto completo), `filterable` (usable en expresiones de filtro), `sortable` (usable para ordenar), `facetable` (usable para generar facetas) y `retrievable` (incluido en los resultados, activado por defecto salvo que se quite explícitamente).

---

### Q1785
**Dada la siguiente consulta contra un índice de Azure AI Search:
```json
{
  "search": "New York",
  "count": true,
  "select": "title,keyPhrases",
  "filter": "metadata_storage_size lt 380000"
}
```
¿Qué devuelve exactamente esta consulta?**

A) Todos los documentos del índice, ignorando el término de búsqueda porque hay un filtro presente
B) Documentos que mencionan "New York" en algún campo consultable Y cuyo tamaño de almacenamiento es menor a 380,000 bytes, devolviendo solo los campos `title` y `keyPhrases` ✅
C) Solo documentos cuyo título es exactamente "New York"
D) Un error, porque `search` y `filter` no pueden combinarse en la misma solicitud

**Explicación:** `search` aplica la búsqueda de texto completo sobre los campos `searchable`; `filter` restringe adicionalmente los resultados a los que cumplen la expresión OData indicada (aquí, tamaño bajo 380,000 bytes); `select` limita qué campos se devuelven en cada documento resultado. Los tres parámetros se combinan como condiciones AND sobre el mismo conjunto de resultados.

---

### Q1786
**¿Cuál es la diferencia entre la sintaxis de consulta `Simple` y `Full` de Lucene en Búsqueda de Azure AI?**

A) `Simple` es solo para inglés; `Full` admite cualquier idioma
B) `Simple` es una sintaxis intuitiva para coincidencias básicas de términos literales; `Full` es una sintaxis extendida que admite filtrado complejo, expresiones regulares y consultas más sofisticadas ✅
C) `Full` está obsoleta y se recomienda usar siempre `Simple`
D) `Simple` no admite el parámetro `select`, solo `Full` lo admite

**Explicación:** Búsqueda de Azure AI admite dos variantes de la sintaxis de consulta de Lucene: `Simple`, pensada para búsquedas básicas de términos enviados directamente por un usuario, y `Full`, una sintaxis extendida que soporta filtrado OData complejo, expresiones regulares y otras consultas avanzadas — la elección se indica con el parámetro `queryType`.

---

### Q1787
**¿En qué orden ocurren las cuatro fases del procesamiento de una consulta en Búsqueda de Azure AI?**

A) Puntuación → Recuperación de documentos → Análisis léxico → Análisis de consultas
B) Análisis de consultas (construcción del árbol de subconsultas) → Análisis léxico (minúsculas, quitar palabras irrelevantes, raíz de palabras) → Recuperación de documentos (comparación contra términos indexados) → Puntuación (relevancia vía TF/IDF) ✅
C) Análisis léxico → Puntuación → Análisis de consultas → Recuperación de documentos
D) El orden no está definido; depende de la configuración del índice

**Explicación:** El módulo describe explícitamente las cuatro fases en este orden: (1) la expresión de búsqueda se reconstruye como árbol de subconsultas (términos, frases, prefijos); (2) los términos se refinan según reglas lingüísticas (minúsculas, stopwords, raíz); (3) se comparan contra los términos indexados para identificar documentos coincidentes; (4) se asigna una puntuación de relevancia basada en frecuencia del término y frecuencia inversa del documento (TF/IDF).

---

### Q1788
**¿Qué tipo de proyección del almacén de conocimiento (knowledge store) da como resultado un esquema de datos relacional, apto para tablas normalizadas?**

A) Proyección de archivo (file)
B) Proyección de objeto (object/JSON)
C) Proyección de tabla (table) ✅
D) Proyección de imagen (image)

**Explicación:** El almacén de conocimiento admite tres tipos de proyección de los datos enriquecidos: objetos JSON (para integración en pipelines ETL), tablas (para normalizar los registros en un esquema relacional apto para análisis/informes), y archivos (por ejemplo, para guardar imágenes extraídas como archivos independientes).

---

### Q1789
**TRAMPA: Un equipo usa el recurso de búsqueda restringido gratuito (incluido con Azure AI Search) para las aptitudes integradas de IA en un proyecto que indexará 500 documentos en producción. ¿Cuál es el problema?**

A) No hay ningún problema; el recurso restringido gratuito no tiene límite de documentos
B) El recurso de búsqueda restringido gratuito está limitado a indexar 20 documentos o menos — para 500 documentos en producción se requiere adjuntar un recurso de Foundry Tools propio en la misma región ✅
C) El problema es que las aptitudes integradas nunca funcionan con recursos gratuitos, sin importar el número de documentos
D) El límite de 20 documentos solo aplica a aptitudes personalizadas, no a las integradas

**Explicación:** El módulo lo señala explícitamente: el recurso de búsqueda restringido de Azure AI incluido gratis está limitado a indexar 20 documentos o menos. Para cualquier escenario de producción con más documentos, es obligatorio adjuntar un recurso de Foundry Tools propio de la suscripción (en la misma región que el recurso de Búsqueda de Azure AI) para las aptitudes integradas de IA.

---
