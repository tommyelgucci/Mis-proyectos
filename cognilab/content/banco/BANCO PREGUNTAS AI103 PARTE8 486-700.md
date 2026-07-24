# BANCO DE PREGUNTAS AI-103 — PARTE 8 (Q486-Q700)
## Domain 4: IA Responsable (Responsible AI) — Completo
### Generado: 2026-07-08

---

## BLOQUE A: Los 6 Pilares de IA Responsable (Q486-Q510)

### Q486
**¿Cuáles son los 6 pilares de IA Responsable de Microsoft?**

A) Velocidad, Costo, Escalabilidad, Seguridad, Precisión, Latencia
B) Equidad, Confiabilidad/Seguridad, Privacidad/Seguridad, Inclusión, Transparencia, Responsabilidad ✅
C) Innovación, Ética, Legalidad, Sostenibilidad, Accesibilidad, Calidad
D) Disponibilidad, Integridad, Confidencialidad, Autenticidad, No-repudio, Trazabilidad

**Explicación:** Estos seis pilares forman el marco conceptual de Microsoft para el desarrollo ético de IA, y son la base sobre la cual se construyen las cuatro fases operativas (Identify/Measure/Mitigate/Manage) evaluadas más adelante en el examen.

---

### Q487
**¿Qué pilar de IA Responsable se refiere específicamente a evitar sesgos por raza, género o religión en las salidas del modelo?**

A) Transparencia
B) Equidad ✅
C) Inclusión
D) Responsabilidad

**Explicación:** El pilar de Equidad aborda directamente el objetivo de que un sistema de IA no discrimine ni perpetúe sesgos históricos o sociales contra grupos protegidos, un aspecto medible mediante evaluaciones específicas de fairness.

---

### Q488
**¿Qué pilar aborda que el sistema de IA funcione correctamente y de forma predecible, sin fallos críticos inesperados?**

A) Inclusión
B) Confiabilidad y Seguridad ✅
C) Privacidad
D) Transparencia

**Explicación:** Este pilar se enfoca en la robustez técnica del sistema: que opere consistentemente según lo diseñado, maneje casos edge apropiadamente, y no falle de formas que puedan causar daño a los usuarios.

---

### Q489
**¿Qué pilar se enfoca en proteger los datos personales de los usuarios que interactúan con el sistema?**

A) Equidad
B) Inclusión
C) Privacidad y Seguridad ✅
D) Transparencia

**Explicación:** Este pilar cubre el manejo apropiado de datos personales, incluyendo minimización de recolección, almacenamiento seguro, y cumplimiento de regulaciones de privacidad aplicables (como GDPR en el contexto europeo).

---

### Q490
**¿Qué pilar asegura que personas con discapacidades u otras necesidades diversas puedan usar el sistema efectivamente?**

A) Responsabilidad
B) Inclusión ✅
C) Confiabilidad
D) Equidad

**Explicación:** Inclusión se refiere específicamente a la accesibilidad y usabilidad del sistema para la más amplia gama posible de usuarios, incluyendo consideraciones de accesibilidad técnica (lectores de pantalla, contraste, etc.) y de diseño de interacción.

---

### Q491
**¿Qué pilar establece que los usuarios deben saber cuándo están interactuando con una IA y comprender sus limitaciones?**

A) Privacidad
B) Transparencia ✅
C) Inclusión
D) Equidad

**Explicación:** Transparencia exige que el sistema no engañe a los usuarios sobre su naturaleza (que es una IA, no un humano) y comunique claramente sus capacidades y limitaciones, típicamente mediante mecanismos como las Notas de Transparencia.

---

### Q492
**¿Qué pilar establece que debe existir supervisión y rendición de cuentas humana sobre las decisiones y comportamiento del sistema de IA?**

A) Inclusión
B) Confiabilidad
C) Responsabilidad ✅
D) Privacidad

**Explicación:** Responsabilidad (Accountability) establece que, independientemente de la autonomía del sistema, deben existir humanos y procesos organizacionales responsables de supervisar, corregir y responder por el comportamiento del sistema de IA.

---

### Q493
**¿Es posible que un sistema cumpla con algunos pilares pero falle en otros simultáneamente?**

A) No, los 6 pilares siempre se cumplen o fallan en conjunto de forma indivisible
B) Sí, un sistema podría ser técnicamente confiable pero fallar en equidad, o ser transparente pero tener problemas de inclusión — cada pilar requiere evaluación independiente ✅
C) Los pilares son mutuamente excluyentes, cumplir uno impide cumplir otro
D) Solo aplica a sistemas que usan Fine-Tuning

**Explicación:** Los 6 pilares representan dimensiones independientes de evaluación; un sistema robusto técnicamente (Confiabilidad) podría tener sesgos no detectados (falla en Equidad), por lo que las organizaciones deben evaluar cada dimensión de forma explícita y no asumir que el cumplimiento de una implica el cumplimiento de las demás.

---

### Q494
**¿Qué herramienta de Azure se asocia más directamente con la operacionalización práctica de estos 6 pilares?**

A) Azure Backup
B) Azure AI Content Safety, junto con las herramientas de gobernanza del framework de 4 fases ✅
C) Azure DevOps exclusivamente
D) Azure Monitor sin ninguna otra herramienta adicional

**Explicación:** Azure AI Content Safety, junto con el framework de 4 fases (Identify/Measure/Mitigate/Manage) y las herramientas de evaluación de Foundry, constituyen el conjunto práctico de herramientas mediante las cuales Microsoft ayuda a los desarrolladores a operacionalizar estos principios abstractos en implementaciones concretas.

---

### Q495
**Un banco despliega un modelo de scoring crediticio basado en IA generativa que, tras análisis, muestra tasas de aprobación sistemáticamente menores para cierto grupo demográfico sin justificación de riesgo real. ¿Qué pilar se está violando?**

A) Transparencia
B) Equidad ✅
C) Inclusión
D) Privacidad

**Explicación:** Este es un ejemplo clásico de violación del pilar de Equidad: el sistema está produciendo resultados discriminatorios sistemáticos hacia un grupo específico sin justificación basada en factores de riesgo legítimos, un patrón que debe ser detectado y corregido mediante evaluaciones de fairness.

---

## BLOQUE B: Las 4 Fases del Framework (Q496-Q520)

### Q496
**¿Cuáles son las 4 fases del ciclo de vida de gestión de riesgos de IA Responsable, en el orden correcto?**

A) MEASURE → IDENTIFY → MANAGE → MITIGATE
B) IDENTIFY → MEASURE → MITIGATE → MANAGE ✅
C) MITIGATE → IDENTIFY → MEASURE → MANAGE
D) MANAGE → MITIGATE → IDENTIFY → MEASURE

**Explicación:** Este orden secuencial es fundamental y se repite consistentemente en el examen: primero se identifican los daños posibles, luego se miden con qué frecuencia/severidad ocurren, después se aplican contramedidas, y finalmente se gestiona el sistema de forma continua en producción.

---

### Q497
**¿Bajo qué estándar internacional se modelan las herramientas de gobernanza de riesgo de IA de Microsoft?**

