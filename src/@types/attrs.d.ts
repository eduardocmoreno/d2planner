interface IAttrs {
  'strength'?: number;
  'dexterity'?: number;
  'vitality'?: number;
  'energy'?: number;
}

interface IAttrProps {
  total?: number;
  extras?: number;
  applied?: number;
  base?: number;
}

interface IAttrsState {
  strength: IAttrProps;
  dexterity: IAttrProps;
  vitality: IAttrProps;
  energy: IAttrProps;
}

interface IAttrPoints {
  total: number;
  remaining: number;
  byLevel: number;
  byQuests: number;
}

interface IAttrsAction {
  type: 'ADD' | 'SUB' | 'RESET';
  payload?: {
    attr?: keyof IAttrs;
    prop?: keyof IAttrProps;
    batch?: number;
    initialState?: IAttrsState;
  }
}