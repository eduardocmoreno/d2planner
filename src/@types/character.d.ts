interface ICharData {
  skills: {
    trees: ISkillTree[];
    list: ISkill[];
  };
  stats: {
    strength: number;
    dexterity: number;
    vitality: number;
    energy: number;
    block: number;
  };
  classItems: IGearBase["type"];
  classWeaponSpeed: Record<TWeaponClass, number[]>;
}

type TCharClass = 'amazon' | 'assassin' | 'barbarian' | 'druid' | 'necromancer' | 'paladin' | 'sorceress';

type TPaladinItems = 'helm' | 'tors' | 'shie' | 'glov' | 'boot' | 'belt' | 'ashd' | 'circ' | 'axe' | 'wand' | 'club' | 'scep' | 'mace' | 'hamm' | 'swor' | 'knif' | 'tkni' | 'taxe' | 'jave' | 'spea' | 'pole' | 'staf' | 'bow' | 'xbow' | 'tpot';

//"1hs" | "stf" | "1ht" | "2ht" | "bow" | "xbw" | "ht1";

/*
Stats (not mutable)
- blockFactor
- attrPtsPerLevel
- lifePerLvl
- stamPerLvl

Attributes (mutable)
- str
- dex
- vit
- ene
- life (hp)
- stam
*/
