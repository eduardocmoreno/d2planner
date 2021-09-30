import { SetStateAction, useContext } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";


const TreeWrapper = styled.div(({ isActive }: { isActive: boolean }) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1.5em 0;
  max-width: 100%;
  ${!isActive && css`
    display: none;
  `}
`);

const TreeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CellContent = styled.div(({ isIterable, isActive }: { isIterable: boolean, isActive: boolean }) => css`
  ${isIterable && css`
    img {
      &:hover{
        filter: brightness(140%);
        cursor: pointer;
      }
      &:active {
        transform: scale(.95);
      }
    }
  `}
  ${!isIterable && !isActive && css`
    filter: brightness(50%) saturate(50%);
  `} 
`);

const CellCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50% - 4.2em);
  top: 0;
  width: 26px;
  height: 26px;
  background: rgba(0 0 0 / 0.3);
  color: #fff;
  box-shadow: inset 0 0 5px rgba(0 0 0 / 0.5);
  transform: translateX(-50%);
  font-size: .8em;
  font-family: var(--font-family-main);
`;

const CellFigure = styled.figure`
  padding: 3px;
  box-shadow: inset 0 0 5px #000;
  img {
    width: 4.1em;
  }
`;


export default function Tree({ tree, setSkillIdOnHover }: {
  tree: ISkillTree,
  setSkillIdOnHover: React.Dispatch<SetStateAction<number>>
}) {
  const { level, skills, dispatchSkills, skillPoints, setSkillPoints } = useContext(PlannerContext);

  function getSkillProps(skills: ISkill[], id: number): ISkill {
    return skills.find(s => s.id === id)!;
  }

  /* 
  // HANDLE REQUIREMENTS
  */
  function isPreSkillReqActived(id: number) {
    let preReqActived = [];

    for (const i of getSkillProps(skills, id).preReq) {
      preReqActived.push(skills.find(s => s.id === i)!.points > 0 ? true : false);
    }

    return !preReqActived.includes(false);
  }

  function isPostSkillReqActived(id: number) {
    let postReqActived = [];

    for (const i of getSkillProps(skills, id).postReq) {
      postReqActived.push(skills.find(s => s.id === i)!.points > 0 ? true : false);
    }

    return postReqActived.includes(true);
  }

  function isSkillIterable(id: number) {
    let skill = getSkillProps(skills, id);
    return level >= skill.reqLvl && skillPoints > 0 && (isPreSkillReqActived(id) || (skill.points > 0 && !isPostSkillReqActived(id)));
  }

  /* 
  // HANDLE SKILLS LVL COUNT
  */
  function handleSkillPoints(e: React.MouseEvent<HTMLElement>, id: number) {
    let { points } = getSkillProps(skills, id);
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
        type: 'INCREMENT',
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
        type: 'DECREMENT',
        payload: { id, batch }
      });
    }
  }

  return (
    <TreeWrapper isActive={tree.isActive}>
      {tree.map.map((id, index) => {

        if (id > 0) {
          const { name, points } = getSkillProps(skills, id);
          return (
            <TreeCell key={name}>
              <CellContent isIterable={isSkillIterable(id)} isActive={points > 0}>
                <CellFigure
                  onMouseOver={() => setSkillIdOnHover(id)}
                  onClick={(e) => handleSkillPoints(e, id)}
                  onContextMenu={(e) => handleSkillPoints(e, id)}>
                  <img
                    src={require(`assets/images/skills/${name}.jpg`).default}
                    alt={name}
                  />
                </CellFigure>
                <CellCount>{points > 0 && points}</CellCount>
              </CellContent>
            </TreeCell>
          )
        }

        return <TreeCell key={index} />

      })}
    </TreeWrapper>
  )
}
