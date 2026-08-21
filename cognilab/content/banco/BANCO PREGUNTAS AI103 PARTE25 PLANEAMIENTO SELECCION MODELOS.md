# BANCO DE PREGUNTAS AI-103 — PARTE 25 (Q1954-Q1993)
## Domain 1 (real): Plan and Manage an Azure AI Solution — planeamiento del proyecto, catálogo de modelos, pruebas comparativas, implementación y evaluación
### Generado: 2026-08-21 | Fuente: módulos MS Learn "Planeamiento y preparación para desarrollar soluciones de inteligencia artificial en Azure" y "Selección, implementación y evaluación de modelos de Microsoft Foundry"

---

### Q1954
**¿Cuáles son las cinco categorías amplias de funcionalidades de inteligencia artificial que un desarrollador puede identificar al planear una solución, según el módulo?**

A) IA generativa y agentes, procesamiento de lenguaje natural (NLP), voz del equipo, visión por computadora, y extracción de información ✅
B) Frontend, Backend, Base de datos, DevOps y Seguridad
C) Solo IA generativa y Computer Vision; las demás no se consideran categorías separadas
D) Aprendizaje supervisado, no supervisado, por refuerzo, profundo y federado

**Explicación:** El módulo estructura las capacidades comunes de IA en cinco categorías: IA generativa/agentes (LLM que generan respuestas y automatizan tareas), NLP (técnicas estadísticas para análisis de texto, de donde evolucionaron los LLM modernos), voz del equipo (reconocimiento/síntesis), Computer Vision (interpretar imágenes/video), y extracción de información (combinar las anteriores para extraer datos de documentos/formularios/medios). Identificar cuáles necesita la aplicación ayuda a determinar qué servicios de IA aprovisionar.

---

### Q1955
**Dentro de un proyecto de Microsoft Foundry, ¿qué relación existe entre un recurso Foundry y sus proyectos, y qué rol cumple el "proyecto predeterminado"?**

A) Un recurso Foundry solo puede tener exactamente un proyecto, sin excepciones
B) Un recurso Foundry puede admitir uno o varios proyectos secundarios; uno de ellos se designa como el proyecto predeterminado (típicamente el primero creado) ✅
C) Los proyectos existen de forma independiente de cualquier recurso Foundry
D) El proyecto predeterminado es el único que puede acceder a los modelos del catálogo; los demás proyectos requieren un recurso separado

**Explicación:** El módulo describe la jerarquía: un recurso de Microsoft Foundry en Azure proporciona proceso, almacenamiento, herramientas de IA y otros servicios; puede alojar uno o varios proyectos secundarios (donde se gestionan conexiones, datos y código de una solución específica), y uno de esos proyectos queda marcado como predeterminado del recurso.

---

### Q1956
**¿Cuáles son los cuatro tipos de recursos que un desarrollador administra dentro de un proyecto de Microsoft Foundry, según el módulo?**

A) Máquinas virtuales, Contenedores, Redes y Almacenamiento
B) Repositorios, Pipelines, Artefactos y Releases
C) Modelos, Agentes, Herramientas y Conocimiento ✅
D) Usuarios, Roles, Políticas y Auditorías

**Explicación:** El módulo enumera explícitamente estos cuatro tipos de recursos gestionados a nivel de proyecto: Modelos (implementaciones del catálogo Foundry Models), Agentes (configuraciones de IA con nombre que encapsulan un LLM + instrucciones + herramientas), Herramientas (integradas, MCP de terceros, o Foundry Tools para tareas comunes), y Conocimiento (conexión a almacenes de conocimiento, simplificada mediante Foundry IQ con una conexión MCP central).

---

### Q1957
**¿Cuáles de las siguientes son Foundry Tools mencionadas explícitamente en el módulo, y qué distingue a Content Understanding del resto?**

A) Solo existe una Foundry Tool: Azure Language; las demás son servicios completamente separados fuera de Foundry
B) Azure Speech es la única Foundry Tool; el resto son parte del SDK de OpenAI
C) Document Intelligence y Content Understanding son exactamente el mismo servicio con dos nombres distintos
D) Azure Language, Azure Speech, Azure Translator y Document Intelligence extraen o procesan texto/voz/documentos específicos; Content Understanding es la única multimodal, capaz de extraer datos de formularios, documentos, imágenes, video y audio combinados ✅

**Explicación:** El módulo lista Azure Language (análisis de texto: entidades, sentimiento, resumen), Azure Speech (voz a texto, texto a voz, voz en vivo), Azure Translator (traducción de texto multilenguaje) y Document Intelligence (extracción de campos de documentos como facturas/recibos/formularios) como herramientas especializadas en una modalidad; Content Understanding se distingue por ser explícitamente multimodal, combinando análisis de formularios, documentos, imágenes, video y audio en un solo servicio.

---

### Q1958
**TRAMPA: Un desarrollador afirma que "Foundry Tools" y "Azure AI Services" son productos completamente distintos y no relacionados. ¿Por qué es esto incorrecto según la nota del módulo?**

