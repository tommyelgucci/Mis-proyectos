// Persistencia de todo el progreso en localStorage + export/import JSON.

export interface QuestionStat {
  seen: number;
  correct: number;
  wrong: number;
  lastResult: "correct" | "wrong" | null;
}

export interface SaveData {
  version: number;
  xp: number;
  // racha diaria
  lastStudyDay: string; // YYYY-MM-DD
  dayStreak: number;
  bestDayStreak: number;
  // records
  bestLightning: number;
  bestSurvival: number;
  bossesBeaten: string[]; // domains vencidos
  finalBossBeaten: boolean;
  dailyDoneOn: string; // YYYY-MM-DD del último daily completado
  badges: string[];
  // estadísticas por pregunta (key = question id)
  stats: Record<string, QuestionStat>;
  // contadores globales
  totalAnswered: number;
  totalCorrect: number;
  answeredToday: number;
  answeredTodayDay: string;
  trapsCorrect: number;
  fastCorrect: number; // correctas en <10s
  perfectExams: number;
  soundOn: boolean;
  // flashcards: repetición espaciada (key = quick card id)
  srs: Record<string, { due: string; interval: number; ease: number }>;
}

const KEY = "cognilab_save_v1";

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function defaultSave(): SaveData {
  return {
    version: 1,
    xp: 0,
    lastStudyDay: "",
    dayStreak: 0,
    bestDayStreak: 0,
    bestLightning: 0,
    bestSurvival: 0,
    bossesBeaten: [],
    finalBossBeaten: false,
    dailyDoneOn: "",
    badges: [],
    stats: {},
    totalAnswered: 0,
    totalCorrect: 0,
    answeredToday: 0,
    answeredTodayDay: "",
    trapsCorrect: 0,
    fastCorrect: 0,
    perfectExams: 0,
    soundOn: true,
    srs: {},
  };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    return { ...defaultSave(), ...JSON.parse(raw) };
  } catch {
    return defaultSave();
  }
}

export function persistSave(data: SaveData): void {
  localStorage.setItem(KEY, JSON.stringify(data));
}

/** Registra actividad de hoy y actualiza la racha diaria. */
export function touchDayStreak(save: SaveData): SaveData {
  const t = today();
  if (save.lastStudyDay === t) return save;
  const yesterday = new Date(Date.now() - 86400000);
  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
  const dayStreak = save.lastStudyDay === yStr ? save.dayStreak + 1 : 1;
  return {
    ...save,
    lastStudyDay: t,
    dayStreak,
    bestDayStreak: Math.max(save.bestDayStreak, dayStreak),
  };
}

export function exportSave(): string {
  return JSON.stringify(loadSave(), null, 2);
}

export function importSave(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null || typeof parsed.xp !== "number") return false;
    persistSave({ ...defaultSave(), ...parsed });
    return true;
  } catch {
    return false;
  }
}
