/**
 * Motor Zahlenreihen — 9 familias portadas 1:1 de zahlenreihen-app.html.
 * Verificadas originalmente con 27.000 series recalculadas por derivación
 * independiente (brief §4). meta.terms/meta.diffs alimentan la revelación
 * visual de estructura.
 */
import type { Exercise, GeneratorMap } from './types';
import { ri, pick, shuffle } from './random';

const fmtD = (d: number): string => (d >= 0 ? `+${d}` : `−${-d}`);

function buildOptions(correct: number, wrongs: number[]): number[] {
  const opts = new Set([correct]);
  for (const w of wrongs) {
    if (opts.size < 4 && w !== correct && Number.isFinite(w)) opts.add(w);
  }
  let guard = 0;
  while (opts.size < 4 && guard++ < 50) {
    opts.add(correct + pick([-3, -2, 2, 3, 4]) * pick([1, 1, 2]));
  }
  return shuffle([...opts].slice(0, 4));
}

interface SeriesData {
  type: string;
  typeLabel: string;
  terms: number[];
  ans: number;
  options: number[];
  diffs: string[];
  explain: string;
}

function toExercise(s: SeriesData): Exercise {
  return {
    type: s.type,
    typeLabel: s.typeLabel,
    text: '¿Qué número continúa la serie?',
    context: `${s.terms.join(', ')}, ?`,
    options: s.options.map(String),
    correct: String(s.ans),
    explain: s.explain,
    meta: { terms: s.terms, diffs: s.diffs, ans: s.ans },
  };
}

function genArith(): Exercise {
  const d = pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12, -2, -3, -4, -5]);
  const a = d < 0 ? ri(30, 60) : ri(2, 30);
  const t = [...Array(5)].map((_, k) => a + k * d);
  const ans = a + 5 * d;
  return toExercise({
    type: 'arith', typeLabel: 'Aritmética', terms: t, ans,
    options: buildOptions(ans, [ans + d, ans - d, t[4]]),
    diffs: t.slice(1).map((v, i) => fmtD(v - t[i])),
    explain: `Diferencia constante de ${fmtD(d)}. Siguiente: ${t[4]} ${fmtD(d)} = ${ans}.`,
  });
}

function genGeom(): Exercise {
  const r = pick([2, 3]);
  const a = pick([1, 2, 3, 4, 5]);
  const t = [...Array(5)].map((_, k) => a * Math.pow(r, k));
  const ans = a * Math.pow(r, 5);
  const arithTrap = t[4] + (t[4] - t[3]);
  return toExercise({
    type: 'geom', typeLabel: 'Geométrica ×', terms: t, ans,
    options: buildOptions(ans, [arithTrap, ans - r, t[4] * r + r]),
    diffs: t.slice(1).map(() => '×' + r),
    explain: `Cociente constante ×${r}. Siguiente: ${t[4]}×${r} = ${ans}. Trampa: tratarla como suma daría ${arithTrap}.`,
  });
}

function genGeomDiv(): Exercise {
  const a = pick([320, 384, 448, 512, 640]);
  const t = [...Array(5)].map((_, k) => a / Math.pow(2, k));
  const ans = a / 32;
  return toExercise({
    type: 'geomdiv', typeLabel: 'Geométrica ÷', terms: t, ans,
    options: buildOptions(ans, [t[4] - (t[3] - t[4]), ans * 2, ans - 2]),
    diffs: t.slice(1).map(() => '÷2'),
    explain: `Cada término es la mitad del anterior. Siguiente: ${t[4]}÷2 = ${ans}.`,
  });
}

function genGrowDiff(): Exercise {
  const d0 = ri(1, 5);
  const inc = pick([1, 2, 3]);
  const a = ri(1, 15);
  const t = [a];
  for (let k = 0; k < 4; k++) t.push(t[t.length - 1] + d0 + k * inc);
  const ans = t[4] + d0 + 4 * inc;
  const lazyTrap = t[4] + d0 + 3 * inc; // repetir la última diferencia sin crecer
  return toExercise({
    type: 'growdiff', typeLabel: 'Dif. creciente', terms: t, ans,
    options: buildOptions(ans, [lazyTrap, ans + inc, ans - 1]),
    diffs: t.slice(1).map((v, i) => fmtD(v - t[i])),
    explain: `Las diferencias crecen de ${inc} en ${inc}: ${t.slice(1).map((v, i) => fmtD(v - t[i])).join(', ')} → la siguiente es ${fmtD(d0 + 4 * inc)}. Trampa: repetir la última diferencia daría ${lazyTrap}.`,
  });
}

function genAltern(): Exercise {
  const p = ri(5, 12);
  const q = ri(1, p - 2);
  const a = ri(5, 20);
  const t = [a];
  for (let k = 0; k < 5; k++) t.push(t[t.length - 1] + (k % 2 === 0 ? p : -q));
  const ans = t[5] - q; // el 7º término aplica −q (índice 5, impar) — brief §4
  const wrongOp = t[5] + p;
  return toExercise({
    type: 'altern', typeLabel: 'Zigzag', terms: t, ans,
    options: buildOptions(ans, [wrongOp, t[5] - p, t[5] + q]),
    diffs: t.slice(1).map((v, i) => fmtD(v - t[i])),
    explain: `Zigzag +${p}/−${q} alternante. El siguiente paso es −${q}: ${t[5]}−${q} = ${ans}. Trampa: aplicar +${p} daría ${wrongOp}.`,
  });
}

