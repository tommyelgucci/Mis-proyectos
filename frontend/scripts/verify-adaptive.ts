/**
 * Verificación del modo adaptativo de Sprint IA (§7): el peso por precisión
 * (lib/progress-stats.ts) y el sorteo ponderado que lo consume (engines/random.ts).
 */
import { adaptiveWeight } from '../src/lib/progress-stats';
import { pickWeighted } from '../src/engines/random';

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

/* ---------- adaptiveWeight ---------- */

check('sin intentos (accuracy null) → peso neutro', adaptiveWeight(null, false), 1);
check('con pocos intentos (fewData) → peso neutro aunque el % sea bajo', adaptiveWeight(10, true), 1);
check('100% de precisión → peso mínimo (0.5), nunca 0', adaptiveWeight(100, false), 0.5);
check('0% de precisión → peso máximo (4)', adaptiveWeight(0, false), 4);
ok(
  'peso baja monótonamente al subir la precisión',
  adaptiveWeight(20, false) > adaptiveWeight(50, false) &&
    adaptiveWeight(50, false) > adaptiveWeight(80, false)
);
ok('el peso nunca es negativo ni cero', adaptiveWeight(100, false) > 0 && adaptiveWeight(0, false) > 0);

/* ---------- pickWeighted ---------- */

check('un solo elemento siempre sale', pickWeighted(['x'], [1]), 'x');
check('total de pesos 0 no rompe (cae a uniforme)', ['a', 'b'].includes(pickWeighted(['a', 'b'], [0, 0])), true);

// Distribución: con pesos muy desparejos, el más pesado debe salir bastante
// más seguido. Con 4000 tiradas y una diferencia de peso de 10x, el margen de
// tolerancia (30–70% mínimo esperado) es generoso para no ser un test frágil.
const N = 4000;
let heavyCount = 0;
for (let i = 0; i < N; i++) {
  if (pickWeighted(['heavy', 'light'], [9, 1]) === 'heavy') heavyCount++;
}
const heavyRatio = heavyCount / N;
ok(
  `con pesos 9:1, el pesado sale la mayoría de las veces (observado ${(heavyRatio * 100).toFixed(1)}%, esperado ~90%)`,
  heavyRatio > 0.8 && heavyRatio < 0.98
);

// Peso 0 en un elemento: nunca debería salir, sin importar cuántas tiradas.
let zeroWeightPicked = false;
for (let i = 0; i < 500; i++) {
  if (pickWeighted(['never', 'always'], [0, 1]) === 'never') zeroWeightPicked = true;
}
ok('un elemento con peso 0 nunca sale (mientras haya otro con peso > 0)', !zeroWeightPicked);

if (failures > 0) {
  console.error(`\n❌ ${failures} fallo(s) en el modo adaptativo.`);
  process.exit(1);
}
console.log('\n✅ Modo adaptativo verificado.');
