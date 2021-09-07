import { useContext, useEffect, useReducer, useState } from "react"
import { PlannerContext } from "../../pages/Planner";
import skillQuestsInit from "../../config/skillQuests";
import reduceSkillQuests from "../../reducers/skillQuests";
import '../planner/stgOne.scss';

export default function StgOne() {
  //context: planner
  const {
    characterLevel, setCharacterLevel,
    totalSkillPointsRemaining, setTotalSkillPointsRemaining,
    setPlannerTabs
  } = useContext(PlannerContext);

  //state: character level input value
  const [levelInputValue, setLevelInputValue] = useState('');

  //state: skill quests
  const [skillQuests, dispatchSkillQuests] = useReducer(reduceSkillQuests, skillQuestsInit);

  //state: toggle quests selection
  const [toggleAllQuests, setToggleAllQuests] = useState(false);

  //fn: handle character level fn
  function handleCharacterLevel(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //first, reset input val...
    setLevelInputValue('');

    //then, set values if regex test returns true
    if (/^([1-9][0-9]?){1,2}$/g.test(levelInputValue)) {
      setCharacterLevel(Number(levelInputValue));
      setLevelInputValue(levelInputValue.toString());
    }
  }

  //fn: reset character level
  function resetCharacterLevel() {
    setCharacterLevel(1);
    setLevelInputValue('');
  }

  //watch: skill quests selection
  useEffect(() => {
    let allQuests = skillQuests.flatMap(s => s.quests);
    allQuests.some(q => q.active === false) && setToggleAllQuests(false);
    allQuests.every(q => q.active === true) && setToggleAllQuests(true);
  }, [skillQuests]);

  //watch: skill points remaining
  useEffect(() => {
    let selectedQuests = skillQuests
      .flatMap(s => s.quests)
      .filter(q => q.active === true)
      .map(q => q.adds);

    let selectedQuestsReduced = selectedQuests.length ? selectedQuests.reduce((accumulator: number, currentValue: number) => accumulator + currentValue) : 0;

    setTotalSkillPointsRemaining(selectedQuestsReduced + characterLevel - 1);
  }, [skillQuests, characterLevel, setTotalSkillPointsRemaining]);


  return (
    <>
      <h3 className="stage-title">Character Level</h3>

      <div className="stage-character-level">
        {characterLevel > 1 ?
          <div className="level-result">
            <div className="result">{characterLevel}</div>
            <button type="reset" className="btn btn-red" onClick={resetCharacterLevel}>reset</button>
          </div>
          :
          <form className="level-form" onSubmit={handleCharacterLevel}>
            <div className="tooltip tooltip-focus tooltip-center" data-tooltip="1 to 99">
              <input
                type="number"
                placeholder="00"
                value={levelInputValue}
                onChange={(e) => setLevelInputValue(e.target.value)}
                required={true}
                max="99"
                min="1"
              />
            </div>
            <button type="submit" className="btn btn-blue">OK</button>
          </form>
        }
      </div>

      <div className="divider" />

      <h3 className="stage-title">Skill Quests</h3>
      <p className="stage-desc">
        ...aqui vai um textinho descritivo...
      </p>

      <div className="stage-skill-quests">
        <div className="difficulties">
          {skillQuests.map(({ diff, quests }) =>
            <div className="diff" key={diff}>
              <h4 className="diff-header">{diff}</h4>
              <div className="quests">
                {quests.map(quest => {
                  return (
                    <label className="quest" key={quest.name}>
                      <input type="checkbox" checked={quest.active} onChange={() => dispatchSkillQuests({
                        type: 'TOGGLE',
                        payload: {
                          diff: diff,
                          quest: quest.name
                        }
                      })} />
                      <div className="quest-description">
                        <div className="desc-name">{quest.name}</div>
                        <small className="desc-details">{`Act ${quest.act}, +${quest.adds} skills`}</small>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="quests-toggle-controller">
          <label>
            <input
              type="checkbox"
              checked={toggleAllQuests}
              onChange={() => dispatchSkillQuests({ type: 'TOGGLEALL' })}
            />
            Select all quests?
          </label>
        </div>
      </div>

      <div className="divider" />

      <div className="stage-total-skill-points-remaining">
        You have <strong className="result">{totalSkillPointsRemaining}</strong> skill points reamaining
      </div>
    </>
  )
}
