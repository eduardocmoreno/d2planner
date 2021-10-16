import Tooltip from "components/ui/Tooltip";
import { capitalize } from "helpers";
import { PlannerContext } from "pages/Planner";
import { useContext, useEffect, useRef } from "react";

export default function ItemProp({ slot, itemProps, selectedBase, prop }: {
  slot: IGear['slot'],
  itemProps: Partial<IGearProps>,
  selectedBase: Partial<IGearProps>,
  prop: TItemPropsToRender
}) {
  const { charClass, charData, charLevel, attrs, gear } = useContext(PlannerContext);

  const isShield = ['shie', 'ashd'].includes(selectedBase.type!);
  const isWeapon = !!selectedBase.weaponClass;

  const offWeaponItemsRef = useRef([] as IGear[]);
  const offWeaponItems = offWeaponItemsRef.current;

  useEffect(() => {
    offWeaponItemsRef.current = gear.filter(g => !g.base.weaponClass && Object.values(g.mods).length > 0);
  }, [gear]);

  switch (prop) {
    case 'minDef': {
      if (prop in itemProps!) {
        let result = <span>{itemProps.maxDef}</span>;

        if (itemProps.maxDef! > selectedBase.maxDef!) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={`Base Defense: ${selectedBase.maxDef}`}>{itemProps.maxDef}</Tooltip>
        }

        return <li>Defense: {result}</li>
      }
      return null;
    }

    case 'minDmg': {
      if (prop in itemProps!) {
        let propLabel = isShield ? 'Smite' : 'One-Hand';
        let result = <span>{itemProps.minDmg}-{itemProps.maxDmg}</span>;
        let dataTooltip = `Base ${propLabel} Damage: ${selectedBase.minDmg}-${selectedBase.maxDmg}`;
        let rhSlot = gear.find(g => g.slot === 'right-hand');

        if (itemProps.minDmg! > selectedBase.minDmg! || itemProps.maxDmg! > selectedBase.maxDmg!) {
          if (isWeapon) {
            offWeaponItems.forEach(g => {
              dataTooltip += `\n${capitalize(g.slot)}: +${(g.mods.minDmg || 0)}-${(g.mods.maxDmg || 0)}`;
            });
          }

          if (isShield && rhSlot?.mods.dmg) {
            dataTooltip += `\n${rhSlot?.props.name || rhSlot?.slot} Damage: +${rhSlot?.mods.dmg}`;
          }
          
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.minDmg}-{itemProps.maxDmg}</Tooltip>
        }

        return <li>{propLabel} Damage: {result}</li>
      }
      return null;
    }

    case 'twoHandMinDmg': {
      if (prop in itemProps!) {
        let result = <span>{itemProps.twoHandMinDmg}-{itemProps.twoHandMaxDmg}</span>;
        let dataTooltip = `Base Two-Hand Damage: ${selectedBase.twoHandMinDmg}-${selectedBase.twoHandMaxDmg}`;

        if (itemProps.twoHandMinDmg! > selectedBase.twoHandMinDmg! || itemProps.twoHandMaxDmg! > selectedBase.twoHandMaxDmg!) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.twoHandMinDmg}-{itemProps.twoHandMaxDmg}</Tooltip>
        }

        return <li>Two-Hand Damage: {result}</li>
      }
      return null;
    }

    case 'throwMinDmg': {
      if (prop in itemProps!) {
        let result = <span>{itemProps.throwMinDmg}-{itemProps.throwMaxDmg}</span>;
        let dataTooltip = `Base Throw Damage: ${selectedBase.throwMinDmg}-${selectedBase.throwMaxDmg}`;

        if (itemProps.throwMinDmg! > selectedBase.throwMinDmg! || itemProps.throwMaxDmg! > selectedBase.throwMaxDmg!) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.throwMinDmg}-{itemProps.throwMaxDmg}</Tooltip>
        }

        return <li>Throw Damage: {result}</li>
      }
      return null;
    }

    case 'block': {
      if (prop in itemProps!) {
        let dataTooltip = `${capitalize(charClass)} Block Factor: ${charData.stats.block}%\nBase Block: ${selectedBase.block}%\nMax Block Allowed: 75%`;
        return <li>Chance to Block: <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.block! > 75 ? 75 : itemProps.block!}%</Tooltip></li>
      }
      return null;
    }

    case 'levelReq': {
      if (prop in itemProps!) {
        let result = <span>{itemProps.levelReq}</span>;

        if (charLevel < itemProps.levelReq!) {
          result = <Tooltip as="span" className="warn" center data-tooltip={`Current Character Level: ${charLevel}`}>{selectedBase.levelReq}</Tooltip>;
        }

        return <li>Required Level: {result}</li>
      }
      return null;
    }

    case 'strReq':
    case 'dexReq': {
      if (prop in itemProps!) {
        let attrName: keyof IAttrs;

        if (prop === 'strReq') attrName = 'strength';
        if (prop === 'dexReq') attrName = 'dexterity';

        let attrReq = itemProps![prop];
        let reqVal = attrReq || selectedBase[prop] || 0;
        let result = <span>{attrReq}</span>
        let dataTooltip = `Current Character ${capitalize(attrName!)}: ${attrs[attrName!].total}`;

        if (attrReq! < selectedBase[prop]!) {
          dataTooltip += `\nBase Requirement: ${selectedBase[prop]!}`;
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
      if (prop in itemProps!) {
        return <li>Max Sockets: <span>{selectedBase.sockets}</span></li>
      }
      return null;
    }

    case 'speed': {
      if (prop in itemProps!) {
        return <li>Item Class (ex. AXE CLASS): <span>{itemProps.speed}</span></li>
      }
      return null;
    }
  }
}