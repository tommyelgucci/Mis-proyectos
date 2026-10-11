// "Domain 2" (Tools) y "Domain 3" (Optimización) son subtemas de Domain 2
// oficial del examen ("Implement generative AI and agentic solutions",
// 30-35%: function calling/agentes, prompt engineering, RAG, fine-tuning).
// "Cross" son escenarios deliberadamente multi-dominio, sin reasignar.
//
// "Domain 1" y "Domain 4" (SIN "(real)") solo existen aquí para las mazmorras
// de flashcards/audio originales (quickCards.json Q1-100, audioCards.json),
// que siguen clasificadas con el esquema legacy de 4 domains y no se
// retocaron. YA NO representan ningún contenido del banco de examen
// (questions.json): según la guía oficial de AI-103, credenciales/managed
// identity/rate limits/deployment de agentes (legacy "Domain 1") y
// responsible AI/content safety/RBAC (legacy "Domain 4") caen bajo "Plan and
// manage an Azure AI solution", no bajo Domain 2 — todo ese contenido del
// banco fue reasignado a "Domain 1 (real)". Por eso quedan fuera de
// DOMAIN_WEIGHTS (que solo pondera preguntas de examen).
//
// El esquema oficial vigente desde abril 2026 tiene 5 dominios reales;
// "Domain 1 (real)" y "Domain 5" cubren Plan/Manage e Information
// Extraction, que no tenían representación en el esquema original de 4.
export const DOMAIN_COLORS: Record<string, string> = {
  "Domain 1": "#6366f1",
  "Domain 2": "#0ea5e9",
  "Domain 3": "#10b981",
  "Domain 4": "#f59e0b",
  Cross: "#a855f7",
  "Domain 1 (real)": "#ec4899",
  "Domain 5": "#14b8a6",
  "Domain 3 (real)": "#f97316",
  "Domain 4 (real)": "#22d3ee",
  Trampas: "#ef4444",
};

export const DOMAIN_LABELS: Record<string, string> = {
  "Domain 1": "SDK y Auth",
  "Domain 2": "Tools",
  "Domain 3": "Optimización",
  "Domain 4": "Responsible AI",
  Cross: "Cross-Domain",
  "Domain 1 (real)": "Plan y Gestión",
  "Domain 5": "Extracción Info",
  "Domain 3 (real)": "Computer Vision",
  "Domain 4 (real)": "Text Analysis",
  Trampas: "Trampas",
};

// Cuotas internas del simulacro de 60 preguntas. Los dominios legacy 2 y 3
// son ambos subtemas de IA generativa/agentes; sus cuotas suman 33%.
// "Cross" no es un dominio oficial: se reserva un 5% para escenarios mixtos.
// Las cuotas son una aproximación didáctica dentro de los rangos oficiales,
// no una reproducción literal de porcentajes oficiales ni de un examen real.
export const DOMAIN_WEIGHTS: Record<string, number> = {
  "Domain 1 (real)": 0.27, // Plan and manage
  "Domain 2": 0.20,        // Generative AI/tools
  "Domain 3": 0.13,        // Generative AI/optimization; 20% + 13% = 33%
  "Domain 3 (real)": 0.12, // Computer vision
  "Domain 4 (real)": 0.13, // Text analysis
  "Domain 5": 0.10,        // Information extraction
  Cross: 0.05,             // Mixed scenarios; not an official domain
};

// El voucher del examen vence este día: es el tope real para agendarlo.
export const VOUCHER_EXPIRES = "2026-10-18";

export function domainColor(domain: string): string {
  return DOMAIN_COLORS[domain] ?? "#8b5cf6";
}

export function domainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain;
}

/** Días hasta el examen, o null si todavía no hay fecha agendada.
 *
 * Devuelve null en vez de un número por defecto a propósito: antes la fecha
 * estaba fija en el código y la app mostraba una cuenta regresiva inventada,
 * que es peor que no mostrar nada. */
export function daysToExam(examDate: string): number | null {
  if (!examDate) return null;
  const target = new Date(`${examDate}T12:00:00`).getTime();
  if (Number.isNaN(target)) return null;
  // Se comparan dos mediodías, no "ahora" contra el examen: la cuenta es de
  // días de calendario y no puede depender de la hora a la que se mire. Con
  // ceil sobre Date.now() decía 11 días por la mañana y 10 por la tarde.
  // Anclar ambos al mediodía también absorbe los días de 23 o 25 horas.
  const now = new Date();
  const todayNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12).getTime();
  return Math.max(0, Math.round((target - todayNoon) / 86400000));
}
