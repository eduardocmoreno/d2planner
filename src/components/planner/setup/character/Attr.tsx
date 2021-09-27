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
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
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

const Results = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-family: var(--font-family-main);
  font-size: 2.2rem;
  line-height: 1;
  strong {
    color: var(--color-gold);
    font-size: 2.7rem;
  }
`;

export default function Attr({ attr }: { attr: keyof IAttrsState }) {
  const { attrs, dispatchAttrs, attrPoints, setAttrPoints, gears } = useContext(PlannerContext);
  const { total, applied, base } = attrs[attr];
  const gearBonuses = gears.filter(g => g.props[attr] || g.props.allAttrs);

  useEffect(() => {
    dispatchAttrs({
      type: 'BONNUS',
      payload: {
        attr,
        prop: 'bonnus',
        batch: gearsAttrReducer(attr, gears)
      }
    });
  }, [attr, gears, dispatchAttrs]);

  function handleClick(e: MouseEvent<HTMLButtonElement>, type: IAttrsReducer['type']) {
    let batch = 1;
    let source = 0;
    let factor = 1;

    if (type === 'ADD') {
      source = attrPoints;
      factor = -1;
    }

    if (type === 'SUB') source = applied!;

    if (e.shiftKey) batch = 10;

    if (e.ctrlKey) batch = source;

    if (source > 0) {
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

  function extraPoints() {
    let result = ``;

    if (gearBonuses.length) {
      result += `Gear Bonuses:\n`;
      gearBonuses.forEach((g, i) => {
        result += `${g.type}: +${g.props[attr] || g.props.allAttrs}`;
        i + 1 !== gearBonuses.length && (result += `\n`)
      });
    }

    return result;
  }

  const tooltipAttrs = gearBonuses.length ? {
    as: Tooltip,
    center: true,
    'data-tooltip': extraPoints()
  } : {};

  return (
    <Wrapper>
      <GoldenFrame {...tooltipAttrs}>
        <Label>{attr}</Label>
        <FrameContent>
          <Results>
            {total! > base! &&
              <strong>{total}</strong>
            }
            <div>{base}</div>
          </Results>
        </FrameContent>
      </GoldenFrame>

      <ButtonsWrapper>
        <Button blue {...(applied! > 0 && { arrowLeft: true })} onClick={(e) => handleClick(e, 'ADD')}>t</Button>
        {applied! > 0 &&
          <Button red arrowRight onClick={(e) => handleClick(e, 'SUB')}>&ndash;</Button>
        }
      </ButtonsWrapper>
    </Wrapper>
  )
}
