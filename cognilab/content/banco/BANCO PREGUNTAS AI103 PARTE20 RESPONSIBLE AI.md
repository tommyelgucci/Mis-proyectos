# BANCO DE PREGUNTAS AI-103 — PARTE 20 (Q1650-Q1669, Q1874-Q1913)
## Domain 4: IA Responsable y Text Analysis — Pilares, capas de mitigación, Content Safety, Azure Language, servidor MCP de lenguaje y voz (speech-to-text / text-to-speech)
### Generado: 2026-08-19 (ampliado 2026-08-21) | Fuente: guía "Domain 3 y Domain 4 en profundidad" + módulos MS Learn "Análisis de texto con lenguaje de Azure en Foundry Tools", "Desarrollo de un agente de análisis de texto con el servidor MCP de lenguaje de Azure", "Desarrollo de una aplicación de IA generativa compatible con voz" y "Creación de aplicaciones habilitadas para voz con Azure Speech en Microsoft Foundry Tools"

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
