export default function skillsReducer(prev: Skill[], action: SkillsReducer) {
  switch (action.type) {
    case 'INC_POINTS':
    case 'DEC_POINTS': {
      const { id, batch } = action;
      const factor = action.type === 'DEC_POINTS' ? -1 : 1;

      return prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            level: {
              ...p.level,
              points: p.level.points + batch! * factor,
              total: p.level.points + p.level.bonus.toAll + p.level.bonus.toClass + p.level.bonus.toTree + p.level.bonus.toSingle + batch! * factor
            }
          }
        }
        return p;
      });
    }

    case 'ALL_SKILLS': {
      return prev.map(p => {
        return {
          ...p,
          level: {
            ...p.level,
            bonus: {
              ...p.level.bonus,
              toAll: (action.batch || 0)
            },
            total: (action.batch || 0) + p.level.points + p.level.bonus.toClass + p.level.bonus.toTree + p.level.bonus.toSingle
          }
        }
      });
    }

    case 'CLASS_SKILLS': {
      return prev.map(p => {
        return {
          ...p,
          level: {
            ...p.level,
            bonus: {
              ...p.level.bonus,
              toClass: (action.batch || 0)
            },
            total: (action.batch || 0) + p.level.points + p.level.bonus.toAll + p.level.bonus.toTree + p.level.bonus.toSingle
          }
        }
      });
    }

    case 'TREE_SKILLS': {
      return prev.map(p => {
        if (p.tree === action.id) {
          return {
            ...p,
            level: {
              ...p.level,
              bonus: {
                ...p.level.bonus,
                toTree: action.batch || 0
              },
              total: (action.batch || 0) + p.level.points + p.level.bonus.toAll + p.level.bonus.toClass + p.level.bonus.toSingle
            }
          }
        }
        return p;
      });
    }

    case 'SINGLE_SKILL': {
      return prev.map(p => {
        if (p.id === action.id) {
          return {
            ...p,
            level: {
              ...p.level,
              bonus: {
                ...p.level.bonus,
                toSingle: action.batch || 0
              },
              total: (action.batch || 0) + p.level.points + p.level.bonus.toAll + p.level.bonus.toClass + p.level.bonus.toTree
            }
          }
        }
        return p;
      });
    }

    case 'RESET': {
      return prev.map(s => {
        return {
          ...s,
          level: {
            ...s.level,
            points: 0,
            total: s.level.bonus.toAll + s.level.bonus.toClass + s.level.bonus.toTree + s.level.bonus.toSingle
          }
        }
      });
    }

    case 'INIT': {
      return action.initialState!.map(s => {
        return {
          ...s,
          level: {
            ...s.level,
            total: s.level.points + s.level.bonus.toAll + s.level.bonus.toClass + s.level.bonus.toTree + s.level.bonus.toSingle
          }
        }
      });
    }
  }
}