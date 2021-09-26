export default function attrsReducer(prev: IAttrsState, action: IAttrsReducer) {
  const { attr, prop } = action.payload!;
  const props = prev[attr!];

  let batch = action.payload?.batch || 0;

  switch (action.type) {
    case 'ADD':
    case 'SUB': {
      batch = action.type === 'SUB' ? batch * -1 : batch;

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

    case 'RESET':
      return action.payload!.initialState!;

    default:
      return prev;
  }
}