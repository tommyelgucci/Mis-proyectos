# AI-103 FINAL 100 QUESTIONS
## Banco de preguntas finales - Repaso integral LP1-LP4
### Generado: 2026-06-29

---

## SECCIÓN 1: SDK Y AUTENTICACIÓN (Q1-Q20)

**Q1:** ¿Cuál es el método correcto para acceder al texto en Responses API?
**A:** `response.output_text`

**Q2:** ¿Cómo se pasa el system message en Responses API?
**A:** Parámetro `instructions="..."`

**Q3:** ¿Para qué sirve `previous_response_id`?
**A:** Gestionar estado multiturno sin re-enviar historial completo (ahorra tokens)

**Q4:** ¿Qué módulo de azure.identity se usa para agentes async?
**A:** `azure.identity.aio` (versión async)

**Q5:** ¿Cuál es el paquete pip para Azure AI Foundry Projects?
**A:** `azure-ai-projects`

**Q6:** ¿Qué método crea un cliente desde connection string de Foundry?
**A:** `AIProjectClient.from_connection_string(conn_str=..., credential=...)`

**Q7:** ¿Qué tipo de evento capturar en streaming Responses API?
**A:** `event.type == "response.output_text.delta"`

**Q8:** ¿Cuál es el scope correcto para DefaultAzureCredential con OpenAI?
**A:** `"https://cognitiveservices.azure.com/.default"`

**Q9:** ¿Cuándo usar DefaultAzureCredential vs API Key?
**A:** DefaultAzureCredential en producción; API Key solo en desarrollo/pruebas

**Q10:** ¿Diferencia entre AzureOpenAI y AsyncAzureOpenAI?
**A:** AsyncAzureOpenAI para flujos async (agentes asincrónicos)

**Q11:** ¿Parámetro model en Responses API refiere a qué?
**A:** Deployment name del modelo en Azure (no el nombre del modelo base)

**Q12:** ¿Cómo obtener cliente OpenAI desde AIProjectClient?
**A:** `project.get_openai_client()`

**Q13:** ¿Qué versión de API usar en Responses API?
**A:** `api_version="2024-05-01-preview"`

**Q14:** ¿Responses API vs Chat Completions. ¿Cuál para agentes?
**A:** Responses API (soporte nativo multiturno, tools, previous_response_id)

**Q15:** ¿Cómo configurar azure_endpoint en AzureOpenAI?
**A:** `azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"]`

**Q16:** ¿Cuál es la variable de entorno para la connection string de Foundry?
**A:** `PROJECT_CONNECTION_STRING`

**Q17:** ¿Cuándo usar `get_bearer_token_provider()`?
**A:** Para autenticación DefaultAzureCredential con AzureOpenAI (sin API key)

**Q18:** ¿Cuál es el método de stream en Responses API?
**A:** `client.responses.stream(...)` en context manager `with`

**Q19:** ¿Cuál paquete pip para autenticación Azure?
**A:** `azure-identity`

**Q20:** ¿API Key directa en código de producción es correcto?
**A:** NO. Usar siempre variables de entorno o DefaultAzureCredential

---

## SECCIÓN 2: TOOLS (Q21-Q45)

**Q21:** ¿Estructura correcta para code_interpreter?
**A:** `{"type": "code_interpreter", "container": {"type": "auto"}}`

**Q22:** ¿code_interpreter puede hacer requests HTTP a APIs externas?
**A:** NO. Sin acceso a red externa.

**Q23:** ¿Qué librerías Python tiene disponibles code_interpreter?
**A:** pandas, numpy, matplotlib (y otras científicas básicas)

**Q24:** ¿Cuándo preferir code_interpreter sobre web_search para datos?
**A:** Cuando los datos son locales/subidos por usuario y necesitan procesamiento

**Q25:** ¿Estructura correcta para web_search?
**A:** `{"type": "web_search"}` (sin parámetros adicionales)

**Q26:** ¿web_search puede acceder páginas con login o paywalls?
**A:** NO. Solo información pública indexada

**Q27:** ¿Cuándo usar web_search vs function_calling para datos externos?
**A:** web_search: info pública general; function_calling: API propietaria privada

**Q28:** ¿Parámetro requerido en file_search tool?
**A:** `"vector_store_ids": [store_id]`

