interface IGear {
  name: 'head' | 'torso' | 'belt' | 'gloves' | 'boots' | 'left-hand' | 'right-hand' | 'amulet' | 'left-ring' | 'right-ring' | 'torch' | 'annihilus' | 'charms';
  props: Partial<IGearProps>;
  mods: Partial<IGearMods>;
}

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
}

type TClassWeapon = "1hs" | "stf" | "1ht" | "2ht" | "bow" | "xbw" | "ht1";
type TPaladinItems = 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'ashd' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot';

interface IGearProps {
  name: string;
  id: string;
  type: 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'pelt' | 'phlm' | 'ashd' | 'head' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot' | 'h2h' | 'h2h2' | 'orb' | 'abow' | 'aspe' | 'ajav' | 'ring' | 'amul' | 'chrm' | 'torc';
    defMin: number;
    defMax: number;
    strReq: number;
  strBonus: number;
    dexReq: number;
  dexBonus: number;
    block: number;
  durability: number;
  nodurability: number;
  level: number;
  levelReq: number;
  sockets: number;
  classWeapon: TClassWeapon;
    dmgMin: number;
    dmgMax: number;
  missileType: number;
  speed: number;
  TwoHanded: 1 | 0;
  OneTwoHanded: 1 | 0;
  TwoHandedClassWeapon: TClassWeapon;
    TwoHandedDmgMin: number;
    TwoHandedDmgMax: number;
    MisDmgMin: number;
    MisDmgMax: number;
}