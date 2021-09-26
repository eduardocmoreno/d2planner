interface IGearProps extends IAttrs {
  allAttrs?: number;
}

interface IGear {
  type: 'ARMOR' | 'WEAPON' | 'AMULET' | 'RING';
  props: IGearProps;
}