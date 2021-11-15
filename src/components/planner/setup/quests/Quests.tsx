import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { Description, Details, Difficulty, Item, List, Name, ToggleController, Wrapper } from "./quests.styles";



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
              <Difficulty key={diff}
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
          <input type="checkbox" checked={toggleAllQuests} onChange={() => dispatchQuests({ type: 'TOGGLEALL' })} />
          Select all quests?
        </label>
      </ToggleController>
    </Wrapper>
  )
}
