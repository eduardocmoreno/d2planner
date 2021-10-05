import { SetStateAction, useContext } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";


export default function Tree({ tree, setSkillIdOnHover }: {
  tree: ISkillTree,
  setSkillIdOnHover: React.Dispatch<SetStateAction<number>>
}) {
  const { charClass, level, skills, dispatchSkills, skillPoints, setSkillPoints } = useContext(PlannerContext);

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
    return level >= skill.reqLvl && skillPoints > 0 && (isPreSkillReqActived(id) || (skill.level.points > 0 && !isPostSkillReqActived(id)));
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
    <TreeWrapper isActive={tree.isActive} charClass={charClass} name={tree.name} img={require(`assets/images/skills/${charClass}/${tree.name}/connectors.png`).default}>
      {tree.map.map((id, index) => {

        if (id > 0) {
          const { name, level: { points, bonus, total } } = getSkillProps(skills, id);
          return (
            <TreeCell key={name}>
              <CellContent isIterable={isSkillIterable(id)} isActive={points > 0}>
                <CellFigure
                  onMouseOver={() => setSkillIdOnHover(id)}
                  onClick={(e) => handleSkillPoints(e, id)}
                  onContextMenu={(e) => handleSkillPoints(e, id)}>
                  <img
                    src={require(`assets/images/skills/${charClass}/${name}.jpg`).default}
                    alt={name}
                  />
                </CellFigure>
                {points > 0 &&
                  <CellCount>
                    {bonus > 0 &&
                      <span>{total}</span>
                    }
                    {points}
                  </CellCount>
                }
              </CellContent>
            </TreeCell>
          )
        }

        return <TreeCell key={index} />

      })}
    </TreeWrapper>
  )
}

const TreeWrapper = styled.div(({ isActive, charClass, name, img }: { isActive: boolean, charClass?: string, name?: string, img: string }) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 25px 0;
  width: 340px;
  background: url(${img}) top left no-repeat;
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
  position: relative;
  ${!isIterable && !isActive && css`
    img {
      filter: brightness(30%) saturate(0%);
      opacity: .3;
    }
  `}
  ${isIterable && css`
    img {
      :hover{
        box-shadow: 0 0 20px rgba(var(--color-green-rgb), .15);
        
        cursor: pointer;
      }
      :active {
        transform: scale(.95);
      }
    }
  `}
  ${isIterable && !isActive && css`
    img {
      :not(:hover) {
        filter: brightness(70%) saturate(50%);
      }
    }
  `}
  ${isActive && css`
    img {
      filter: saturate(150%);
    }
  `}
`);

const CellCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 100%;
  top: 0;
  padding: 5px 0;
  width: 25px;
  background: rgba(0 0 0 / 0.3);
  color: #666;
  box-shadow: inset 0 0 5px rgba(0 0 0 / 0.5);
  font-size: 1.4rem;
  font-family: var(--font-family-main);
  text-align: center;
  letter-spacing: -.15rem;
  line-height: 1;
  span {
    color: var(--color-green-600);
    font-size: 1.7rem;
    font-weight: bold;
  }
`;

const CellFigure = styled.figure`
  padding: 3px;
  box-shadow: inset 0 0 5px #000;
  img {
    width: 64px;
    height: 64px;
  }
`;