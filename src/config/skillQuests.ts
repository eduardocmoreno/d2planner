const skillQuestsList: ISkillQuest[] = [
  {
    name: 'Den of Evil',
    act: 'I',
    adds: 1,
    active: false
  },
  {
    name: 'Radament\'s Lair',
    act: 'II',
    adds: 1,
    active: false
  },
  {
    name: 'The Fallen Angel',
    act: 'IV',
    adds: 2,
    active: false
  }
]

const skillQuestsInit: ISkillQuestsInit[] = [
  {
    diff: 'normal',
    quests: [...skillQuestsList]
  },
  {
    diff: 'nightmare',
    quests: [...skillQuestsList]
  },
  {
    diff: 'hell',
    quests: [...skillQuestsList]
  }
]

export default skillQuestsInit;