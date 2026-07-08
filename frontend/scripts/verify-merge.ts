/**
 * Verificación de mergeProgress (fusión local↔remoto).
 * Casos representativos de las claves reales de las 6 apps (brief §3.2).
 */
import { mergeProgress } from '../src/utils/merge-progress';

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

// best: gana el récord más alto
check(
  'best se queda con el máximo',
  mergeProgress({ best: 7 }, { best: 9 }),
  { best: 9 }
);

// memBest en cualquiera de los dos lados
check(
  'memBest presente solo en remoto',
  mergeProgress({ best: 5 }, { best: 3, memBest: 4 }),
  { best: 5, memBest: 4 }
);

// mastered: unión
check(
  'mastered es la unión',
  mergeProgress({ mastered: { 0: true, 2: true } }, { mastered: { 1: true } }),
  { mastered: { 1: true, 0: true, 2: true } }
);

// stats: por tipo gana el que tiene más intentos
check(
  'stats por tipo gana el total mayor',
  mergeProgress(
    { stats: { percent: { ok: 8, total: 10 }, data: { ok: 1, total: 2 } } },
    { stats: { percent: { ok: 3, total: 4 }, vector: { ok: 5, total: 6 } } }
  ),
  {
    stats: {
      percent: { ok: 8, total: 10 },
      data: { ok: 1, total: 2 },
      vector: { ok: 5, total: 6 },
    },
  }
);

// null en un lado: se conserva el otro
check('local null → remoto', mergeProgress(null, { best: 2 }), { best: 2 });
check('remoto null → local', mergeProgress({ best: 2 }, null), { best: 2 });
check('ambos null → null', mergeProgress(null, null), null);

// checklist (vernetztes-denken): unión
check(
  'checklist es la unión',
  mergeProgress(
    { mastered: {}, checklist: { a: true } },
    { mastered: {}, checklist: { b: true } }
  ),
  { mastered: {}, checklist: { b: true, a: true } }
);

// forma real konzentration {stats, best, memBest}
check(
  'clave konzentration completa',
  mergeProgress(
    { stats: { vector: { ok: 2, total: 3 } }, best: 6, memBest: 2 },
    { stats: { vector: { ok: 9, total: 12 } }, best: 4, memBest: 5 }
  ),
  { stats: { vector: { ok: 9, total: 12 } }, best: 6, memBest: 5 }
);

if (failures > 0) {
  console.error(`\n✗ ${failures} fallos en mergeProgress.`);
  process.exit(1);
}
console.log('\n✅ mergeProgress verificado.');
