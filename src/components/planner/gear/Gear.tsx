import { createContext, useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import Item from "./Item";
import { capitalize } from "helpers";

export const GearContext = createContext({} as IGearContext);

export default function Gear() {
  const { charData, charClass } = useContext(PlannerContext);
  const armors = useRef([] as IGearProps[]);
  const weapons = useRef([] as IGearProps[]);
  const mods = useRef({} as TGearModsStr);
  const modsDescr = useRef({} as TGearModsDescr);

  const [hasTwoHanded, setHasTwoHanded] = useState(false);

  useEffect(() => {
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

    fetch(`/data/items/mods.json`)
      .then(res => res.json())
      .then((data: TGearModsStr) => {
        mods.current = data;
        modsDescr.current = Object.fromEntries(
          Object.entries(data).map(([k, v]) => {
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
              case 'nonClassSkill': {
                v = `Non-Class Skill`;
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
  }, [charData, charClass]);

  return (
    <GearContext.Provider value={{ armors: armors.current, weapons: weapons.current, mods: mods.current, modsDescr: modsDescr.current }}>
      <Items>
        <Item slot="head" icon="icon-head" />

        <Item slot="torso" icon="icon-armor" />

        <Item slot="right-hand" icon="icon-weapons" setHasTwoHanded={setHasTwoHanded} />

        {!hasTwoHanded &&
          <Item slot="left-hand" icon="icon-shield" />
        }

        <Item slot="gloves" icon="icon-gloves" />

        <Item slot="belt" icon="icon-belt" />

        <Item slot="boots" icon="icon-boots" />

        <Item slot="amulet" icon="icon-amulet" />

        <Item slot="left-ring" icon="icon-ring-left" />

        <Item slot="right-ring" icon="icon-ring-right" />

        <Item slot="torch" icon="icon-torch" />

        <Item slot="annihilus" icon="icon-annihilus" />

        <Item slot="charms" icon="icon-charms" />
      </Items>
    </GearContext.Provider>
  )
}

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

