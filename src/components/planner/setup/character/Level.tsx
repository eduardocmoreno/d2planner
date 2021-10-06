import { useContext, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import GoldenFrame, { FrameContent, FrameLabel } from "components/ui/GoldenFrame";
import Button from "components/ui/Button";
import Tooltip from "components/ui/Tooltip";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${FrameContent} {
    form {
      flex: 1;
      display: flex;
    }
  }
  ${Button} {
    margin-top: var(--spacing-md);
  }
`;

const Input = styled.input`
  --inner-glow: inset 0 0 15px rgba(0 0 0 / .5);
  flex: 1;
  font-size: 4rem;
  text-align: center;
  background: rgba(0 0 0 / .3);
  box-shadow: var(--inner-glow);
  :focus{
    box-shadow: var(--inner-glow), 0 0 .15em rgba(var(--color-blue-rgb), .5);
  }
`;

const Result = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
  font-family: var(--font-family-main);
  font-weight: bold;
  font-size: 5rem;
  letter-spacing: -.15em;
  text-indent: -.15em;
`;

export default function Level() {
  const { charLevel, setCharLevel } = useContext(PlannerContext);
  const [inputValue, setInputValue] = useState('');

  //fn: handle form submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setInputValue('');

    if (/^([1-9][0-9]?){1,2}$/g.test(inputValue)) {
      setCharLevel(parseInt(inputValue));
      setInputValue(inputValue);
    }
  }

  //fn: reset character
  function reset() {
    setCharLevel(1);
    setInputValue('');
  }

  return (
    <Wrapper>
      <Tooltip as={GoldenFrame} data-tooltip="1 to 99" center focus>
        <FrameLabel>Level</FrameLabel>
        <FrameContent>
          {charLevel > 1 ?
            <Result>{charLevel}</Result>
            :
            <form id="char-level-form" onSubmit={handleSubmit}>
              <Input
                type="number"
                placeholder="00"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required={true}
                max={99}
                min={1}
              />
            </form>
          }
        </FrameContent>
      </Tooltip>

      {charLevel > 1 ?
        <Button red onClick={reset}>respec</Button>
        :
        <Button blue form="char-level-form">OK</Button>
      }
    </Wrapper>
  )
}
