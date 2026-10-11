// Persistencia de todo el progreso en localStorage + export/import JSON.
import { addDays, formatDay } from "./srs";

export interface QuestionStat {
  seen: number;
  correct: number;
  wrong: number;
  lastResult: "correct" | "wrong" | null;
}

export interface SaveData {
  version: number;
  xp: number;
  examDate: string; // YYYY-MM-DD; "" mientras no esté agendado
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
const SAVE_VERSION = 2;

// Las respuestas/opciones de estas preguntas cambiaron de forma material en
// la auditoría AI-103. El progreso antiguo por ID ya no es comparable con la
// versión nueva; se limpia una sola vez al migrar el save v1 -> v2.
const INVALIDATED_QUESTION_STATS = new Set([
  38, 56, 170, 215, 461, 487, 492, 503, 514, 537, 545, 551,
  556, 563, 566, 568, 572, 583, 584, 586, 588, 590, 593, 594, 597,
  609, 610, 611, 653, 655, 777, 935, 936,
]);

export function today(): string {
  return formatDay(new Date());
}

export function defaultSave(): SaveData {
  return {
    version: SAVE_VERSION,
    xp: 0,
    examDate: "",
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

function migrateSave(input: unknown): SaveData {
  const parsed = (typeof input === "object" && input !== null ? input : {}) as Partial<SaveData>;
  const previousVersion = typeof parsed.version === "number" ? parsed.version : 1;
  const merged: SaveData = { ...defaultSave(), ...parsed, version: SAVE_VERSION };

  if (previousVersion < SAVE_VERSION) {
    const stats = { ...merged.stats };
    for (const id of INVALIDATED_QUESTION_STATS) delete stats[String(id)];
    merged.stats = stats;
  }

  return merged;
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    const migrated = migrateSave(parsed);
    if ((typeof parsed?.version === "number" ? parsed.version : 1) < SAVE_VERSION) {
      persistSave(migrated);
    }
    return migrated;
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
  // Ayer se calcula restando un día de calendario, no 86.400.000 ms: en el
  // cambio de hora un día no dura 24 h y la resta de milisegundos se saltaba
  // una fecha. Estudiando de madrugada el día que España adelanta el reloj,
  // "ayer" daba anteayer y la racha se rompía habiendo estudiado.
  const yStr = addDays(t, -1);
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
    persistSave(migrateSave(parsed));
    return true;
  } catch {
    return false;
  }
}
