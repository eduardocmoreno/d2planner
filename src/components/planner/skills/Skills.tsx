import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { questsRewardsReducer } from "reducers/quests";
import { PlannerContext } from "pages/Planner";
import SkillTree from "./SkillTree";
import SkillDetails from "./SkillsDetails";
import { Tab, Trees, TreesSection, TreesTabs, Wrapper } from "./skills.styles";
import { getItemModValuesReduced, getSubModValuesReduced } from "helpers";
import GoldenFrame from "components/ui/GoldenFrame";

export default function Skills() {
  const { charData, charLevel, skills, dispatchSkills, setSkillPoints, quests, gear } = useContext(PlannerContext);

  const [skillsTreesTabs, setSkillsTreesTabs] = useState(charData.skills.trees);
  const [skillIdOnHover, setSkillIdOnHover] = useState(0);

  const skillPointsApplied = useRef(0);

  const toTreeSkills = useMemo(() => {
    return charData.skills.trees.map(tree => {
      return {
        id: tree.id,
        batch: getSubModValuesReduced(gear, 'treeSkills', tree.id) || 0
      }
    });
  }, [gear, charData]);

  const toSingleSkill = useMemo(() => {
    return charData.skills.list.map(sk => {
      return {
        id: sk.id,
        batch: getSubModValuesReduced(gear, 'singleSkill', sk.id) || 0
      }
    });
  }, [gear, charData]);

  function handleTabs(id: number) {
    setSkillsTreesTabs(prevState => prevState.map(t => {
      return {
        ...t,
        isActive: t.id === id ? true : false
      };
    }));
  }

  useEffect(() => {
    skillPointsApplied.current = skills.map(s => s.level.points).reduce((a, b) => a + b, 0) || 0;
  }, [skills]);

  useEffect(() => {
    dispatchSkills({
      type: "ALL_SKILLS",
      batch: getItemModValuesReduced(gear, 'allSkills') as number
    });
    dispatchSkills({
      type: "CLASS_SKILLS",
      batch: getItemModValuesReduced(gear, 'classSkills') as number
    });
  }, [gear, dispatchSkills]);

  useEffect(() => {
    toTreeSkills.length && toTreeSkills.forEach(t => {
      dispatchSkills({
        type: "TREE_SKILLS",
        id: t.id,
        batch: t.batch
      });
    });
  }, [toTreeSkills, dispatchSkills]);

  useEffect(() => {
    toSingleSkill.length && toSingleSkill.forEach(s => {
      dispatchSkills({
        type: "SINGLE_SKILL",
        id: s.id,
        batch: s.batch
      });
    });
  }, [toSingleSkill, dispatchSkills]);

  useEffect(() => {
    let levelFactor = charLevel - 1;
    let questsSkillPts = questsRewardsReducer(quests, 'SKILLS');
    let skillPtsCalc = levelFactor + questsSkillPts - skillPointsApplied.current;

    if (skillPtsCalc < 0) {
      dispatchSkills({
        type: 'INIT',
        initialState: charData.skills.list
      })
    } else {
      setSkillPoints(skillPtsCalc);
    }
  }, [charData.skills.list, charLevel, quests, skills, setSkillPoints, dispatchSkills]);

  return (
    <Wrapper>
      <TreesSection>
        <TreesTabs>
          {skillsTreesTabs.map(({ id, isActive, name }) =>
            <Tab active={isActive} key={id} onClick={() => handleTabs(id)}>{name.replace('-', '\n')}</Tab>
          )}
        </TreesTabs>
        
        <Trees as={GoldenFrame}>
          {skillsTreesTabs.map(tree => <SkillTree key={tree.id} {...{ tree, setSkillIdOnHover }} />)}
        </Trees>
      </TreesSection>
      
      <SkillDetails {...{ skillIdOnHover }} />
    </Wrapper>
  )
}