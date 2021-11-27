import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import Tooltip from "components/ui/Tooltip";
import { Details, PointsRemaining, InfoIcon, PropBonus, PropDetails, PropName, PropValue, SkillDescription, SkillProps, SkillTitle, Wrapper, ResetSkills } from "./skillsDetails.styles";
import GoldenFrame from "components/ui/GoldenFrame";

export default function SkillDetails({ skillIdOnHover }: {
  skillIdOnHover: number;
}) {

  const { charLevel, charData, skills, skillPoints, dispatchSkills } = useContext(PlannerContext);
  const [selectedSkill, setSelectedSkill] = useState({} as ISkill);

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

  useEffect(() => {
    let findSkill = skills.find(s => s.id === skillIdOnHover)!;
    setSelectedSkill(findSkill);
  }, [skills, skillIdOnHover]);

  return (
    <Wrapper as={GoldenFrame}>
      <PointsRemaining>
        <div><strong>{skillPoints}</strong> <small>Skill Pts Remaining</small></div>
      </PointsRemaining>

      <Details isActive={selectedSkill?.level?.total > 0}>
        {selectedSkill?.name ?
          <>
            <SkillTitle>{selectedSkill.name}</SkillTitle>

            <SkillDescription>{selectedSkill.effect}.</SkillDescription>

            <SkillProps>
              {selectedSkill.level.points > 0 ?
                <PropDetails>
                  <PropName>Current skill level:</PropName>
                  <PropValue>{selectedSkill.level.total}</PropValue>
                </PropDetails>
                :
                <PropDetails>
                  <PropName>Required level:</PropName>
                  <PropValue warn={charLevel < selectedSkill.levelReq}>{selectedSkill.levelReq}</PropValue>
                </PropDetails>
              }

              {selectedSkill.attibutes.map(({ name, unit, value, info, prefix }, i) => {
                return (
                  <PropDetails key={name}>
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

            {selectedSkill.synergies &&
              <>
                <SkillDescription><span>{selectedSkill.name}</span> receives a bonus per each synergy level listed below:</SkillDescription>

                <SkillProps>
                  {selectedSkill.synergies.map(({ id, bonus, info, adds }) =>
                    <PropDetails key={id}>
                      <PropBonus>{skills.find(s => s.id === id)?.name}</PropBonus>

                      <PropName>
                        {bonus}
                        {info &&
                          <Tooltip data-tooltip={info}><InfoIcon className="icon-info" /></Tooltip>
                        }
                      </PropName>

                      <PropValue>
                        {specialBehavior(selectedSkill) ?? `+${adds}%`}
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
        <button onClick={
          () => dispatchSkills({
            type: 'INIT',
            initialState: charData.skills.list
          })
        }>reset skills</button>
      </ResetSkills>
    </Wrapper>
  );
}