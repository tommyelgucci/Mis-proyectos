/**
 * Verificación del Simulacro de examen (Fase 7): armado del resultado final
 * y la lista de revisión.
 */
import { buildExamResult, type ExamAnswer } from '../src/lib/exam';
import type { Exercise } from '../src/engines/types';

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

function ex(over: Partial<Exercise> = {}): Exercise {
  return {
    type: 'percent',
    typeLabel: 'Porcentajes',
    text: '¿Cuánto es el 20% de 150?',
    options: ['20', '30', '40', '50'],
    correct: '30',
    explain: '20% de 150 es 30.',
    ...over,
  };
}

function answer(over: Partial<ExamAnswer> = {}): ExamAnswer {
  return { exercise: ex(), selected: '30', correct: true, ...over };
}

/* ---------- buildExamResult ---------- */

check('sin respuestas: total 0 y accuracy null (no 0%)', buildExamResult([]), {
  total: 0,
  correct: 0,
  accuracy: null,
  review: [],
});

const allRight = [answer(), answer(), answer()];
check('todo bien: 100%, sin revisión', buildExamResult(allRight), {
  total: 3,
  correct: 3,
  accuracy: 100,
  review: [],
});

const mixed = [
  answer({ correct: true }),
  answer({ correct: false, selected: '20' }),
  answer({ correct: true }),
  answer({ correct: false, selected: '40' }),
];
const mixedResult = buildExamResult(mixed);
check('mixto: cuenta total y correctas', { total: mixedResult.total, correct: mixedResult.correct }, { total: 4, correct: 2 });
check('mixto: precisión redondeada', mixedResult.accuracy, 50);
check('mixto: la revisión trae solo las falladas', mixedResult.review.length, 2);
ok('mixto: la revisión conserva el orden en que se respondieron', mixedResult.review[0].selected === '20' && mixedResult.review[1].selected === '40');
ok('mixto: cada entrada de revisión trae el ejercicio completo (para mostrar explain)', mixedResult.review.every((r) => typeof r.exercise.explain === 'string'));

const allWrong = [answer({ correct: false }), answer({ correct: false })];
check('todo mal: 0%, revisión con todo', buildExamResult(allWrong).accuracy, 0);
check('todo mal: revisión trae las 2', buildExamResult(allWrong).review.length, 2);

if (failures > 0) {
  console.error(`\n❌ ${failures} fallo(s) en el simulacro de examen.`);
  process.exit(1);
}
console.log('\n✅ Simulacro de examen verificado.');
