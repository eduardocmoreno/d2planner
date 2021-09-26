import { useContext } from "react"
import { PlannerContext } from "pages/Planner";
import Character from "./character/Character";
import Quests from "./quests/Quests";

import { SectionDescription, SectionTitle } from "../../ui/Headings";
import Splitter from "../../ui/Splitter";

export default function StgOne() {
  //context: planner
  const { skillPoints } = useContext(PlannerContext);

  return (
    <>
      <SectionTitle>Character</SectionTitle>

      <Character />

      {/* <div className="stage-character-setup">
        <div className="setup-container">
          <div className="cont-level">
            <CharacterLevel />
          </div>
          <div className="cont-stats">
            <div className="stat-points">
              <strong className="points-remaining">{statPoints}</strong> <i>stat points remaining</i>
            </div>
            <div className="stat-attrs">
              <div className="attr">
                <div className="attr-frame setup-frame">
                  <div className="frame-label">strength</div>
                  <div className="frame-results buffed">
                    <div className="res-buffed">143</div>
                    <div className="res-base">67</div>
                  </div>
                </div>
                <div className="attr-actions">
                  <div className="btn btn-blue">+</div>
                  <div className="btn btn-blue">-</div>
                </div>
              </div>

              <div className="attr">DEX</div>

              <div className="attr">VIT</div>

              <div className="attr">
                <div className="attr-frame setup-frame">
                  <div className="frame-label">energy</div>
                  <div className="frame-results">
                    <div className="res-base">15</div>
                  </div>
                </div>
                <div className="attr-actions">
                  <div className="btn btn-blue">+</div>
                  <div className="btn btn-blue">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      <Splitter></Splitter>

      <SectionTitle>Quests Rewards</SectionTitle>
      <SectionDescription>...reward points for each selected quest...</SectionDescription>

      <Quests />

      <Splitter></Splitter>

      <div className="stage-points-remaining">
        <strong className="result">{skillPoints}</strong> skill points reamaining
      </div>
    </>
  )
}
