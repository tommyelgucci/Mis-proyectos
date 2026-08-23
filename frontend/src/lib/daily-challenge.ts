/**
 * Desafío diario con racha (Fase 7).
 *
 * Idea inspirada en el propio CogniLab (proyecto separado del mismo dueño,
 * sin problema de procedencia): selección determinista por fecha con un PRNG
 * sembrado (mulberry32 — algoritmo de dominio público, no contenido de
 * ningún examen) y racha día-sobre-día comparando con "ayer". La lógica de
 * CogniLab no se copió tal cual porque su forma de datos es otra (allí
 * pickDaily pesa por preguntas falladas recientes de un banco fijo; acá no
 * hay un banco fijo sino generadores infinitos, así que lo que se sortea por
 * fecha es CUÁLES tipos de ejercicio aparecen, no el contenido exacto de
 * cada uno — eso sigue siendo aleatorio de verdad en cada instancia, como en
 * el resto de BrainBit).
 *
 * Todo lo de acá es puro y no toca localStorage directamente: el guardado
 * queda en pages/DailyChallenge.tsx, igual que progress-stats.ts nunca toca
 * localStorage y lo hace Progress.tsx.
 */

export interface DailyChallengeState {
  streak: number;
  longestStreak: number;
  /** 'YYYY-MM-DD' en hora local, o null si nunca se completó ninguno. */
  lastCompletedDay: string | null;
  /** Resultado guardado por día, para no perder el historial reciente. */
  history: Record<string, { score: number; total: number }>;
}

export const DAILY_KEY = 'brainbit-daily-challenge';
export const DAILY_SIZE = 8;

export const EMPTY_DAILY_STATE: DailyChallengeState = {
  streak: 0,
  longestStreak: 0,
  lastCompletedDay: null,
  history: {},
};

/** Clave de fecha en hora LOCAL del dispositivo, no UTC: un desafío que
    cambia a medianoche UTC confundiría a cualquiera fuera de UTC+0. */
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function yesterdayKey(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return todayKey(date);
}

/** mulberry32: PRNG determinista y rápido (dominio público). No es
    criptográfico — no hace falta, solo hay que reproducir el mismo desafío
    para todos los que abren la app el mismo día. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash simple y determinista de la clave de fecha, para sembrar el PRNG. */
export function seedFromDate(dateKey: string): number {
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) {
    h = (Math.imul(31, h) + dateKey.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

/** Elige `n` elementos (con reposición) de `pool`, deterministamente según
    `dateKey`: recargar la página no cambia la selección de hoy. */
export function pickDaily<T>(pool: readonly T[], dateKey: string, n: number): T[] {
  if (pool.length === 0) return [];
  const rand = seededRandom(seedFromDate(dateKey));
  const out: T[] = [];
  for (let i = 0; i < n; i++) {
    out.push(pool[Math.floor(rand() * pool.length)]);
  }
  return out;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Lectura defensiva desde localStorage: cualquier forma inesperada cae al
    estado vacío en vez de romper la página. */
export function parseDailyState(raw: unknown): DailyChallengeState {
  if (!isRecord(raw)) return EMPTY_DAILY_STATE;
  const streak = typeof raw.streak === 'number' && Number.isFinite(raw.streak) && raw.streak >= 0 ? raw.streak : 0;
  const longestStreak =
    typeof raw.longestStreak === 'number' && Number.isFinite(raw.longestStreak) && raw.longestStreak >= 0
      ? raw.longestStreak
      : 0;
  const lastCompletedDay = typeof raw.lastCompletedDay === 'string' ? raw.lastCompletedDay : null;
  const history: DailyChallengeState['history'] = {};
  if (isRecord(raw.history)) {
    for (const [day, entry] of Object.entries(raw.history)) {
      if (
        isRecord(entry) &&
        typeof entry.score === 'number' &&
        typeof entry.total === 'number' &&
        entry.total > 0
      ) {
        history[day] = { score: entry.score, total: entry.total };
      }
    }
  }
  return { streak, longestStreak: Math.max(longestStreak, streak), lastCompletedDay, history };
}

/**
 * Racha "en vivo": si hoy ya se completó, la racha guardada vale tal cual.
 * Si el último día completado fue ayer, la racha sigue viva (todavía se
 * puede completar hoy sin perderla). Si es más vieja que ayer, la racha ya
 * se cortó — aunque `recordCompletion` no lo haya "escrito" todavía, no hay
 * que mostrar un número que ya no es cierto.
 */
export function currentStreak(state: DailyChallengeState, dateKey: string): number {
  if (state.lastCompletedDay === dateKey) return state.streak;
  if (state.lastCompletedDay === yesterdayKey(dateKey)) return state.streak;
  return 0;
}

export function isCompletedToday(state: DailyChallengeState, dateKey: string): boolean {
  return state.lastCompletedDay === dateKey;
}

/**
 * Registra el resultado del desafío de `dateKey`. Si ya se había completado
 * ese mismo día, solo actualiza el resultado guardado (idempotente: repetir
 * el desafío del día no suma ni resta racha). Si el día anterior completado
 * fue ayer, la racha sigue sumando; si no, arranca de nuevo en 1.
 */
export function recordCompletion(
  state: DailyChallengeState,
  dateKey: string,
  score: number,
  total: number
): DailyChallengeState {
  const history = { ...state.history, [dateKey]: { score, total } };
  if (state.lastCompletedDay === dateKey) {
    return { ...state, history };
  }
  const continuesStreak = state.lastCompletedDay === yesterdayKey(dateKey);
  const streak = continuesStreak ? state.streak + 1 : 1;
  return {
    streak,
    longestStreak: Math.max(state.longestStreak, streak),
    lastCompletedDay: dateKey,
    history,
  };
}
