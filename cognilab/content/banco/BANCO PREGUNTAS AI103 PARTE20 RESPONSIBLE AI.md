# BANCO DE PREGUNTAS AI-103 — PARTE 20 (Q1650-Q1669, Q1874-Q1953)
## Domain 4: IA Responsable y Text Analysis — Pilares, capas de mitigación, Content Safety, Azure Language, servidores MCP de lenguaje/voz, voz generativa, Voice Live y traducción de texto/voz
### Generado: 2026-08-19 (ampliado 2026-08-21) | Fuente: guía "Domain 3 y Domain 4 en profundidad" + módulos MS Learn "Análisis de texto con lenguaje de Azure en Foundry Tools", "Desarrollo de un agente de análisis de texto con el servidor MCP de lenguaje de Azure", "Desarrollo de una aplicación de IA generativa compatible con voz", "Creación de aplicaciones habilitadas para voz con Azure Speech en Microsoft Foundry Tools", "Desarrollo de un agente de voz con el servidor MCP de Voz de Azure", "Desarrollo de un agente de voz en tiempo real de Azure en Microsoft Foundry" y "Traducción de texto y voz con Microsoft Foundry Tools"

---

### Q1650
**¿Cuáles son los seis pilares de la IA Responsable, según el mapa del módulo?**

A) Velocidad, Costo, Escalabilidad, Disponibilidad, Latencia y Throughput
B) Equidad, Confiabilidad/Seguridad, Privacidad/Seguridad, Inclusión, Transparencia y Responsabilidad ✅
C) Modelo, Datos, Infraestructura, Red, Almacenamiento y Cómputo
D) Identify, Measure, Mitigate, Manage, Monitor y Report

**Explicación:** Los seis pilares son los valores que se operacionalizan a través de las cuatro fases del proceso (Identify → Measure → Mitigate → Manage): Equidad (¿discrimina?), Confiabilidad/Seguridad (¿funciona predeciblemente?), Privacidad/Seguridad (¿protege datos?), Inclusión (¿accesible para todos?), Transparencia (¿el usuario sabe que habla con IA?) y Responsabilidad (¿hay humanos que respondan?).

---

### Q1651
**¿Cuál es el orden correcto de las cuatro fases del proceso de IA Responsable, y qué estándar internacional las respalda?**

A) Measure → Identify → Manage → Mitigate; sin estándar de referencia
B) Identify → Measure → Mitigate → Manage; el estándar de referencia es NIST AI RMF ✅
C) Mitigate → Manage → Identify → Measure; ISO 27001
D) Manage → Mitigate → Measure → Identify; GDPR

**Explicación:** El ciclo es: IDENTIFY (¿qué daños existen?) → MEASURE (¿qué tan frecuentes son?) → MITIGATE (¿cómo los reduzco?) → MANAGE (¿cómo opero con seguridad?), con nuevos hallazgos retroalimentando de vuelta a IDENTIFY. El marco de referencia internacional citado es el NIST AI RMF (Risk Management Framework).

---

### Q1652
**¿Cuáles son los tres tipos de daño que se identifican en la fase IDENTIFY?**

A) Lentitud, costo excesivo y baja disponibilidad
B) Ofensivo/Discriminatorio, Alucinaciones e Ilegal/No ético ✅
C) Errores de sintaxis, timeouts y fallos de red
D) Falta de documentación, código duplicado y deuda técnica

**Explicación:** Estas son las tres categorías amplias de daño potencial que un sistema de IA puede causar: contenido ofensivo o discriminatorio, alucinaciones (información fabricada), y contenido o consejos ilegales o no éticos. Identificarlos es el primer paso antes de poder priorizarlos o mitigarlos.

---

### Q1653
**Un asistente de cocina tiene dos riesgos: (A) sugerir un tiempo de cocción incorrecto — común pero de bajo impacto, y (B) sugerir por error una combinación de ingredientes tóxica — rarísimo pero catastrófico. Según la matriz Impacto × Probabilidad, ¿cuál se prioriza primero?**

A) A, porque ocurre con más frecuencia y hay que resolver lo común antes que lo raro
B) B, porque el impacto extremo domina sobre la baja probabilidad — un daño catastrófico raro se prioriza por encima de un daño frecuente pero leve ✅
C) Ambos tienen exactamente la misma prioridad, sin importar impacto o frecuencia
D) Ninguno se prioriza; solo se documentan sin tomar ninguna acción

**Explicación:** La matriz de priorización combina impacto y probabilidad: bajo impacto + alta probabilidad = prioridad media; alto impacto + alta probabilidad = prioridad máxima; pero alto impacto + baja probabilidad = prioridad ALTA (el impacto manda). Un riesgo catastrófico, aunque rarísimo, no puede quedar sin mitigar solo porque es infrecuente.

---

### Q1654
**¿Qué es el "Red Teaming" dentro de la fase IDENTIFY?**

A) Un proceso automatizado que corrige errores de código sin intervención humana
B) Un equipo que ataca deliberadamente el sistema con preguntas capciosas e intentos de jailbreak, para descubrir daños antes de que lo hagan usuarios reales ✅
C) Un panel de revisión legal que aprueba el lanzamiento del producto
D) Una técnica de compresión de modelos para reducir costos de inferencia

**Explicación:** Red Teaming es una prueba de estrés adversarial deliberada: un equipo dedicado intenta activamente "romper" el sistema (jailbreaks, preguntas capciosas, casos límite) para descubrir vulnerabilidades y daños potenciales antes del lanzamiento, complementando la identificación teórica de riesgos.

---

### Q1655
**En la fase MEASURE, ¿qué escala de cuatro niveles se usa típicamente para clasificar el resultado de un prompt adversarial?**

A) Bajo, Medio, Alto, Crítico (sin valores numéricos asociados)
B) Seguro (0), Riesgo bajo (1), Riesgo medio (2), Crítico (3) ✅
C) Aprobado y Rechazado únicamente, sin niveles intermedios
D) Verde, Amarillo, Rojo, Negro, sin relación con el impacto

**Explicación:** Tras preparar y ejecutar prompts adversariales diseñados para provocar cada daño identificado, los resultados se evalúan con una rúbrica de cuatro niveles (0-3): Seguro, Riesgo bajo, Riesgo medio y Crítico — permitiendo cuantificar y comparar la severidad de los hallazgos.

---

### Q1656
**¿Cómo se recomienda escalar la evaluación de prompts adversariales de pruebas manuales a producción, y qué NO debe abandonarse nunca según el módulo?**

A) Se automatiza por completo con LLM-as-a-judge y se elimina toda prueba manual, ya que es redundante
B) Se empieza manual (10-50 pruebas) para calibrar criterios correctos, y se escala a automático (LLM-as-a-judge) para producción a gran escala — pero incluso con automatización total, deben mantenerse pruebas manuales periódicas para detectar drift y nuevos riesgos ✅
C) Solo se prueban manualmente los daños de menor severidad; los críticos se dejan sin evaluar
D) La evaluación automática solo es válida para aplicaciones internas, nunca para producción real

**Explicación:** Las pruebas manuales (10-50) sirven para validar que la rúbrica de clasificación sea correcta; una vez calibrada, un enfoque automático (LLM-as-a-judge) permite evaluar a escala masiva en producción. Pero el módulo enfatiza una regla de oro: mantener pruebas manuales periódicas siempre, incluso con automatización completa, para detectar drift y riesgos nuevos que el automatizador podría no capturar.

---

### Q1657
**¿Cuáles son las cuatro capas de mitigación (defensa en profundidad), de la más interna a la más externa?**

A) Red, Aplicación, Base de datos y Usuario
B) Capa 1 (Modelo), Capa 2 (Seguridad), Capa 3 (Sistema de mensaje), Capa 4 (Usuario) ✅
C) Autenticación, Autorización, Auditoría y Cifrado
D) Desarrollo, Pruebas, Staging y Producción

**Explicación:** Capa 1 (Modelo): selección del modelo mínimo suficiente y Fine-Tuning. Capa 2 (Seguridad): Azure AI Content Safety, filtros automáticos. Capa 3 (Sistema de mensaje): system prompts estrictos y RAG (grounding). Capa 4 (Usuario): UI guiada, validación, Transparency Notes. El principio es que si una capa falla, la siguiente la respalda.

---

### Q1658
**TRAMPA: ¿En qué capa de mitigación se ubica Fine-Tuning, y en cuál Azure AI Content Safety? Esta es la confusión #1 del examen según el módulo.**

A) Ambos se ubican en la Capa 2 (Seguridad), porque los dos filtran contenido dañino
B) Fine-Tuning es Capa 1 (modifica el modelo mismo); Azure AI Content Safety es Capa 2 (filtra externamente, sin tocar el modelo) — nunca deben confundirse ✅
C) Fine-Tuning es Capa 3; Azure AI Content Safety es Capa 4
D) Ninguno de los dos corresponde a ninguna capa de mitigación; son mecanismos de autenticación

**Explicación:** Fine-Tuning cambia el comportamiento interno del modelo entrenándolo para rechazar ciertos temas (Capa 1). Content Safety, en cambio, es un filtro externo que analiza el texto de entrada/salida sin modificar el modelo en absoluto (Capa 2). El examen distingue explícitamente entre "cambiar el modelo" y "filtrar alrededor del modelo".

---

### Q1659
**Este es el código del ejercicio de Content Safety:
```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions
from azure.identity import DefaultAzureCredential

client = ContentSafetyClient(
    endpoint=CONTENT_SAFETY_ENDPOINT,
    credential=DefaultAzureCredential()
)

def evaluar_contenido(texto: str):
    request = AnalyzeTextOptions(text=texto)
    resultado = client.analyze_text(request)

    for categoria in resultado.categories_analysis:
        print(f"{categoria.category}: severidad {categoria.severity}")

    return resultado
```
¿Cuáles son las cuatro categorías de análisis que expone `categories_analysis`?**

A) Spam, Phishing, Malware y Fraude
B) Hate (Odio), Sexual, Violence (Violencia) y Self-Harm (Autolesiones) ✅
C) Gramática, Ortografía, Tono y Formato
D) Legal, Financiero, Médico y Técnico

**Explicación:** `client.analyze_text()` devuelve un análisis de severidad para exactamente estas cuatro categorías fijas: Hate, Sexual, Violence y Self-Harm — las cuatro categorías que Azure AI Content Safety evalúa en cualquier texto analizado.

---

### Q1660
**TRAMPA: Un compañero de estudio configura Content Safety con threshold `HIGH` en la categoría Self-Harm para una app de apoyo emocional dirigida a adolescentes, pensando que así logra "la máxima protección posible". ¿Qué está mal?**

A) Nada; `HIGH` efectivamente da la máxima protección posible en cualquier categoría
B) `HIGH` significa mínima sensibilidad (bloquea MENOS contenido) — lo opuesto de máxima protección; para una app de alto riesgo con adolescentes, el threshold correcto es `LOW`, que representa máxima sensibilidad y máximo bloqueo ✅
C) El error es usar Content Safety en una app para adolescentes; no está permitido
D) El error es que `Self-Harm` no es una categoría válida de Content Safety

**Explicación:** Esta es la trampa de nomenclatura más citada del examen: `LOW` NO significa "poca protección" — significa "bajo umbral de tolerancia", es decir, máxima sensibilidad y bloquea MÁS contenido. `HIGH` es lo opuesto: mínima sensibilidad, bloquea MENOS, apropiado solo para contextos profesionales/adultos de bajo riesgo.

---

### Q1661
**Este es el system prompt del ejercicio, usado como mitigación de Capa 3:
```python
system_prompt_capa3 = """
Eres un asistente de una clínica dental.

LÍMITES ESTRICTOS:
- NUNCA des un diagnóstico definitivo.
- NUNCA prescribas medicamentos ni dosis.
- Si detectas una urgencia (dolor severo, sangrado, trauma),
  indica inmediatamente contactar a la clínica o servicios de
  emergencia.

Siempre recuerda al usuario: "Esta orientación no reemplaza
una consulta profesional."
"""
```
¿Por qué este system prompt se clasifica como mitigación de Capa 3 (Sistema de mensaje) y no de Capa 1 (Modelo)?**

A) Porque cualquier texto dentro de `instructions`/system prompt es automáticamente Capa 1
B) Porque es una instrucción de comportamiento aplicada en tiempo de ejecución vía el prompt, sin modificar los pesos del modelo — a diferencia de Fine-Tuning, que sí cambiaría el modelo de forma permanente ✅
C) Porque los system prompts solo pueden usarse en agentes de Foundry, nunca en llamadas directas al modelo
D) Porque menciona la palabra "clínica", lo que lo clasifica automáticamente como Capa 3

**Explicación:** La distinción entre capas no es sobre el contenido de la instrucción, sino sobre DÓNDE se aplica: Capa 1 modifica el modelo en sí (entrenamiento/pesos); Capa 3 son instrucciones de comportamiento inyectadas en cada llamada vía el system prompt, reversibles y ajustables sin reentrenar nada.

---

### Q1662
**Este código implementa una Transparency Note (Capa 4):
```python
TRANSPARENCY_NOTE = """
⚠️ Estás hablando con un asistente de inteligencia artificial.
Puede cometer errores. No sustituye el consejo de un profesional.
Si algo suena incorrecto, verifícalo con una fuente confiable.
"""

def generar_respuesta_con_disclaimer(pregunta):
    respuesta = client.responses.create(
        model="gpt-4o", input=pregunta
    ).output_text

    return f"{respuesta}\n\n---\n{TRANSPARENCY_NOTE}"
```
¿Por qué esta mitigación se clasifica específicamente como Capa 4 (Usuario) y no como Capa 2 o Capa 3?**

A) Porque se ejecuta después de obtener la respuesta del modelo y se muestra directamente al usuario final, sin filtrar ni modificar el contenido generado — es información de cara al usuario, no una restricción del modelo o un filtro de contenido ✅
B) Porque usa una cadena de texto en Python, lo que la clasifica automáticamente como Capa 4
C) Porque solo las Transparency Notes pueden ir después de `response.output_text`
D) Porque Content Safety exige que todo texto lleve una Transparency Note anexada

**Explicación:** Capa 2 filtra contenido (Content Safety); Capa 3 son instrucciones que moldean cómo responde el modelo (system prompt). La Transparency Note no filtra ni instruye al modelo — es información añadida directamente para el usuario final, ayudándolo a interpretar correctamente la respuesta que recibe. Por eso corresponde a la capa más externa, la de Usuario.

