/**
 * Motor Analyse & Programmierung — 5 generadores portados 1:1 de
 * analyse-programmierung-app.html. Verificados originalmente con 25.000
 * programas ejecutados (brief §4). La respuesta correcta se obtiene
 * EJECUTANDO el programa; los distractores, ejecutándolo con los bugs
 * mentales típicos. meta.code contiene el pseudocódigo a mostrar.
 */
import type { Exercise, GeneratorMap } from './types';
import { ri, pick, shuffle } from './random';

function buildOpts(correct: number, wrongs: number[]): number[] {
  const opts = new Set([correct]);
  for (const w of wrongs) {
    if (opts.size < 4 && w !== correct && Number.isFinite(w) && w >= 0) opts.add(w);
  }
  let guard = 0;
  while (opts.size < 4 && guard++ < 50) {
    opts.add(correct + pick([-2, -1, 1, 2, 3]) * pick([1, 2]));
  }
  return shuffle([...opts].slice(0, 4));
}

interface ProgramData {
  type: string;
  typeLabel: string;
  code: string;
  ans: number;
  options: number[];
  explain: string;
}

function toExercise(p: ProgramData): Exercise {
  return {
    type: p.type,
    typeLabel: p.typeLabel,
    text: '¿Qué imprime PRINT()?',
    options: p.options.map(String),
    correct: String(p.ans),
    explain: p.explain,
    meta: { code: p.code, ans: p.ans },
  };
}

/* 1 · Bucle con MOD (suma o conteo) */
function genModLoop(): Exercise {
  for (let t = 0; t < 40; t++) {
    const lo = ri(1, 5);
    const hi = lo + ri(6, 12);
    const m = pick([2, 3, 4]);
    const mode = pick(['sum', 'count'] as const);
    const run = (hiB: number, inv: boolean): number => {
      let T = 0;
      for (let x = lo; x <= hiB; x++) {
        if (inv ? x % m !== 0 : x % m === 0) T += mode === 'sum' ? x : 1;
      }
      return T;
    };
    const ans = run(hi, false);
    const offByOne = run(hi - 1, false);
    const modInv = run(hi, true);
    if (ans === offByOne && ans === modInv) continue;
    return toExercise({
      type: 'modloop',
      typeLabel: 'Bucle + MOD',
      code: `TOTAL = 0\nFOR X FROM ${lo} TO ${hi}\n  IF X MOD ${m} == 0 THEN\n    TOTAL = TOTAL + ${mode === 'sum' ? 'X' : '1'}\nPRINT(TOTAL)`,
      ans,
      options: buildOpts(ans, [offByOne, modInv]),
      explain: `${mode === 'sum' ? 'Suma' : 'Cuenta'} los X entre ${lo} y ${hi} divisibles por ${m} → ${ans}. Trampas: parar en ${hi - 1} (FROM...TO es inclusivo) daría ${offByOne}; leer MOD al revés daría ${modInv}.`,
    });
  }
  return genNested();
}

/* 2 · FOR anidado con límite interno variable */
function genNested(): Exercise {
  const n = ri(3, 6);
  const mode = pick(['count', 'sumi'] as const);
  const run = (inner: (a: number) => number): number => {
    let K = 0;
    for (let a = 1; a <= n; a++) {
      for (let b = 1; b <= inner(a); b++) {
        K += mode === 'count' ? 1 : a;
      }
    }
    return K;
  };
  const ans = run((a) => a);
  const fixedTrap = run(() => n);
  return toExercise({
    type: 'nested',
    typeLabel: 'FOR anidado variable',
    code: `K = 0\nFOR I FROM 1 TO ${n}\n  FOR J FROM 1 TO I\n    K = K + ${mode === 'count' ? '1' : 'I'}\nPRINT(K)`,
    ans,
    options: buildOpts(ans, [fixedTrap, ans + n, Math.max(1, ans - n)]),
    explain: `El bucle interno corre I veces (varía en cada vuelta): ${[...Array(n)].map((_, i) => (mode === 'count' ? i + 1 : (i + 1) * (i + 1))).join('+')} = ${ans}. Trampa #1 del examen: creer que J siempre llega a ${n} daría ${fixedTrap}.`,
  });
}

