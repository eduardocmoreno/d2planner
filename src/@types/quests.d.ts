interface QuestDifficulty {
  level: string;
  active: boolean;
}

interface Quest {
  name: string;
  act: string;
  reward: 'SKILLS' | 'ATTRS';
  adds: number;
  difficulty: QuestDifficulty[];
}

//skill quests dispatch action
interface QuestsReducer {
  type: 'TOGGLE' | 'TOGGLEBYDIFFICULTY' | 'TOGGLEBYQUEST' | 'TOGGLEALL' | 'RESET';
  payload?: {
    difficulty?: string;
    quest?: string;
    initialState?: Quest[] | unknown;
  }
}