import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// CONTENIDO COMPLETO AI-103
// ============================================================
const STUDY_CONTENT = [
  // ─── DOMAIN 1: SDK Y AUTENTICACIÓN ───
  {
    id: 1, domain: "Domain 1", domainColor: "#6366f1",
    topic: "Responses API — Acceso al texto",
    shortTitle: "response.output_text",
    content: "En la Responses API de Azure, el texto de respuesta se accede con response punto output_text. Nunca uses choices[0].message.content, eso es de la Chat Completions API antigua. Esta es la trampa más frecuente en el examen.",
    keyPoint: "response.output_text ✓ | choices[0].message.content ✗"
  },
  {
    id: 2, domain: "Domain 1", domainColor: "#6366f1",
    topic: "System Message en Responses API",
    shortTitle: "instructions=",
    content: "En la Responses API, el system message se pasa como parámetro instructions igual a tu texto. No se usa un array de messages con role system. Recuerda: instructions es el parámetro directo para el comportamiento del modelo.",
    keyPoint: "instructions='Eres asistente' ✓ | messages=[{role:system}] ✗"
  },
  {
    id: 3, domain: "Domain 1", domainColor: "#6366f1",
    topic: "Multiturno eficiente — previous_response_id",
    shortTitle: "previous_response_id",
    content: "Para conversaciones de múltiples turnos, usa previous_response_id con el ID de la respuesta anterior. Esto evita re-enviar todo el historial en cada llamada, ahorrando tokens y mejorando la latencia. Es la forma correcta de gestionar estado en Responses API.",
    keyPoint: "previous_response_id=response.id → ahorra tokens"
  },
  {
    id: 4, domain: "Domain 1", domainColor: "#6366f1",
    topic: "Autenticación — DefaultAzureCredential",
    shortTitle: "DefaultAzureCredential",
    content: "En producción siempre usa DefaultAzureCredential del paquete azure-identity. Nunca pongas API keys directas en el código. Para agentes asíncronos, importa desde azure.identity.aio, con el sufijo punto aio para la versión async.",
    keyPoint: "DefaultAzureCredential → producción | azure.identity.aio → async"
  },
  {
    id: 5, domain: "Domain 1", domainColor: "#6366f1",
    topic: "Paquete SDK de Foundry",
    shortTitle: "azure-ai-projects",
    content: "El paquete pip para Azure AI Foundry Projects es azure-ai-projects. Lo instalas con pip install azure-ai-projects. Desde él creas el AIProjectClient usando from_connection_string con la variable de entorno PROJECT_CONNECTION_STRING.",
    keyPoint: "pip install azure-ai-projects | AIProjectClient.from_connection_string()"
  },
  {
    id: 6, domain: "Domain 1", domainColor: "#6366f1",
    topic: "Streaming — evento correcto",
    shortTitle: "response.output_text.delta",
    content: "En streaming con Responses API, el evento que contiene el texto parcial es de tipo response.output_text.delta. Accedes al fragmento con event.delta. No uses event.content ni event.text, esos son de otros contextos.",
    keyPoint: "event.type == 'response.output_text.delta' → event.delta"
  },

  // ─── DOMAIN 2: TOOLS ───
  {
    id: 7, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "code_interpreter — estructura correcta",
    shortTitle: "code_interpreter config",
    content: "La estructura exacta para code_interpreter es: type igual a code_interpreter, y dentro un campo container con type igual a auto. El campo container con type auto es OBLIGATORIO, no lo omitas o la herramienta no funcionará correctamente.",
    keyPoint: '{type: "code_interpreter", container: {type: "auto"}}'
  },
  {
    id: 8, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "code_interpreter — sin red externa",
    shortTitle: "code_interpreter sin internet",
    content: "code_interpreter ejecuta Python en un sandbox aislado SIN acceso a internet. No puede hacer requests HTTP ni llamar APIs externas. Sí tiene acceso a pandas, numpy y matplotlib. Si necesitas datos de internet, usa web_search. Si necesitas una API propia, usa function_calling.",
    keyPoint: "✓ pandas/numpy/matplotlib | ✗ requests/internet"
  },
  {
    id: 9, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "web_search — cuándo usar",
    shortTitle: "web_search",
    content: "Usa web_search cuando necesites datos de internet en tiempo real: noticias actuales, precios, eventos recientes, cualquier información que cambia frecuentemente. Su estructura es simplemente type igual a web_search, sin parámetros adicionales. Solo accede a información pública indexada.",
    keyPoint: '{type: "web_search"} → tiempo real, solo info pública'
  },
  {
    id: 10, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "file_search — parámetros requeridos",
    shortTitle: "file_search + vector_store",
    content: "file_search requiere el parámetro vector_store_ids con la lista de IDs de tu vector store. Para subir archivos usa upload_and_poll que sube Y espera la indexación completa. Para ver qué chunks usó el modelo, añade include igual a file_search_call.results.",
    keyPoint: 'vector_store_ids requerido | upload_and_poll() espera indexación'
  },
  {
    id: 11, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "function_calling — modelo JAMÁS ejecuta",
    shortTitle: "Modelo no ejecuta código",
    content: "En function_calling, el modelo JAMÁS ejecuta código. El modelo solo devuelve un objeto JSON diciendo qué función quiere llamar y con qué argumentos. Es el CLIENTE, tu código Python, quien ejecuta la función real y devuelve el resultado al modelo. Esto requiere DOS llamadas API: una donde el modelo pide la función, y otra donde le das el resultado.",
    keyPoint: "Modelo → JSON con función | Cliente → ejecuta | 2 llamadas API"
  },
  {
    id: 12, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "function_calling — call_id obligatorio",
    shortTitle: "call_id OBLIGATORIO",
    content: "Cuando devuelves el resultado de una function call, el campo call_id es OBLIGATORIO y debe coincidir exactamente con el call_id del request del modelo. El tipo del mensaje de resultado es function_call_output. Sin el call_id correcto, la segunda llamada a la API fallará.",
    keyPoint: 'type: "function_call_output" + call_id: item.call_id → OBLIGATORIO'
  },
  {
    id: 13, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "Multi-tool — el modelo elige",
    shortTitle: "Modelo elige herramienta",
    content: "Cuando defines múltiples herramientas simultáneamente, el modelo elige automáticamente cuál usar según el contexto de la pregunta del usuario. No eres tú quien especifica qué tool usar por query. Por ejemplo, si defines file_search y web_search, el modelo usará file_search para documentos internos y web_search para información actual.",
    keyPoint: "Modelo elige automáticamente | Desarrollador no especifica por query"
  },
  {
    id: 14, domain: "Domain 2", domainColor: "#0ea5e9",
    topic: "Foundry IQ — RAG empresarial",
    shortTitle: "Foundry IQ",
    content: "Foundry IQ es la solución de RAG gestionado de Microsoft para escala empresarial. Es la alternativa a gestionar manualmente un vector store con file_search. Cuando el examen pregunta por RAG a gran escala o knowledge store empresarial, la respuesta es Foundry IQ.",
    keyPoint: "Foundry IQ = RAG gestionado escala empresarial"
  },

  // ─── DOMAIN 3: OPTIMIZACIÓN ───
  {
    id: 15, domain: "Domain 3", domainColor: "#10b981",
    topic: "Estrategia primero: Prompt Engineering",
    shortTitle: "Prompt primero, siempre",
    content: "La estrategia de optimización incremental empieza SIEMPRE con Prompt Engineering. Es el paso uno antes de considerar RAG o Fine-Tuning. Solo añades complejidad si Prompt Engineering no es suficiente. El orden es: primero Prompt, luego RAG si necesitas precisión fáctica, luego Fine-Tuning si necesitas consistencia de comportamiento.",
    keyPoint: "Orden: Prompt → RAG → Fine-Tuning → Combinar"
  },
  {
    id: 16, domain: "Domain 3", domainColor: "#10b981",
    topic: "Temperature vs Top P — NUNCA juntos",
    shortTitle: "Temperature O Top P (nunca ambos)",
    content: "Esta es una regla de oro de Microsoft: NUNCA uses Temperature y Top P simultáneamente. Temperature controla la aleatoriedad global de la generación. Top P controla el pool de tokens considerados. Elige UNO u otro. Temperature 0 da respuestas determinísticas. Temperature 1 da máxima creatividad.",
    keyPoint: "Temperature O Top P → NUNCA ambos juntos"
  },
  {
    id: 17, domain: "Domain 3", domainColor: "#10b981",
    topic: "Chain-of-Thought — frase exacta",
    shortTitle: "Take a step-by-step approach",
    content: "Para activar razonamiento paso a paso en el modelo, usa la frase exacta: Take a step-by-step approach. Esta técnica de Chain-of-Thought hace que el modelo razone explícitamente antes de responder, mejorando la precisión en problemas complejos de múltiples pasos.",
    keyPoint: '"Take a step-by-step approach" → activa Chain-of-Thought'
  },
  {
    id: 18, domain: "Domain 3", domainColor: "#10b981",
    topic: "RAG — flujo correcto",
    shortTitle: "Retrieve → Augment → Generate",
    content: "RAG son las siglas de Retrieval Augmented Generation. El flujo es: primero Retrieve, buscas documentos relevantes. Luego Augment, añades esos documentos al contexto del modelo. Luego Generate, el modelo genera una respuesta anclada en esos datos reales. Esto reduce alucinaciones porque el modelo responde con hechos verificables.",
    keyPoint: "Retrieve → Augment → Generate | Reduce alucinaciones"
  },
  {
    id: 19, domain: "Domain 3", domainColor: "#10b981",
    topic: "Azure AI Search — técnica recomendada",
    shortTitle: "Búsqueda Híbrida = Gen AI",
    content: "Microsoft recomienda la búsqueda Híbrida para aplicaciones de IA Generativa en Azure AI Search. La búsqueda híbrida combina Keywords tradicionales con búsqueda Vectorial por embeddings. No uses solo keywords ni solo vectorial: la combinación híbrida da mejores resultados para Gen AI.",
    keyPoint: "Híbrida (Keywords + Vectorial) = RECOMENDADA para Gen AI"
  },
  {
    id: 20, domain: "Domain 3", domainColor: "#10b981",
    topic: "Similitud Coseno",
    shortTitle: "Coseno ≈ 1 = similares",
    content: "Los embeddings son representaciones matemáticas de texto como vectores numéricos. Para medir qué tan similares son dos textos, se usa la Similitud Coseno. Un valor cercano a 1 indica que los textos son muy similares o relacionados. Un valor cercano a 0 indica que son muy diferentes o no relacionados.",
    keyPoint: "Similitud Coseno ≈ 1 → textos similares | ≈ 0 → no relacionados"
  },
  {
    id: 21, domain: "Domain 3", domainColor: "#10b981",
    topic: "Fine-Tuning — qué aprende y qué no",
    shortTitle: "FT aprende comportamiento, no hechos",
    content: "Fine-Tuning es excelente para enseñar comportamiento consistente, tono emocional específico y formato de respuestas. Lo que Fine-Tuning NO puede hacer es aprender hechos nuevos. Si el modelo necesita datos actualizados post-entrenamiento, la solución es RAG, no Fine-Tuning.",
    keyPoint: "FT = comportamiento/tono/formato | RAG = hechos/datos nuevos"
  },
  {
    id: 22, domain: "Domain 3", domainColor: "#10b981",
    topic: "LoRA — eficiencia Fine-Tuning",
    shortTitle: "LoRA: congela + adapta",
    content: "LoRA es Low-Rank Adaptation. En lugar de modificar todos los pesos del modelo base, LoRA los congela y añade una matriz de adaptación secundaria más pequeña. Esto reduce el costo computacional del entrenamiento, baja el riesgo de overfitting, y hace más portátil el modelo ajustado.",
    keyPoint: "LoRA = Congela pesos originales + añade matriz adaptación pequeña"
  },
  {
    id: 23, domain: "Domain 3", domainColor: "#10b981",
    topic: "JSONL — formato Fine-Tuning",
    shortTitle: "Dataset JSONL",
    content: "El formato de datos para Fine-Tuning es JSONL: JSON Lines, donde cada línea es un objeto JSON independiente. Cada objeto contiene un campo messages con un array que incluye el rol system, el rol user y el rol assistant. Así defines el comportamiento esperado del modelo.",
    keyPoint: 'JSONL: {"messages": [{role:system}, {role:user}, {role:assistant}]}'
  },
  {
    id: 24, domain: "Domain 3", domainColor: "#10b981",
    topic: "Combinación clásica del examen",
    shortTitle: "RAG + FT + Prompt = catálogo + voz + sesión",
    content: "La pregunta clásica del examen: empresa necesita un bot con catálogo de productos actualizable, voz de marca siempre consistente, y contexto específico de sesión. La solución completa es: RAG para el catálogo actualizable, Fine-Tuning para la voz de marca, y Prompt Engineering para las instrucciones de sesión.",
    keyPoint: "Catálogo → RAG | Voz marca → Fine-Tuning | Sesión → Prompt"
  },

  // ─── DOMAIN 4: RESPONSIBLE AI ───
  {
    id: 25, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "6 Pilares de IA Responsable",
    shortTitle: "Los 6 Pilares",
    content: "Los seis pilares de IA Responsable de Microsoft son: Equidad, sin sesgos por raza o género. Confiabilidad y Seguridad, funciona correctamente. Privacidad y Seguridad, protege datos de usuarios. Inclusión, accesible para todos. Transparencia, usuarios saben que es IA. Y Responsabilidad, los humanos rinden cuentas.",
    keyPoint: "Equidad | Confiabilidad | Privacidad | Inclusión | Transparencia | Responsabilidad"
  },
  {
    id: 26, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "4 Fases del ciclo responsable",
    shortTitle: "IDENTIFY → MEASURE → MITIGATE → MANAGE",
    content: "El ciclo de IA Responsable de Microsoft tiene cuatro fases en este orden exacto: IDENTIFY, donde identificas los daños posibles. MEASURE, donde mides con qué frecuencia ocurren. MITIGATE, donde aplicas contramedidas. Y MANAGE, donde operas y monitoreas en producción. Memoriza este orden.",
    keyPoint: "IDENTIFY → MEASURE → MITIGATE → MANAGE"
  },
  {
    id: 27, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "Estándar internacional — NIST AI RMF",
    shortTitle: "NIST AI RMF",
    content: "El estándar internacional en que se basan las herramientas de gobernanza de Azure AI es el NIST AI Risk Management Framework, también conocido como NIST AI RMF. No confundas con GDPR, que es privacidad europea, ni con ISO 27001, que es seguridad de información. La respuesta es NIST AI RMF.",
    keyPoint: "Estándar internacional gobernanza Azure = NIST AI RMF"
  },
  {
    id: 28, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "3 tipos de daños — IDENTIFY",
    shortTitle: "Ofensivo | Alucinación | Ilegal",
    content: "En la fase IDENTIFY, los tres tipos comunes de daños son: primero, contenido ofensivo o discriminatorio, como ataques basados en identidad. Segundo, imprecisiones fácticas o alucinaciones, información inventada. Tercero, contenido ilegal o no ético, instrucciones para actividades peligrosas.",
    keyPoint: "1) Ofensivo/Discriminatorio | 2) Alucinaciones | 3) Ilegal/No Ético"
  },
  {
    id: 29, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "Red Teaming — qué es",
    shortTitle: "Red Teaming",
    content: "Red Teaming es una técnica adoptada de ciberseguridad tradicional. Consiste en un equipo de evaluadores que ataca deliberadamente el sistema de IA de forma hostil, usando preguntas capciosas e intentos de jailbreak, para encontrar vulnerabilidades antes de que lo hagan los usuarios reales. Es el Paso 3 de IDENTIFY.",
    keyPoint: "Red Teaming = ataque deliberado | Origen: ciberseguridad | Paso 3 IDENTIFY"
  },
  {
    id: 30, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "LLM-as-a-judge — evaluación escala",
    shortTitle: "LLM Judge = escala masiva",
    content: "Para medir daños a gran escala, se usa un segundo modelo de lenguaje como clasificador automático. Este LLM-Judge evalúa y categoriza las respuestas del modelo principal según la rúbrica de evaluación. Aunque sea automático, Microsoft exige mantener pruebas manuales periódicas para detectar nuevos riesgos y validar que el LLM Judge no tiene sesgo.",
    keyPoint: "LLM Judge = automatización escala | Manuales periódicas = obligatorias siempre"
  },
  {
    id: 31, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "4 Capas MITIGATE — orden",
    shortTitle: "4 Capas defensa en profundidad",
    content: "La mitigación usa defensa en profundidad con cuatro capas. Capa 1, el Modelo: selección apropiada y Fine-Tuning. Capa 2, Seguridad: Azure AI Content Safety con filtros automáticos. Capa 3, Sistema Mensaje: System Prompts y RAG para anclar respuestas. Capa 4, Usuario: interfaz guiada, validación y notas de transparencia. Si una capa falla, la siguiente captura el daño.",
    keyPoint: "1:Modelo | 2:Content Safety | 3:Prompts+RAG | 4:UI+Transparencia"
  },
  {
    id: 32, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "Fine-Tuning vs Content Safety — capas",
    shortTitle: "FT=Capa1 | Safety=Capa2",
    content: "Trampa clásica del examen: cuando preguntan qué mitiga daños en el nivel de sistema de seguridad, la respuesta es Azure AI Content Safety, que es la Capa 2. Fine-Tuning mitiga en la Capa 1, que es el modelo. No confundas: Fine-Tuning es Capa 1, Content Safety es Capa 2.",
    keyPoint: "Fine-Tuning = CAPA 1 | Azure Content Safety = CAPA 2"
  },
  {
    id: 33, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "4 categorías Azure Content Safety",
    shortTitle: "Hate | Sexual | Violence | Self-Harm",
    content: "Azure AI Content Safety filtra automáticamente cuatro categorías de contenido dañino. Hate, que es discurso de odio y discriminación. Sexual, contenido explícito. Violence, instrucciones de violencia física. Y Self-Harm, contenido sobre autolesiones y suicidio. Son exactamente cuatro categorías.",
    keyPoint: "Hate | Sexual | Violence | Self-Harm → 4 categorías exactas"
  },
  {
    id: 34, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "Thresholds — LOW es MÁS protección",
    shortTitle: "LOW = máxima sensibilidad",
    content: "Esta es una trampa de redacción clásica. Un threshold LOW en Content Safety significa máxima sensibilidad, es decir, bloquea MÁS contenido. Un threshold HIGH significa mínima sensibilidad, bloquea MENOS. Para aplicaciones infantiles o de salud donde necesitas máxima protección, configura threshold LOW.",
    keyPoint: "LOW threshold = MÁXIMA sensibilidad = MÁS bloqueos | Apps infantiles → LOW"
  },
  {
    id: 35, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "Phased Rollout — por qué",
    shortTitle: "Lanzamiento por fases",
    content: "El Phased Rollout consiste en lanzar la aplicación gradualmente: primero a un grupo pequeño beta de 5 a 10 porciento, luego a early adopters del 25 al 50 porciento, y finalmente al 100 porciento. La razón es detectar problemas en un grupo pequeño antes de escalar. Los usuarios reales interactúan de formas impredecibles que los tests de laboratorio no siempre anticipan.",
    keyPoint: "Beta(5-10%) → Early(25-50%) → Full(100%) | Detecta problemas antes de escalar"
  },
  {
    id: 36, domain: "Domain 4", domainColor: "#f59e0b",
    topic: "AI Impact Assessment — propósito",
    shortTitle: "Documenta propósito y daños",
    content: "La valoración de impacto de IA, o AI Impact Assessment, sirve para documentar el propósito del sistema, el uso esperado, y los daños posibles identificados. NO es un documento de defensa legal, ni un presupuesto de costos en la nube. Es un documento de gobernanza ética y técnica que informa las cuatro fases del ciclo responsable.",
    keyPoint: "AI Impact Assessment = propósito + uso esperado + daños | NO defensa legal"
  },

  // ─── PREGUNTAS TRAMPA EXTRA ───
  {
    id: 37, domain: "Trampas", domainColor: "#ef4444",
    topic: "Trampa: choices[0] en Responses API",
    shortTitle: "choices[0] = INCORRECTO en Responses",
    content: "Si el examen muestra código que usa choices corchete 0 punto message punto content con la Responses API, esa opción es INCORRECTA. Solo es correcto choices[0].message.content en la Chat Completions API. En Responses API siempre es response.output_text.",
    keyPoint: "Responses API: output_text ✓ | Chat Completions: choices[0].message.content ✓"
  },
  {
    id: 38, domain: "Trampas", domainColor: "#ef4444",
    topic: "Trampa: role:system en Responses API",
    shortTitle: "messages role:system = INCORRECTO en Responses",
    content: "Otra trampa frecuente: usar messages con role system en la Responses API. Eso es de Chat Completions. En Responses API el system message va en el parámetro instructions directamente. Si ves una opción con messages y role system para Responses API, es incorrecta.",
    keyPoint: "Responses API usa instructions= | Chat Completions usa messages=[{role:system}]"
  },
  {
    id: 39, domain: "Trampas", domainColor: "#ef4444",
    topic: "Trampa: Fine-Tuning para datos nuevos",
    shortTitle: "FT no aprende hechos nuevos → RAG",
    content: "Si el examen pregunta: el modelo no conoce información de 2025, ¿usas Fine-Tuning? La respuesta es NO. Fine-Tuning no enseña hechos nuevos al modelo, solo modifica comportamiento y estilo. Para datos post-cutoff o información que se actualiza, la solución correcta es RAG con Azure AI Search.",
    keyPoint: "Fine-Tuning ≠ datos nuevos → Para hechos actualizados: RAG"
  },
  {
    id: 40, domain: "Trampas", domainColor: "#ef4444",
    topic: "Trampa: GDPR como estándar gobernanza",
    shortTitle: "GDPR ≠ estándar gobernanza Azure",
    content: "Cuando el examen pregunta por el estándar internacional que referencia la gobernanza de Azure AI, la respuesta NO es GDPR. GDPR es la regulación de privacidad de datos de la Unión Europea. El estándar correcto es NIST AI Risk Management Framework, que es específico para riesgos de inteligencia artificial.",
    keyPoint: "Gobernanza Azure AI → NIST AI RMF | Privacidad datos Europa → GDPR"
  }
];

