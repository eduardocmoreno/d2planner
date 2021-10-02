let initialState: ISkill[];

export default function skillsReducer(prev: ISkill[], action: ISkillsReducer) {
  switch (action.type) {
    case 'INCREMENT':
    case 'DECREMENT': {
      const { id, batch } = action.payload!;
      const factor = action.type === 'DECREMENT' ? -1 : 1;

      return prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            level: {
              ...p.level,
              points: p.level.points + batch! * factor,
              total: p.level.bonus + p.level.points + batch! * factor
            }
          }
        }
        return p;
      });
    }

    case 'RESET':
      return initialState;

    case 'INIT':
      initialState = action.payload?.initialState!;
      return initialState;

    default:
      return prev;
  }
}