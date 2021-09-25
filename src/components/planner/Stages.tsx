import { useContext } from "react";
import styled from "styled-components";
import { PlannerContext } from "pages/Planner";

const StagesWrapper = styled.div`
  padding: 2rem 2rem 4rem;
  background: rgba(0 0 0 / 0.3);
  border: solid var(--color-red-700);
  border-width: 2px 0;
`;

const Stage = styled.div`
  &:not(.active) {
    display: none;
  }
`;

export default function Stages() {
  const { planner } = useContext(PlannerContext);

  return (
    <StagesWrapper>
      {planner.map(({ id, Component, isActive }) => {
        return (
          <Stage className={isActive ? 'active' : ''} key={id}>
            <Component />
          </Stage>
        )
      })}
    </StagesWrapper>
  )
}
