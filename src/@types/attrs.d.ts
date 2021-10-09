interface IAttrProps {
  base?: number;
  bonus?: number;
  applied?: number;
  total?: number;
}

interface IAttrs {
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
    initialState?: IAttrs;
  }
}