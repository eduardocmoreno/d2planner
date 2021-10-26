/* 
credit to: https://github.com/benneq

how to use:
const ARR = ['a', 'b', 'c'] as const;
const x = 'a';
if (includes(ARR, x)) {
  console.log(x);
}
*/
export function useArrayIncludes<T, U extends T>(arr: readonly U[], elem: T): elem is U {
  return arr.includes(elem as any);
}