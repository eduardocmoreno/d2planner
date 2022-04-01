import { SectionTitle } from "components/ui/Headings";
import Character from "./character/Character";
import Quests from "./quests/Quests";

export default function Setup() {
  return (
    <>
      <SectionTitle>level and attributes</SectionTitle>
      <Character />

      <SectionTitle>quests</SectionTitle>
      <Quests />
    </>
  )
}
