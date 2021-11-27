import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import Tooltip from "components/ui/Tooltip";
import { Details, PointsRemaining, InfoIcon, PropBonus, PropDetails, PropName, PropValue, SkillDescription, SkillProps, SkillTitle, Wrapper, ResetSkills } from "./skillsDetails.styles";
import GoldenFrame from "components/ui/GoldenFrame";
import { capitalize, getSkill } from "helpers";

export default function SkillDetails({ skillIdOnHover }: {
  skillIdOnHover: number;
}) {
  const { charLevel, skills, skillPoints, dispatchSkills } = useContext(PlannerContext);
  const currentSkill = getSkill(skills, skillIdOnHover);
  const isActive = currentSkill.level?.points > 0 || currentSkill.level?.bonus.toSingle > 0;
  const units: Record<TUnit, string> = {
    seconds: 's',
    yards: 'yards',
    percent: '%',
    points: 'pts',
    hits: 'hits'
  }

  function specialBehavior(skill: ISkill) {
    //25. Cleansing - Prayer as synergy
    //28. Meditation - Prayer as synergy
    if ([25, 28].includes(skill.id)) {
      return `+${skills.find(s => s.id === 21)?.attibutes.find(a => a.name === 'Heals')?.value}`;
    }
  }

  return (
    <Wrapper as={GoldenFrame}>
      <PointsRemaining>
        <div><strong>{skillPoints}</strong> <small>Skill Pts Remaining</small></div>
      </PointsRemaining>

      <Details isActive={isActive}>
        {currentSkill.name ?
          <>
            <SkillTitle>{currentSkill.name}</SkillTitle>

            <SkillDescription>{currentSkill.effect}.</SkillDescription>

            <SkillProps>
              {isActive ?
                <PropDetails>
                  <PropName>Current skill level:</PropName>
                  <PropValue>{currentSkill.level.total}</PropValue>
                </PropDetails>
                :
                <PropDetails>
                  <PropName>Required level:</PropName>
                  <PropValue warn={charLevel < currentSkill.levelReq}>{currentSkill.levelReq}</PropValue>
                </PropDetails>
              }

              {currentSkill.attibutes.map(({ name, unit, value, info, prefix }) => {
                return (
                  <PropDetails key={info ? `${name}_${capitalize(info)}` : name}>
                    <PropName>
                      {name}
                      {info &&
                        <Tooltip data-tooltip={info}><InfoIcon className="icon-info" /></Tooltip>
                      }
                    </PropName>
                    <PropValue>{prefix}{value instanceof Object ? `${value.min}-${value.max}` : value}{units[unit]}</PropValue>
                  </PropDetails>
                )
              })}
            </SkillProps>

            {currentSkill.synergies &&
              <>
                <SkillDescription><span>{currentSkill.name}</span> receives a bonus per each synergy level listed below:</SkillDescription>

                <SkillProps>
                  {currentSkill.synergies.map(({ id, bonus, info, adds }) =>
                    <PropDetails key={id}>
                      <PropBonus>{skills.find(s => s.id === id)?.name}</PropBonus>

                      <PropName>
                        {bonus}
                        {info &&
                          <Tooltip data-tooltip={info}><InfoIcon className="icon-info" /></Tooltip>
                        }
                      </PropName>

                      <PropValue>
                        {specialBehavior(currentSkill) ?? `+${adds}%`}
                      </PropValue>
                    </PropDetails>
                  )}
                </SkillProps>
              </>
            }
          </>
          :
          <SkillDescription>Move the mouse over the skills!</SkillDescription>
        }
      </Details>

      <ResetSkills>
        <button onClick={() => {dispatchSkills({ type: 'RESET' });}}>reset skills</button>
      </ResetSkills>
    </Wrapper>
  );
}