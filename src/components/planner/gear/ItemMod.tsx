import React, { useContext, useEffect, useRef, useState } from "react"
import { PlannerContext } from "pages/Planner";
import { capitalize } from "helpers";
import { Input, Mod, Remove, Wrapper } from "./ItemMod.styles";
import Tooltip from "components/ui/Tooltip";
import { GearContext } from "./Gear";

export default function ItemMod({ mod, setItemMods }: {
  mod: keyof IGearMods;
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>
}) {
  const { charClass } = useContext(PlannerContext);
  const { mods } = useContext(GearContext);

  const [input, setInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const modDescr = useRef(mods[mod]!);

  const sign = modDescr.current.match(/-|\+/g);
  const unit = modDescr.current.match(/%/g);

  const splitStr = useRef(
    modDescr.current
      .replace(/-|\+/g, `<span class="sign">${sign}</span>`)
      .replace(/%/g, `<span class="unit">${unit}</span>`)
      .replace('{charClass}', capitalize(charClass))
      .split(/\{\w\}/g)
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.insertAdjacentHTML('beforebegin', splitStr.current[0]);
    inputRef.current?.insertAdjacentHTML('afterend', splitStr.current[1]);
  }, [splitStr]);

  return (
    <Wrapper>
      <Mod>
        <Input
          type="text"
          placeholder="00"
          ref={inputRef}
          width={input.length * .55}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && inputRef.current?.blur()}
          onBlur={e => setItemMods(prev => {
            return {
              ...prev,
              [mod]: parseInt(e.target.value)
            }
          })} />
      </Mod>
      <Remove
        center
        as={Tooltip}
        data-tooltip="Remove Mod?"
        onClick={() => setItemMods(prev => {
          const { [mod]: modValue, ...mods } = prev;
          return mods as IGearMods;
        })}>
        <i className="icon-close"></i>
      </Remove>
    </Wrapper>
  );
};