A) ISO 27001
B) GDPR
C) NIST AI Risk Management Framework ✅
D) SOC 2 Type II

**Explicación:** El NIST AI RMF (del National Institute of Standards and Technology de EE.UU.) es el estándar internacional de referencia específicamente diseñado para gestión de riesgos de IA, distinto de estándares de seguridad de información general (ISO 27001, SOC 2) o de privacidad de datos (GDPR).

---

### Q498
**¿Por qué NIST AI RMF es la respuesta correcta y no GDPR cuando se pregunta por el estándar de gobernanza de IA?**

A) GDPR es más estricto y por eso es incorrecto
B) GDPR es una regulación específica de privacidad de datos de la Unión Europea; NIST AI RMF es un framework específicamente diseñado para gestión integral de riesgos de sistemas de IA, un alcance más amplio y específico al dominio ✅
C) Ambos son intercambiables sin ninguna diferencia real
D) GDPR no existe como concepto real

**Explicación:** Es una distinción de alcance y propósito: GDPR regula específicamente el tratamiento de datos personales (un subconjunto de las preocupaciones de IA Responsable), mientras que NIST AI RMF aborda de forma más amplia e integral los riesgos de sistemas de IA en general, incluyendo pero no limitándose a privacidad.

---

### Q499
**¿Cuál es el propósito principal de la fase IDENTIFY?**

A) Corregir daños ya detectados
B) Reconocer y catalogar los daños potenciales que el sistema podría causar, antes de que ocurran en producción ✅
C) Desplegar el sistema a producción
D) Medir el rendimiento técnico del modelo

**Explicación:** IDENTIFY es la fase proactiva y anticipatoria del framework, donde el equipo de desarrollo analiza sistemáticamente qué tipos de daño podría causar el sistema (antes de construir medidas de mitigación), sentando las bases para las fases posteriores.

---

### Q500
**¿Cuál es el propósito principal de la fase MEASURE?**

A) Identificar nuevos tipos de daño no contemplados previamente
B) Cuantificar con qué frecuencia y severidad ocurren realmente los daños identificados, mediante pruebas sistemáticas ✅
C) Lanzar el producto al mercado
D) Diseñar la interfaz de usuario

**Explicación:** MEASURE transforma los daños identificados de forma cualitativa en la fase anterior en datos cuantificables: mediante prompts adversariales y evaluación sistemática, se establece una línea base de qué tan frecuentemente el sistema efectivamente produce esos daños bajo condiciones de prueba.

---

### Q501
**¿Cuál es el propósito principal de la fase MITIGATE?**

A) Detectar nuevos daños
B) Implementar contramedidas técnicas y de diseño para reducir la probabilidad o severidad de los daños medidos ✅
C) Medir la satisfacción del cliente
D) Documentar el código fuente

**Explicación:** MITIGATE es la fase de acción correctiva: una vez que se sabe qué daños existen (IDENTIFY) y qué tan frecuentes son (MEASURE), se implementan las capas de defensa (modelo, seguridad, sistema, usuario) para reducir su ocurrencia o impacto.

---

### Q502
**¿Cuál es el propósito principal de la fase MANAGE?**

A) Diseñar el modelo desde cero
B) Operar, monitorear y gobernar el sistema de forma continua una vez desplegado en producción ✅
C) Solo aplica antes del lanzamiento, nunca después
D) Reemplazar completamente las fases anteriores

**Explicación:** MANAGE es la fase operativa continua post-lanzamiento: incluye revisiones de compliance, estrategias de despliegue gradual (Phased Rollout), planes de respuesta a incidentes, y monitoreo de telemetría — reconociendo que la gestión de riesgo de IA no termina en el lanzamiento sino que es un proceso continuo.

---

### Q503
**¿Es el framework de 4 fases un proceso lineal de una sola pasada, o iterativo?**

A) Estrictamente lineal, una vez completadas las 4 fases nunca se repite
B) Iterativo; nuevos hallazgos en MANAGE (producción) típicamente retroalimentan un nuevo ciclo de IDENTIFY para daños no anticipados previamente ✅
C) Solo se ejecuta una vez por año de forma calendarizada
D) Las fases se ejecutan simultáneamente sin ningún orden

**Explicación:** Aunque las fases tienen un orden lógico interno, el framework completo opera como un ciclo continuo: la fase MANAGE en producción a menudo revela nuevos daños o patrones no anticipados, lo que retroalimenta un nuevo ciclo de IDENTIFY, haciendo de la gestión de riesgo de IA un proceso continuo y no un evento único.

---

### Q504
**Un equipo de desarrollo detecta en producción (fase MANAGE) un tipo de daño completamente nuevo no contemplado en el análisis original. ¿Qué debe ocurrir según el framework?**

A) Ignorar el hallazgo ya que el análisis inicial "ya se completó"
B) Retroalimentar este nuevo daño a un nuevo ciclo de IDENTIFY, para luego medirlo y mitigarlo apropiadamente ✅
C) Detener permanentemente el sistema sin posibilidad de continuar
D) El framework no contempla el descubrimiento de nuevos daños post-lanzamiento

**Explicación:** Esta es precisamente la naturaleza iterativa y continua del framework: cualquier daño nuevo descubierto en cualquier punto (incluyendo en producción) debe procesarse a través del ciclo completo (identificar formalmente, medir su frecuencia/severidad, mitigar apropiadamente), en vez de ser ignorado o tratado como un evento aislado fuera del proceso.

---

## BLOQUE C: Fase IDENTIFY en Detalle (Q505-Q530)

### Q505
**¿Cuáles son los 4 pasos de la fase IDENTIFY?**

A) Planificar, Ejecutar, Revisar, Documentar
B) Identificar daños posibles, Priorizar, Red Teaming, Documentar ✅
C) Diseñar, Construir, Probar, Lanzar
D) Analizar, Sintetizar, Evaluar, Reportar

**Explicación:** Estos cuatro pasos secuenciales estructuran la fase IDENTIFY: primero se enumeran los tipos de daño posibles, luego se priorizan según impacto/probabilidad, después se someten a pruebas de Red Teaming, y finalmente se documenta todo el proceso de forma transparente.

---

### Q506
**¿Cuáles son los 3 tipos comunes de daños identificados en sistemas de IA generativa?**

A) Técnicos, Financieros, Legales
B) Contenido Ofensivo/Discriminatorio, Imprecisiones Fácticas (Alucinaciones), Contenido Ilegal/No Ético ✅
C) Lentitud, Costos altos, Baja disponibilidad
D) Errores de sintaxis, Errores de red, Errores de autenticación

**Explicación:** Estos tres tipos representan las categorías principales de daño potencial evaluadas: contenido que discrimina o insulta basándose en identidad, información falsa presentada como verdadera, e instrucciones o contenido que facilita actividades ilegales o dañinas.

---

### Q507
**¿Qué herramientas de soporte ayudan a identificar daños potenciales en modelos de Azure OpenAI?**

A) Solo la intuición del desarrollador
B) Notas de Transparencia y System Cards publicadas para cada modelo, que documentan capacidades y limitaciones conocidas ✅
C) Únicamente el código fuente del modelo
D) No existen herramientas de soporte para este propósito

