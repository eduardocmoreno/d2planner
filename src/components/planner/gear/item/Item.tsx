import { SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "../Gear";
import ItemBase from "../itemBase/ItemBase";
import ItemMods from "../itemMods/ItemMods";
import FakeSelector from "components/ui/FakeSelector";
import { BaseSelector, CallToAction, Contents, Icon, Title, Wrapper } from "./item.styles";
import { getItemMod } from "helpers";
import Button from "components/ui/Button";

export default function Item({
  slot, icon, setHasTwoHanded
}: {
  slot: IGear['slot'];
  icon: string;
  setHasTwoHanded?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { setGear } = useContext(PlannerContext);
  const { armorsData, weaponsData, modsData } = useContext(GearContext);

  const [base, setBase] = useState({} as IGearBase);
  const [mods, setMods] = useState([] as IGearMod[]);
  const [selectedBase, setSelectedBase] = useState({} as IGearBase);
  const [selectedMod, setSelectedMod] = useState<TGearModName | null>(null);
  const [basesList, setBasesList] = useState([] as IGearBase[]);

  const selectedBaseHaveLength = Object.keys(selectedBase).length > 0;
  const modsHaveLength = Object.keys(mods).length > 0;

  const modsListOpts = useMemo<Partial<Record<TGearModName, string>>>(() => {
    let opts = Object.fromEntries((Object.values(modsData) as IGearModData[]).map((mod: IGearModData) => {
      return [mod.name, (mod.shortDescr || mod.descr)];
    }));

    if (selectedBase.nodurability) {
      delete opts.ethereal;
    }

    return opts;
  }, [modsData, selectedBase]);

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
  }, [selectedBase, mods, setMods]);

  useEffect(() => {
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
    setSelectedMod(null);
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
    <Wrapper haveProps={modsHaveLength || selectedBaseHaveLength}>
      <Icon>
        <img src={require(`assets/images/items/${icon}.png`).default} alt={slot} />
      </Icon>

      <Contents>
        {basesList.length > 0 ?
          <>
            <FakeSelector options={baseListOpts} callBack={handleBaseSelect}>
              <BaseSelector>{selectedBase.name || slot}<i className='icon-arrow-down' /></BaseSelector>
            </FakeSelector>

            {selectedBaseHaveLength &&
              <ItemBase {...{ slot, base, setBase, mods, selectedBase }} />
            }
          </>
          :
          <Title>{slot}</Title>
        }

        {(['amulet', 'left-ring', 'right-ring', 'torch', 'annihilus', 'charms'].includes(slot) || selectedBaseHaveLength) &&
          <>
            <ItemMods {...{ mods, setMods, selectedMod }} />

            <CallToAction>
              <FakeSelector options={modsListOpts} callBack={setSelectedMod}>
                <Button blue arrowLeft={modsHaveLength || selectedBaseHaveLength}>add mod</Button>
              </FakeSelector>

              {(modsHaveLength || selectedBaseHaveLength) &&
                <Button red arrowRight onClick={() => reset()}>reset item</Button>
              }
            </CallToAction>
          </>
        }
      </Contents>
    </Wrapper>
  )
}