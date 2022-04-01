import { SetStateAction, useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { CellContent, CellCount, CellFigure, Count, TreeCell, Wrapper } from "./skillTree.styles";
import Tooltip from "components/ui/Tooltip";
import { capitalize, getSkill } from "helpers";


export default function SkillTree({ tree, setSkillIdOnHover }: {
  tree: SkillTree;
  setSkillIdOnHover: React.Dispatch<SetStateAction<number>>;
}) {
  const { charClass, charLevel, skills, dispatchSkills, skillPoints, setSkillPoints } = useContext(PlannerContext);

  /* 
  // HANDLE REQUIREMENTS
  */
  function isPreSkillReqActived(id: number) {
    let preReqActived = [];

    for (const i of getSkill(skills, id).preReq) {
      preReqActived.push(skills.find(s => s.id === i)!.level.points > 0 ? true : false);
    }

    return !preReqActived.includes(false);
  }

  function isPostSkillReqActived(id: number) {
    let postReqActived = [];

    for (const i of getSkill(skills, id).postReq) {
      postReqActived.push(skills.find(s => s.id === i)!.level.points > 0 ? true : false);
    }

    return postReqActived.includes(true);
  }

  function isSkillIterable(id: number) {
    let skill = getSkill(skills, id);
    return charLevel >= skill.levelReq && skillPoints > 0 && (isPreSkillReqActived(id) || (skill.level.points > 0 && !isPostSkillReqActived(id)));
  }

  /* 
  // HANDLE SKILLS LVL COUNT
  */
  function handleSkillPoints(e: React.MouseEvent<HTMLElement>, id: number) {
    let { level: { points } } = getSkill(skills, id);
    let batch = 1;

    if (e.shiftKey) batch = 5;
    if (e.ctrlKey || e.metaKey) batch = 20;

    //on left click
    if (e.button === 0) {
      if (!isSkillIterable(id) || points === 20 || skillPoints === 0) return;

      if (points + batch > 20) {
        batch = 20 - points
      };

      if (skillPoints - batch < 0) {
        batch = skillPoints
      };

      setSkillPoints(prev => prev - batch);
      dispatchSkills({ type: 'INC_POINTS', id, batch });
    }

    //on right click
    if (e.button === 2) {
      e.preventDefault();

      if ((points === 1 && isPostSkillReqActived(id)) || points === 0) {
        return
      };

      if ((points - batch) <= 0) {
        batch = isPostSkillReqActived(id) ? points - 1 : points
      };

      setSkillPoints(prev => prev + batch);
      dispatchSkills({ type: 'DEC_POINTS', id, batch });
    }
  }

  return (
    <Wrapper isActive={tree.isActive} charClass={charClass} name={tree.name} img={require(`assets/images/skills/${charClass}/${tree.name}/connectors.png`).default}>
      {tree.map.map((id, index) => {
        if (id > 0) {
          const { name, level: { points, bonus: { toAll, toClass, toTree, toSingle }, total } } = getSkill(skills, id);
          const bonus = toAll + toClass + toTree + toSingle;
          let tooltip: string = ``;
          if (points) {
            tooltip += `${points} Points Spent`;
          }
          if (toAll) {
            tooltip += `\n+${toAll} To All Skills`;
          }
          if (toClass) {
            tooltip += `\n+${toClass} To ${capitalize(charClass)} Skill Levels`;
          }
          if (toTree) {
            tooltip += `\n+${toTree} To ${capitalize(tree.name)}`;
          }
          if (toSingle) {
            tooltip += `\n+${toSingle} To ${capitalize(name)}`;
          }
          return (
            <TreeCell key={name}>
              <CellContent>
                <CellFigure
                  isIterable={isSkillIterable(id)}
                  isActive={points > 0}
                  isGranted={toSingle > 0 && points === 0}
                  onMouseOver={() => setSkillIdOnHover(id)}
                  onClick={(e) => handleSkillPoints(e, id)}
                  onContextMenu={(e) => handleSkillPoints(e, id)}>
                  <img
                    src={require(`assets/images/skills/${charClass}/${name}.jpg`).default}
                    alt={name}
                  />
                </CellFigure>
                {(points > 0 || toSingle > 0) &&
                  <CellCount>
                    <Tooltip data-tooltip={tooltip.trim()}>
                      <Count hasBonus={bonus > 0}>
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