export default function attrsReducer(prev: IAttrsState, action: IAttrsReducer) {

  switch (action.type) {
    case 'ADD':
    case 'SUB': {
      const { attr, batch } = action.payload!;
      const { base, applied, bonus } = prev[attr!];

      const factor = action.type === 'SUB' ? -1 : 1;

      const newState: IAttrsState = {
        ...prev,
        [attr!]: {
          ...prev[attr!],
          applied: applied! + batch! * factor,
          total: base! + applied! + bonus! + batch! * factor
        }
      };

      return newState;
    }

    case 'BONUS': {
      const { attr, batch } = action.payload!;
      const { base, applied } = prev[attr!];

      const newState: IAttrsState = {
        ...prev,
        [attr!]: {
          ...prev[attr!],
          bonus: batch,
          total: base! + applied! + batch!
        }
      };

      return newState;
    }

    case 'RESET': {
      const newState: IAttrsState = {
        strength: {
          ...prev.strength,
          applied: 0,
          total: prev.strength.base! + prev.strength.bonus!
        },
        dexterity: {
          ...prev.dexterity,
          applied: 0,
          total: prev.dexterity.base! + prev.dexterity.bonus!
        },
        vitality: {
          ...prev.vitality,
          applied: 0,
          total: prev.vitality.base! + prev.vitality.bonus!
        },
        energy: {
          ...prev.energy,
          applied: 0,
          total: prev.energy.base! + prev.energy.bonus!
        }
      }

      return newState;
    }

    case 'INIT':
      return action.payload!.initialState!;

    default:
      return prev;
  }
}