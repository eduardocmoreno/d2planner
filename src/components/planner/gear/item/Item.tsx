import { SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "../Gear";
import ItemBase from "../itemBase/ItemBase";
import ItemMods from "../itemMods/ItemMods";
import FakeSelector from "components/ui/FakeSelector";
import { BaseSelector, Contents, Icon, Title, Wrapper } from "./item.styles";
import { getItemMod } from "helpers";

export default function Item({
  slot, icon, setHasTwoHanded
}: {
  slot: IGear['slot'];
  icon: string;
  setHasTwoHanded?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { setGear } = useContext(PlannerContext);
  const { armorsData, weaponsData } = useContext(GearContext);

  const [basesList, setBasesList] = useState([] as IGearBase[]);
  const [selectedBase, setSelectedBase] = useState({} as IGearBase);
  const [base, setBase] = useState({} as IGearBase);
  const [mods, setMods] = useState([] as IGearMod[]);

  function handleBaseSelect(code: keyof IGearBase) {
    setSelectedBase(basesList.find(i => i.code === code) || {} as IGearBase);
  }

  function reset() {
    setSelectedBase({} as IGearBase);
    setMods([] as IGearMod[]);
  }

  useEffect(() => {
    setHasTwoHanded?.(!!selectedBase?.twoHanded);
  }, [selectedBase, setHasTwoHanded]);

  useEffect(() => {
    if (selectedBase.nodurability && getItemMod(mods, 'ethereal')) {
      setMods(prev => {
        return prev.filter(p => {
          if (p.name !== 'ethereal') {
            return p;
          }
          return false;
        });
      });
    }
    console.log(mods);
  }, [selectedBase, mods, setMods]);

  useEffect(() => {
    if (mods.length || Object.values(base).length) {
      setGear(prev => {
        return prev.map(p => {
          if (p.slot === slot) {
            return {
              ...p,
              base: { ...base },
              mods: [...mods]
            }
          }
          return p;
        })
      });
    }
  }, [slot, base, mods, setGear]);

  useEffect(() => {
    switch (slot) {
      case 'head':
        setBasesList(armorsData.filter(a => a.type === 'helm')); break;
      case 'boots':
        setBasesList(armorsData.filter(a => a.type === 'boot')); break;
      case 'right-hand':
        setBasesList(weaponsData); break;
      case 'left-hand':
        setBasesList(armorsData.filter(a => ['shie', 'ashd'].includes(a.type!))); break;
      case 'torso':
        setBasesList(armorsData.filter(a => a.type === 'tors')); break;
      case 'belt':
        setBasesList(armorsData.filter(a => a.type === 'belt')); break;
      case 'gloves':
        setBasesList(armorsData.filter(a => a.type === 'glov')); break;
    }
  }, [slot, armorsData, weaponsData]);

  const baseListOpts = useMemo(() => {
    return Object.fromEntries(basesList.map(({ code, name }) => [code, name])!)
  }, [basesList])

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/items/${icon}.png`).default} alt={slot} />
      </Icon>
      <Contents>
        {basesList.length > 0 ?
          <>
            <FakeSelector
              options={baseListOpts}
              callBack={handleBaseSelect}>
              <BaseSelector>{selectedBase.name || slot}<i className='icon-arrow-down' /></BaseSelector>
            </FakeSelector>

            {Object.keys(selectedBase).length > 0 &&
              <ItemBase {...{ slot, base, setBase, mods, selectedBase }} />
            }
          </>
          :
          <Title>{slot}</Title>
        }

        {(['amulet', 'left-ring', 'right-ring', 'torch', 'annihilus', 'charms'].includes(slot) || Object.keys(selectedBase).length > 0) &&
          <ItemMods {...{ mods, setMods, selectedBase, reset }} />
        }

      </Contents>
    </Wrapper>
  )
}