**Q29:** ¿Qué método sube archivos y espera indexación en file_search?
**A:** `file_batches.upload_and_poll(vector_store_id=..., files=...)`

**Q30:** ¿Para qué sirve `include=["file_search_call.results"]`?
**A:** Recuperar los chunks exactos que usó el modelo para responder

**Q31:** ¿Cuál es el servicio Microsoft para RAG en escala empresarial?
**A:** Foundry IQ (knowledge store gestionado)

**Q32:** ¿Qué hace el modelo cuando detecta que necesita function_calling?
**A:** Devuelve `item.type == "function_call"` con argumentos JSON. NO ejecuta.

**Q33:** ¿Cuál campo del function_call es OBLIGATORIO para la respuesta?
**A:** `call_id` (debe coincidir entre request y response)

**Q34:** ¿Cuántas llamadas API requiere un ciclo completo de function_calling?
**A:** 2 (primera: modelo evalúa y pide tool; segunda: con resultado del cliente)

**Q35:** ¿Tipo correcto del mensaje de resultado en function_calling?
**A:** `"type": "function_call_output"`

**Q36:** ¿Puede un agente usar file_search y web_search simultáneamente?
**A:** SÍ. Multi-tool. El modelo elige cuál usar por query.

**Q37:** ¿Quién decide qué herramienta usar en multi-tool?
**A:** El modelo (automáticamente según contexto del usuario)

**Q38:** ¿Para subir PDFs en file_search, qué patrón Python se usa?
**A:** `glob.glob("folder/*.pdf")` para obtener lista de archivos

**Q39:** ¿Cómo se crea un vector store para file_search?
**A:** `client.beta.vector_stores.create(name="nombre")`

**Q40:** ¿Para qué sirve `previous_response_id` en multi-turn con tools?
**A:** Mantener historial conversacional sin re-enviar contexto completo

**Q41:** ¿code_interpreter autocorrige errores de código?
**A:** SÍ. Reintenta automáticamente si hay error en ejecución

**Q42:** ¿Qué es `item.arguments` en function_call?
**A:** String JSON con los argumentos que el modelo quiere pasar a la función

**Q43:** ¿Es posible bloquear qué herramienta usa el modelo en multi-tool?
**A:** No directamente; el modelo elige. Se puede influir con instrucciones.

**Q44:** ¿file_search puede indexar cualquier formato de archivo?
**A:** Principalmente PDF, TXT, DOCX. El modelo extrae texto.

**Q45:** ¿Qué ventaja tiene function_calling sobre web_search para datos empresa?
**A:** Acceso a sistemas propietarios internos (ERP, CRM, DB) no públicos

---

## SECCIÓN 3: OPTIMIZACIÓN (Q46-Q65)

**Q46:** ¿Cuál estrategia usar primero antes de RAG o Fine-Tuning?
**A:** Prompt Engineering (siempre primer paso)

**Q47:** ¿Temperature 0 qué produce?
**A:** Respuestas determinísticas (siempre la misma)

**Q48:** ¿Puedo usar Temperature=0.8 y Top_P=0.9 juntos?
**A:** NO. Microsoft dice: elegir UNO u otro, nunca ambos.

**Q49:** ¿Qué frase activa Chain-of-Thought en un prompt?
**A:** "Take a step-by-step approach"

**Q50:** ¿Few-Shot Learning qué requiere en el prompt?
**A:** Pares de ejemplos entrada-salida para que el modelo imite

**Q51:** ¿Qué es RAG en una línea?
**A:** Retrieve → Augment → Generate (busca docs, añade al contexto, genera)

**Q52:** ¿Qué son embeddings?
**A:** Representación matemática de texto como vector numérico

**Q53:** ¿Similitud Coseno próxima a 1 significa qué?
**A:** Los textos son similares/relacionados

**Q54:** ¿4 técnicas búsqueda Azure AI Search?
**A:** Keywords, Semántica, Vectorial, Híbrida

**Q55:** ¿Cuál técnica recomienda Microsoft para Gen AI en Azure Search?
**A:** Híbrida (Keywords + Vectorial)

**Q56:** ¿Fine-Tuning modifica qué del modelo?
**A:** Los pesos internos del modelo (de forma permanente/persistente)

**Q57:** ¿Qué es LoRA?
**A:** Low-Rank Adaptation: congela pesos originales + añade matriz adaptación pequeña