A) El módulo aclara que las Foundry Tools se llamaban anteriormente Azure AI Services, y antes de eso Azure Cognitive Services — son el mismo conjunto de servicios con nombres históricos distintos, y algunas API/SDK aún reflejan esos nombres antiguos ✅
B) Es correcto; nunca han estado relacionados en ningún momento
C) Son distintos porque Azure AI Services nunca pudo aprovisionarse como recurso individual fuera de un recurso Foundry
D) Son distintos porque Foundry Tools no admite autenticación por clave, solo Azure AI Services

**Explicación:** El módulo incluye una nota explícita de historial de nombres: "Anteriormente, las herramientas de Azure se denominaban Azure AI Services y antes de eso, Azure Cognitive Services." Esto es relevante para el examen porque cierta documentación, SDKs y nombres de API todavía usan la nomenclatura antigua, aunque para proyectos nuevos se recomienda usar las herramientas provistas dentro de un recurso de Microsoft Foundry.

---

### Q1959
**¿Qué cinco tareas puede realizar un desarrollador directamente desde el portal de Microsoft Foundry, según el módulo?**

A) Solo desplegar modelos; todo lo demás requiere el SDK
B) Buscar/comparar/implementar/probar modelos, crear y probar agentes, crear conexiones MCP a herramientas y Foundry IQ, explorar/probar Foundry Tools, y administrar configuración de recursos/acceso de usuarios (además de obtener endpoints y claves) ✅
C) Solo administrar facturación y cuotas de Azure
D) Solo escribir y depurar código Python directamente en el navegador

**Explicación:** El módulo enumera estas capacidades del portal explícitamente, describiéndolo como el punto de partida habitual para la mayoría de proyectos de desarrollo de IA — desde exploración de modelos hasta gestión de acceso — mientras que la automatización de estas mismas operaciones vía scripts o CI/CD se logra con el SDK de Microsoft Foundry.

---

### Q1960
**¿Qué distingue a las capacidades de la extensión "Foundry Toolkit para Visual Studio Code" frente a trabajar únicamente en el portal web?**

A) No hay diferencia funcional alguna entre ambos
B) Solo permite ver el código fuente de los modelos, sin poder implementarlos ni probarlos
C) Permite examinar/administrar recursos del proyecto, implementar modelos del catálogo, probar modelos/agentes en áreas de juegos integradas, configurar agentes con un diseñador visual y archivos YAML, y generar código de integración — todo sin salir del entorno de desarrollo ✅
D) Reemplaza por completo la necesidad del portal de Foundry; el portal queda obsoleto tras instalar la extensión

**Explicación:** El módulo presenta esta extensión como una forma de llevar las tareas clave del flujo de trabajo de Foundry (que de otro modo requerirían cambiar al navegador) directamente a VS Code — útil dado que, según el módulo, los desarrolladores "también son propensos a pasar mucho tiempo en Visual Studio Code" además del portal.

---

### Q1961
**¿Cuáles son las tres opciones principales de API/SDK que el módulo recomienda planear al compilar soluciones de IA en Azure, y qué distingue a cada una?**

A) Solo existe una opción: el SDK de Microsoft Foundry; las demás no son compatibles con Foundry
B) React, Angular y Vue; la elección de framework de frontend determina qué SDK de IA se puede usar
C) .NET, Java y Go exclusivamente; Python no es compatible con ningún SDK de Foundry
D) El SDK de Microsoft Foundry (conecta a proyectos Foundry y accede a recursos específicos como agentes y Foundry IQ), la API de OpenAI (para aplicaciones de chat basadas en modelos Foundry con sintaxis OpenAI), y los SDK de Foundry Tools (bibliotecas específicas por lenguaje para los servicios de IA individuales) — además de la opción de usar las API REST directamente ✅

**Explicación:** El módulo distingue estas tres vías de acceso programático como planeamiento necesario: el SDK de Foundry para funcionalidad específica de proyecto (agentes, Foundry IQ), el SDK/API de OpenAI para compatibilidad con la sintaxis estándar de OpenAI en modelos Foundry, y los SDK específicos de cada Foundry Tool — con la API REST siempre disponible como alternativa de bajo nivel a cualquiera de los SDK.

---

### Q1962
**Según el módulo de IA responsable, ¿por qué se enfatiza que "las herramientas por sí solas no son suficientes para garantizar la equidad"?**

A) Porque la equidad debe considerarse desde el inicio del proceso de desarrollo — revisando cuidadosamente los datos de entrenamiento para representatividad y evaluando el rendimiento predictivo en subsecciones de la población a lo largo de todo el ciclo de vida — no solo aplicando una herramienta de medición al final ✅
B) Porque no existen herramientas de software para evaluar la equidad en modelos de aprendizaje automático
C) Porque las herramientas de equidad solo funcionan con modelos de visión por computadora, no con modelos de lenguaje
D) Porque la equidad es un concepto legal, no técnico, y no puede evaluarse mediante software

**Explicación:** El módulo hace explícita esta distinción: existen soluciones de software para evaluar/cuantificar/mitigar la injusticia, pero la equidad real requiere una práctica continua — revisión de datos de entrenamiento y evaluación por subgrupo a lo largo del ciclo de vida de desarrollo — no un chequeo puntual con una herramienta.

---

### Q1963
**Un sistema de IA para diagnóstico médico y un vehículo autónomo se citan como ejemplos del pilar de "Confiabilidad y seguridad". ¿Qué dos prácticas concretas señala el módulo como necesarias para estos sistemas de alto riesgo?**

