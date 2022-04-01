/// <reference types="react" />

type setStateAsNumber = React.Dispatch<React.SetStateAction<number>>;

//planner context
interface PlannerContext {
  charClass: string;

  charData: CharData;

  planner: Planner[];
  setPlanner: React.Dispatch<React.SetStateAction<Planner[]>>;

  charLevel: number;
  setCharLevel: setStateAsNumber;

  attrs: Attrs;
  dispatchAttrs: React.Dispatch<AttrsReducer>;

  attrPoints: number;
  setAttrPoints: setStateAsNumber;

  quests: Quest[];
  dispatchQuests: React.Dispatch<QuestsReducer>;

  skills: Skill[];
  dispatchSkills: React.Dispatch<SkillsReducer>;

  skillPoints: number;
  setSkillPoints: setStateAsNumber;

  // newGear: Gear[];
  // dispatchGear: React.Dispatch<GearReducer>;

  // items: Item[];
  // dispatchItems: React.Dispatch<ItemsReducer>;
}


//planner tab
interface Planner {
  id: number;
  name: string;
  Component: React.ComponentType;
  isActive: boolean;
}