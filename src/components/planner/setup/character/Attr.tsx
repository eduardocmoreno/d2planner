import { MouseEvent, useContext, useEffect } from "react";
import styled from "styled-components";
import { PlannerContext } from "pages/Planner";
import GoldenFrame, { FrameContent, FrameLabel } from "components/ui/GoldenFrame";
import Button from "components/ui/Button";
import Tooltip from "components/ui/Tooltip";
import { capitalize } from "helpers";

export default function Attr({ attr }: { attr: keyof IAttrs }) {
  const { attrs, dispatchAttrs, attrPoints, setAttrPoints, gear } = useContext(PlannerContext);
  const { total, applied, base } = attrs[attr];

  const gearBonuses = gear.filter(g => g.mods[attr] || g.mods.allAttrs);

  useEffect(() => {
    dispatchAttrs({
      type: 'BONUS',
      payload: {
        attr,
        batch: gear.filter(g => g.mods[attr] || g.mods.allAttrs).map(g => g.mods[attr] || g.mods.allAttrs).reduce((a, b) => a! + b!, 0) || 0
      }
    });
  }, [attr, gear, dispatchAttrs]);

  function handleClick(e: MouseEvent<HTMLElement>, type: IAttrsReducer['type']) {
    let batch = 1;
    let source = 0;
    let factor = 1;

    if (type === 'ADD') {
      source = attrPoints;
      factor = -1;
    }

    if (type === 'SUB') source = applied!;

    if (e.shiftKey) batch = 10;

    if (e.ctrlKey || e.metaKey) batch = source;

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
        batch: batch
      }
    });
  }

  let tooltipDetails = `Base: ${base}${applied! > 0 ? `\nSpent: +${applied}` : ''}\n`;

  if (gearBonuses.length) {
    gearBonuses.forEach((g, i) => {
      tooltipDetails += `${capitalize(g.slot)}: +${g.mods[attr] || g.mods.allAttrs}`;
      i + 1 !== gearBonuses.length && (tooltipDetails += `\n`)
    });
  }

  const tooltipAttrs = {
    as: Tooltip,
    center: true,
    'data-tooltip': tooltipDetails
  };

  let titleHtmlAttr = 'Hold shift to +/- 10 points, Hold ctrl/cmd to +/- all remaining points';

  return (
    <Wrapper>
      <GoldenFrame {...tooltipAttrs}>
        <Label>{attr}</Label>
        <FrameContent>
          <Results>
            {total! > base! ? <span>{total}</span> : base}
          </Results>
        </FrameContent>
      </GoldenFrame>

      <ButtonsWrapper>
        <Button
          blue
          big
          title={titleHtmlAttr}
          onClick={(e) => handleClick(e, 'ADD')}
          {...(applied! > 0 && { arrowLeft: true })}
          {...(attrPoints === 0 && { disabled: true })}
        ><i className="icon-plus" /></Button>

        {applied! > 0 &&
          <Button
            red
            big
            arrowRight
            title={titleHtmlAttr}
            onClick={(e) => handleClick(e, 'SUB')}
          ><i className="icon-dash" /></Button>
        }
      </ButtonsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${GoldenFrame}{
    flex-direction: column;
  };
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: var(--spacing-md);
  ${Button}{
    flex: 1;
    padding-right: 0;
    padding-left: 0;
    :not(:first-child){
      flex: .5;
      border-left: 0;
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
  font-weight: bold;
  line-height: 1;
  span {
    color: var(--color-gold);
    font-size: 2.8rem;
  }
`;