A) Ninguna práctica adicional; el aprendizaje automático es inherentemente confiable una vez entrenado
B) Procesos rigurosos de pruebas y administración de implementación antes del lanzamiento, y aplicar umbrales adecuados al evaluar las puntuaciones de confianza de las predicciones (dada la naturaleza probabilística de los modelos) ✅
C) Solo se requiere aumentar el tamaño del modelo; modelos más grandes son automáticamente más confiables
D) Contratar un equipo legal externo antes de cualquier despliegue, sin ningún requisito técnico adicional

**Explicación:** El módulo señala que, dado el riesgo considerable para la vida humana en sistemas como diagnóstico médico o conducción autónoma, se necesitan procesos rigurosos de prueba/implementación (como cualquier software crítico) MÁS una consideración específica de IA: la naturaleza probabilística del modelo obliga a definir umbrales de confianza apropiados antes de actuar sobre una predicción.

---

### Q1964
**Según la evaluación oficial del módulo, ¿qué portal web se debe usar para trabajar con recursos en un proyecto de Microsoft Foundry?**

A) Portal de Azure
B) Microsoft Copilot
C) Portal de Microsoft Foundry ✅
D) GitHub

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo: aunque los recursos de Foundry se aprovisionan como recursos de Azure (y por tanto son visibles en el portal de Azure a nivel de infraestructura), el trabajo diario con proyectos, modelos, agentes y herramientas ocurre en el portal de Microsoft Foundry, diseñado específicamente para ese flujo de trabajo.

---

### Q1965
**Según la evaluación oficial del módulo, ¿qué componente de Microsoft Foundry proporciona servicios precompilados para tareas comunes de inteligencia artificial?**

A) Modelos de fundición (Foundry Models)
B) Foundry IQ
C) Azure AI Search
D) Herramientas de fundición (Foundry Tools) ✅

**Explicación:** Esta es la respuesta oficial: Foundry Tools son específicamente las APIs y modelos precompilados "listos para usar" para tareas comunes (análisis de texto, voz, traducción, documentos) — a diferencia de Foundry Models (el catálogo general de LLM que hay que implementar y usar directamente), Foundry IQ (que centraliza conexiones de conocimiento para agentes, no tareas de IA precompiladas) o Azure AI Search (un servicio de indexación/recuperación, no un componente de Foundry Tools).

---

### Q1966
**Según la evaluación oficial del módulo, ¿qué extensión se debe usar en Visual Studio Code para trabajar con proyectos Foundry?**

A) Conjunto de herramientas Foundry (Foundry Toolkit) para Visual Studio Code ✅
B) Extensión de Python para Visual Studio Code
C) GitHub Copilot
D) Extensión de Docker para Visual Studio Code

**Explicación:** Esta es la respuesta oficial: aunque la extensión de Python es necesaria para el desarrollo general en Python y GitHub Copilot mejora la productividad general del desarrollador, la extensión diseñada específicamente para examinar/administrar recursos de un proyecto Foundry (modelos, agentes, conexiones, almacenes de vectores) desde VS Code es Foundry Toolkit — la extensión de Docker no tiene relación con proyectos Foundry.

---

### Q1967
**En el ejercicio del módulo, tras desplegar el modelo `gpt-5.2` y ver el punto de conexión del recurso Foundry, se menciona explícitamente que "en la mayoría de los escenarios de producción" debería preferirse una alternativa a la autenticación por clave. ¿Cuál?**

A) Autenticación básica HTTP con usuario y contraseña
B) Autenticación de Microsoft Entra ID, basada en identidades autenticadas de usuario y de aplicación ✅
C) Un token JWT generado manualmente sin relación con Azure AD
D) Ninguna; la autenticación por clave es siempre la opción recomendada, sin excepciones

**Explicación:** El ejercicio señala explícitamente, al mostrar la clave del recurso: "aunque en la mayoría de los escenarios de producción debería considerar usar la autenticación de Microsoft Entra ID basada en identidades autenticadas de usuario y de aplicación" — el mismo patrón de recomendación de credenciales gestionadas visto consistentemente en todos los servicios de Foundry Tools.

---

### Q1968
**Según el ejercicio del módulo, ¿para qué se usa específicamente el "punto de conexión del proyecto" (project endpoint), a diferencia del "punto de conexión de OpenAI"?**

A) Ambos son idénticos y completamente intercambiables en cualquier escenario
B) El punto de conexión de OpenAI es exclusivo para modelos de Meta y Mistral; el de proyecto es exclusivo para modelos de Azure OpenAI
C) El punto de conexión del proyecto se usa para acceder a modelos provistos directamente en Foundry (incluidos modelos OpenAI) mediante la API de respuestas de OpenAI, y para acceder a API específicas de Foundry (como el servicio de agentes); el punto de conexión de OpenAI se usa para acceder a modelos mediante las API de OpenAI, incluida la API de Chat Completions y la API de respuestas ✅
D) El punto de conexión del proyecto solo sirve para facturación; toda la inferencia ocurre por el punto de conexión de OpenAI

