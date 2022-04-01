import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "./Gear";
import ItemMod from "./Mod";
import FakeSelector from "components/ui/FakeSelector";
import Button from "components/ui/Button";
import { CallToAction, ModsList } from "./mods.styles";

export default function Mods() {
  /* const { charLevel, dispatchGear } = useContext(PlannerContext);
  const { modsData, selectedSlot: { slot, base, mods } } = useContext(GearContext);

  const currentModsHaveLength = mods.length > 0;

  const modsListOpts = Object.fromEntries(
    (Object.values(modsData) as ItemModData[])
      .filter((mod: ItemModData) => {
        if (!!base.nodurability) {
          return mod.name !== 'ethereal';
        }
        return mod;
      })
      .map((mod: ItemModData) => {
        return [mod.name, (mod.shortDescr || mod.descr)];
      })
  );

  function addMod(selectedMod: ItemModName) {
    dispatchGear({
      type: 'ADD_MOD',
      payload: {
        slot,
        newMod: { name: selectedMod as ItemModName },
        charLevel
      }
    });
  };

  function reset() {
    dispatchGear({
      type: 'RESET',
      payload: { slot }
    })
  }

  return (
    <>
      {currentModsHaveLength &&
        <ModsList>
          {mods.map(mod => <ItemMod key={mod.subName || mod.name} {...{ currentMod: mod }} />)}
        </ModsList>
      }

      <CallToAction>
        <FakeSelector options={modsListOpts} callBack={addMod} align="center" textAlign="center">
          <Button blue arrowLeft={!!(base.code || currentModsHaveLength)}>add mod</Button>
        </FakeSelector>

        {(base.code || currentModsHaveLength) &&
          <Button red arrowRight onClick={() => reset()}>reset item</Button>
        }
      </CallToAction>
    </>
  ) */
  return (<>asdasd</>)
}