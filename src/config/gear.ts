const itemPropsModsInit = {
  base: {},
  props: {},
  mods: {}
}

const gearInit: IGear[] = [
  {
    slot: 'head',
    ...itemPropsModsInit
  },
  {
    slot: 'torso',
    ...itemPropsModsInit
  },
  {
    slot: 'left-hand',
    ...itemPropsModsInit
  },
  {
    slot: 'right-hand',
    ...itemPropsModsInit
  },
  {
    slot: 'gloves',
    ...itemPropsModsInit
  },
  {
    slot: 'belt',
    ...itemPropsModsInit
  },
  {
    slot: 'boots',
    ...itemPropsModsInit
  },
  {
    slot: 'amulet',
    ...itemPropsModsInit
  },
  {
    slot: 'left-ring',
    ...itemPropsModsInit
  },
  {
    slot: 'right-ring',
    ...itemPropsModsInit
  },
  {
    slot: 'torch',
    ...itemPropsModsInit
  },
  {
    slot: 'annihilus',
    ...itemPropsModsInit
  },
  {
    slot: 'charms',
    ...itemPropsModsInit
  },
]

export default gearInit;

export const gearModsCategNames: TGearModsCategNames[] = ['skills', 'damage', 'defenses', 'offenses', 'resists', 'attributes', 'misc'];

export const gearSkillsMods: IGearModsByCategory = {
  allSkills: 'All Skills',
  allClassSkills: 'Class Skill Levels',
  treeSkills: 'Skill Tree Levels',
  singleSkill: 'Single Skill Level',
  skillCharges: 'Charged Skill',
  skillChanceToCast: 'Chance To Cast Skill',
  nonClassSkills: 'Non-Class Skill'
};

export const gearAttrMods: IGearModsByCategory = {
  allAttrs: 'All Attributes',
  strength: 'Strength',
  dexterity: 'Dexterity',
  vitality: 'Vitality',
  energy: 'Energy'
};

export const gearDmgMods: IGearModsByCategory = {
  dmg: 'Damage',
  eDmg: 'Enhanced Damage',
  eDmgBocl: 'Enhanced Damage (Based On Character Level)',
  minDmg: 'Minimum Damage',
  maxDmg: 'Maximum Damage',
  maxDmgBocl: 'Maximum Damage (Based On Character Level)',
  dmgDemon: 'Damage To Demons',
  dmgDemonBocl: 'Damage To Demons (Based On Character Level)',
  dmgUndead: 'Damage To Undead',
  dmgUndeadBocl: 'Damage To Undead (Based On Character Level)',
  fireMin: 'Fire Dmage',
  coldMin: 'Cold Damage',
  ltngMin: 'Lightning Damage',
  poisMin: 'Poison Damage'
};

export const gearDefMods: IGearModsByCategory = {
  def: 'Defense',
  eDef: 'Enhanced Defense',
  defBocl: 'Defense (Based On Character Level)',
  block: 'Chance To Block',
  fhr: 'Fast Hit Recovery'
};

export const gearMiscMods: IGearModsByCategory = {
  mf: 'Magic Finding',
  req: 'Requirements'
};

export const gearOffensesMods: IGearModsByCategory = {
  fcr: 'Faster Cast Rate',
  frw: 'Faster Run/Walk',
  ar: 'Attack Rating',
  eAr: 'Bonus To Attack Rating',
  arBocl: 'Attack Rating (Based On Character Level)',
  eArBocl: 'Bonus To Attack Rating (Based On Character Level)',
  ias: 'Increased Attack Speed',
  ow: 'Open Wounds',
  cb: 'Crushing Blow',
  ds: 'Deadly Strike',
  dsBocl: 'Deadly Strike (Based On Character Level)',
  lifeSteal: 'Life Stolen Per Hit',
  manaSteal: 'Mana Stolen Per Hit'
}

export const gearResMods: IGearModsByCategory = {
  fireRes: 'Fire Resist',
  coldRex: 'Cold Resist',
  ltngRes: 'Lightning Resist',
  poisRes: 'Poison Resist',
  maxFireRes: 'Maximum Fire Resist',
  maxColdRex: 'Maximum Cold Resist',
  maxLtngRes: 'Maximum Lightning Resist',
  maxPoisRes: 'Maximum Poison Resist'
}

export const gearModsByCategories: Record<TGearModsCategNames, IGearModsByCategory> = {
  skills: gearSkillsMods,
  damage: gearDmgMods,
  defenses: gearDefMods,
  offenses: gearOffensesMods,
  resists: gearResMods,
  attributes: gearAttrMods,
  misc: gearMiscMods
}

function convertModStr({str, params}: {
  str: string,
  params: {
    [key: string]: number;
  }
}) {
  console.log(str, params);
  return 'teste';
}

/* export const gearModsStringMap: Record<keyof IGearMods, string> = {
  allAttrs: `All Resistances [+{a}]`,
  strength: '<+{A}> To Strength',
  dexterity: '<+{A}> To Dexterity',
  vitality: '<+{A}> To Vitality',
  energy: '<+{A}> To Energy',

  def: number;
  eDef: number; //enhanced defense
  defBocl: number; //based on char level
  block: number;
  fhr: number;

  req: number;
  mf: number;

  dmg: number; //like in Grief
  eDmg: number; //enhanced dmg
  eDmgBocl: number; //enhanced dmg based on char level
  minDmg: number; //to minimum dmg
  maxDmg: number; //to maximum dmg
  maxDmgBocl: number; //to maximum dmg
  dmgDemon: number;
  dmgDemonBocl: number;
  dmgUndead: number;
  dmgUndeadBocl: number;
  fireMin: number;
  coldMin: number;
  ltngMin: number;
  poisMin: number;
  fireMax: number;
  coldMax: number;
  ltngMax: number;
  poisMax: number;

  fireRes: number;
  coldRex: number;
  ltngRes: number;
  poisRes: number;
  maxFireRes: number;
  maxColdRex: number;
  maxLtngRes: number;
  maxPoisRes: number;

  ar: number;
  arBocl: number;
  eAr: number;
  eArBocl: number;
  ias: number;
  ow: number;
  cb: number;
  ds: number;
  dsBocl: number;
  fcr: number;
  frw: number;
  lifeSteal: number;
  manaSteal: number;

  allSkills: number;
  allClassSkills: number;
  
  treeSkills: {
    tree: 1 | 2 | 3;
    level: number;
  }

  singleSkill: {
    class: string; //type TCharacterClass?
    id: number; //class.skill.id (ex.: chance to cast FOH => paladin.skills.find(s => s.id === 10))
    level: number; //skill level
  }

  skillCharges: {
    class: string;
    id: number;  //class.skill.id
    level: number;  //skill level
    charges: number; //just for illustration
    //string literals ==> `Level ${level} capitalize(${class.skills.find(s => s.id === id).name}) (${charges}/${charges} charges)`
  }

  skillChanceToCast: {
    class: string;
    id: number; //class.skill.id
    level: number; //skill level
    chance: number; //chance
  }

  nonClassSkills: {
    class: string;
    id: number; //class.skill.id
    level: number; //skill level
  }

  lightningResBocl: number; //Stormspike
} */