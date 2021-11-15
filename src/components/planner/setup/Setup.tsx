import { useContext } from "react"
import { PlannerContext } from "pages/Planner";
import Character from "./character/Character";
import Quests from "./quests/Quests";
import { SectionDescription, SectionTitle } from "../../ui/Headings";
import Splitter from "../../ui/Splitter";
import { SkillPointsWrapper } from "./setup.styles";

export default function StgOne() {
  const { skillPoints } = useContext(PlannerContext);

  return (
    <>
      <SectionTitle>Character</SectionTitle>

      <Character />

      <Splitter />

      <SectionTitle>Quests Rewards</SectionTitle>
      <SectionDescription>...reward points for each selected quest...</SectionDescription>

      <Quests />

      <Splitter />

      <SkillPointsWrapper>
        <strong>{skillPoints}</strong> skill points reamaining
      </SkillPointsWrapper>
    </>
  )
}