---

### Q1663
**¿Cuáles son las cuatro revisiones preliminares obligatorias antes de lanzar un sistema de IA, según la fase MANAGE?**

A) Marketing, Ventas, Soporte y Facturación
B) Legal (propiedad intelectual, regulación), Privacidad (GDPR, manejo de datos), Seguridad (jailbreaks, filtración de datos) y Accesibilidad (WCAG, lectores de pantalla) ✅
C) Backend, Frontend, Base de datos e Infraestructura
D) Solo Seguridad; las demás son opcionales según el presupuesto

**Explicación:** Estas cuatro revisiones cubren los riesgos regulatorios y de cumplimiento más comunes antes de un lanzamiento: propiedad intelectual y regulación (Legal), cumplimiento de protección de datos (Privacidad), resistencia a ataques (Seguridad), y usabilidad para personas con discapacidades (Accesibilidad).

---

### Q1664
**¿Cuál es el orden correcto de un Phased Rollout (despliegue por fases), y qué regla de oro nunca debe romperse?**

A) Full → Early Adopters → Beta; se puede lanzar directo al 100% si las pruebas internas salieron bien
B) Beta (5-10%) → Early Adopters (25-50%) → Full (100%); la regla de oro es NUNCA lanzar directo al 100% el día 1 ✅
C) Early Adopters → Beta → Full; el orden no importa mientras se llegue al 100%
D) Solo existen dos fases: Pruebas internas y Producción total

**Explicación:** El despliegue gradual permite detectar problemas temprano con un grupo pequeño (Beta), validar a mayor escala con un grupo intermedio (Early Adopters), y solo entonces lanzar al 100% (Full) con mayor confianza. Saltarse las fases intermedias expone a todos los usuarios a riesgos no detectados.

---

### Q1665
**Este es el código de bucketing de usuarios para un Phased Rollout:
```python
def usuario_en_fase_beta(user_id: str, porcentaje_beta: float = 0.10) -> bool:
    hash_usuario = hash(user_id) % 100
    return hash_usuario < (porcentaje_beta * 100)

def responder(user_id: str, pregunta: str):
    if usuario_en_fase_beta(user_id, porcentaje_beta=0.10):
        return agente_v2.responder(pregunta)
    else:
        return agente_v1_estable.responder(pregunta)
```
¿Qué propiedad garantiza usar `hash(user_id) % 100` en vez de, por ejemplo, `random.random()` en cada llamada, para decidir si un usuario está en la fase beta?**

A) Ninguna; ambos enfoques son completamente equivalentes en este contexto
B) Consistencia: el mismo `user_id` siempre cae en el mismo grupo (beta o estable) en cada llamada, porque el hash es determinístico — con `random.random()` un mismo usuario podría alternar entre versiones en cada solicitud ✅
C) `hash()` es más rápido de calcular que cualquier función de números aleatorios
D) `hash(user_id) % 100` garantiza exactamente 10 usuarios en fase beta, sin importar cuántos usuarios totales existan

**Explicación:** Un Phased Rollout necesita que cada usuario tenga una experiencia consistente durante toda la fase (siempre la v2, o siempre la v1), no que cambie de versión aleatoriamente en cada solicitud — eso rompería la validación y la experiencia de usuario. El hash determinístico del `user_id` logra esa asignación estable.

---

### Q1666
**¿Qué dos planes son obligatorios en la fase MANAGE, más allá de las revisiones preliminares y el despliegue por fases?**

A) Plan de Marketing y Plan de Ventas
B) Incident Response Plan (roles, tiempos, procedimientos ante un incidente) y Rollback Plan (revertir a una versión estable, con meta de minutos) ✅
C) Plan de Vacaciones del equipo y Plan de Capacitación anual
D) Solo se requiere un Plan de Backup de la base de datos

**Explicación:** Un sistema en producción necesita procedimientos claros para cuando algo sale mal: el Incident Response Plan define roles y tiempos de respuesta ante un incidente detectado, y el Rollback Plan define cómo revertir rápidamente (idealmente en minutos) a la última versión estable conocida.

---

### Q1667
**¿Cuáles son las cuatro categorías de feedback/telemetría de usuario que se recomienda monitorear en producción, y bajo qué requisito de cumplimiento deben gestionarse?**

A) Rápido, Lento, Caro, Barato; sin ningún requisito de cumplimiento
B) Inexacto, Incompleto, Dañino y Ofensivo; toda la telemetría recolectada debe ser GDPR compliant, siempre ✅
C) Bueno, Malo, Regular, Excelente; requisito de cumplimiento SOC2 únicamente
D) Solo se mide "satisfecho" vs "insatisfecho", sin categorías adicionales ni requisitos de cumplimiento

**Explicación:** Estas cuatro categorías de reporte permiten clasificar qué tipo de problema reportan los usuarios (información incorrecta, respuesta parcial, contenido dañino u ofensivo), alimentando el ciclo de mejora continua. El módulo enfatiza que, sin excepción, esta telemetría debe manejarse cumpliendo GDPR.

---

### Q1668
**¿Qué es un AI Impact Assessment, y qué NO es, según la trampa frecuente del examen?**

A) Es un presupuesto detallado de costos en la nube del proyecto de IA
B) Es un documento que registra el propósito del sistema, el uso esperado y los daños potenciales identificados; NO es un documento de defensa legal ni un presupuesto de costos en la nube ✅
C) Es un documento de defensa legal preparado exclusivamente para litigios
D) Es un contrato de nivel de servicio (SLA) entre el proveedor de IA y el cliente

**Explicación:** El AI Impact Assessment documenta de forma transparente el propósito del sistema, cómo se espera que se use, y qué daños potenciales fueron identificados durante el proceso — es una herramienta de gobernanza y transparencia, no un instrumento de defensa legal ni un documento financiero, una confusión frecuente en el examen.

---

### Q1669
**Un hospital lanza un asistente con RAG sobre protocolos clínicos para orientar a pacientes en triage, sin dar diagnósticos. Se identifica que el modelo podría "ceder" ante la insistencia de un usuario y terminar dando un diagnóstico definitivo. ¿Qué combinación de capas de mitigación aborda mejor este riesgo específico?**

A) Solo Capa 4 (Transparency Note), ya que basta con advertir al usuario de los límites del sistema
B) Una combinación: Capa 1 (Fine-Tuning para reforzar que el modelo SIEMPRE rechaza diagnósticos definitivos, incluso ante presión), Capa 3 (system prompt explícito reforzando ese límite + RAG con grounding en protocolos reales) y Capa 4 (Transparency Note indicando contactar servicios de urgencia si es necesario) ✅
C) Solo Capa 2 (Content Safety), ya que un filtro de contenido puede detectar y bloquear cualquier diagnóstico automáticamente
D) Ninguna capa de mitigación puede abordar este riesgo; requiere eliminar el sistema por completo

**Explicación:** Este es exactamente el principio de "defensa en profundidad": un riesgo de alto impacto como este no se resuelve con una sola capa. Fine-Tuning refuerza el rechazo a nivel del modelo mismo (resistente incluso a presión conversacional), el system prompt y el grounding en RAG refuerzan el límite y la precisión de cada respuesta, y la Transparency Note en Capa 4 cubre el caso en que, pese a todo, el usuario necesite ayuda real inmediata.

---

### Q1874
**Un equipo necesita determinar en qué idioma está escrito cada documento de un almacén de contenido que recopila texto arbitrario de fuentes desconocidas. ¿Qué capacidad de Azure Language en Foundry Tools es la apropiada, y qué límites de tamaño aplican?**

A) Reconocimiento de entidades; sin límite de tamaño por documento
B) Detección de idioma; cada documento debe tener menos de 5120 caracteres, y cada colección está restringida a 1000 elementos ✅
C) Extracción de PII; el límite es de 1000 caracteres por documento
D) Text Analytics for Health; no admite colecciones de documentos, solo uno a la vez

**Explicación:** La API de detección de idioma evalúa cada documento enviado y devuelve el idioma identificado junto con una puntuación de confianza (0 a 1). Los límites explícitos del servicio son: menos de 5120 caracteres por documento, y un máximo de 1000 elementos (identificadores) por colección enviada en una misma solicitud.

---

### Q1875
**Este código detecta el idioma de dos documentos:
```python
documents = ["Hello World!", "Bonjour le monde!"]
response = client.detect_language(documents=documents)
for doc in response:
    print(f"Document: {doc.id}")
    print(f"\tPrimary Language: {doc.primary_language.name}")
    print(f"\tConfidence Score: {doc.primary_language.confidence_score}")
```
Si uno de los documentos enviados mezclara dos idiomas dentro del mismo texto (por ejemplo, inglés con una frase suelta en francés), ¿qué comportamiento describe el módulo para ese caso?**

A) El servicio siempre lanza una excepción y detiene el procesamiento de toda la colección
B) La respuesta refleja el idioma con mayor representación en el contenido, pero con una puntuación de confianza inferior que refleja la fuerza marginal de esa evaluación ✅
C) El servicio devuelve ambos idiomas detectados en partes iguales, sin ningún idioma primario
D) El contenido de idioma mixto se ignora silenciosamente y no aparece en la respuesta

**Explicación:** El módulo distingue tres casos: (1) texto claro en un idioma → alta confianza; (2) contenido de idioma mixto → se devuelve el idioma con mayor representación, pero con confianza más baja; (3) ambigüedad total (p. ej. por problemas de codificación) → el nombre del idioma y el código ISO se devuelven como `(unknown)` y el score como 0.

---

### Q1876
**¿Qué método de autenticación recomienda Microsoft para soluciones de producción al conectarse a un recurso de Azure Language en Foundry Tools, en vez de la autenticación basada en claves?**

A) Autenticación anónima, ya que simplifica el despliegue en producción
B) Autenticación de Id. de Microsoft Entra, usando por ejemplo `DefaultAzureCredential()` en vez de una `AzureKeyCredential` con la clave del recurso ✅
C) Un token JWT generado manualmente y renovado cada 24 horas por el desarrollador
D) La autenticación basada en claves es siempre la opción recomendada; Entra ID solo es válida en desarrollo

**Explicación:** Aunque la autenticación basada en claves (`AzureKeyCredential`) es más simple para empezar, Microsoft recomienda explícitamente `DefaultAzureCredential` (autenticación de Microsoft Entra ID) para mayor seguridad en soluciones de producción — el mismo principio de "credenciales gestionadas en vez de secretos estáticos" que aplica en general en Foundry (Domain 1).

---

### Q1877
**Este código extrae entidades PII y genera una versión redactada del texto:
```python
response = client.recognize_pii_entities(documents=documents, language="en")
for doc in response:
    print(f"\nDocument {doc.id} (redacted):")
    print(f"  {doc.redacted_text}")
```
¿Qué reemplaza exactamente `doc.redacted_text` en la información sensible detectada?**

A) La elimina por completo del texto, dejando espacios vacíos sin ningún marcador
B) La reemplaza con asteriscos (u otro carácter especificado), preservando la longitud aproximada del texto original pero ocultando el valor real ✅
C) La reemplaza con el nombre de la categoría de la entidad (por ejemplo, `[PERSON]`) en vez de asteriscos
D) `redacted_text` no existe en la respuesta; hay que construir la redacción manualmente a partir de `entities`

**Explicación:** El servicio de extracción de PII no solo identifica las entidades sensibles (con su categoría y `confidence_score`) sino que además devuelve `redacted_text`: una versión del documento original con cada fragmento de información personal reemplazado por asteriscos, lista para usarse directamente sin necesidad de que el desarrollador implemente su propia lógica de reemplazo.

---

### Q1878
**Una agencia de viajes procesa reseñas de hoteles enviadas por clientes en varios idiomas y necesita: (a) identificar el idioma de cada reseña, (b) detectar lugares y personas mencionadas, y (c) quitar información personal antes de publicarlas. Según el módulo, ¿qué servicio cubre las tres necesidades?**

A) Es necesario combinar tres servicios distintos de Azure, uno por cada tarea
B) Azure Language en Foundry Tools cubre las tres: detección de idioma, reconocimiento de entidades con nombre, y extracción/redacción de PII, todas a través del mismo `TextAnalyticsClient` ✅
C) Solo Document Intelligence puede procesar texto libre no estructurado como reseñas
D) Azure AI Search es el único servicio capaz de detectar información personal en texto

**Explicación:** Este es el escenario textual del ejercicio del módulo: una única instancia de `TextAnalyticsClient` expone los tres métodos necesarios (`detect_language`, `recognize_entities`, `recognize_pii_entities`) para cubrir el flujo completo descrito, sin necesidad de combinar servicios adicionales.

---

### Q1879
**TRAMPA: Un desarrollador ve que Azure Language en Foundry Tools todavía ofrece análisis de sentimiento, extracción de frases clave y resumen, y decide construir una funcionalidad nueva de producto basándose en esas capacidades. ¿Qué advertencia explícita del módulo pasó por alto?**

A) Ninguna; esas capacidades son las más recomendadas actualmente para funcionalidades nuevas
B) El módulo señala explícitamente que esas funcionalidades están "en desuso" y se proporcionan solo para dar soporte a aplicaciones existentes — no son la recomendación para desarrollo nuevo ✅
C) Esas capacidades requieren un recurso completamente distinto al de detección de idioma o NER
D) Esas capacidades solo funcionan en inglés, a diferencia de las demás

**Explicación:** El módulo incluye una nota explícita: "Azure Language también proporciona funcionalidad para el análisis de sentimiento, el resumen, la extracción de frases clave y otras tareas comunes... Estas funcionalidades en desuso se proporcionan para admitir aplicaciones existentes." Es decir, siguen funcionando pero no son el foco de desarrollo nuevo — construir una funcionalidad nueva basada en ellas ignora esa señal de deprecación.

---

### Q1880
**¿Cuál es el rol principal del servidor MCP de lenguaje de Azure, según el módulo de desarrollo del agente?**

A) Entrenar y ajustar modelos de lenguaje personalizados para uso de agentes de IA
B) Exponer las funcionalidades de análisis de texto de Azure Language (detección de idioma, NER, PII, Text Analytics for Health) como herramientas MCP a las que puede llamar cualquier agente compatible ✅
C) Implementar y administrar modelos de lenguaje de gran tamaño en una suscripción de Azure
D) Reemplazar por completo la necesidad de un recurso de Microsoft Foundry

