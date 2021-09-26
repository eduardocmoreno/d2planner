import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";

export default function Quests() {
  //context: planner
  const { quests, dispatchQuests } = useContext(PlannerContext);

  //state: toggle quests selection
  const [toggleAllQuests, setToggleAllQuests] = useState(false);

  //watch: toggle all quests selection
  useEffect(() => {
    setToggleAllQuests(quests.flatMap(q => q.difficulty).every(q => q.active === true) ? true : false);
  }, [quests]);

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