**Explicación:** El ejercicio distingue estos dos endpoints explícitamente: el project endpoint da acceso a funcionalidades específicas de Foundry (como el servicio de agentes) además de modelos vía la Responses API; el OpenAI endpoint da acceso más amplio a las API estándar de OpenAI (Chat Completions Y Responses), útil cuando se quiere compatibilidad directa con código escrito para la API de OpenAI sin modificaciones específicas de Foundry.

---

### Q1969
**¿Cuáles son las dos categorías amplias en las que se organiza el catálogo de modelos de Foundry, según el módulo de selección de modelos?**

A) Modelos gratuitos y modelos de pago; no existe ninguna otra clasificación
B) Modelos de texto y modelos de imagen; la voz y el video no forman parte del catálogo
C) Modelos certificados por Microsoft y modelos experimentales sin garantías
D) Modelos Foundry vendidos directamente por Azure (facturados vía la suscripción de Azure, incluyendo Azure OpenAI y otros de Microsoft) y Foundry Models de partners y comunidad (proporcionados por terceros de confianza, cada uno con sus propias licencias y precios) ✅

**Explicación:** Esta es la distinción explícita del módulo sobre la estructura del catálogo (más de 1900 modelos): unos se venden y facturan directamente a través de Azure (Microsoft y otros proveedores integrados), mientras que otros provienen de socios y la comunidad, cada uno con su propio modelo de licenciamiento y precio — relevante porque estos últimos suelen requerir aceptar términos de Azure Marketplace antes de implementarse.

---

### Q1970
**¿Qué diferencia principal existe entre los "Modelos de lenguaje grandes" (LLM, como GPT-5 o Llama 3 70B) y los "Modelos de lenguaje pequeños" (SLM, como Phi-4 o Llama 3 8B) según el módulo?**

A) Los LLM están diseñados para razonamiento profundo, contenido complejo y amplia comprensión de contexto (requiriendo más recursos computacionales); los SLM ofrecen eficiencia y rentabilidad para tareas comunes de NLP, priorizando velocidad y costo sobre razonamiento complejo, y pueden ejecutarse en dispositivos perimetrales o hardware de gama baja ✅
B) Los SLM son simplemente versiones más antiguas y obsoletas de los LLM, sin ninguna ventaja práctica
C) Los LLM solo pueden ejecutarse en la nube; los SLM solo pueden ejecutarse localmente, sin ninguna opción de despliegue en Azure
D) No hay diferencia real de capacidades; el nombre solo refleja el tamaño del archivo de descarga del modelo

**Explicación:** El módulo describe este trade-off explícitamente: los LLM sobresalen en aplicaciones sofisticadas a costa de más cómputo; los SLM sacrifican algo de capacidad de razonamiento complejo a cambio de velocidad, costo y la posibilidad de ejecutarse en hardware más modesto (incluyendo dispositivos perimetrales) — la elección depende de si la aplicación prioriza sofisticación o eficiencia/latencia.

---

### Q1971
**Además de los modelos de finalización de chat estándar, el módulo menciona "modelos de razonamiento" (como Claude Opus 4.6) para tareas complejas. ¿Qué los distingue?**

A) Son idénticos a los modelos de chat estándar; el nombre es solo una etiqueta de marketing
B) Proporcionan capacidades mejoradas de resolución de problemas en tareas como matemáticas, codificación, ciencia, estrategia y logística, pudiendo desglosar problemas complejos y mostrar su proceso de razonamiento ✅
C) Solo pueden usarse para generación de imágenes, nunca para texto
D) Requieren obligatoriamente fine-tuning antes de poder usarse en cualquier escenario

**Explicación:** El módulo distingue los modelos de razonamiento de los modelos de chat de propósito general precisamente por su capacidad de exponer y desglosar el proceso de resolución de un problema complejo paso a paso, en vez de simplemente producir una respuesta directa — relevante para escenarios donde el "cómo" del razonamiento importa tanto como el resultado final.

---

### Q1972
**¿Qué tipo de modelo especializado del catálogo usarías para convertir texto en representaciones numéricas que permitan búsqueda semántica y RAG?**

A) Modelos de generación de imágenes, como GPT-image-1
B) Modelos de generación de video, como Sora 2
C) Modelos de inserción (embedding), como Ada o Cohere ✅
D) Modelos de análisis de imágenes, como GPT-4.1

**Explicación:** El módulo describe los modelos de embedding específicamente para este propósito: convertir texto en representaciones numéricas (vectores) que permiten encontrar información por significado en vez de coincidencia exacta de palabras clave — la base técnica de la búsqueda semántica, los sistemas de recomendación y los pipelines de RAG.

---

### Q1973
**TRAMPA: Un equipo necesita analizar automáticamente imágenes junto con texto (por ejemplo, "describe qué hay en esta foto y responde esta pregunta sobre ella") y asume que necesita un "modelo de generación de imágenes" para esto. ¿Por qué es incorrecto?**

A) Es correcto; cualquier modelo relacionado con imágenes sirve indistintamente para generar o analizar
B) Ninguno de los dos tipos de modelo puede procesar imágenes; solo Content Understanding puede hacerlo
C) El error es que se necesita un modelo de generación de video, no de imágenes, para cualquier tarea con contenido visual
D) Los modelos de GENERACIÓN de imágenes (como GPT-image-1) crean imágenes a partir de texto; para ACEPTAR imágenes como entrada y generar una respuesta en lenguaje natural sobre ellas se necesita un modelo de ANÁLISIS de imágenes con entrada bidireccional (como GPT-4.1), una categoría distinta en el catálogo ✅

