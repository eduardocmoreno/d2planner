export const capitalize = (str: string) => str.replaceAll('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export const percent = (value: number, percent: number): number => value * (percent / 100 + 1);

export const includes = <T, U extends T>(arr: readonly U[], elem: T): elem is U => arr.includes(elem as any);

export const popDuplicatesFromArray = function (arr: any[]): any[] {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}

export const getItemMod = (mods: IGearMod[], modName: TGearModName) => {
  return mods.find(m => m.name === modName) || null;
}

export const getItemModValuesReduced = (gear: IGear[], modName: TGearModName): number | null => {
  return gear
    .filter(g => g.mods.find(m => m.name === modName && m.value))
    .map(g => g.mods.find(m => m.name === modName && m.value)?.value || 0)
    .reduce((a, b) => (a || 0) + (b || 0), 0) || null;
}

export const getSubModValuesReduced = (gear: IGear[], modName: TGearModName, subModId: number): number | null => {
  return gear
    .filter(g => g.mods.filter(m => m.name === modName && m.subModId === subModId && m.value).length)
    .map(g => g.mods.filter(m => m.subModId === subModId).map(m => m.value)[0])
    .reduce((a, b) => (a || 0) + (b || 0), 0) || null;
}


/*
//HOW MUCH DEX DO I NEED TO MAX BLOCK (75%)??
//B = TOTAL BLOCKING BONUS (CHAR INIT VALUES + SHIELD CTB + ICB FROM ITEMS + HS SKILL)
//C = CHAR LVL
function reqDexToMaxBlock(B, C) {
  return Math.floor((75 * 2 * C + (B * 15))/B);
}
*/