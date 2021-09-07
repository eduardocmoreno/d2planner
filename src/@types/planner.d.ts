//planner context
interface IPlannerContext {
  characterLevel: number;
  setCharacterLevel: React.Dispatch<React.SetStateAction<number>>;
  totalSkillPointsRemaining: number;
  setTotalSkillPointsRemaining: React.Dispatch<React.SetStateAction<number>>;
  plannerTabs: IPlannerTabs[];
  setPlannerTabs: React.Dispatch<React.SetStateAction<IPlannerTabs[]>>;
};


//planner tab
interface IPlannerTabs {
  id: number;
  name: string;
  className: string;
  Component: React.ComponentType;
  isActive: boolean;
}

//stage one - skill quests
interface ISkillQuest {
  name: string,
  act: string,
  adds: number,
  active: boolean
}

interface ISkillQuestsInit {
  diff: string,
  quests: ISkillQuest[]
}

interface ISkillQuestsAction {
  type: 'TOGGLE' | 'TOGGLEALL' | 'RESET';
  payload?: {
    diff: string;
    quest: string;
    initialState?: ISkillQuestsInit[]
  }
}