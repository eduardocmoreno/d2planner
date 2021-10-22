import { gearMods } from "config/gear";
import { capitalize } from "helpers";
import { PlannerContext } from "pages/Planner";
import React, { useContext, useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components";

export default function ItemMod({ mod, setItemMods }: {
  mod: keyof IGearMods;
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>
}) {
  const { charClass } = useContext(PlannerContext);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modRef = useRef(mod);
  const modDescr = useRef(gearMods[mod]!);
  const sign = modDescr.current.match(/-|\+/g);
  const unit = modDescr.current.match(/%/g);
  const splitStr = useRef(modDescr.current
    .replace(/-|\+/g, `<span class="sign">${sign}</span>`)
    .replace(/%/g, `<span class="unit">${unit}</span>`)
    .replace('{charClass}', capitalize(charClass))
    .split(/\{\w\}/g));

  useEffect(() => {
    inputRef.current?.insertAdjacentHTML('beforebegin', splitStr.current[0]);
    inputRef.current?.insertAdjacentHTML('afterend', splitStr.current[1]);
  }, [splitStr]);

  return (
    <Mod >
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
            [modRef.current]: parseInt(e.target.value)
          }
        })} />
    </Mod>
  );
};

const Mod = styled.div`
  color: var(--color-blue);
  font-size: 1.6rem;
  .sign,
  .unit {
    color: var(--color-gold);
  }
`;

const Input = styled.input(({ width }: { width: number }) => css`
  width: ${width > 0 ? `${width}em` : '1.2em'};
  background: transparent;
  color: var(--color-gold);
  border-bottom: 1px dotted transparent;
  font-size: 1.8rem;
  line-height: 1.1;
  text-align: center;
  :hover,
  :focus{
    border-bottom-color: #222;
  }
`);