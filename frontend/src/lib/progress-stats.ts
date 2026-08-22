/**
 * Fase 6 — Agregación del progreso para el dashboard.
 *
 * Todo lo de aquí son funciones PURAS sobre el snapshot del store del bridge
 * (utils/storage-bridge.ts), sin React: así el script scripts/verify-progress.ts
 * puede ejercitarlas con las formas de datos reales, igual que verify-merge.ts
 * hace con la fusión (protocolo del §9 del archivo maestro).
 *
 * Los datos vienen de localStorage y de Supabase, o sea del exterior: cualquier
 * campo puede faltar, ser null o tener un tipo que no toca. Todos los lectores
 * son defensivos a propósito — un progreso corrupto debe degradar el dashboard,
 * nunca tumbarlo.
 *
 * El catálogo de abajo refleja lo que guarda CADA app HTML legacy (§5.3). Los
 * ids y etiquetas de tipo están copiados de los GENERATORS de cada HTML, y los
 * denominadores (sprint, dominados, memoria) de su UI de progreso. Si tocas un
 * HTML, actualiza esto.
 *
 * `tracks` es puramente de UI (Progress.tsx filtra por él antes de agregar);
 * estas funciones agregan sobre TODO el catálogo sin mirarlo — así que
 * ninguna prueba de este archivo necesita saber qué carrera existe.
 */
import type { TrackId } from './tracks';

export interface TypeMeta {
  id: string;
  label: string;
}

export interface CategoryMeta {
  id: string;
  storageKey: string;
  emoji: string;
  title: string;
  /** Tipos con estadística ok/total. Vacío si la app no lleva `stats`. */
  types: TypeMeta[];
  /** Denominador de `best` (tamaño del sprint). null si la app no tiene sprint. */
  sprintSize: number | null;
  /** Denominador de `mastered`. null si la app no marca ejercicios dominados. */
  masteredTotal: number | null;
  /** Denominador de `memBest`. null si la app no tiene prueba de memoria. */
  memBestTotal: number | null;
  /** Carrera(s) que incluyen esta categoría — debe reflejar CATEGORIES en Study.tsx. */
  tracks: TrackId[];
}

