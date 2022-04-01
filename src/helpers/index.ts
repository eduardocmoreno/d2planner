//MISC
export const capitalize = (str: string) => str.replaceAll('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export const percent = (value: number, percent: number): number => value * (percent / 100 + 1);

export const includes = <T, U extends T>(arr: readonly U[], elem: T): elem is U => arr.includes(elem as any);

export const popDuplicatesFromArray = function (arr: any[]): any[] {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}

//ITEM MODS
export function addNewModValidation(newMod: ItemMod, prevMods: ItemMod[]): boolean {
  const isPartialClassSkillMod = includes(['tab-skill', 'single-skill'] as ItemModPartialClassSkill[], newMod.name);

  //treeSkills mod can be added up to 2x times
  if (newMod.name === 'tab-skill' && prevMods.filter(m => m.name === newMod.name).length === 2) {
    return false;
  }

  //singleSkill mod can be added up to 5x time
  if (newMod.name === 'single-skill' && prevMods.filter(m => m.name === newMod.name).length === 5) {
    return false;
  }

  //When we are adding a special mod, just one is allowed at a time,
  //so we MUST verify if the first one added before already have a subName defined.
  //For special mods we must use the subName prop as a key-id in the
  //loop instead of modName prop to avoid conflicts and weird behaviors.
  if (isPartialClassSkillMod && prevMods.some(m => m.name === newMod.name && !m.id)) {
    return false;
  }

  //all other mods can be added just once
  if (!isPartialClassSkillMod && prevMods.some(m => m.name === newMod.name)) {
    return false;
  }
  
  return true;
}

export const getItemMod = (mods: ItemMod[], modName: ItemModName) => {
  return mods.find(m => m.name === modName) || null;
}

export const getGearModValuesReduced = (gear: Gear[], modName: ItemModName): number | null => {
  return gear
    .filter(g => g.mods.find(m => m.name === modName && m.value))
    .map(g => g.mods.find(m => m.name === modName && m.value)?.value || 0)
    .reduce((a, b) => (a || 0) + (b || 0), 0) || null;
}

export const getGearSubModValuesReduced = (gear: Gear[], modName: ItemModName, id: number): number | null => {

  return gear
    .filter(g => g.mods.filter(m => m.name === modName && m.id === id && m.value).length)
    .map(g => g.mods.filter(m => m.id === id).map(m => m.value)[0])
    .reduce((a, b) => (a || 0) + (b || 0), 0) || null;
}

export const modInputValuesValidator = (value: string, inputMin: number, inputMax: number, isBoclMod: boolean = false): number | null => {
  let number = parseFloat(value) || 0;

  if (number === 0 || (number / 1) === 0) {
    return null;
  }

  if (number > inputMax) {
    number = inputMax;
  }

  if (number > 0 && number < inputMin) {
    number = inputMin;
  }

  if (isBoclMod) {
    let factor = number / 0.025;

    if (Number.isInteger(factor)) {
      return number;
    }

    return Math.floor(((Math.floor(factor) * 0.025) + 0.025) * 1000) / 1000;
  }

  return number;
}

export const applyModsOnBase = (gear: Gear[], mods: ItemMod[], cleanBase: Partial<Item>, charLevel: number): Partial<Item> => {
  console.log('APPLY MODS', cleanBase);
  if(!!cleanBase.name){

    const isEthereal = getItemMod(mods, 'ethereal') && !cleanBase.nodurability ? true : false;
  
    let newBaseProps = { ...cleanBase };
  
    //defenses
    if (cleanBase.maxDef) {
      let baseMaxDef = isEthereal ? Math.floor(percent(cleanBase.maxDef, 50)) : cleanBase.maxDef;
      newBaseProps.maxDef = Math.floor(baseMaxDef * ((getItemMod(mods, 'ac%')?.value || 0) / 100 + 1) + (getItemMod(mods, 'ac')?.value || 0) + ((getItemMod(mods, 'ac/lvl')?.value || 0) * charLevel));
    }
  
    //requirements
    if (cleanBase.strReq) {
      newBaseProps.strReq = Math.floor(percent(cleanBase.strReq, -(getItemMod(mods, 'ease')?.value || 0)) - (isEthereal ? 10 : 0));
    }
  
    if (cleanBase.dexReq) {
      newBaseProps.dexReq = Math.floor(percent(cleanBase.dexReq, -(getItemMod(mods, 'ease')?.value || 0)) - (isEthereal ? 10 : 0));
    }
  
    //block
    if (cleanBase.block) {
      newBaseProps.block = cleanBase.block + (getItemMod(mods, 'block-rate')?.value || 0);
    }
  
    //damage (weapons only)
    if (cleanBase.weaponClass) {
      // const offWeaponItems = gear.filter(g => !g.base.weaponClass);
      // const offWeaponDmgMods: Partial<Record<TGearModName, number>> = {
      //   minDmg: getGearModValuesReduced(offWeaponItems, 'minDmg') as number,
      //   maxDmg: getGearModValuesReduced(offWeaponItems, 'maxDmg') as number,
      //   eDmg: getGearModValuesReduced(offWeaponItems, 'eDmg') as number
      // }
  
      let dmgProps: {
        min: 'minDmg' | 'twoHandMinDmg' | 'throwMinDmg';
        max: 'maxDmg' | 'twoHandMaxDmg' | 'throwMaxDmg';
      }[] = [
          {
            min: 'minDmg',
            max: 'maxDmg'
          },
          {
            min: 'twoHandMinDmg',
            max: 'twoHandMaxDmg'
          },
          {
            min: 'throwMinDmg',
            max: 'throwMaxDmg'
          }
        ];
  
      dmgProps.forEach(({ min, max }) => {
        if ((min || max) in cleanBase) {
          if (isEthereal) {
            newBaseProps[min] = Math.floor(percent(cleanBase[min]!, 50));
            newBaseProps[max] = Math.floor(percent(cleanBase[max]!, 50));
          }
  
          if (getItemMod(mods, 'dmg%')?.value) {
            //weapon eDmg mod reflects directly to the weapon base damage
            newBaseProps[min] = Math.floor(percent(newBaseProps[min] || cleanBase[min]!, getItemMod(mods, 'dmg%')?.value || 0));
            newBaseProps[max] = Math.floor(percent(newBaseProps[max] || cleanBase[max]!, getItemMod(mods, 'dmg%')?.value || 0));
          }
  
          if (getItemMod(mods, 'dmg%/lvl')?.value) {
            //eDmg + eMaxDmg/lvl
            newBaseProps[max] = Math.floor(percent(cleanBase[max]!, (getItemMod(mods, 'dmg%')?.value || 0) + ((getItemMod(mods, 'dmg%/lvl')?.value || 0) * charLevel)));
          }
  
          if (getItemMod(mods, 'dmg/lvl')?.value) {
            //maxDmg/lvl (mod available only for weapons)
            newBaseProps[max] = (newBaseProps[max] || cleanBase[max]!) + (Math.floor((getItemMod(mods, 'dmg/lvl')?.value || 0) * charLevel));
          }
  
          if (getItemMod(mods, 'dmg-max')?.value/*  || offWeaponDmgMods.maxDmg */) {
            //maxDmg from all items reflects to the weapon base damage
            newBaseProps[max] = (newBaseProps[max] || cleanBase[max]!) + (getItemMod(mods, 'dmg-max')?.value || 0)/*  + (offWeaponDmgMods.maxDmg || 0) */;
          }
  
          if (getItemMod(mods, 'dmg-min')?.value/*  || offWeaponDmgMods.minDmg */) {
            //minDmg from all items reflects to the weapon base damage
            newBaseProps[min] = (newBaseProps[min] || cleanBase[min]!) + (getItemMod(mods, 'dmg-min')?.value || 0)/*  + (offWeaponDmgMods.minDmg || 0) */;
            if (newBaseProps[min]! >= (newBaseProps[max] || cleanBase[max]!)) {
              newBaseProps[max] = newBaseProps[min]! + 1;
            }
          }
  
          if (getItemMod(mods, 'dmg')?.value || 0) {
            //dmg mod is available only for weapons
            newBaseProps[min] = (newBaseProps[min] || cleanBase[min]!) + (getItemMod(mods, 'dmg')?.value || 0);
            newBaseProps[max] = (newBaseProps[max] || cleanBase[max]!) + (getItemMod(mods, 'dmg')?.value || 0);
          }
        }
      });
    }
  
    //damage (shields only)
    //const weaponDmgMod = getItemMod(gear.find(g => g.slot === 'right-hand')?.mods!, 'dmg')?.value || 0;
    // if (['shie', 'ashd'].includes(selectedBase.type!) && rhDmgMod) {
    //   //dmg mod from weapons reflects to shield base damage
    //   newBaseProps['minDmg'] = selectedBase['minDmg'] + rhDmgMod;
    //   newBaseProps['maxDmg'] = selectedBase['maxDmg'] + rhDmgMod;
    // }
  
    return { 
      ...cleanBase, 
      ...newBaseProps 
    }
  }

  return {} as Item;
}

//SKILLS
export const getSkill = (skills: Skill[], id: number): Skill => {
  return skills.find(s => s.id === id) || {} as Skill;
}

//QUESTS
export const questsRewardsReducer = (quests: Quest[], reward: Quest['reward']) => {
  return quests
    .filter(q => q.reward === reward)
    .map(q => {
      let diffCount = q.difficulty.filter(d => d.active === true).length;
      return diffCount * q.adds;
    })
    .reduce((a: number, b: number) => a + b, 0);
};


/*
//HOW MUCH DEX DO I NEED TO MAX BLOCK (75%)??
//B = TOTAL BLOCKING BONUS (CHAR INIT VALUES + SHIELD CTB + ICB FROM ITEMS + HS SKILL)
//C = CHAR LVL
function reqDexToMaxBlock(B, C) {
  return Math.floor((75 * 2 * C + (B * 15))/B);
}
*/