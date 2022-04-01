import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { Tab, Tabs } from "./tabs.styles";

export default function PlannerTabs() {
  //context: planner
  const { planner, setPlanner } = useContext(PlannerContext);

  //handle: tabs
  const handleTabs = (id: number) => {
    setPlanner(planner.map((t: Planner) => {
      return {
        ...t,
        isActive: id === t.id ? true : false
      }
    }))
  }

  return (
    <Tabs>
      {planner.map(({ id, name, isActive }: Planner) =>
        <Tab
          key={id}
          className={isActive ? 'active' : ''}
          onClick={() => handleTabs(id)}
        >{name}</Tab>
      )}
    </Tabs>
  )
}
