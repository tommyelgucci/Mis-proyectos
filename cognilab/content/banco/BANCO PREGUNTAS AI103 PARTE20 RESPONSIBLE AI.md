# BANCO DE PREGUNTAS AI-103 — PARTE 20 (Q1650-Q1669)
## Domain 4: IA Responsable — Pilares, fases, capas de mitigación y Content Safety
### Generado: 2026-08-19 | Fuente: guía "Domain 3 y Domain 4 en profundidad"

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