**Explicación:** El servidor MCP de lenguaje de Azure no entrena modelos ni administra despliegues de LLM — su función es actuar como puente: expone las capacidades ya existentes de Azure Language (que también se pueden llamar vía REST/SDK directamente) como un catálogo de herramientas descubribles dinámicamente por cualquier agente de IA compatible con el Protocolo de Contexto de Modelo.

---

### Q1881
**En la arquitectura del Protocolo de Contexto de Modelo (MCP), ¿qué representan Host, Cliente y Servidor respectivamente?**

A) Host = el servidor MCP; Cliente = el modelo de IA; Servidor = la aplicación final
B) Host = la aplicación que ejecuta el agente (p. ej. Microsoft Foundry); Cliente = el componente dentro del host que administra las conexiones a servidores MCP; Servidor = el programa que expone herramientas, recursos y solicitudes que el agente puede detectar y llamar ✅
C) Los tres términos son sinónimos intercambiables en la arquitectura MCP
D) Host = el usuario final; Cliente = el servidor MCP; Servidor = el modelo de lenguaje

**Explicación:** MCP usa una arquitectura cliente-servidor con tres componentes bien diferenciados: el Host (la aplicación que ejecuta el agente, como Microsoft Foundry o una app personalizada), el Cliente (componente interno del host que gestiona la comunicación con servidores MCP), y el Servidor (el programa externo que expone el catálogo de herramientas disponibles).

---

### Q1882
**¿Qué ventaja específica ofrece la "detección dinámica de herramientas" de MCP frente a integrar cada capacidad de Azure Language directamente en el código del agente?**

A) La detección dinámica es más rápida en tiempo de ejecución, pero funcionalmente idéntica a codificar cada llamada directamente
B) Las herramientas pueden agregarse, actualizarse o quitarse en el servidor MCP sin modificar el código del agente — el agente consulta el catálogo en tiempo de ejecución en vez de tener conocimiento codificado de cada herramienta ✅
C) La detección dinámica solo funciona con modelos gpt-4.1 o superiores
D) No hay ninguna ventaja real; MCP simplemente añade una capa de latencia adicional

**Explicación:** El valor central de MCP para agentes de IA es la flexibilidad de mantenimiento: como el agente consulta el servidor MCP en tiempo de ejecución para descubrir qué herramientas existen (en vez de tener esa lógica hardcodeada), el catálogo de herramientas puede evolucionar del lado del servidor sin requerir cambios ni redeploys del agente.

---

### Q1883
**Según el módulo, ¿qué capacidades de análisis de texto expone el servidor MCP de lenguaje de Azure además de detección de idioma, NER y PII?**

A) Solo esas tres; no expone ninguna capacidad adicional
B) Text Analytics for Health, que extrae y etiqueta entidades médicas (diagnósticos, medicamentos, síntomas) del texto clínico ✅
C) Generación de imágenes médicas a partir de descripciones de texto
D) Entrenamiento de modelos de clasificación de texto personalizados

**Explicación:** La tabla de capacidades del servidor MCP de lenguaje incluye cuatro filas: Detección de idioma, Reconocimiento de entidades con nombre, Enmascaramiento de PII, y Text Analytics for Health (extracción y etiquetado de entidades médicas clínicas) — esta última es una capacidad especializada que no aparece en el módulo anterior de análisis de texto directo por SDK.

---

### Q1884
**¿Cuál es el formato de la URL del punto de conexión remoto del servidor MCP de lenguaje de Azure?**

A) `https://{foundry-resource-name}.services.ai.azure.com/api/projects/{project_name}`
B) `https://{foundry-resource-name}.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview` ✅
C) `https://ai.azure.com/mcp/language/{foundry-resource-name}`
D) `https://language.azure.com/mcp?resource={foundry-resource-name}`

**Explicación:** El módulo especifica este formato exacto de URL para el servidor MCP remoto de lenguaje, donde `{foundry-resource-name}` se reemplaza por el nombre del recurso Foundry (o del recurso de Azure Language). Es distinto del endpoint del proyecto de Foundry usado para otras llamadas del SDK.

---

### Q1885
**Al conectar el servidor MCP de lenguaje de Azure a un agente desde el portal de Foundry, ¿qué credencial se usa específicamente para la autenticación basada en claves?**

A) `Authorization: Bearer <token>`
B) `Ocp-Apim-Subscription-Key`, usando la clave del proyecto de Foundry ✅
C) `x-api-key`, generada exclusivamente para el servidor MCP
D) No se requiere ninguna credencial; la conexión es anónima por diseño

**Explicación:** El módulo especifica que la conexión del servidor MCP de lenguaje vía autenticación basada en claves usa el header `Ocp-Apim-Subscription-Key`, cuyo valor es la clave del proyecto de Foundry (la misma que aparece en la página principal del proyecto). Si la autenticación basada en claves está deshabilitada por política, se puede usar Entra ID en su lugar.

---

### Q1886
**Este código define la conexión al servidor MCP de lenguaje directamente en el código, sin usar el portal de Foundry:
```python
from azure.ai.projects.models import MCPTool

mcp_tool = MCPTool(
    server_label="azure-language",
    server_url="https://{foundry-resource-name}.cognitiveservices.azure.com/language/mcp?api-version=2025-11-15-preview",
    require_approval="always",
)
```
¿Qué controla el parámetro `require_approval="always"`, y qué propiedad adicional de `MCPTool` permite restringir qué herramientas del servidor puede llamar el agente?**

A) `require_approval` controla el timeout de la llamada; no existe forma de restringir herramientas específicas
B) `require_approval="always"` exige que cada llamada a una herramienta del servidor sea aprobada explícitamente antes de ejecutarse; la propiedad `allowed_tools` permite restringir el agente a un subconjunto específico de herramientas de lenguaje ✅
C) `require_approval` define cuántos reintentos automáticos hace el SDK ante un error de red
D) `MCPTool` no admite ninguna forma de restricción; todas las herramientas del servidor quedan siempre disponibles

**Explicación:** `require_approval="always"` es un control de seguridad: obliga a que cada invocación de herramienta MCP requiera aprobación (del usuario o de una política de auto-aprobación configurada) antes de ejecutarse. `allowed_tools` es la propiedad que permite acotar el conjunto de herramientas de lenguaje específicas a las que el agente tiene acceso, en vez de exponer todo el catálogo del servidor.

---

### Q1887
**Este código construye una aplicación cliente que invoca a un agente de Foundry con herramientas MCP conectadas:
```python
project_client = AIProjectClient(
    endpoint=foundry_endpoint,
    credential=DefaultAzureCredential(),
)
openai_client = project_client.get_openai_client()

response = openai_client.responses.create(
    input=[{"role": "user", "content": prompt}],
    extra_body={"agent_reference": {"name": agent_name, "type": "agent_reference"}},
)
print(response.output_text)
```
¿Cómo se especifica exactamente a QUÉ agente de Foundry se dirige esta llamada?**

A) Mediante la URL del endpoint, que ya identifica de forma única al agente sin parámetros adicionales
B) Mediante el campo `agent_reference` dentro de `extra_body`, indicando el `name` del agente (sensible a mayúsculas/minúsculas) y `type: "agent_reference"` ✅
C) Mediante un header HTTP personalizado `X-Agent-Name` añadido manualmente a la solicitud
D) El agente se selecciona automáticamente según el modelo desplegado, sin necesidad de especificarlo

**Explicación:** El patrón para invocar un agente de Foundry a través de la API de respuestas de OpenAI no pasa el agente en la URL ni en un header custom: se especifica dentro de `extra_body["agent_reference"]`, con el nombre exacto del agente (que es sensible a mayúsculas/minúsculas, como advierte el ejercicio) y `type: "agent_reference"` para indicarle al SDK que resuelva ese nombre a un agente de Foundry en vez de a un modelo directo.

---

### Q1888
**Un usuario envía este mensaje a un agente conectado al servidor MCP de lenguaje: "Dígame qué entidades y fechas se mencionan en esta revisión, y si es positivo o negativo". ¿Qué ocurre en un solo turno según el proceso de selección de herramientas descrito?**

A) El agente solo puede llamar a una herramienta por turno, por lo que responde pidiendo que se divida la solicitud en dos mensajes
B) El agente identifica que el mensaje implica dos tareas distintas, llama a las herramientas de reconocimiento de entidades y análisis de sentimiento en el mismo turno, y sintetiza ambos resultados en una única respuesta coherente ✅
C) El servidor MCP rechaza la solicitud porque combina dos capacidades distintas en un mismo prompt
D) El agente elige aleatoriamente una sola de las dos tareas solicitadas y omite la otra

**Explicación:** El módulo describe explícitamente que cuando un mensaje implica varias tareas de análisis de texto, el agente puede llamar a varias herramientas MCP en un solo turno — cada llamada pasa por el servidor de forma independiente, y el agente combina las salidas de todas en una respuesta única y coherente para el usuario, sin requerir mensajes separados ni lógica de enrutamiento manual del desarrollador.

---

### Q1889
**¿Cómo determina un agente conectado al servidor MCP de lenguaje qué herramienta llamar al procesar el mensaje de un usuario, según la evaluación oficial del módulo?**

A) El desarrollador escribe la lógica de enrutamiento para dirigir cada solicitud a una herramienta específica
B) El agente asocia la instrucción del usuario con las descripciones de herramientas que recibió del servidor MCP, sin necesidad de lógica de enrutamiento codificada por el desarrollador ✅
C) El servidor MCP analiza el mensaje del usuario y lo enruta automáticamente a una herramienta, sin intervención del agente
D) El modelo subyacente del agente ignora las descripciones de herramientas y siempre llama a todas las disponibles

**Explicación:** Esta es la respuesta oficial de la prueba de conocimientos del módulo: el modelo subyacente del agente evalúa el mensaje del usuario contra las descripciones de las herramientas que el servidor MCP le proporcionó al conectarse, y decide autónomamente cuál (o cuáles) invocar — no hay lógica de enrutamiento escrita a mano por el desarrollador, ni el servidor MCP hace ese enrutamiento por su cuenta.

---

### Q1890
**TRAMPA: Un desarrollador afirma que, dado que el agente puede llamar a las herramientas de Azure Language automáticamente vía MCP, ya no es necesario dar ninguna instrucción al agente sobre cuándo usarlas. ¿Por qué es esto incorrecto según el flujo descrito en el módulo?**

A) Es correcto; las instrucciones del agente son opcionales y no afectan el uso de herramientas MCP
B) El módulo muestra explícitamente que, tras conectar la herramienta, se deben actualizar las instrucciones del agente (p. ej. "Use the Azure Language tool to perform text analysis tasks") para dirigirlo a usarla — sin esa instrucción, el agente puede no invocar la herramienta correctamente ✅
C) Las instrucciones del agente solo son necesarias si se usa autenticación basada en claves, no con Entra ID
D) El servidor MCP ignora por completo las instrucciones del agente; solo lee el catálogo de herramientas

**Explicación:** El flujo del módulo es explícito en dos pasos separados: (1) conectar la herramienta MCP al agente, y (2) actualizar las instrucciones del agente para indicarle que debe usar esa herramienta al procesar solicitudes de análisis de texto. Omitir el paso 2 deja al agente con acceso técnico a la herramienta pero sin la guía necesaria para saber cuándo aplicarla, lo cual puede degradar su comportamiento.

---

### Q1891
**¿Qué método de autenticación se usa específicamente al conectar el servidor MCP de lenguaje de Azure a un agente de Foundry, según la prueba de conocimientos del módulo?**

A) Autenticación de OAuth 2.0 con certificado de cliente e identificador de inquilino
B) Autenticación basada en claves mediante la credencial `Ocp-Apim-Subscription-Key` ✅
C) Acceso anónimo que no requiere autenticación ni credenciales
D) Autenticación multifactor con un código enviado por SMS al administrador del recurso

**Explicación:** Esta es la respuesta oficial de la prueba de conocimientos: la conexión del servidor MCP de lenguaje a un agente de Foundry usa autenticación basada en claves con el header `Ocp-Apim-Subscription-Key`, cuyo valor es la clave del proyecto — no OAuth con certificado, ni acceso anónimo, ni MFA.

---

### Q1892
**Un equipo compara dos formas de usar las capacidades de Azure Language: llamar directamente al `TextAnalyticsClient` desde su código (como en el ejercicio de análisis de texto), versus conectar el servidor MCP de lenguaje a un agente de Foundry. ¿Cuál es la diferencia arquitectónica clave entre ambos enfoques?**

A) No hay ninguna diferencia real; ambos enfoques usan exactamente el mismo cliente y los mismos métodos
B) El `TextAnalyticsClient` requiere que el desarrollador escriba código explícito para decidir qué método llamar (`detect_language`, `recognize_entities`, etc.) según cada caso; con MCP, el AGENTE decide dinámicamente qué herramienta invocar según el lenguaje natural del mensaje del usuario, sin lógica de enrutamiento manual ✅
C) El SDK directo solo funciona con autenticación basada en claves; MCP solo funciona con Entra ID
D) MCP reemplaza por completo la necesidad de un recurso de Azure Language; el SDK directo no

**Explicación:** Esta es la distinción conceptual central entre los dos módulos: llamar directamente al SDK (`TextAnalyticsClient`) requiere que el desarrollador escriba la lógica que decide qué operación ejecutar para cada escenario. Con el servidor MCP conectado a un agente, es el modelo subyacente del agente quien interpreta el mensaje en lenguaje natural del usuario y decide autónomamente qué herramienta(s) de Azure Language invocar — el mismo servicio subyacente, pero con la decisión de "qué llamar" desplazada del código del desarrollador al razonamiento del agente.

---

### Q1893
**Al inspeccionar la respuesta completa de un agente con `response.model_dump_json(indent=2)` tras una llamada que usó herramientas MCP de lenguaje, ¿qué información adicional se puede observar más allá del texto final en `output_text`?**

A) Nada adicional; `model_dump_json()` devuelve exactamente el mismo contenido que `output_text`
B) Qué herramientas específicas llamó el agente (por ejemplo, `extract_named_entities_from_text` o `detect_sentiment_from_text`), junto con los argumentos enviados y los resultados devueltos por cada llamada a herramienta ✅
C) Únicamente el tiempo de latencia total de la solicitud, sin detalle de las herramientas usadas
D) La clave de API usada para autenticar la solicitud, expuesta en texto plano

