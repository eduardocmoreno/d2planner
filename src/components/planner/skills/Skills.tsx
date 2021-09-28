import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";

const StageWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  min-height: 10em;
  & > :nth-child(1){
    flex: 67.5%;
  }
  & > :nth-child(2){
    flex: 32.5%;
  }
  `;

const SkillsSection = styled.div`
  
`;

const DetailsSection = styled.div`
  background: blue;
`;

const SkillsTabs = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Tab = styled.div(({ active }: { active: boolean }) => css`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .4em;
  background: rgba(255 255 255 / .05);
  color: var(--color-gold);
  font-family: var(--font-family-main);
  font-size: 1.2rem;
  text-align: center;
  cursor: pointer;
  ${active && css`
    color: #fff;
    background: var(--color-gold);
    font-size: 1.4rem;
    box-shadow: inset 0 -.5em 1em rgba(0 0 0 / 0.5);
  `}
`);

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
    <StageWrapper>
      <SkillsSection>
        <SkillsTabs>
          {skillTabs.map(t =>
            <Tab active={t.active}>{t.name}</Tab>
          )}
        </SkillsTabs>
      </SkillsSection>

      <DetailsSection>details</DetailsSection>
      {/* <div className="stage-skills">
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
      </div> */}
    </StageWrapper>
  )
}
