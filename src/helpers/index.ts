export const capitalize = (str: string) => str.replaceAll('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export const percent = (value: number, percent: number): number => value * (percent / 100 + 1);

export const includes = <T, U extends T>(arr: readonly U[], elem: T): elem is U => arr.includes(elem as any);


/* 
//HOW MUCH DEX DO I NEED TO MAX BLOCK (75%)??
//B = TOTAL BLOCKING BONUS (CHAR INIT VALUES + SHIELD CTB + ICB FROM ITEMS + HS SKILL)
//C = CHAR LVL
function reqDexToMaxBlock(B, C) {
  return Math.floor((75 * 2 * C + (B * 15))/B);
}
*/