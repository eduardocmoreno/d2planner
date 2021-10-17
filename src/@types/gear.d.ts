interface IGear {
  slot: 'head' | 'torso' | 'belt' | 'gloves' | 'boots' | 'left-hand' | 'right-hand' | 'amulet' | 'left-ring' | 'right-ring' | 'torch' | 'annihilus' | 'charms';
  base: Partial<IGearProps>;
  props: Partial<IGearProps>;
  mods: Partial<IGearMods>;
}

type TGearModsCategNames = 'damage' | 'defenses' | 'offenses' | 'attributes' | 'resists' | 'skills' | 'misc';

interface IGearModsByCategory extends Partial<Record<keyof IGearMods, string>> {}

interface IGearMods {
  allAttrs: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;

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
}

type TWeaponClass = "1hs" | "stf" | "1ht" | "2ht" | "bow" | "xbw" | "ht1";
type TPaladinItems = 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'ashd' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot';

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