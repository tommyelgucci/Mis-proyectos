/** Helpers de azar compartidos por todos los motores (idénticos a las 6 apps). */

/** Entero aleatorio en [a, b] inclusive. */
export const ri = (a: number, b: number): number =>
  a + Math.floor(Math.random() * (b - a + 1));

export const pick = <T>(arr: readonly T[]): T => arr[ri(0, arr.length - 1)];

export const shuffle = <T>(arr: readonly T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = ri(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Elige un elemento al azar con pesos: cuanto más alto el peso relativo,
 * más chance de salir. Pesos <= 0 se tratan como 0 (nunca salen, pero no
 * rompen la suma). Si el total de pesos es 0 (o `items` está vacío salvo por
 * un solo elemento), cae a `pick` uniforme para no dividir por cero.
 */
export const pickWeighted = <T>(items: readonly T[], weights: readonly number[]): T => {
  const total = weights.reduce((a, w) => a + Math.max(0, w), 0);
  if (total <= 0) return pick(items);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= Math.max(0, weights[i]);
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
};
