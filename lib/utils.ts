export function deltaShortest(target: number, current: number): number {
  let a = target - current;
  a = ((a + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
  return a;
}