**Explicación:** Mientras que `output_text` da solo la respuesta final sintetizada en lenguaje natural, el JSON completo de la respuesta (`model_dump_json()`) expone el detalle de la ejecución: qué herramientas MCP específicas invocó el agente, con qué argumentos, y qué resultado devolvió cada una — útil para depurar o auditar exactamente qué capacidades de Azure Language se usaron para construir la respuesta final.

---

### Q1894
**Este código transcribe un archivo de audio usando el SDK de OpenAI contra un recurso de Microsoft Foundry:
```python
from openai import AzureOpenAI
from pathlib import Path

client = AzureOpenAI(
    azure_endpoint=YOUR_FOUNDRY_ENDPOINT,
    api_key=YOUR_FOUNDRY_KEY,
    api_version="2025-03-01-preview"
)

audio_file = open(Path("speech.mp3"), "rb")
transcription = client.audio.transcriptions.create(
    model=YOUR_MODEL_DEPLOYMENT,
    file=audio_file,
    response_format="text"
)
print(transcription)
```
¿Qué familia de modelos está pensada para usarse como `YOUR_MODEL_DEPLOYMENT` en este patrón?**

A) `gpt-4o-tts` o `gpt-4o-mini-tts`, ya que cualquier modelo compatible con voz sirve para ambas direcciones
B) `gpt-4o-transcribe`, `gpt-4o-mini-transcribe` o `gpt-4o-transcribe-diarize` — modelos generativos especializados en convertir voz a texto ✅
C) `gpt-4.1`, ya que es el modelo de propósito general recomendado para cualquier tarea multimodal
D) Cualquier modelo de embeddings, ya que `audio.transcriptions.create` opera sobre vectores de audio

**Explicación:** El módulo distingue explícitamente dos familias de modelos compatibles con voz en el catálogo de Foundry: los de transcripción (`gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-4o-transcribe-diarize`, esta última con separación de hablantes) para voz→texto, y los de síntesis (`gpt-4o-tts`, `gpt-4o-mini-tts`) para texto→voz. Usar un modelo TTS en `audio.transcriptions.create` no cumpliría el propósito del endpoint.

---

### Q1895
**Este código sintetiza voz a partir de texto usando el SDK de OpenAI:
```python
with client.audio.speech.with_streaming_response.create(
    model=YOUR_MODEL_DEPLOYMENT,
    voice="alloy",
    input="This speech was AI-generated!",
    instructions="Speak in an upbeat, excited tone.",
) as response:
    response.stream_to_file(speech_file_path)
```
¿Qué controla específicamente el parámetro `instructions` en este método, a diferencia de `voice`?**

A) `instructions` selecciona qué modelo de voz usar; `voice` controla el idioma de salida
B) `voice` selecciona la voz predefinida a usar; `instructions` da una guía en lenguaje natural sobre el ESTILO o tono de la locución (p. ej. "upbeat, excited"), algo que un modelo generativo puede interpretar de forma flexible ✅
C) Ambos parámetros son sinónimos; solo uno de los dos tiene efecto real
D) `instructions` es obligatorio y `voice` es opcional; sin `instructions` la llamada falla

**Explicación:** Esta es una diferencia clave de los modelos TTS generativos frente a un servicio de síntesis tradicional: además de elegir una voz (`voice="alloy"`), se puede pasar una instrucción en lenguaje natural (`instructions`) que el modelo generativo interpreta para ajustar el tono, la emoción o el estilo de la narración — una capacidad de "prompting" que no existe en la API de Text-to-Speech tradicional basada en SSML.

---

### Q1896
**Un equipo compara dos formas de convertir voz a texto disponibles en Microsoft Foundry: (A) `client.audio.transcriptions.create()` del SDK de OpenAI contra un modelo `gpt-4o-mini-transcribe`, y (B) un `SpeechRecognizer` del SDK de Voz de Azure (`azure.cognitiveservices.speech`) contra la API Speech-to-Text. ¿Cuál es la diferencia arquitectónica clave entre ambas?**

A) Son exactamente el mismo servicio expuesto bajo dos SDKs distintos, sin ninguna diferencia real
B) (A) usa un modelo de IA generativa multimodal (familia gpt-4o) a través de la API de OpenAI; (B) usa el servicio dedicado de reconocimiento de voz de Azure Speech, con su propio SDK (`SpeechConfig`/`AudioConfig`/`SpeechRecognizer`) no basado en el SDK de OpenAI ✅
C) (A) solo funciona con archivos de audio en inglés; (B) admite cualquier idioma sin restricción
D) (B) requiere GPU dedicada; (A) puede ejecutarse en cualquier CPU sin diferencia de costo

**Explicación:** Esta es la distinción central entre los dos módulos de voz: uno explora modelos de IA GENERATIVA compatibles con voz (parte de Foundry Models, familia gpt-4o, usados vía el SDK de OpenAI), mientras que el otro explora Azure Speech in Foundry Tools, un servicio de voz dedicado y más maduro (con su propio SDK `azure.cognitiveservices.speech`, objetos `SpeechConfig`/`SpeechRecognizer`/`SpeechSynthesizer`) que además admite SSML, formatos de audio configurables y traducción de habla.

---

### Q1897
**TRAMPA: Un desarrollador necesita generar un diálogo hablado con control fino de pronunciación fonética, pausas explícitas y estilos de voz por fragmento (p. ej. "alegre" en una frase, tono neutro en otra). Decide usar `client.audio.speech.with_streaming_response.create()` del SDK de OpenAI con distintos valores de `instructions` por fragmento. ¿Por qué esto no es el enfoque más preciso según los dos módulos?**

A) Es el enfoque correcto; `instructions` ofrece exactamente el mismo nivel de control que SSML
B) El control fino y determinista (fonemas exactos, pausas medidas, estilos por fragmento dentro de un mismo audio) es la especialidad de SSML sobre el SDK de Voz de Azure (`speak_ssml_async`), no de las `instructions` en lenguaje natural del modelo TTS generativo, que son una guía interpretativa, no una especificación exacta ✅
C) Ninguno de los dos SDKs admite generar diálogos con más de una voz
D) SSML solo funciona con el SDK de OpenAI, nunca con Azure Speech

**Explicación:** El ejemplo de SSML del módulo muestra precisamente este caso de uso: dos voces neuronales distintas (`en-US-AriaNeural`, `en-US-GuyNeural`) en el mismo documento, con `<mstts:express-as style="cheerful">`, fonemas explícitos (`<phoneme alphabet="sapi" ph="...">`) y pausas (`<break strength="weak"/>`) — control exacto y estructurado que SSML permite y que las `instructions` de un modelo generativo TTS (una guía interpretativa en lenguaje natural, no una especificación determinista) no garantizan con la misma precisión.

---

### Q1898
**Este código crea un `SpeechConfig` para Azure Speech en Foundry Tools:
```python
import azure.cognitiveservices.speech as speech_sdk

speech_config = speech_sdk.SpeechConfig(
    subscription="YOUR_FOUNDRY_KEY",
    endpoint="YOUR_FOUNDRY_ENDPOINT"
)
```
¿Qué cambia respecto a versiones del SDK de Python anteriores a la 1.48.2?**

A) Nada; el parámetro `endpoint` siempre estuvo disponible desde la primera versión del SDK
B) Las versiones anteriores a la 1.48.2 requerían especificar la región del recurso en vez del endpoint; la versión más reciente permite usar el endpoint del recurso Foundry directamente, además de la región ✅
C) Las versiones anteriores requerían un `AudioConfig` obligatorio; la versión actual lo hace opcional
D) `SpeechConfig` fue renombrado a `FoundrySpeechConfig` a partir de esa versión

**Explicación:** El módulo señala esta nota de compatibilidad explícitamente: versiones del SDK previas a la 1.48.2 exigían indicar la región de despliegue del recurso en lugar del endpoint; con la versión reciente, `SpeechConfig` acepta el endpoint del recurso Foundry directamente (o, alternativamente, la región), dando más flexibilidad de configuración.

---

### Q1899
**¿Cuál es el patrón de 4 pasos que sigue el uso de la API Speech to Text con el SDK de Voz de Azure?**

A) AudioConfig → SpeechRecognizer → SpeechConfig → resultado
B) SpeechConfig (conexión al recurso) → AudioConfig (origen del audio, opcional) → SpeechRecognizer (creado con ambos) → llamar a un método como `recognize_once_async()` y procesar el `SpeechRecognitionResult` ✅
C) SpeechSynthesizer → SpeechConfig → AudioConfig → resultado
D) No existe un patrón fijo; cada llamada requiere una secuencia distinta según el idioma

**Explicación:** El módulo describe un flujo consistente independientemente del SDK específico: `SpeechConfig` encapsula la conexión (endpoint/región + clave), `AudioConfig` (opcional, por defecto el micrófono) define el origen del audio, ambos se combinan para crear un `SpeechRecognizer` (el cliente proxy de la API), y sus métodos (como `recognize_once_async()`) devuelven un `SpeechRecognitionResult` que hay que inspeccionar vía la propiedad `Reason`.

---

### Q1900
**Este código procesa el resultado de una transcripción con el SDK de Voz de Azure:
```python
result = speech_recognizer.recognize_once_async().get()
if result.reason == speech_sdk.ResultReason.RecognizedSpeech:
    print(f"Transcription:\n{result.text}")
else:
    print("Error transcribing message: {}".format(result.reason))
```
Si el audio se analizó correctamente pero no contenía ninguna voz reconocible, ¿qué valor tomaría `result.reason`?**

A) `RecognizedSpeech`, igual que si hubiera detectado voz
B) `NoMatch` — indica que el audio se analizó correctamente, pero no se reconoció ninguna voz en él (distinto de `Canceled`, que indica un error real) ✅
C) `Canceled`, ya que cualquier resultado sin texto se considera un error de cancelación
D) El SDK lanza una excepción no controlada en ese caso, sin devolver ningún `Reason`

**Explicación:** El módulo distingue tres valores posibles de `Reason`: `RecognizedSpeech` (éxito, con texto en `result.text`), `NoMatch` (el audio se procesó bien pero no había voz reconocible en él — no es un error), y `Canceled` (sí indica un error real, cuya causa se investiga en `Properties` → `CancellationReason`). Confundir `NoMatch` con un error es un error común de manejo de esta API.

---

### Q1901
**Este código sintetiza texto a voz con el SDK de Voz de Azure:
```python
speech_synthesis_result = speech_synthesizer.speak_text_async(text).get()
if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("Speech synthesized for text [{}]".format(text))
elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
    cancellation_details = speech_synthesis_result.cancellation_details
    print("Speech synthesis canceled: {}".format(cancellation_details.reason))
```
¿Dónde queda almacenada la secuencia de audio generada cuando la síntesis se completa correctamente?**

A) Siempre se guarda automáticamente en un archivo llamado `output.wav` en el directorio actual
B) En la propiedad `AudioData` del objeto `SpeechSynthesisResult`, que puede haberse enviado además automáticamente a un altavoz o archivo según lo configurado en `AudioConfig` ✅
C) Se imprime directamente en la consola como texto codificado en Base64
D) Se descarta después de la síntesis; solo se puede consultar `Reason`, no el audio en sí

**Explicación:** Cuando `Reason` es `SynthesizingAudioCompleted`, el objeto `SpeechSynthesisResult` incluye la propiedad `AudioData` con la secuencia de audio generada. Dependiendo del `AudioConfig` usado al crear el `SpeechSynthesizer` (altavoz por defecto, archivo, o `None` para procesar el stream manualmente), ese audio puede además haberse enviado automáticamente a un dispositivo de salida.

---

### Q1902
**¿Qué tres aspectos del audio de salida se pueden configurar mediante `speech_config.set_speech_synthesis_output_format(...)`?**

A) El idioma, la región del recurso, y la clave de autenticación
B) El tipo de archivo de audio, la frecuencia de muestreo, y la profundidad de bits (por ejemplo, `Riff24Khz16BitMonoPcm`) ✅
C) El nombre del archivo de salida, el directorio de destino, y los permisos del archivo
D) El modelo de IA generativa usado internamente y su versión

**Explicación:** El módulo especifica que el formato de audio de salida se controla mediante una enumeración de `SpeechSynthesisOutputFormat` (como `Riff24Khz16BitMonoPcm`), que combina tres dimensiones configurables: el tipo/contenedor de archivo de audio, la frecuencia de muestreo, y la profundidad de bits — sin relación con el idioma, la región del recurso ni las credenciales.

---

### Q1903
**¿Qué propiedad del objeto `SpeechConfig` se usa para cambiar la voz utilizada en la síntesis, según la evaluación oficial del módulo?**

A) Especificar una enumeración `SpeechSynthesisOutputFormat` en el objeto `SpeechConfig`
B) Establecer la propiedad `speech_synthesis_voice_name` del objeto `SpeechConfig` con el nombre de voz deseado (p. ej. `'en-US-Brian:DragonHDLatestNeural'`) ✅
C) Especificar un nombre de archivo en el objeto `AudioConfig`
D) Pasar el nombre de la voz como argumento del método `speak_text_async()`

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo: la voz se selecciona asignando el nombre de voz deseado a `speech_config.speech_synthesis_voice_name` (los nombres codifican configuración regional, nombre de persona y variante, como `en-US-Brian:DragonHDLatestNeural`) — no mediante `SpeechSynthesisOutputFormat` (que controla el formato del audio, no la voz) ni mediante `AudioConfig` (que controla el origen/destino del stream).

---

### Q1904
**¿Qué capacidades específicas habilita SSML (Lenguaje de Marcado de Síntesis de Voz) que NO están disponibles al enviar texto sin formato a un `SpeechSynthesizer`?**

A) Ninguna; SSML y el texto sin formato producen exactamente el mismo resultado de audio
B) Especificar un estilo de habla (p. ej. "alegre"), insertar pausas, especificar fonemas exactos, ajustar la prosodia (altura, timbre, velocidad), usar reglas "say-as" para formatos específicos, e insertar audio grabado ✅
C) SSML solo permite cambiar el idioma del texto, nada relacionado con el estilo o la prosodia
D) SSML es exclusivo del SDK de OpenAI; no se puede usar con Azure Speech

