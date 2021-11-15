import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { Stage, StagesWrapper } from "./stages.styles";

export default function Stages() {
  const { planner } = useContext(PlannerContext);

  return (
    <StagesWrapper>
      {planner.map(({ id, Component, isActive }) => {
        return (
          <Stage isActive={isActive} key={id}>
            <Component />
          </Stage>
        )
      })}
    </StagesWrapper>
  )
}


