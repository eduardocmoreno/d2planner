export default function attrsReducer(prev: IAttrsState, action: IAttrsReducer) {

  switch (action.type) {
    case 'ADD':
    case 'SUB': {
      const { attr, batch } = action.payload!;
      const { base, applied, bonnus } = prev[attr!];

      const factor = action.type === 'SUB' ? -1 : 1;

      const newState: IAttrsState = {
        ...prev,
        [attr!]: {
          ...prev[attr!],
          applied: applied! + batch! * factor,
          total: base! + applied! + bonnus! + batch! * factor
        }
      };

      return newState;
    }

    case 'BONNUS': {
      const { attr, batch } = action.payload!;
      const { base, applied } = prev[attr!];

      const newState: IAttrsState = {
        ...prev,
        [attr!]: {
          ...prev[attr!],
          bonnus: batch,
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
          total: prev.strength.base! + prev.strength.bonnus!
        },
        dexterity: {
          ...prev.dexterity,
          applied: 0,
          total: prev.dexterity.base! + prev.dexterity.bonnus!
        },
        vitality: {
          ...prev.vitality,
          applied: 0,
          total: prev.vitality.base! + prev.vitality.bonnus!
        },
        energy: {
          ...prev.energy,
          applied: 0,
          total: prev.energy.base! + prev.energy.bonnus!
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