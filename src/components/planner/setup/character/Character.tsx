import { useContext, useEffect, useRef } from "react";
import { PlannerContext } from "pages/Planner";
import { Wrapper, PointsRemaining } from "./character.styles";
import Level from "./Level";
import Attr from "./Attr";
import GoldenFrame from "components/ui/GoldenFrame";
import { questsRewardsReducer } from "helpers";

export default function Character() {
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
      dispatchAttrs({ type: 'RESET' });
    } else {
      setAttrPoints(attrPtsCalc);
    }

  }, [charLevel, quests, attrs, dispatchAttrs, setAttrPoints]);

  return (
    <>
      <Wrapper as={GoldenFrame}>
        <Level />
        <Attr attr="strength" />
        <Attr attr="dexterity" />
        <Attr attr="vitality" />
        <Attr attr="energy" />
      </Wrapper>

      <PointsRemaining>
        <span><strong>{skillPoints}</strong> Skill Pts</span> <hr /> <span><strong>{attrPoints}</strong> Stat Pts</span>
      </PointsRemaining>
    </>
  )
}