export const CATEGORY_META: CategoryMeta[] = [
  {
    id: 'mathematik',
    storageKey: 'mathematik-progress',
    emoji: '🧮',
    title: 'Mathematik',
    types: [
      { id: 'percent', label: 'Porcentajes' },
      { id: 'fraction', label: 'Fracciones' },
      { id: 'estimate', label: 'Estimación' },
      { id: 'inverse', label: 'Prop. inversa' },
      { id: 'direct', label: 'Prop. directa' },
      { id: 'chained', label: 'Descuentos+IVA' },
      { id: 'data', label: 'Datos/Red' },
    ],
    sprintSize: 10,
    masteredTotal: 12,
    memBestTotal: null,
    tracks: ['ict', 'wirtschaft'],
  },
  {
    id: 'zahlenreihen',
    storageKey: 'zahlenreihen-progress',
    emoji: '🔢',
    title: 'Zahlenreihen',
    types: [
      { id: 'arith', label: 'Aritmética' },
      { id: 'geom', label: 'Geométrica ×' },
      { id: 'geomdiv', label: 'Geométrica ÷' },
      { id: 'growdiff', label: 'Dif. creciente' },
      { id: 'square', label: 'Cuadrados' },
      { id: 'altern', label: 'Zigzag' },
      { id: 'fib', label: 'Fibonacci' },
      { id: 'multadd', label: '×2 + c' },
      { id: 'interleaved', label: 'Entrelazada' },
    ],
    sprintSize: 10,
    masteredTotal: null,
    memBestTotal: null,
    tracks: ['ict'],
  },
  {
    id: 'analyse-programmierung',
    storageKey: 'analyse-programmierung-progress',
    emoji: '💻',
    title: 'Analyse & Programmierung',
    types: [
      { id: 'modloop', label: 'Bucle + MOD' },
      { id: 'nested', label: 'FOR anidado variable' },
      { id: 'cond', label: 'Condicionales AND' },
      { id: 'assign', label: 'Asignaciones en cadena' },
      { id: 'rec', label: 'Recursión' },
    ],
    sprintSize: 8,
    masteredTotal: 6,
    memBestTotal: null,
    tracks: ['ict'],
  },
  {
    id: 'konzentration',
    storageKey: 'konzentration-merkfaehigkeit-progress',
    emoji: '🎯',
    title: 'Konzentration & Merkfähigkeit',
    types: [
      { id: 'blockdiff', label: '¿Qué bloque difiere?' },
      { id: 'samediff', label: '¿Idénticas o no?' },
      { id: 'vector', label: 'Vector en tablero' },
      { id: 'midpoint', label: 'Punto medio (+trampa)' },
    ],
    sprintSize: 10,
    masteredTotal: null,
    memBestTotal: 3,
    tracks: ['ict', 'wirtschaft'],
  },
  {
    id: 'vernetztes-denken',
    storageKey: 'vernetztes-denken-progress',
    emoji: '🔗',
    title: 'Vernetztes Denken',
    types: [],
    sprintSize: null,
    masteredTotal: 12,
    memBestTotal: null,
    tracks: ['ict', 'wirtschaft'],
  },
  {
    id: 'vorstellungsvermoegen',
    storageKey: 'vorstellungsvermoegen-progress',
    emoji: '🧊',
    title: 'Vorstellungsvermögen',
    types: [],
    sprintSize: null,
    masteredTotal: 6,
    memBestTotal: null,
    tracks: ['ict'],
  },
  {
    id: 'logik',
    storageKey: 'logik-progress',
    emoji: '🧩',
    title: 'Logik',
    types: [
      { id: 'verbal', label: 'Analogía verbal' },
      { id: 'figural', label: 'Analogía figural' },
    ],
    sprintSize: 10,
    masteredTotal: 6,
    memBestTotal: null,
    tracks: ['wirtschaft'],
  },
  {
    id: 'coordenadas',
    storageKey: 'coordenadas-progress',
    emoji: '📍',
    title: 'Coordenadas',
    types: [
      { id: 'read', label: 'Leer coordenadas' },
      { id: 'locate', label: 'Ubicar el punto' },
      { id: 'quadrant', label: 'Cuadrante' },
    ],
    sprintSize: 10,
    masteredTotal: 6,
    memBestTotal: null,
    tracks: ['wirtschaft'],
  },
  {
    id: 'competencias-digitales',
    storageKey: 'competencias-digitales-progress',
    emoji: '💻',
    title: 'Competencias digitales',
    types: [
      { id: 'seguridad', label: 'Seguridad' },
      { id: 'archivos', label: 'Archivos y datos' },
      { id: 'internet', label: 'Internet y correo' },
      { id: 'ofimatica', label: 'Ofimática' },
    ],
    sprintSize: 10,
    masteredTotal: 24,
    memBestTotal: null,
    tracks: ['wirtschaft'],
  },
  {
    id: 'escenarios-trabajo',
    storageKey: 'escenarios-trabajo-progress',
    emoji: '🤝',
    title: 'Escenarios de trabajo',
    types: [
      { id: 'atencion', label: 'Atención al cliente' },
      { id: 'equipo', label: 'Trabajo en equipo' },
      { id: 'errores', label: 'Manejo de errores' },
      { id: 'organizacion', label: 'Organización' },
    ],
    sprintSize: 10,
    masteredTotal: 24,
    memBestTotal: null,
    tracks: ['wirtschaft'],
  },
];

/** Intentos mínimos para que un porcentaje se considere fiable (§4). */
export const MIN_ATTEMPTS = 10;
/** Por debajo de esto, un tipo con datos suficientes cuenta como punto débil. */
export const WEAK_THRESHOLD = 70;

export interface TypeStat extends TypeMeta {
  ok: number;
  total: number;
  /** null si no hay intentos: 0 intentos no es 0 % de acierto. */
  accuracy: number | null;
  /** true si hay intentos pero aún no bastan para fiarse del porcentaje. */
  fewData: boolean;
}

export interface CategoryStat {
  meta: CategoryMeta;
  types: TypeStat[];
  ok: number;
  total: number;
  accuracy: number | null;
  best: number | null;
  memBest: number | null;
  mastered: number | null;
}

export interface Weakness {
  categoryId: string;
  categoryTitle: string;
  emoji: string;
  type: TypeStat;
}

