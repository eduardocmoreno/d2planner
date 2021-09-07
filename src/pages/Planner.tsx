import { useState, createContext } from "react";
import { useParams } from "react-router-dom";
import plannerTabsInit from "../config/plannerTabs";
import '../pages/planner.scss';

//context: planner tabs
export const PlannerContext = createContext<IPlannerContext>({} as IPlannerContext);

//component: planner
export default function Planner() {
  //route params: char class
  const characterClass = useParams<{ character: string }>().character;

  //state: char level
  const [characterLevel, setCharacterLevel] = useState(1);

  //state: planner tabs and stages
  const [plannerTabs, setPlannerTabs] = useState(plannerTabsInit);

  //state: total skill points
  const [totalSkillPointsRemaining, setTotalSkillPointsRemaining] = useState(0);

  //props: planner context props
  const plannerContextProps: IPlannerContext = {
    characterLevel, setCharacterLevel, totalSkillPointsRemaining, setTotalSkillPointsRemaining, plannerTabs, setPlannerTabs
  }

  //handle planner tabs
  const handlePlannerTabs = (id: number) => {
    setPlannerTabs(plannerTabs.map(t => {
      return {
        ...t,
        isActive: id === t.id ? true : false
      }
    }))
  }

  return (
    <div className="planner devil-box">
      <h2 className="box-main-title">{characterLevel > 1 && `Level ${characterLevel} `}{characterClass}</h2>
      <div className="planner-tabs">
        {plannerTabs.map(({id, name, isActive}) => {
          return (
            <div
              key={id}
              className={`tab ${isActive && 'active'}`}
              onClick={() => handlePlannerTabs(id)}
            >{name}</div>
          )
        })}
      </div>
      <div className="planner-stages">
        <PlannerContext.Provider value={plannerContextProps}>
          {plannerTabs.map(({id, className, Component, isActive}) => {
            return (
              <div
                className={`stage ${className} ${isActive && 'active'}`}
                key={id}
              >
                <Component />
              </div>
            )
            return null;
          })}
        </PlannerContext.Provider>
      </div>
    </div>
  )
}
