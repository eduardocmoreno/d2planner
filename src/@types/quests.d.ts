interface IQuestsDifficulty {
  level: string;
  active: boolean;
}

interface IQuest {
  name: string;
  act: string;
  reward: 'skill' | 'stat';
  adds: number;
  difficulty: IQuestsDifficulty[];
}

//skill quests dispatch action
interface IQuestsAction {
  type: 'TOGGLE' | 'TOGGLEBYDIFFICULTY' | 'TOGGLEBYQUEST' | 'TOGGLEALL' | 'RESET';
  payload?: {
    difficulty?: string;
    quest?: string;
    initialState?: IQuest[] | unknown;
  }
}