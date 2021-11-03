import { useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import Tooltip from "components/ui/Tooltip";
import { Details, Header, InfoIcon, PropBonus, PropDetails, PropName, PropValue, SkillDescription, SkillProps, SkillTitle, Wrapper } from "./SkillsDetails.styles";

export default function SkillDetails({ skillIdOnHover }: {
  skillIdOnHover: number;
}) {

  const { charLevel, skills, skillPoints } = useContext(PlannerContext);
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
    <Wrapper>
      <Header>
        <div><strong>{skillPoints}</strong> <small>Skill Pts Remaining</small></div>
      </Header>
      <Details>
        {selectedSkill?.name ?
          <>
            <SkillTitle>{selectedSkill.name}</SkillTitle>

            <SkillDescription>{selectedSkill.effect}.</SkillDescription>

            <SkillProps>

              {selectedSkill.level.points > 0 ?
                <PropDetails>
                  <PropName>Current skill level:</PropName>
                  <PropValue isActive={selectedSkill.level.total > 0}>{selectedSkill.level.total}</PropValue>
                </PropDetails>
                :
                <PropDetails>
                  <PropName>Required level:</PropName>
                  <PropValue isActive={false} warn={charLevel < selectedSkill.levelReq}>{selectedSkill.levelReq}</PropValue>
                </PropDetails>
              }
              {selectedSkill.attibutes.map(({ name, unit, value, info, prefix }, i) => {
                return (
                  <PropDetails key={i}>
                    <PropName>
                      {name}
                      {info &&
                        <Tooltip center data-tooltip={info}><InfoIcon className="icon-info" /></Tooltip>
                      }
                    </PropName>
                    <PropValue isActive={selectedSkill.level.points > 0}>{prefix}{value instanceof Object ? `${value.min}-${value.max}` : value}{units[unit]}</PropValue>
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
                          <Tooltip center data-tooltip={info}><InfoIcon className="icon-info" /></Tooltip>
                        }
                      </PropName>
                      <PropValue isActive={selectedSkill.level.points > 0}>
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
    </Wrapper>
  );
}