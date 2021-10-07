interface IGearProps extends IAttrs {
  allAttrs?: number;
}

interface IGear {
  type: 'ARMOR' | 'WEAPON' | 'AMULET' | 'RING';
  props: IGearProps;
}

type TClassWeapon = "1hs" | "stf" | "1ht" | "2ht" | "bow" | "xbw" | "ht1";
type TPaladinItems = 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'ashd' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot';

interface IGearItem {
  name: string;
  id: string;
  type: 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'pelt' | 'phlm' | 'ashd' | 'head' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot' | 'h2h' | 'h2h2' | 'orb' | 'abow' | 'aspe' | 'ajav';
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
  TwoHanded: boolean;
  OneTwoHanded: boolean;
  TwoHandedClassWeapon: TClassWeapon;
  TwoHandedDmgMin: number;
  TwoHandedDmgMax: number;
  MisDmgMin: number;
  MisDmgMax: number;
}