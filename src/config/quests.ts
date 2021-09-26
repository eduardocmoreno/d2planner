const questDifficulties: IQuestsDifficulty[] = [
  {
    level: 'normal',
    active: false
  },
  {
    level: 'nightmare',
    active: false
  },
  {
    level: 'hell',
    active: false
  }
]

const questsInit: IQuest[] = [
  {
    name: 'Den of Evil',
    act: 'I',
    reward: 'SKILLS',
    adds: 1,
    difficulty: [...questDifficulties]
  },
  {
    name: 'Radament\'s Lair',
    act: 'II',
    reward: 'SKILLS',
    adds: 1,
    difficulty: [...questDifficulties]
  },
  {
    name: 'Lam Esen\'s Tome',
    act: 'III',
    reward: 'ATTRS',
    adds: 5,
    difficulty: [...questDifficulties]
  },
  {
    name: 'The Fallen Angel',
    act: 'IV',
    reward: 'SKILLS',
    adds: 2,
    difficulty: [...questDifficulties]
  }
]

export default questsInit;