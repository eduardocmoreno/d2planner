import { useContext, useEffect, useReducer, useState } from "react";
import { PlannerContext } from "pages/Planner";
import questsInit from "config/quests";
import reduceQuests from "reducers/quests";

export default function Quests() {
  //context: planner
  const { level, setAttrPoints, setSkillPoints } = useContext(PlannerContext);

  //state: quests
  const [quests, dispatchQuests] = useReducer(reduceQuests, questsInit);

  //state: toggle quests selection
  const [toggleAllQuests, setToggleAllQuests] = useState(false);

  //watch: toggle all quests selection
  useEffect(() => {
    setToggleAllQuests(quests.flatMap(q => q.difficulty).every(q => q.active === true) ? true : false);
  }, [quests]);

  //watch: skill/stts points remaining
  useEffect(() => {
    const reduceQuestsRewards = (reward: IQuest['reward']) => {
      return quests
        .filter(q => q.reward === reward)
        .map(q => {
          let diffCount = q.difficulty.filter(d => d.active === true).length;
          return diffCount * q.adds;
        })
        .reduce((a: number, b: number) => a + b, 0);
    };

    setSkillPoints(reduceQuestsRewards('skill') + level - 1);
    setAttrPoints(reduceQuestsRewards('stat') + (level - 1) * 5);
  }, [quests, level, setSkillPoints, setAttrPoints]);

  return (
    <>
      <div className="stage-quests">
        <div className="quests-list">
          <div className="list-item list-head">
            <div className="item-description" />
            {['normal', 'nightmare', 'hell'].map(diff => {
              return (
                <div
                  className="item-difficulty"
                  key={diff}
                  onClick={() => dispatchQuests({
                    type: 'TOGGLEBYDIFFICULTY',
                    payload: {
                      difficulty: diff
                    }
                  })}
                >{diff}</div>
              )
            })}
          </div>
          {quests.map(({ name, act, adds, reward, difficulty }) => {
            return (
              <div className="list-item" key={name}>
                <div
                  className="item-description"
                  onClick={() => dispatchQuests({
                    type: 'TOGGLEBYQUEST',
                    payload: {
                      quest: name
                    }
                  })}>
                  <div className="desc-name">{`ACT ${act}: ${name}`}</div>
                  <small className="desc-details">
                    {`+${adds} ${reward} points`}
                  </small>
                </div>
                {difficulty.map(({ level, active }) => {
                  return (
                    <label className="item-difficulty" key={level}>
                      <input type="checkbox" checked={active} onChange={() => dispatchQuests({
                        type: 'TOGGLE',
                        payload: {
                          difficulty: level,
                          quest: name
                        }
                      })} />
                    </label>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="quests-toggle-controller">
          <label>
            <input
              type="checkbox"
              checked={toggleAllQuests}
              onChange={() => dispatchQuests({ type: 'TOGGLEALL' })}
            />
            Select all quests?
          </label>
        </div>
      </div>
    </>
  )
}
