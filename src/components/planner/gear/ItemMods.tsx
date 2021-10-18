import { gearMods } from "config/gear";
import { useContext, useEffect, useRef, useState } from "react";
import { Wrapper } from "./ItemMods.styles";
import Button from "components/ui/Button";
import ItemMod from "./ItemMod";
import DropdownMenu from "components/ui/DropdownMenu";
import { PlannerContext } from "pages/Planner";
import { capitalize } from "helpers";

export default function ItemMods({ itemMods, setItemMods }: {
  itemMods: IGearMods,
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>
}) {
  const { charClass } = useContext(PlannerContext);
  const [selectedMod, setSelectedMod] = useState<keyof IGearMods>();
  const [inputLvl1, setInputLvl1] = useState<number | null>();
  const gearModsToRender = useRef(gearMods);

  function handleModsForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setItemMods(prev => {
      return {
        ...prev,
        [selectedMod!]: inputLvl1
      }
    });
  }

  useEffect(() => {
    gearModsToRender.current = Object.fromEntries(
      Object.entries(gearMods).map(([k, v]) => {
        v = v
          .replace('{charClass}', charClass)
          .replace(/(-|\+)?(\{\w\})(%)?/g, '')
          .trim()
          .replace(/^To/g, '')
          .replace(/^Adds/g, '')
        
        let newStr = v;

        switch (k as keyof IGearMods) {
          case 'allClassSkills': {
            v = `All ${charClass} Skill Levels`;
            break;
          }
          case 'treeSkills': {
            v = `All Skill Tree Levels (Tab Skills)`;
            break;
          }
          case 'singleSkill': {
            v = `Single ${charClass} Skill`;
            break;
          }
          case 'skillCharges': {
            v = `Charged Skill`;
            break;
          }
          case 'skillChanceToCast': {
            v = `Chance To Cast Skill`;
            break;
          }
          case 'nonClassSkills': {
            v = `Non-Class Skills`;
            break;
          }
          case 'mf': {
            v = `Magic Find`;
            break;
          }
        }
        return [k, capitalize(v)];
      })
    );
  });


  return (
    <Wrapper>
      {Object.entries(itemMods).map(([mod, value], i) =>
        <ItemMod key={i} {...{
          mod: mod as keyof IGearMods,
          value: value as ValueOf<IGearMods>
        }} />
      )}
      <form onSubmit={handleModsForm}>
        {selectedMod &&
          <>
            <input type="number" placeholder="Numbers only" onChange={e => setInputLvl1(parseInt(e.target.value))} />
            <Button blue type="submit">OK</Button>
          </>
        }
      </form>
      <DropdownMenu options={gearModsToRender.current} callBack={setSelectedMod} />
    </Wrapper>
  )
}