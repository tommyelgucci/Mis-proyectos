# BANCO DE PREGUNTAS AI-103 — PARTE 22 (Q1750-Q1769)
## Domain 5: Information Extraction — Document Intelligence, Content Understanding y Azure AI Search
### Generado: 2026-08-21 | Fuente: guía "Domain 1 y Domain 5 en profundidad"

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