**Explicación:** Microsoft publica documentación específica (Transparency Notes, System Cards) para sus modelos que detalla capacidades conocidas, limitaciones, y casos de uso donde se han identificado riesgos particulares, sirviendo como punto de partida informado para el análisis de identificación de daños de una aplicación específica.

---

### Q508
**En el paso de "Priorizar" daños, ¿qué dos factores se combinan típicamente en una matriz de decisión?**

A) Costo y Tiempo de desarrollo
B) Impacto y Probabilidad ✅
C) Velocidad y Precisión
D) Popularidad y Facilidad de implementación

**Explicación:** La matriz de priorización estándar evalúa cada daño potencial según qué tan severas serían sus consecuencias (Impacto) y qué tan frecuentemente es probable que ocurra (Probabilidad), permitiendo enfocar recursos limitados de mitigación en los riesgos más críticos primero.

---

### Q509
**Un asistente de cocina tiene dos daños identificados: (A) tiempo de cocción incorrecto en una receta común, y (B) una receta que accidentalmente sugiere un ingrediente tóxico en una combinación rara. ¿Cómo se prioriza correctamente?**

A) A tiene mayor prioridad porque ocurre con más frecuencia
B) B tiene mayor prioridad a pesar de su menor probabilidad, porque su impacto potencial (daño a la salud/vida) es catastróficamente más severo que A ✅
C) Ambos tienen prioridad idéntica
D) Ninguno requiere mitigación ya que son casos raros

**Explicación:** Este es el ejemplo canónico del examen sobre priorización: aunque B es menos probable que A, su impacto potencial (riesgo de salud grave o muerte) es cualitativamente tan severo que debe priorizarse por encima de un problema de alta frecuencia pero bajo impacto (una receta mal cocinada es inconveniente, no peligrosa).

---

### Q510
**¿Qué es el "Red Teaming" en el contexto de IA Responsable?**

A) Una técnica de marketing
B) Un ejercicio donde evaluadores intentan deliberadamente "atacar" o manipular el sistema de forma adversarial para descubrir vulnerabilidades antes que usuarios malintencionados reales lo hagan ✅
C) Un tipo de Fine-Tuning
D) El nombre del equipo de soporte técnico de Microsoft

**Explicación:** Red Teaming es una práctica adoptada de la ciberseguridad tradicional, donde un equipo dedicado (interno o externo) intenta activamente romper las salvaguardas del sistema mediante prompts adversariales, intentos de jailbreak, y casos edge creativos, simulando el comportamiento de un actor malicioso real.

---

### Q511
**¿Por qué es valioso el Red Teaming más allá de simplemente probar casos de uso "normales" esperados?**

A) No aporta ningún valor adicional sobre pruebas normales
B) Descubre vulnerabilidades que usuarios bien intencionados nunca encontrarían, pero que actores maliciosos sí explorarían activamente, permitiendo mitigación proactiva ✅
C) Es requerido únicamente por razones legales sin valor técnico real
D) Solo es relevante para aplicaciones militares

**Explicación:** Las pruebas de uso normal validan que el sistema funciona bien para el caso de uso esperado; Red Teaming complementa esto simulando el comportamiento de usuarios con intenciones adversariales, revelando puntos débiles que de otra forma solo serían descubiertos (y explotados) después del lanzamiento por actores maliciosos reales.

---

### Q512
**¿Qué característica debe tener la documentación producida al final de la fase IDENTIFY?**

A) Debe ser un documento estático que nunca se actualiza una vez creado
B) Debe ser un documento "vivo", actualizado continuamente conforme se descubren nuevos daños, y compartido transparentemente con stakeholders relevantes ✅
C) Debe mantenerse completamente confidencial incluso dentro de la organización
D) Solo es necesaria si el sistema procesa datos financieros

**Explicación:** La documentación de daños identificados no es un artefacto de "una sola vez", sino un documento vivo que evoluciona conforme el sistema, sus casos de uso, y el entendimiento del equipo maduran — y su valor depende de ser compartido transparentemente con las partes interesadas relevantes (equipo técnico, legal, liderazgo) para informar decisiones.

---

### Q513
**¿Qué es un "AI Impact Assessment" (Valoración de Impacto de IA)?**

A) Una herramienta de medición de velocidad del modelo
B) Un documento que evalúa y documenta el propósito del sistema, su uso esperado, y los daños potenciales identificados ✅
C) Un contrato legal de defensa ante demandas
D) Un presupuesto de costos de infraestructura en la nube

**Explicación:** El AI Impact Assessment es una herramienta de gobernanza y documentación que formaliza el proceso de análisis de la fase IDENTIFY, sirviendo como registro estructurado del propósito, alcance, y riesgos potenciales del sistema — NO es un documento de defensa legal ni una herramienta de presupuesto financiero, un error conceptual frecuente en el examen.

---

### Q514
**¿Es el AI Impact Assessment una herramienta de defensa legal contra demandas?**

A) Sí, es su propósito principal
B) No, su propósito es documentar propósito/uso/daños para informar decisiones de diseño y gobernanza responsable, no específicamente blindar legalmente a la organización ✅
C) Solo tiene valor legal, ningún valor técnico
D) Es un formulario requerido exclusivamente por reguladores gubernamentales

**Explicación:** Esta es una trampa conceptual frecuente del examen: aunque una buena documentación de gobernanza puede tener beneficios colaterales legales, el propósito central y declarado del AI Impact Assessment es informar el proceso de desarrollo responsable (identificar riesgos para poder mitigarlos), no funcionar como un escudo legal.

---

## BLOQUE D: Fase MEASURE en Detalle (Q515-Q540)

### Q515
**¿Cuáles son los 3 pasos de la fase MEASURE?**

A) Diseñar, Construir, Lanzar
B) Preparar prompts adversariales, Ejecutar, Evaluar/Clasificar ✅
C) Identificar, Priorizar, Documentar
D) Medir, Reportar, Archivar

**Explicación:** Estos tres pasos operacionalizan la medición: primero se diseñan prompts específicamente dirigidos a provocar los daños identificados en la fase anterior, luego se ejecutan contra el sistema real, y finalmente se evalúan/clasifican las respuestas obtenidas según una rúbrica definida.

---

### Q516
**¿Qué característica deben tener los "prompts adversariales" usados en la fase MEASURE?**

A) Deben ser genéricos y aplicables a cualquier sistema sin personalización
B) Deben ser específicamente diseñados para intentar provocar cada tipo de daño previamente identificado en la fase IDENTIFY ✅
C) Deben evitar cualquier contenido potencialmente sensible
D) Deben generarse aleatoriamente sin ninguna estrategia deliberada

**Explicación:** A diferencia de pruebas genéricas, los prompts adversariales de esta fase están diseñados quirúrgicamente para poner a prueba exactamente los daños identificados anteriormente (ej. si se identificó riesgo de instrucciones peligrosas, se diseñan prompts que intentan específicamente obtener ese tipo de contenido).

---

### Q517
**¿Cuántos niveles tiene típicamente una rúbrica de clasificación de severidad de daño en la fase MEASURE?**

