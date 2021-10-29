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
  classItems: IGearProps["type"];
  classWeaponSpeed: Record<TWeaponClass, number[]>;
}

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
