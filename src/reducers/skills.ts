let initialState: ISkill[];

export default function skillsReducer(skills: ISkill[], action: ISkillsReducer) {
  switch (action.type) {
    case 'INCREMENT':
      return skills.map(skill => {
        if (skill.id === action.payload?.id) {
          return { ...skill, points: skill.points + action.payload.batch! }
        }
        return skill;
      });

    case 'DECREMENT':
      return skills.map(skill => {
        if (skill.id === action.payload?.id) {
          return { ...skill, points: skill.points - action.payload.batch! }
        }
        return skill;
      });

    case 'RESET':
      return initialState;

    case 'INIT':
      initialState = action.payload?.initialState!;
      return initialState;

    default:
      return skills;
  }
}