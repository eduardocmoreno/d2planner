interface IAttrs {
  'strength'?: number;
  'dexterity'?: number;
  'vitality'?: number;
  'energy'?: number;
}

interface IAttrProps {
  base?: number;
  bonnus?: number;
  applied?: number;
  total?: number;
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

interface IAttrsReducer {
  type: 'ADD' | 'SUB' | 'BONNUS' | 'INIT' | 'RESET';
  payload?: {
    attr?: keyof IAttrs;
    prop?: keyof IAttrProps;
    batch?: number;
    initialState?: IAttrsState;
  }
}