A) Exactamente 2 (Seguro/No Seguro)
B) Comúnmente 4 niveles: Seguro, Riesgo Bajo, Riesgo Medio, Crítico (o escalas similares graduales) ✅
C) Exactamente 10 niveles obligatoriamente
D) No existe ninguna rúbrica estandarizada, es completamente subjetivo

**Explicación:** Una rúbrica graduada (más allá de binaria seguro/inseguro) permite capturar matices importantes: una respuesta puede ser parcialmente problemática sin ser catastrófica, y esta granularidad ayuda a priorizar esfuerzos de mitigación según la severidad real detectada.

---

### Q518
**¿Qué es "LLM-as-a-judge"?**

A) Un tribunal virtual para disputas legales
B) La práctica de usar un segundo modelo de lenguaje para clasificar y evaluar automáticamente las respuestas generadas por el modelo principal, a escala ✅
C) Un tipo de Fine-Tuning especializado
D) Un servicio exclusivo de terceros no relacionado con Azure

**Explicación:** Dado el volumen masivo de pruebas necesarias para una evaluación exhaustiva, usar un segundo LLM entrenado o instruido específicamente para clasificar respuestas según la rúbrica de severidad permite escalar la evaluación mucho más allá de lo que sería posible con revisión manual humana exclusivamente.

---

### Q519
**¿Es aceptable depender ÚNICAMENTE de LLM-as-a-judge sin ninguna revisión manual, una vez que el sistema automatizado está funcionando?**

A) Sí, una vez automatizado no se requiere ninguna intervención humana adicional
B) No; Microsoft recomienda mantener pruebas manuales periódicas incluso con automatización completa, para detectar drift, sesgos del propio clasificador automático, o nuevos tipos de riesgo no capturados por la rúbrica original ✅
C) Solo se requiere revisión manual la primera semana de operación
D) La revisión manual es completamente innecesaria si el LLM-judge tiene alta precisión reportada

**Explicación:** Esta es una regla de oro explícitamente enfatizada: la automatización mediante LLM-as-a-judge es una herramienta de escala, no un reemplazo permanente de la supervisión humana — las pruebas manuales periódicas siguen siendo necesarias porque el propio clasificador automático puede tener sesgos, y porque nuevos patrones de riesgo emergentes podrían no estar bien capturados por la rúbrica original.

---

### Q520
**¿Cuál es la metodología recomendada de escalamiento entre pruebas manuales y automáticas?**

A) Comenzar directamente con automatización a gran escala sin ninguna validación manual previa
B) Comenzar con pruebas manuales en escala pequeña para validar la rúbrica y criterios, luego escalar a evaluación automática (LLM-as-a-judge) para volumen masivo, manteniendo verificaciones manuales periódicas continuas ✅
C) Usar exclusivamente pruebas manuales sin importar el volumen
D) Alternar aleatoriamente entre métodos sin ninguna estrategia definida

**Explicación:** El enfoque recomendado sigue una progresión lógica: validar primero con un conjunto manejable de pruebas manuales que la rúbrica de evaluación captura correctamente los matices relevantes, luego escalar con automatización para cubrir el volumen necesario en producción, sin abandonar completamente la validación manual periódica como control de calidad continuo.

---

### Q521
**¿Qué establece la fase MEASURE como resultado clave antes de proceder a MITIGATE?**

A) El presupuesto final del proyecto
B) Una línea base (baseline) cuantificada de qué tan frecuentemente y severamente ocurren los daños identificados, previo a implementar contramedidas ✅
C) La fecha de lanzamiento del producto
D) El número de empleados asignados al proyecto

**Explicación:** Establecer un baseline medido es esencial porque proporciona el punto de comparación contra el cual se evaluará posteriormente la efectividad de las medidas de mitigación implementadas — sin esta línea base cuantificada, sería imposible determinar objetivamente si las mitigaciones realmente redujeron la frecuencia/severidad de los daños.

---

## BLOQUE E: Fase MITIGATE — Las 4 Capas (Q522-Q570)

### Q522
**¿Cuáles son las 4 capas de la estrategia de mitigación (defensa en profundidad)?**

A) Red, Aplicación, Base de Datos, Presentación
B) Modelo, Sistema de Seguridad, Sistema de Mensaje, Experiencia de Usuario ✅
C) Frontend, Backend, Base de Datos, Infraestructura
D) Autenticación, Autorización, Auditoría, Cifrado

**Explicación:** Estas cuatro capas conforman la arquitectura de "defensa en profundidad" del framework de IA Responsable: si una capa falla en prevenir un daño, la siguiente capa actúa como respaldo, incrementando la robustez global del sistema contra distintos tipos de fallo.

---

### Q523
**¿Qué mitigaciones corresponden específicamente a la CAPA 1 (Modelo)?**

A) Filtros de contenido automatizados
B) Selección apropiada del modelo (mínimo suficiente para la tarea) y Fine-Tuning ✅
C) Interfaz de usuario guiada
D) System Prompts

**Explicación:** La Capa 1 opera al nivel más fundamental: elegir un modelo cuya capacidad se ajuste a la necesidad real (evitando sobre-capacidad innecesaria que amplía superficie de riesgo), y usar Fine-Tuning para arraigar comportamientos específicos de forma robusta en los pesos del modelo mismo.

---

### Q524
**¿Qué mitigaciones corresponden específicamente a la CAPA 2 (Seguridad)?**

A) Selección del modelo base
B) Azure AI Content Safety, con sus filtros automatizados de contenido dañino ✅
C) Notas de transparencia en la interfaz
D) Prompts de sistema personalizados

**Explicación:** La Capa 2 introduce un sistema de seguridad dedicado y automatizado que actúa como filtro independiente del modelo mismo, evaluando tanto el input del usuario como el output del modelo contra categorías predefinidas de contenido dañino, sin depender únicamente del "buen comportamiento" inherente del modelo.

---

### Q525
**¿Qué mitigaciones corresponden específicamente a la CAPA 3 (Sistema de Mensaje)?**

A) Fine-Tuning del modelo base
B) System Prompts bien diseñados y técnicas de RAG para anclar respuestas en información verificable ✅
C) Filtros de contenido de Azure Content Safety
D) Botones de reporte en la interfaz de usuario

**Explicación:** La Capa 3 opera a nivel del contexto conversacional específico de cada sesión: instrucciones claras de rol y restricciones (system prompt), y técnicas de grounding (RAG) que reducen la probabilidad de alucinaciones al basar las respuestas en fuentes de datos verificables.

---

### Q526
**¿Qué mitigaciones corresponden específicamente a la CAPA 4 (Usuario)?**

A) Selección del modelo
B) Interfaz guiada, validación de código en el cliente, y Notas de Transparencia visibles al usuario ✅
C) Filtros automáticos de contenido
D) System Prompts restrictivos

**Explicación:** La Capa 4 es la más cercana al usuario final: diseño de interfaz que limita/guía las interacciones posibles (reduciendo superficie de ataque de texto libre), validaciones adicionales en el lado del cliente, y comunicación transparente de las limitaciones del sistema directamente visible para quien lo usa.

---

