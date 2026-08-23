/**
 * Verificación del Desafío diario (Fase 7): selección determinista por
 * fecha y racha día-sobre-día.
 */
import {
  EMPTY_DAILY_STATE,
  currentStreak,
  isCompletedToday,
  parseDailyState,
  pickDaily,
  recordCompletion,
  seedFromDate,
  seededRandom,
  todayKey,
  yesterdayKey,
} from '../src/lib/daily-challenge';

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

/* ---------- fechas ---------- */

check('todayKey con fecha fija', todayKey(new Date(2026, 7, 22)), '2026-08-22');
check('todayKey rellena con ceros', todayKey(new Date(2026, 0, 5)), '2026-01-05');
check('yesterdayKey día simple', yesterdayKey('2026-08-22'), '2026-08-21');
check('yesterdayKey cruza de mes', yesterdayKey('2026-08-01'), '2026-07-31');
check('yesterdayKey cruza de año', yesterdayKey('2026-01-01'), '2025-12-31');
check('yesterdayKey respeta año bisiesto', yesterdayKey('2024-03-01'), '2024-02-29');

/* ---------- PRNG sembrado: reproducible y con buena dispersión básica ---------- */

const seed = seedFromDate('2026-08-22');
const seqA = Array.from({ length: 5 }, seededRandom(seed));
const seqB = Array.from({ length: 5 }, seededRandom(seed));
check('mismo seed → misma secuencia', seqA, seqB);
ok('seeds de fechas distintas dan seeds distintos', seedFromDate('2026-08-22') !== seedFromDate('2026-08-23'));
ok('los valores del PRNG caen en [0,1)', seqA.every((v) => v >= 0 && v < 1));
ok('el PRNG no repite el mismo valor todo el tiempo', new Set(seqA).size > 1);

/* ---------- pickDaily: determinismo por fecha ---------- */

const pool = ['a', 'b', 'c', 'd', 'e'];
check(
  'pickDaily es determinista: misma fecha, misma selección',
  pickDaily(pool, '2026-08-22', 8),
  pickDaily(pool, '2026-08-22', 8)
);
ok(
  'pickDaily cambia de un día a otro (no es el mismo desafío siempre)',
  JSON.stringify(pickDaily(pool, '2026-08-22', 8)) !== JSON.stringify(pickDaily(pool, '2026-08-23', 8))
);
check('pickDaily con pool vacío no rompe', pickDaily([], '2026-08-22', 8), []);
check('pickDaily respeta el tamaño pedido', pickDaily(pool, '2026-08-22', 8).length, 8);
ok(
  'pickDaily solo devuelve elementos del pool',
  pickDaily(pool, '2026-08-22', 20).every((x) => pool.includes(x))
);

/* ---------- parseDailyState: robustez ante localStorage corrupto ---------- */

check('parseDailyState con null cae al estado vacío', parseDailyState(null), EMPTY_DAILY_STATE);
check('parseDailyState con string suelta cae al estado vacío', parseDailyState('basura'), EMPTY_DAILY_STATE);
check(
  'parseDailyState con streak negativo lo descarta',
  parseDailyState({ streak: -3 }).streak,
  0
);
check(
  'parseDailyState con streak no numérico lo descarta',
  parseDailyState({ streak: 'mucho' }).streak,
  0
);
check(
  'parseDailyState descarta entradas de historial malformadas',
  parseDailyState({ history: { '2026-08-20': { score: 5, total: 8 }, '2026-08-21': 'basura' } }).history,
  { '2026-08-20': { score: 5, total: 8 } }
);
check(
  'parseDailyState nunca deja longestStreak por debajo de streak',
  parseDailyState({ streak: 5, longestStreak: 2 }).longestStreak,
  5
);

/* ---------- currentStreak: "en vivo", no solo lo guardado ---------- */

const liveToday: import('../src/lib/daily-challenge').DailyChallengeState = {
  streak: 4,
  longestStreak: 4,
  lastCompletedDay: '2026-08-22',
  history: {},
};
check('racha en vivo: completado hoy → vale la guardada', currentStreak(liveToday, '2026-08-22'), 4);

const liveYesterday = { ...liveToday, lastCompletedDay: '2026-08-21' };
check(
  'racha en vivo: completado ayer → sigue viva (todavía se puede completar hoy)',
  currentStreak(liveYesterday, '2026-08-22'),
  4
);

const liveStale = { ...liveToday, lastCompletedDay: '2026-08-10' };
check(
  'racha en vivo: completado hace más de un día → ya se cortó, aunque no se haya "escrito" todavía',
  currentStreak(liveStale, '2026-08-22'),
  0
);

check('nunca completado → racha 0', currentStreak(EMPTY_DAILY_STATE, '2026-08-22'), 0);

/* ---------- isCompletedToday ---------- */

ok('isCompletedToday: sí, si el último día es hoy', isCompletedToday(liveToday, '2026-08-22'));
ok('isCompletedToday: no, si el último día fue ayer', !isCompletedToday(liveYesterday, '2026-08-22'));

/* ---------- recordCompletion: la racha día-sobre-día ---------- */

const day1 = recordCompletion(EMPTY_DAILY_STATE, '2026-08-20', 6, 8);
check('primer día completado: racha arranca en 1', day1.streak, 1);
check('primer día: se guarda en el historial', day1.history['2026-08-20'], { score: 6, total: 8 });

const day2 = recordCompletion(day1, '2026-08-21', 8, 8);
check('día consecutivo: la racha suma', day2.streak, 2);

const skipped = recordCompletion(day2, '2026-08-25', 5, 8);
check('se salteó un día: la racha se corta y arranca de nuevo en 1', skipped.streak, 1);

const sameDay = recordCompletion(day2, '2026-08-21', 3, 8);
check('repetir el desafío del mismo día no cambia la racha', sameDay.streak, 2);
check(
  'repetir el desafío del mismo día SÍ actualiza el resultado guardado',
  sameDay.history['2026-08-21'],
  { score: 3, total: 8 }
);

const day3 = recordCompletion(day2, '2026-08-22', 8, 8);
check('racha más larga: longestStreak sigue al streak', day3.longestStreak, 3);

const dropAfterLong = recordCompletion(day3, '2026-08-30', 1, 8);
check(
  'longestStreak se conserva aunque la racha actual se corte',
  dropAfterLong.longestStreak,
  3
);
check('pero la racha actual sí se corta', dropAfterLong.streak, 1);

if (failures > 0) {
  console.error(`\n❌ ${failures} fallo(s) en el desafío diario.`);
  process.exit(1);
}
console.log('\n✅ Desafío diario verificado.');
