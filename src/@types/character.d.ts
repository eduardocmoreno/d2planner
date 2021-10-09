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
}

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
