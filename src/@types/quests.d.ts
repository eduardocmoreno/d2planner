interface IQuestsDifficulty {
  level: string;
  active: boolean;
}

interface IQuest {
  name: string;
  act: string;
  reward: 'SKILLS' | 'ATTRS';
  adds: number;
  difficulty: IQuestsDifficulty[];
}

//skill quests dispatch action
interface IQuestsReducer {
  type: 'TOGGLE' | 'TOGGLEBYDIFFICULTY' | 'TOGGLEBYQUEST' | 'TOGGLEALL' | 'RESET';
  payload?: {
    difficulty?: string;
    quest?: string;
    initialState?: IQuest[] | unknown;
  }
}