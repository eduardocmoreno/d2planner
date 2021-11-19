interface IGear {
  slot: 'head' | 'torso' | 'belt' | 'gloves' | 'boots' | 'left-hand' | 'right-hand' | 'amulet' | 'left-ring' | 'right-ring' | 'torch' | 'annihilus' | 'charms';
  base: IGearBase;
  mods: IGearMod[];
}

type TGearModsCategNames = 'damage' | 'defenses' | 'offenses' | 'attributes' | 'resists' | 'skills' | 'misc';

type TGearModName =
  'allAttrs' |
  'strength' |
  'dexterity' |
  'vitality' |
  'energy' |

  'life' |
  'life/lvl' |
  'mana' |
  'mana/lvl' |
  
  'def' |
  'eDef' |
  'def/lvl' |
  'dmgRed' |
  'block' |
  'fhr' |
  'req' |
  'mf' |
  'mf/lvl' |
  'dmg' |
  'eDmg' |
  'minDmg' |
  'maxDmg' |
  'maxDmg/lvl' |
  'eMaxDmg/lvl' |
  'dmgDemon' |
  'dmgDemon/lvl' |
  'dmgUndead' |
  'dmgUndead/lvl' |

  'fireDmg' |
  'coldDmg' |
  'ltngDmg' |
  'poisDmg' |

  'fireRes' |
  'coldRes' |
  'ltngRes' |
  'ltngRes/lvl' |
  'poisRes' |

  'maxFireRes' |
  'maxColdRex' |
  'maxLtngRes' |
  'maxPoisRes' |

  'ar' |
  'ar/lvl' |
  'eAr' |
  'ias' |
  'ow' |
  'cb' |
  'ds' |
  'ds/lvl' |
  'fcr' |
  'frw' |
  'lifeSteal' |
  'manaSteal' |

  'allSkills' |
  'classSkills' |
  'treeSkills' |
  'singleSkill' |
  
  'ethereal' |
  'noHeal' |
  'ignoreDef' |
  'knockback' |
  'hitBlinds' |
  'indestruct' |
  'noFreeze' |
  'halfFreeze' |
  'rip';


type TGearModsData = Record<TGearModName, IGearModData>;

interface IGearModData {
  name: TGearModName;
  descr: string;
  shortDescr: string;
  inputMin: number;
  inputMax: number;
  step: number;
  ref: number[]
}

interface IGearMod {
  name: TGearModName;
  subModName?: string | null;
  subModId?: number | null;
  value?: number | null;
  maxVal?: number | null;
  minVal?: number | null;
  class?: TCharClass | null;
  charges?: number | null;
  chance?: number | null;
  event?: 'On Attack' | 'On Striking' | 'When Struck' | 'When You Kill an Enemy' | 'When You Level-up' | 'When You Die' | null;
}

type TGearMultiLevelModOpts = Partial<Record<TGearModName, IGearSubModOptions>>;

interface IGearSubModOptions {
  all: Partial<Record<number, string>>;
  available: Partial<Record<number, string>>;
  str: string;
}

interface IGearContext {
  armorsData: IGearBase[];
  weaponsData: IGearBase[];
  modsData: TGearModsData;
  partialClassSkillMods: Partial<TGearModName[]>;
  boclMods: Partial<TGearModName[]>;
  booleanMods: Partial<TGearModName[]>;
  rangeMods: Partial<TGearModName[]>;
}

type TWeaponClass = "1hs" | "stf" | "1ht" | "2ht" | "bow" | "xbw" | "ht1";

interface IGearBase {
  name: string;
  code: string;
  type: 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'pelt' | 'phlm' | 'ashd' | 'head' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot' | 'h2h' | 'h2h2' | 'orb' | 'abow' | 'aspe' | 'ajav' | 'ring' | 'amul' | 'chrm' | 'torc';
  minDef: number;
  maxDef: number;
  block: number;
  strReq: number;
  strBonus: number;
  dexReq: number;
  dexBonus: number;
  durability: number;
  nodurability: number;
  level: number;
  levelReq: number;
  sockets: number;
  weaponClass: TWeaponClass;
  twoHandWeaponClass: TWeaponClass;
  minDmg: number;
  maxDmg: number;
  twoHandMinDmg: number;
  twoHandMaxDmg: number;
  throwMinDmg: number;
  throwMaxDmg: number;
  missileType: number;
  speed: number;
  twoHanded: 1 | 0;
  oneOrTwoHanded: 1 | 0;
}

type TGearBaseVisibleProps = 'minDef' | 'block' | 'minDmg' | 'twoHandMinDmg' | 'throwMinDmg' | 'levelReq' | 'strReq' | 'dexReq' | 'sockets' | 'speed';

/* 
[ 
  {
    id: 'allSkills',
    value: 1
  },
  {
    id: 'strength',
    value: 30
  },
  {
    id: 'treeSkills',
    subId: 1, //combat skills for example
    value: 1 //+1 skill for example
  },
  {
    id: 'treeSkills',
    subId: 3, //DEFENSIVE AURAS for example
    value: 2 //+2 skills for example
  },
  {
    id: 'singleSkill',
    subId: 19, //fanaticism for example
    value: 1
  },
  {
    id: 'fireDmg',
    min: 5,
    max: 20 //Adds 5-20 Fire Damage
  },
  {
    id: 'ncSkill',
    class: 'barbarian',
    subId: 27 //battle orders
    value: 6
  },
  {
    id: 'chargedSkill',
    class: 'sorceress',
    subId: 7 //enchant,
    value: 10,
    charges: 11
  },
  {
    id: 'castSkill',
    class: 'assassin',
    subId: 19 //venom,
    value: 15,
    chance: 10,
    event: striking
  }
]
*/