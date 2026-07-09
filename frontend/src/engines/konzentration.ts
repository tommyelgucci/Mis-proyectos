/**
 * Motor Konzentration & Merkfähigkeit — 4 generadores portados 1:1 de
 * konzentration-merkfaehigkeit-app.html. Coordenadas verificadas con
 * 10.000 casos (brief §4). meta.html/meta.grid alimentan el render visual
 * (filas de bloques y tablero A-J × 1-10).
 */
import type { Exercise, GeneratorMap } from './types';
import { ri, pick, shuffle } from './random';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const cellName = (c: number, r: number): string => COLS[c - 1] + r;

const CHARS_L = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // sin I ni O (se confunden con 1 y 0)
const CHARS_D = '0123456789';

function randBlock(len: number): string {
  let s = '';
  const mode = ri(0, 2); // 0 letras, 1 dígitos, 2 mixto
  for (let i = 0; i < len; i++) {
    if (mode === 0) s += CHARS_L[ri(0, CHARS_L.length - 1)];
    else if (mode === 1) s += CHARS_D[ri(0, 9)];
    else s += i < 2 ? CHARS_L[ri(0, CHARS_L.length - 1)] : CHARS_D[ri(0, 9)];
  }
  return s;
}

// Mutación sutil: cambia un carácter por otro visualmente parecido si es posible
const CONFUSABLE: Record<string, string> = {
  M: 'N', N: 'M', B: 'R', R: 'B', E: 'F', F: 'E', C: 'G', G: 'C',
  U: 'V', V: 'U', K: 'X', X: 'K',
  '1': '7', '7': '1', '3': '8', '8': '3', '5': '6', '6': '5',
  '0': '9', '9': '0', '2': '7', '4': '9',
};

function mutate(block: string): { mutated: string; idx: number; from: string; to: string } {
  const idx = ri(0, block.length - 1);
  const ch = block[idx];
  const nu =
    CONFUSABLE[ch] ||
    (CHARS_D.includes(ch)
      ? CHARS_D[(CHARS_D.indexOf(ch) + ri(1, 8)) % 10]
      : CHARS_L[(CHARS_L.indexOf(ch) + ri(1, 20)) % CHARS_L.length]);
  return { mutated: block.slice(0, idx) + nu + block.slice(idx + 1), idx, from: ch, to: nu };
}

function makeCode(nBlocks: number): string[] {
  const blocks: string[] = [];
  for (let i = 0; i < nBlocks; i++) blocks.push(randBlock(pick([2, 4, 4, 4])));
  return blocks;
}

function renderCode(label: string, blocks: string[], hlBlock = -1, showIdx = false): string {
  let html = `<div class="compare-row"><span class="rlabel">${label}</span>`;
  blocks.forEach((b, i) => {
    html += `<span class="blk ${i === hlBlock ? 'hl' : ''}">${b}${showIdx ? `<span class="blk-idx">${i + 1}</span>` : ''}</span>`;
    if (i < blocks.length - 1) html += `<span class="blk sep">-</span>`;
  });
  return html + `</div>`;
}

export interface GridMeta {
  marks: { a?: { col: number; row: number }; b?: { col: number; row: number } };
  sol: { col: number; row: number } | null;
}

/* --- Tipo 1: ¿qué bloque difiere? --- */
function genBlockDiff(): Exercise {
  const n = pick([5, 6, 7]);
  const a = makeCode(n);
  const target = ri(0, n - 1);
  const b = [...a];
  const m = mutate(a[target]);
  b[target] = m.mutated;
  const opts = new Set([target + 1]);
  while (opts.size < 4) opts.add(ri(1, n));
  return {
    type: 'blockdiff',
    typeLabel: '¿Qué bloque difiere?',
    text: 'Las dos filas difieren en exactamente un carácter. ¿En qué BLOQUE está?',
    options: shuffle([...opts]).map((x) => `Bloque ${x}`),
    correct: `Bloque ${target + 1}`,
    explain: `Bloque ${target + 1}: «${a[target]}» vs «${b[target]}» (el carácter ${m.idx + 1} cambió de ${m.from} a ${m.to}).`,
    meta: {
      html: `<div class="compare-wrap">${renderCode('Fila A', a, -1, true)}${renderCode('Fila B', b, -1, true)}</div>`,
      grid: null,
    },
  };
}