**Explicación:** El catálogo distingue direcciones de flujo distintas: generación de imágenes (texto → imagen) y análisis de imágenes (imagen + texto → texto, con entrada "bidireccional" que combina ambas modalidades) son categorías de modelo separadas con casos de uso opuestos — confundirlas lleva a elegir el modelo equivocado para la tarea.

---

### Q1974
**¿Qué miden específicamente las pruebas comparativas de CALIDAD en el portal de Microsoft Foundry, y en qué escala se reportan?**

A) El grado en que un modelo genera respuestas precisas, coherentes y contextualmente adecuadas, usando conjuntos de datos estandarizados (como MMLU-Pro, HumanEval+, MATH, GPQA); las puntuaciones son índices normalizados de 0 a 1, donde valores más altos indican mejor rendimiento ✅
B) La velocidad de respuesta del modelo en milisegundos
C) Únicamente el costo por token de cada modelo
D) El número de parámetros del modelo, medido en miles de millones

**Explicación:** El módulo describe el índice de calidad como el promedio de puntuaciones de precisión en varios conjuntos de datos estandarizados que evalúan razonamiento, conocimiento, matemáticas y codificación (entre otros) — normalizados en una escala de 0 a 1, donde más alto es mejor, permitiendo comparar modelos de forma objetiva en tareas de lenguaje de propósito general.

---

### Q1975
**Este código evalúa dos modelos con la misma pregunta en el área de juegos:
```
Prompt: "I have a fox, a chicken, and a bag of grain that I need to take
over a river in a boat. I can only take one thing at a time. If I leave
the chicken and the grain unattended, the chicken will eat the grain.
If I leave the fox and the chicken unattended, the fox will eat the
chicken. How can I get all three things across the river without
anything being eaten?"
Follow-up: "Explain your reasoning."
```
¿Qué característica del área de juegos de Foundry permite comparar las respuestas de `gpt-5.2` y `gpt-5-mini` a este mismo prompt lado a lado?**

A) La pestaña Código, que solo muestra ejemplos de integración, no respuestas de chat
B) La vista de comparación en paralelo del área de juegos, que abre paneles de chat separados para cada modelo seleccionado en la lista "Compare models" ✅
C) La biblioteca del evaluador, que solo funciona con conjuntos de datos precargados
D) No existe tal característica; cada modelo debe probarse en una sesión de navegador completamente separada

**Explicación:** El ejercicio del módulo usa exactamente este acertijo lógico (el clásico problema del zorro, la gallina y el grano) para ilustrar la vista de comparación en paralelo: seleccionar un modelo en el área de juegos y agregar otro en la lista "Compare models" abre paneles de chat lado a lado, permitiendo enviar el mismo prompt (y el follow-up "Explain your reasoning") a ambos y comparar directamente precisión, calidad de razonamiento y estilo de respuesta.

---

### Q1976
**¿Qué mide específicamente la prueba comparativa HarmBench dentro de las métricas de seguridad, y cómo se interpreta su resultado (la tasa de éxito de ataques, ASR)?**

A) Mide la velocidad de inferencia del modelo; valores más altos de ASR indican un modelo más rápido
B) Mide cuántos idiomas admite el modelo simultáneamente
C) Mide la resistencia del modelo a generar contenido no seguro, probando comportamientos dañinos estándar, comportamientos contextualmente dañinos e infracciones de derechos de autor; valores MÁS BAJOS de tasa de éxito de ataques (ASR) indican un modelo más seguro y sólido ✅
D) Mide el costo estimado de ejecutar el modelo en producción

**Explicación:** HarmBench evalúa la resistencia del modelo ante intentos deliberados de provocar contenido dañino en tres áreas (ciberdelincuencia/actividades ilegales/daño general; desinformación/hostigamiento/acoso; reproducción de material protegido). El resultado se expresa como tasa de éxito de ataques (ASR): cuanto MÁS BAJA sea esa tasa, más resistente (seguro) es el modelo — un ASR alto significa que los intentos de ataque tuvieron éxito con frecuencia.

---

### Q1977
**TRAMPA: Un equipo interpreta que una puntuación WMDP más alta significa que un modelo es "más seguro" por analogía con otras métricas de seguridad donde más alto es mejor. ¿Por qué esta interpretación es incorrecta?**

A) Es correcta; WMDP funciona exactamente igual que ToxiGen, donde más alto siempre es mejor
B) WMDP no es una métrica real mencionada en el módulo
C) WMDP mide exclusivamente el costo de ejecución del modelo, sin relación con seguridad
D) WMDP mide el CONOCIMIENTO del modelo sobre funcionalidades potencialmente peligrosas (bioseguridad, ciberseguridad, seguridad química) — una puntuación WMDP más alta indica que el modelo posee MÁS conocimiento de esas capacidades peligrosas, lo cual es una señal de riesgo, no de seguridad ✅

**Explicación:** Esta es una trampa de interpretación real: a diferencia de ToxiGen (donde una puntuación F1 más alta SÍ indica mejor detección de contenido tóxico, es decir, más seguro) o HarmBench (donde ASR más BAJO es mejor), WMDP mide directamente cuánto "sabe" el modelo sobre capacidades peligrosas — por lo que una puntuación alta es una señal de alerta sobre el conocimiento potencialmente peligroso que el modelo podría exponer, no una validación de seguridad.

