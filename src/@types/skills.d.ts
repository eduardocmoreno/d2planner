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
    func: number;
    params: number[];
    unit?: string;
  }[];

  synergies?: {
    id: number;
    bonus: string;
    adds: number;
  }[];
};

//skill tabs
interface ISkillTab {
  id: number;
  name: string;
  map: number[];
  active: boolean;
}

//skill reducer action
interface ISkillsAction {
  type: 'INIT' | 'INCREMENT' | 'DECREMENT' | 'RESET';
  payload: {
    id?: number;
    qty?: number;
    initialState?: ISkill[];
  }
}