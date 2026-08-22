// Tests de la lógica de juego: racha, repetición espaciada y selección de
// preguntas. Todo son funciones puras, así que no hace falta montar React.
//
//   npm test
//
// El TZ va fijado en vite.config.ts (Europe/Madrid): varios casos dependen del
// cambio de hora y con UTC no probarían nada.
import { describe, expect, it, vi, afterEach } from "vitest";
import { addDays, gradeCard, isDue, nextInterval, DEFAULT_EASE, MIN_EASE } from "./srs";
import { defaultSave, importSave, touchDayStreak, today, type SaveData } from "./storage";
import { pickDaily, pickExam, seededRandom, shuffle } from "./select";
import { comboMultiplier, levelFor, nextLevel, xpForAnswer } from "./xp";
import { daysToExam } from "../theme";
import type { Question } from "../types";

afterEach(() => vi.useRealTimers());

// Node no trae localStorage y loadSave/persistSave lo usan. Con un stub basta:
// no hace falta jsdom para probar funciones puras.
const store = new Map<string, string>();
vi.stubGlobal("localStorage", {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
  clear: () => store.clear(),
});

/** Banco de mentira. Sin argumento imita el reparto del banco real; con
 *  `porDominio` deja todos los dominios con el mismo número de preguntas. */
function fakeQuestions(porDominio?: number): Question[] {
  const spread: [string, number][] = porDominio
    ? [["Domain 1 (real)", porDominio], ["Domain 2", porDominio], ["Domain 3", porDominio],
       ["Domain 4 (real)", porDominio], ["Cross", porDominio]]
    : [["Domain 1 (real)", 86], ["Domain 2", 155], ["Domain 3", 100], ["Domain 4 (real)", 75], ["Cross", 36]];
  const out: Question[] = [];
  let id = 1;
  for (const [domain, n] of spread) {
    for (let i = 0; i < n; i++) {
      out.push({
        id: id++, origQ: `Q${id}`, domain, question: `pregunta ${id}`,
        options: { A: "a", B: "b", C: "c", D: "d" }, correct: "A",
        explanation: "porque sí", isTrap: id % 20 === 0, sourceFile: "fake.md",
      });
    }
  }
  return out;
}

// ───────────────────────── racha diaria ─────────────────────────

describe("touchDayStreak", () => {
  const save = (over: Partial<SaveData> = {}): SaveData => ({ ...defaultSave(), ...over });

  it("suma un día si se estudió ayer", () => {
    vi.setSystemTime(new Date("2026-07-15T10:00:00"));
    const s = touchDayStreak(save({ lastStudyDay: "2026-07-14", dayStreak: 4 }));
    expect(s.dayStreak).toBe(5);
    expect(s.lastStudyDay).toBe("2026-07-15");
  });

  it("reinicia si se saltó un día", () => {
    vi.setSystemTime(new Date("2026-07-15T10:00:00"));
    expect(touchDayStreak(save({ lastStudyDay: "2026-07-13", dayStreak: 9 })).dayStreak).toBe(1);
  });

  it("no vuelve a contar si ya se estudió hoy", () => {
    vi.setSystemTime(new Date("2026-07-15T22:00:00"));
    const s = touchDayStreak(save({ lastStudyDay: "2026-07-15", dayStreak: 3 }));
    expect(s.dayStreak).toBe(3);
  });

  it("guarda el récord de racha", () => {
    vi.setSystemTime(new Date("2026-07-15T10:00:00"));
    const s = touchDayStreak(save({ lastStudyDay: "2026-07-14", dayStreak: 7, bestDayStreak: 7 }));
    expect(s.bestDayStreak).toBe(8);
  });

  it("no rompe la racha de madrugada el día que se adelanta el reloj", () => {
    // España pasa de 02:00 a 03:00 el domingo 29/3/2026: ese día dura 23 h.
    // Restando 86.400.000 ms, "ayer" a las 00:30 del lunes daba el sábado.
    vi.setSystemTime(new Date("2026-03-30T00:30:00+02:00"));
    expect(today()).toBe("2026-03-30");
    const s = touchDayStreak(save({ lastStudyDay: "2026-03-29", dayStreak: 10 }));
    expect(s.dayStreak).toBe(11);
  });

  it("no regala un día de madrugada el día que se atrasa el reloj", () => {
    // El 25/10/2026 dura 25 h; el error simétrico sería contar dos veces.
    vi.setSystemTime(new Date("2026-10-26T00:30:00+01:00"));
    const s = touchDayStreak(save({ lastStudyDay: "2026-10-24", dayStreak: 10 }));
    expect(s.dayStreak).toBe(1); // el 25 no se estudió: la racha se corta
  });

  it("cruza el fin de mes", () => {
    vi.setSystemTime(new Date("2026-08-01T09:00:00"));
    expect(touchDayStreak(save({ lastStudyDay: "2026-07-31", dayStreak: 2 })).dayStreak).toBe(3);
  });
});

