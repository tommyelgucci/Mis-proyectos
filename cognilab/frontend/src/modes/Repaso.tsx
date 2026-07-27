// Último repaso: pantalla de consulta para las 24-48 h previas al examen.
// No se juega ni puntúa, se lee. Por eso no toca el save ni suma XP.
import { useMemo, useState } from "react";
import audioData from "../data/audioCards.json";
import questionsData from "../data/questions.json";
import type { AudioCard, Question } from "../types";
import { DOMAIN_COLORS, domainColor, domainLabel } from "../theme";
import { Card, Chip, RichText } from "../components/ui";

const CARDS = audioData as AudioCard[];
const QUESTIONS = questionsData as Question[];

/** Datos que se memorizan de corrido y que el examen pregunta tal cual. */
const NUMEROS: { n: string; que: string; detalle: string }[] = [
  { n: "4", que: "fases de IA responsable", detalle: "Identify → Measure → Mitigate → Manage" },
  { n: "4", que: "capas de mitigación", detalle: "1 Modelo · 2 Content Safety · 3 System prompt + RAG · 4 UX" },
  { n: "4", que: "categorías de Content Safety", detalle: "Odio · Sexual · Violencia · Autolesiones (jailbreak va aparte)" },
  { n: "6", que: "pilares de IA responsable", detalle: "Equidad · Confiabilidad · Privacidad · Inclusión · Transparencia · Responsabilidad" },
  { n: "4", que: "revisiones antes de lanzar", detalle: "Legal · Privacidad · Seguridad · Accesibilidad" },
  { n: "4", que: "técnicas de búsqueda", detalle: "Keywords · Semántica · Vectorial · Híbrida ← la recomendada" },
  { n: "2", que: "llamadas en function_calling", detalle: "El modelo pide la función · tú ejecutas · le devuelves el resultado" },
  { n: "4", que: "tools del examen", detalle: "code_interpreter · web_search · file_search · function_calling" },
];

/** Palabra clave del enunciado → hacia dónde apunta la respuesta. */
const MATRIZ: { pista: string; solucion: string; color: string }[] = [
  { pista: "Datos que cambian, docs actualizados, info nueva", solucion: "RAG", color: "#10b981" },
  { pista: "Tono de marca, formato consistente, estilo siempre igual", solucion: "Fine-Tuning", color: "#10b981" },
  { pista: "Primero de todo, opción más barata", solucion: "Prompt Engineering", color: "#10b981" },
  { pista: "Sistema interno, ERP, CRM, base de datos propia", solucion: "function_calling", color: "#0ea5e9" },
  { pista: "Noticias, clima, precios de hoy, info pública", solucion: "web_search", color: "#0ea5e9" },
  { pista: "Manuales, PDFs de la empresa, documentos subidos", solucion: "file_search", color: "#0ea5e9" },
  { pista: "Calcular, graficar, analizar un CSV", solucion: "code_interpreter", color: "#0ea5e9" },
  { pista: "Sin gestionar secretos + corre en Azure", solucion: "Managed Identity", color: "#6366f1" },
  { pista: "App para menores, máxima protección", solucion: "Content Safety en LOW", color: "#f59e0b" },
  { pista: "\"Ignora tus instrucciones anteriores\"", solucion: "Jailbreak Protection (capa 2)", color: "#f59e0b" },
  { pista: "Empezó a fallar en producción, ¿qué hago?", solucion: "MEASURE antes de mitigar", color: "#f59e0b" },
  { pista: "Alto impacto pero baja probabilidad", solucion: "Máxima prioridad igual", color: "#f59e0b" },
];

const FILTROS = ["Todos", "Domain 1", "Domain 2", "Domain 3", "Domain 4", "Trampas"];

