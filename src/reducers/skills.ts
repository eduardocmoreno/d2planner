
let initialState: ISkill[];

export default function reduceSkills(skills: ISkill[], action: ISkillsAction) {
  switch (action.type) {
    case 'INCREMENT':
      return skills.map(skill => {
        if (skill.id === action.payload.id) {
          return { ...skill, points: skill.points + action.payload.qty! }
        }
        return skill;
      });

    case 'DECREMENT':
      return skills.map(skill => {
        if (skill.id === action.payload.id) {
          return { ...skill, points: skill.points - action.payload.qty! }
        }
        return skill;
      });

    case 'RESET':
      return initialState;

    case 'INIT':
      initialState = action.payload.initialState!;
      return initialState;

    default:
      return skills;
  }
}