const DOMAINS = ["Todos", "Domain 1", "Domain 2", "Domain 3", "Domain 4", "Trampas"];
const DOMAIN_LABELS = {
  "Domain 1": "SDK y Auth",
  "Domain 2": "Tools",
  "Domain 3": "Optimización",
  "Domain 4": "Responsible AI",
  "Trampas": "Trampas"
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function AI103AudioStudy() {
  const [selectedDomain, setSelectedDomain] = useState("Todos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [autoNext, setAutoNext] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studied, setStudied] = useState(new Set());
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const progressInterval = useRef(null);

  const filtered = selectedDomain === "Todos"
    ? STUDY_CONTENT
    : STUDY_CONTENT.filter(c => c.domain === selectedDomain);

  const current = filtered[currentIndex] || filtered[0];

  // Cargar voces
  useEffect(() => {
    const loadVoices = () => {
      const v = synthRef.current.getVoices();
      setVoices(v);
      const spanish = v.find(x => x.lang.startsWith("es")) || v[0];
      setVoice(spanish);
    };
    loadVoices();
    synthRef.current.addEventListener("voiceschanged", loadVoices);
    return () => synthRef.current.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const stopSpeech = useCallback(() => {
    synthRef.current.cancel();
    setIsPlaying(false);
    setProgress(0);
    clearInterval(progressInterval.current);
  }, []);

  const speakCard = useCallback((card) => {
    stopSpeech();
    const text = `${card.topic}. ${card.content}. Punto clave: ${card.keyPoint}`;
    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.rate = speed;
    utter.lang = "es-MX";

    const estimated = (text.length / 12) * (1 / speed) * 1000;
    const start = Date.now();

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / estimated) * 100, 95));
    }, 200);

    utter.onend = () => {
      clearInterval(progressInterval.current);
      setProgress(100);
      setIsPlaying(false);
      setStudied(prev => new Set([...prev, card.id]));
      if (autoNext) {
        setTimeout(() => {
          setCurrentIndex(prev => {
            const next = (prev + 1) % filtered.length;
            if (next === 0) { setProgress(0); return 0; }
            return next;
          });
        }, 800);
      }
    };

    utter.onerror = () => {
      clearInterval(progressInterval.current);
      setIsPlaying(false);
    };

    utteranceRef.current = utter;
    synthRef.current.speak(utter);
    setIsPlaying(true);
  }, [voice, speed, autoNext, filtered, stopSpeech]);

  // Reproducir cuando cambia tarjeta y estaba en auto
  useEffect(() => {
    if (isPlaying && current) speakCard(current);
  }, [currentIndex]);

  useEffect(() => {
    stopSpeech();
  }, [selectedDomain]);

  const handlePlay = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      speakCard(current);
    }
  };

  const handleNext = () => {
    stopSpeech();
    setCurrentIndex(i => (i + 1) % filtered.length);
  };

  const handlePrev = () => {
    stopSpeech();
    setCurrentIndex(i => (i - 1 + filtered.length) % filtered.length);
  };

  const studiedCount = filtered.filter(c => studied.has(c.id)).length;
  const pct = filtered.length ? Math.round((studiedCount / filtered.length) * 100) : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0",
      padding: "20px 16px",
      boxSizing: "border-box"
    }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#6366f1", marginBottom: "6px", textTransform: "uppercase" }}>
          Certificación
        </div>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, background: "linear-gradient(90deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AI-103 Audio Study
        </h1>
        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
          {STUDY_CONTENT.length} tarjetas · Web Speech API
        </div>
      </div>

      {/* DOMAIN FILTER */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
        {DOMAINS.map(d => {
          const active = d === selectedDomain;
          const colors = { "Domain 1": "#6366f1", "Domain 2": "#0ea5e9", "Domain 3": "#10b981", "Domain 4": "#f59e0b", "Trampas": "#ef4444", "Todos": "#8b5cf6" };
          return (
            <button key={d} onClick={() => { setSelectedDomain(d); setCurrentIndex(0); }} style={{
              padding: "5px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
              border: `1px solid ${active ? colors[d] || "#8b5cf6" : "#2d2d4e"}`,
              background: active ? (colors[d] || "#8b5cf6") + "22" : "transparent",
              color: active ? colors[d] || "#8b5cf6" : "#64748b",
              cursor: "pointer", transition: "all 0.2s"
            }}>
              {d === "Todos" ? "Todos" : DOMAIN_LABELS[d] || d}
            </button>
          );
        })}
      </div>

      {/* PROGRESS BAR SESIÓN */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: "6px" }}>
          <span>Progreso sesión</span>
          <span>{studiedCount}/{filtered.length} tarjetas ({pct}%)</span>
        </div>
        <div style={{ height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #6366f1, #38bdf8)", borderRadius: "2px", transition: "width 0.5s" }} />
        </div>
      </div>

      {/* CARD */}
      {current && (
        <div style={{
          background: "linear-gradient(135deg, #1e1e32, #16213e)",
          borderRadius: "16px",
          border: `1px solid ${current.domainColor}33`,
          padding: "24px",
          marginBottom: "20px",
          position: "relative",
          boxShadow: `0 0 30px ${current.domainColor}15`
        }}>
          {/* Badge + contador */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{
              background: current.domainColor + "22",
              color: current.domainColor,
              padding: "3px 10px", borderRadius: "12px", fontSize: "10px", fontWeight: 700, letterSpacing: "1px"
            }}>
              {current.domain}
            </span>
            <span style={{ color: "#475569", fontSize: "11px" }}>
              {currentIndex + 1} / {filtered.length}
              {studied.has(current.id) && <span style={{ color: "#10b981", marginLeft: "6px" }}>✓</span>}
            </span>
          </div>

          {/* Título */}
          <h2 style={{ margin: "0 0 14px", fontSize: "17px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.3 }}>
            {current.topic}
          </h2>

          {/* Progress bar audio */}
          <div style={{ height: "2px", background: "#1e293b", borderRadius: "1px", marginBottom: "16px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: current.domainColor, borderRadius: "1px", transition: "width 0.2s linear" }} />
          </div>

          {/* Contenido */}
          <p style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: 1.7, color: "#cbd5e1" }}>
            {current.content}
          </p>

          {/* Key Point toggle */}
          <button onClick={() => setShowKey(k => !k)} style={{
            background: "transparent", border: `1px solid ${current.domainColor}44`,
            borderRadius: "8px", padding: "8px 14px", cursor: "pointer",
            color: current.domainColor, fontSize: "12px", fontWeight: 600, width: "100%", textAlign: "left"
          }}>
            {showKey ? "▾" : "▸"} Punto Clave
          </button>

          {showKey && (
            <div style={{
              marginTop: "10px", padding: "12px 14px",
              background: current.domainColor + "15", borderRadius: "8px",
              borderLeft: `3px solid ${current.domainColor}`,
              fontSize: "13px", color: "#f1f5f9", fontWeight: 500, letterSpacing: "0.3px"
            }}>
              {current.keyPoint}
            </div>
          )}
        </div>
      )}

      {/* CONTROLES REPRODUCCIÓN */}
      <div style={{ background: "#1e1e32", borderRadius: "14px", padding: "18px", marginBottom: "16px", border: "1px solid #2d2d4e" }}>

        {/* Controles principales */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <button onClick={handlePrev} style={{
            width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #2d2d4e",
            background: "#0f0f1a", color: "#94a3b8", cursor: "pointer", fontSize: "16px"
          }}>‹</button>

          <button onClick={handlePlay} style={{
            width: "60px", height: "60px", borderRadius: "50%", border: "none",
            background: isPlaying ? "#ef444420" : "linear-gradient(135deg, #6366f1, #818cf8)",
            color: isPlaying ? "#ef4444" : "#fff", cursor: "pointer", fontSize: "22px",
            boxShadow: isPlaying ? "0 0 20px #ef444440" : "0 0 20px #6366f140",
            transition: "all 0.2s"
          }}>
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button onClick={handleNext} style={{
            width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #2d2d4e",
            background: "#0f0f1a", color: "#94a3b8", cursor: "pointer", fontSize: "16px"
          }}>›</button>
        </div>

        {/* Velocidad */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#64748b", marginBottom: "6px" }}>
            <span>Velocidad</span>
            <span style={{ color: "#818cf8", fontWeight: 700 }}>{speed.toFixed(1)}×</span>
          </div>
          <input type="range" min={0.5} max={2} step={0.1} value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#6366f1" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#475569" }}>
            <span>Lento 0.5×</span>
            <span>Normal 1×</span>
            <span>Rápido 2×</span>
          </div>
        </div>

        {/* Auto-next toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Avance automático</span>
          <button onClick={() => setAutoNext(a => !a)} style={{
            width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
            background: autoNext ? "#6366f1" : "#2d2d4e", position: "relative", transition: "background 0.2s"
          }}>
            <div style={{
              width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
              position: "absolute", top: "3px", left: autoNext ? "23px" : "3px", transition: "left 0.2s"
            }} />
          </button>
        </div>
      </div>

      {/* VOICE SELECTOR */}
      {voices.length > 0 && (
        <div style={{ background: "#1e1e32", borderRadius: "12px", padding: "14px", marginBottom: "16px", border: "1px solid #2d2d4e" }}>
          <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "8px" }}>Voz del narrador</div>
          <select value={voice?.name || ""} onChange={e => setVoice(voices.find(v => v.name === e.target.value))}
            style={{
              width: "100%", background: "#0f0f1a", border: "1px solid #2d2d4e",
              color: "#e2e8f0", borderRadius: "8px", padding: "8px 10px", fontSize: "12px", cursor: "pointer"
            }}>
            {voices.map(v => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* MINI ÍNDICE */}
      <div style={{ background: "#1e1e32", borderRadius: "12px", padding: "14px", border: "1px solid #2d2d4e" }}>
        <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>
          Índice — {selectedDomain === "Todos" ? "Todas las tarjetas" : DOMAIN_LABELS[selectedDomain]}
        </div>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          {filtered.map((card, i) => (
            <div key={card.id} onClick={() => { stopSpeech(); setCurrentIndex(i); setShowKey(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "7px 8px",
                borderRadius: "8px", cursor: "pointer", marginBottom: "2px",
                background: i === currentIndex ? card.domainColor + "15" : "transparent",
                border: i === currentIndex ? `1px solid ${card.domainColor}33` : "1px solid transparent",
                transition: "all 0.15s"
              }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
                background: studied.has(card.id) ? "#10b981" : card.domainColor + "66"
              }} />
              <span style={{ fontSize: "12px", color: i === currentIndex ? "#f1f5f9" : "#64748b", lineHeight: 1.3 }}>
                {card.shortTitle}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "16px", fontSize: "10px", color: "#334155" }}>
        AI-103 Audio Study · Web Speech API · {studied.size} tarjetas escuchadas
      </div>
    </div>
  );
}
