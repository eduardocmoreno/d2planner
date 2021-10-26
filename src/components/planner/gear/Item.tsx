import { SetStateAction, useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "./Gear";
import ItemProps from "./ItemProps";
import ItemMods from "./ItemMods";
import FakeSelector from "components/ui/FakeSelector";
import { BaseSelector, Contents, Icon, Title, Wrapper } from "./Item.styles";

//TODO:
//make a form to add mods
//how mods are printed
//handle gear item props by mods (speed/IAS)
//handle skills


//armors.current.filter(a => a.type! === 'helm')

export default function Item({
  slot, icon, setHasTwoHanded
}: {
  slot: IGear['slot'],
  icon: string,
  setHasTwoHanded?: React.Dispatch<SetStateAction<boolean>>
}) {

  const { setGear } = useContext(PlannerContext);
  const { armors, weapons } = useContext(GearContext);

  const [bases, setBases] = useState([] as IGearProps[]);

  const [selectedBase, setSelectedBase] = useState({} as IGearProps);
  

  const [itemProps, setItemProps] = useState({} as IGearProps);
  const [itemMods, setItemMods] = useState({} as IGearMods);

  function handleBaseSelect(code: keyof IGearProps) {
    setSelectedBase(bases.find(i => i.code === code) || {} as IGearProps);
  }

  function reset() {
    setSelectedBase({} as IGearProps);
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
    switch (slot) {
      case 'head':
        setBases(armors.filter(a => a.type === 'helm')); break;
      case 'boots':
        setBases(armors.filter(a => a.type === 'boot')); break;
      case 'right-hand':
        setBases(weapons); break;
      case 'left-hand':
        setBases(armors.filter(a => ['shie', 'ashd'].includes(a.type!))); break;
      case 'torso':
        setBases(armors.filter(a => a.type === 'tors')); break;
      case 'belt':
        setBases(armors.filter(a => a.type === 'belt')); break;
      case 'gloves':
        setBases(armors.filter(a => a.type === 'glov')); break;
    }
  }, [slot, armors, weapons]);

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/items/${icon}.png`).default} alt={slot} />
      </Icon>
      <Contents>
        {bases.length > 0 ?
          <>
            <FakeSelector
              options={
                Object.fromEntries(bases.map(({ code, name }) => [code, name])!)
              }
              callBack={handleBaseSelect}>
              <BaseSelector>{selectedBase.name || slot}<i className='icon-arrow-down' /></BaseSelector>
            </FakeSelector>

            {Object.keys(selectedBase).length > 0 &&
              <ItemProps {...{ slot, itemProps, setItemProps, itemMods, selectedBase }} />
            }
          </>
          :
          <Title>{slot}</Title>
        }

        {(['amulet', 'left-ring', 'right-ring', 'torch', 'annihilus', 'charms'].includes(slot) || Object.keys(selectedBase).length > 0) &&
          <ItemMods {...{ itemMods, setItemMods, selectedBase, reset }} />
        }

      </Contents>
    </Wrapper>
  )
}