# AI-103: auditoría de cobertura y brechas — 11 de octubre de 2026

## Alcance y límite

Se inspeccionó el banco completo de preguntas (1.14 MB antes de los cambios), sus etiquetas y fuentes, las 328 tarjetas rápidas y el mapa oficial anterior. Se añadieron 30 preguntas de reparación para objetivos que necesitaban presencia explícita y se corrigieron seis tarjetas rápidas con afirmaciones obsoletas o demasiado absolutas.

**Esto amplía la cobertura, pero todavía no certifica que el 100 % de las respuestas de las 1,170 preguntas sea técnicamente correcto.** El banco contiene código de SDK y servicios que cambian; para afirmar cobertura total, cada respuesta y fragmento de código debe cotejarse con la documentación de la versión pertinente. Las coincidencias de palabras clave son señales para localizar temas, no una medida de dominio.

## Resultado cuantitativo

- Banco antes de esta pasada: **1,140 preguntas**.
- Preguntas añadidas: **30** (IDs 1141–1170).
- Banco tras la ampliación: **1,170 preguntas**.
- Tarjetas rápidas: **328**; seis corregidas (IDs 6, 13, 46, 47, 48 y 193).
- Tests/build no ejecutados en esta pasada; hay que comprobar CI y despliegue antes de dar el cambio por validado.

### Distribución por etiqueta interna tras añadir las preguntas

| Etiqueta interna | Cantidad | Interpretación |
|---|---:|---|
| Domain 1 (real) | 456 | Principalmente planificar y administrar |
| Domain 2 | 319 | Principalmente generativa y agentes |
| Domain 3 | 120 | Optimización de IA generativa; se suma a Domain 2 al comparar con el dominio oficial |
| Domain 3 (real) | 81 | Visión |
| Domain 4 (real) | 87 | Análisis de texto |
| Domain 5 | 71 | Extracción de información |
| Cross | 36 | Escenarios mixtos, no un dominio oficial |

Las etiquetas históricas no equivalen a los cinco dominios oficiales. Domain 2 + Domain 3 son subtemas internos de generativa/agentes; Cross es una cuota pedagógica, no una categoría oficial. La distribución del banco tampoco es el peso del simulacro.

## Mapa de objetivos oficiales

Fuente de verdad: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103. Rangos oficiales: Plan and manage an Azure AI solution (25–30 %), Implement generative AI and agentic solutions (30–35 %), Implement computer vision solutions (10–15 %), Implement text analysis solutions (10–15 %), Implement information extraction solutions (10–15 %).

### 1. Plan and manage an Azure AI solution — 25–30 %

Hay material existente sobre identidad, RBAC, Content Safety, gobernanza, selección de modelos, cuotas, despliegue, red, monitorización y costes. Se añadieron preguntas sobre CI/CD, trazas/observabilidad, límites de carga, throttling y salud de ingesta/índice.

Pendiente: validar individualmente roles, políticas, redes, regiones, cuotas y opciones de despliegue. No memorizar “siempre obligatorio” si la documentación no lo establece para el escenario.

### 2. Implement generative AI and agentic solutions — 30–35 %

Cobertura amplia en Responses API, function calling, herramientas, MCP, Foundry IQ/RAG, prompting, fine-tuning, flujos de trabajo y orquestación multiagente. Se añadieron preguntas sobre evaluación de fabricación/relevancia/grounding, diferencia entre estado conversacional y recuperación, orquestación multiagente y trazas.

Brecha de precisión: algunas tarjetas antiguas convertían buenas prácticas en reglas universales. Se corrigieron tarjetas de estrategia prompt/RAG/fine-tuning y de temperature/top_p. Aún se debe validar código y parámetros del SDK pregunta por pregunta.

### 3. Implement computer vision solutions — 10–15 %

El banco ya cubría entrada visual, generación de imágenes/vídeo, Sora, referencias y edición. Se añadieron preguntas sobre inpainting/máscaras, comprensión visual fundamentada, alt-text, prompt injection indirecto en imágenes y moderación visual.

Pendiente: revisar límites, disponibilidad, nombres de modelos, restricciones y requisitos de seguridad de servicios de imagen y vídeo; son detalles sensibles a cambios.

### 4. Implement text analysis solutions — 10–15 %

El banco cubre detección de idioma, PII, análisis de texto, voz, transcripción, síntesis y traducción. Se añadieron preguntas de sentimiento/tono, extracción estructurada, traducción, voz a texto/texto a voz, personalización de voz y razonamiento multimodal sobre audio.

Pendiente: comprobar qué capacidad corresponde a Azure Language, Translator, Speech o un flujo generativo en cada escenario, incluidos idiomas, límites y SDK.

### 5. Implement information extraction solutions — 10–15 %

El banco incluye Document Intelligence, Content Understanding, analizadores, OCR, campos estructurados, modelos prebuilt/custom y canalizaciones de búsqueda. Se añadieron preguntas de ingesta multimodal, búsqueda semántica/híbrida/vectorial, OCR/enriquecimiento y representaciones estructuradas/Markdown para agentes.

Pendiente: contrastar las diferencias exactas entre Document Intelligence y Content Understanding, límites de tamaño, tipos de modelos, campos de esquema, formatos de salida e indexación.

## Correcciones realizadas en tarjetas rápidas

- **ID 6:** deja de enseñar AIProjectClient.from_connection_string(...) como patrón universal; ahora indica el patrón actual AIProjectClient(endpoint=..., credential=DefaultAzureCredential()) y recomienda comprobar el SDK del escenario.
- **ID 13:** sustituye el valor fijo antiguo 2024-05-01-preview por la indicación de usar la ruta/API version vigente para Responses API. Microsoft documenta actualmente /openai/v1/ y v1 para la interfaz actual.
- **ID 46:** elimina “prompt engineering siempre primero”.
- **IDs 47, 48 y 193:** eliminan garantías universales de determinismo y la prohibición absoluta de combinar temperature y top_p; se presentan como parámetros que deben evaluarse según modelo y API.

Fuentes para estas correcciones:
- https://learn.microsoft.com/en-us/python/api/overview/azure/ai-projects-readme
- https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses
- https://learn.microsoft.com/en-us/rest/api/aifoundry/azureopenai/responses

## Validación pendiente antes de declarar “cubierto al 100 %”

1. Ejecutar npm test y npm run build desde cognilab/frontend.
2. Ejecutar las pruebas del backend, incluida la suite de seguridad.
3. Revisar las 1,170 preguntas individualmente por respuesta, distractores, explicación, fuente, versión del SDK y dominio oficial; priorizar APIs preview, paquetes renombrados y palabras absolutas (“siempre”, “nunca”, “solo”, “obligatorio”).
4. Verificar el workflow de publicación y abrir la app desplegada para probar en móvil Quiz, Audio, Flashcards, Repaso, Tutor y Progreso.
5. Actualizar este informe con resultados reales de pruebas y despliegue; no inferir éxito porque exista un commit.

## Criterio de finalización

Solo marcar un objetivo como validado después de comprobar tareas y respuestas representativas contra documentación oficial actual. Estado actual: **cobertura ampliada y brechas identificadas; validación completa aún pendiente**.