/* 3 · Cadena condicional con AND */
function genCond(): Exercise {
  for (let t = 0; t < 40; t++) {
    const X = ri(2, 15);
    const Y = ri(2, 15);
    const Z = ri(2, 15);
    const branch = (c1: boolean, c2: boolean): number =>
      c1 && c2 ? X + Z : c1 ? X - Z : Y * 2;
    const ans = branch(X > Y, Z < Y);
    const swapTrap = branch(!(X > Y), Z < Y);
    const others = [X + Z, X - Z, Y * 2].filter((v) => v !== ans);
    if (ans === swapTrap && others.length < 2) continue;
    return toExercise({
      type: 'cond',
      typeLabel: 'Condicionales AND',
      code: `X = ${X}   Y = ${Y}   Z = ${Z}\nIF X > Y AND Z < Y THEN\n  R = X + Z\nELSE IF X > Y THEN\n  R = X - Z\nELSE\n  R = Y * 2\nPRINT(R)`,
      ans,
      options: buildOpts(ans, [...others, swapTrap]),
      explain: `X>Y es ${X > Y ? 'VERDADERO' : 'FALSO'}${X > Y ? `, Z<Y es ${Z < Y ? 'VERDADERO' : 'FALSO'}` : ''} → rama ${ans === X + Z ? '1 (X+Z)' : ans === X - Z ? '2 (X−Z)' : '3 (Y×2)'} = ${ans}. Los distractores son los valores de las ramas NO tomadas.`,
    });
  }
  return genNested();
}

/* 4 · Secuencia de asignaciones (trazado puro) */
function genAssign(): Exercise {
  for (let t = 0; t < 40; t++) {
    const a0 = ri(2, 9);
    const b0 = ri(2, 9);
    const c0 = ri(2, 9);
    let A = a0;
    let B = b0;
    let C = c0;
    A = B + C;
    B = A - C;
    C = A + B;
    const ans = C;
    const fullStale = a0 + b0; // bug: evaluar C=A+B con los valores INICIALES
    const mixed = b0 + c0 + b0; // bug: A actualizado pero B viejo
    if (ans === fullStale && ans === mixed) continue;
    return toExercise({
      type: 'assign',
      typeLabel: 'Asignaciones en cadena',
      code: `A = ${a0}   B = ${b0}   C = ${c0}\nA = B + C\nB = A - C\nC = A + B\nPRINT(C)`,
      ans,
      options: buildOpts(ans, [fullStale, mixed]),
      explain: `Traza: A=${b0}+${c0}=${b0 + c0} → B=${b0 + c0}−${c0}=${b0} → C=${b0 + c0}+${b0}=${ans}. Cada línea usa los valores YA actualizados. Usar los iniciales daría ${fullStale}.`,
    });
  }
  return genNested();
}

/* 5 · Recursión (factorial o suma) */
function genRec(): Exercise {
  const n = ri(3, 6);
  const kind = pick(['fact', 'sum'] as const);
  const f = (x: number): number => (x <= 1 ? 1 : kind === 'fact' ? x * f(x - 1) : x + f(x - 1));
  const ans = f(n);
  const offTrap = f(n - 1);
  return toExercise({
    type: 'rec',
    typeLabel: 'Recursión',
    code: `FUNCTION F(N):\n  IF N <= 1 THEN RETURN 1\n  RETURN N ${kind === 'fact' ? '*' : '+'} F(N - 1)\n\nPRINT(F(${n}))`,
    ans,
    options: buildOpts(ans, [offTrap, kind === 'fact' ? (ans / n) * (n - 1) : ans - 1, ans + n]),
    explain: `Pila de llamadas: F(${n})${kind === 'fact' ? '×' : '+'}F(${n - 1})… hasta F(1)=1 → ${[...Array(n)].map((_, i) => n - i).join(kind === 'fact' ? '×' : '+')} = ${ans}. Trampa: descontar un nivel de recursión daría ${offTrap}.`,
  });
}

export const ANALYSE_GENERATORS: GeneratorMap = {
  modloop: { fn: genModLoop, label: 'Bucle + MOD' },
  nested: { fn: genNested, label: 'FOR anidado variable' },
  cond: { fn: genCond, label: 'Condicionales AND' },
  assign: { fn: genAssign, label: 'Asignaciones en cadena' },
  rec: { fn: genRec, label: 'Recursión' },
};
