interface IGear {
  slot: 'head' | 'torso' | 'belt' | 'gloves' | 'boots' | 'left-hand' | 'right-hand' | 'amulet' | 'left-ring' | 'right-ring' | 'torch' | 'annihilus' | 'charms';
  base: Partial<IGearProps>;
  props: Partial<IGearProps>;
  mods: IGearMod[];
}

type TGearModsStr = Record<TGearModName, string>;
type TGearModsDescr = Partial<TGearModsStr>;

interface IGearContext {
  armors: IGearProps[],
  weapons: IGearProps[],
  mods: TGearModsStr,
  modsDescr: TGearModsDescr
}

type TGearModName =
  'allAttrs' |
  'strength' |
  'dexterity' |
  'vitality' |
  'energy' |
  'def' |
  'eDef' |
  'defBocl' |
  'block' |
  'fhr' |
  'req' |
  'mf' |
  'mfBocl' |
  'dmg' |
  'eDmg' |
  'eDmgBocl' |
  'minDmg' |
  'maxDmg' |
  'maxDmgBocl' |
  'dmgDemon' |
  'dmgDemonBocl' |
  'dmgUndead' |
  'dmgUndeadBocl' |

  'fireDmg' |
  'coldDmg' |
  'ltngDmg' |
  'poisDmg' |

  'fireRes' |
  'coldRes' |
  'ltngRes' |
  'ltngResBocl' |
  'poisRes' |

  'maxFireRes' |
  'maxColdRex' |
  'maxLtngRes' |
  'maxPoisRes' |

  'ar' |
  'arBocl' |
  'eAr' |
  'ias' |
  'ow' |
  'cb' |
  'ds' |
  'dsBocl' |
  'fcr' |
  'frw' |
  'lifeSteal' |
  'manaSteal' |

  'allSkills' |
  'allClassSkills' |

  'treeSkills' |
  'singleSkill';


type TGearModsCategNames = 'damage' | 'defenses' | 'offenses' | 'attributes' | 'resists' | 'skills' | 'misc';

interface IGearSubMod {
  [k: string]: number;
  //concat mod name + id ==> [treeSkills_1]: [bonus value]
}

type TGearMultiLevelMods = Extract<TGearModName, 'treeSkills' | 'singleSkill'>;
type TGearMultiLevelModsOpts = Record<TGearMultiLevelMods, IGearSubModOptions>;

interface IGearSubModOptions {
  all: Partial<Record<number, string>>;
  available: Partial<Record<number, string>>;
  str: string;
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

interface IGearMods {
  allAttrs: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;
  def: number;
  eDef: number;
  defBocl: number;
  block: number;
  fhr: number;
  req: number;
  mf: number;
  mfBocl: number;
  dmg: number;
  eDmg: number;
  eDmgBocl: number;
  minDmg: number;
  maxDmg: number;
  maxDmgBocl: number;
  dmgDemon: number;
  dmgDemonBocl: number;
  dmgUndead: number;
  dmgUndeadBocl: number;

  fireDmg: number;
  coldDmg: number;
  ltngDmg: number;
  poisDmg: number;

  fireRes: number;
  coldRes: number;
  ltngRes: number;
  ltngResBocl: number;
  poisRes: number;

  maxFireRes: number;
  maxColdRex: number;
  maxLtngRes: number;
  maxPoisRes: number;

  ar: number;
  arBocl: number;
  eAr: number;
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
  treeSkills: IGearSubMod;
  singleSkill: IGearSubMod;
}
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

type TPaladinItems = 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'ashd' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot';

type TWeaponClass = "1hs" | "stf" | "1ht" | "2ht" | "bow" | "xbw" | "ht1";

interface IGearProps {
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

type TItemPropsToRender = 'minDef' | 'block' | 'minDmg' | 'twoHandMinDmg' | 'throwMinDmg' | 'levelReq' | 'strReq' | 'dexReq' | 'sockets' | 'speed';