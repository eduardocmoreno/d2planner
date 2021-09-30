import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";
import Tooltip from "components/ui/Tooltip";
import Tree from "./Tree";

//TODO: special behavior
//Smite gets Holy Shield damage
//ZEAL gets sacrifice damage value
//Blessed Aim The Passive Bonus is 5% Attack Rating bonus per hard point invested while the aura is not active.
//move the styled comp to a separated file?

//skill
// |-level
//   |-points --> comes from hard points applied
//   |-bonus --> comes from a reducer function*
//   |-total --> points and bonus reduced

//*SKILL POINTS BONUS (these points might be reduced in a separated function)
// -all --> to all skills
// -class --> to all class skills
// -tree --> to all tree skills
// -total --> reduced

//examples
//Sacrifice
// |-level
//   |-points: 15
//   |-bonus: 7*
//   |-total: 18

//*bonus points reduced
// -all: 2 --> no check needed
// -class: 2 --> no check needed
// -tree: 3 --> check if the skill includes in the selected tree
// -total: 7

export default function Skills() {
  const { characterData, level, skills, dispatchSkills, skillPoints } = useContext(PlannerContext);

  const [skillsTreesTabs, setSkillsTreesTabs] = useState([] as ISkillTree[]);
  const [skillIdOnHover, setSkillIdOnHover] = useState(0);
  const [skillSelected, setSkillSelected] = useState({} as ISkill);

  function handleTabs(id: number) {
    setSkillsTreesTabs(prevState => prevState.map(t => {
      return {
        ...t,
        isActive: t.id === id ? true : false
      };
    }));
  }

  function getUnit(unit: Unit): string {
    switch (unit) {
      case 'seconds':
        return 's';

      case 'yards':
        return ' yards'

      case 'percent':
        return '%';

      case 'points':
        return 'pts';

      case 'hits':
        return ' hits';

      default:
        return unit;
    }
  }

  function specialBehavior(skill: ISkill) {
    //25. Cleansing - Prayer as synergy
    //28. Meditation - Prayer as synergy
    if ([25, 28].includes(skill.id)) {
      return `+${skills.find(s => s.id === 21)?.attibutes.find(a => a.name === 'Heals')?.value}`;
    }
  }

  useEffect(() => {
    setSkillsTreesTabs(characterData.skills?.trees);
  }, [characterData]);

  useEffect(() => {
    let findSkill = skills.find(s => s.id === skillIdOnHover)!;
    setSkillSelected(findSkill);
  }, [skills, skillIdOnHover]);

  useEffect(() => {
    dispatchSkills({ type: 'RESET' })
  }, [level, dispatchSkills]);

  return (
    <StageWrapper>
      <TreesSection>
        <TreesTabs>
          {skillsTreesTabs.map(({ id, isActive, name }) =>
            <Tab active={isActive} key={id} onClick={() => handleTabs(id)}>{name.replace(' ', '\n')}</Tab>
          )}
        </TreesTabs>
        <Trees>
          {skillsTreesTabs.map(tree => <Tree tree={tree} {...{ setSkillIdOnHover }} key={tree.id} />)}
        </Trees>
      </TreesSection>

      <DetailsSection>
        <DetailsHeader>
          <div><strong>{skillPoints}</strong> <small>skill points remaining</small></div>
        </DetailsHeader>
        <Details>
          {skillSelected?.name ?
            <>
              <SkillTitle>{skillSelected.name}</SkillTitle>

              <SkillDescription>{skillSelected.effect}.</SkillDescription>

              <SkillProps>
                <PropDetails>
                  <PropName>Current level:</PropName>
                  <PropValue isActive={skillSelected.points > 0}>{skillSelected.points > 0 ? skillSelected.points : `Not used yet`}</PropValue>
                </PropDetails>
                {skillSelected.attibutes.map(({ name, unit, value, info, prefix }, i) => {
                  return (
                    <PropDetails key={i}>
                      <PropName>
                        {name}
                        {info &&
                          <Tooltip as={InfoIcon} center data-tooltip={info}>&#8505;</Tooltip>
                        }
                      </PropName>
                      <PropValue isActive={skillSelected.points > 0}>{prefix}{value instanceof Object ? `${value.min}-${value.max}` : value}{getUnit(unit!)}</PropValue>
                    </PropDetails>
                  )
                })}
              </SkillProps>

              {skillSelected.synergies &&
                <>
                  <SkillDescription><span>{skillSelected.name}</span> receives a bonus per each synergy level listed below:</SkillDescription>

                  <SkillProps>
                    {skillSelected.synergies.map(({ id, bonus, info, adds }) =>
                      <PropDetails key={id}>
                        <PropBonus>{skills.find(s => s.id === id)?.name}</PropBonus>
                        <PropName>
                          {bonus}
                          {info &&
                            <Tooltip as={InfoIcon} center data-tooltip={info}>&#8505;</Tooltip>
                          }
                        </PropName>
                        <PropValue isActive={skillSelected.points > 0}>
                          {specialBehavior(skillSelected) ?? `+${adds}%`}
                        </PropValue>
                      </PropDetails>
                    )}
                  </SkillProps>
                </>
              }
            </>
            :
            <SkillDescription>Please, move the mouse pointer over a skill and you`ll be able to see it`s details.</SkillDescription>
          }
        </Details>
      </DetailsSection>
    </StageWrapper>
  )
}

const StageWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  min-height: 10em;
  & > :nth-child(1){
    flex: 65%;
  }
  & > :nth-child(2){
    flex: 35%;
  }
`;

const TreesSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TreesTabs = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  height: 2.7em;
`;

const Tab = styled.div(({ active }: { active: boolean }) => css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-main);
  text-align: center;
  white-space: pre;
  z-index: 1;
  ${!active && css`
    margin: 0 0 var(--spacing-sm);
    box-shadow: inset 0 -.5em 2em rgba(0 0 0 / 0.5);
    background: rgba(255 255 255 / .06);
    color: var(--color-gold);
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color var(--duration-default);
    :hover {
      background: rgba(255 255 255 / .085);
    }
  `}
  ${active && css`
    margin-bottom: -2px;
    border-bottom: 2px solid var(--color-gold);
    box-shadow: inset 0 -.5em 2em rgba(0 0 0 / 1);
    color: #fff;
    background: var(--color-gold);
    font-size: 1.4rem;
    line-height: 1;
    cursor: default;
    ${pseudo('after')}
    &::after {
      top: calc(100% - 3px);
      height: 0;
      width: 0;
      border-width: 5px;
      border-style: solid;
      border-color: var(--color-gold) var(--color-gold-800) transparent transparent;
      transform: rotate(135deg);
    }
  `}
`);

const Trees = styled.div`
  flex: 1;
  padding: 2em 0 2em 2em;
  border-width: 2px 0;
  border-style: solid;
  border-top-color: var(--color-gold-900);
  border-bottom-color: var(--color-gold);
  background: rgba(0 0 0 / .3);
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  height: calc(2.7em - var(--spacing-sm));
  box-shadow: inset 0 0 2em rgba(0 0 0 / .5);
  background: var(--color-green-800);
  color: #fff;
  strong {
    font-family: var(--font-family-main);
    font-size: 2rem;
  }
  small {
    font-size: 1.2rem;
  }
`;

const Details = styled.div`
  flex: 1;
  padding: 1em .75em;
  background: rgba(0 0 0 / .6);
  border-width: 2px 0;
  border-style: solid;
  border-color: var(--color-green-600);
`;

const SkillTitle = styled.h3`
  font-size: 1.6rem;
  text-align: center;
  & + p {
    margin-top: .5em;
  }
`;

const SkillDescription = styled.p`
  color: #666;
  font-style: italic;
  font-size: 1.2rem;
  text-align: center;
  span {
    text-transform: capitalize;
  }
`;

const SkillProps = styled.ul`
  display: flex;
  gap: var(--spacing-md);
  flex-direction: column;
  margin: 1.5em 0;
`;

const PropDetails = styled.li`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  ::before {
    flex: 1;
    order: 2;
    margin: 0 .3em .3em;
    border-bottom: 1px dashed #333;
    content: '';
  }
`;

const PropName = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gold);
  order: 1;
  letter-spacing: -.03em;
`;

const PropValue = styled.div(({ isActive }: { isActive: boolean }) => css`
  color: ${isActive ? `var(--color-green)` : `#666`};
  order: 3;
`);

const PropBonus = styled.div`
  flex: 100%;
  margin-bottom: .25em;
  font-family: var(--font-family-main);
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: -.1em;
`;

const InfoIcon = styled.i`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: .5em;
  padding-top: .3em;
  width: 1.3em;
  height: 1.3em;
  border-radius: 100%;
  background: var(--color-blue-700);
  color: white;
  text-indent: -0.05em;
  font-size: .9em;
`;