---

### Q1978
**¿Cómo se calcula el "costo estimado" que se usa para comparar modelos en una sola cifra, según el módulo?**

A) Combinando el costo de tokens de entrada y de salida mediante una relación típica de 3:1 (tres tokens de entrada por cada token de salida) ✅
B) Sumando el costo por token de entrada y el costo por token de salida en partes iguales (relación 1:1)
C) Multiplicando el número de parámetros del modelo por su latencia media
D) Usando exclusivamente el costo de los tokens de salida, ignorando el costo de entrada

**Explicación:** El módulo especifica esta fórmula explícitamente: el costo estimado combina el precio de tokens de entrada y salida asumiendo una proporción típica de 3:1 (tres tokens de entrada por cada token de salida generado), produciendo una única cifra comparable entre modelos en vez de tener que comparar dos precios separados para cada uno.

---

### Q1979
**¿Qué diferencia hay entre "Latencia P50" y "Latencia P99" como métricas de rendimiento de un modelo?**

A) Son la misma métrica con dos nombres distintos
B) P50 (mediana) indica que el 50% de las solicitudes se completan más rápido que ese tiempo; P99 indica que el 99% se completan más rápido que ese tiempo — P99 captura el comportamiento en el peor caso (colas de latencia), mientras P50 refleja la experiencia "típica" ✅
C) P50 mide solo solicitudes exitosas; P99 mide solo solicitudes fallidas
D) P99 es siempre un valor menor que P50, ya que "99" implica mayor velocidad

**Explicación:** Los percentiles de latencia describen la distribución completa del tiempo de respuesta, no solo un promedio: P50 es la mediana (la experiencia típica de la mitad de las solicitudes), mientras que percentiles altos como P99 revelan qué tan malo puede ser el peor 1% de los casos — crítico para aplicaciones en tiempo real donde una cola larga de latencia degrada la experiencia de usuarios específicos aunque el promedio se vea bien.

---

### Q1980
**¿Qué tipo de implementación de Microsoft Foundry ofrece un descuento del 50% a cambio de procesar trabajos de forma asíncrona dentro de un plazo de 24 horas?**

A) Estándar global (pago por token, sin descuento por lote)
B) Aprovisionada global (PTU reservadas)
C) Batch global ✅
D) Desarrollador (solo para evaluación de modelos ajustados)

**Explicación:** El módulo describe las implementaciones Batch globales explícitamente con este trade-off: 50% de descuento sobre el precio estándar, a cambio de que los trabajos se procesen de forma asíncrona (no en tiempo real) dentro de una ventana de 24 horas — ideal para cargas de trabajo de gran volumen donde la latencia inmediata no es crítica, como procesamiento nocturno por lotes.

---

### Q1981
**Un equipo en la Unión Europea necesita que los datos de sus solicitudes de inferencia permanezcan dentro de una zona de datos específica de la UE, sin comprometerse a un volumen de tráfico predecible que justifique reservar capacidad. ¿Qué tipo de implementación es la más apropiada?**

A) Estándar global, ya que puede usar cualquier región de Azure sin restricción
B) Aprovisionada regional (Regional Provisioned), ya que reserva PTU dentro de una única región
C) Desarrollador, ya que es la única opción compatible con requisitos de residencia de datos
D) Estándar de zona de datos (Data Zone Standard), que garantiza que los datos permanezcan dentro de una zona de datos específica, con facturación de pago por token ✅

**Explicación:** Este escenario combina dos requisitos: cumplimiento de zona de datos (UE) y facturación flexible sin compromiso de capacidad reservada (pago por token, no PTU). La implementación Estándar de zona de datos cumple exactamente ambos: garantiza la residencia de datos dentro de la zona (a diferencia de Estándar global, que puede usar cualquier región), sin exigir el compromiso de una implementación aprovisionada (PTU reservadas).

---

### Q1982
**Al implementar un modelo del catálogo que proviene de un socio o de la comunidad (no vendido directamente por Azure), ¿qué paso adicional aparece en el proceso de implementación que NO aparece para modelos como `gpt-4o-mini`?**

A) La aceptación de los términos de una suscripción de Azure Marketplace, ya que es común para modelos de partners y comunidad — los modelos vendidos directamente por Azure (como los modelos Azure OpenAI) no requieren esta suscripción ✅
B) Ningún paso adicional; el proceso es idéntico para todos los modelos del catálogo sin excepción
C) Un paso de aprobación manual por parte del soporte técnico de Microsoft, exclusivo para modelos de terceros
D) La configuración obligatoria de una SKU de máquina virtual, incluso para implementaciones que no usan cómputo administrado

**Explicación:** El módulo señala esta distinción explícitamente en el flujo de implementación: si el modelo requiere una suscripción de Azure Marketplace (típico de modelos de socios/comunidad), aparecen los términos de uso que hay que aceptar antes de continuar; los modelos vendidos directamente por Azure (como los modelos Azure OpenAI) omiten ese paso por completo.

---

### Q1983
**¿Qué representa exactamente el "Nombre de implementación" (deployment name) configurado al desplegar un modelo, y dónde se usa después?**

