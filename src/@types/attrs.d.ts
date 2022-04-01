interface AttrProps {
  base?: number;
  bonus?: number;
  applied?: number;
  total?: number;
}

interface Attrs {
  strength: AttrProps;
  dexterity: AttrProps;
  vitality: AttrProps;
  energy: AttrProps;
}

interface AttrPoints {
  total: number;
  remaining: number;
  byLevel: number;
  byQuests: number;
}

interface AttrsReducer {
  type: 'ADD' | 'SUB' | 'BONUS' | 'INIT' | 'RESET';
  payload?: {
    attr?: keyof Attrs;
    batch?: number;
    initialState?: Attrs;
  }
}