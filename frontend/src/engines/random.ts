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
