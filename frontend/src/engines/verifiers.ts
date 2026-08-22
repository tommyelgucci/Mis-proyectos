/**
 * Verificadores por derivación independiente (protocolo brief §6).
 * La solución se RECALCULA parseando el enunciado/contexto/meta del ejercicio,
 * sin reutilizar la fórmula del generador.
 *
 * Compartidos entre:
 *  - scripts/verify-generators.ts (verificación masiva, 1000 casos/tipo)
 *  - lib/ai-exercises.ts (Fase 5: ningún ejercicio generado por IA llega al
 *    usuario sin pasar por verifyExercise)
 *
 * Convención: cada check devuelve null en caso de ÉXITO y un mensaje de error
 * en caso de fallo. OJO: no encadenar `?? 'error'` sobre el resultado
 * (brief §5.6: los tests también se verifican).
 */
import type { Exercise } from './types';

export type Check = (ex: Exercise) => string | null;

/* ========================= Invariantes comunes ========================= */

export function checkInvariants(ex: Exercise): string | null {
  if (!ex.options.includes(ex.correct)) return 'correct no está en options';
  if (new Set(ex.options).size !== ex.options.length) return 'opciones duplicadas';
  if (ex.options.length < 2 || ex.options.length > 4)
    return `número de opciones inválido (${ex.options.length})`;
  return null;
}

/* ================= MATHEMATIK: derivación desde el enunciado ================= */

const num = (s: string): number => parseFloat(s.replace(',', '.'));

