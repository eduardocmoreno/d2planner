/// <reference types="react" />

//planner context
interface IPlannerContext {
  characterData: ICharacterData;

  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;

  attrs: IAttrsState;
  dispatchAttrs: React.Dispatch<IAttrsAction>;

  attrPoints: number;
  setAttrPoints: React.Dispatch<React.SetStateAction<number>>;

  skills: ISkill[];
  dispatchSkills: React.Dispatch<ISkillsAction>;

  skillTabs: ISkillTab[];
  setSkillTabs: React.Dispatch<React.SetStateAction<ISkillTab[]>>;

  skillPoints: number;
  setSkillPoints: React.Dispatch<React.SetStateAction<number>>;

  planner: IPlanner[];
  setPlanner: React.Dispatch<React.SetStateAction<IPlanner[]>>;
};


//planner tab
interface IPlanner {
  id: number;
  name: string;
  Component: ComponentType;
  isActive: boolean;
}