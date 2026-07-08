import type { SaveData } from "./storage";

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  earned: (s: SaveData) => boolean;
}

export const BADGES: Badge[] = [
  { id: "first", name: "Primer Paso", desc: "Responde tu primera pregunta", icon: "👟", earned: s => s.totalAnswered >= 1 },
  { id: "cien", name: "Centurión", desc: "100 preguntas respondidas en total", icon: "💯", earned: s => s.totalAnswered >= 100 },
  { id: "maraton", name: "Maratonista", desc: "100 preguntas en un mismo día", icon: "🏃", earned: s => s.answeredToday >= 100 },
  { id: "cazatrampas", name: "Cazatrampas", desc: "20 preguntas trampa correctas", icon: "🪤", earned: s => s.trapsCorrect >= 20 },
  { id: "velocista", name: "Velocista", desc: "25 correctas en menos de 10 segundos", icon: "⚡", earned: s => s.fastCorrect >= 25 },
  { id: "racha3", name: "Constante", desc: "3 días seguidos estudiando", icon: "🔥", earned: s => s.bestDayStreak >= 3 },
  { id: "racha7", name: "Semana Perfecta", desc: "7 días seguidos estudiando", icon: "🌋", earned: s => s.bestDayStreak >= 7 },
  { id: "perfeccionista", name: "Perfeccionista", desc: "Un simulacro con 100% de aciertos", icon: "💎", earned: s => s.perfectExams >= 1 },
  { id: "boss1", name: "Matajefes", desc: "Derrota a tu primer jefe de Domain", icon: "⚔️", earned: s => s.bossesBeaten.length >= 1 },
  { id: "boss4", name: "Conquistador", desc: "Derrota a los 4 jefes de Domain", icon: "🏆", earned: s => ["Domain 1", "Domain 2", "Domain 3", "Domain 4"].every(d => s.bossesBeaten.includes(d)) },
  { id: "bossfinal", name: "Domador del AI-103", desc: "Derrota al Jefe Final (simulacro completo)", icon: "👑", earned: s => s.finalBossBeaten },
  { id: "survival10", name: "Superviviente", desc: "Racha de 10 en Muerte Súbita", icon: "💀", earned: s => s.bestSurvival >= 10 },
  { id: "lightning10", name: "Relámpago", desc: "10+ correctas en un Lightning Round", icon: "🌩️", earned: s => s.bestLightning >= 10 },
];

/** Devuelve badges recién ganados y la lista actualizada. */
export function checkBadges(save: SaveData): { newBadges: Badge[]; badges: string[] } {
  const newBadges: Badge[] = [];
  const badges = [...save.badges];
  for (const b of BADGES) {
    if (!badges.includes(b.id) && b.earned(save)) {
      badges.push(b.id);
      newBadges.push(b);
    }
  }
  return { newBadges, badges };
}
