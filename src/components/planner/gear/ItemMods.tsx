import { useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "./Gear";
import styled from "styled-components";
import ItemMod from "./ItemMod";
import FakeSelector from "components/ui/FakeSelector";
import Button from "components/ui/Button";
import { includes } from "helpers";

export default function ItemMods({ itemMods, setItemMods, selectedBase, reset }: {
  itemMods: IGearMod[];
  setItemMods: React.Dispatch<React.SetStateAction<IGearMod[]>>;
  selectedBase: IGearProps,
  reset: Function
}) {
  const { charData } = useContext(PlannerContext);
  const { modsDescr } = useContext(GearContext);
  const [pickedMod, setPickedMod] = useState<TGearModName | null>(null);

  const treeSkillsOpts = useRef(Object.fromEntries(
    charData.skills.trees.map(({ id, name }) => [id, name])
  ));

  const singleSkillOpts = useRef(Object.fromEntries(
    charData.skills.list.map(({ id, name }) => [id, name])
  ));

  const subModOptsInit: () => TGearMultiLevelModsOpts = () => {
    return {
      treeSkills: {
        all: treeSkillsOpts.current,
        available: treeSkillsOpts.current,
        str: 'Tree'
      },
      singleSkill: {
        all: singleSkillOpts.current,
        available: singleSkillOpts.current,
        str: 'Skill'
      }
    }
  }

  const [subModOptions, setSubModOptions] = useState<TGearMultiLevelModsOpts>(subModOptsInit);

  useEffect(() => {
    setSubModOptions(prev => {
      let treeSkillsAvailableOpts = { ...treeSkillsOpts.current };
      itemMods.filter(m => m.name === 'treeSkills').forEach(m => {
        delete treeSkillsAvailableOpts[m.subModId!];
      });

      let singleSkillAvailableOpts = { ...singleSkillOpts.current };
      itemMods.filter(m => m.name === 'singleSkill').forEach(m => {
        delete singleSkillAvailableOpts[m.subModId!];
      });

      return {
        treeSkills: {
          ...prev.treeSkills,
          available: treeSkillsAvailableOpts
        },
        singleSkill: {
          ...prev.singleSkill,
          available: singleSkillAvailableOpts
        }
      }
    });
    setPickedMod(null);
  }, [itemMods]);


  useEffect(() => {
    if (!pickedMod) return;

    if (includes(['treeSkills', 'singleSkill'], pickedMod)) {
      setItemMods(prev => {
        if (prev.filter(m => m.name === 'treeSkills').length === 2) {
          return prev;
        }
        if (prev.filter(m => m.name === 'singleSkill').length === 5) {
          return prev;
        }
        if (prev.find(m => m.name === pickedMod && !m.subModName && !m.value)) {
          return prev;
        }
        return [
          ...prev,
          { name: pickedMod }
        ]
      });
      return;
    }

    if (itemMods.find(m => m.name === pickedMod)) {
      return;
    }

    setItemMods(prev => {
      return [
        ...prev,
        { name: pickedMod }
      ]
    });
  }, [pickedMod, setItemMods, charData, itemMods]);

  return (
    <>
      <Mods>
        {itemMods.map((mod, i) => {
          return <ItemMod key={mod.subModName || mod.name} {...{
            mod,
            setItemModsArray: setItemMods,
            subModOptions,
            idxRef: i
          }} />
        })}
      </Mods>

      <CallToAction>
        <FakeSelector options={modsDescr} callBack={setPickedMod}>
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