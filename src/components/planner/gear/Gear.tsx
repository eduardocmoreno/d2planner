import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import Item from "./item/Item";
import { Items } from "./gear.styles";

export const GearContext = createContext({} as IGearContext);

const Gear = React.memo(() => {
  const { charData, charClass } = useContext(PlannerContext);
  const armorsData = useRef([] as IGearBase[]);
  const weaponsData = useRef([] as IGearBase[]);
  const modsData = useRef({} as TGearModsData);
  const partialClassSkillMods = useRef<Partial<TGearModName[]>>(['treeSkills', 'singleSkill']);
  const boclMods = useRef<Partial<TGearModName[]>>(['strength/lvl', 'dexterity/lvl', 'vitality/lvl', 'ar/lvl', 'ds/lvl', 'mf/lvl', 'def/lvl', 'ltngRes/lvl', 'maxDmg/lvl', 'eMaxDmg/lvl', 'dmgDemon/lvl', 'dmgUndead/lvl', 'life/lvl', 'mana/lvl']);
  const booleanMods = useRef<Partial<TGearModName[]>>(['ethereal', 'noHeal', 'ignoreDef', 'knockback', 'hitBlinds', 'indestruct', 'noFreeze', 'halfFreeze', 'rip']);
  const rangeMods = useRef<Partial<TGearModName[]>>(['fireDmg', 'coldDmg', 'ltngDmg']);
  const [hasTwoHanded, setHasTwoHanded] = useState(false);

  useEffect(() => {
    fetch(`/data/items/armor.json`)
      .then(res => res.json())
      .then((data: IGearBase[]) => {
        armorsData.current = data;
      });

    fetch(`/data/items/weapons.json`)
      .then(res => res.json())
      .then((data: IGearBase[]) => {
        weaponsData.current = data.filter(i => charData.classItems.includes(i.type));
      });

    fetch(`/data/items/mods.json`)
      .then(res => res.json())
      .then((data: TGearModsData) => {
        modsData.current = data;
      });
  }, [charData, charClass]);

  return (
    <GearContext.Provider value={{
      armorsData: armorsData.current,
      weaponsData: weaponsData.current,
      modsData: modsData.current,
      partialClassSkillMods: partialClassSkillMods.current,
      boclMods: boclMods.current,
      booleanMods: booleanMods.current,
      rangeMods: rangeMods.current
    }}>
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
});

export default Gear;