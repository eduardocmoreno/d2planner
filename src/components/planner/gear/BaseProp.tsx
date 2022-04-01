import { useContext, useEffect, useRef } from "react";
import { PlannerContext } from "pages/Planner";
import { capitalize, getItemMod } from "helpers";
import Tooltip from "components/ui/Tooltip";

export default function BaseProp({ base, mods, cleanBase, prop }: {
  base: Partial<Item>;
  mods: ItemMod[];
  cleanBase: Partial<Item>;
  prop: ItemVisibleProps;
}) {
  const { charClass, charData, charLevel, attrs, newGear } = useContext(PlannerContext);

  const isShield = ['shie', 'ashd'].includes(cleanBase.type!);
  const isWeapon = !!cleanBase.weaponClass;

  const offWeaponItemsRef = useRef([] as Gear[]);
  const offWeaponItems = offWeaponItemsRef.current;

  const weaponClassDescr: Partial<Record<ItemType, string>> = {
    axe: "Axe Class",
    taxe: "Axe Class",
    
    swor: "Sword Class",

    knif: "Dagger Class",
    tkni: "Dagger Class",

    spea: "Spear Class",
    aspe: "Spear Class",
    
    jave: "Javelin Class",
    ajav: "Javelin Class",
    
    pole: "Polearm Class",
    
    club: "Mace Class",
    hamm: "Mace Class",
    mace: "Mace Class",
    scep: "Mace Class",
    
    wand: "Staff Class",
    staf: "Staff Class",
    orb: "Staff Class",
    
    h2h: "Claw Class",
    h2h2: "Claw Class",
    
    bow: "Bow Class",
    abow: "Bow Class",
    
    xbow: "CrossBow Class",
    
    tpot: "Equip to Throw"
  }

  useEffect(() => {
    offWeaponItemsRef.current = newGear.filter(g => !g.base.weaponClass && !!Object.values(g.mods).length);
  }, [newGear]);

  switch (prop) {
    case 'minDef': {
      if (prop in base) {
        let result = <span>{base.maxDef}</span>;

        if (base.maxDef! > cleanBase.maxDef!) {
          result = <Tooltip as="span" className="highlight" data-tooltip={`Base Defense: ${cleanBase.maxDef}`}>{base.maxDef/*  + ((getItemMod(mods, 'def/lvl')?.value || 0) * charLevel) */}</Tooltip>
        }

        return <li>Defense: {result}</li>
      }
      return null;
    }

    case 'minDmg': {
      if (prop in base) {
        let propLabel = isShield ? 'Smite' : 'One-Hand';
        let result = <span>{base.minDmg}-{base.maxDmg}</span>;
        let dataTooltip = `Base ${propLabel} Damage: ${cleanBase.minDmg}-${cleanBase.maxDmg}`;
        let rhSlot = newGear.find(g => g.slot === 'right-hand');
        let rhDmgMod = !!rhSlot?.mods.length ? getItemMod(rhSlot?.mods, 'dmg')?.value : 0;

        if (base.minDmg! > cleanBase.minDmg! || base.maxDmg! > cleanBase.maxDmg!) {
          if (isWeapon) {
            offWeaponItems.forEach(g => {
              if (getItemMod(g.mods, 'dmg-min') || getItemMod(g.mods, 'dmg-max')) {
                dataTooltip += `\n${capitalize(g.slot)}: +${getItemMod(g.mods, 'dmg-min')?.value || 0}-${getItemMod(g.mods, 'dmg-max')?.value || 0}`;
              }
            });
          }

          if (isShield && rhDmgMod) {
            dataTooltip += `\n${capitalize(rhSlot?.slot as string)}: +${rhDmgMod}`;
          }

          result = <Tooltip as="span" className="highlight" data-tooltip={dataTooltip}>{base.minDmg}-{base.maxDmg}</Tooltip>
        }

        if (charClass !== 'barbarian' && cleanBase.twoHanded && cleanBase.oneOrTwoHanded) {
          return null;
        }

        return <li>{propLabel} Damage: {result}</li>
      }
      return null;
    }

    case 'twoHandMinDmg': {
      if (prop in base) {
        let result = <span>{base.twoHandMinDmg}-{base.twoHandMaxDmg}</span>;
        let dataTooltip = `Base Two-Hand Damage: ${cleanBase.twoHandMinDmg}-${cleanBase.twoHandMaxDmg}`;

        if (base.twoHandMinDmg! > cleanBase.twoHandMinDmg! || base.twoHandMaxDmg! > cleanBase.twoHandMaxDmg!) {
          result = <Tooltip as="span" className="highlight" data-tooltip={dataTooltip}>{base.twoHandMinDmg}-{base.twoHandMaxDmg}</Tooltip>
        }

        return <li>Two-Hand Damage: {result}</li>
      }
      return null;
    }

    case 'throwMinDmg': {
      if (prop in base) {
        let result = <span>{base.throwMinDmg}-{base.throwMaxDmg}</span>;
        let dataTooltip = `Base Throw Damage: ${cleanBase.throwMinDmg}-${cleanBase.throwMaxDmg}`;

        if (base.throwMinDmg! > cleanBase.throwMinDmg! || base.throwMaxDmg! > cleanBase.throwMaxDmg!) {
          result = <Tooltip as="span" className="highlight" data-tooltip={dataTooltip}>{base.throwMinDmg}-{base.throwMaxDmg}</Tooltip>
        }

        return <li>Throw Damage: {result}</li>
      }
      return null;
    }

    case 'block': {
      if (prop in base) {
        let totalBlock = charData.stats.block + base.block!;
        let finalBlock = totalBlock > 75 ? 75 : totalBlock;
        let dataTooltip = `${capitalize(charClass)} Block Factor: ${charData.stats.block}%\nBase Block: ${base.block}%\nMax Block Allowed: 75%`;
        return <li>Chance to Block: <Tooltip as="span" className="highlight" data-tooltip={dataTooltip}>{finalBlock}%</Tooltip></li>
      }
      return null;
    }

    case 'levelReq': {
      if (prop in base) {
        let result = <span>{base.lvlReq}</span>;

        if (charLevel < base.lvlReq!) {
          result = <Tooltip as="span" className="warn" data-tooltip={`Current Character Level: ${charLevel}`}>{cleanBase.lvlReq}</Tooltip>;
        }

        return <li>Required Level: {result}</li>
      }
      return null;
    }

    case 'strReq':
    case 'dexReq': {
      if (prop in base) {
        let attrName: keyof Attrs = prop === 'strReq' ? 'strength' : 'dexterity';
        let attrReq = base[prop];
        let reqVal = attrReq || cleanBase[prop] || 0;
        let result = <span>{attrReq}</span>
        let dataTooltip = `Current Character ${capitalize(attrName!)}: ${attrs[attrName!].total}`;

        if (attrReq! < cleanBase[prop]!) {
          dataTooltip += `\nBase Requirement: ${cleanBase[prop]}`;
          result = <Tooltip as="span" className="highlight" data-tooltip={dataTooltip}>{attrReq}</Tooltip>
        }

        if (attrs[attrName!].total! < reqVal) {
          result = <Tooltip as="span" className="warn" data-tooltip={dataTooltip}>{reqVal}</Tooltip>
        }

        return <li>Required {capitalize(attrName!)}: {result}</li>
      }
      return null;
    }

    case 'sockets': {
      if (prop in base && !!base[prop]) {
        return <li>Max Sockets: <span>{cleanBase.sockets}</span></li>
      }
      return null;
    }

    case 'speed': {
      if (isWeapon) {
        let classWeaponSpeed = charData.classWeaponSpeed[cleanBase.weaponClass!];
        let baseSpeed = (base.speed || 0) - (getItemMod(mods, 'swing')?.value || 0);
        let speedStr = "Very Fast Attack Speed";

        if (baseSpeed >= classWeaponSpeed[3]) {
          speedStr = "Very Slow Attack Speed";
        }

        if (baseSpeed >= classWeaponSpeed[2]) {
          speedStr = "Slow Attack Speed";
        }

        if (baseSpeed >= classWeaponSpeed[1]) {
          speedStr = "Normal Attack Speed";
        }

        if (baseSpeed >= classWeaponSpeed[0]) {
          speedStr = "Fast Attack Speed";
        }

        return (
          <>
            <li>Weapon Speed Modifier: <span>{cleanBase.speed || 0}</span></li>
            <li>{weaponClassDescr[cleanBase.type!]}: <span>{speedStr}</span></li>
          </>
        )
      }
      return null;
    }
  }
}