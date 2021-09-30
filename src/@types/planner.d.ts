/// <reference types="react" />

type setStateAsNumber = React.Dispatch<React.SetStateAction<number>>;

//planner context
interface IPlannerContext {
  characterData: ICharacterData;

  planner: IPlanner[];
  setPlanner: React.Dispatch<React.SetStateAction<IPlanner[]>>;

  level: number;
  setLevel: setStateAsNumber;

  attrs: IAttrsState;
  dispatchAttrs: React.Dispatch<IAttrsReducer>;

  attrPoints: number;
  setAttrPoints: setStateAsNumber;

  attrPointsAppied: number;
  setAttrPointsApplied: setStateAsNumber;

  quests: IQuest[];
  dispatchQuests: React.Dispatch<IQuestsReducer>;

  skills: ISkill[];
  dispatchSkills: React.Dispatch<ISkillsReducer>;

  skillPoints: number;
  setSkillPoints: setStateAsNumber;

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