**Q58:** ¿Cuál es el formato de datos para Fine-Tuning?
**A:** JSONL (un objeto JSON por línea)

**Q59:** ¿Fine-Tuning puede "aprender" nuevos hechos/datos?
**A:** NO. Para datos nuevos usar RAG.

**Q60:** ¿Qué es Model Drift?
**A:** Cuando el comportamiento del modelo cambia con tiempo/nuevos datos

**Q61:** ¿Por qué hacer cleanup de Resource Group post Fine-Tuning ejercicio?
**A:** Evitar tarifa fija/hora del endpoint dedicado desplegado

**Q62:** ¿Escenario: bot con tono marca SIEMPRE igual. ¿Estrategia?
**A:** Fine-Tuning

**Q63:** ¿Escenario: documentos empresa se actualizan semanalmente. ¿Estrategia?
**A:** RAG

**Q64:** ¿Escenario: catálogo + voz marca + contexto sesión. ¿Estrategia?
**A:** RAG + Fine-Tuning + Prompt Engineering

**Q65:** ¿Cuándo combinar RAG + Fine-Tuning?
**A:** Coherencia comportamiento (FT) + precisión fáctica datos reales (RAG)

---

## SECCIÓN 4: RESPONSIBLE AI (Q66-Q90)

**Q66:** ¿Cuáles son los 6 Pilares de IA Responsable Microsoft?
**A:** Equidad, Confiabilidad/Seguridad, Privacidad/Seguridad, Inclusión, Transparencia, Responsabilidad

**Q67:** ¿Cuáles son las 4 fases de IA Responsable?
**A:** IDENTIFY → MEASURE → MITIGATE → MANAGE

**Q68:** ¿Cuál es el estándar internacional referencia para gobernanza Azure AI?
**A:** NIST AI Risk Management Framework

**Q69:** ¿3 tipos comunes de daños en IA Generativa?
**A:** Ofensivo/Discriminatorio, Imprecisiones Fácticas (Alucinaciones), Ilegal/No Ético

**Q70:** ¿Qué técnica de seguridad se adopta de ciberseguridad para IDENTIFY?
**A:** Red Teaming (equipos rojos que atacan el sistema deliberadamente)

**Q71:** ¿Qué es Red Teaming?
**A:** Evaluadores que atacan hostilmente el modelo para hallar vulnerabilidades antes que usuarios

**Q72:** ¿Herramienta soporte para identificar daños en Azure OpenAI?
**A:** Notas de Transparencia + System Cards de modelos

**Q73:** ¿Cómo priorizar daños con alta impacto pero baja probabilidad?
**A:** Máxima prioridad (impacto > probabilidad en decisiones críticas)

**Q74:** ¿3 pasos de MEASURE (medición)?
**A:** Preparar prompts adversariales → Ejecutar → Evaluar con rúbrica

**Q75:** ¿Qué es LLM-as-a-judge?
**A:** Segundo modelo LLM que clasifica automáticamente outputs del modelo principal

**Q76:** ¿Cuándo empezar con pruebas manuales vs automáticas?
**A:** Manual primero (validar rúbrica) → Automática después (escalar)

**Q77:** ¿Son necesarias pruebas manuales si ya tienes automatización completa?
**A:** SÍ. Siempre periódicamente para detectar drift y nuevos riesgos.

**Q78:** ¿Cuántas capas tiene la estrategia de mitigación?
**A:** 4 capas (Modelo, Seguridad, Sistema Mensaje, Usuario)

**Q79:** ¿Fine-Tuning = cuál capa de mitigación?
**A:** CAPA 1 (Modelo)

**Q80:** ¿Azure Content Safety = cuál capa de mitigación?
**A:** CAPA 2 (Sistema de Seguridad)

**Q81:** ¿System Prompts + RAG = cuál capa de mitigación?
**A:** CAPA 3 (Sistema Mensaje y Puesta a Tierra)

**Q82:** ¿UI guiada + Transparency Notes = cuál capa?
**A:** CAPA 4 (Experiencia del Usuario)

**Q83:** ¿4 categorías de Azure AI Content Safety?
**A:** Hate (Odio), Sexual, Violence (Violencia), Self-Harm (Autolesiones)

