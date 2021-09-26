/// <reference types="react" />

//planner context
interface IPlannerContext {
  characterData: ICharacterData;

  planner: IPlanner[];
  setPlanner: React.Dispatch<React.SetStateAction<IPlanner[]>>;

  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;

  attrs: IAttrsState;
  dispatchAttrs: React.Dispatch<IAttrsReducer>;

  attrPoints: number;
  setAttrPoints: React.Dispatch<React.SetStateAction<number>>;

  quests: IQuest[];
  dispatchQuests: React.Dispatch<IQuestsReducer>;

  skills: ISkill[];
  dispatchSkills: React.Dispatch<ISkillsReducer>;

  skillTabs: ISkillTab[];
  setSkillTabs: React.Dispatch<React.SetStateAction<ISkillTab[]>>;

  skillPoints: number;
  setSkillPoints: React.Dispatch<React.SetStateAction<number>>;

  gears: IGear[];
  setGears: React.Dispatch<React.SetStateAction<IGear[]>>;
};


//planner tab
interface IPlanner {
  id: number;
  name: string;
  Component: ComponentType;
  isActive: boolean;
}