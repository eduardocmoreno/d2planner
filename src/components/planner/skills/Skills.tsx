import { useContext, useEffect, useRef, useState } from "react";
import { questsRewardsReducer } from "reducers/quests";
import { PlannerContext } from "pages/Planner";
import SkillTree from "./SkillTree";
import SkillDetails from "./SkillsDetails";
import { Tab, Trees, TreesSection, TreesTabs, Wrapper } from "./Skills.styles";

//TODO: special behavior
//Smite gets Holy Shield damage
//ZEAL gets sacrifice damage value
//Blessed Aim The Passive Bonus is 5% Attack Rating bonus per hard point invested while the aura is not active.
//move the styled comp to a separated file?

//ENCHANT, VENOM ADDS DAMAGE TO WEAPONS!!!

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
  const { charData, charLevel, skills, dispatchSkills, skillPoints, setSkillPoints, quests } = useContext(PlannerContext);

  const [skillsTreesTabs, setSkillsTreesTabs] = useState([] as ISkillTree[]);
  const [skillIdOnHover, setSkillIdOnHover] = useState(0);


  const skillPointsApplied = useRef(0);

  function handleTabs(id: number) {
    setSkillsTreesTabs(prevState => prevState.map(t => {
      return {
        ...t,
        isActive: t.id === id ? true : false
      };
    }));
  }

  useEffect(() => {
    setSkillsTreesTabs(charData.skills?.trees);
  }, [charData]);

  useEffect(() => {
    skillPointsApplied.current = skills.map(s => s.level.points).reduce((a, b) => a + b, 0) || 0;
  }, [skills]);

  useEffect(() => {
    let levelFactor = charLevel - 1;
    let questsSkillPts = questsRewardsReducer(quests, 'SKILLS');
    let skillPtsCalc = levelFactor + questsSkillPts - skillPointsApplied.current;

    if (skillPtsCalc < 0) {
      dispatchSkills({
        type: 'RESET'
      })
    } else {
      setSkillPoints(skillPtsCalc);
    }
  }, [charLevel, quests, skills, setSkillPoints, dispatchSkills]);

  return (
    <Wrapper>
      <TreesSection>
        <TreesTabs>
          {skillsTreesTabs.map(({ id, isActive, name }) =>
            <Tab active={isActive} key={id} onClick={() => handleTabs(id)}>{name.replace('-', '\n')}</Tab>
          )}
        </TreesTabs>
        <Trees>
          {skillsTreesTabs.map(tree => <SkillTree key={tree.id} {...{ tree, setSkillIdOnHover }} />)}
        </Trees>
      </TreesSection>

      <SkillDetails {...{ skillIdOnHover }} />

    </Wrapper>
  )
}