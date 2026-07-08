/**
 * Motor Mathematik — 7 generadores portados 1:1 de mathematik-app.html.
 * Verificados originalmente con ~9.000 casos (brief §4).
 */
import type { Exercise, GeneratorMap } from './types';
import { ri, pick, shuffle } from './random';

/** Redondeo suizo a 0.05 CHF. */
const chf = (v: number): string => (Math.round(v / 0.05) * 0.05).toFixed(2);
const fmtMinSec = (s: number): string => `${Math.floor(s / 60)} min ${s % 60} s`;

/* --- 1. Porcentaje mental --- */
function genPercent(): Exercise {
  const p = pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75]);
  const N = ri(3, 48) * 20;
  const ans = (N * p) / 100;
  const d1 = (N * (p + 5)) / 100;
  const d2 = p > 5 ? (N * (p - 5)) / 100 : (N * (p + 10)) / 100;
  return {
    type: 'percent',
    typeLabel: 'Porcentajes',
    text: `¿Cuánto es el ${p}% de ${N}?`,
    context: 'Sin calculadora — usa la descomposición 10% / 5% / 25%.',
    options: [ans, d1, d2].map(String),
    correct: String(ans),
    explain: `10% de ${N} = ${N / 10}. Construye: ${p}% = ${ans}.`,
  };
}

/* --- 2. Comparación de fracciones --- */
const FRACS: ReadonlyArray<readonly [number, number]> = [
  [1, 2], [3, 5], [5, 8], [2, 3], [7, 10], [3, 4], [4, 5], [5, 6], [7, 8],
  [11, 16], [9, 16], [13, 20], [17, 20], [5, 12], [7, 12], [11, 12], [2, 5], [3, 8],
];
function genFraction(): Exercise {
  let sel: ReadonlyArray<readonly [number, number]>;
  do {
    sel = shuffle(FRACS).slice(0, 3);
  } while (new Set(sel.map((f) => f[0] / f[1])).size < 3);
  const wantMax = Math.random() < 0.5;
  const vals = sel.map((f) => f[0] / f[1]);
  const target = wantMax ? Math.max(...vals) : Math.min(...vals);
  const correct = sel[vals.indexOf(target)];
  return {
    type: 'fraction',
    typeLabel: 'Fracciones',
    text: `¿Cuál de estas fracciones es la ${wantMax ? 'MAYOR' : 'MENOR'}?`,
    context: 'Convierte a decimal con la tabla de referencia de la Teoría.',
    options: sel.map((f) => `${f[0]}/${f[1]}`),
    correct: `${correct[0]}/${correct[1]}`,
    explain: `En decimal: ${sel.map((f) => `${f[0]}/${f[1]} = ${(f[0] / f[1]).toFixed(4).replace(/0+$/, '')}`).join(' · ')}.`,
  };
}

/* --- 3. Estimación por opción más cercana ---
   Regla crítica (brief §5.4): la correcta es la opción MÁS CERCANA al exacto. */
function genEstimate(): Exercise {
  for (let tries = 0; tries < 50; tries++) {
    const a = ri(17, 59);
    const b = pick([3.1, 4.95, 5.9, 7.9, 9.9, 12.1, 19.95, 24.9, 29.9]);
    const exact = a * b;
    const base = Math.round(exact / 10) * 10;
    const opts = [base - 20, base, base + 20].filter((o) => o > 0);
    if (opts.length < 3) continue;
    const dists = opts.map((o) => Math.abs(o - exact));
    const minD = Math.min(...dists);
    if (dists.filter((d) => Math.abs(d - minD) < 0.6).length > 1) continue; // evitar empates
    const correct = opts[dists.indexOf(minD)];
    return {
      type: 'estimate',
      typeLabel: 'Estimación',
      text: `Estima: ${a} × ${b} ≈ ?  Elige la opción MÁS CERCANA.`,
      context: 'Redondea solo UNO de los factores para minimizar el error.',
      options: opts.map(String),
      correct: String(correct),
      explain: `Valor exacto: ${a} × ${b} = ${exact.toFixed(2)}. La opción más cercana es ${correct} (diferencia ${Math.abs(correct - exact).toFixed(2)}).`,
    };
  }
  return genPercent();
}

/* --- 4. Proporcionalidad inversa (días-hombre) --- */
function genInverse(): Exercise {
  for (let tries = 0; tries < 80; tries++) {
    const w = ri(2, 6);
    const d = pick([6, 8, 9, 10, 12]);
    const total = w * d;
    const divs: number[] = [];
    for (let x = 2; x < d; x++) if (total % x === 0) divs.push(x);
    if (!divs.length) continue;
    const d2 = pick(divs);
    const need = total / d2;
    const add = need - w;
    if (add < 1) continue;
    const opts = new Set([add, need, add + 1]);
    if (add > 1) opts.add(add - 1);
    return {
      type: 'inverse',
      typeLabel: 'Prop. inversa',
      text: '¿Cuántas personas ADICIONALES hay que incorporar?',
      context: `${w} desarrolladores tardan ${d} días en completar un módulo a ritmo constante. El nuevo plazo es de ${d2} días.`,
      options: shuffle([...opts]).slice(0, 4).map(String),
      correct: String(add),
      explain: `Carga: ${w}×${d} = ${total} días-persona. Necesarios: ${total}÷${d2} = ${need}. Adicionales: ${need}−${w} = ${add}. (La trampa clásica es responder ${need}.)`,
    };
  }
  return genPercent();
}

