import { useContext, useEffect, useRef } from "react";
import Attr from "./Attr";
import { PlannerContext } from "pages/Planner";
import { questsRewardsReducer } from "reducers/quests";
import { PointsRemaining, StatsWrapper, Wrapper } from "./attrs.styles";
import GoldenFrame from "components/ui/GoldenFrame";

export default function Attrs() {

  const { charLevel, quests, attrs, dispatchAttrs, attrPoints, setAttrPoints, skillPoints } = useContext(PlannerContext);
  const attrPointsAppied = useRef(0);

  useEffect(() => {
    attrPointsAppied.current = Object.values(attrs).map(a => a.applied).reduce((a, b) => a + b, 0);
  }, [attrs]);

  useEffect(() => {
    let levelFactor = charLevel - 1;

    let levelAttrPts = levelFactor * 5;
    let questsAttrPts = questsRewardsReducer(quests, 'ATTRS');
    let attrPtsCalc = levelAttrPts + questsAttrPts - attrPointsAppied.current;

    if (attrPtsCalc < 0) {
      dispatchAttrs({
        type: 'RESET'
      })
    } else {
      setAttrPoints(attrPtsCalc);
    }

  }, [charLevel, quests, attrs, dispatchAttrs, setAttrPoints])

  return (
    <Wrapper>
      <StatsWrapper as={GoldenFrame}>
        <Attr attr="strength" />
        <Attr attr="dexterity" />
        <Attr attr="vitality" />
        <Attr attr="energy" />
      </StatsWrapper>
      
      <PointsRemaining>
        <span><strong>{skillPoints}</strong> Skill Pts</span> <hr/> <span><strong>{attrPoints}</strong> Attribute Pts</span>
      </PointsRemaining>
    </Wrapper>
  )
}