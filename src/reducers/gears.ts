export const gearsAttrReducer = (attr: keyof IGearProps, gears: IGear[]) => {
  return gears
    .filter(g => g.props[attr] || g.props.allAttrs)
    .flatMap(g => g.props[attr] || g.props.allAttrs)
    .reduce((a, b) => a! + b!, 0);
}