export default function reduceAttrs(prev: IAttrsState, action: IAttrsAction) {
  switch (action.type) {
    case 'ADD': {
      const { attr, prop, batch } = action.payload!;
      const props = prev[attr!];

      return {
        ...prev,
        [attr!]: {
          ...props,
          [prop!]: props[prop!]! + batch!,
          total: props.base! + props.applied! + props.extras! + batch!
        }
      };
    }

    case 'SUB': {
      const { attr, prop, batch } = action.payload!;
      const props = prev[attr!];

      return {
        ...prev,
        [attr!]: {
          ...props,
          [prop!]: props[prop!]! - batch!,
          total: props.base! + props.applied! + props.extras! - batch!
        }
      };
    }

    case 'RESET':
      return action.payload!.initialState!;

    default:
      return prev;
  }
}