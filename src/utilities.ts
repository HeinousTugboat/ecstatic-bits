/**
 *
 *
 * @template T
 * @param {(T | undefined | null)} o
 * @returns {(o is undefined | null)}
 */
export function invalid<T>(o: T | undefined | null): o is undefined | null {
  return o === undefined || o === null;
}