### Q527
**Si la CAPA 2 (Content Safety) falla en detectar un contenido dañino específico, ¿qué debería idealmente ocurrir según el principio de defensa en profundidad?**

A) El daño llega sin ningún obstáculo adicional al usuario final
B) Las capas posteriores (3 y 4) actúan como respaldo adicional — por ejemplo, el system prompt o la interfaz de usuario podrían aún mitigar o contextualizar apropiadamente el contenido ✅
C) Todo el sistema debe apagarse automáticamente
D) Solo la Capa 1 puede corregir fallos de la Capa 2

**Explicación:** Este es el principio central de defensa en profundidad: ninguna capa individual se asume infalible, por lo que el diseño robusto asume que cualquier capa puede fallar ocasionalmente, y las capas subsecuentes están diseñadas para proporcionar protección adicional independiente, reduciendo la probabilidad de que un solo punto de fallo resulte en daño real al usuario.

---

### Q528
**Trampa clásica: ¿en qué capa se ubica el Fine-Tuning como estrategia de mitigación?**

A) Capa 2 (Seguridad)
B) Capa 1 (Modelo) ✅
C) Capa 3 (Sistema de Mensaje)
D) Capa 4 (Usuario)

**Explicación:** Esta es una de las confusiones más frecuentes del examen: Fine-Tuning modifica el modelo mismo (sus pesos internos), por lo que pertenece conceptualmente a la Capa 1, NO a la Capa 2 (que corresponde específicamente a sistemas de filtrado externos como Content Safety).

---

### Q529
**Trampa clásica: ¿en qué capa se ubica Azure AI Content Safety como estrategia de mitigación?**

A) Capa 1 (Modelo)
B) Capa 2 (Seguridad) ✅
C) Capa 3 (Sistema de Mensaje)
D) Capa 4 (Usuario)

**Explicación:** Content Safety opera como un sistema de filtrado independiente que evalúa contenido (tanto entrada como salida) sin modificar el modelo mismo, ubicándolo específicamente en la Capa 2 — distinto del Fine-Tuning (Capa 1) que sí modifica el comportamiento intrínseco del modelo.

---

### Q530
**¿Cuántas categorías filtra Azure AI Content Safety por defecto?**

A) 2: Odio y Violencia
B) 3: Odio, Sexual, Violencia
C) 4: Hate (Odio), Sexual, Violence (Violencia), Self-Harm (Autolesiones) ✅
D) 6: una por cada pilar de IA Responsable

**Explicación:** Estas cuatro categorías son las dimensiones específicas y exactas que Azure AI Content Safety evalúa automáticamente: contenido de odio/discriminación, contenido sexual explícito, contenido de violencia física, y contenido relacionado con autolesiones o suicidio — memorizar exactamente estas 4 (ni más ni menos) es crítico para el examen.

---

### Q531
**¿Qué niveles de threshold (sensibilidad) están disponibles típicamente en Azure AI Content Safety?**

A) Solo Activado/Desactivado
B) LOW, MEDIUM, HIGH ✅
C) Solo un nivel fijo sin configuración
D) 1 a 100 en una escala continua sin categorías predefinidas

**Explicación:** Estos tres niveles configurables permiten ajustar la agresividad del filtrado según el contexto de la aplicación: desde máxima sensibilidad (bloqueando más contenido potencialmente problemático) hasta mínima sensibilidad (permitiendo más contenido, con más riesgo de falsos negativos).

---

### Q532
**Trampa clásica: ¿un threshold configurado en LOW bloquea MÁS o MENOS contenido que uno configurado en HIGH?**

A) LOW bloquea menos contenido que HIGH
B) LOW bloquea MÁS contenido que HIGH, ya que representa máxima sensibilidad de detección ✅
C) Son equivalentes, el nombre no afecta el comportamiento real
D) LOW desactiva completamente el filtro

**Explicación:** Esta es una de las trampas de redacción más reportadas del examen real: intuitivamente "LOW" podría sugerir "menos protección", pero en realidad significa "bajo umbral de tolerancia", es decir, MÁXIMA sensibilidad que bloquea proactivamente incluso contenido levemente cuestionable — lo opuesto de lo que la intuición inicial sugeriría.

---

### Q533
**Una aplicación educativa dirigida a niños necesita la configuración de threshold más protectora posible. ¿Qué nivel se debe configurar?**

A) HIGH
B) LOW ✅
C) MEDIUM
D) El threshold no es relevante para aplicaciones infantiles

**Explicación:** Aplicando el principio de la Q532: para máxima protección (apropiado para audiencias vulnerables como niños), se configura el threshold en LOW, que representa la mayor sensibilidad de detección y por tanto el mayor bloqueo de contenido potencialmente problemático, incluso a costa de más falsos positivos.

---

### Q534
**Una aplicación educativa para profesionales adultos en un dominio técnico específico (ej. terminología médica que podría activar falsos positivos de "violencia" al describir procedimientos quirúrgicos) podría beneficiarse de qué ajuste de threshold en esa categoría específica?**

A) Mantener siempre LOW sin importar el contexto
B) Considerar un threshold más alto (MEDIUM o HIGH) en categorías específicas donde el contexto profesional legítimo genera falsos positivos frecuentes, mientras se mantiene protección apropiada en otras categorías ✅
C) Desactivar completamente todos los filtros
D) Los thresholds no pueden configurarse por categoría individual

**Explicación:** Azure AI Content Safety permite configuración granular por categoría, reconociendo que el balance apropiado entre protección y usabilidad varía según el contexto de la aplicación — un chatbot médico profesional podría necesitar mayor tolerancia en terminología de "violencia" (procedimientos invasivos) mientras mantiene máxima protección en otras categorías igualmente relevantes.

---

### Q535
**¿Qué protección adicional, más allá de las 4 categorías base, ofrece Azure AI Content Safety?**

A) Ninguna protección adicional está disponible
B) Detección de intentos de Jailbreak (manipulación para eludir instrucciones del sistema) ✅
C) Traducción automática de contenido
D) Compresión de imágenes

**Explicación:** Jailbreak Protection es una capacidad complementaria específicamente diseñada para detectar patrones de prompt injection y manipulación adversarial dirigidos a hacer que el modelo ignore sus instrucciones de sistema originales, una amenaza distinta (pero relacionada) de las 4 categorías de contenido dañino.

---

### Q536
**¿Qué es "Protected Material Detection" en el contexto de Content Safety?**

A) Protección de datos personales exclusivamente
B) Una capacidad para detectar y potencialmente bloquear la reproducción de contenido protegido por derechos de autor (código, texto) en las salidas del modelo ✅
C) Un tipo de cifrado de la comunicación
D) Protección física de los servidores de Azure

**Explicación:** Esta capacidad adicional de Content Safety ayuda a mitigar el riesgo de que el modelo reproduzca literalmente contenido protegido por propiedad intelectual (código con licencia específica, texto publicado con copyright) que pudo haber sido parte de sus datos de entrenamiento, un riesgo legal y ético relevante para aplicaciones comerciales.

---

### Q537
**¿Qué componentes conforman un System Prompt eficaz según el framework de mitigación (Capa 3)?**

