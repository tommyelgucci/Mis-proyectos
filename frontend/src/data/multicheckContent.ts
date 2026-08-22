import type { Exercise } from '../engines/types';

/**
 * BrainBit learning pack adapted from the supplied MultiCheck Quest archive.
 * The source archive is Flutter; this file deliberately ports only original,
 * generic learning patterns and content into BrainBit's Exercise contract.
 * Existing generators remain untouched.
 */
export type LearningPack = 'language' | 'math' | 'logic' | 'memory' | 'visual';

export interface LessonCard {
  id: string;
  pack: LearningPack;
  title: string;
  concept: string;
  workedExample: string;
  commonMistake: string;
  exercise: Exercise;
}

const makeExercise = (
  type: string,
  typeLabel: string,
  text: string,
  options: string[],
  correct: string,
  explain: string,
): Exercise => ({ type, typeLabel, text, options, correct, explain });

export const multiCheckLessonCards: LessonCard[] = [
  {
    id: 'mc-language-precision',
    pack: 'language',
    title: 'Precisión en una frase',
    concept: 'Una respuesta clara nombra la acción, evita palabras vagas y conserva la información útil.',
    workedExample: 'Vago: «Haz eso después». Preciso: «Envía el informe antes de las 16:00».',
    commonMistake: 'Confundir una frase larga con una frase precisa.',
    exercise: makeExercise('mc_language_precision', 'Comunicación precisa', '¿Qué instrucción es la más clara?', ['Hazlo cuando puedas.', 'Revisa el archivo y corrige los tres errores marcados.', 'Mira eso después.', 'Intenta arreglarlo de alguna forma.'], 'Revisa el archivo y corrige los tres errores marcados.', 'Indica una acción concreta y el alcance exacto de la tarea.'),
  },
  {
    id: 'mc-language-sequence',
    pack: 'language',
    title: 'Construir una respuesta útil',
    concept: 'Una buena respuesta de soporte suele reconocer el problema, pedir un dato relevante y proponer un siguiente paso.',
    workedExample: '«Entiendo el problema. ¿Qué versión usas? Reinicia la aplicación y dime si vuelve a ocurrir».',
    commonMistake: 'Dar una solución antes de entender el problema.',
    exercise: makeExercise('mc_language_sequence', 'Orden lógico', '¿Qué frase debería ir primero en una respuesta de soporte?', ['Prueba a reiniciar y avísame.', 'Entiendo que la aplicación se cierra inesperadamente.', 'Envíanos el código de error.', '¿Qué versión estás usando?'], 'Entiendo que la aplicación se cierra inesperadamente.', 'Primero conviene reconocer el problema antes de pedir detalles o dar pasos.'),
  },
  {
    id: 'mc-math-percent',
    pack: 'math',
    title: 'Porcentajes sin calculadora',
    concept: 'Divide el porcentaje en partes fáciles: 10 %, 5 %, 1 % o combina varias.',
    workedExample: '15 % de 200 = 10 % (20) + 5 % (10) = 30.',
    commonMistake: 'Calcular 15 % como 0,15 + 200 en vez de multiplicar.',
    exercise: makeExercise('mc_math_percent', 'Porcentajes', '¿Cuánto es el 15 % de 240?', ['24', '30', '36', '48'], '36', '10 % de 240 es 24 y 5 % es 12; juntos son 36.'),
  },
  {
    id: 'mc-math-equation',
    pack: 'math',
    title: 'Ecuaciones de un paso',
    concept: 'Deshaz la operación que acompaña a x usando la operación inversa.',
    workedExample: '4x + 6 = 26 → 4x = 20 → x = 5.',
    commonMistake: 'Restar o dividir sólo un lado de la igualdad.',
    exercise: makeExercise('mc_math_equation', 'Álgebra básica', 'Resuelve: 5x + 10 = 35', ['4', '5', '7', '9'], '5', 'Resta 10 en ambos lados: 5x = 25. Después divide entre 5.'),
  },
  {
    id: 'mc-logic-analogy',
    pack: 'logic',
    title: 'Analogías por relación',
    concept: 'Busca la relación exacta entre el primer par y aplícala al segundo.',
    workedExample: 'TECLADO : ESCRIBIR :: PINCEL : PINTAR.',
    commonMistake: 'Elegir una palabra relacionada pero con una relación distinta.',
    exercise: makeExercise('mc_logic_analogy', 'Analogías', 'SCHERE se relaciona con SCHNEIDEN como TASTATUR se relaciona con…', ['lesen', 'schreiben', 'speichern', 'drucken'], 'schreiben', 'La relación es herramienta → acción principal: unas tijeras sirven para cortar y un teclado para escribir.'),
  },
  {
    id: 'mc-logic-sequence',
    pack: 'logic',
    title: 'Series numéricas',
    concept: 'Comprueba diferencias, multiplicaciones, alternancias y ciclos antes de elegir una regla.',
    workedExample: '3, 6, 12, 24 → cada término se multiplica por 2.',
    commonMistake: 'Forzar una regla complicada cuando una operación simple explica todos los pasos.',
    exercise: makeExercise('mc_logic_sequence', 'Series', '¿Qué número sigue? 2, 5, 10, 17, 26, …', ['35', '36', '37', '38'], '37', 'Las diferencias son +3, +5, +7, +9; la siguiente es +11.'),
  },
  {
    id: 'mc-memory-position',
    pack: 'memory',
    title: 'Memoria de posiciones',
    concept: 'Agrupa la información en patrones y repite relaciones espaciales, no elementos aislados.',
    workedExample: 'Para una cuadrícula, recuerda «arriba-centro, abajo-izquierda» como una ruta.',
    commonMistake: 'Intentar memorizar todos los detalles con la misma prioridad.',
    exercise: makeExercise('mc_memory_position', 'Memoria de trabajo', 'Memoriza mentalmente: ▲ ● ■. Sin volver a leer, ¿qué símbolo estaba en el centro?', ['▲', '●', '■', '◆'], '●', 'El ejercicio entrena el recuerdo de posición en una secuencia corta.'),
  },
  {
    id: 'mc-visual-transform',
    pack: 'visual',
    title: 'Transformaciones visuales',
    concept: 'Separa los cambios: forma, orientación y color. Luego transfiere cada cambio de forma independiente.',
    workedExample: 'Si un triángulo gira 90° y cambia a azul, busca una opción con ambos cambios.',
    commonMistake: 'Aplicar sólo el cambio más llamativo y olvidar la orientación.',
    exercise: makeExercise('mc_visual_transform', 'Transformación', 'Una figura cambia de círculo rojo a cuadrado azul. ¿Qué regla describe mejor el cambio?', ['Sólo cambia el color.', 'Sólo cambia la forma.', 'Cambian forma y color.', 'La figura se invierte.'], 'Cambian forma y color.', 'La regla combina dos transformaciones independientes.'),
  },
];

export function getMultiCheckExercises(pack?: LearningPack): Exercise[] {
  return multiCheckLessonCards
    .filter((card) => !pack || card.pack === pack)
    .map((card) => card.exercise);
}

export function getMultiCheckDailyChallenge(date = new Date()): Exercise[] {
  const key = date.toISOString().slice(0, 10);
  let seed = 0;
  for (const char of key) seed = (seed * 31 + char.charCodeAt(0)) >>> 0;
  const cards = [...multiCheckLessonCards];
  for (let i = cards.length - 1; i > 0; i -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards.slice(0, 5).map((card) => card.exercise);
}
