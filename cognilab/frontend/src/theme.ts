export const DOMAIN_COLORS: Record<string, string> = {
  "Domain 1": "#6366f1",
  "Domain 2": "#0ea5e9",
  "Domain 3": "#10b981",
  "Domain 4": "#f59e0b",
  Cross: "#a855f7",
  Trampas: "#ef4444",
};

export const DOMAIN_LABELS: Record<string, string> = {
  "Domain 1": "SDK y Auth",
  "Domain 2": "Tools",
  "Domain 3": "Optimización",
  "Domain 4": "Responsible AI",
  Cross: "Cross-Domain",
  Trampas: "Trampas",
};

// Peso aproximado de cada domain en el examen real (para simulacros ponderados)
export const DOMAIN_WEIGHTS: Record<string, number> = {
  "Domain 1": 0.17,
  "Domain 2": 0.33,
  "Domain 3": 0.22,
  "Domain 4": 0.22,
  Cross: 0.06,
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
