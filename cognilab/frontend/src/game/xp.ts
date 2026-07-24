// XP, niveles y combos.

export interface Level {
  name: string;
  minXp: number;
  icon: string;
}

export const LEVELS: Level[] = [
  { name: "Becario de Azure", minXp: 0, icon: "🐣" },
  { name: "Junior Prompt Engineer", minXp: 300, icon: "🌱" },
  { name: "Cazador de Tokens", minXp: 800, icon: "🎯" },
  { name: "AI Engineer", minXp: 1600, icon: "⚙️" },
  { name: "Domador de Tools", minXp: 2800, icon: "🔧" },
  { name: "Arquitecto Foundry", minXp: 4500, icon: "🏗️" },
  { name: "Guardián Responsable", minXp: 7000, icon: "🛡️" },
  { name: "Leyenda del AI-103", minXp: 10000, icon: "👑" },
];

export function levelFor(xp: number): Level {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.minXp) current = l;
  return current;
}

export function nextLevel(xp: number): Level | null {
  for (const l of LEVELS) if (xp < l.minXp) return l;
  return null;
}

/** Multiplicador por combo de respuestas correctas seguidas. */
export function comboMultiplier(combo: number): number {
  if (combo >= 15) return 3;
  if (combo >= 10) return 2.5;
  if (combo >= 5) return 2;
  if (combo >= 3) return 1.5;
  return 1;
}

/** XP por una respuesta correcta. */
export function xpForAnswer(opts: { isTrap: boolean; combo: number; fast: boolean }): number {
  let base = 10;
  if (opts.isTrap) base += 5;
  if (opts.fast) base += 3;
  return Math.round(base * comboMultiplier(opts.combo));
}
