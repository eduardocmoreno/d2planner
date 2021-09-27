export default function attrsReducer(prev: IAttrsState, action: IAttrsReducer) {

  if (action.type === 'ADD' || action.type === 'SUB' || action.type === 'BONNUS') {
    const { attr, prop } = action.payload!;
    const props = prev[attr!];

    let batch = action.payload?.batch || 0;
    batch = action.type === 'SUB' ? batch * -1 : batch;

    switch (action.type) {
      case 'ADD':
      case 'SUB': {
        return {
          ...prev,
          [attr!]: {
            ...props,
            [prop!]: props[prop!]! + batch,
            total: props.base! + props.applied! + props.bonnus! + batch
          }
        };
      }

      case 'BONNUS': {
        return {
          ...prev,
          [attr!]: {
            ...props,
            bonnus: batch,
            total: props.base! + props.applied! + batch
          }
        };
      }
    }
  } else {
    switch (action.type) {
      case 'RESET': {
        const reset: IAttrsState = {
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

        return reset;
      }

      case 'INIT':
        return action.payload!.initialState!;

      default:
        return prev;
    }
  }

}