**Explicación:** El módulo lista explícitamente las capacidades que SSML añade sobre el texto plano: estilo de habla con voces neuronales, pausas/silencios, fonemas (pronunciación fonética exacta, como pronunciar "SQL" como "sequel"), ajuste de prosodia, reglas "say-as" (fechas, horas, números de teléfono en el formato correcto), e inserción de audio o voz pregrabada.

---

### Q1905
**Este SSML define un diálogo con dos voces:
```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
  <voice name="en-US-AriaNeural">
    <mstts:express-as style="cheerful">I say tomato</mstts:express-as>
  </voice>
  <voice name="en-US-GuyNeural">
    I say <phoneme alphabet="sapi" ph="t ao m ae t ow"> tomato </phoneme>.
    <break strength="weak"/>Lets call the whole thing off!
  </voice>
</speak>
```
¿Qué método del `SpeechSynthesizer` se usa para enviar este SSML al servicio, en vez de `speak_text_async()`?**

A) `speak_ssml_async()`, pasando la cadena SSML completa como argumento ✅
B) `speak_text_async()`, ya que detecta automáticamente si el string es SSML o texto plano
C) `speak_xml_async()`, un método separado exclusivo para contenido XML
D) No existe un método distinto; hay que convertir el SSML a texto plano antes de enviarlo

**Explicación:** El módulo muestra explícitamente que enviar una descripción SSML requiere el método `speak_ssml_async('<speak>...</speak>')` del `SpeechSynthesizer`, distinto de `speak_text_async()` (que trata el argumento como texto plano sin interpretar ninguna etiqueta de marcado).

---

### Q1906
**Además de Speech-to-Text y Text-to-Speech, ¿qué otras dos API expone Azure Speech en Microsoft Foundry Tools según la introducción del módulo?**

A) Generación de imágenes y generación de video
B) Traducción de habla (traducir entrada de voz a varios idiomas) y Voice Live (agentes de IA que realizan conversaciones en tiempo real) ✅
C) Detección de idioma y extracción de entidades, las mismas capacidades de Azure Language
D) Fine-tuning de modelos de voz personalizados y clasificación de audio

**Explicación:** El módulo enumera cuatro API dentro de Azure Speech in Foundry Tools: Speech-to-Text (reconocimiento), Text-to-Speech (síntesis) — el foco de este módulo — además de Traducción de habla (traduce entrada de voz a varios idiomas) y Voice Live (habilita conversaciones en tiempo real con agentes de IA), estas dos últimas mencionadas pero no desarrolladas en profundidad aquí.

---

### Q1907
**Este código del ejercicio crea un `SpeechConfig` usando autenticación de Entra ID en vez de una clave:
```python
from azure.identity import DefaultAzureCredential
import azure.cognitiveservices.speech as speech_sdk

credential = DefaultAzureCredential()
speech_config = speech_sdk.SpeechConfig(
    token_credential=credential,
    endpoint=foundry_endpoint
)
```
¿Qué parámetro reemplaza a `subscription="YOUR_FOUNDRY_KEY"` para lograr esta autenticación más segura?**

A) `api_key=credential`
B) `token_credential=credential`, pasando el objeto `DefaultAzureCredential()` en vez de una clave estática ✅
C) `entra_id=credential.get_token()`
D) No es posible usar Entra ID con `SpeechConfig`; solo admite autenticación por clave

**Explicación:** Igual que con `TextAnalyticsClient` en el módulo de Azure Language, `SpeechConfig` admite un parámetro `token_credential` que acepta un objeto de credencial de Azure Identity (como `DefaultAzureCredential()`) en vez de `subscription` (la clave estática) — el mismo patrón de "credenciales gestionadas en vez de secretos" recomendado para producción en todo Foundry.

---

### Q1908
**¿Qué dos piezas de información del recurso de Microsoft Foundry se necesitan, como mínimo, para consumirlo mediante el SDK de Voz de Azure, según la evaluación oficial del módulo?**

A) Las zonas principales y secundarias del recurso
B) El punto de conexión y la clave ✅
C) El identificador de suscripción de Azure y el nombre del grupo de recursos
D) El nombre del proyecto de Foundry y la versión de la API únicamente

**Explicación:** Esta es la respuesta oficial de la evaluación: para usar el SDK de Voz de Azure contra un recurso Foundry se necesitan, como mínimo, el endpoint (punto de conexión) y la clave del recurso — no el ID de suscripción, ni el grupo de recursos, ni las zonas de disponibilidad, que son detalles de gestión de infraestructura, no de autenticación del cliente.

---

### Q1909
**Según la evaluación oficial del módulo, ¿qué objeto debe usarse para especificar que la entrada de voz que se va a transcribir a texto proviene de un archivo de audio (en vez del micrófono por defecto)?**

A) `SpeechConfig`
B) `AudioConfig` ✅
C) `SpeechRecognizer`
D) `SpeechSynthesisOutputFormat`

**Explicación:** Esta es la respuesta oficial: `AudioConfig` es específicamente el objeto que define el origen (para reconocimiento) o destino (para síntesis) del stream de audio — por defecto el micrófono o el altavoz del sistema, pero configurable a un archivo con `AudioConfig(filename=file_path)`. `SpeechConfig` encapsula la conexión al recurso, no la fuente de audio.

---

### Q1910
**Un equipo de accesibilidad necesita crear un asistente sin manos que lea correos electrónicos en voz alta con la máxima naturalidad posible, ajustando pausas y énfasis según el contenido (por ejemplo, leer números de teléfono con el formato correcto). ¿Qué combinación de herramientas del módulo es la más apropiada?**

A) El SDK de OpenAI con `client.audio.speech.with_streaming_response.create()`, ya que cualquier modelo TTS generativo es suficiente sin ningún control adicional
B) El SDK de Voz de Azure (`SpeechSynthesizer`) usando SSML (`speak_ssml_async`) con reglas "say-as" para formatear números de teléfono correctamente y ajustes de prosodia/pausas para naturalidad ✅
C) Azure Document Intelligence, ya que puede generar audio directamente desde texto estructurado
D) El servidor MCP de lenguaje de Azure, ya que expone una herramienta de síntesis de voz

**Explicación:** Este escenario requiere control preciso y determinista (formato correcto de números de teléfono, pausas ajustadas) — exactamente lo que SSML ofrece a través del SDK de Voz de Azure, en particular las reglas "say-as" mencionadas explícitamente en el módulo para expresar cadenas como fechas, horas o números de teléfono en su forma hablada correcta, algo que un modelo TTS generativo con `instructions` en lenguaje natural no garantiza con la misma precisión.

---

### Q1911
**TRAMPA: Un desarrollador ve que tanto el módulo de "aplicación de IA generativa compatible con voz" como el de "Azure Speech en Foundry Tools" pertenecen a la misma ruta de aprendizaje ("Desarrollo de soluciones de lenguaje natural en Azure") y concluye que ambos usan el mismo paquete de Python. ¿Por qué es esto incorrecto?**

A) Es correcto; ambos módulos importan exactamente `import azure.cognitiveservices.speech`
B) El módulo de IA generativa usa el SDK de OpenAI (`from openai import AzureOpenAI`) contra modelos del catálogo Foundry Models; el módulo de Azure Speech usa un paquete completamente distinto, `azure.cognitiveservices.speech` (instalado como `azure-cognitiveservices-speech`), con sus propias clases `SpeechConfig`/`SpeechRecognizer`/`SpeechSynthesizer` ✅
C) Ninguno de los dos módulos requiere instalar ningún paquete adicional
D) El módulo de Azure Speech en realidad usa el SDK de OpenAI también, solo que con otro nombre de import

**Explicación:** Pertenecer a la misma ruta de aprendizaje no implica compartir SDK: son dos superficies de API distintas dentro de Foundry. El primero llama a modelos generativos multimodales (familia gpt-4o) a través del SDK de OpenAI estándar; el segundo consume el servicio dedicado Azure Speech a través de un SDK completamente separado (`azure-cognitiveservices-speech`), con su propio modelo de objetos no compatible con el de OpenAI.

---

### Q1912
**En el ejercicio de la aplicación de correo de voz (`voice-mail.py`), el código reutiliza el mismo objeto `speech_config` tanto para grabar un saludo (síntesis) como para transcribir mensajes (reconocimiento), cambiando solo el objeto asociado en cada caso. ¿Qué principio de diseño del SDK de Voz de Azure ilustra esto?**

A) `SpeechConfig` es exclusivo para síntesis; usarlo para reconocimiento en el mismo objeto es un error que el ejercicio pasa por alto
B) `SpeechConfig` encapsula únicamente la conexión al recurso (endpoint/credencial), independiente de la operación — el mismo objeto puede combinarse con un `AudioOutputConfig` para crear un `SpeechSynthesizer`, o con un `AudioConfig` de entrada para crear un `SpeechRecognizer` ✅
C) El ejercicio en realidad crea dos objetos `SpeechConfig` distintos, uno por operación, aunque con el mismo nombre de variable
D) `SpeechConfig` decide automáticamente si la operación es síntesis o reconocimiento según el contenido del archivo `.env`

**Explicación:** Esta es la separación de responsabilidades central del SDK: `SpeechConfig` solo encapsula CÓMO conectarse al recurso (autenticación + endpoint), sin saber ni importarle qué operación se va a realizar. Es el objeto de audio con el que se combina (`AudioConfig` de entrada para reconocimiento, `AudioOutputConfig` de salida para síntesis) el que determina si el resultado es un `SpeechRecognizer` o un `SpeechSynthesizer` — permitiendo reutilizar la misma configuración de conexión para ambas operaciones.

---

### Q1913
**¿Cuál es la respuesta oficial a "¿qué modelo puede usar para generar texto a partir de voz?" en la evaluación del módulo de IA generativa compatible con voz, y cómo se distingue de la pregunta complementaria sobre sintetizar voz a partir de texto?**

A) `gpt-4o-mini-tts` para ambas preguntas, ya que es el único modelo mencionado en el módulo
B) `gpt-4o-mini-transcribe` para generar TEXTO a partir de VOZ (transcripción); `gpt-4o-mini-tts` para sintetizar VOZ a partir de TEXTO — son operaciones inversas con familias de modelos distintas y no intercambiables ✅
C) `gpt-4o-mini` (el modelo base, sin sufijo) para ambos casos, ya que puede procesar cualquier modalidad
D) Ninguno de los modelos mencionados puede realizar ninguna de las dos operaciones sin fine-tuning adicional

**Explicación:** Esta es una distinción de examen clásica basada en el nombre del sufijo del modelo: `-transcribe` indica voz→texto (transcripción), `-tts` (text-to-speech) indica texto→voz (síntesis). La evaluación oficial del módulo confirma exactamente esta asociación: `gpt-4o-mini-transcribe` para "generar texto a partir de voz", y `gpt-4o-mini-tts` para "sintetizar voz a partir de texto" — confundir los sufijos es el error más común en este tipo de pregunta.

---

### Q1914
**¿Qué dos funcionalidades principales expone el servidor MCP de Voz de Azure a los agentes, y qué formatos de audio admite la conversión de voz en texto?**

A) Traducción de idioma y resumen de texto; solo admite formato WAV
B) Reconocimiento de voz a texto (Reconocer) y síntesis de texto a voz; el reconocimiento admite WAV, MP3, OGG, FLAC, MP4, M4A, AAC y otros formatos comunes ✅
C) Reconocimiento de entidades con nombre y análisis de sentimiento; no procesa archivos de audio directamente
D) Generación de imágenes a partir de audio y transcripción de video

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo: el servidor MCP de Voz de Azure expone exactamente dos capacidades —conversión de voz en texto (con soporte para múltiples formatos de audio comunes, selección de idioma y sugerencias de frase) y texto a voz (con voces neuronales configurables)— no las capacidades de Azure Language (NER, sentimiento) que pertenecen a un servidor MCP distinto.

---

### Q1915
**¿Por qué el servidor MCP de Voz de Azure requiere específicamente una cuenta de Azure Storage, a diferencia del servidor MCP de lenguaje (texto) que no la necesita?**

A) Para almacenar las instrucciones y la configuración del propio agente
B) Porque, a diferencia de las herramientas MCP de solo texto, este servidor trabaja con archivos de audio: guarda los archivos generados por texto-a-voz en un contenedor de Blob Storage, y puede leer archivos de entrada desde ese mismo contenedor (vía URL de SAS) para la conversión de voz en texto ✅
C) Para almacenar en caché las definiciones de las herramientas del servidor MCP y acelerar su detección
D) Azure Storage es opcional en este servidor; solo se usa si el agente también necesita persistir historial de chat

**Explicación:** Esta es una distinción arquitectónica clave que la evaluación oficial del módulo confirma: el contenido que produce/consume este servidor MCP no es texto (que cabe en la respuesta JSON), sino archivos de audio binarios — por eso necesita un almacén de blobs intermedio, algo que ningún servidor MCP de solo texto (como el de lenguaje) requiere.

---

### Q1916
**Al conectar el servidor MCP de Voz de Azure a un agente desde el portal de Foundry, ¿qué dos credenciales/valores se configuran, además del nombre del recurso Foundry?**

A) Solo una clave de API; no se requiere ningún otro parámetro
B) `Bearer` (`Ocp-Apim-Subscription-Key`) con la clave del proyecto de Foundry, Y `X-Blob-Container-Url` con la URL de SAS del contenedor de blobs ✅
C) Un certificado de cliente y el identificador de suscripción de Azure
D) Un token de OAuth 2.0 y la URL del punto de conexión de la identidad administrada

**Explicación:** Esta es la respuesta oficial de la evaluación: la conexión de este servidor MCP requiere DOS credenciales distintas —la clave del proyecto de Foundry (vía el header `Ocp-Apim-Subscription-Key`) para autenticar contra el servicio de voz, y la URL de SAS del contenedor de blobs (`X-Blob-Container-Url`) para que el servidor tenga permiso de leer/escribir archivos de audio— no solo una.

---

### Q1917
**TRAMPA: Un desarrollador incluye la URL de SAS del contenedor de blobs directamente en las instrucciones del agente (como texto plano dentro del prompt del sistema) para que sea "fácil de referenciar". ¿Por qué el módulo señala esto explícitamente como una mala práctica?**