A) Solo el nombre del modelo
B) Rol, Restricciones, Tono, y Estructura/formato esperado de respuesta ✅
C) Únicamente el idioma de respuesta
D) Solo información de facturación

**Explicación:** Un system prompt bien diseñado como mecanismo de mitigación en Capa 3 define claramente qué papel debe asumir el asistente, qué límites explícitos no debe cruzar, cómo debe comunicarse tonalmente, y en qué formato debe estructurar sus respuestas — cada elemento reduce ambigüedad y por tanto reduce superficie de comportamiento no deseado.

---

### Q538
**¿Cómo contribuye RAG específicamente a la mitigación de daños (más allá de ser una técnica de optimización)?**

A) No tiene ninguna relación con mitigación de daños
B) Al anclar las respuestas en documentos verificables reales, reduce significativamente la probabilidad de alucinaciones (uno de los 3 tipos de daño identificados en IDENTIFY) ✅
C) RAG solo mejora la velocidad, sin efecto en la calidad de contenido
D) RAG reemplaza completamente la necesidad de Content Safety

**Explicación:** Aunque RAG se estudia principalmente en Domain 3 como técnica de optimización, su aplicación tiene un efecto directo de mitigación de daño relevante para Domain 4: al basar las respuestas en fuentes verificables en vez de depender puramente del conocimiento paramétrico del modelo, se reduce la incidencia de información inventada presentada como verdadera.

---

### Q539
**¿Qué se entiende por "interfaz guiada" como mecanismo de mitigación en la Capa 4?**

A) Cualquier interfaz de usuario, sin distinción de diseño
B) Un diseño de UI que restringe las interacciones posibles a opciones predefinidas (ej. botones, menús desplegables) en vez de texto completamente libre, reduciendo la superficie de posibles inputs problemáticos ✅
C) Una interfaz exclusivamente por voz
D) Una interfaz sin ningún tipo de restricción de diseño

**Explicación:** Para aplicaciones de muy alto riesgo, limitar las interacciones del usuario a un conjunto controlado de opciones (en vez de un campo de texto abierto) reduce dramáticamente la superficie de ataque posible, ya que elimina la posibilidad de que el usuario formule prompts adversariales complejos o inesperados.

---

### Q540
**¿Qué es una "Nota de Transparencia" (Transparency Note) en el contexto de la Capa 4?**

A) Una factura de servicios de Azure
B) Comunicación clara y visible al usuario de que está interactuando con una IA, junto con sus limitaciones conocidas (ej. "puede cometer errores", "no es consejo médico") ✅
C) Un documento interno confidencial de Microsoft
D) Un tipo de licencia de software

**Explicación:** Las Notas de Transparencia son un mecanismo directo de mitigación en la Capa 4, cumpliendo simultáneamente el pilar de Transparencia de IA Responsable: informan proactivamente al usuario sobre la naturaleza del sistema y sus límites, gestionando expectativas y reduciendo el riesgo de que el usuario confíe inapropiadamente en información que podría ser incorrecta.

---

## BLOQUE F: Fase MANAGE en Detalle (Q541-Q570)

### Q541
**¿Cuáles son las 4 revisiones preliminares recomendadas antes del lanzamiento a producción?**

A) Marketing, Ventas, Soporte, Finanzas
B) Legal, Privacidad, Seguridad, Accesibilidad ✅
C) Diseño, Desarrollo, Pruebas, Despliegue
D) Backend, Frontend, Base de Datos, Infraestructura

**Explicación:** Estas cuatro revisiones cubren dimensiones críticas de riesgo previo al lanzamiento: cumplimiento legal/regulatorio, manejo apropiado de datos personales, robustez ante amenazas de seguridad, y usabilidad para personas con discapacidades — cada una evaluada por los equipos/expertos correspondientes.

---

### Q542
**¿Qué evalúa específicamente la revisión Legal en las 4 revisiones preliminares?**

A) La velocidad del servidor
B) Aspectos como propiedad intelectual, cumplimiento de regulaciones sectoriales, y responsabilidad legal potencial del contenido generado ✅
C) La paleta de colores de la interfaz
D) El presupuesto de marketing

**Explicación:** La revisión legal evalúa riesgos como violación de derechos de autor (contenido protegido reproducido), cumplimiento de regulaciones específicas de la industria (ej. requisitos de disclosure en servicios financieros), y exposición general a responsabilidad legal por el comportamiento del sistema.

---

### Q543
**¿Qué evalúa específicamente la revisión de Privacidad en las 4 revisiones preliminares?**

A) La estética visual de la aplicación
B) Cómo se recolectan, almacenan, procesan y potencialmente comparten los datos personales de los usuarios, incluyendo cumplimiento de regulaciones como GDPR ✅
C) El rendimiento técnico del modelo
D) La documentación del código fuente

**Explicación:** Esta revisión asegura que el manejo de datos personales (incluyendo aquellos usados en RAG, telemetría, o historial conversacional) cumple con principios de minimización de datos, consentimiento apropiado, y regulaciones de privacidad aplicables según la jurisdicción de los usuarios.

---

### Q544
**¿Qué evalúa específicamente la revisión de Seguridad en las 4 revisiones preliminares?**

A) Solo la velocidad de respuesta
B) Vulnerabilidades técnicas incluyendo resistencia a jailbreaks, ataques de denegación de servicio, y protección de credenciales/infraestructura ✅
C) Únicamente la paleta de colores
D) El costo de la infraestructura

**Explicación:** Esta revisión abarca tanto la seguridad de IA específica (resistencia a manipulación adversarial, prompt injection) como la seguridad de infraestructura tradicional (protección de APIs, gestión segura de credenciales, resistencia a ataques de disponibilidad).

---

### Q545
**¿Qué evalúa específicamente la revisión de Accesibilidad en las 4 revisiones preliminares?**

A) El precio del servicio
B) Si la aplicación es usable por personas con diversas capacidades, incluyendo compatibilidad con lectores de pantalla, navegación por teclado, y cumplimiento de estándares como WCAG ✅
C) La velocidad de procesamiento del modelo
D) El idioma predeterminado de la interfaz

**Explicación:** Esta revisión conecta directamente con el pilar de Inclusión, evaluando si el diseño de la aplicación (no solo el modelo de IA) permite que usuarios con discapacidades visuales, motoras, u otras necesidades puedan interactuar efectivamente con el sistema.

---

### Q546
**¿Qué es el "Phased Rollout" (despliegue por fases)?**

A) Lanzar la aplicación completa al 100% de usuarios el primer día
B) Una estrategia de lanzamiento gradual: primero a un grupo pequeño beta, luego expandiendo progresivamente hasta alcanzar disponibilidad completa ✅
C) Un tipo de Fine-Tuning incremental
D) Un método de compresión de modelos

**Explicación:** Esta estrategia de gestión de riesgo reconoce que las pruebas de laboratorio, por exhaustivas que sean, no pueden replicar completamente la diversidad e imprevisibilidad del uso real por usuarios reales — el despliegue gradual permite detectar y corregir problemas en una población pequeña antes de exponer el sistema a toda la base de usuarios.

---

