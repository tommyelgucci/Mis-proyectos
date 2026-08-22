/**
 * Verificación del cuaderno de errores (Fase 7).
 *
 * El algoritmo de deduplicación real vive duplicado en vanilla JS dentro de
 * cada app HTML (window.reportMistake/resolveMistake) porque esas apps no
 * pueden importar este módulo — acá solo se verifica el lado que sí es TS:
 * el parseo defensivo y las utilidades de lectura que consume la UI.
 */
import {
  MAX_MISTAKES,
  isMistakeEntry,
  makeMistakeId,
  mistakesByCategory,
  parseMistakes,
  removeMistake,
  type MistakeEntry,
} from '../src/lib/error-notebook';

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

function makeEntry(over: Partial<MistakeEntry> = {}): MistakeEntry {
  return {
    id: makeMistakeId('mathematik', 'percent', '¿Cuánto es el 20% de 150?'),
    categoryId: 'mathematik',
    categoryTitle: 'Mathematik',
    type: 'percent',
    typeLabel: 'Porcentajes',
    context: '',
    text: '¿Cuánto es el 20% de 150?',
    correct: '30',
    chosen: '20',
    explain: '20% de 150 es 30.',
    timestamp: 1000,
    seenCount: 1,
    ...over,
  };
}

/* ---------- makeMistakeId: debe coincidir con el shim de las apps HTML ---------- */

check(
  'id determinista: mismos datos, mismo id',
  makeMistakeId('logik', 'analogy', 'Perro es a cachorro como gato es a ___'),
  makeMistakeId('logik', 'analogy', 'Perro es a cachorro como gato es a ___')
);
ok(
  'id distinto entre categorías con el mismo texto',
  makeMistakeId('logik', 'analogy', 'X') !== makeMistakeId('mathematik', 'analogy', 'X')
);
ok(
  'id se trunca a 80 chars de texto (evita ids gigantes con preguntas largas)',
  makeMistakeId('redaccion', 'estructura', 'a'.repeat(500)).length <
    'redaccion::estructura::'.length + 90
);

/* ---------- isMistakeEntry / parseMistakes: robustez ante localStorage corrupto ---------- */

ok('entrada válida se reconoce', isMistakeEntry(makeEntry()));
ok('null no es una entrada', !isMistakeEntry(null));
ok('string suelta no es una entrada', !isMistakeEntry('basura'));
ok('falta correct → no es una entrada', !isMistakeEntry({ ...makeEntry(), correct: undefined }));
ok('timestamp no numérico → no es una entrada', !isMistakeEntry({ ...makeEntry(), timestamp: 'ayer' }));

check('parseMistakes con null no rompe', parseMistakes(null), []);
check('parseMistakes con string no rompe', parseMistakes('no es un array'), []);
check(
  'parseMistakes descarta entradas malformadas y conserva las válidas',
  parseMistakes([makeEntry({ id: 'a' }), { basura: true }, null, makeEntry({ id: 'b' })]).map((m) => m.id),
  ['a', 'b']
);

/* ---------- removeMistake ---------- */

const list = [makeEntry({ id: 'a' }), makeEntry({ id: 'b' }), makeEntry({ id: 'c' })];
check('removeMistake saca solo la entrada pedida', removeMistake(list, 'b').map((m) => m.id), ['a', 'c']);
check('removeMistake con id inexistente no cambia nada', removeMistake(list, 'z').length, 3);

/* ---------- mistakesByCategory: agrupación para la UI ---------- */

const mixed = [
  makeEntry({ id: 'm1', categoryId: 'mathematik' }),
  makeEntry({ id: 'l1', categoryId: 'logik' }),
  makeEntry({ id: 'm2', categoryId: 'mathematik' }),
];
const grouped = mistakesByCategory(mixed);
check('agrupa por categoría: cuántos grupos', grouped.size, 2);
check(
  'agrupa por categoría: mathematik tiene 2',
  grouped.get('mathematik')?.map((m) => m.id),
  ['m1', 'm2']
);
check('agrupa por categoría: logik tiene 1', grouped.get('logik')?.length, 1);

/* ---------- coherencia con el límite que también respeta el shim JS ---------- */

ok('MAX_MISTAKES es razonable (>0 y acotado)', MAX_MISTAKES > 0 && MAX_MISTAKES <= 500);

if (failures > 0) {
  console.error(`\n❌ ${failures} fallo(s) en el cuaderno de errores.`);
  process.exit(1);
}
console.log('\n✅ Cuaderno de errores verificado.');
