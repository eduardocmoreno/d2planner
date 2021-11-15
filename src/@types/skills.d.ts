interface ISkill {
  id: number;
  name: string;
  effect: string;
  level: {
    points: number;
    bonus: {
      toAll: number;
      toClass: number;
      toTree: number;
      toSingle: number;
    };
    total: number;
  };
  tree: 1 | 2 | 3;
  levelReq: number;
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
    unit: TUnit;
    prefix: string;
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

type TUnit = 'yards' | 'seconds' | 'percent' | 'points' | 'hits';

//skill reducer action
interface ISkillsReducer {
  type: 'INIT' | 'INC_POINTS' | 'DEC_POINTS' | 'ALL_SKILLS' | 'CLASS_SKILLS' | 'TREE_SKILLS' | 'SINGLE_SKILL' | 'RESET';
  id?: number;
  batch?: number;
  initialState?: ISkill[];
}