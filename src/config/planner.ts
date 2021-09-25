import Setup from 'components/planner/setup/Index';
import Skills from 'components/planner/skills/Index';
import Gear from 'components/planner/gear/Index';
import Output from 'components/planner/output/Index';

const plannerInit: IPlanner[] = [
  {
    id: 1,
    name: 'Setup',
    Component: Setup,
    isActive: true
  },
  {
    id: 2,
    name: 'Skills',
    Component: Skills,
    isActive: false
  },
  {
    id: 3,
    name: 'Gear',
    Component: Gear,
    isActive: false
  },
  {
    id: 4,
    name: 'Output',
    Component: Output,
    isActive: false
  }
]

export default plannerInit;