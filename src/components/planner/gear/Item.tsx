import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import ItemProps from "./ItemProps";
import ItemMods from "./ItemMods";
import Button from "components/ui/Button";
import FakeSelector from "components/ui/FakeSelector";
import { BaseSelector, CallToAction, Contents, Icon, Title, Wrapper } from "./Item.styles";
import { gearMods } from "config/gear";
import { capitalize } from "helpers";

//TODO:
//make a form to add mods
//how mods are printed
//handle gear item props by mods (speed/IAS)
//handle skills

export default function Item({
  bases, slot, icon, setHasTwoHanded
}: {
  bases?: IGearProps[],
  slot: IGear['slot'],
  icon: string,
  setHasTwoHanded?: React.Dispatch<SetStateAction<boolean>>
}) {

  const { charClass, setGear } = useContext(PlannerContext);
  const [selectedBase, setSelectedBase] = useState({} as IGearProps);
  const [selectedMod, setSelectedMod] = useState<keyof IGearMods | null>(null);
  const [itemProps, setItemProps] = useState({} as IGearProps);
  const [itemMods, setItemMods] = useState({} as IGearMods);
  const gearModsToRender = useRef(gearMods);

  function handleBaseSelect(code: keyof IGearProps) {
    bases && setSelectedBase(bases.find(i => i.code === code)!);
  }

  function reset() {
    setSelectedBase({} as IGearProps);
    setItemProps({} as IGearProps);
    setItemMods({} as IGearMods);
  }

  useEffect(() => {
    setHasTwoHanded?.(!!selectedBase?.twoHanded);
  }, [selectedBase, setHasTwoHanded]);

  useEffect(() => {
    setGear(prev => {
      return prev.map(p => {
        if (p.slot === slot) {
          return {
            ...p,
            base: { ...itemProps },
            props: { ...itemProps },
            mods: { ...itemMods }
          }
        }
        return p;
      })
    });
  }, [slot, itemProps, itemMods, setGear]);

  useEffect(() => {
    gearModsToRender.current = Object.fromEntries(
      Object.entries(gearMods).map(([k, v]) => {
        v = v
          .replace('{charClass}', charClass)
          .replace(/(-|\+)?(\{\w\})(%)?/g, '').trim()
          .replace(/^To/g, '').trim()
          .replace(/^Adds/g, '').trim()
          .replace(/^Minimum/g, 'Min').trim()
          .replace(/^Maximum/g, 'Max').trim()
          .replace(/^Increased/g, '').trim()
          .replace(/^Chance Of/g, '').trim()
          .replace('(Based On Character Level)', '/ Level').trim()

        switch (k as keyof IGearMods) {
          case 'allClassSkills': {
            v = `All ${charClass} Skill Levels`;
            break;
          }
          case 'treeSkills': {
            v = `Skill Tree Levels`;
            break;
          }
          case 'singleSkill': {
            v = `Single Skill (${capitalize(charClass)} Only)`;
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

  useEffect(() => {
    selectedMod && setItemMods(prev => {
      return {
        ...prev,
        [selectedMod!]: null
      }
    });
  }, [selectedMod]);

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/items/${icon}.png`).default} alt={slot} />
      </Icon>
      <Contents>
        {bases ?
          <>
            <FakeSelector options={Object.fromEntries(bases?.map(({ code, name }) => [code, name])!)} callBack={handleBaseSelect}>
              <BaseSelector>{selectedBase.name || slot}<i className='icon-arrow-down' /></BaseSelector>
            </FakeSelector>
            {Object.keys(selectedBase).length > 0 &&
              <ItemProps {...{ slot, itemProps, setItemProps, itemMods, selectedBase }} />
            }
          </>
          :
          <Title>{slot}</Title>
        }

        {Object.keys(itemMods).length > 0 &&
          <ItemMods {...{ itemMods, setItemMods }} />
        }

        {(!bases || Object.keys(selectedBase).length > 0) &&
          <CallToAction>
            <FakeSelector options={gearModsToRender.current} callBack={setSelectedMod}>
              <Button blue arrowLeft={Object.entries(itemMods).length > 0 || Object.entries(itemProps).length > 0}>Add Mod</Button>
            </FakeSelector>
            {(Object.entries(itemMods).length > 0 || Object.entries(itemProps).length > 0) && 
              <Button red arrowRight onClick={reset}>reset</Button>
            }
          </CallToAction>
        }

      </Contents>
    </Wrapper>
  )
}