import { useContext, useEffect } from "react";
import styled from "styled-components";
import Attr from "./Attr";
import { PlannerContext } from "pages/Planner";
import { questsRewardsReducer } from "reducers/quests";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const PointsRemaining = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4em;
  font-size: 1.4rem;
  line-height: 1;
  white-space: nowrap;
  ::before,
  ::after {
    content: "";
    width: 100%;
    border-top: 1px dashed var(--color-gold);
  }
  strong {
    margin-right: .15em;
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 2rem;
  }
`;

const StatsWrapper = styled.div`
  flex: 1;
  display: grid;
  gap: 1.5em;
  grid-template-columns: repeat(4, 1fr);
`;


export default function Attrs() {

  const { level, quests, dispatchAttrs, attrPoints, setAttrPoints, attrPointsAppied } = useContext(PlannerContext);

  //watch: attributes points
  useEffect(() => {
    let levelFactor = level - 1;

    let levelAttrPts = levelFactor * 5;
    let questsAttrPts = questsRewardsReducer(quests, 'ATTRS');
    let attrPtsCalc = levelAttrPts + questsAttrPts - attrPointsAppied;

    if (attrPtsCalc < 0) {
      dispatchAttrs({
        type: 'RESET'
      })
    } else {
      setAttrPoints(attrPtsCalc);
    }

  }, [level, quests, attrPointsAppied, dispatchAttrs, setAttrPoints])

  return (
    <Wrapper>
      <PointsRemaining>
        <div><strong>{attrPoints}</strong> attribute points remaining</div>
      </PointsRemaining>
      <StatsWrapper>
        <Attr attr="strength" />
        <Attr attr="dexterity" />
        <Attr attr="vitality" />
        <Attr attr="energy" />
      </StatsWrapper>
    </Wrapper>
  )
}
