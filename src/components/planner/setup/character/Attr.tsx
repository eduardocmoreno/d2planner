import { MouseEvent, useContext, useEffect } from "react";
import { PlannerContext } from "pages/Planner";
import { capitalize, getItemMod } from "helpers";
import Tooltip from "components/ui/Tooltip";
import { ButtonsWrapper, Wrapper } from "./attr.styles";
import { Results } from "./character.styles";
import { FrameLabel } from "components/ui/GoldenFrame";

export default function Attr({ attr }: { attr: keyof IAttrs }) {
  const { charLevel, attrs, dispatchAttrs, attrPoints, setAttrPoints, gear } = useContext(PlannerContext);
  const { total, applied, base } = attrs[attr];

  const attrModsFiltered = gear.filter(g => getItemMod(g.mods, attr)?.value || getItemMod(g.mods, 'allAttrs')?.value || getItemMod(g.mods, `${attr}/lvl` as TGearModName)?.value);

  const attrModsReduced = attrModsFiltered
    .map(g =>
      (getItemMod(g.mods, attr)?.value || 0) +
      (getItemMod(g.mods, 'allAttrs')?.value || 0) +
      Math.floor((getItemMod(g.mods, `${attr}/lvl` as TGearModName)?.value || 0) * charLevel)
    )
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

  if (attrModsFiltered.length > 0) {
    attrModsFiltered.forEach((g, i) => {
      tooltipDetails += `${capitalize(g.slot)}: +${(getItemMod(g.mods, attr)?.value || 0) + (getItemMod(g.mods, 'allAttrs')?.value || 0) + Math.floor((getItemMod(g.mods, `${attr}/lvl` as TGearModName)?.value || 0) * charLevel)}`;
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
    <Wrapper {...((attrModsFiltered.length > 0 || applied! > 0) && tooltipAttrs)}>
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