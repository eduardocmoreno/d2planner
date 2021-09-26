import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { SectionTitle } from "components/ui/Headings";


export default function Skills() {
  //context
  const { characterData, skillPoints } = useContext(PlannerContext);

  //state
  const [skillTabs, setSkillTabs] = useState([] as ISkillTab[]);
  const [skillPointsRemaining, setSkillPointsRemaining] = useState(0);

  useEffect(() => {
    setSkillTabs(characterData.tabs);
    setSkillPointsRemaining(skillPoints);
  }, [characterData, skillPoints]);


  function handleTabs(id: number) {
    setSkillTabs(prevState => prevState.map(t => {
      return {
        ...t,
        active: t.id === id ? true : false
      };
    }));
  }

  return (
    <>
      <SectionTitle>skills</SectionTitle>

      <div className="stage-skills">
        <div className="skill-tabs">
          {skillTabs.map(({ id, name, active }) => {
            return (
              <h4
                className={`tab ${active ? 'active' : null}`}
                key={id}
                onClick={() => handleTabs(id)}
              >{name}</h4>
            )
          })}
        </div>
        <div className="skill-tree"></div>
        <div className="skill-panel">
          <div className="panel-points">
            <div className="points-remaining">pts rem: {skillPointsRemaining}</div>
          </div>
          <div className="divider" />
          <div className="panel-skill-details">
            <h4 className="skill-name">SACRIFICE</h4>
            <p className="skill-description">
              Increased accuracy and damage at the Cost of life
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
