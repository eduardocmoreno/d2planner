import { MouseEvent, useContext } from "react";
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
        transform: scale(.98);
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
`;

const CellFigure = styled.figure`
  padding: 3px;
  box-shadow: inset 0 0 5px #000;
  img {
    width: 4.1em;
  }
`;


export default function Tree({ tree }: { tree: ISkillTree }) {
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
  function handleSkillPoints(e: MouseEvent<HTMLElement>, id: number) {
    let skill = getSkillProps(skills, id);
    let params: ISkillsReducer = {
      type: 'RESET',
      payload: {
        id: id,
        qty: e.shiftKey ? 10 : 1
      }
    }

    //on left click
    if (e.button === 0) {
      if (!isSkillIterable(id) || skill.points === 20 || skillPoints === 0) return;

      if (skill.points + params.payload.qty! > 20) {
        params.payload.qty = 20 - skill.points;
      }

      if (skillPoints - params.payload.qty! < 0) {
        params.payload.qty = skillPoints;
      }

      setSkillPoints(prev => prev - params.payload.qty!);

      params.type = 'INCREMENT';
    }

    //on right click
    if (e.button === 2) {
      e.preventDefault();

      if ((skill.points === 1 && isPostSkillReqActived(id)) || skill.points === 0) return;

      if (skill.points - params.payload.qty! < 0) {
        params.payload.qty = isPostSkillReqActived(id) ? skill.points - 1 : skill.points;
      }

      setSkillPoints(prev => prev + params.payload.qty!);

      params.type = 'DECREMENT';
    }

    dispatchSkills(params);
  }

  return (
    <TreeWrapper isActive={tree.isActive}>
      {tree.map.map((id, index) => {
        let skill = getSkillProps(skills, id);

        return (
          <TreeCell key={skill ? skill.name : index}>
            {skill &&
              <CellContent isIterable={isSkillIterable(skill.id)} isActive={skill.points > 0}>
                <CellFigure
                  onClick={(e) => handleSkillPoints(e, skill.id)}
                  onContextMenu={(e) => handleSkillPoints(e, skill.id)}>
                  <img
                    src={require('assets/images/skills/' + skill.name + '.jpg').default}
                    alt="sacrifice"
                  />
                </CellFigure>
                <CellCount>{skill.points > 0 && skill.points}</CellCount>
              </CellContent>
            }
          </TreeCell>
        )
      })}
    </TreeWrapper>
  )
}
