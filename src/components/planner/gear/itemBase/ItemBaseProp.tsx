import { useContext, useEffect, useRef } from "react";
import Tooltip from "components/ui/Tooltip";
import { PlannerContext } from "pages/Planner";
import { capitalize, getItemMod } from "helpers";

export default function ItemProp({ base, mods, selectedBase, prop }: {
  base: IGearBase;
  mods: IGearMod[];
  selectedBase: IGearBase;
  prop: TGearBaseVisibleProps;
}) {
  const { charClass, charData, charLevel, attrs, gear } = useContext(PlannerContext);

  const isShield = ['shie', 'ashd'].includes(selectedBase.type);
  const isWeapon = !!selectedBase.weaponClass;

  const offWeaponItemsRef = useRef([] as IGear[]);
  const offWeaponItems = offWeaponItemsRef.current;

  const weaponClassDescr: Partial<Record<IGearBase['type'], string>> = {
    axe: "Axe Class",
    swor: "Sword Class",
    knif: "Dagger Class",
    spea: "Spear Class",
    jave: "Javelin Class",
    pole: "Polearm Class",
    club: "Mace Class",
    hamm: "Mace Class",
    mace: "Mace Class",
    scep: "Mace Class",
    wand: "Staff Class",
    staf: "Staff Class",
    orb: "Staff Class",
    h2h: "Claw Class",
    bow: "Bow Class",
    xbow: "CrossBow Class",
    tpot: "Equip to Throw"
  }

  useEffect(() => {
    offWeaponItemsRef.current = gear.filter(g => !g.base.weaponClass && Object.values(g.mods).length > 0);
  }, [gear]);

  switch (prop) {
    case 'minDef': {
      if (prop in base) {
        let result = <span>{base.maxDef}</span>;

        if (base.maxDef > selectedBase.maxDef) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={`Base Defense: ${selectedBase.maxDef}`}>{base.maxDef}</Tooltip>
        }

        return <li>Defense: {result}</li>
      }
      return null;
    }

    case 'minDmg': {
      if (prop in base) {
        let propLabel = isShield ? 'Smite' : 'One-Hand';
        let result = <span>{base.minDmg}-{base.maxDmg}</span>;
        let dataTooltip = `Base ${propLabel} Damage: ${selectedBase.minDmg}-${selectedBase.maxDmg}`;
        let rhSlot = gear.find(g => g.slot === 'right-hand');
        let rhDmgMod = rhSlot?.mods.length ? getItemMod(rhSlot?.mods, 'dmg')?.value : 0;

        if (base.minDmg > selectedBase.minDmg || base.maxDmg > selectedBase.maxDmg) {
          if (isWeapon) {
            offWeaponItems.forEach(g => {
              if (getItemMod(g.mods, 'minDmg') || getItemMod(g.mods, 'maxDmg')) {
                dataTooltip += `\n${capitalize(g.slot)}: +${getItemMod(g.mods, 'minDmg')?.value || 0}-${getItemMod(g.mods, 'maxDmg')?.value || 0}`;
              }
            });
          }

          if (isShield && rhDmgMod) {
            dataTooltip += `\n${capitalize(rhSlot?.slot as string)}: +${rhDmgMod}`;
          }

          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{base.minDmg}-{base.maxDmg}</Tooltip>
        }

        if (charClass !== 'barbarian' && selectedBase.twoHanded && selectedBase.oneOrTwoHanded) {
          return null;
        }

        return <li>{propLabel} Damage: {result}</li>
      }
      return null;
    }

    case 'twoHandMinDmg': {
      if (prop in base) {
        let result = <span>{base.twoHandMinDmg}-{base.twoHandMaxDmg}</span>;
        let dataTooltip = `Base Two-Hand Damage: ${selectedBase.twoHandMinDmg}-${selectedBase.twoHandMaxDmg}`;

        if (base.twoHandMinDmg > selectedBase.twoHandMinDmg || base.twoHandMaxDmg > selectedBase.twoHandMaxDmg) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{base.twoHandMinDmg}-{base.twoHandMaxDmg}</Tooltip>
        }

        return <li>Two-Hand Damage: {result}</li>
      }
      return null;
    }

    case 'throwMinDmg': {
      if (prop in base) {
        let result = <span>{base.throwMinDmg}-{base.throwMaxDmg}</span>;
        let dataTooltip = `Base Throw Damage: ${selectedBase.throwMinDmg}-${selectedBase.throwMaxDmg}`;

        if (base.throwMinDmg > selectedBase.throwMinDmg || base.throwMaxDmg > selectedBase.throwMaxDmg) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{base.throwMinDmg}-{base.throwMaxDmg}</Tooltip>
        }

        return <li>Throw Damage: {result}</li>
      }
      return null;
    }

    case 'block': {
      if (prop in base) {
        let dataTooltip = `${capitalize(charClass)} Block Factor: ${charData.stats.block}%\nBase Block: ${selectedBase.block}%\nMax Block Allowed: 75%`;
        return <li>Chance to Block: <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{base.block! > 75 ? 75 : base.block!}%</Tooltip></li>
      }
      return null;
    }

    case 'levelReq': {
      if (prop in base) {
        let result = <span>{base.levelReq}</span>;

        if (charLevel < base.levelReq) {
          result = <Tooltip as="span" className="warn" center data-tooltip={`Current Character Level: ${charLevel}`}>{selectedBase.levelReq}</Tooltip>;
        }

        return <li>Required Level: {result}</li>
      }
      return null;
    }

    case 'strReq':
    case 'dexReq': {
      if (prop in base) {
        let attrName: keyof IAttrs = prop === 'strReq' ? 'strength' : 'dexterity';
        let attrReq = base[prop];
        let reqVal = attrReq || selectedBase[prop] || 0;
        let result = <span>{attrReq}</span>
        let dataTooltip = `Current Character ${capitalize(attrName!)}: ${attrs[attrName!].total}`;

        if (attrReq! < selectedBase[prop]) {
          dataTooltip += `\nBase Requirement: ${selectedBase[prop]}`;
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{attrReq}</Tooltip>
        }

        if (attrs[attrName!].total! < reqVal) {
          result = <Tooltip as="span" className="warn" center data-tooltip={dataTooltip}>{reqVal}</Tooltip>
        }

        return <li>Required {capitalize(attrName!)}: {result}</li>
      }
      return null;
    }

    case 'sockets': {
      if (prop in base) {
        return <li>Max Sockets: <span>{selectedBase.sockets}</span></li>
      }
      return null;
    }

    case 'speed': {
      if (isWeapon) {
        let classWeaponSpeed = charData.classWeaponSpeed[selectedBase.weaponClass];
        let baseSpeed = (base.speed || 0) - (getItemMod(mods, 'ias')?.value || 0);
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
            <li>Weapon Speed Modifier: <span>{selectedBase.speed || 0}</span></li>
            <li>{weaponClassDescr[selectedBase.type]}: <span>{speedStr}</span></li>
          </>
        )
      }
      return null;
    }
  }
}