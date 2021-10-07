interface ICharData {
  skills: {
    trees: ISkillTree[];
    list: ISkill[];
  };
  attributes: IAttrs;
  classItems: Partial<IGearItem['type']>;
}