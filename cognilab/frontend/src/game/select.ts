// Selección de preguntas para cada modo de juego.
import type { Question } from "../types";
import { DOMAIN_WEIGHTS } from "../theme";
import type { SaveData } from "./storage";

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** RNG con semilla (mulberry32) para el Daily Challenge — mismas preguntas todo el día. */
export function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickPractice(all: Question[], domain: string | null, n: number): Question[] {
  const pool = domain ? all.filter(q => q.domain === domain) : all;
  return shuffle(pool).slice(0, n);
}

/** Mezcla ponderada por peso de domain, como el examen real. */
export function pickExam(all: Question[], n: number): Question[] {
  const out: Question[] = [];
  const used = new Set<number>();
  for (const [domain, w] of Object.entries(DOMAIN_WEIGHTS)) {
    const pool = shuffle(all.filter(q => q.domain === domain));
    const take = Math.round(n * w);
    for (const q of pool.slice(0, take)) {
      out.push(q);
      used.add(q.id);
    }
  }
  // completar si faltan por redondeo
  if (out.length < n) {
    for (const q of shuffle(all)) {
      if (out.length >= n) break;
      if (!used.has(q.id)) { out.push(q); used.add(q.id); }
    }
  }
  return shuffle(out).slice(0, n);
}

export function pickTraps(all: Question[], n: number): Question[] {
  return shuffle(all.filter(q => q.isTrap)).slice(0, n);
}

export function failedQuestions(all: Question[], save: SaveData): Question[] {
  return all.filter(q => save.stats[q.id]?.lastResult === "wrong");
}

/** 10 preguntas del día: deterministas por fecha, priorizando falladas recientes. */
export function pickDaily(all: Question[], save: SaveData, dateStr: string): Question[] {
  const seed = dateStr.split("-").reduce((acc, p) => acc * 100 + parseInt(p, 10), 7);
  const rand = seededRandom(seed);
  const failed = shuffle(failedQuestions(all, save), rand).slice(0, 4);
  const failedIds = new Set(failed.map(q => q.id));
  const rest = shuffle(all.filter(q => !failedIds.has(q.id)), rand).slice(0, 10 - failed.length);
  return shuffle([...failed, ...rest], rand);
}

export function pickBoss(all: Question[], domain: string, n: number): Question[] {
  return shuffle(all.filter(q => q.domain === domain)).slice(0, n);
}