A) No es un problema; las instrucciones del agente son privadas y nunca se exponen
B) El módulo instruye tratar las URLs de SAS como secretos: no insertarlas en el código fuente, las solicitudes del agente NI las transcripciones de chat — hacerlo las expone en cualquier lugar donde esas instrucciones o transcripciones sean visibles o se registren ✅
C) El problema es solo de rendimiento: incluir la URL en el prompt aumenta la latencia de cada respuesta
D) Es una mala práctica únicamente si el contenedor tiene más de un archivo

**Explicación:** El módulo es explícito en su sección de "Consideraciones de seguridad": las URLs de SAS deben tratarse como secretos, con el tiempo de expiración más corto posible, y específicamente NO deben insertarse en código fuente, solicitudes del agente, ni transcripciones de chat — insertarlas en las instrucciones del agente viola justamente esta última prohibición, exponiendo el secreto en cualquier log o transcripción.

---

### Q1918
**¿Cómo se especifica una voz determinada (p. ej. `en-GB-SoniaNeural`) al usar la herramienta de texto a voz a través de un agente conectado al servidor MCP de Voz, según la evaluación oficial del módulo?**

A) Configurando la voz en la configuración del servidor MCP antes de conectarse — es un valor fijo por conexión
B) Incluyendo el nombre de la voz directamente en la instrucción en lenguaje natural enviada al agente (p. ej. `Synthesize "..." as speech using the voice "en-GB-SoniaNeural"`) ✅
C) Estableciendo una variable de entorno en el código de la aplicación cliente
D) No es posible seleccionar una voz específica; el agente siempre usa la voz predeterminada del recurso

**Explicación:** Esta es la respuesta oficial: a diferencia de un parámetro de configuración fijo, la voz (junto con idioma, sugerencias de frase, y filtrado de lenguaje obsceno) se especifica dinámicamente dentro del propio prompt en lenguaje natural que el usuario envía al agente — el agente interpreta esa instrucción y la traduce en los parámetros correctos al llamar a la herramienta MCP de texto a voz.

---

### Q1919
**Este código conecta el servidor MCP de Voz directamente en el código (sin usar el portal de Foundry):
```python
from azure.ai.projects.models import MCPTool

mcp_tool = MCPTool(
    server_label="azure-speech",
    server_url="https://{foundry-resource-name}.cognitiveservices.azure.com/speech/mcp",
    require_approval="always",
)
```
¿Qué patrón comparte esta configuración con la conexión en código del servidor MCP de lenguaje (texto) del módulo anterior?**

A) Ninguno; cada servidor MCP requiere una clase completamente distinta del SDK
B) Ambos usan la misma clase `MCPTool` del SDK `azure-ai-projects`, con la misma estructura de parámetros (`server_label`, `server_url`, `require_approval`) — solo cambia el `server_label`/`server_url` para apuntar al servicio de voz en vez de al de lenguaje ✅
C) El servidor de voz requiere obligatoriamente `allowed_tools`, mientras que el de lenguaje no admite ese parámetro
D) El servidor de voz no soporta conexión por código, solo por portal

**Explicación:** Este es un patrón consistente en Foundry: todos los servidores MCP de Foundry Tools (lenguaje, voz, y otros) se conectan mediante la misma clase `MCPTool` del SDK, con la misma forma de parámetros — la única diferencia entre conectar uno u otro es la URL del servidor y su etiqueta, reflejando que MCP es un protocolo genérico, no una integración ad-hoc por servicio.

---

### Q1920
**¿Qué transporte usa Voice Live API para la comunicación bidireccional en tiempo real, y cómo se clasifican los eventos JSON que la gestionan?**

A) HTTP con polling; los eventos se clasifican por prioridad (alta/media/baja)
B) Conexiones WebSocket; los eventos se clasifican en eventos de cliente (enviados de cliente a servidor, como `session.update`) y eventos de servidor (enviados del servidor al cliente, como `response.done`) ✅
C) gRPC con streaming unidireccional; no hay distinción entre tipos de evento
D) Server-Sent Events (SSE); los eventos se clasifican por el modelo que los generó

**Explicación:** A diferencia de las herramientas MCP de voz/lenguaje basadas en solicitud-respuesta HTTP, Voice Live API usa WebSocket para mantener una conexión bidireccional persistente de baja latencia — necesaria para conversación de voz a voz en tiempo real. Los eventos JSON se dividen claramente en dos direcciones: eventos de cliente (`session.update`, `input_audio_buffer.append`, `response.create`) y eventos de servidor (`session.updated`, `response.done`, `conversation.item.created`).

---

### Q1921
**¿Cuáles son los dos métodos de autenticación admitidos por Voice Live API, y cuál usa el ámbito `https://ai.azure.com/.default`?**

A) Autenticación básica y claves de API; ninguno usa ámbitos OAuth
B) Microsoft Entra (sin clave, recomendado) y clave de API; la autenticación de Entra usa un token Bearer generado con el ámbito `https://ai.azure.com/.default` (o el heredado `https://cognitiveservices.azure.com/.default`) ✅
C) OAuth 2.0 y JWT; ambos requieren un certificado de cliente
D) Solo clave de API; Entra ID no es compatible con conexiones WebSocket

**Explicación:** Esta es la respuesta oficial de la evaluación del módulo: los dos métodos son Microsoft Entra (sin claves, requiere el rol "Usuario de Cognitive Services" y un token Bearer en el header `Authorization`) y clave de API (vía header `api-key` antes del protocolo de enlace, o como parámetro de cadena de consulta — esta última cifrada al usar https/wss).

---

### Q1922
**¿Cuál es la diferencia entre el endpoint de "conexión del proyecto" y el de "conexión de modelo" en Voice Live API?**

A) Son endpoints completamente distintos con formatos de URL no relacionados
B) Ambos usan la misma forma de URL WebSocket base (`wss://<recurso>.services.ai.azure.com/voice-live/realtime` o `.cognitiveservices.azure.com/voice-live/realtime`); la diferencia está en los parámetros de consulta: `model` para conexión directa a un modelo, o `agent_id`+`project_id` para usar un agente de Foundry ✅
C) La conexión de modelo requiere WebSocket; la conexión de proyecto usa HTTP REST tradicional
D) Solo la conexión de proyecto admite autenticación por clave de API

**Explicación:** El módulo aclara que "el punto de conexión es el mismo para todos los modelos" — lo que distingue si te conectas a un modelo directamente o a través de un agente de Foundry no es la URL base sino los parámetros de consulta que se envían: `model` para el caso directo, o `agent_id`/`project_id` cuando se usa el servicio de agentes.

---

### Q1923
**Este evento configura una sesión de Voice Live:
```json
{
  "type": "session.update",
  "session": {
    "modalities": ["text", "audio"],
    "voice": { "type": "openai", "name": "alloy" },
    "input_audio_format": "pcm16",
    "turn_detection": {
      "type": "azure_semantic_vad",
      "threshold": 0.5,
      "prefix_padding_ms": 300,
      "silence_duration_ms": 500
    },
    "temperature": 0.8
  }
}
```
¿Qué controla específicamente `turn_detection` con `type: "azure_semantic_vad"`?**

A) El volumen de salida del audio sintetizado
B) La detección inteligente de cuándo el usuario terminó de hablar (fin de turno), usando detección de actividad de voz semántica de Azure — en vez de un simple umbral de silencio, mejora el flujo natural de la conversación ✅
C) El idioma en el que el modelo debe responder
D) La resolución de vídeo del avatar asociado a la sesión

**Explicación:** El módulo recomienda explícitamente usar "VAD semántico de Azure para la detección inteligente de turnos y mejorar el flujo de la conversación" — a diferencia de un VAD simple basado solo en silencio/umbral, el VAD semántico considera el contenido lingüístico para decidir con más precisión cuándo el usuario realmente terminó su turno, reduciendo interrupciones falsas o esperas innecesarias.

---

### Q1924
**Este código configura reducción de ruido y cancelación de eco en una sesión de Voice Live:
```json
{
  "type": "session.update",
  "session": {
    "input_audio_noise_reduction": { "type": "azure_deep_noise_suppression" },
    "input_audio_echo_cancellation": { "type": "server_echo_cancellation" }
  }
}
```
¿Qué beneficio adicional señala el módulo sobre la reducción de ruido, más allá de "sonido más limpio"?**

A) Ninguno; solo mejora la experiencia auditiva subjetiva del usuario
B) Mejora la precisión del VAD (detección de actividad de voz) y el rendimiento del modelo, al filtrar el audio de entrada antes de que llegue a esos componentes ✅
C) Reduce el costo de la llamada a la API en proporción al ruido eliminado
D) Es un requisito obligatorio sin el cual la sesión no puede establecerse

**Explicación:** El módulo incluye una nota explícita sobre esto: "La reducción del ruido mejora la precisión del VAD y el rendimiento del modelo filtrando el audio de entrada" — es decir, no es solo una mejora cosmética de audio, sino que tiene un efecto en cascada sobre la calidad de la detección de turnos y de la comprensión del modelo.

---

### Q1925
**Este código muestra el patrón mínimo de autenticación con clave de API en el SDK de Voice Live:
```python
import asyncio
from azure.core.credentials import AzureKeyCredential
from azure.ai.voicelive import connect

async def main():
    async with connect(
        endpoint="your-endpoint",
        credential=AzureKeyCredential("your-api-key"),
        model="gpt-4o"
    ) as connection:
        pass

asyncio.run(main())
```
Según una nota "Importante" del módulo, ¿qué restricción arquitectónica se aplica al SDK de Voice Live a partir de la versión 1.0.0?**

A) Solo admite Python 3.9 o inferior
B) El SDK es exclusivamente asincrónico a partir de esa versión — la API sincrónica está en desuso, y todos los ejemplos usan sintaxis `async`/`await` ✅
C) Deja de admitir autenticación por clave de API, solo Entra ID
D) Requiere obligatoriamente el uso de la biblioteca PyAudio incluso para conexiones sin audio

**Explicación:** El módulo advierte explícitamente: "A partir de la versión 1.0.0, este SDK es solo asincrónico. La API sincrónica está en desuso para centrarse exclusivamente en patrones asincrónicos." Esto es consistente con la naturaleza de streaming en tiempo real de Voice Live, donde un modelo bloqueante/síncrono no puede procesar eventos de servidor mientras espera enviar los del cliente.

---

### Q1926
**Este código maneja eventos de una sesión de Voice Live:
```python
async for event in connection:
    if event.type == ServerEventType.SESSION_UPDATED:
        print(f"Session ready: {event.session.id}")
    elif event.type == ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED:
        print("User started speaking")
        # Stop playback and cancel any current response
    elif event.type == ServerEventType.RESPONSE_AUDIO_DELTA:
        audio_bytes = event.delta
    elif event.type == ServerEventType.ERROR:
        print(f"Error: {event.error.message}")
```
¿Por qué es CRÍTICO manejar `INPUT_AUDIO_BUFFER_SPEECH_STARTED` deteniendo la reproducción inmediatamente, según explica el módulo?**

A) No es crítico; es solo una optimización de ahorro de ancho de banda
B) Si el cliente no cancela la reproducción de audio del agente al detectar que el usuario empezó a hablar, sigue reproduciendo la última respuesta hasta que la interrupción se procese en la API — provocando que el agente "hable sobre" el usuario ✅
C) Porque de lo contrario la conexión WebSocket se cierra automáticamente por timeout
D) Porque el evento `RESPONSE_AUDIO_DELTA` deja de enviarse si no se maneja este evento primero

**Explicación:** El módulo señala esto como el ejemplo central de por qué "el control adecuado de los eventos garantiza una interacción más fluida": la latencia entre que el usuario empieza a hablar y que la API procesa esa interrupción es real, así que el CLIENTE debe reaccionar de inmediato (deteniendo su propia reproducción de audio en curso) en vez de esperar pasivamente a que el servidor se lo confirme — de lo contrario el usuario experimenta al agente "atropellando" su intervención.

---

### Q1927
**¿Qué tres ventajas ofrece usar un agente de Microsoft Foundry con Voice Live, frente a conectarse directamente a un modelo?**

A) Ninguna; conectar directamente a un modelo siempre es preferible por menor latencia
B) Los agentes encapsulan instrucciones y configuración (en vez de especificarlas en cada sesión de código), admiten lógica de conversación compleja mantenible sin cambiar el cliente, y simplifican la integración porque basta el ID del agente para que toda la configuración se controle internamente ✅
C) Los agentes son obligatorios; Voice Live no permite conexión directa a un modelo bajo ninguna circunstancia
D) La única ventaja es el costo: los agentes son más baratos que la conexión directa a modelos

**Explicación:** El módulo lista estas ventajas explícitamente: separar la lógica de conversación (vivida en el agente) de la implementación de voz (en el cliente) facilita mantenimiento y escalabilidad cuando se necesitan varias experiencias conversacionales, sin tener que reescribir o duplicar configuración de sesión en cada cliente que se conecta.

---

### Q1928
**Este fragmento crea un agente con configuración de Voice Live embebida en sus metadatos:
```python
agent = project_client.agents.create_version(
    agent_name="AGENT_NAME",
    definition=PromptAgentDefinition(
        model="MODEL_DEPLOYMENT_NAME",
        instructions="You are a helpful assistant.",
    ),
    metadata=chunk_config(json.dumps(voice_live_config))
)
```
¿Por qué el módulo implementa una función auxiliar `chunk_config()` para trocear el JSON de configuración en vez de pasarlo directamente como un único valor de metadato?**

A) Es una preferencia estilística sin ninguna restricción técnica real
B) Los metadatos de un agente tienen un límite de 512 caracteres por entrada; `chunk_config()` divide la configuración de Voice Live (que puede superar ese límite) en múltiples entradas de metadatos numeradas (`microsoft.voice-live.configuration`, `.1`, `.2`, ...) ✅
C) El troceo es necesario porque el SDK de Voice Live no admite JSON anidado
D) Es un requisito de seguridad para evitar que la configuración se filtre en logs

**Explicación:** El propio comentario del código lo indica: "Helper function for Voice Live configuration chunking (to handle 512-char metadata limit)". Cuando la configuración serializada de Voice Live (voces, VAD, reducción de ruido, etc.) supera los 512 caracteres permitidos por entrada de metadato del agente, hay que particionarla en varias claves consecutivas que el servicio reensambla al leerlas.

---

