import { useContext, useEffect, useState } from "react";
import { GearContext } from "./Gear";
import styled from "styled-components";
import ItemMod from "./ItemMod";
import FakeSelector from "components/ui/FakeSelector";
import Button from "components/ui/Button";

export default function ItemMods({ itemMods, setItemMods, selectedBase, reset }: {
  itemMods: IGearMods,
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>,
  selectedBase: IGearProps,
  reset: Function
}) {

  const { modsDescr } = useContext(GearContext);
  const [selectedMod, setSelectedMod] = useState<keyof IGearMods | null>(null);

  useEffect(() => {
    selectedMod && setItemMods(prev => {
      return {
        ...prev,
        [selectedMod!]: null
      }
    });
    setSelectedMod(null);
  }, [itemMods, selectedMod, setItemMods]);

  return (
    <>
      {Object.entries(itemMods).length > 0 &&
        <Mods>
          {Object.keys(itemMods).map(mod =>
            <ItemMod key={mod} {...{
              mod: mod as keyof IGearMods,
              setItemMods
            }} />
          )}
        </Mods>
      }

      <CallToAction>
        <FakeSelector options={modsDescr} callBack={setSelectedMod}>
          <Button blue arrowLeft={Object.entries(itemMods).length > 0 || Object.entries(selectedBase).length > 0}>Add Mod</Button>
        </FakeSelector>

        {//RESET BUTON IS LOCATED HERE DUE TO BETTER POSITIONING INTO THE LAYOUT
          (Object.entries(itemMods).length > 0 || Object.entries(selectedBase).length > 0) &&
          <Button red arrowRight onClick={() => reset()}>reset item</Button>
        }
      </CallToAction>
    </>
  )
}

const Mods = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;

const CallToAction = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
`;