/* --- Tipo 2: ¿idénticas o diferentes? (velocidad pura) --- */
function genSameDiff(): Exercise {
  const n = pick([5, 6, 7]);
  const a = makeCode(n);
  const differ = Math.random() < 0.5;
  const b = [...a];
  let detail = 'Las dos filas son idénticas, carácter por carácter.';
  if (differ) {
    const t = ri(0, n - 1);
    const m = mutate(a[t]);
    b[t] = m.mutated;
    detail = `Difieren en el bloque ${t + 1}: «${a[t]}» vs «${b[t]}».`;
  }
  return {
    type: 'samediff',
    typeLabel: '¿Idénticas o no?',
    text: 'Decide lo más rápido posible:',
    options: ['IDÉNTICAS', 'DIFERENTES'],
    correct: differ ? 'DIFERENTES' : 'IDÉNTICAS',
    explain: detail,
    meta: {
      html: `<div class="compare-wrap">${renderCode('Fila A', a)}${renderCode('Fila B', b)}</div>`,
      grid: null,
    },
  };
}

/* --- Tipo 3: vector sobre el tablero --- */
function genVector(): Exercise {
  const c = ri(3, 8);
  const r = ri(3, 8);
  let dc = 0;
  let dr = 0;
  while (dc === 0 && dr === 0) {
    dc = ri(-2, 2);
    dr = ri(-2, 2);
  }
  const nc = c + dc;
  const nr = r + dr;
  const correct = cellName(nc, nr);
  // distractores = errores reales: invertir signo de fila, intercambiar ejes
  const opts = new Set([correct]);
  const inv = cellName(nc, Math.min(10, Math.max(1, r - dr)));
  opts.add(inv);
  const swapC = Math.min(10, Math.max(1, c + dr));
  const swapR = Math.min(10, Math.max(1, r + dc));
  opts.add(cellName(swapC, swapR));
  while (opts.size < 4) {
    opts.add(
      cellName(
        Math.min(10, Math.max(1, nc + ri(-1, 1))),
        Math.min(10, Math.max(1, nr + ri(-1, 1)))
      )
    );
  }
  const dirC = dc > 0 ? `${dc} a la derecha` : dc < 0 ? `${-dc} a la izquierda` : null;
  const dirR = dr > 0 ? `${dr} hacia abajo` : dr < 0 ? `${-dr} hacia arriba` : null;
  const vecTxt = [dirC, dirR].filter(Boolean).join(', ');
  return {
    type: 'vector',
    typeLabel: 'Vector en tablero',
    text: `Desde ${cellName(c, r)}, aplica el vector [${vecTxt}]. ¿Celda resultante?`,
    context: 'Columnas = letras (A→J, izquierda→derecha). Filas = números (1 arriba → 10 abajo).',
    options: shuffle([...opts].slice(0, 4)),
    correct,
    explain: `Columna: ${COLS[c - 1]}${dc !== 0 ? ` ${dc > 0 ? '+' : ''}${dc} → ${COLS[nc - 1]}` : ' (sin cambio)'}. Fila: ${r}${dr !== 0 ? ` ${dr > 0 ? '+' : ''}${dr} → ${nr}` : ' (sin cambio)'}. Resultado: ${correct}.`,
    meta: { html: null, grid: { marks: { a: { col: c, row: r } }, sol: { col: nc, row: nr } } },
  };
}

