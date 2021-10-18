import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import ItemProps from "./ItemProps";
import ItemMods from "./ItemMods";
import Button from "components/ui/Button";
import { BaseSelector, Contents, Icon, Title, Wrapper } from "./Item.styles";

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

  const { gear, setGear } = useContext(PlannerContext);
  const [selectedBase, setSelectedBase] = useState({} as IGearProps);
  const [itemProps, setItemProps] = useState({} as IGearProps);
  const [itemMods, setItemMods] = useState({} as IGearMods);

  const htmlSelector = useRef<HTMLSelectElement>(null);

  function handleBaseSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let code = event.target.value;
    setSelectedBase(code ? bases?.find(i => i.code === code)! : {} as IGearProps);
  }

  function reset() {
    setSelectedBase({} as IGearProps);
    setItemProps({} as IGearProps);
    setItemMods({} as IGearMods);
    htmlSelector.current!.selectedIndex = 0;
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

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/items/${icon}.png`).default} alt={slot} />
      </Icon>
      <Contents>
        {bases ?
          <>
            <BaseSelector ref={htmlSelector} as="select" onChange={handleBaseSelect}>
              <option value="">{slot}</option>
              {bases.map(({ code, name }) =>
                <option value={code} key={code}>{name}</option>
              )}
            </BaseSelector>
            {Object.keys(selectedBase).length > 0 &&
              <ItemProps {...{ slot, itemProps, setItemProps, itemMods, selectedBase }} />
            }
          </>
          :
          <Title>{slot}</Title>
        }

        {gear.find(g => g.slot === slot) && Object.keys(selectedBase).length > 0 &&
          <>
            <ItemMods {...{ itemMods, setItemMods }} />
            {/* <Button red onClick={reset}>RESET ITEM</Button> */}
          </>
        }

      </Contents>
    </Wrapper>
  )
}