function genFib(): Exercise {
  const a = ri(1, 5);
  const b = ri(a, 8);
  const t = [a, b];
  for (let k = 0; k < 4; k++) t.push(t[t.length - 1] + t[t.length - 2]);
  const ans = t[5] + t[4];
  return toExercise({
    type: 'fib', typeLabel: 'Fibonacci', terms: t, ans,
    options: buildOptions(ans, [t[5] * 2, t[5] + t[3], ans + 1]),
    diffs: t.slice(1).map((v, i) => fmtD(v - t[i])),
    explain: `Cada término = suma de los dos anteriores. Siguiente: ${t[4]}+${t[5]} = ${ans}. Pista: las diferencias reproducen la propia serie.`,
  });
}

function genInterleaved(): Exercise {
  const a1 = ri(2, 20);
  const dA = pick([3, 4, 5, 6, 7]);
  let b1 = ri(2, 20);
  if (b1 === a1) b1++;
  let dB = pick([2, 3, 4, 5, 8]);
  if (dB === dA) dB = dA + 1;
  const t = [a1, b1, a1 + dA, b1 + dB, a1 + 2 * dA, b1 + 2 * dB];
  const ans = a1 + 3 * dA;
  const wrongSeries = b1 + 3 * dB;
  return toExercise({
    type: 'interleaved', typeLabel: 'Entrelazada', terms: t, ans,
    options: buildOptions(ans, [wrongSeries, t[5] + (t[5] - t[4]), ans + dA]),
    diffs: t.slice(1).map((v, i) => fmtD(v - t[i])),
    explain: `Dos series entrelazadas — impares: ${a1}, ${a1 + dA}, ${a1 + 2 * dA} (+${dA}) · pares: ${b1}, ${b1 + dB}, ${b1 + 2 * dB} (+${dB}). La posición 7 pertenece a la serie impar: ${a1 + 2 * dA}+${dA} = ${ans}. Trampa: continuar la serie equivocada daría ${wrongSeries}.`,
  });
}

function genSquare(): Exercise {
  const n0 = ri(1, 5);
  const k = pick([0, 0, 1, 2, 3]);
  const t = [...Array(5)].map((_, j) => (n0 + j) * (n0 + j) + k);
  const ans = (n0 + 5) * (n0 + 5) + k;
  const lazyTrap = t[4] + (t[4] - t[3]);
  return toExercise({
    type: 'square', typeLabel: 'Cuadrados', terms: t, ans,
    options: buildOptions(ans, [lazyTrap, ans - 1, ans + 2]),
    diffs: t.slice(1).map((v, i) => fmtD(v - t[i])),
    explain: `Cuadrados${k > 0 ? ` +${k}` : ''}: ${t.map((_, j) => `${n0 + j}²${k > 0 ? `+${k}` : ''}`).join(', ')}. Siguiente: ${n0 + 5}²${k > 0 ? `+${k}` : ''} = ${ans}. Las diferencias son impares consecutivos — la firma de los cuadrados.`,
  });
}

function genMultAdd(): Exercise {
  const c = pick([1, 2, 3, -1]);
  const a = ri(1, 5);
  const t = [a];
  for (let k = 0; k < 4; k++) t.push(t[t.length - 1] * 2 + c);
  const ans = t[4] * 2 + c;
  const noC = t[4] * 2;
  return toExercise({
    type: 'multadd', typeLabel: '×2 + c', terms: t, ans,
    options: buildOptions(ans, [noC, t[4] + (t[4] - t[3]), ans + c]),
    diffs: t.slice(1).map(() => (c >= 0 ? `×2+${c}` : `×2−${-c}`)),
    explain: `Regla: doble ${c >= 0 ? `más ${c}` : `menos ${-c}`}. Siguiente: ${t[4]}×2${c >= 0 ? `+${c}` : `−${-c}`} = ${ans}. Trampa: olvidar la constante daría ${noC}.`,
  });
}

export const ZAHLENREIHEN_GENERATORS: GeneratorMap = {
  arith: { fn: genArith, label: 'Aritmética' },
  geom: { fn: genGeom, label: 'Geométrica ×' },
  geomdiv: { fn: genGeomDiv, label: 'Geométrica ÷' },
  growdiff: { fn: genGrowDiff, label: 'Dif. creciente' },
  square: { fn: genSquare, label: 'Cuadrados' },
  altern: { fn: genAltern, label: 'Zigzag' },
  fib: { fn: genFib, label: 'Fibonacci' },
  multadd: { fn: genMultAdd, label: '×2 + c' },
  interleaved: { fn: genInterleaved, label: 'Entrelazada' },
};