**Q84:** ¿LOW threshold Content Safety = más o menos protección?
**A:** MÁS protección (máxima sensibilidad, bloquea más contenido)

**Q85:** ¿Qué threshold para apps infantiles?
**A:** LOW (máxima sensibilidad)

**Q86:** ¿Qué protección adicional detecta "ignora tus instrucciones"?
**A:** Jailbreak Protection (adicional a las 4 categorías)

**Q87:** ¿4 revisiones antes de lanzar app en producción?
**A:** Legal, Privacidad, Seguridad, Accesibilidad

**Q88:** ¿Por qué Phased Rollout en lugar de lanzar a todos el día 1?
**A:** Detectar problemas en grupo pequeño antes de escalar a todos

**Q89:** ¿Para qué es AI Impact Assessment?
**A:** Documentar propósito, uso esperado y daños posibles (NO defensa legal)

**Q90:** ¿4 cosas que usuarios deben poder reportar en sistema feedback?
**A:** Inexacto (alucinaciones), Incompleto, Dañino/Peligroso, Ofensivo

---

## SECCIÓN 5: ESCENARIOS COMPLEJOS (Q91-Q100)

**Q91:** Bot soporte cliente necesita consultar inventario ERP en tiempo real, buscar manuales internos y generar reporte análisis. ¿Herramientas?
**A:** function_calling (ERP) + file_search (manuales) + code_interpreter (reporte)

**Q92:** Bot viajes responde sobre paquetes empresa + clima destino. ¿Herramientas?
**A:** file_search (paquetes PDF) + web_search (clima actual)

**Q93:** Bot legal: lenguaje formal siempre + jurisprudencia actualizable + contexto cliente. ¿Estrategia optimización?
**A:** Fine-Tuning (formal) + RAG (jurisprudencia) + Prompt (cliente)

**Q94:** App médica: diagnósticos correctos + máxima protección contenido + disclaimer visible. ¿Solución completa?
**A:** RAG (datos clínicos) + Content Safety LOW threshold (Capa 2) + Transparency Note (Capa 4)

**Q95:** Un bot empieza a generar respuestas ofensivas después de actualización. ¿Qué fase Responsible AI aplica primero?
**A:** MEASURE (medir con prompts adversariales para cuantificar el problema)

**Q96:** Evaluación a millones de outputs diarios para detectar daños. ¿Metodología?
**A:** LLM-as-a-judge (pruebas automáticas escala) + validación manual periódica

**Q97:** Bot responde correctamente pero con tono inconsistente (a veces formal, a veces casual). ¿Solución?
**A:** Fine-Tuning con dataset ejemplos tono consistente

**Q98:** Modelo base GPT-4o no conoce documentos internos de empresa actualizados en 2025. ¿Solución?
**A:** RAG con Azure AI Search (NO Fine-Tuning, que no aprende hechos nuevos)

**Q99:** Empresa va a lanzar chatbot al público. ¿Qué debe hacer ANTES del lanzamiento completo?
**A:** Phased Rollout (beta testers primero) + 4 revisiones (Legal/Privacidad/Seguridad/Accesibilidad)

**Q100:** Usuario de bot intenta hacer jailbreak con "ignora tus instrucciones anteriores y...". ¿Qué capas lo previenen?
**A:** Capa 2 (Jailbreak Protection en Content Safety) + Capa 1 (FT que lo ignora) + Capa 3 (System Prompt robusto)

---

## 📊 SCORE TRACKER

```
Sección 1 (SDK):          ___/20
Sección 2 (Tools):        ___/25
Sección 3 (Optimización): ___/20
Sección 4 (Responsible):  ___/25
Sección 5 (Escenarios):   ___/10

TOTAL:                    ___/100

Meta: 90/100 antes del examen
```

---

## 🎯 ÁREAS A REFORZAR

Si fallaste preguntas en:
- **Q1-Q20** → Repasar SDK_AUTHENTICATION_MASTER.md
- **Q21-Q45** → Repasar AGENTS_TOOLS_COMPLETE_SDK_PATTERNS.md
- **Q46-Q65** → Repasar OPTIMIZATION_COMPLETE_GUIDE.md
- **Q66-Q90** → Repasar RESPONSIBLE_AI_COMPLETE_GUIDE.md
- **Q91-Q100** → Repasar AI103_SCENARIO_DECISION_MATRIX.md
