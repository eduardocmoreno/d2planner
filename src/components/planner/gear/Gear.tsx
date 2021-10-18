import { PlannerContext } from "pages/Planner";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Item from "./Item";

export default function Gear() {
  const { charData } = useContext(PlannerContext);
  const armors = useRef([] as IGearProps[]);
  const weapons = useRef([] as IGearProps[]);

  const [hasTwoHanded, setHasTwoHanded] = useState(false);

  useEffect(() => {
    //setIsLoading(true);
    fetch(`/data/items/armor.json`)
      .then(res => res.json())
      .then((data: IGearProps[]) => {
        armors.current = data;
      });

    fetch(`/data/items/weapons.json`)
      .then(res => res.json())
      .then((data: IGearProps[]) => {
        weapons.current = data.filter(i => charData.classItems?.includes(i.type));
      });
  }, [charData]);

  return (
    <Items>
      <Item slot="head" bases={armors.current.filter(a => a.type! === 'helm')} icon="icon-head" />

      <Item slot="torso" bases={armors.current.filter(a => a.type! === 'tors')} icon="icon-armor" />

      <Item slot="right-hand" bases={weapons.current} icon="icon-weapons" setHasTwoHanded={setHasTwoHanded} />

      {!hasTwoHanded &&
        <Item
          slot="left-hand"
          bases={armors.current.filter(a => ['shie', 'ashd'].includes(a.type!))}
          icon="icon-shield"
        />
      }

      {/* <Item slot="gloves" bases={armors.current.filter(a => a.type! === 'glov')} icon="icon-gloves" />

    <Item slot="belt" bases={armors.current.filter(a => a.type! === 'belt')} icon="icon-belt" />

    <Item slot="boots" bases={armors.current.filter(a => a.type! === 'boot')} icon="icon-boots" />

    <Item slot="amulet" icon="icon-amulet" />

    <Item slot="left-ring" icon="icon-ring-left" />

    <Item slot="right-ring" icon="icon-ring-right" />

    <Item slot="torch" icon="icon-torch" />

    <Item slot="annihilus" icon="icon-annihilus" />

    <Item slot="charms" icon="icon-charms" /> */}
    </Items>
  )
}

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

