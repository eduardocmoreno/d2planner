
let initialState: ISk[];

export default function reduceSkills(skills: ISk[], action: ISkRdAct) {
  switch (action.type) {
    case 'INCREMENT':
      return skills.map(skill => {
        if (skill.id === action.payload.id) {
          return { ...skill, points: skill.points + action.payload.qty }
        }
        return skill
      });

    case 'DECREMENT':
      return skills.map(skill => {
        if (skill.id === action.payload.id) {
          return { ...skill, points: skill.points - action.payload.qty }
        }
        return skill
      });

    case 'RESET':
      return initialState;

    case 'INIT':
      initialState = action.payload.initialState;
      return initialState;

    default:
      return skills;
  }
}