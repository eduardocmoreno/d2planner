import questsInit from "../config/quests";

export default function questsReducer(prevQuests: IQuest[], action: IQuestsReducer) {
  switch (action.type) {
    case 'TOGGLE':
      return prevQuests.map(q => {
        if (q.name === action.payload?.quest) {
          return {
            ...q,
            difficulty: q.difficulty.map(d => {
              if (d.level === action.payload?.difficulty) {
                return { ...d, active: !d.active }
              }
              return d;
            })
          }
        }
        return q;
      });

    case 'TOGGLEBYQUEST':
      let quest = action.payload?.quest;
      return prevQuests.map(q => {
        if (q.name === quest) {
          return {
            ...q,
            difficulty: q.difficulty.map(d => {
              return {
                ...d,
                active: q.difficulty.every(d => d.active === true) ? false : true
              }
            })
          }
        }

        return q;
      });

    case 'TOGGLEBYDIFFICULTY':
      let diff = action.payload?.difficulty;
      return prevQuests.map(q => {
        return {
          ...q,
          difficulty: q.difficulty.map(d => {
            if (d.level === diff) {
              return {
                ...d,
                active: prevQuests.flatMap(q => q.difficulty).filter(d => d.level === diff).every(d => d.active === true) ? false : true
              }
            }
            return d
          })
        }
      });

    case 'TOGGLEALL':
      return prevQuests.map(q => {
        return {
          ...q,
          difficulty: q.difficulty.map(d => {
            return {
              ...d,
              active: prevQuests.flatMap(q => q.difficulty).every(a => a.active === true) ? false : true
            }
          })
        }
      });

    case 'RESET':
      return questsInit;

    default:
      return prevQuests;
  }
}