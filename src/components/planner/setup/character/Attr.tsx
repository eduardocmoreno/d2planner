import { MouseEvent, useContext, useEffect } from "react";
import { PlannerContext } from "pages/Planner";
import GoldenFrame, { FrameContent } from "components/ui/GoldenFrame";
import Button from "components/ui/Button";
import Tooltip from "components/ui/Tooltip";
import { capitalize, getItemMod } from "helpers";
import { ButtonsWrapper, Label, Results, Wrapper } from "./attr.styles";

export default function Attr({ attr }: { attr: keyof IAttrs }) {
  const { attrs, dispatchAttrs, attrPoints, setAttrPoints, gear } = useContext(PlannerContext);
  const { total, applied, base } = attrs[attr];

  const attrModsFiltered = gear.filter(g => getItemMod(g.mods, attr)?.value || getItemMod(g.mods, 'allAttrs')?.value);

  const attrModsReduced = attrModsFiltered
    .map(g => getItemMod(g.mods, attr)?.value || getItemMod(g.mods, 'allAttrs')?.value)
    .reduce((a, b) => a! + b!, 0) || 0;

  useEffect(() => {
    dispatchAttrs({
      type: 'BONUS',
      payload: {
        attr,
        batch: attrModsReduced
      }
    });
  }, [attr, dispatchAttrs, attrModsReduced]);

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
    dispatchAttrs({ type, payload: { attr, batch } });
  }

  let tooltipDetails = `Base: ${base}${applied! > 0 ? `\nSpent Points: ${applied}` : ''}\n`;

  if (attrModsFiltered.length) {
    attrModsFiltered.forEach((g, i) => {
      tooltipDetails += `${capitalize(g.slot)}: +${getItemMod(g.mods, attr)?.value || getItemMod(g.mods, 'allAttrs')?.value}`;
      i + 1 !== attrModsFiltered.length && (tooltipDetails += `\n`)
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
        <Button blue big
          title={titleHtmlAttr}
          onClick={(e) => handleClick(e, 'ADD')}
          {...(applied! > 0 && { arrowLeft: true })}
          {...(attrPoints === 0 && { disabled: true })}
        ><i className="icon-plus" /></Button>

        {applied! > 0 &&
          <Button red big arrowRight
            title={titleHtmlAttr}
            onClick={(e) => handleClick(e, 'SUB')}
          ><i className="icon-dash" /></Button>
        }
      </ButtonsWrapper>
    </Wrapper>
  )
}