### Q1929
**En la clase `AudioProcessor` de la app cliente de Voice Live, el método `clear_playback_queue()` vacía la cola de reproducción pendiente. ¿En qué punto exacto del flujo de eventos se invoca esta limpieza, y por qué ahí específicamente?**

A) Al recibir `RESPONSE_AUDIO_DONE`, para liberar memoria después de que la respuesta terminó normalmente
B) Al recibir `INPUT_AUDIO_BUFFER_SPEECH_STARTED` (el usuario empezó a hablar/interrumpir), porque es el momento exacto en que hay que descartar cualquier audio del agente que aún esté en cola para reproducirse, evitando que siga sonando sobre la nueva intervención del usuario ✅
C) Al iniciar la aplicación, como parte de la inicialización antes de cualquier evento
D) Nunca se invoca automáticamente; requiere que el usuario presione un botón de "detener" explícito

**Explicación:** Esto es la implementación concreta del principio de manejo de interrupciones descrito en el módulo: el handler de `INPUT_AUDIO_BUFFER_SPEECH_STARTED` llama a `self.audio_processor.clear_playback_queue()` — vaciando inmediatamente cualquier chunk de audio del agente que aún esté pendiente de reproducirse, para que la interrupción del usuario se sienta instantánea en vez de tener que esperar a que termine el audio en curso.

---

### Q1930
**Según la evaluación oficial del módulo de Voice Live, ¿qué protocolo se usa específicamente para la integración de streaming de avatares?**

A) HTTP/2
B) WebRTC ✅
C) gRPC
D) El mismo WebSocket usado para los eventos de audio/texto de la sesión

**Explicación:** Esta es la respuesta oficial: aunque la sesión de conversación en sí usa WebSocket, el streaming de vídeo del avatar (incluyendo animación y blendshapes) usa específicamente WebRTC — un protocolo distinto, optimizado para vídeo en tiempo real, iniciado mediante el evento `session.avatar.connect` que intercambia una oferta SDP.

---

### Q1931
**Según la evaluación oficial del módulo, ¿cómo se configura y prueba la integración de un agente de Voice Live directamente en el portal de Foundry, sin escribir código?**

A) No es posible; Voice Live solo es accesible a través de la API REST o el SDK de Python
B) Habilitando el modo voz en el área de juegos del agente, desde donde se puede configurar idioma, voz, VAD, mejora de audio y avatar, y probar la conversación en vivo ✅
C) Únicamente a través del entorno de pruebas separado de Azure Speech in Foundry Tools Voice Live, no integrado al área de juegos del agente
D) Editando manualmente el archivo `.env` del proyecto de Foundry con los parámetros de Voice Live

**Explicación:** Esta es la respuesta oficial: el propio portal de Foundry permite habilitar "Modo de voz" directamente en el área de juegos (playground) del agente, exponiendo un panel de configuración de Voice Live (idioma, VAD, mejora de audio, voz, respuesta provisional, avatar) sin necesidad de tocar código — la app cliente en Python es necesaria solo para integrar la conversación en una aplicación propia, no para probar la funcionalidad.

---

### Q1932
**Según la evaluación oficial del módulo, ¿qué acción concreta detiene la reproducción de audio cuando un usuario interrumpe al agente de voz?**

A) No es posible: el usuario debe esperar a que el agente termine de hablar
B) Gestionar el evento `ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED` ✅
C) Restablecer por completo la sesión de Voice Live y borrar el historial de conversación
D) Enviar un evento `response.cancel` antes de que el usuario empiece a hablar, de forma preventiva

**Explicación:** Esta es la respuesta oficial de la evaluación, y coincide exactamente con el patrón de manejo de eventos mostrado en el código del módulo: el evento de servidor `INPUT_AUDIO_BUFFER_SPEECH_STARTED` es la señal que el cliente debe capturar para detener inmediatamente cualquier reproducción de audio en curso — no requiere reiniciar la sesión completa ni ninguna acción preventiva antes de que ocurra la interrupción.

---

### Q1933
**Un equipo compara los TRES módulos de voz vistos hasta ahora: (A) modelos de voz generativos vía SDK de OpenAI (`gpt-4o-transcribe`/`gpt-4o-tts`), (B) Azure Speech SDK dedicado (`SpeechRecognizer`/`SpeechSynthesizer`) y servidor MCP de Voz, y (C) Voice Live API/SDK. ¿Cuál es la distinción de mayor nivel entre los tres?**

A) Los tres son intercambiables y solo difieren en el lenguaje de programación usado
B) (A) y (B) operan en un patrón de solicitud-respuesta discreta (enviar audio/texto completo, recibir un resultado completo); (C) es fundamentalmente distinto porque mantiene una conexión WebSocket persistente y bidireccional para conversación de voz a voz EN TIEMPO REAL, con interrupciones, VAD y streaming continuo de audio ✅
C) (A) y (C) requieren Azure Storage obligatoriamente; solo (B) no lo requiere
D) Solo (C) admite autenticación por clave de API; (A) y (B) exigen Entra ID exclusivamente

**Explicación:** Esta es la distinción arquitectónica que unifica los tres módulos de voz de la ruta de aprendizaje: transcribir un archivo completo o sintetizar un texto completo (A y B, incluso a través de un agente MCP) son operaciones discretas de solicitud-respuesta; Voice Live (C), en cambio, es una sesión continua de baja latencia sobre WebSocket diseñada específicamente para diálogo hablado natural en tiempo real, con manejo de turnos, interrupciones y streaming — un caso de uso que ni el SDK de OpenAI ni el SDK clásico de Azure Speech resuelven por sí solos.

---

### Q1934
**¿Cuáles son los dos servicios de Foundry Tools que soportan traducción, y qué distingue a cada uno?**

A) Azure Translator (solo voz) y Azure Speech (solo texto) — cada uno cubre exactamente una modalidad
B) Azure Translator (traducción de texto completa, con más de 90 idiomas y modelos personalizados) y Azure Speech (traducción de voz a texto, y de voz a voz en varios idiomas simultáneamente) ✅
C) Solo Azure Translator soporta traducción; Azure Speech en Foundry Tools no tiene ninguna funcionalidad de traducción
D) Azure Translator y Azure Speech son el mismo servicio con dos nombres distintos en el catálogo de Foundry

**Explicación:** El módulo distingue claramente los dos servicios: Azure Translator in Foundry Tools se especializa en texto (traducción, transliteración, documentos, modelos custom), mientras que Azure Speech in Foundry Tools cubre el caso de voz — incluyendo la capacidad de traducir voz de entrada a varios idiomas de destino simultáneamente, algo que Translator (solo texto) no hace.

---

### Q1935
**Este código conecta un `TextTranslationClient` a un recurso de Foundry de dos maneras distintas:
```python
from azure.core.credentials import AzureKeyCredential
from azure.ai.translation.text import *

key_credential = AzureKeyCredential("FOUNDRY_KEY")

client = TextTranslationClient(credential=key_credential, endpoint="FOUNDRY_ENDPOINT")
client = TextTranslationClient(credential=key_credential, region="FOUNDRY_REGION")
```
¿Qué tienen en común estas dos formas de conectar el cliente?**

A) Nada; solo una de las dos es válida, la otra generará un error
B) Ambas usan la misma credencial de clave (`AzureKeyCredential`); la diferencia es solo CÓMO se identifica el recurso al servicio — por su endpoint específico, o por la región en la que está aprovisionado — no cambia el método de autenticación ✅
C) La versión con `region` no requiere ninguna credencial, a diferencia de la versión con `endpoint`
D) Solo la versión con `endpoint` admite autenticación por clave; la de `region` requiere Entra ID obligatoriamente

**Explicación:** El módulo muestra estas dos formas como alternativas equivalentes de identificar el recurso de destino: usar el endpoint específico del recurso de Foundry, o simplemente indicar la región donde está aprovisionado (dejando que el SDK resuelva el endpoint regional correspondiente) — ambas usan la misma `AzureKeyCredential` para autenticar.

---

### Q1936
**¿Cuáles son los tres tipos de puntos de conexión que pueden usarse con Azure Translator, según el módulo?**

A) Solo el punto de conexión global; no existen variantes regionales ni de recurso Foundry
B) Punto de conexión global (`api.cognitive.microsofttranslator.com`), puntos de conexión regionales (`api-nam.`/`api-apc.`/`api-eur.cognitive.microsofttranslator.com`), y puntos de conexión de recursos de Foundry (`{foundry-resource-name}.cognitiveservices.azure.com`) ✅
C) Solo puntos de conexión de recursos de Foundry; el global y los regionales fueron descontinuados
D) Punto de conexión de desarrollo, de staging y de producción — cada uno con distinto nivel de SLA

**Explicación:** El módulo lista explícitamente estos tres tipos de endpoint. Esta es una distinción de examen relevante: un mismo cliente puede apuntar a un endpoint global compartido, a uno regional específico (para reducir latencia geográfica), o directamente al endpoint de un recurso de Foundry — cada uno con implicaciones distintas de disponibilidad y aislamiento de recursos.

---

### Q1937
**Este código traduce dos frases en idiomas no especificados a francés e inglés:
```python
input_text_elements = [InputTextItem(text="Hola"), InputTextItem(text="こんにちは")]
translation_results = client.translate(body=input_text_elements, to_language=["fr", "en"])

for translation in translation_results:
    sourceLanguage = translation.detected_language
    for translated_text in translation.translations:
        print(f"... translated from {sourceLanguage.language} to {translated_text.to} as '{translated_text.text}'.")
```
¿Qué ocurre cuando NO se especifica el parámetro `from_language` en la llamada a `translate`?**

A) La llamada falla; `from_language` es siempre obligatorio
B) Azure Translator detecta automáticamente el idioma de origen de cada elemento de texto, exponiendo el resultado en `translation.detected_language` — por eso el ejemplo puede procesar "Hola" (español) y "こんにちは" (japonés) sin indicar sus idiomas de antemano ✅
C) El servicio asume que todo el texto está en inglés por defecto
D) Solo se traduce el primer elemento de la lista; los demás se ignoran sin ese parámetro

**Explicación:** El módulo señala explícitamente: "puede omitir este parámetro para que Azure Translator detecte automáticamente el idioma de origen". Este ejemplo lo demuestra procesando dos textos en idiomas distintos y no anunciados (español y japonés) en la misma llamada, recuperando el idioma detectado de cada uno vía `translation.detected_language`.

---

### Q1938
**¿Cuál es la diferencia fundamental entre `client.translate()` y `client.transliterate()` en el SDK de Azure Translator?**

A) Son sinónimos; ambos métodos hacen exactamente lo mismo
B) `translate()` convierte el significado del texto a otro idioma (p. ej. "こんにちは" → "Hello"); `transliterate()` representa el mismo texto en OTRO SISTEMA DE ESCRITURA sin cambiar el idioma ni el significado (p. ej. "こんにちは" en Hiragana → "Kon'nichiwa" en alfabeto latino) ✅
C) `translate()` solo funciona con texto escrito en alfabeto latino; `transliterate()` con cualquier otro alfabeto
D) `transliterate()` es una versión más rápida pero menos precisa de `translate()`

**Explicación:** Esta es la distinción clave que la evaluación oficial del módulo prueba directamente: traducir cambia el IDIOMA y el significado (español→francés); transliterar cambia el SISTEMA DE ESCRITURA manteniendo el mismo idioma y pronunciación aproximada (japonés en Hiragana → japonés representado en alfabeto latino) — confundir ambos es el error más común en preguntas de escenario sobre este servicio.

---

### Q1939
**¿Qué función de `TextTranslationClient` se debe usar para convertir la palabra rusa "спасибо" (caracteres cirílicos) a "spasibo" (caracteres latinos), según la evaluación oficial del módulo?**

A) `get_supported_language`, para verificar primero que el ruso es un idioma admitido
B) `translate`, ya que cualquier cambio de representación de texto se considera una traducción
C) `transliterate` ✅
D) Ninguna de las anteriores; este cambio requiere un modelo LLM externo al servicio

**Explicación:** Esta es la respuesta oficial de la evaluación: convertir "спасибо" a "spasibo" no cambia el idioma (sigue siendo la palabra rusa para "gracias"), solo su representación gráfica de cirílico a latino — exactamente la definición de transliteración, no de traducción.

---

### Q1940
**Este código configura la traducción de voz a varios idiomas de destino simultáneamente:
```python
translation_cfg.speech_recognition_language = 'en-US'
translation_cfg.add_target_language('fr')
translation_cfg.add_target_language('ja')

audio_cfg = speech_sdk.AudioConfig(use_default_microphone=True)
translator = speech_sdk.translation.TranslationRecognizer(
    translation_config=translation_cfg, audio_config=audio_cfg)

translation_results = translator.recognize_once_async().get()
translations = translation_results.translations
for translation_language in translations:
    print(f"{translation_language}: '{translations[translation_language]}'")
```
¿Qué tipo de objeto es `translations`, y por qué eso permite iterar sobre múltiples idiomas de destino a la vez?**

A) Es una cadena de texto única con todas las traducciones concatenadas
B) Es un diccionario donde cada clave es el código de idioma de destino (`'fr'`, `'ja'`) y el valor es el texto traducido a ese idioma — por eso una sola llamada a `recognize_once_async()` puede devolver traducciones a TODOS los idiomas configurados con `add_target_language()`, no solo uno ✅
C) Es una lista ordenada donde solo el primer elemento contiene una traducción válida
D) `translations` siempre contiene exactamente un solo idioma; para varios se necesitan múltiples objetos `TranslationRecognizer`

**Explicación:** `add_target_language()` puede llamarse varias veces para acumular múltiples idiomas de destino en la misma configuración; el resultado de reconocimiento (`translation_results.translations`) es un diccionario indexado por código de idioma, permitiendo iterar sobre todas las traducciones generadas por una única captura de voz, sin necesidad de repetir el reconocimiento por idioma.

---

### Q1941
**¿Cuáles son los dos enfoques para implementar traducción de voz A VOZ (no solo a texto) descritos en el módulo, y en qué se diferencian?**

A) Síntesis local y síntesis remota; la diferencia es solo dónde se ejecuta el código
B) Síntesis manual (combinar `TranslationRecognizer` con un `SpeechSynthesizer` separado, iterando manualmente sobre cada traducción — funciona con múltiples idiomas de destino) y síntesis basada en eventos (usar el evento `synthesizing` del propio `TranslationRecognizer` para capturar el audio vía `GetAudio()` — limitado a traducción 1:1, un solo idioma de destino) ✅
C) Síntesis síncrona y síntesis asíncrona; ambas admiten múltiples idiomas de destino por igual
D) No existen dos enfoques distintos; solo hay una forma de sintetizar traducciones en Azure Speech

