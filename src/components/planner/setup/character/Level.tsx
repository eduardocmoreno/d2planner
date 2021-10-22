import { useContext, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import GoldenFrame, { FrameContent, FrameLabel } from "components/ui/GoldenFrame";
import Button from "components/ui/Button";
import Tooltip from "components/ui/Tooltip";
import { Input } from "components/ui/Input";

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
              <LevelInput
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
        <Button big red onClick={reset}>respec</Button>
        :
        <Button big blue form="char-level-form">OK</Button>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${GoldenFrame}{
    flex-direction: column;
  };
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

const LevelInput = styled(Input)`
  padding: 0;
  font-size: 4rem;
  text-align: center;
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