A) Es solo una etiqueta descriptiva sin ningún efecto funcional en el código de la aplicación
B) Es el identificador que el código de la aplicación usa en el parámetro `model` de las solicitudes de API para enrutar la solicitud a esa implementación específica — permite tener varias implementaciones del mismo modelo base con nombres distintos ✅
C) Determina automáticamente la región de Azure donde se aprovisiona el modelo
D) Solo tiene efecto si se usa cómputo administrado; en las demás implementaciones se ignora

**Explicación:** El módulo aclara que, aunque por defecto el sistema usa el nombre del modelo, este nombre se puede personalizar para crear implementaciones con nombres significativos — y es precisamente ese nombre (no el nombre del modelo base) el que el código de la aplicación debe pasar en el parámetro `model` de cada solicitud de inferencia para que se enrute correctamente.

---

### Q1984
**¿Cuáles son las tres piezas de información que una aplicación cliente necesita, según el módulo, para acceder programáticamente a un modelo implementado?**

A) Solo la clave de autenticación; el resto se infiere automáticamente
B) El ID de suscripción de Azure, el nombre del grupo de recursos, y la región
C) La URL del punto de conexión, la clave de autenticación (o credencial de Entra ID), y el nombre de implementación usado en el parámetro `model` de las solicitudes ✅
D) El nombre del proyecto de Foundry, la versión del SDK, y el sistema operativo del servidor

**Explicación:** El módulo enumera estas tres piezas explícitamente como lo que la aplicación necesita extraer de los detalles de implementación: la URL del endpoint (a la que se envían las solicitudes), la credencial de autenticación (clave o token de Entra ID), y el nombre de implementación (que identifica a qué modelo desplegado enrutar cada solicitud).

---

### Q1985
**Según el módulo, ¿qué distingue a la "revisión estructurada" dentro de la evaluación manual, frente a las "pruebas interactivas" en el área de juegos?**

A) Son exactamente el mismo proceso con nombres distintos
B) La revisión estructurada es completamente automatizada, sin ningún revisor humano involucrado
C) Las pruebas interactivas solo pueden hacerse después de completar la revisión estructurada, nunca antes
D) La revisión estructurada usa un conjunto de casos de prueba representativos evaluados sistemáticamente por revisores humanos según criterios definidos (Relevancia, Información, Engagement, Precisión, Seguridad) con escalas de clasificación (1-5); las pruebas interactivas son exploración cualitativa libre de comportamiento del modelo, sin un conjunto de criterios formal ✅

**Explicación:** El módulo distingue estos dos enfoques de evaluación manual: las pruebas interactivas son exploración libre y cualitativa (probar prompts y observar respuestas para detectar problemas informalmente), mientras que la revisión estructurada formaliza el proceso con un conjunto de casos de prueba fijo y cinco criterios explícitos calificados en una escala numérica, produciendo medidas cuantitativas agregadas de calidad general.

---

### Q1986
**¿Qué significa que "Groundedness Pro ofrece una evaluación binaria", y qué mide la métrica de Base/Groundedness en general?**

A) Groundedness mide si las respuestas del modelo están basadas en el contexto proporcionado (en vez de especulación); la variante "Pro" da un resultado binario (fundamentada / no fundamentada), útil cuando se requiere precisión fáctica estricta en vez de una puntuación graduada ✅
B) Mide la velocidad de respuesta del modelo; binaria significa que solo puede ser "rápido" o "lento"
C) Mide si el modelo puede procesar tanto texto como imágenes simultáneamente
D) Es una métrica exclusiva para evaluar modelos de generación de imágenes, no aplicable a texto

**Explicación:** Groundedness es una de las métricas de calidad de generación del módulo: evalúa si la respuesta realmente se apoya en el contexto dado (por ejemplo, documentos recuperados en un pipeline RAG) en vez de "inventar" información. La variante Pro simplifica el resultado a una clasificación binaria (fundamentada/no fundamentada), en vez de una puntuación en escala, cuando el caso de uso exige ese criterio estricto.

---

### Q1987
**¿Cómo se calcula la "tasa de defectos" para las métricas de riesgo y contenido dañino (como contenido violento o sexual), según el módulo?**

A) Es siempre igual al número absoluto de respuestas dañinas detectadas, sin normalizar por el total
B) El porcentaje de respuestas que superan un umbral de gravedad determinado (normalmente medio) ✅
C) Se calcula exclusivamente mediante una fórmula de latencia, sin relación con el contenido de las respuestas
D) Es un valor fijo predefinido por Microsoft que no varía según el modelo evaluado

**Explicación:** El módulo especifica esta fórmula para las métricas de daño de contenido (autolesión, odio/injusticia, violencia, contenido sexual): se agregan como tasa de defectos, es decir, el porcentaje de respuestas evaluadas que superan un umbral de gravedad (típicamente "medio") — distinta de la fórmula usada para material protegido y ataque indirecto, que es (instancias verdaderas / instancias totales) × 100.

---

### Q1988
**¿Cuándo son apropiadas las métricas de NLP (F1, BLEU, METEOR, ROUGE, GLEU) frente a las métricas de calidad de generación asistidas por IA, según el módulo?**

