import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import Slot from "./Slot";
import gearInit from "config/gear";
import { includes } from "helpers";
import { GearWrapper, Slots } from "./gear.styles";
import Panel from "./Panel";

export const GearContext = createContext({} as GearContext);

export default function Gear() {
  const { charClass, charData, newGear } = useContext(PlannerContext);

  const [armorData, setArmorData] = useState([] as Item[]);
  const [weaponsData, setWeaponsData] = useState([] as Item[]);
  const [modsData, setModsData] = useState({} as ItemModsData);

  const [selectedSlot, setSelectedSlot] = useState({} as GearSlotSelected);
  const [selectedItem, setSelectedItem] = useState<string | null>();

  const slotsElem = useRef<HTMLDivElement>(null);

  const getPosition = useCallback(() => {
    return (slotsElem.current?.offsetHeight || 0) - (selectedSlot.position || 0);
  }, [selectedSlot]);

  const ctxProviderValue: GearContext = {
    armorData,
    weaponsData,
    modsData,

    partialClassSkillMods: ['treeSkills', 'singleSkill'],
    boclMods: ['strength/lvl', 'dexterity/lvl', 'vitality/lvl', 'ar/lvl', 'ds/lvl', 'mf/lvl', 'def/lvl', 'ltngRes/lvl', 'maxDmg/lvl', 'eMaxDmg/lvl', 'dmgDemon/lvl', 'dmgUndead/lvl', 'life/lvl', 'mana/lvl'],
    booleanMods: ['ethereal', 'noHeal', 'ignoreDef', 'knockback', 'hitBlinds', 'indestruct', 'noFreeze', 'halfFreeze', 'rip'],
    rangeMods: ['fireDmg', 'coldDmg', 'ltngDmg'],

    selectedSlot,
    setSelectedSlot
  }

  useEffect(() => {
    fetch(`/data/items/armor.json`)
      .then(res => res.json())
      .then((data: Item[]) => {
        setArmorData(data);
      });

    fetch(`/data/items/weapons.json`)
      .then(res => res.json())
      .then((data: Item[]) => {
        setWeaponsData(data.filter(i => charData.classItems.includes(i.type as string)));
      });

    fetch(`/data/items/mods.json`)
      .then(res => res.json())
      .then((data: ItemModsData) => {
        setModsData(data);
      });
  }, [charData, charClass]);

  useLayoutEffect(() => {
    if (!!selectedSlot.name) {
      function handleClickOutside(e: any) {
        if ((e.target === slotsElem.current && !Array.from(slotsElem.current?.childNodes!).some(c => c.contains(e.target))) || e.key === 'Escape') {
          setSelectedSlot({} as GearSlotSelected);
        }
      }

      ['mousedown', 'keydown'].forEach(e => {
        window.addEventListener(e, handleClickOutside);
      });

      return () => {
        ['mousedown', 'keydown'].forEach(e => {
          window.removeEventListener(e, handleClickOutside);
        });
      };
    }
  });

  const slotRelatedItems: Record<GearSlot, ItemType[]> = {
    'head': ['helm', 'circ'],
    'boots': ['boot'],
    'right-hand': [],
    'left-hand': ['shie', 'ashd'],
    'torso': ['tors'],
    'belt': ['belt'],
    'gloves': ['glov'],
    'amulet': [],
    'left-ring': [],
    'right-ring': [],
    'torch': [],
    'annihilus': [],
    'small-charms': [],
    'large-charms': [],
    'grand-charms': []
  }

  const getSlotRelatedItems = (items: Item[], types: ItemType[]) => {
    return items.filter(a => includes(types, a.type!))
  }

  const baseList: Record<GearSlot, Item[]> = useMemo(() => {
    return {
      'head': getSlotRelatedItems(armorData, ['helm', 'circ']),
      'boots': getSlotRelatedItems(armorData, ['boot']),
      'right-hand': weaponsData.filter(i => charData.classItems.includes(i.type!)),
      'left-hand': getSlotRelatedItems(armorData, ['shie', 'ashd']),
      'torso': getSlotRelatedItems(armorData, ['tors']),
      'belt': getSlotRelatedItems(armorData, ['belt']),
      'gloves': getSlotRelatedItems(armorData, ['glov']),
      'amulet': [] as Item[],
      'left-ring': [] as Item[],
      'right-ring': [] as Item[],
      'torch': [] as Item[],
      'annihilus': [] as Item[],
      'small-charms': [] as Item[],
      'large-charms': [] as Item[],
      'grand-charms': [] as Item[],
    }
  }, [charData.classItems, armorData, weaponsData]);

  return (
    <GearContext.Provider value={ctxProviderValue}>
      <GearWrapper anySlotSelected={!!selectedSlot.name}>
        <Slots ref={slotsElem}>
          {gearInit.map(g => <Slot key={g.slot} name={g.slot} icon={g.icon} />)}
        </Slots>

        {!!selectedSlot.name && <Panel position={getPosition()} />}

      </GearWrapper>
    </GearContext.Provider>
  )
}


/* 
Refactoring armor API based on original
Object.values(references.armor).map(a => {
    let newBase = {};

    newBase.name = a.name;
    newBase.code = a.code;

    if(a.ubercode){
        newBase.uberCode = a.ubercode;
    }

    if(a.ultracode){
        newBase.ultraCode = a.ultracode;
    }

    newBase = {
        ...newBase,
        type: a.type,
        lvl: a.level,
        lvlReq: a.levelreq,
        durability: a.durability,
        noDurability: a.nodurability,
        sockets: a.gemsockets,
        minDef: a.minac,
        maxDef: a.maxac
    }

    if(a.block){
        newBase.minDef = a.maxac;
    }

    if(a.reqstr){
        newBase.strReq = a.reqstr;
    }

    if(a.strbonus){
        newBase.strBonus = a.strbonus;
    }

    if(a.reqdex){
        newBase.dexReq = a.reqdex;
    }

    if(a.dexbonus){
        newBase.dexBonus = a.dexbonus;
    }

    if(a.magiclvl){
        newBase.magicLvl = a.magiclvl;
    }

    if(a.costmult){
        newBase.costMult = a.costmult;
    }

    newBase.image = a.hd;
    
    return newBase;
});
*/