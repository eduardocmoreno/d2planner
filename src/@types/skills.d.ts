//skill
interface ISk {
  id: number;
  name: string;
  effect: string;
  points: number;
  reqLvl: number;
  preReq: number[],
  postReq: number[],
  attibutes: {
    name: string;
    func: number;
    params: number[];
    unit?: string;
  }[],
  synergies?: {
    id: number;
    bonus: string;
    adds: number;
  }[]
};

//skill reducer action
interface ISkRdAct {
  type: 'INIT' | 'INCREMENT' | 'DECREMENT' | 'RESET';
  payload: {
    id: number;
    qty: number;
    initialState: ISk[]
  }
}