export default function Repaso() {
  const [filtro, setFiltro] = useState("Todos");

  const chuletas = useMemo(
    () => (filtro === "Todos" ? CARDS : CARDS.filter(c => c.domain === filtro)),
    [filtro],
  );

  const trampas = useMemo(() => QUESTIONS.filter(q => q.isTrap), []);

  return (
    <div className="slide-up" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      <Card style={{ textAlign: "center", background: "linear-gradient(135deg, #2d1b3d, #1a1a2e)", borderColor: "#a855f755" }}>
        <div style={{ fontSize: 30 }}>📋</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#f1f5f9", margin: "4px 0" }}>Último repaso</div>
        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
          Para las 24-48 h antes del examen. Nada que responder: solo leer y refrescar.
        </div>
      </Card>

      {/* Los números */}
      <Card>
        <SectionTitle>Los números que se preguntan tal cual</SectionTitle>
        {NUMEROS.map((x, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 0", borderBottom: i < NUMEROS.length - 1 ? "1px solid #2d2d4e" : "none" }}>
            <div style={{
              minWidth: 30, height: 30, borderRadius: 8, background: "#6366f122", color: "#818cf8",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15,
            }}>{x.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#e2e8f0" }}>{x.que}</div>
              <div style={{ fontSize: 11.5, color: "#94a3b8", lineHeight: 1.5, marginTop: 2 }}>{x.detalle}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Matriz de decisión */}
      <Card>
        <SectionTitle>Si el enunciado dice… la respuesta apunta a…</SectionTitle>
        {MATRIZ.map((m, i) => (
          <div key={i} style={{
            display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
            padding: "9px 0", borderBottom: i < MATRIZ.length - 1 ? "1px solid #2d2d4e" : "none",
          }}>
            <div style={{ flex: "1 1 190px", fontSize: 12, color: "#cbd5e1", lineHeight: 1.45 }}>{m.pista}</div>
            {/* Flecha y solución van en el mismo nodo: separadas, al envolver en
                pantalla angosta la flecha quedaba colgada sola al final de la línea. */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              <span style={{ color: "#475569", fontSize: 13 }}>→</span>
              <span style={{
                fontSize: 12, fontWeight: 800, color: m.color,
                background: m.color + "18", borderRadius: 7, padding: "4px 10px",
              }}>{m.solucion}</span>
            </div>
          </div>
        ))}
      </Card>

      {/* Trampas del banco */}
      <Card>
        <SectionTitle>Las {trampas.length} preguntas-trampa del banco</SectionTitle>
        {trampas.map(q => (
          <div key={q.id} style={{ padding: "9px 0", borderBottom: "1px solid #2d2d4e" }}>
            <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.5 }}>
              {/* El prefijo viene en dos formas: "TRAMPA:" y "Trampa clásica:".
                  Se corta hasta el primer ":" para no dejar un "clásica:" suelto. */}
              <RichText text={q.question.replace(/^TRAMPA[^:]*:\s*/i, "")} />
            </div>
            <div style={{ fontSize: 12, color: "#10b981", marginTop: 4, fontWeight: 600 }}>
              ✓ <RichText text={q.options[q.correct]} />
            </div>
          </div>
        ))}
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 10 }}>
          → Para practicarlas con feedback, usa el Modo Trampa en Jugar.
        </div>
      </Card>

      {/* Chuletas */}
      <Card>
        <SectionTitle>Chuletas por dominio</SectionTitle>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "0 0 12px" }}>
          {FILTROS.map(f => (
            <Chip
              key={f}
              label={f === "Todos" ? "Todos" : domainLabel(f)}
              active={filtro === f}
              color={f === "Todos" ? "#8b5cf6" : (DOMAIN_COLORS[f] ?? "#8b5cf6")}
              onClick={() => setFiltro(f)}
            />
          ))}
        </div>
        {chuletas.map(c => (
          <div key={c.id} style={{ padding: "8px 0", borderBottom: "1px solid #2d2d4e" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: domainColor(c.domain) }}>{c.topic}</div>
            <div style={{ fontSize: 11.5, color: "#cbd5e1", fontFamily: "ui-monospace, monospace", lineHeight: 1.55, marginTop: 3 }}>
              {c.keyPoint}
            </div>
          </div>
        ))}
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 10 }}>
          {chuletas.length} chuletas · salen de las tarjetas de audio, así que se mantienen solas al agregar contenido.
        </div>
      </Card>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
      {children}
    </div>
  );
}
