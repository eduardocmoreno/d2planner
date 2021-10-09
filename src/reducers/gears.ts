export const gearsAttrReducer = (prop: any, gears: any[]): number => {
  return gears
    .filter(g => g.props[prop] || g.props.allAttrs)
    .flatMap(g => g.props[prop] || g.props.allAttrs)
    .reduce((a, b) => a! + b!, 0) || 0;
}