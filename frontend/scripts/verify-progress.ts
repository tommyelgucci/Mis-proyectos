/**
 * Verificación de la agregación del dashboard (Fase 6).
 *
 * Mismo espíritu que verify-merge.ts: se ejercita con las formas de datos
 * REALES que guardan las apps HTML (§5.3), incluidas las malformadas — el
 * progreso llega de localStorage y de Supabase, así que puede venir con
 * campos ausentes, nulos o de tipos que no tocan, y el dashboard tiene que
 * degradar en vez de romperse.
 */
import {
  CATEGORY_META,
  MIN_ATTEMPTS,
  buildOverview,
  hasActivity,
  readAllCategories,
  readCategory,
  suggestNextSession,
  untouchedTypes,
  weakestTypes,
} from '../src/lib/progress-stats';

let failures = 0;

function check(name: string, actual: unknown, expected: unknown): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`✓ ${name}`);
  } else {
    failures++;
    console.error(`✗ ${name}\n  esperado: ${e}\n  obtenido: ${a}`);
  }
}

function ok(name: string, condition: boolean): void {
  if (condition) {
    console.log(`✓ ${name}`);
  } else {
    failures++;
    console.error(`✗ ${name}`);
  }
}

const math = CATEGORY_META.find((c) => c.id === 'mathematik')!;
const vernetztes = CATEGORY_META.find((c) => c.id === 'vernetztes-denken')!;
const konz = CATEGORY_META.find((c) => c.id === 'konzentration')!;

/* ---------- lectura de una categoría ---------- */

const mathReal = readCategory(math, {
  mastered: { 'p1': true, 'p2': true },
  stats: { percent: { ok: 8, total: 10 }, fraction: { ok: 3, total: 12 } },
  best: 7,
});
check('precisión por tipo', mathReal.types.find((t) => t.id === 'percent')?.accuracy, 80);
check('precisión de la categoría (agregada)', mathReal.accuracy, 50); // 11/22
check('récord leído', mathReal.best, 7);
check('dominados contados', mathReal.mastered, 2);
check(
  'tipo sin intentos → accuracy null, no 0%',
  mathReal.types.find((t) => t.id === 'data')?.accuracy,
  null
);

/* ---------- robustez frente a datos corruptos ---------- */

check('data null no rompe', readCategory(math, null).total, 0);
check('data string no rompe', readCategory(math, 'basura').total, 0);
check('data array no rompe', readCategory(math, [1, 2, 3]).total, 0);
check('stats null no rompe', readCategory(math, { stats: null }).total, 0);
check('stats string no rompe', readCategory(math, { stats: 'x' }).total, 0);
check(
  'entrada de tipo malformada cuenta como 0',
  readCategory(math, { stats: { percent: 'no-es-objeto' } }).total,
  0
);
check(
  'total no numérico cuenta como 0',
  readCategory(math, { stats: { percent: { ok: 5, total: 'diez' } } }).total,
  0
);
check(
  'best no numérico → null',
  readCategory(math, { best: 'siete' }).best,
  null
);
check('best negativo → null', readCategory(math, { best: -3 }).best, null);
check('best NaN → null', readCategory(math, { best: NaN }).best, null);
check('best Infinity → null', readCategory(math, { best: Infinity }).best, null);
check(
  'mastered no objeto → null',
  readCategory(math, { mastered: 'si' }).mastered,
  null
);
check(
  'mastered cuenta solo los truthy (destildar deja false)',
  readCategory(math, { mastered: { a: true, b: false, c: true } }).mastered,
  2
);
check(
  'ok mayor que total se acota (no hay 150%)',
  readCategory(math, { stats: { percent: { ok: 15, total: 10 } } }).accuracy,
  100
);
check(
  'clave de tipo desconocida se ignora',
  readCategory(math, { stats: { inventado: { ok: 5, total: 5 } } }).total,
  0
);

/* ---------- categorías sin stats (solo mastered) ---------- */

const vd = readCategory(vernetztes, { mastered: { 0: true, 3: true, 7: true }, checklist: { a: true } });
check('categoría sin stats: total 0', vd.total, 0);
check('categoría sin stats: accuracy null', vd.accuracy, null);
check('categoría sin stats: dominados sí se leen', vd.mastered, 3);
ok('categoría solo-mastered cuenta como activa', hasActivity(vd));

const konzMem = readCategory(konz, { stats: {}, best: 0, memBest: 2 });
ok('memBest solo cuenta como actividad', hasActivity(konzMem));
ok('categoría totalmente vacía no cuenta como activa', !hasActivity(readCategory(math, {})));

/* ---------- overview global ---------- */

const snapshot = {
  'mathematik-progress': { stats: { percent: { ok: 8, total: 10 } }, best: 6, mastered: { a: true } },
  'zahlenreihen-progress': { stats: { arith: { ok: 2, total: 10 } }, best: 4 },
};
const cats = readAllCategories(snapshot);
const ov = buildOverview(cats);
check('overview: respondidos', ov.answered, 20);
check('overview: correctos', ov.correct, 10);
check('overview: precisión global', ov.accuracy, 50);
check('overview: categorías empezadas', ov.categoriesStarted, 2);
check('overview: categorías totales', ov.categoriesTotal, 10);
check('overview: dominados', ov.mastered, 1);
check('overview: dominados posibles (12+6+12+6+6+6+24+24)', ov.masteredTotal, 96);

const empty = buildOverview(readAllCategories({}));
check('overview vacío: precisión null, no 0%', empty.accuracy, null);
check('overview vacío: 0 categorías empezadas', empty.categoriesStarted, 0);

/* ---------- puntos débiles ---------- */