/* --- 5. Proporcionalidad directa (tasas) --- */
function genDirect(): Exercise {
  const t = pick([4, 5, 6, 8]);
  const k = ri(4, 12) * 10;
  const N = t * k;
  let t2: number;
  do {
    t2 = pick([10, 12, 15, 20]);
  } while (t2 === t);
  const ans = k * t2;
  const opts = new Set([ans, k * t, ans + k, Math.max(k, ans - k)]);
  return {
    type: 'direct',
    typeLabel: 'Prop. directa',
    text: `¿Cuántas solicitudes procesa en ${t2} segundos?`,
    context: `Un servidor procesa ${N} solicitudes cada ${t} segundos, a ritmo constante.`,
    options: shuffle([...opts]).slice(0, 4).map(String),
    correct: String(ans),
    explain: `Tasa: ${N}÷${t} = ${k}/s. En ${t2}s: ${k}×${t2} = ${ans}.`,
  };
}

/* --- 6. Descuentos encadenados + IVA suizo 8.1% --- */
function genChained(): Exercise {
  for (let tries = 0; tries < 50; tries++) {
    const base = pick([200, 250, 300, 350, 400, 450, 500, 600]);
    const d1 = pick([10, 15, 20, 25]);
    const d2 = pick([5, 10, 15]);
    const correct = chf(base * (1 - d1 / 100) * (1 - d2 / 100) * 1.081);
    const trapSum = chf(base * (1 - (d1 + d2) / 100) * 1.081); // sumar descuentos (error clásico)
    const noVat = chf(base * (1 - d1 / 100) * (1 - d2 / 100)); // olvidar IVA
    if (correct === trapSum || correct === noVat || trapSum === noVat) continue;
    return {
      type: 'chained',
      typeLabel: 'Descuentos+IVA',
      text: '¿Precio final con IVA incluido? (CHF)',
      context: `Precio base CHF ${base}. Descuento del ${d1}%, luego ${d2}% adicional sobre el precio ya rebajado. Al final se suma el 8.1% de IVA (MWST). Redondeo suizo a 0.05.`,
      options: shuffle([correct, trapSum, noVat]),
      correct,
      explain: `${base}×${(1 - d1 / 100).toFixed(2)} = ${(base * (1 - d1 / 100)).toFixed(2)} → ×${(1 - d2 / 100).toFixed(2)} = ${(base * (1 - d1 / 100) * (1 - d2 / 100)).toFixed(2)} → ×1.081 = ${correct}. Trampa: sumar ${d1}+${d2}=${d1 + d2}% de golpe da ${trapSum} (incorrecto).`,
    };
  }
  return genPercent();
}

/* --- 7. Transferencia de datos (MB→Mb ×8) --- */
function genData(): Exercise {
  for (let tries = 0; tries < 80; tries++) {
    const mbps = pick([10, 20, 25, 40, 50, 80]);
    const s = ri(9, 60) * 10; // 90..600 s
    const mbits = mbps * s;
    if (mbits % 8 !== 0) continue;
    const MB = mbits / 8;
    if (MB < 100 || MB > 6000) continue;
    const wrongNoX8 = Math.round(MB / mbps); // olvidó ×8
    if (wrongNoX8 === s) continue;
    const opts = new Set([
      fmtMinSec(s),
      fmtMinSec(wrongNoX8),
      fmtMinSec(s + 30),
      fmtMinSec(Math.max(30, s - 30)),
    ]);
    const sizeTxt = MB % 1000 === 0 ? `${MB / 1000} GB (=${MB} MB)` : `${MB} MB`;
    return {
      type: 'data',
      typeLabel: 'Datos/Red',
      text: '¿Cuánto tarda la descarga?',
      context: `Archivo de ${sizeTxt}. Velocidad: ${mbps} Mbps. (1 MB = 8 Mb)`,
      options: shuffle([...opts]).slice(0, 4),
      correct: fmtMinSec(s),
      explain: `${MB} MB × 8 = ${mbits} Mb → ${mbits} ÷ ${mbps} = ${s} s = ${fmtMinSec(s)}. Trampa: sin ×8 sale ${fmtMinSec(wrongNoX8)} (incorrecto).`,
    };
  }
  return genPercent();
}

export const MATHEMATIK_GENERATORS: GeneratorMap = {
  percent: { fn: genPercent, label: 'Porcentajes' },
  fraction: { fn: genFraction, label: 'Fracciones' },
  estimate: { fn: genEstimate, label: 'Estimación' },
  inverse: { fn: genInverse, label: 'Prop. inversa' },
  direct: { fn: genDirect, label: 'Prop. directa' },
  chained: { fn: genChained, label: 'Descuentos+IVA' },
  data: { fn: genData, label: 'Datos/Red' },
};