// ───────────────────────── repetición espaciada ─────────────────────────

describe("addDays", () => {
  it("cruza meses y años", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("no se salta un día en el cambio de hora", () => {
    expect(addDays("2026-03-28", 1)).toBe("2026-03-29");
    expect(addDays("2026-03-29", 1)).toBe("2026-03-30");
  });
});

describe("nextInterval", () => {
  it("'otra vez' deja la tarjeta para hoy y baja el ease", () => {
    const r = nextInterval("again", 10, 2.5);
    expect(r.interval).toBe(0);
    expect(r.ease).toBeCloseTo(2.3);
  });

  it("el ease nunca baja del mínimo por mucho que se falle", () => {
    let ease = DEFAULT_EASE;
    for (let i = 0; i < 20; i++) ease = nextInterval("again", 0, ease).ease;
    expect(ease).toBe(MIN_EASE);
  });

  it("una tarjeta nueva contestada bien vuelve mañana", () => {
    expect(nextInterval("good", 0, 2.5).interval).toBe(1);
  });

  it("los intervalos crecen con las repeticiones buenas", () => {
    const a = nextInterval("good", 1, 2.5).interval;
    const b = nextInterval("good", a, 2.5).interval;
    expect(a).toBeGreaterThan(0);
    expect(b).toBeGreaterThan(a);
  });

  it("'fácil' espacia más que 'bien', y 'difícil' menos", () => {
    const facil = nextInterval("easy", 10, 2.5).interval;
    const bien = nextInterval("good", 10, 2.5).interval;
    const dificil = nextInterval("hard", 10, 2.5).interval;
    expect(facil).toBeGreaterThan(bien);
    expect(bien).toBeGreaterThan(dificil);
  });

  it("'difícil' nunca devuelve 0 días, que dejaría la tarjeta atascada hoy", () => {
    // Con Math.round(prevInterval * 1.2) y prevInterval 0 daba 0.
    expect(nextInterval("hard", 0, 2.5).interval).toBeGreaterThanOrEqual(1);
  });
});

describe("gradeCard", () => {
  it("una tarjeta nueva bien contestada vence mañana", () => {
    expect(gradeCard(undefined, "good", "2026-07-15").due).toBe("2026-07-16");
  });

  it("'otra vez' la deja venciendo hoy", () => {
    expect(gradeCard(undefined, "again", "2026-07-15").due).toBe("2026-07-15");
  });
});

describe("isDue", () => {
  it("una tarjeta nunca vista siempre toca", () => {
    expect(isDue({}, 1, "2026-07-15")).toBe(true);
  });

  it("toca el día que vence y también después", () => {
    const srs = { 1: { due: "2026-07-15", interval: 3, ease: 2.5 } };
    expect(isDue(srs, 1, "2026-07-15")).toBe(true);
    expect(isDue(srs, 1, "2026-07-16")).toBe(true);
  });

  it("no toca antes de vencer", () => {
    const srs = { 1: { due: "2026-07-20", interval: 3, ease: 2.5 } };
    expect(isDue(srs, 1, "2026-07-15")).toBe(false);
  });
});

// ───────────────────────── selección de preguntas ─────────────────────────

describe("seededRandom", () => {
  it("la misma semilla da la misma secuencia", () => {
    const a = Array.from({ length: 5 }, seededRandom(42));
    const b = Array.from({ length: 5 }, seededRandom(42));
    expect(a).toEqual(b);
  });

  it("semillas distintas dan secuencias distintas", () => {
    expect(seededRandom(1)()).not.toBe(seededRandom(2)());
  });

  it("siempre devuelve valores en [0, 1)", () => {
    const rand = seededRandom(7);
    for (let i = 0; i < 200; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("shuffle", () => {
  it("no pierde ni duplica elementos", () => {
    const orig = [1, 2, 3, 4, 5, 6, 7, 8];
    expect([...shuffle(orig)].sort((a, b) => a - b)).toEqual(orig);
  });

  it("no muta el array original", () => {
    const orig = [1, 2, 3, 4, 5];
    shuffle(orig);
    expect(orig).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("pickDaily", () => {
  const ALL = fakeQuestions();

  it("devuelve las mismas 10 preguntas durante todo el día", () => {
    const save = defaultSave();
    const a = pickDaily(ALL, save, "2026-07-15").map(q => q.id);
    const b = pickDaily(ALL, save, "2026-07-15").map(q => q.id);
    expect(a).toHaveLength(10);
    expect(a).toEqual(b);
  });

  it("cambia de un día para otro", () => {
    const save = defaultSave();
    const a = pickDaily(ALL, save, "2026-07-15").map(q => q.id);
    const b = pickDaily(ALL, save, "2026-07-16").map(q => q.id);
    expect(a).not.toEqual(b);
  });

  it("no repite preguntas dentro del mismo reto", () => {
    const ids = pickDaily(ALL, defaultSave(), "2026-07-15").map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("mete las falladas del usuario", () => {
    const save = defaultSave();
    for (const id of [3, 7, 11]) {
      save.stats[id] = { seen: 1, correct: 0, wrong: 1, lastResult: "wrong" };
    }
    const ids = pickDaily(ALL, save, "2026-07-15").map(q => q.id);
    expect(ids.filter(id => [3, 7, 11].includes(id)).length).toBeGreaterThan(0);
  });

  it("sigue dando 10 aunque no haya ninguna fallada", () => {
    expect(pickDaily(ALL, defaultSave(), "2026-07-15")).toHaveLength(10);
  });
});

describe("pickExam", () => {
  // Ojo: acá el banco tiene los cinco dominios con el MISMO número de
  // preguntas, a diferencia del real. Con las proporciones reales, sacar 60 al
  // azar da un reparto casi idéntico al ponderado y el test no distinguiría
  // una cosa de la otra: pasaba igual con la ponderación desactivada.
  const ALL = fakeQuestions(100);

  it("devuelve exactamente las que se piden", () => {
    expect(pickExam(ALL, 60)).toHaveLength(60);
  });

  it("no repite preguntas", () => {
    const ids = pickExam(ALL, 60).map(q => q.id);
    expect(new Set(ids).size).toBe(60);
  });

  it("reparte por peso del examen y no a partes iguales", () => {
    const got = pickExam(ALL, 60);
    const cuenta = (d: string) => got.filter(q => q.domain === d).length;
    // 60 repartidas por peso: 33% / 22% / 27% / 12% / 6%.
    expect(cuenta("Domain 2")).toBe(20);
    expect(cuenta("Domain 3")).toBe(13);
    expect(cuenta("Domain 1 (real)")).toBe(16);
    expect(cuenta("Domain 4 (real)")).toBe(7);
    expect(cuenta("Cross")).toBe(4);
  });

  it("no se rompe si se piden más preguntas que las que hay", () => {
    const pocas = ALL.slice(0, 12);
    expect(pickExam(pocas, 60).length).toBeLessThanOrEqual(12);
  });
});

// ───────────────────────── XP y niveles ─────────────────────────

describe("xp", () => {
  it("el nivel sube con el XP acumulado", () => {
    expect(levelFor(0).name).toBe("Becario de Azure");
    expect(levelFor(299).name).toBe("Becario de Azure");
    expect(levelFor(300).name).toBe("Junior Prompt Engineer");
    expect(levelFor(999999).name).toBe("Leyenda del AI-103");
  });

  it("no hay nivel siguiente en el tope", () => {
    expect(nextLevel(0)).not.toBeNull();
    expect(nextLevel(999999)).toBeNull();
  });

  it("el multiplicador de combo crece por tramos", () => {
    expect(comboMultiplier(0)).toBe(1);
    expect(comboMultiplier(3)).toBe(1.5);
    expect(comboMultiplier(15)).toBe(3);
  });

  it("las trampas y la rapidez suman XP", () => {
    const base = xpForAnswer({ isTrap: false, combo: 0, fast: false });
    expect(xpForAnswer({ isTrap: true, combo: 0, fast: false })).toBeGreaterThan(base);
    expect(xpForAnswer({ isTrap: false, combo: 0, fast: true })).toBeGreaterThan(base);
    expect(xpForAnswer({ isTrap: false, combo: 10, fast: false })).toBeGreaterThan(base);
  });
});

// ───────────────────────── guardado ─────────────────────────

describe("importSave", () => {
  it("rechaza basura sin romperse", () => {
    expect(importSave("no soy json")).toBe(false);
    expect(importSave("null")).toBe(false);
    expect(importSave('{"sin": "xp"}')).toBe(false);
  });

  it("acepta un guardado válido", () => {
    expect(importSave(JSON.stringify({ ...defaultSave(), xp: 500 }))).toBe(true);
  });

  it("rellena los campos que falten en un guardado viejo", () => {
    // Un respaldo anterior a que existiera examDate no debe romper la app.
    const viejo = { ...defaultSave(), xp: 120 } as Partial<SaveData>;
    delete viejo.examDate;
    expect(importSave(JSON.stringify(viejo))).toBe(true);
  });
});

// ───────────────────────── cuenta atrás del examen ─────────────────────────

describe("daysToExam", () => {
  it("sin fecha agendada no inventa una cuenta", () => {
    expect(daysToExam("")).toBeNull();
    expect(daysToExam("no-es-fecha")).toBeNull();
  });

  it("cuenta los días que faltan", () => {
    vi.setSystemTime(new Date("2026-07-15T10:00:00"));
    expect(daysToExam("2026-07-25")).toBe(10);
  });

  it("una fecha pasada da 0, nunca negativo", () => {
    vi.setSystemTime(new Date("2026-07-15T10:00:00"));
    expect(daysToExam("2026-07-01")).toBe(0);
  });

  it("el mismo día da 0", () => {
    vi.setSystemTime(new Date("2026-07-15T18:00:00"));
    expect(daysToExam("2026-07-15")).toBe(0);
  });
});
