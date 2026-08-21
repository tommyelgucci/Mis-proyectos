# CASO DE ESTUDIO 1 — Contoso Legal
## Domain: Domain 2
## Icon: 🏛️

### ESCENARIO

Contoso Legal es un despacho de abogados que procesa contratos de docenas de bufetes externos distintos. Cada contraparte envía sus contratos en su propio formato (algunos como PDF nativo, otros como escaneos de baja calidad), y el diseño visual de cada contrato varía mucho de un bufete a otro.

El equipo de tecnología define dos objetivos para un proyecto piloto:

1. **Extracción estructurada:** cargar automáticamente fecha de firma, partes involucradas y monto del contrato al sistema de gestión de casos existente.
2. **Asistente de búsqueda:** los abogados necesitan poder preguntarle a un agente de IA "¿qué dice el contrato con Fabrikam sobre la cláusula de terminación anticipada?" y recibir una respuesta fundamentada en el texto real del contrato.

**Entorno actual:**
- Un único recurso de Microsoft Foundry (`contoso-legal-resource`), región `eastus`.
- Durante el desarrollo, el equipo se autentica con la clave del recurso (`AzureKeyCredential`) directamente en el código para ir rápido.
- El piloto arrancará con 15 contratos de prueba, usando las aptitudes de IA integradas gratuitas de Azure AI Search.
- El almacenamiento de los contratos originales (PDFs escaneados) vive en un contenedor de Azure Blob Storage.

El pasante que arma el proyecto propone lo siguiente: entrenar UN solo modelo `TEMPLATE` personalizado de Document Intelligence entrenado con contratos de los 5 bufetes externos más frecuentes, indexar el resultado en un único índice de Azure AI Search, y conectar el agente directamente con esa clave de API hardcodeada, ya que "así funciona para el piloto y luego se optimiza".

---

### Q1
**¿Qué modelo de Document Intelligence es el apropiado para el objetivo de extracción estructurada (fecha de firma, partes, monto), dado que los contratos provienen de bufetes externos con formatos muy distintos entre sí?**

A) Un modelo `TEMPLATE` personalizado único, tal como propone el pasante — es la opción más rápida y económica sin importar la variación de formato
B) El modelo `prebuilt-invoice`, ya que un contrato es funcionalmente equivalente a una factura para Document Intelligence
C) Un modelo `NEURAL` personalizado, porque tolera variaciones de diseño entre muestras de entrenamiento — a diferencia de `TEMPLATE`, que asume un diseño visual coherente ✅
D) Ninguno; Document Intelligence no puede procesar contratos, solo facturas y recibos

**Explicación:** El escenario describe exactamente la condición que hace inapropiado a `TEMPLATE`: contratos de bufetes distintos con diseños visuales variables entre sí. `TEMPLATE` está optimizado para diseño fijo y consistente; con múltiples proveedores y formatos, `NEURAL` es la elección correcta pese a su mayor costo y tiempo de entrenamiento, porque tolera esa variación sin perder precisión.

---

### Q2
**Con 15 contratos en el piloto, el equipo planea usar las "aptitudes de inteligencia artificial integradas" gratuitas de Azure AI Search sin adjuntar un recurso propio de Foundry Tools. ¿Es esto viable, y por qué?**

A) No es viable bajo ninguna circunstancia; las aptitudes integradas siempre requieren un recurso de Foundry Tools propio
B) No es viable porque las aptitudes integradas nunca pueden usarse junto con un contenedor de Azure Blob Storage
C) Sí es viable siempre, sin ningún límite de documentos, mientras se use el nivel gratuito de Azure AI Search
D) Sí es viable en este piloto específico: el recurso de búsqueda restringido gratuito incluido con Azure AI Search admite hasta 20 documentos, y el piloto usa 15 — pero superar ese umbral (por ejemplo, al escalar a producción) exigirá adjuntar un recurso de Foundry Tools propio en la misma región ✅

**Explicación:** El recurso restringido gratuito de Azure AI Search está limitado a 20 documentos o menos. Los 15 contratos del piloto caben justo debajo de ese límite, por lo que la configuración actual funciona — pero es una limitación temporal: en cuanto el volumen de producción supere 20 documentos, el equipo deberá adjuntar un recurso de Foundry Tools propio en la misma región que el servicio de búsqueda.

---

### Q3
**Para el objetivo de búsqueda con el agente ("¿qué dice el contrato con Fabrikam sobre...?"), ¿qué servicio de Foundry Tools es el apropiado para preparar el CONTENIDO que el agente consultará, y por qué no basta con los campos extraídos por Document Intelligence?**