**Explicación:** El módulo distingue explícitamente estos dos patrones y su trade-off: la síntesis manual requiere más código (dos objetos separados, iterar y sintetizar cada traducción) pero funciona con múltiples idiomas simultáneos; la síntesis basada en eventos es más compacta (captura el audio directamente desde el evento `synthesizing` del reconocedor) pero el módulo advierte explícitamente: "No se puede usar la síntesis basada en eventos para la traducción en varios idiomas" — solo sirve para 1:1.

---

### Q1942
**TRAMPA: Un desarrollador necesita traducir voz de entrada a TRES idiomas de destino simultáneamente (francés, español e hindi) y sintetizar cada traducción como audio. Decide usar el enfoque de síntesis basada en eventos (`synthesizing` + `GetAudio()`) por ser "más simple". ¿Por qué esto fallará según lo indicado en el módulo?**

A) No fallará; la síntesis basada en eventos admite cualquier número de idiomas de destino sin restricción
B) El módulo indica explícitamente que la síntesis basada en eventos NO puede usarse para traducción en varios idiomas — solo funciona en el caso 1:1 (un idioma de origen, un único idioma de destino); con tres idiomas de destino, se debe usar el enfoque de síntesis manual (`TranslationRecognizer` + `SpeechSynthesizer` separado, iterando sobre cada traducción) ✅
C) El problema real es que `TranslationRecognizer` solo admite un idioma de origen, sin relación con el número de destinos
D) La síntesis basada en eventos falla solo si el idioma de destino no está en inglés

**Explicación:** Esta es la nota explícita del módulo que se pasa por alto fácilmente: la elegancia del enfoque basado en eventos tiene un costo — está limitado estructuralmente al caso 1:1. Para el escenario de tres idiomas de destino simultáneos (como en el ejercicio del módulo, que traduce a francés/español/hindi), la única opción correcta es la síntesis manual, iterando sobre el diccionario `translations` y creando un `SpeechSynthesizer` por cada traducción.

---

### Q1943
**Este código del ejercicio configura `SpeechTranslationConfig` usando autenticación de Entra ID:
```python
credential = DefaultAzureCredential()
translation_cfg = speech_sdk.translation.SpeechTranslationConfig(
    token_credential=credential,
    endpoint=foundry_endpoint
)
```
¿Qué parámetro reemplaza aquí a `subscription="FOUNDRY_KEY"` (autenticación por clave)?**

A) `api_key=credential`
B) `token_credential=credential` ✅
C) `entra_credential=credential`
D) No es posible usar Entra ID con `SpeechTranslationConfig`, solo con `SpeechConfig`

**Explicación:** El mismo patrón visto en `SpeechConfig` (para reconocimiento/síntesis simple) se repite en `SpeechTranslationConfig`: el parámetro `token_credential` acepta un objeto de Azure Identity (como `DefaultAzureCredential()`) en vez de `subscription` (clave estática) — consistencia de diseño en todo el SDK de Voz de Azure para soportar autenticación gestionada.

---

### Q1944
**En la aplicación de traducción de voz del ejercicio, se usan DOS objetos de configuración separados: `SpeechTranslationConfig` (para `TranslationRecognizer`) y `SpeechConfig` (para `SpeechSynthesizer`). ¿Por qué no basta con un único objeto de configuración?**

A) Es un error de diseño del ejercicio; en realidad un solo `SpeechConfig` podría cubrir ambas operaciones
B) `SpeechTranslationConfig` es una configuración especializada para RECONOCER y TRADUCIR voz de entrada (con `speech_recognition_language` e idiomas de destino vía `add_target_language`); `SpeechConfig` es la configuración genérica para SINTETIZAR voz de salida (con `speech_synthesis_voice_name`) — son responsabilidades distintas del pipeline voz-a-voz, cada una con su propio tipo de configuración ✅
C) `SpeechTranslationConfig` no puede autenticarse con las mismas credenciales que `SpeechConfig`
D) Solo se necesita `SpeechTranslationConfig`; `SpeechConfig` es opcional y puede omitirse sin afectar el resultado

**Explicación:** El pipeline de traducción de voz a voz tiene dos fases claramente separadas en el SDK: reconocer+traducir la entrada hablada (responsabilidad de `SpeechTranslationConfig`/`TranslationRecognizer`) y sintetizar cada texto traducido de vuelta a audio (responsabilidad de `SpeechConfig`/`SpeechSynthesizer`, con su propia voz por idioma vía el diccionario `voices`) — cada objeto de configuración encapsula una etapa distinta del flujo.

---

### Q1945
**Según la evaluación oficial del módulo, ¿qué objeto del SDK de Voz de Azure se debe usar para especificar los idiomas a los que se desea traducir la voz?**

A) `SpeechConfig`
B) `SpeechTranslationConfig` ✅
C) `AudioConfig`
D) `TranslationRecognizer`

**Explicación:** Esta es la respuesta oficial de la evaluación: `SpeechTranslationConfig` es el objeto donde se configuran `speech_recognition_language` (idioma de origen) y se acumulan los idiomas de destino vía `add_target_language()` — no `SpeechConfig` (síntesis genérica), `AudioConfig` (origen/destino del stream de audio) ni `TranslationRecognizer` (el cliente que ejecuta la operación usando esa configuración).

---

### Q1946
**Un equipo de soporte técnico multilingüe necesita: (a) traducir automáticamente tickets de texto entrantes a inglés para el equipo central, y (b) durante llamadas en vivo, traducir la voz del cliente a inglés hablado para el agente que no habla el idioma del cliente. ¿Qué combinación de servicios de Foundry Tools corresponde a cada tarea?**

A) Azure Speech para ambas tareas, ya que puede procesar tanto texto como voz indistintamente
B) (a) Azure Translator (`TextTranslationClient.translate()`) para los tickets de texto; (b) Azure Speech (`TranslationRecognizer` con `SpeechTranslationConfig`) para la traducción de voz en vivo durante la llamada ✅
C) Azure Translator para ambas tareas, incluyendo la traducción de voz en vivo
D) Ninguno de los dos servicios admite traducción en tiempo real; se requiere un servicio de terceros

**Explicación:** Este escenario ilustra la separación de responsabilidades vista en todo el módulo: cuando el insumo es texto (tickets), el servicio correcto es Azure Translator; cuando el insumo es voz en vivo (la llamada), se necesita Azure Speech con su API de traducción específica (`TranslationRecognizer`), que además puede opcionalmente sintetizar la traducción de vuelta a voz para el agente.

---

### Q1947
**¿Qué patrón siguen las voces neuronales especificadas para sintetizar cada idioma en el ejemplo de síntesis manual del módulo (`voices = {"fr": "fr-FR-HenriNeural", "ja": "ja-JP-NanamiNeural"}`)?**

A) Un identificador numérico secuencial sin relación con el idioma o la región
B) `{código de idioma}-{código de región}-{Nombre}Neural` — codifica el idioma, la variante regional, y un nombre de voz específico (p. ej. `fr-FR` para francés de Francia, con la voz `HenriNeural`) ✅
C) Solo el nombre de la persona, sin ningún prefijo de idioma o región
D) El mismo identificador `alloy`/`echo`/`fable` usado por los modelos TTS generativos de OpenAI

**Explicación:** Este es el mismo formato de nombre de voz visto en el módulo de síntesis de voz clásica (`speech_synthesis_voice_name`): código de idioma-región seguido del nombre de la voz y el sufijo "Neural" — permitiendo elegir una voz apropiada para CADA idioma de destino cuando se traduce a varios simultáneamente, como se ve en el diccionario `voices` que mapea cada código de idioma a su voz correspondiente.

---

### Q1948
**Según la evaluación oficial del módulo, ¿qué función de `TextTranslationClient` se debe usar para convertir la palabra china "你好" a la palabra en inglés "Hello"?**

A) `get_supported_language`
B) `translate` ✅
C) `transliteración` (transliterate)
D) Ninguna; requiere combinar `translate` y `transliterate` en secuencia

**Explicación:** Esta es la respuesta oficial: "你好" → "Hello" es un cambio de IDIOMA y significado (chino a inglés), no solo de sistema de escritura — es exactamente el caso de uso de `translate`, no de `transliterate` (que se reservaría para, por ejemplo, representar "你好" en pinyin romanizado sin traducirlo al inglés).

---

### Q1949
**¿Qué método se usa para obtener la lista completa de idiomas admitidos por Azure Translator, y qué información devuelve por cada idioma?**

A) `client.list_languages()`, que devuelve solo los códigos ISO sin nombres legibles
B) `client.get_supported_languages(scope="translation")`, que devuelve un diccionario indexado por código de idioma donde cada entrada incluye el nombre legible del idioma (p. ej. `languages.translation["af"].name` → "Afrikaans") ✅
C) `client.translate(body=[], to_language=["*"])`, usando un comodín para listar en vez de traducir
D) No existe un método para esto; los idiomas admitidos solo están documentados de forma estática

**Explicación:** El módulo muestra este método explícitamente devolviendo más de 130 idiomas soportados, cada uno accesible por su código ISO como clave del diccionario `languages.translation`, con el nombre legible disponible vía `.name` — útil para poblar dinámicamente un selector de idiomas en una aplicación cliente sin hardcodear la lista.

---

### Q1950
**Un desarrollador nota que el endpoint mostrado en el playground de Azure Translator del portal de Foundry (`https://{foundry-resource-name}.cognitiveservices.azure.com/`) usa "un formato más antiguo para Azure AI Services". Según el módulo, ¿qué implicación tiene esto?**

A) Ese endpoint ya no funciona y debe reemplazarse por uno nuevo antes de usarlo
B) A pesar de ser un formato heredado, sigue siendo válido y se usa tanto para conectar con el recurso de Azure Translator en un recurso Foundry como para conectar con Azure Speech tools — el mismo endpoint sirve para ambos servicios ✅
C) Solo es válido para Azure Translator; Azure Speech requiere un formato de endpoint distinto y más moderno
D) Este formato de endpoint solo funciona con autenticación por clave, nunca con Entra ID

**Explicación:** El módulo lo señala explícitamente en el ejercicio: aunque el formato `{recurso}.cognitiveservices.azure.com` es "un formato más antiguo para Azure AI Services", sigue siendo el endpoint funcional que conecta tanto a Azure Translator como a Azure Speech dentro del mismo recurso de Foundry — de hecho, el ejercicio reutiliza el mismo valor de endpoint del archivo `.env` para ambas aplicaciones (texto y voz).

---

### Q1951
**Comparando este módulo de traducción con el módulo de Azure Language (detección de idioma/NER/PII) visto anteriormente, ¿qué tienen en común sus patrones de autenticación por código?**

A) Nada; cada servicio de Foundry Tools usa un mecanismo de autenticación completamente distinto e incompatible
B) Ambos siguen el mismo patrón dual: un parámetro de clave estática (`AzureKeyCredential`/`subscription`) para desarrollo simple, y un parámetro `credential`/`token_credential` que acepta `DefaultAzureCredential()` para producción — consistente en `TextTranslationClient`, `TextAnalyticsClient`, `SpeechConfig` y `SpeechTranslationConfig` ✅
C) Solo Azure Translator admite autenticación por clave; los demás servicios exigen Entra ID exclusivamente
D) El patrón de autenticación cambia según el SDK, sin ninguna convención compartida en Foundry Tools

**Explicación:** Este es un patrón de diseño consistente que se repite en TODOS los clientes de Foundry Tools vistos en esta ruta de aprendizaje (Language, Speech, Translator, Voice Live): dos vías de autenticación —clave estática para simplicidad en desarrollo, y credencial de Azure Identity (recomendada para producción)— reflejando una convención deliberada del SDK, no una coincidencia entre servicios.

---

### Q1952
**¿Qué capacidad adicional de Azure Translator (más allá de traducir cadenas de texto sueltas) menciona el módulo, relacionada con documentos completos?**

A) Ninguna; Azure Translator solo procesa cadenas de texto individuales, nunca archivos completos
B) Traducir documentos completos, de forma sincrónica o asincrónica, manteniendo la estructura original del documento ✅
C) Generar automáticamente un resumen del documento antes de traducirlo
D) Convertir automáticamente el documento traducido a un archivo de audio

**Explicación:** El módulo menciona esta capacidad entre las funcionalidades de Azure Translator, aunque aclara que "nos centraremos en la API de traducción de texto en este módulo" (dejando la traducción de documentos como una capacidad adicional documentada por separado) — junto con el uso de modelos de traducción personalizados para terminología específica de dominio, ambas mencionadas pero no desarrolladas en profundidad en este módulo introductorio.

---

### Q1953
**Un equipo compara los cuatro módulos de la ruta "Desarrollo de soluciones de lenguaje natural en Azure" relacionados con audio/traducción: Azure Language (texto), voz generativa/Azure Speech (voz), servidores MCP (agentes), y Traducción (este módulo). ¿Qué rol distintivo cumple la traducción dentro de ese conjunto?**

A) Es completamente redundante con Azure Language, que ya cubre traducción como parte de sus capacidades principales
B) Es el único módulo centrado específicamente en CONVERTIR contenido entre idiomas (tanto texto como voz), mientras que los demás se centran en EXTRAER información (entidades, PII, sentimiento) o en GENERAR/TRANSFORMAR audio dentro del MISMO idioma (transcripción, síntesis, conversación en tiempo real) ✅
C) Es un módulo puramente teórico sin ninguna API o SDK involucrado, a diferencia de los demás
D) Solo cubre traducción de texto; a pesar del título, no incluye ninguna funcionalidad de voz

**Explicación:** Esta distinción de alto nivel organiza los módulos de Domain 4 relacionados con lenguaje/voz: Azure Language extrae metadatos e información de texto (sin cambiar el idioma), los módulos de voz (generativa, Speech SDK, MCP, Voice Live) transforman entre voz y texto DENTRO del mismo idioma, y este módulo de Traducción es el único centrado en el cruce ENTRE idiomas distintos, para texto (`Translator`) y para voz (`Speech Translation`/`TranslationRecognizer`).

---
