import { SetStateAction, useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { CellContent, CellCount, CellFigure, Count, TreeCell, Wrapper } from "./SkillTree.styles";
import Tooltip from "components/ui/Tooltip";


export default function SkillTree({ tree, setSkillIdOnHover }: {
  tree: ISkillTree;
  setSkillIdOnHover: React.Dispatch<SetStateAction<number>>;
}) {
  const { charClass, charLevel, skills, dispatchSkills, skillPoints, setSkillPoints } = useContext(PlannerContext);

  function getSkillProps(skills: ISkill[], id: number): ISkill {
    return skills.find(s => s.id === id)!;
  }

  /* 
  // HANDLE REQUIREMENTS
  */
  function isPreSkillReqActived(id: number) {
    let preReqActived = [];

    for (const i of getSkillProps(skills, id).preReq) {
      preReqActived.push(skills.find(s => s.id === i)!.level.points > 0 ? true : false);
    }

    return !preReqActived.includes(false);
  }

  function isPostSkillReqActived(id: number) {
    let postReqActived = [];

    for (const i of getSkillProps(skills, id).postReq) {
      postReqActived.push(skills.find(s => s.id === i)!.level.points > 0 ? true : false);
    }

    return postReqActived.includes(true);
  }

  function isSkillIterable(id: number) {
    let skill = getSkillProps(skills, id);
    return charLevel >= skill.levelReq && skillPoints > 0 && (isPreSkillReqActived(id) || (skill.level.points > 0 && !isPostSkillReqActived(id)));
  }

  /* 
  // HANDLE SKILLS LVL COUNT
  */
  function handleSkillPoints(e: React.MouseEvent<HTMLElement>, id: number) {
    let { level: { points } } = getSkillProps(skills, id);
    let batch = 1;

    if (e.shiftKey) batch = 5;
    if (e.ctrlKey || e.metaKey) batch = 20;

    //on left click
    if (e.button === 0) {
      if (!isSkillIterable(id) || points === 20 || skillPoints === 0) return;

      if (points + batch > 20) batch = 20 - points;

      if (skillPoints - batch < 0) batch = skillPoints;

      setSkillPoints(prev => prev - batch);

      dispatchSkills({
        type: 'INC_POINTS',
        payload: { id, batch }
      });
    }

    //on right click
    if (e.button === 2) {
      e.preventDefault();

      if ((points === 1 && isPostSkillReqActived(id)) || points === 0) return;

      if (points - batch < 0) batch = isPostSkillReqActived(id) ? points - 1 : points;

      setSkillPoints(prev => prev + batch);

      dispatchSkills({
        type: 'DEC_POINTS',
        payload: { id, batch }
      });
    }
  }

  return (
    <Wrapper isActive={tree.isActive} charClass={charClass} name={tree.name} img={require(`assets/images/skills/${charClass}/${tree.name}/connectors.png`).default}>
      {tree.map.map((id, index) => {
        if (id > 0) {
          const { name, level: { points, bonus, granted, total } } = getSkillProps(skills, id);
          return (
            <TreeCell key={name}>
              <CellContent>
                <CellFigure
                  isIterable={isSkillIterable(id)}
                  isActive={points > 0}
                  isGranted={granted > 0 && points === 0}
                  onMouseOver={() => setSkillIdOnHover(id)}
                  onClick={(e) => handleSkillPoints(e, id)}
                  onContextMenu={(e) => handleSkillPoints(e, id)}>
                  <img
                    src={require(`assets/images/skills/${charClass}/${name}.jpg`).default}
                    alt={name}
                  />
                </CellFigure>
                {(points > 0 || granted > 0) &&
                  <CellCount>
                    <Tooltip center data-tooltip={`Points Spent: ${points}`}>
                      <Count hasBonus={bonus > 0 || granted > 0}>
                        {total}
                      </Count>
                    </Tooltip>
                  </CellCount>
                }
              </CellContent>
            </TreeCell>
          )
        }

        return <TreeCell key={index} />
      })}
    </Wrapper>
  )
}

