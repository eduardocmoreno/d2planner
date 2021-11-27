import React, { useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { FrameLabel } from "components/ui/GoldenFrame";
import Tooltip from "components/ui/Tooltip";
import { LevelInput, Wrapper } from "./level.styles";
import { Results } from "./character.styles";

export default function Level() {
  const { charLevel, setCharLevel } = useContext(PlannerContext);
  const [input, setInput] = useState('');
  const inputElem = useRef<HTMLInputElement>(null);

  const tooltipAttrs = {
    as: Tooltip,
    center: true,
    focus: true,
    'data-tooltip': "1 to 99"
  };

  //fn: handle form submit
  function handleSubmit() {
    setInput('');

    if (/^([1-9][0-9]?){1,2}$/g.test(input)) {
      setCharLevel(parseInt(input));
      setInput(input);
    }
  }

  //fn: reset character
  function reset() {
    setCharLevel(1);
    setInput('');
  }

  useEffect(() => { inputElem.current?.focus(); });

  return (
    <Wrapper {...tooltipAttrs}>
      <FrameLabel>Level</FrameLabel>
      {charLevel > 1 ?
        <>
          <Results isActive={charLevel > 1}>{charLevel}</Results>
          <Tooltip as="button" data-tooltip={`Are you sure?\nThis action will\nreset all hard-points\napplied to attributes\nand skills!`} onClick={reset}>RESPEC</Tooltip>
        </>
        :
        <Results isActive={false}>
          <LevelInput
            type="number"
            placeholder="..."
            ref={inputElem}
            value={input}
            onChange={e => setInput(e.target.value)}
            onBlur={e => handleSubmit()}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            required={true}
            max={99}
            min={1}
          />
        </Results>
      }
    </Wrapper>
  )
}