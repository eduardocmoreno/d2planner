interface IGear {
  slot: 'head' | 'torso' | 'belt' | 'gloves' | 'boots' | 'left-hand' | 'right-hand' | 'amulet' | 'left-ring' | 'right-ring' | 'torch' | 'annihilus' | 'charms';
  props: Partial<IGearProps>;
  mods: Partial<IGearMods>;
}

/* 
  "dmg"
  "dmg-min"
  "dmg-max"
  "dmg%"
  "dmg/lvl"
  "dmg%/lvl"

"dmg-throw"
"dmg-norm"

"dmg-fire"
"dmg-cold"
"dmg-ltng"
"dmg-pois"
"dmg-mag"
"dmg-fire/lvl"
"dmg-cold/lvl"
"dmg-ltng/lvl"
"dmg-pois/lvl"

"dmg-demon"
"dmg-undead"
*/

interface IGearMods {
  allAttrs: number;
  strength: number;
  dexterity: number;
  vitality: number;
  energy: number;

  defense: number;
  defenseBonus: number; //enhanced defense
  defenseBocl: number; //based on char level

  requirements: number;

  dmgBonus: number; //enhanced dmg
  
    dmg: number; //like in Grief
    dmgMin: number; //to minimum dmg
    dmgMax: number; //to maximum dmg
    dmgMaxBocl: number; //to maximum dmg
    dmgBonusBocl: number; //enhanced dmg based on char level
    dmgBocl: number; //based on char level
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