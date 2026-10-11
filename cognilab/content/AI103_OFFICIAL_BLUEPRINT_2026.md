# AI-103 — mapa oficial y plan intensivo de repaso
**Actualizado: 11 de octubre de 2026**  
**Fuente de verdad:** [Study guide oficial de Microsoft](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103) y [página de certificación](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/).

> Este documento alinea el repaso de CogniLab con el esquema oficial vigente. No sustituye el temario oficial ni convierte las preguntas de práctica en preguntas reales del examen.

## 1. Dominios oficiales y ponderación

| Dominio oficial | Peso | Prioridad práctica |
|---|---:|---|
| Plan and manage an Azure AI solution | 25–30 % | Alta |
| Implement generative AI and agentic solutions | 30–35 % | Máxima |
| Implement computer vision solutions | 10–15 % | Media |
| Implement text analysis solutions | 10–15 % | Media |
| Implement information extraction solutions | 10–15 % | Media |

Las ponderaciones son rangos oficiales, no porcentajes exactos que deban sumar 100 en todos los extremos. Revisa la guía oficial antes del examen por si Microsoft publica cambios.

## 2. Cómo usar el material existente de CogniLab

El banco y las tarjetas existentes se crearon bajo una organización anterior de cuatro bloques (SDK/autenticación, herramientas, optimización y Responsible AI). **No confundir esos bloques internos con los cinco dominios oficiales actuales.** Úsalos como etiquetas de contenido, y clasifica cada pregunta según la tarea que evalúa realmente.

- **Planificar y administrar soluciones:** selección de servicios y modelos, arquitectura, identidad y acceso, configuración, despliegue, monitorización, evaluación, costes, seguridad y gobernanza.
- **IA generativa y agentes:** Azure AI Foundry, SDK vigente, prompts, agentes, herramientas, orquestación, grounding/RAG, evaluación, seguridad y operación.
- **Visión:** elegir la capacidad adecuada para imágenes/vídeo y reconocer las tareas, entradas y salidas de los servicios pertinentes.
- **Análisis de texto:** clasificación de texto, análisis de sentimiento, entidades y otras tareas incluidas en la guía oficial vigente.
- **Extracción de información:** ingestión y análisis de documentos, OCR, extracción estructurada y las tareas indicadas en la guía oficial vigente.

**Regla de precisión:** nombres de clases, paquetes, parámetros y servicios pueden cambiar entre versiones del SDK. Antes de memorizar una línea de código, comprueba que coincide con la documentación oficial actual y con el escenario preguntado. Evita reglas absolutas del banco (por ejemplo, “siempre”, “nunca” o “obligatorio”) si la documentación no las establece explícitamente.

## 3. Plan de siete días (11–17 de octubre)

### Día 1 — Diagnóstico y mapa (11 oct.)
- Haz un bloque mixto cronometrado sin consultar apuntes.
- Etiqueta cada error por uno de los cinco dominios oficiales y por causa: concepto, elección de servicio, SDK/código o lectura apresurada.
- No cuentes como dominio dominado una respuesta acertada por adivinación.

### Día 2 — Generative AI y agentes (12 oct.)
- Dedica el mayor bloque de estudio a este dominio (30–35 %).
- Practica escenarios que obliguen a escoger entre herramientas, RAG/búsqueda, llamadas a funciones, orquestación, evaluación y medidas de seguridad.
- Explica en voz alta por qué las otras opciones no resuelven el requisito.

### Día 3 — Planificación y administración (13 oct.)
- Repasa arquitectura, selección de servicios/modelos, identidad/RBAC, configuración, despliegue, observabilidad, evaluación, costes y gobernanza.
- Practica decisiones de producción: requisitos → servicio → identidad/permisos → monitorización/seguridad.

### Día 4 — Visión (14 oct.)
- Estudia tareas y servicios del alcance oficial de visión.
- Haz preguntas basadas en el tipo de entrada y el resultado requerido; no memorices nombres sin saber cuándo aplican.

### Día 5 — Análisis de texto y extracción de información (15 oct.)
- Separa análisis de texto de extracción de información: son dominios oficiales distintos.
- Practica las tareas de análisis de texto y extracción de información enumeradas en la guía vigente.

### Día 6 — Simulacro completo y reparación (16 oct.)
- Haz un simulacro cronometrado, sin ayuda ni pausas no permitidas por el formato elegido.
- Revisa todas las respuestas incorrectas y las acertadas con baja confianza.
- Repite solo esos temas hasta poder justificar la decisión.

### Día 7 — Repaso ligero (17 oct.)
- Escucha tarjetas de audio y repasa una hoja breve por dominio.
- Practica las trampas de lectura y las diferencias entre servicios parecidos.
- No intentes aprender un bloque enorme nuevo la víspera. Duerme y confirma horario, identificación y logística del examen.

**Si tu fecha real de examen es distinta, desplaza los días manteniendo el orden.** No des por hecho que la fecha del voucher y la fecha de reserva del examen son la misma.

## 4. Protocolo para cada pregunta

1. Identifica el requisito principal y las restricciones del escenario.
2. Decide qué dominio oficial evalúa.
3. Descarta opciones que no cumplen un requisito explícito.
4. Comprueba si la pregunta trata de capacidad del servicio, configuración, identidad, código o gobernanza.
5. Después de responder, lee la explicación y resume la regla en una frase.
6. Si dudas de un nombre de API o parámetro, contrástalo con la documentación oficial enlazada; marca el ítem para revisión en vez de memorizarlo como verdad.

## 5. Criterio para medir preparación

Registra por separado:
- porcentaje correcto por dominio oficial;
- porcentaje correcto en preguntas nuevas/no memorizadas;
- errores repetidos;
- respuestas correctas con baja confianza;
- capacidad de explicar por qué las alternativas son incorrectas.

Una buena puntuación en preguntas ya vistas no basta por sí sola para estimar el resultado real. Busca resultados estables en simulacros mixtos y prioriza el dominio de mayor peso sin abandonar los otros tres dominios de menor peso.

## 6. Fuentes oficiales

- [AI-103 study guide — skills measured](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103)
- [Azure AI Apps and Agents Developer Associate](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/)
- [Microsoft Learn — Browse training](https://learn.microsoft.com/en-us/training/browse/)

