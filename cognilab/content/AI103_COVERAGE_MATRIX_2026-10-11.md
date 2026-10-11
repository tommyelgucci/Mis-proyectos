# Auditoría de cobertura AI-103 de CogniLab — 11 de octubre de 2026

## Resultado ejecutivo

**No se puede afirmar que el banco cubra íntegramente la guía oficial.** El banco contiene 1.140 preguntas en la revisión de `main`, pero el tamaño no demuestra cobertura: una pregunta puede repetir un concepto y no evaluar un objetivo distinto. La guía vigente de Microsoft define cinco dominios y sus tareas; el banco mantiene etiquetas internas históricas.

Fuente de referencia: [Study guide oficial AI-103 — Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103), skills measured as of 16 April 2026.

## Estado del banco revisado

| Etiqueta interna | Preguntas |
|---|---:|
| Domain 1 (real) | 448 |
| Domain 2 | 315 |
| Domain 3 | 120 |
| Domain 3 (real) | 74 |
| Domain 4 (real) | 80 |
| Domain 5 | 67 |
| Cross | 36 |
| **Total** | **1.140** |

Estas etiquetas no son los cinco nombres oficiales. Domain 2 y Domain 3 contienen en gran parte temas de IA generativa/agentes; las etiquetas `(real)` y `Cross` son convenciones del banco, no nombres de certificación.

## Matriz de cobertura contra objetivos oficiales

Los estados de abajo son una auditoría estática preliminar por tema, preguntas y archivos de origen. “Parcial / verificar” no significa que el objetivo esté ausente; significa que no hay evidencia suficiente para considerarlo preparado con seguridad.

| Dominio oficial | Evidencia observada | Estado |
|---|---|---|
| **Plan and manage an Azure AI solution (25–30%)** | Hay preguntas sobre identidad, RBAC, Content Safety, selección de modelos, seguridad y gobernanza. | **Parcial / verificar** despliegues, CI/CD, cuotas/escalado/coste, monitorización de deriva, salud de índices, trazas y calidad de grounding. |
| **Implement generative AI and agentic solutions (30–35%)** | Es el área más extensa: Foundry, herramientas, function calling, MCP, RAG, agentes y orquestación. | **Amplia pero no validada**: revisar código/SDK y balancear conceptos con evaluación, observabilidad, memoria, aprobaciones y análisis de errores. |
| **Implement computer vision solutions (10–15%)** | Existe un bloque dedicado de 74 preguntas; incluye entradas visuales y generación de vídeo/imágenes. | **Brecha de riesgo alta**: el barrido específico encontró solo una pequeña cantidad de ítems que nombran explícitamente generación/edición de imagen o vídeo, y casi ninguna evidencia textual de captioning/alt-text, preguntas visuales fundamentadas o seguridad multimodal. Revisar el bloque completo, no confiar en el recuento por palabras. |
| **Implement text analysis solutions (10–15%)** | Hay un bloque de 80 preguntas que combina análisis de texto, voz y traducción. | **Parcial / verificar**: speech-to-text, text-to-speech y traducción aparecen, pero el barrido detectó pocos ítems claramente centrados en speech. Comprobar sentimiento/tono, extracción de temas/entidades, JSON estructurado, traducción y razonamiento sobre audio. |
| **Implement information extraction solutions (10–15%)** | 67 preguntas en Domain 5 y preguntas relacionadas con Azure AI Search, OCR, Document Intelligence y Content Understanding. | **Parcial**: Document Intelligence y extracción estructurada están presentes; verificar ingesta de imagen/audio/vídeo, skills/enriquecimiento, OCR en RAG, búsqueda semántica/híbrida/vectorial y salida Markdown/estructurada de Content Understanding. |

## Prioridades concretas antes del examen

1. **Visión (máxima urgencia de brecha):** generación desde prompt y referencia; edición con máscara/inpainting; generación/edición de vídeo; captions, alt-text y descripciones accesibles; preguntas respondidas con evidencia visual; Content Understanding para características visuales; análisis de segmentos de vídeo; filtros de contenido visual y prompt injection indirecto por texto dentro de imágenes.
2. **Texto y voz:** sentimiento y tono; entidades/temas/resúmenes y JSON estructurado; Translator frente a traducción con LLM; speech-to-text y text-to-speech; voz personalizada; razonamiento con audio y traducción de voz.
3. **Plan/gestión de producción:** selección de modelos pequeños/grandes/multimodales; opciones de despliegue y configuración; CI/CD; cuotas, límites, escalado y costes; trazas, latencia, tokens, drift, calidad de ingesta y relevancia; identidad administrada, keyless, redes privadas y políticas de roles; evaluaciones de seguridad y flujos de aprobación.
4. **Extracción y grounding:** ingestión multimodal; OCR y layout; skills de enriquecimiento; elección entre búsqueda léxica/vectorial/semántica/híbrida; conexión del retrieval a agentes; salidas de Content Understanding aptas para downstream.

## Revisión de exactitud técnica

El análisis de etiquetas y palabras clave no valida la verdad técnica de las respuestas. Antes de memorizar fragmentos de código, cotejar paquetes, clases, métodos, parámetros y disponibilidad por región/modelo con la documentación vigente de Microsoft. Priorizar las afirmaciones absolutas (“siempre”, “nunca”, “solo”, “obligatorio”) y los ejemplos que dependen de versiones de SDK o características Preview.

La documentación oficial advierte que los bullets ilustran el alcance y que también pueden aparecer temas relacionados; la mayoría de preguntas cubre funciones GA, aunque pueden aparecer funciones Preview de uso común. Por eso esta matriz es un instrumento de auditoría, no una garantía de que se han cubierto todas las preguntas posibles del examen.

## Limitaciones de esta pasada

- Se verificó la estructura y el recuento del banco y se hizo un barrido temático automatizado.
- No se cotejaron una por una las 1.140 respuestas con documentación oficial. No afirmar que el banco está “100 % validado”.
- Los recuentos por palabra clave son indicios, no métricas de cobertura exactas; requieren revisión humana de cada objetivo.
- No se ejecutaron localmente `npm test`, `npm run build` ni pruebas del backend en esta pasada.
- El despliegue publicado en Hugging Face no se ha verificado en navegador.

## Criterio de aceptación para cerrar la auditoría

- Cada bullet de la guía oficial tiene al menos una pregunta específica, no solo una mención incidental.
- Cada pregunta está mapeada a un dominio oficial y objetivo, conservando las etiquetas antiguas solo como metadatos internos si hace falta.
- Las respuestas con APIs/SDK se cotejan con Microsoft Learn vigente y señalan versión/Preview cuando proceda.
- Tests y build pasan; el despliegue y los modos principales se comprueban en móvil.


## Addendum — cambios del 11 de octubre de 2026

Se añadió el archivo `cognilab/frontend/src/data/ai103GapQuestions.json` con 32 preguntas específicas (IDs 1141–1172) y se integró en el selector principal del Quiz. El banco combinado que carga la app pasa de 1.140 a 1.172 preguntas. Estas preguntas amplían objetivos de plan/gestión, evaluación y orquestación generativa, visión multimodal/edición y seguridad, análisis de texto/voz y extracción/ingesta/búsqueda.

También se corrigieron seis tarjetas rápidas: SDK actual de AIProjectClient, versión/API base de Responses API y afirmaciones demasiado absolutas sobre prompt/RAG/fine-tuning y temperature/top_p.

Esto no cambia el estado de auditoría a “100 % validado”: los ítems existentes siguen requiriendo revisión técnica individual, y las pruebas de build, tests y despliegue todavía deben ejecutarse.