export const mathChecks: Record<string, Check> = {
  percent(ex) {
    const m = ex.text.match(/el (\d+)% de (\d+)\?/);
    if (!m) return 'no pude parsear el enunciado';
    const expected = (num(m[1]) * num(m[2])) / 100;
    return String(expected) === ex.correct ? null : `esperaba ${expected}`;
  },
  fraction(ex) {
    const wantMax = ex.text.includes('MAYOR');
    const vals = ex.options.map((o) => {
      const [a, b] = o.split('/').map(Number);
      return a / b;
    });
    const target = wantMax ? Math.max(...vals) : Math.min(...vals);
    const expected = ex.options[vals.indexOf(target)];
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  estimate(ex) {
    const m = ex.text.match(/Estima: (\d+) × ([\d.]+)/);
    if (!m) return 'no pude parsear el enunciado';
    const exact = num(m[1]) * num(m[2]);
    const dists = ex.options.map((o) => Math.abs(num(o) - exact));
    const expected = ex.options[dists.indexOf(Math.min(...dists))];
    return expected === ex.correct ? null : `la opción más cercana a ${exact} es ${expected}`;
  },
  inverse(ex) {
    const m = ex.context?.match(/(\d+) desarrolladores tardan (\d+) días.*plazo es de (\d+) días/);
    if (!m) return 'no pude parsear el contexto';
    const [w, d, d2] = [num(m[1]), num(m[2]), num(m[3])];
    const expected = (w * d) / d2 - w;
    return String(expected) === ex.correct ? null : `esperaba ${expected}`;
  },
  direct(ex) {
    const mc = ex.context?.match(/procesa (\d+) solicitudes cada (\d+) segundos/);
    const mt = ex.text.match(/en (\d+) segundos/);
    if (!mc || !mt) return 'no pude parsear';
    const expected = (num(mc[1]) / num(mc[2])) * num(mt[1]);
    return String(expected) === ex.correct ? null : `esperaba ${expected}`;
  },
  chained(ex) {
    const m = ex.context?.match(/CHF (\d+)\. Descuento del (\d+)%, luego (\d+)%/);
    if (!m) return 'no pude parsear el contexto';
    const [base, d1, d2] = [num(m[1]), num(m[2]), num(m[3])];
    const raw = base * (1 - d1 / 100) * (1 - d2 / 100) * 1.081;
    const expected = (Math.round(raw / 0.05) * 0.05).toFixed(2);
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  data(ex) {
    const m = ex.context?.match(/(?:=)?(\d+) MB\)?\. Velocidad: (\d+) Mbps/);
    if (!m) return 'no pude parsear el contexto';
    const s = (num(m[1]) * 8) / num(m[2]);
    const expected = `${Math.floor(s / 60)} min ${s % 60} s`;
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  schedule(ex) {
    const m = ex.context?.match(
      /Tarea A dura (\d+) min\. Justo después sigue tarea B, que dura (\d+) min\. Empiezan a las (\d+):(\d+)\./
    );
    if (!m) return 'no pude parsear el contexto';
    const [durA, durB, h, mi] = m.slice(1).map(num);
    const total = h * 60 + mi + durA + durB;
    const expected = `${Math.floor(total / 60) % 24}:${String(total % 60).padStart(2, '0')}`;
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  dependency(ex) {
    const m = ex.context?.match(/^"(.+)" necesita que ya esté hecho "(.+)"\. "(.+)" necesita que ya esté hecho "(.+)"\.$/);
    if (!m) return 'no pude parsear el contexto';
    const [second1, first, third, second2] = m.slice(1);
    if (second1 !== second2) return 'contexto inconsistente entre las dos dependencias';
    const expected = `${first} → ${second1} → ${third}`;
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
};

/* ============ ZAHLENREIHEN: derivar la regla desde meta.terms ============ */

export function deriveSeries(type: string, terms: number[]): number | 'unknown' {
  const d = terms.slice(1).map((v, i) => v - terms[i]);
  switch (type) {
    case 'arith':
      return d.every((x) => x === d[0]) ? terms[terms.length - 1] + d[0] : 'unknown';
    case 'geom': {
      const r = terms[1] / terms[0];
      return terms.slice(1).every((v, i) => v === terms[i] * r)
        ? terms[terms.length - 1] * r
        : 'unknown';
    }
    case 'geomdiv':
      return terms.slice(1).every((v, i) => v === terms[i] / 2)
        ? terms[terms.length - 1] / 2
        : 'unknown';
    case 'growdiff': {
      const dd = d.slice(1).map((v, i) => v - d[i]);
      return dd.every((x) => x === dd[0])
        ? terms[terms.length - 1] + d[d.length - 1] + dd[0]
        : 'unknown';
    }
    case 'altern': {
      // zigzag +p/−q: diferencias alternan; el siguiente paso continúa la alternancia
      const p = d[0];
      const q = d[1];
      const ok = d.every((x, i) => x === (i % 2 === 0 ? p : q));
      if (!ok) return 'unknown';
      const next = d.length % 2 === 0 ? p : q;
      return terms[terms.length - 1] + next;
    }
    case 'fib': {
      const ok = terms.slice(2).every((v, i) => v === terms[i] + terms[i + 1]);
      return ok ? terms[terms.length - 1] + terms[terms.length - 2] : 'unknown';
    }
    case 'square': {
      // diferencias = impares consecutivos: d[i+1]-d[i] = 2
      const dd = d.slice(1).map((v, i) => v - d[i]);
      return dd.every((x) => x === 2)
        ? terms[terms.length - 1] + d[d.length - 1] + 2
        : 'unknown';
    }
    case 'multadd': {
      // t[k+1] = 2*t[k] + c → c constante
      const cs = terms.slice(1).map((v, i) => v - 2 * terms[i]);
      return cs.every((c) => c === cs[0])
        ? 2 * terms[terms.length - 1] + cs[0]
        : 'unknown';
    }
    case 'interleaved': {
      // dos series aritméticas alternadas; con 6 términos el 7º pertenece a la impar
      const odd = terms.filter((_, i) => i % 2 === 0);
      const even = terms.filter((_, i) => i % 2 === 1);
      const dO = odd[1] - odd[0];
      const dE = even[1] - even[0];
      const okO = odd.slice(1).every((v, i) => v === odd[i] + dO);
      const okE = even.slice(1).every((v, i) => v === even[i] + dE);
      return okO && okE ? odd[odd.length - 1] + dO : 'unknown';
    }
    default:
      return 'unknown';
  }
}

const seriesCheck: Check = (ex) => {
  const terms = ex.meta?.terms as number[] | undefined;
  if (!terms || !Array.isArray(terms)) return 'meta.terms ausente';
  const derived = deriveSeries(ex.type, terms);
  if (derived === 'unknown') return 'no pude derivar la regla de la serie';
  return String(derived) === ex.correct ? null : `derivación independiente da ${derived}`;
};

export const zahlenreihenChecks: Record<string, Check> = {
  arith: seriesCheck,
  geom: seriesCheck,
  geomdiv: seriesCheck,
  growdiff: seriesCheck,
  altern: seriesCheck,
  fib: seriesCheck,
  square: seriesCheck,
  multadd: seriesCheck,
  interleaved: seriesCheck,
};

/* ============ KONZENTRATION: derivación desde meta / enunciado ============ */

const COLS = 'ABCDEFGHIJ';
const parseCell = (s: string): [number, number] => [COLS.indexOf(s[0]) + 1, parseInt(s.slice(1))];

function extractBlocks(html: string): string[][] {
  // dos filas de <span class="blk ...">CONTENIDO<span class="blk-idx">n</span></span>
  const rows = [...html.matchAll(/<div class="compare-row">.*?<\/div>/gs)];
  return rows.map((r) =>
    [...r[0].matchAll(/<span class="blk\s*[^"]*">([^<]*)(?:<span class="blk-idx">\d+<\/span>)?<\/span>/g)]
      .map((m) => m[1])
      .filter((b) => b !== '-')
  );
}

export const konzChecks: Record<string, Check> = {
  blockdiff(ex) {
    const html = ex.meta?.html as string;
    const [a, b] = extractBlocks(html);
    if (!a || !b || a.length !== b.length) return 'no pude extraer las filas';
    const diffIdxs = a.map((blk, i) => (blk !== b[i] ? i : -1)).filter((i) => i >= 0);
    if (diffIdxs.length !== 1) return `hay ${diffIdxs.length} bloques distintos (debe ser 1)`;
    // exactamente un carácter mutado dentro del bloque
    const i = diffIdxs[0];
    const charDiffs = [...a[i]].filter((c, k) => c !== b[i][k]).length;
    if (a[i].length !== b[i].length || charDiffs !== 1) return 'la mutación no es de exactamente 1 carácter';
    const expected = `Bloque ${i + 1}`;
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  samediff(ex) {
    const html = ex.meta?.html as string;
    const [a, b] = extractBlocks(html);
    const identical = a.length === b.length && a.every((blk, i) => blk === b[i]);
    const expected = identical ? 'IDÉNTICAS' : 'DIFERENTES';
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  vector(ex) {
    const m = ex.text.match(/Desde ([A-J]\d+), aplica el vector \[([^\]]+)\]/);
    if (!m) return 'no pude parsear el enunciado';
    const [c, r] = parseCell(m[1]);
    let dc = 0;
    let dr = 0;
    const right = m[2].match(/(\d+) a la derecha/);
    const left = m[2].match(/(\d+) a la izquierda/);
    const down = m[2].match(/(\d+) hacia abajo/);
    const up = m[2].match(/(\d+) hacia arriba/);
    if (right) dc = +right[1];
    if (left) dc = -+left[1];
    if (down) dr = +down[1];
    if (up) dr = -+up[1];
    const expected = COLS[c + dc - 1] + (r + dr);
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
  midpoint(ex) {
    const m = ex.text.match(/entre ([A-J]\d+) y ([A-J]\d+)\?/);
    if (!m) return 'no pude parsear el enunciado';
    const [c1, r1] = parseCell(m[1]);
    const [c2, r2] = parseCell(m[2]);
    const mc = (c1 + c2) / 2;
    const mr = (r1 + r2) / 2;
    const expected =
      Number.isInteger(mc) && Number.isInteger(mr) ? COLS[mc - 1] + mr : 'No hay celda única';
    return expected === ex.correct ? null : `esperaba ${expected}`;
  },
};

/* ============ ANALYSE: mini-intérprete del pseudocódigo (meta.code) ============ */

export const analyseChecks: Record<string, Check> = {
  modloop(ex) {
    const code = ex.meta?.code as string;
    const m = code.match(/FOR X FROM (\d+) TO (\d+)\n  IF X MOD (\d+) == 0 THEN\n    TOTAL = TOTAL \+ (X|1)/);
    if (!m) return 'no pude parsear el código';
    const [lo, hi, mod] = [+m[1], +m[2], +m[3]];
    let total = 0;
    for (let x = lo; x <= hi; x++) if (x % mod === 0) total += m[4] === 'X' ? x : 1;
    return String(total) === ex.correct ? null : `ejecución da ${total}`;
  },
  nested(ex) {
    const code = ex.meta?.code as string;
    const m = code.match(/FOR I FROM 1 TO (\d+)\n  FOR J FROM 1 TO I\n    K = K \+ (I|1)/);
    if (!m) return 'no pude parsear el código';
    const n = +m[1];
    let k = 0;
    for (let i = 1; i <= n; i++) for (let j = 1; j <= i; j++) k += m[2] === 'I' ? i : 1;
    return String(k) === ex.correct ? null : `ejecución da ${k}`;
  },
  cond(ex) {
    const code = ex.meta?.code as string;
    const m = code.match(/X = (\d+)\s+Y = (\d+)\s+Z = (\d+)/);
    if (!m) return 'no pude parsear el código';
    const [X, Y, Z] = [+m[1], +m[2], +m[3]];
    const r = X > Y && Z < Y ? X + Z : X > Y ? X - Z : Y * 2;
    return String(r) === ex.correct ? null : `ejecución da ${r}`;
  },
  assign(ex) {
    const code = ex.meta?.code as string;
    const m = code.match(/A = (\d+)\s+B = (\d+)\s+C = (\d+)/);
    if (!m) return 'no pude parsear el código';
    let A = +m[1];
    let B = +m[2];
    let C = +m[3];
    A = B + C;
    B = A - C;
    C = A + B;
    return String(C) === ex.correct ? null : `ejecución da ${C}`;
  },
  rec(ex) {
    const code = ex.meta?.code as string;
    const m = code.match(/RETURN N (\*|\+) F\(N - 1\)[\s\S]*PRINT\(F\((\d+)\)\)/);
    if (!m) return 'no pude parsear el código';
    const op = m[1];
    const n = +m[2];
    const f = (x: number): number => (x <= 1 ? 1 : op === '*' ? x * f(x - 1) : x + f(x - 1));
    return String(f(n)) === ex.correct ? null : `ejecución da ${f(n)}`;
  },
};

/* ============================ API unificada ============================ */

/** Todos los verificadores indexados por tipo (los tipos son únicos entre motores). */
export const ALL_CHECKS: Record<string, Check> = {
  ...mathChecks,
  ...zahlenreihenChecks,
  ...konzChecks,
  ...analyseChecks,
};

/** Tipos para los que existe verificador — los únicos elegibles para generación IA. */
export const VERIFIABLE_TYPES = Object.keys(ALL_CHECKS);

/**
 * Verificación completa de un ejercicio: invariantes + derivación independiente.
 * Devuelve null si es válido, o el motivo del rechazo.
 */
export function verifyExercise(ex: Exercise): string | null {
  const inv = checkInvariants(ex);
  if (inv) return inv;
  const check = ALL_CHECKS[ex.type];
  if (!check) return `sin verificador para tipo ${ex.type}`;
  return check(ex);
}
