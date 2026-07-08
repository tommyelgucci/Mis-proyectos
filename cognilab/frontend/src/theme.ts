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

export const EXAM_DATE = new Date("2026-08-03T09:00:00");

export function domainColor(domain: string): string {
  return DOMAIN_COLORS[domain] ?? "#8b5cf6";
}

export function domainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain;
}

export function daysToExam(): number {
  return Math.max(0, Math.ceil((EXAM_DATE.getTime() - Date.now()) / 86400000));
}
