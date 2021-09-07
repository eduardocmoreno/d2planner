import skillQuestsInit from "../config/skillQuests";

export default function reduceSkillQuests(prevState: ISkillQuestsInit[], action: ISkillQuestsAction) {
  switch (action.type) {
    case 'TOGGLE':
      return prevState.map(({ diff, quests }) => {
        if (diff === action.payload!.diff) {
          return {
            diff,
            quests: quests.map(q => {
              if (q.name === action.payload!.quest) {
                return {
                  ...q,
                  active: !q.active
                }
              }
              return q;
            })
          }
        }
        return { diff, quests };
      });

    case 'TOGGLEALL':
      let allQuests = prevState.flatMap(s => s.quests);
      return prevState.map(s => {
        return {
          ...s,
          quests: s.quests.map(q => {
            return {
              ...q,
              active: allQuests.every(q => q.active === true) ? false : true
            }
          })
        }
      });

    case 'RESET':
      return skillQuestsInit;

    default:
      return prevState;
  }
}