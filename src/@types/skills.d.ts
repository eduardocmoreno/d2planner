//skill
interface ISkill {
  id: number;
  name: string;
  effect: string;
  points: number;
  reqLvl: number;
  preReq: number[];
  postReq: number[];

  attibutes: {
    name: string;
    info: string;
    func: number;
    params: number[] | {
      min: number[];
      max: number[];
    };
    unit?: Unit;
    prefix:? string;
    value: number | {
      min: number;
      max: number;
    };
  }[];

  synergies?: {
    id: number;
    bonus: string;
    info: string;
    adds: number;
  }[];
};

//skill trees
interface ISkillTree {
  id: number;
  name: string;
  map: number[];
  isActive: boolean;
}

type Unit = 'yards' | 'seconds' | 'percent' | 'points' | 'hits';

//skill reducer action
interface ISkillsReducer {
  type: 'INIT' | 'INCREMENT' | 'DECREMENT' | 'RESET';
  payload?: {
    id?: number;
    batch?: number;
    initialState?: ISkill[];
  }
}