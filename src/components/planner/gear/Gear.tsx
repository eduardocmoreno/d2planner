import { PlannerContext } from "pages/Planner";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Item from "./Item";


export default function Gear() {
  const { charData, gears } = useContext(PlannerContext);
  const armors = useRef([] as IGearProps[]);
  const weapons = useRef([] as IGearProps[]);

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
  }, []);

  return (
    <Gears>
      <Item name="head" bases={armors.current.filter(a => a.type! === 'helm')} icon="icon-head" />
      {/* <Item items={armors.current.filter(a => a.type! === 'helm')} title="head" icon="icon-head" /> */}

      {/* <Item items={armors.current.filter(a => a.type! === 'tors')} title="torso" icon="icon-armor" />
      
      <Item items={weapons.current} title="weapons" icon="icon-weapons" setHasTwoHanded={setHasTwoHanded} />

      {!hasTwoHanded &&
        <Item items={armors.current.filter(a => ['shie','ashd'].includes(a.type!))} title="shield" icon="icon-shield" />
      }

      <Item items={armors.current.filter(a => a.type! === 'glov')} title="hands" icon="icon-gloves" />

      <Item items={armors.current.filter(a => a.type! === 'belt')} title="belt" icon="icon-belt" />

      <Item items={armors.current.filter(a => a.type! === 'boot')} title="boots" icon="icon-boots" />*/}

      <Item name="amulet" icon="icon-amulet" />

      <Item name="left-ring" icon="icon-ring-left" />

      <Item name="right-ring" icon="icon-ring-right" />

      <Item name="torch" icon="icon-torch" />

      <Item name="annihilus" icon="icon-annihilus" />

      <Item name="charms" icon="icon-charms" /> 
    </Gears>
  )
}

const Gears = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

