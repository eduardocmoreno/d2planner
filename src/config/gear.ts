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

export const gearSkillsMods:  Partial<Record<keyof IGearMods, string>> = {
  allSkills: '+{a} To All Skills',
  allClassSkills: '+{a} To {charClass} Skill Levels',
  treeSkills: '+{a} To {tree} ({charClass} Only)',
  singleSkill: '+{a} To {b} ({charClass} Only)',
  skillCharges: 'Level {a} {b} (Charges)',
  skillChanceToCast: 'Chance To Cast Level {a} {b}',
  nonClassSkills: '+{a} To {b}'
};

export const gearAttrMods:  Partial<Record<keyof IGearMods, string>> = {
  allAttrs: '+{a} To All Attributes',
  strength: '+{a} To Strength',
  dexterity: '+{a} To Dexterity',
  vitality: '+{a} To Vitality',
  energy: '+{a} To Energy'
};

export const gearDmgMods:  Partial<Record<keyof IGearMods, string>> = {
  dmg: '+{a} Damage',
  eDmg: '+{a}% Enhanced Damage',
  eDmgBocl: '+{a}% Enhanced Damage (Based On Character Level)',
  minDmg: '+{a} To Minimum Damage',
  maxDmg: '+{a} To Maximum Damage',
  maxDmgBocl: '+{a} To Maximum Damage (Based On Character Level)',
  dmgDemon: '+{a}% Damage To Demons',
  dmgDemonBocl: '+{a}% Damage To Demons (Based On Character Level)',
  dmgUndead: '+{a}% Damage To Undead',
  dmgUndeadBocl: '+{a}% Damage To Undead (Based On Character Level)',
  fireMin: 'Adds {a}-{b} Fire Dmage',
  coldMin: 'Adds {a}-{b} Cold Damage',
  ltngMin: 'Adds {a}-{b} Lightning Damage',
  poisMin: 'Adds {a}-{b} Poison Damage'
};

export const gearDefMods:  Partial<Record<keyof IGearMods, string>> = {
  def: '+{a} Defense',
  eDef: '+{a}% Enhanced Defense',
  defBocl: '+{a} Defense (Based On Character Level)',
  block: '{a}% Increased Chance Of Blocking',
  fhr: '+{a}% Fast Hit Recovery'
};

export const gearMiscMods:  Partial<Record<keyof IGearMods, string>> = {
  mf: '+{a}% Magic Finding',
  req: 'Requirements -{a}'
};

export const gearOffensesMods:  Partial<Record<keyof IGearMods, string>> = {
  fcr: '+{a}% Faster Cast Rate',
  frw: '+{a}% Faster Run/Walk',
  ar: '+{a} Attack Rating',
  eAr: '{a}% Bonus To Attack Rating',
  arBocl: '+{a} Attack Rating (Based On Character Level)',
  ias: '+{a}% Increased Attack Speed',
  ow: '{a}% Chance Of Open Wounds',
  cb: '{a}% Chance Of Crushing Blow',
  ds: '{a}% Deadly Strike',
  dsBocl: '{a}% Deadly Strike (Based On Character Level)',
  lifeSteal: '{a}% Life Stolen Per Hit',
  manaSteal: '{a}% Mana Stolen Per Hit'
}

export const gearResMods:  Partial<Record<keyof IGearMods, string>> = {
  fireRes: 'Fire Resist +{a}%',
  coldRex: 'Cold Resist +{a}%',
  ltngRes: 'Lightning Resist +{a}%',
  poisRes: 'Poison Resist +{a}%',
  maxFireRes: '+{a}% To Maximum Fire Resist',
  maxColdRex: '+{a}% To Maximum Cold Resist',
  maxLtngRes: '+{a}% To Maximum Lightning Resist',
  maxPoisRes: '+{a}% To Maximum Poison Resist'
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

export const gearMods: Partial<Record<keyof IGearMods, string>> = {
  ...gearSkillsMods,
  ...gearAttrMods,
  ...gearDmgMods,
  ...gearDefMods,
  ...gearMiscMods,
  ...gearOffensesMods,
  ...gearResMods
}