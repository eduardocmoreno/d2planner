export default function skillsReducer(prev: ISkill[], action: ISkillsReducer) {
  switch (action.type) {
    case 'INC_POINTS':
    case 'DEC_POINTS': {
      const { id, batch } = action.payload!;
      const factor = action.type === 'DEC_POINTS' ? -1 : 1;

      return prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            level: {
              ...p.level,
              points: p.level.points + batch! * factor,
              total: p.level.bonus + p.level.granted + p.level.points + batch! * factor
            }
          }
        }
        return p;
      });
    }

    case 'ALL_SKILLS': {
      let bonus = action.payload?.batch || 0;
      return prev.map(p => {
        return {
          ...p,
          level : {
            ...p.level,
            bonus,
            total: bonus + p.level.granted + p.level.points
          }
        }
      });
    }

    case 'TREE_SKILLS': {
      
      return prev;
    }

    case 'RESET':
      return [] as ISkill[];

    case 'INIT':
      return action.payload?.initialState!;

    default:
      return prev;
  }
}

/* 

allSkills || allClassSkills
type: "INC_ALL_SKILLS" | "DEC_ALL_SKILLS",
payload: {
  batch: number
}

treeSkills
type: "INC_TREE_SKILLS" | "DEC_TREE_SKILLS",
payload: {
  treeId: 1 | 2 | 3
  batch: number
}

singleSkill
type: "INC_SINGLE_SKILL" | "DEC_SINGLE_SKILL",
payload: {
  id: number
  batch: number
}

"INC_ALL_SKILLS" | "DEC_ALL_SKILLS" | "INC_TREE_SKILLS" | "DEC_TREE_SKILLS" | "INC_SINGLE_SKILL" | "DEC_SINGLE_SKILL"

*/