const weakCats = readAllCategories({
  'mathematik-progress': {
    stats: {
      percent: { ok: 2, total: 10 }, // 20% — débil
      fraction: { ok: 9, total: 10 }, // 90% — sólido
      estimate: { ok: 0, total: 3 }, // 0% pero pocos datos → NO es punto débil
      inverse: { ok: 5, total: 10 }, // 50% — débil
    },
  },
});
const weak = weakestTypes(weakCats);
check('puntos débiles: cuántos', weak.length, 2);
check('puntos débiles: el peor primero', weak[0].type.id, 'percent');
check('puntos débiles: el segundo', weak[1].type.id, 'inverse');
ok(
  `un 0% con menos de ${MIN_ATTEMPTS} intentos no es punto débil (es ruido)`,
  !weak.some((w) => w.type.id === 'estimate')
);
ok('un 90% no es punto débil', !weak.some((w) => w.type.id === 'fraction'));

const tie = readAllCategories({
  'mathematik-progress': {
    stats: { percent: { ok: 5, total: 10 }, fraction: { ok: 20, total: 40 } },
  },
});
check(
  'empate a 50%: gana el que tiene más intentos (señal más sólida)',
  weakestTypes(tie)[0].type.id,
  'fraction'
);

check('límite de puntos débiles respetado', weakestTypes(weakCats, 1).length, 1);

/* ---------- tipos sin estrenar ---------- */

const untouched = untouchedTypes(weakCats);
ok('tipos sin estrenar detectados', untouched.some((u) => u.type.id === 'data'));
ok('un tipo con intentos no aparece como sin estrenar', !untouched.some((u) => u.type.id === 'percent'));
check(
  'todos los tipos del catálogo sin datos → todos sin estrenar',
  untouchedTypes(readAllCategories({})).length,
  CATEGORY_META.reduce((a, c) => a + c.types.length, 0)
);

/* ---------- sugerencia de siguiente sesión ---------- */

// Sin nada hecho, TODOS los tipos están sin estrenar: si este caso no fuese lo
// primero que se comprueba, la prioridad 2 saludaría al usuario nuevo con un
// "te quedan 9 tipos sin probar" en vez de una bienvenida.
const fresh = suggestNextSession(readAllCategories({}));
check('cuenta nueva: sugiere un punto de partida concreto', fresh.categoryId, 'mathematik');
ok('cuenta nueva: el motivo es una bienvenida, no un informe de huecos', fresh.reason.includes('Aún no hay nada entrenado'));

check(
  'prioridad 1: el punto débil manda sobre los tipos sin estrenar',
  suggestNextSession(weakCats).headline.includes('Porcentajes'),
  true
);

// Todos los tipos de mathematik probados y sólidos, el resto sin tocar.
const allMathSolid: Record<string, { ok: number; total: number }> = {};
for (const t of math.types) allMathSolid[t.id] = { ok: 19, total: 20 };
const solidMath = readAllCategories({ 'mathematik-progress': { stats: allMathSolid } });
const sugg2 = suggestNextSession(solidMath);
ok(
  'prioridad 2: sin puntos débiles, sugiere la categoría con más tipos sin estrenar',
  sugg2.categoryId === 'zahlenreihen' && sugg2.reason.includes('9 tipos sin probar')
);

// Todo estrenado; uno con pocos datos.
const everything: Record<string, unknown> = {};
for (const c of CATEGORY_META) {
  if (c.types.length === 0) continue;
  const stats: Record<string, { ok: number; total: number }> = {};
  for (const t of c.types) stats[t.id] = { ok: 19, total: 20 };
  everything[c.storageKey] = { stats };
}
const thinCats = readAllCategories({
  ...everything,
  'konzentration-merkfaehigkeit-progress': {
    stats: {
      blockdiff: { ok: 19, total: 20 },
      samediff: { ok: 19, total: 20 },
      vector: { ok: 19, total: 20 },
      midpoint: { ok: 2, total: 2 }, // pocos datos
    },
  },
});
const sugg3 = suggestNextSession(thinCats);
ok(
  'prioridad 3: todo estrenado, sugiere completar el tipo con pocos datos',
  sugg3.categoryId === 'konzentration' && sugg3.reason.includes(`${MIN_ATTEMPTS}`)
);

const sugg4 = suggestNextSession(readAllCategories(everything));
ok(
  'prioridad 4: todo sólido y con datos, sugiere pulir lo más bajo',
  sugg4.reason.startsWith('Vas sólido en todo')
);

/* ---------- coherencia del catálogo con el resto del código ---------- */

const LEGACY_KEYS = [
  'vernetztes-denken-progress',
  'analyse-programmierung-progress',
  'konzentration-merkfaehigkeit-progress',
  'mathematik-progress',
  'zahlenreihen-progress',
  'vorstellungsvermoegen-progress',
  'logik-progress',
  'coordenadas-progress',
  'competencias-digitales-progress',
  'escenarios-trabajo-progress',
];
ok(
  'el catálogo cubre exactamente las 10 claves de storage del bridge',
  CATEGORY_META.length === LEGACY_KEYS.length &&
    CATEGORY_META.every((c) => LEGACY_KEYS.includes(c.storageKey))
);
ok(
  'no hay ids de tipo duplicados dentro de una categoría',
  CATEGORY_META.every((c) => new Set(c.types.map((t) => t.id)).size === c.types.length)
);
check(
  'el catálogo declara los 38 tipos con estadística',
  CATEGORY_META.reduce((a, c) => a + c.types.length, 0),
  38
);
ok(
  'toda categoría declara al menos una carrera',
  CATEGORY_META.every((c) => c.tracks.length > 0)
);

if (failures > 0) {
  console.error(`\n❌ ${failures} fallo(s) en la agregación del progreso.`);
  process.exit(1);
}
console.log('\n✅ Agregación del dashboard verificada.');