A) Las métricas de NLP son siempre superiores y deben usarse en todos los escenarios de evaluación
B) Las métricas de NLP solo pueden aplicarse a modelos de generación de imágenes, nunca a modelos de texto
C) Las métricas de NLP funcionan bien cuando existen respuestas correctas definitivas o textos de referencia para comparar (verdad básica); son menos adecuadas para generación abierta donde existen muchas respuestas válidas distintas ✅
D) No existe ninguna diferencia práctica entre ambos tipos de métricas

**Explicación:** El módulo hace esta distinción explícita: las métricas de NLP (matemáticas, sin necesitar un modelo evaluador) requieren datos de "verdad básica" — una respuesta de referencia contra la cual comparar (útil para traducción, resumen, tareas con respuesta esperada) — pero fallan en capturar la validez de respuestas abiertas y creativas donde múltiples respuestas distintas podrían ser igualmente correctas, escenario donde las métricas asistidas por IA (evaluador GPT) son más apropiadas.

---

### Q1989
**¿Cuáles son las tres opciones de "objetivo de evaluación" (evaluation target) al crear una evaluación completa en el portal de Foundry, según el módulo?**

A) Desarrollo, Staging y Producción
B) Rápido, Balanceado y Preciso
C) Texto, Imagen y Audio
D) Modelo, Agente y Conjunto de datos ✅

**Explicación:** El módulo distingue estas tres opciones al configurar una evaluación: evaluar un Modelo implementado (el sistema genera las salidas durante la evaluación con las indicaciones que se especifiquen), evaluar un Agente (respuestas de un agente con avisos definidos por el usuario), o evaluar un Conjunto de datos ya existente (donde las salidas ya fueron generadas previamente y solo se analizan).

---

### Q1990
**En el paso de configuración de datos de una evaluación, el ejercicio del módulo usa "generación sintética" con la instrucción `"Create various travel related questions, and include some content safety and security tests"` y 45 filas. ¿Qué resuelve esta opción cuando NO se tiene un conjunto de datos de prueba propio?**

A) Usa un modelo desplegado para generar automáticamente preguntas de prueba según una descripción del tema proporcionada, evitando la necesidad de escribir manualmente cada caso de prueba — el número de filas y el modelo generador se configuran explícitamente ✅
B) Nada; la generación sintética solo funciona si ya existe un conjunto de datos previo que editar
C) Genera automáticamente las respuestas correctas del modelo evaluado, sin generar las preguntas
D) Solo puede generar datos en inglés; no admite ninguna otra configuración de idioma o tema

**Explicación:** El ejercicio demuestra exactamente este flujo: en vez de subir un CSV/JSONL manualmente, se usa la generación sintética especificando qué modelo genera los datos, cuántas filas se necesitan, y un prompt que describe el tipo de preguntas deseadas (en este caso, preguntas de viaje incluyendo algunas pruebas de seguridad de contenido) — el sistema genera el conjunto de datos de prueba automáticamente antes de ejecutar la evaluación.

---

### Q1991
**Según la evaluación oficial del módulo, ¿qué prueba comparativa de modelos indica la capacidad del modelo para procesar solicitudes y devolver respuestas completas rápidamente?**

A) Índice de calidad
B) Capacidad de procesamiento (Throughput) ✅
C) Costo
D) Seguridad (Safety)

**Explicación:** Esta es la respuesta oficial de la evaluación: el índice de calidad mide precisión/coherencia de las respuestas (no velocidad), el costo mide el gasto económico (no velocidad de respuesta), la seguridad mide riesgos de contenido dañino (no rendimiento), y la capacidad de procesamiento (throughput, medida en tokens generados/procesados por segundo) es específicamente la métrica de rendimiento que indica qué tan rápido el modelo puede procesar solicitudes y devolver respuestas completas.

---

### Q1992
**Según la evaluación oficial del módulo, ¿qué tipo de implementación de Microsoft Foundry es mejor para uso general al ofrecer la cuota más grande?**

A) Lote de datos zonales (Data Zone Batch)
B) Desarrollador
C) Estándar global (Global Standard) ✅
D) Estándar regional aprovisionado (Regional Provisioned)

**Explicación:** Esta es la respuesta oficial: el módulo describe explícitamente las implementaciones estándar globales como "mejores para cargas de trabajo generales" porque "proporcionan la cuota más alta" — a diferencia de Data Zone Batch (restringido a procesamiento asíncrono por lotes dentro de una zona), Desarrollador (limitado exclusivamente a evaluación de modelos ajustados, no uso general en producción) o Estándar regional aprovisionado (capacidad reservada de una región específica, no la cuota más amplia).

---

### Q1993
**Según la evaluación oficial del módulo, ¿qué métrica de evaluación mide la corrección lingüística y la calidad del lenguaje natural?**

A) Estabilidad
B) Pertinencia (Relevancia)
C) Coherencia
D) Fluidez ✅

**Explicación:** Esta es la respuesta oficial: entre las métricas de calidad de generación del módulo (Base/Groundedness, Relevancia, Coherencia, Fluidez), la Fluidez es específicamente la que evalúa "la exactitud lingüística y la calidad del lenguaje natural" — distinta de Relevancia (si la respuesta aborda la pregunta) o Coherencia (si las ideas fluyen lógicamente); "Estabilidad" no es una de las métricas descritas en el módulo.

---