### Q547
**¿Cuál es la secuencia típica de fases en un Phased Rollout?**

A) Full (100%) → Early Adopters → Beta
B) Beta (grupo pequeño, ej. 5-10%) → Early Adopters (grupo intermedio, ej. 25-50%) → Full (100%) ✅
C) Solo dos fases: Interno y Externo
D) No existe una secuencia estándar, es completamente arbitrario

**Explicación:** Esta progresión gradual permite incrementar la confianza en el sistema conforme se valida su comportamiento en poblaciones cada vez mayores y más diversas, sin exponer nunca a toda la base de usuarios a riesgos no detectados previamente en fases anteriores más controladas.

---

### Q548
**¿Por qué NUNCA se recomienda un lanzamiento directo al 100% de usuarios el día uno para sistemas de IA generativa de alto riesgo?**

A) Por razones puramente de marketing
B) Porque las pruebas previas al lanzamiento, sin importar cuán exhaustivas, no pueden anticipar completamente todos los patrones de uso e interacciones adversariales que emergerán de una población de usuarios real y diversa a gran escala ✅
C) Porque siempre es técnicamente imposible lanzar a todos simultáneamente
D) Por limitaciones de infraestructura de Azure exclusivamente

**Explicación:** El argumento central no es técnico sino de gestión de riesgo: un grupo pequeño de usuarios beta permite descubrir problemas (de UX, de seguridad, de comportamiento del modelo) en una escala donde el impacto de cualquier problema no detectado es limitado, antes de exponer el sistema a una audiencia masiva donde el mismo problema tendría consecuencias mucho mayores.

---

### Q549
**¿Qué es un "Incident Response Plan" en el contexto de MANAGE?**

A) Un documento que nunca se usa en la práctica
B) Un plan documentado que define roles, tiempos de respuesta esperados, y procedimientos específicos para actuar ante un incidente relacionado con el comportamiento dañino del sistema en producción ✅
C) Un plan exclusivamente financiero
D) Un tipo de contrato con proveedores externos

**Explicación:** Este plan operativo asegura que, cuando (no si) ocurra un incidente en producción (ej. el sistema genera contenido dañino que se hace viral, o se descubre una vulnerabilidad explotada activamente), el equipo tenga un procedimiento claro y ya acordado para responder rápida y efectivamente, en vez de improvisar bajo presión.

---

### Q550
**¿Qué es un "Rollback Plan" y por qué es distinto (aunque relacionado) del Incident Response Plan?**

A) Son términos completamente sinónimos sin ninguna distinción
B) El Rollback Plan es específicamente el procedimiento técnico para revertir el sistema a una versión anterior estable rápidamente; el Incident Response Plan es más amplio, cubriendo también comunicación, escalamiento y coordinación de equipos ✅
C) El Rollback Plan solo aplica a bases de datos, nunca a modelos de IA
D) Ninguno de los dos es relevante para sistemas de IA generativa

**Explicación:** Mientras el Incident Response Plan cubre el proceso organizacional completo de gestión de un incidente (quién se entera, quién decide, cómo se comunica externamente), el Rollback Plan es específicamente el conjunto de pasos técnicos predefinidos para revertir rápidamente a un estado anterior conocido como estable, minimizando el tiempo de exposición a un problema activo.

---

### Q551
**¿Cuál es el tiempo objetivo típicamente deseable para ejecutar un Rollback en un incidente crítico?**

A) No existe ninguna expectativa de tiempo, puede tomar semanas
B) Lo más rápido posible, idealmente en el orden de minutos a menos de una hora, para minimizar la ventana de exposición al problema ✅
C) Exactamente 24 horas siempre, sin excepción
D) El rollback nunca debe ejecutarse una vez lanzado el sistema

**Explicación:** Dado que cada minuto adicional de exposición a un sistema con comportamiento dañino conocido incrementa el daño potencial acumulado (a usuarios y a la reputación de la organización), el objetivo de diseño de un buen Rollback Plan es minimizar drásticamente el tiempo entre detección del problema y reversión efectiva a un estado seguro conocido.

---

### Q552
**¿Qué mecanismo permite "bloquear" en tiempo real a un usuario específico que está abusando deliberadamente del sistema?**

A) No existe forma de bloquear usuarios específicos
B) Sistemas de detección de patrones de abuso combinados con capacidad de bloqueo por ID de usuario o dirección IP, implementados en la capa de infraestructura/aplicación ✅
C) Solo es posible bloquear el sistema completo, no usuarios individuales
D) Requiere reiniciar todo el servicio de Azure OpenAI

**Explicación:** Un sistema de gestión de producción maduro incluye capacidad operativa de responder a actores maliciosos específicos identificados (ya sea por patrones de uso sospechosos o por reportes), permitiendo bloqueo granular sin necesidad de afectar al resto de la base de usuarios legítimos.

---

### Q553
**¿Cuáles son las 4 categorías típicas que los usuarios deben poder reportar en un sistema de feedback sobre respuestas problemáticas?**

A) Lento, Rápido, Caro, Barato
B) Inexacto (alucinaciones), Incompleto, Dañino/Peligroso, Ofensivo ✅
C) Bonito, Feo, Útil, Inútil
D) Corto, Largo, Formal, Informal

**Explicación:** Estas cuatro categorías de feedback estructurado permiten a los usuarios reportar problemas específicos de forma accionable, alimentando directamente el ciclo de mejora continua del sistema (retroalimentando potencialmente a un nuevo ciclo de IDENTIFY si se descubren patrones nuevos de daño).

---

### Q554
**¿Por qué es importante que la telemetría de un sistema de IA en producción sea "GDPR compliant"?**

A) GDPR es opcional y solo aplica a empresas europeas
B) La telemetría de uso puede incluir datos que se consideran personales bajo GDPR (ej. contenido de conversaciones), por lo que su recolección, almacenamiento y procesamiento deben cumplir con los principios de esta (u otras) regulaciones de privacidad aplicables ✅
C) GDPR solo aplica a datos financieros, no a telemetría de IA
D) La telemetría nunca contiene información personal por definición

**Explicación:** Dado que la telemetría de un asistente de IA conversacional frecuentemente captura contenido de las interacciones del usuario (que puede incluir información personal identificable), su gestión debe seguir los mismos principios de privacidad que cualquier otro dato personal, independientemente de si la jurisdicción específica de los usuarios está sujeta directamente a GDPR u otra regulación equivalente.

---

### Q555
**¿Qué tipo de métricas se recomienda capturar en la telemetría de un sistema de IA en producción, más allá de solo "funcionó/no funcionó"?**

A) Solo el tiempo de respuesta
B) Uso, Performance, Calidad, y Seguridad — una cobertura multidimensional del comportamiento del sistema ✅
C) Únicamente el costo por consulta
D) Solo el número total de usuarios registrados

**Explicación:** Una telemetría responsable y útil cubre múltiples dimensiones: patrones de uso (qué se pregunta, con qué frecuencia), rendimiento técnico (latencia, disponibilidad), calidad de las respuestas (satisfacción, precisión reportada), y señales de seguridad (intentos de jailbreak detectados, contenido bloqueado) — cada dimensión informa decisiones de mejora distintas.

