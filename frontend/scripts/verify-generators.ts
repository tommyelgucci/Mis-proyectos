/**
 * Verificación de generadores (protocolo brief §6):
 * - N casos aleatorios por tipo.
 * - La respuesta se RECALCULA por derivación independiente (los verificadores
 *   viven en src/engines/verifiers.ts, compartidos con la generación IA).
 *
 * Ejecutar: npm run verify   (usa tsx)
 */
import type { Exercise } from '../src/engines/types';
import { verifyExercise } from '../src/engines/verifiers';
import { MATHEMATIK_GENERATORS } from '../src/engines/mathematik';
import { ZAHLENREIHEN_GENERATORS } from '../src/engines/zahlenreihen';
import { KONZENTRATION_GENERATORS } from '../src/engines/konzentration';
import { ANALYSE_GENERATORS } from '../src/engines/analyse';

const N = Number(process.env.VERIFY_N ?? 1000);
let failures = 0;

function fail(engine: string, type: string, msg: string, ex: Exercise): void {
  failures++;
  console.error(`✗ [${engine}/${type}] ${msg}`);
  console.error(`  text: ${ex.text}`);
  if (ex.context) console.error(`  context: ${ex.context}`);
  console.error(`  options: ${JSON.stringify(ex.options)} correct: ${ex.correct}`);
}

const suites = [
  { engine: 'mathematik', generators: MATHEMATIK_GENERATORS },
  { engine: 'zahlenreihen', generators: ZAHLENREIHEN_GENERATORS },
  { engine: 'konzentration', generators: KONZENTRATION_GENERATORS },
  { engine: 'analyse', generators: ANALYSE_GENERATORS },
];

for (const suite of suites) {
  for (const [typeKey, gen] of Object.entries(suite.generators)) {
    let ok = 0;
    for (let i = 0; i < N; i++) {
      const ex = gen.fn();
      // los generadores tienen fallback a otro tipo en casos degenerados:
      // verifyExercise verifica según el tipo REAL devuelto
      const err = verifyExercise(ex);
      if (err) fail(suite.engine, ex.type, err, ex);
      else ok++;
      if (failures > 20) {
        console.error('\nDemasiados fallos, abortando.');
        process.exit(1);
      }
    }
    console.log(`✓ ${suite.engine}/${typeKey}: ${ok}/${N} verificados`);
  }
}

if (failures > 0) {
  console.error(`\n✗ ${failures} fallos de verificación.`);
  process.exit(1);
}
console.log(`\n✅ Todos los generadores verificados (${N} casos/tipo, derivación independiente).`);
