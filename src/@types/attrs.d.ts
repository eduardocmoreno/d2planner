interface IAttrs {
  'strength'?: number;
  'dexterity'?: number;
  'vitality'?: number;
  'energy'?: number;
}

interface IAttrProps {
  base?: number;
  bonus?: number;
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
  type: 'ADD' | 'SUB' | 'BONUS' | 'INIT' | 'RESET';
  payload?: {
    attr?: keyof IAttrs;
    batch?: number;
    initialState?: IAttrsState;
  }
}