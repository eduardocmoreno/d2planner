import { useContext } from "react";
import styled from "styled-components";
import { PlannerContext } from "pages/Planner";
import Attr from "./Attr";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const PointsRemaining = styled.div`
  display: flex;
  gap: .5em;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  line-height: 1;
  white-space: nowrap;
  ::before,
  ::after {
    content: "";
    width: 100%;
    border-top: 1px dashed var(--color-gold);
  }
  strong {
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 2rem;
  }
  i {
    font-size: 1.4rem;
  }
`;

const StatsWrapper = styled.div`
  flex: 1;
  display: grid;
  gap: 1.5em;
  grid-template-columns: repeat(4, 1fr);
`;

export default function Attrs() {

  const ctxProps = useContext(PlannerContext);

  return (
    <Wrapper>
      <PointsRemaining>
        <strong>{ctxProps.attrPoints}</strong><i>attribute points remaining</i>
      </PointsRemaining>
      <StatsWrapper>
        <Attr name="strength" />
        <Attr name="dexterity" />
        <Attr name="vitality" />
        <Attr name="energy" />
      </StatsWrapper>
    </Wrapper>
  )
}
