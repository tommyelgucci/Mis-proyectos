/**
 * Fusión del progreso local (6 apps) con el remoto (Supabase).
 * Estrategia por campo, sin perder nada:
 * - best / memBest: se queda con el récord más alto
 * - mastered / checklist: unión (dominado en cualquiera de los dos = dominado)
 * - stats: por tipo de ejercicio, gana la entrada con más intentos (total)
 * - resto: gana el valor local si existe
 */

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

interface Stat {
  ok?: number;
  total?: number;
}

function mergeStats(local: unknown, remote: unknown): Obj {
  const l = isObj(local) ? local : {};
  const r = isObj(remote) ? remote : {};
  const out: Obj = {};
  for (const type of new Set([...Object.keys(l), ...Object.keys(r)])) {
    const ls = (l[type] ?? {}) as Stat;
    const rs = (r[type] ?? {}) as Stat;
    out[type] = (ls.total ?? 0) >= (rs.total ?? 0) ? ls : rs;
  }
  return out;
}

function mergeUnion(local: unknown, remote: unknown): Obj {
  const l = isObj(local) ? local : {};
  const r = isObj(remote) ? remote : {};
  return { ...r, ...l };
}

export function mergeProgress(local: unknown, remote: unknown): unknown {
  if (local == null) return remote;
  if (remote == null) return local;
  if (!isObj(local) || !isObj(remote)) return local;

  const out: Obj = {};
  for (const k of new Set([...Object.keys(local), ...Object.keys(remote)])) {
    const l = local[k];
    const r = remote[k];
    if (k === 'best' || k === 'memBest') {
      out[k] = Math.max(Number(l ?? 0), Number(r ?? 0));
    } else if (k === 'mastered' || k === 'checklist') {
      out[k] = mergeUnion(l, r);
    } else if (k === 'stats') {
      out[k] = mergeStats(l, r);
    } else {
      out[k] = l ?? r;
    }
  }
  return out;
}
