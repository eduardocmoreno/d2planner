import StgOne from "../components/planner/StgOne";
import StgTwo from "../components/planner/StgTwo";
import StgThree from "../components/planner/StgThree";
import StgFour from "../components/planner/StgFour";

//components
//stage 1 - Character Setup
//stage 2 - Skill Tree
//stage 3 - Stats and Gear
//stage 4 - Results

const plannerTabsInit: IPlannerTabs[] = [
  {
    id: 1,
    name: 'Character Setup',
    className: 'stage-one',
    Component: StgOne,
    isActive: true
  },
  {
    id: 2,
    name: 'Skill Tree',
    className: 'stage-two',
    Component: StgTwo,
    isActive: false
  },
  {
    id: 3,
    name: 'Stats and Gear',
    className: 'stage-three',
    Component: StgThree,
    isActive: false
  },
  {
    id: 4,
    name: 'Results',
    className: 'stage-four',
    Component: StgFour,
    isActive: false
  }
]

export default plannerTabsInit;