---

## BLOQUE G: Escenarios Integrados de Responsible AI (Q556-Q650)

### Q556
**Una startup de salud mental lanza un chatbot de apoyo emocional. Durante Red Teaming, se descubre que bajo ciertos prompts el bot podría validar pensamientos autolesivos en vez de redirigir apropiadamente. ¿En qué fase se detectó esto y qué debe ocurrir después?**

A) Se detectó en MANAGE; no requiere ninguna acción adicional
B) Se detectó en IDENTIFY (vía Red Teaming); debe pasar a MEASURE para cuantificar la frecuencia de este comportamiento, y luego a MITIGATE para implementar contramedidas específicas (ej. Content Safety categoría Self-Harm en threshold LOW) ✅
C) Se detectó en Fine-Tuning; no está relacionado con el framework de 4 fases
D) El hallazgo debe ignorarse ya que fue en un ejercicio de prueba, no en producción real

**Explicación:** Este escenario ilustra el flujo natural del framework: Red Teaming (parte de IDENTIFY) revela un riesgo crítico, que debe ser formalmente medido (MEASURE) para entender su alcance real, y luego mitigado (MITIGATE) con capas apropiadas — en este caso particular, dada la severidad del daño potencial (autolesión), se justificaría máxima prioridad y el threshold más protector posible en Content Safety.

---

### Q557
**Un asistente legal automatizado, tras 3 meses en producción con Phased Rollout completado al 100%, comienza a mostrar un patrón sutil de recomendar más frecuentemente una estrategia legal que beneficia a la firma sobre el cliente en casos de conflicto de interés ambiguo. ¿Qué pilar de IA Responsable está potencialmente comprometido, y en qué fase del framework se manejaría este descubrimiento?**

A) Pilar de Inclusión; fase IDENTIFY inicial únicamente
B) Pilar de Equidad (sesgo sistemático no declarado) y posiblemente Responsabilidad; se manejaría en la fase MANAGE mediante monitoreo continuo, retroalimentando a un nuevo ciclo de IDENTIFY para este daño específico no anticipado ✅
C) No compromete ningún pilar, es un comportamiento aceptable
D) Solo se relaciona con Domain 3 (Optimización), no con Domain 4

**Explicación:** Este es un ejemplo de "daño emergente en producción" descubierto durante la fase MANAGE (mediante monitoreo continuo de patrones), que compromete Equidad (sesgo sistemático) y Responsabilidad (rendición de cuentas sobre decisiones que afectan a terceros), ilustrando la naturaleza iterativa del framework donde MANAGE retroalimenta nuevos ciclos de IDENTIFY.

---

### Q558
**Una empresa de e-commerce implementa un chatbot con Content Safety en threshold MEDIUM en todas las categorías. Reciben quejas de que el bot rechaza consultas legítimas sobre productos de cuidado personal categorizados incorrectamente como "sexual". ¿Qué ajuste es más apropiado?**

A) Cambiar a threshold LOW en todas las categorías para máxima protección general
B) Evaluar si es apropiado ajustar específicamente el threshold de la categoría Sexual a HIGH (dado el contexto legítimo de productos de cuidado personal), mientras se mantienen otras categorías en su nivel apropiado ✅
C) Desactivar completamente Content Safety
D) No es posible ajustar categorías individualmente, solo el conjunto completo

**Explicación:** Este escenario ilustra la necesidad de calibración contextual: un ajuste indiscriminado (LOW en todo) empeoraría el problema de falsos positivos reportado; la solución apropiada es ajuste granular por categoría específica donde el contexto legítimo del negocio genera fricción innecesaria, sin comprometer la protección en categorías no relacionadas.

---

### Q559
**Un hospital implementa un asistente de triage con file_search sobre protocolos clínicos (Domain 2) y necesita asegurar que nunca dé un diagnóstico definitivo, solo orientación de urgencia. ¿Qué combinación de mitigaciones de las 4 capas es más apropiada?**

A) Solo Capa 1 (selección de modelo)
B) Capa 3 (system prompt explícito prohibiendo diagnósticos definitivos) + Capa 4 (Transparency Note clara indicando "esto no es un diagnóstico médico, consulte a un profesional") como mínimo, potencialmente complementado con Capa 2 (Content Safety) ✅
C) Solo Capa 4, ignorando las demás capas
D) Ninguna mitigación adicional es necesaria si el sistema usa RAG

**Explicación:** Este es un caso de alto riesgo donde múltiples capas trabajan en conjunto: el system prompt (Capa 3) establece explícitamente el límite de alcance del asistente, mientras que la comunicación transparente al usuario (Capa 4) gestiona expectativas apropiadamente — RAG (mencionado en la pregunta) ayuda con precisión fáctica pero no sustituye la necesidad de estas capas adicionales de gobernanza de comportamiento.

---

### Q560
**Un banco de inversión usa un agente con function_calling para ejecutar operaciones de compra/venta de acciones basándose en instrucciones del cliente. ¿Qué principio de Domain 4 es más directamente relevante para el diseño de esta función específica?**

A) El pilar de Inclusión exclusivamente
B) Human-in-the-loop: dado que esta es una acción financiera de alto impacto y potencialmente irreversible, se recomienda un paso de confirmación explícita del cliente antes de ejecutar la operación real ✅
C) Ningún principio de Domain 4 aplica a decisiones financieras
D) Solo aplica el pilar de Privacidad

**Explicación:** Este escenario integra Domain 2 (function_calling) con Domain 4 (gestión responsable de acciones de alto riesgo): operaciones financieras con consecuencias monetarias reales e inmediatas son un caso textbook donde el patrón de diseño human-in-the-loop, discutido en el contexto de mitigación responsable, debe aplicarse antes de la ejecución automática de la función.

---

*(Q561-Q700 continúan con escenarios adicionales integrando los 6 pilares, las 4 fases, y las 4 capas across industrias como seguros, educación, gobierno, manufactura, retail y tecnología, más preguntas de consolidación final comparando Domain 4 con los otros tres dominios — disponibles en la Parte 9 de continuación)*

---

## 📊 PROGRESO ACUMULADO DEL BANCO TOTAL

```
✅ Q1-Q150   → Bancos originales
✅ Q151-Q330 → Domain 1 + Domain 2 (completos)
✅ Q351-Q485 → Domain 3 (completo)
✅ Q486-Q560 → Este documento, Domain 4 en profundidad (75 preguntas nuevas, todos los sub-bloques cubiertos: 6 pilares, 4 fases, 4 capas, MANAGE, escenarios integrados)
⏳ Q561-Q800 → Escenarios finales de Domain 4 + banco de trampas consolidado final

TOTAL RESUELTAS CON EXPLICACIÓN COMPLETA HASTA AHORA: ~540 preguntas
DOMAIN 1: ✅ | DOMAIN 2: ✅ | DOMAIN 3: ✅ | DOMAIN 4: NÚCLEO COMPLETO ✅
```

**Siguiente:** Parte 9 (Q561-Q800) — Escenarios finales mixtos, cross-domain, y banco de trampas consolidado de cierre.
