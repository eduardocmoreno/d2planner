import { MouseEvent, useContext } from "react";
import { PlannerContext } from "pages/Planner";
import Tooltip from "components/ui/Tooltip";
import { ButtonsWrapper, Wrapper } from "./attr.styles";
import { Results } from "./character.styles";
import { FrameLabel } from "components/ui/GoldenFrame";

export default function Attr({ attr }: { attr: keyof Attrs }) {
  const { charLevel, attrs, dispatchAttrs, attrPoints, setAttrPoints } = useContext(PlannerContext);
  const { total, applied, base } = attrs[attr];

  function handleClick(e: MouseEvent<HTMLElement>, type: AttrsReducer['type']) {
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
    dispatchAttrs({ type, payload: { attr, batch } });
  }

  let tooltipDetails = `Base: ${base}${applied! > 0 ? `\nSpent Points: ${applied}` : ''}\n`;

  const tooltipAttrs = {
    as: Tooltip,
    center: true,
    'data-tooltip': tooltipDetails
  };

  let titleHtmlAttr = 'Hold shift to +/- 10 points, Hold ctrl/cmd to +/- all remaining points';

  return (
    <Wrapper {...(!!applied && tooltipAttrs)}>
      <FrameLabel>{attr}</FrameLabel>
      
      <Results isActive={total! > base!}>
        {total! > base! ? total : base}
      </Results>
      
      {charLevel > 1 &&
        <ButtonsWrapper>
          <button title={titleHtmlAttr} onClick={(e) => handleClick(e, 'ADD')} ><i className="icon-plus" /></button>
          <button title={titleHtmlAttr} onClick={(e) => handleClick(e, 'SUB')} ><i className="icon-dash" /></button>
        </ButtonsWrapper>
      }
    </Wrapper>
  )
}