/* --- Tipo 4: punto medio (con trampa de distancia impar — brief §5.3) --- */
function genMidpoint(): Exercise {
  for (let tries = 0; tries < 100; tries++) {
    const exact = Math.random() < 0.6;
    const c1 = ri(1, 10);
    const r1 = ri(1, 10);
    let dc: number;
    let dr: number;
    if (exact) {
      dc = 2 * pick([-2, -1, 1, 2]);
      dr = 2 * pick([-2, -1, 1, 2]);
    } else {
      // al menos un eje con diferencia impar
      dc = pick([-3, -1, 1, 3, 2, -2]);
      dr = pick([-3, -1, 1, 3]);
      if (dc % 2 === 0 && dr % 2 === 0) continue;
    }
    const c2 = c1 + dc;
    const r2 = r1 + dr;
    if (c2 < 1 || c2 > 10 || r2 < 1 || r2 > 10) continue;
    const A = cellName(c1, r1);
    const B = cellName(c2, r2);
    const NOCELL = 'No hay celda única';
    if (exact) {
      const mc = (c1 + c2) / 2;
      const mr = (r1 + r2) / 2;
      const correct = cellName(mc, mr);
      const opts = new Set([correct, NOCELL]);
      while (opts.size < 4) {
        opts.add(
          cellName(
            Math.min(10, Math.max(1, mc + ri(-1, 1))),
            Math.min(10, Math.max(1, mr + ri(-1, 1)))
          )
        );
      }
      return {
        type: 'midpoint',
        typeLabel: 'Punto medio',
        text: `¿Cuál es el punto medio exacto entre ${A} y ${B}?`,
        options: shuffle([...opts].slice(0, 4)),
        correct,
        explain: `Columnas: (${c1}+${c2})/2 = ${mc} → ${COLS[mc - 1]}. Filas: (${r1}+${r2})/2 = ${mr}. Punto medio: ${correct}.`,
        meta: {
          html: null,
          grid: { marks: { a: { col: c1, row: r1 }, b: { col: c2, row: r2 } }, sol: { col: mc, row: mr } },
        },
      };
    } else {
      const mcRaw = (c1 + c2) / 2;
      const mrRaw = (r1 + r2) / 2;
      const near1 = cellName(Math.floor(mcRaw), Math.floor(mrRaw));
      const near2 = cellName(Math.ceil(mcRaw), Math.ceil(mrRaw));
      const opts = new Set([NOCELL, near1, near2]);
      while (opts.size < 4) {
        opts.add(
          cellName(
            ri(Math.max(1, Math.floor(mcRaw) - 1), Math.min(10, Math.ceil(mcRaw) + 1)),
            ri(Math.max(1, Math.floor(mrRaw) - 1), Math.min(10, Math.ceil(mrRaw) + 1))
          )
        );
      }
      return {
        type: 'midpoint',
        typeLabel: 'Punto medio',
        text: `¿Cuál es el punto medio exacto entre ${A} y ${B}?`,
        options: shuffle([...opts].slice(0, 4)),
        correct: NOCELL,
        explain: `Columnas: (${c1}+${c2})/2 = ${mcRaw}. Filas: (${r1}+${r2})/2 = ${mrRaw}. Al menos un eje da un valor no entero → no existe una celda única de punto medio. Esta es la trampa de distancia impar.`,
        meta: {
          html: null,
          grid: { marks: { a: { col: c1, row: r1 }, b: { col: c2, row: r2 } }, sol: null },
        },
      };
    }
  }
  return genVector();
}

export const KONZENTRATION_GENERATORS: GeneratorMap = {
  blockdiff: { fn: genBlockDiff, label: '¿Qué bloque difiere?' },
  samediff: { fn: genSameDiff, label: '¿Idénticas o no?' },
  vector: { fn: genVector, label: 'Vector en tablero' },
  midpoint: { fn: genMidpoint, label: 'Punto medio (+trampa)' },
};