A) Content Understanding, porque el objetivo es una representación limpia y "groundable" del contenido completo del contrato (no solo campos aislados) para que el agente pueda fundamentar respuestas sobre cualquier cláusula, no solo sobre los campos predefinidos ✅
B) Basta con los campos de Document Intelligence (`NEURAL`); el agente puede razonar directamente sobre valores tipados como fecha o monto sin necesitar el texto completo del contrato
C) Azure AI Search por sí solo, sin ningún paso previo de extracción de contenido, ya que puede indexar PDFs escaneados directamente sin procesamiento
D) El servidor MCP de lenguaje de Azure, ya que expone herramientas de análisis de texto que el agente puede usar directamente sobre el PDF original

**Explicación:** Document Intelligence extrae campos ESPECÍFICOS y tipados (fecha, monto, partes) — útil para el sistema de gestión de casos, pero insuficiente si un abogado pregunta por una cláusula arbitraria del contrato que no es uno de esos campos. Content Understanding está diseñado para producir una representación enriquecida y navegable del documento COMPLETO, pensada precisamente para servir de contexto (grounding) a un agente vía RAG.

---

### Q4
**El pasante propone conectar el agente con la clave de API hardcodeada en el código "para el piloto, y luego se optimiza". ¿Qué recomienda el módulo de Plan y Gestión de Foundry para este escenario, y por qué debería aplicarse desde el piloto y no dejarse para después?**

A) Hardcodear la clave está bien indefinidamente mientras el repositorio del proyecto sea privado
B) Se recomienda usar autenticación de Microsoft Entra ID (identidad administrada o `DefaultAzureCredential`) en vez de una clave estática — precisamente porque las claves hardcodeadas en código tienden a filtrarse (control de versiones, logs, capturas de pantalla) y "optimizarlo después" rara vez ocurre una vez el sistema está en producción ✅
C) La recomendación solo aplica a producción; en desarrollo y pilotos siempre se debe usar la clave del recurso por simplicidad, sin excepción
D) Ninguna de las dos opciones es válida; Foundry solo admite autenticación por certificado de cliente

**Explicación:** Este es un patrón recurrente en toda la documentación de Foundry Tools (Language, Speech, Translator, Voice Live): la autenticación por clave es más simple para empezar, pero Microsoft recomienda Entra ID para producción — y la experiencia común es que un "TODO: optimizar después" sobre seguridad tiende a nunca ejecutarse una vez el sistema funciona. Adoptar `DefaultAzureCredential` desde el piloto evita ese riesgo sin costo adicional real de desarrollo.

---

### Q5
**Un abogado le pregunta al agente: "¿Qué cláusulas de terminación anticipada existen en los contratos con Fabrikam y con Contoso Norte?" — una pregunta que requiere buscar en MÁS DE UN documento indexado. ¿Qué componente de la arquitectura hace posible que el agente encuentre y cite el contenido relevante de ambos contratos?**

A) El modelo `NEURAL` de Document Intelligence, consultado directamente por el agente en tiempo real para cada pregunta
B) El servidor MCP de Voz de Azure, que puede buscar dentro de archivos de audio transcritos
C) Un índice de Azure AI Search (alimentado por el contenido de Content Understanding) conectado al agente vía `file_search`/`vector_store_ids`, que permite recuperar los fragmentos relevantes de cualquier documento indexado según la consulta del usuario ✅
D) Ningún componente adicional es necesario; el modelo del agente ya "recuerda" el contenido de todos los documentos que se le mostraron alguna vez

**Explicación:** Esta es la arquitectura RAG estándar vista en el banco: el contenido enriquecido de Content Understanding se indexa en Azure AI Search; el agente se conecta a ese índice mediante una herramienta de búsqueda (`file_search` con `vector_store_ids` apuntando al índice), lo que le permite recuperar y citar fragmentos relevantes de CUALQUIER documento indexado — no solo el que se mencionó en el turno anterior de la conversación, ni algo que el modelo "recuerde" de memoria.

---

### Q6
**Meses después, Contoso Legal decide entrenar el modelo `NEURAL` de Document Intelligence directamente por API REST (no por Document Intelligence Studio), subiendo los contratos de entrenamiento a un contenedor de Blob Storage con una URL de SAS. ¿Qué tres archivos deben acompañar a cada formulario de ejemplo en ese contenedor?**

A) Solo el documento del contrato; los demás archivos se generan automáticamente sin intervención
B) Un archivo `.env` con las credenciales del recurso, un `README.md`, y el propio PDF
C) Un `manifest.json`, un `schema.xml`, y un `training-config.yaml`
D) Un `ocr.json` por cada formulario de ejemplo, un único `fields.json` para todo el conjunto, y un `labels.json` por cada formulario, asignando los campos a su ubicación ✅

**Explicación:** Este es el mismo requisito visto para el entrenamiento por API REST (a diferencia de Document Intelligence Studio, que genera estos archivos automáticamente): cada formulario de ejemplo necesita su propio `ocr.json`, hay un único `fields.json` compartido que describe los campos a extraer, y cada formulario tiene su propio `labels.json` que mapea esos campos a su posición en el documento.

---
