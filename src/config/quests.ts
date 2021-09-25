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
    reward: 'skill',
    adds: 1,
    difficulty: [...questDifficulties]
  },
  {
    name: 'Radament\'s Lair',
    act: 'II',
    reward: 'skill',
    adds: 1,
    difficulty: [...questDifficulties]
  },
  {
    name: 'Lam Esen\'s Tome',
    act: 'III',
    reward: 'stat',
    adds: 5,
    difficulty: [...questDifficulties]
  },
  {
    name: 'The Fallen Angel',
    act: 'IV',
    reward: 'skill',
    adds: 2,
    difficulty: [...questDifficulties]
  }
]

export default questsInit;