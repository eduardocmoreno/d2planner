import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  margin-top: 2em;
`;

const listHoverEffect = css`
  user-select: none;
  transition: var(--duration-fast);
  &:hover {
    cursor: pointer;
    color: var(--color-gold);
    text-shadow: 0 0 10px rgba(var(--color-gold-rgb), 0.5);
  }
`;

const List = styled.div`
  padding: 0 0.7em 0.7em;
  background: rgba(0 0 0 / 0.3);
`;

const Item = styled.div(({ head }: { head?: boolean }) => css`
  display: grid;
  grid-template-columns: 1.5fr 0.7fr 1fr 0.5fr;
  &:not(:first-child) {
    margin-top: 1em;
  }
  ${head && css`
    margin-bottom: 0.5em;
    padding: 0.7em 0 0.5em;
    border-bottom: 1px solid var(--color-gold);
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    ${Difficulty} {
      ${listHoverEffect}
    }
  `}
`);

const Description = styled.div`
  color: var(--color-gold);
  ${listHoverEffect}
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3em;
  font-size: 1.4rem;
`;

const Details = styled.small`
  display: block;
  color: var(--color-blue);
  font-size: 1.2rem;
  font-style: italic;
`;

const Difficulty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleController = styled.div`
  margin-top: 1.5em;
  color: $gold;
  text-align: center;
  user-select: none;
  input {
    margin-right: 0.5em;
  }
`;

export default function Quests() {
  const { quests, dispatchQuests } = useContext(PlannerContext);
  const [toggleAllQuests, setToggleAllQuests] = useState(false);

  useEffect(() => {
    setToggleAllQuests(quests.flatMap(q => q.difficulty).every(q => q.active === true) ? true : false);
  }, [quests]);

  return (
    <Wrapper>
      <List>
        <Item head>
          <Description />
          {['normal', 'nightmare', 'hell'].map(diff => {
            return (
              <Difficulty
                key={diff}
                onClick={() => dispatchQuests({
                  type: 'TOGGLEBYDIFFICULTY',
                  payload: {
                    difficulty: diff
                  }
                })}
              >{diff}</Difficulty>
            )
          })}
        </Item>
        {quests.map(({ name, act, adds, reward, difficulty }) => {
          return (
            <Item key={name}>
              <Description onClick={() => dispatchQuests({
                type: 'TOGGLEBYQUEST',
                payload: {
                  quest: name
                }
              })}>
                <Name>{`ACT ${act}: ${name}`}</Name>
                <Details className="desc-details">
                  {`+${adds} ${reward === 'ATTRS' ? 'Attribute' : 'Skill'} points`}
                </Details>
              </Description>
              {difficulty.map(({ level, active }) => {
                return (
                  <Difficulty as="label" key={level}>
                    <input type="checkbox" checked={active} onChange={() => dispatchQuests({
                      type: 'TOGGLE',
                      payload: {
                        difficulty: level,
                        quest: name
                      }
                    })} />
                  </Difficulty>
                )
              })}
            </Item>
          )
        })}
      </List>

      <ToggleController>
        <label>
          <input
            type="checkbox"
            checked={toggleAllQuests}
            onChange={() => dispatchQuests({ type: 'TOGGLEALL' })}
          />
          Select all quests?
        </label>
      </ToggleController>
    </Wrapper>
  )
}
