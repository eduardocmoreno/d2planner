import { MouseEvent, useContext, useEffect } from "react";
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import GoldenFrame, { FrameContent, FrameLabel } from "components/ui/GoldenFrame";
import Button from "components/ui/Button";
import Tooltip from "components/ui/Tooltip";
import { gearsAttrReducer } from "reducers/gears";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: var(--spacing-md);
  border: 2px solid;
  border-color: var(--golden-border);
  ${Button}{
    padding-right: 0;
    padding-left: 0;
    border: 0;
    text-transform: none;
    :not(:first-child){
      border-left: 2px solid var(--color-gold-800);
    }
  }
`;

const Label = styled(FrameLabel)`
  font-size: 1.2rem;
`;

const StatResults = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-family: var(--font-family-main);
  font-size: 2.2rem;
  line-height: 1;
  .active {
    color: var(--color-gold);
    font-size: 2.7rem;
  }
`;

let active = false;


export default function Attr({ attr }: { attr: keyof IAttrsState }) {

  const { attrs, dispatchAttrs, attrPoints, setAttrPoints, gears } = useContext(PlannerContext);
  const { total, applied, bonnus, base } = attrs[attr];

  useEffect(() => {
    dispatchAttrs({
      type: 'BONNUS',
      payload: {
        attr,
        prop: 'bonnus',
        batch: gearsAttrReducer(attr, gears)
      }
    });
  }, [gears, dispatchAttrs]);

  function handleClick(e: MouseEvent<HTMLButtonElement>, type: IAttrsReducer['type']) {

    console.log(type);

    let batch = e.shiftKey ? 10 : 1;

    let source = 0;
    let factor = 1;

    if (type === 'ADD') {
      source = attrPoints;
      factor = -1;
    }

    if (type === 'SUB') {
      source = applied!;
    }

    if(source > 0) {
      batch = batch > source ? source : batch;
    } else {
      return;
    }

    setAttrPoints(prev => prev + (batch * factor));

    dispatchAttrs({
      type,
      payload: {
        attr,
        prop: "applied",
        batch: batch
      }
    });

  }

  let extraPointsFromGear = gears.filter(g => g.props[attr] || g.props.allAttrs);

  function extraPoints() {
    let gearArr = extraPointsFromGear;
    let result = ``;

    if (gearArr.length) {
      result += `Bonnus from:\n`;
      gearArr.forEach((g, i) => {
        result += `${g.type}: +${g.props[attr] || g.props.allAttrs}`;
        i + 1 !== gearArr.length && (result += `\n`)
      });
    }

    return result;
  }

  const htmlAttrs = extraPointsFromGear.length ? {
    as: Tooltip,
    center: true,
    'data-tooltip': extraPoints()
  } : {};

  return (
    <Wrapper>
      <GoldenFrame {...htmlAttrs}>
        <Label>{attr}</Label>
        <FrameContent>
          <StatResults>
            <strong className={active ? 'active' : ''}>{total}</strong>
            <div>{base}</div>
          </StatResults>
        </FrameContent>
      </GoldenFrame>

      <ButtonsWrapper>
        <Button blue arrowLeft onClick={(e) => handleClick(e, 'ADD')}>t</Button>
        <Button blue noArrows onClick={(e) => handleClick(e, 'SUB')}>-</Button>
        <Button red arrowRight>0</Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}
