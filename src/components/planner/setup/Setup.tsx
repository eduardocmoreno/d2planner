import { useContext } from "react"
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import Character from "./character/Character";
import Quests from "./quests/Quests";
import { SectionDescription, SectionTitle } from "../../ui/Headings";
import Splitter from "../../ui/Splitter";

const SkillPointsWrapper = styled.div`
  text-align: center;
  strong {
    margin: 0 0.15em;
    color: var(--color-gold);
    font-size: 3rem;
    font-family: var(--font-family-main);
  }
`;

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