export interface Overview {
  answered: number;
  correct: number;
  accuracy: number | null;
  /** Categorías con alguna señal de actividad. */
  categoriesStarted: number;
  categoriesTotal: number;
  mastered: number;
  masteredTotal: number;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Número finito y no negativo, o null. Descarta NaN, Infinity, strings y negativos. */
function asCount(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
}

function countTruthy(value: unknown): number | null {
  const rec = asRecord(value);
  if (!rec) return null;
  return Object.values(rec).filter(Boolean).length;
}

function pct(ok: number, total: number): number | null {
  return total > 0 ? Math.round((ok / total) * 100) : null;
}

/**
 * Lee las estadísticas de una categoría. Solo cuenta los tipos declarados en el
 * catálogo: si un HTML guardara una clave desconocida, se ignora en vez de
 * aparecer como un tipo sin nombre.
 *
 * `ok` se acota a `total` porque un progreso fusionado o manipulado podría
 * traer más aciertos que intentos, y eso daría precisiones por encima del 100 %.
 */
export function readCategory(meta: CategoryMeta, data: unknown): CategoryStat {
  const d = asRecord(data);
  const statsRec = d ? asRecord(d.stats) : null;

  const types: TypeStat[] = meta.types.map((t) => {
    const raw = statsRec ? asRecord(statsRec[t.id]) : null;
    const total = raw ? (asCount(raw.total) ?? 0) : 0;
    const ok = Math.min(raw ? (asCount(raw.ok) ?? 0) : 0, total);
    return {
      ...t,
      ok,
      total,
      accuracy: pct(ok, total),
      fewData: total > 0 && total < MIN_ATTEMPTS,
    };
  });

  const ok = types.reduce((a, t) => a + t.ok, 0);
  const total = types.reduce((a, t) => a + t.total, 0);

  return {
    meta,
    types,
    ok,
    total,
    accuracy: pct(ok, total),
    best: d ? asCount(d.best) : null,
    memBest: d ? asCount(d.memBest) : null,
    mastered: d ? countTruthy(d.mastered) : null,
  };
}

/** Lee todas las categorías del catálogo desde el snapshot del bridge. */
export function readAllCategories(snapshot: Record<string, unknown>): CategoryStat[] {
  return CATEGORY_META.map((meta) => readCategory(meta, snapshot[meta.storageKey]));
}

/** Una categoría cuenta como empezada si tiene intentos, récord o dominados. */
export function hasActivity(cat: CategoryStat): boolean {
  return cat.total > 0 || (cat.best ?? 0) > 0 || (cat.mastered ?? 0) > 0 || (cat.memBest ?? 0) > 0;
}

export function buildOverview(cats: CategoryStat[]): Overview {
  const correct = cats.reduce((a, c) => a + c.ok, 0);
  const answered = cats.reduce((a, c) => a + c.total, 0);
  const mastered = cats.reduce((a, c) => a + (c.mastered ?? 0), 0);
  const masteredTotal = cats.reduce((a, c) => a + (c.meta.masteredTotal ?? 0), 0);

  return {
    answered,
    correct,
    accuracy: pct(correct, answered),
    categoriesStarted: cats.filter(hasActivity).length,
    categoriesTotal: cats.length,
    mastered,
    masteredTotal,
  };
}

/**
 * Puntos débiles: tipos con datos suficientes (≥ MIN_ATTEMPTS) ordenados por
 * menor precisión. Se exige el mínimo de intentos a propósito — un 0/1 no es
 * un punto débil, es ruido.
 *
 * Desempate por más intentos: entre dos tipos al 50 %, el que tiene 40 intentos
 * es una señal más sólida que el que tiene 10.
 */
export function weakestTypes(cats: CategoryStat[], limit = 5): Weakness[] {
  const out: Weakness[] = [];
  for (const cat of cats) {
    for (const type of cat.types) {
      if (type.total >= MIN_ATTEMPTS && type.accuracy !== null && type.accuracy < WEAK_THRESHOLD) {
        out.push({
          categoryId: cat.meta.id,
          categoryTitle: cat.meta.title,
          emoji: cat.meta.emoji,
          type,
        });
      }
    }
  }
  out.sort((a, b) => (a.type.accuracy! - b.type.accuracy!) || (b.type.total - a.type.total));
  return out.slice(0, limit);
}

/** Tipos que aún no se han probado nunca (0 intentos). */
export function untouchedTypes(cats: CategoryStat[]): Weakness[] {
  const out: Weakness[] = [];
  for (const cat of cats) {
    for (const type of cat.types) {
      if (type.total === 0) {
        out.push({
          categoryId: cat.meta.id,
          categoryTitle: cat.meta.title,
          emoji: cat.meta.emoji,
          type,
        });
      }
    }
  }
  return out;
}

export interface Suggestion {
  /** Categoría a la que llevar al usuario. */
  categoryId: string | null;
  headline: string;
  reason: string;
}

/**
 * Sugerencia de siguiente sesión. Prioridad deliberada, de más a menos urgente:
 *
 * 0. Cuenta nueva sin nada hecho — bienvenida con un punto de partida concreto.
 * 1. Punto débil confirmado — hay datos suficientes y la precisión es baja.
 * 2. Tipos sin estrenar — cubrir el temario antes de pulir lo que ya va bien.
 * 3. Tipos con pocos datos — llegar al mínimo para saber si son débiles.
 * 4. Todo cubierto y sólido — pulir el de menor precisión.
 *
 * El caso 0 va primero porque si no es inalcanzable: sin datos, TODOS los tipos
 * están sin estrenar, así que el caso 2 se dispararía y saludaría a un usuario
 * nuevo con un "te quedan 9 tipos sin probar" en vez de una bienvenida.
 *
 * Devuelve una sola sugerencia: el objetivo es decidir qué hacer ahora, no dar
 * una lista que haya que priorizar otra vez.
 */
export function suggestNextSession(cats: CategoryStat[]): Suggestion {
  if (!cats.some(hasActivity)) {
    const start = cats.find((c) => c.meta.id === 'mathematik') ?? cats[0];
    return start
      ? {
          categoryId: start.meta.id,
          headline: `${start.meta.emoji} ${start.meta.title}`,
          reason: 'Aún no hay nada entrenado. Empieza por aquí y el dashboard se irá llenando solo.',
        }
      : {
          categoryId: null,
          headline: 'Empieza por donde quieras',
          reason: 'Aún no hay datos de entrenamiento.',
        };
  }

  const weak = weakestTypes(cats, 1)[0];
  if (weak) {
    return {
      categoryId: weak.categoryId,
      headline: `${weak.emoji} ${weak.categoryTitle} — ${weak.type.label}`,
      reason: `Es tu punto más débil: ${weak.type.accuracy}% de acierto en ${weak.type.total} intentos.`,
    };
  }

  const untouched = untouchedTypes(cats);
  if (untouched.length > 0) {
    // Agrupar por categoría y atacar primero la que más huecos tiene.
    const byCategory = new Map<string, Weakness[]>();
    for (const u of untouched) {
      const list = byCategory.get(u.categoryId) ?? [];
      list.push(u);
      byCategory.set(u.categoryId, list);
    }
    let top: Weakness[] = [];
    for (const list of byCategory.values()) {
      if (list.length > top.length) top = list;
    }
    const first = top[0];
    return {
      categoryId: first.categoryId,
      headline: `${first.emoji} ${first.categoryTitle}`,
      reason:
        top.length === 1
          ? `Te queda 1 tipo sin probar: ${first.type.label}.`
          : `Te quedan ${top.length} tipos sin probar, empezando por ${first.type.label}.`,
    };
  }

  const thin = cats
    .flatMap((c) => c.types.map((t) => ({ cat: c, type: t })))
    .filter((x) => x.type.fewData)
    .sort((a, b) => a.type.total - b.type.total)[0];
  if (thin) {
    return {
      categoryId: thin.cat.meta.id,
      headline: `${thin.cat.meta.emoji} ${thin.cat.meta.title} — ${thin.type.label}`,
      reason: `Solo ${thin.type.total} intento${thin.type.total === 1 ? '' : 's'}: hacen falta ${MIN_ATTEMPTS} para fiarse del porcentaje.`,
    };
  }

  const lowest = cats
    .flatMap((c) => c.types.map((t) => ({ cat: c, type: t })))
    .filter((x) => x.type.accuracy !== null)
    .sort((a, b) => a.type.accuracy! - b.type.accuracy!)[0];
  if (lowest) {
    return {
      categoryId: lowest.cat.meta.id,
      headline: `${lowest.cat.meta.emoji} ${lowest.cat.meta.title} — ${lowest.type.label}`,
      reason: `Vas sólido en todo. Lo más pulible: ${lowest.type.accuracy}% en ${lowest.type.label}.`,
    };
  }

  return {
    categoryId: null,
    headline: 'Empieza por donde quieras',
    reason: 'Aún no hay datos de entrenamiento. Cualquier categoría es un buen comienzo.',
  };
}
