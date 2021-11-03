import { useContext, useEffect, useRef } from "react";
import Tooltip from "components/ui/Tooltip";
import { PlannerContext } from "pages/Planner";
import { capitalize, getItemMod } from "helpers";

export default function ItemProp({ itemProps, itemMods, selectedBase, prop }: {
  itemProps: IGearProps;
  itemMods: IGearMod[];
  selectedBase: IGearProps;
  prop: TItemPropsToRender;
}) {
  const { charClass, charData, charLevel, attrs, gear } = useContext(PlannerContext);

  const isShield = ['shie', 'ashd'].includes(selectedBase.type);
  const isWeapon = !!selectedBase.weaponClass;

  const offWeaponItemsRef = useRef([] as IGear[]);
  const offWeaponItems = offWeaponItemsRef.current;

  const weaponClassDescr: Partial<Record<IGearProps['type'], string>> = {
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
      if (prop in itemProps) {
        let result = <span>{itemProps.maxDef}</span>;

        if (itemProps.maxDef > selectedBase.maxDef) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={`Base Defense: ${selectedBase.maxDef}`}>{itemProps.maxDef}</Tooltip>
        }

        return <li>Defense: {result}</li>
      }
      return null;
    }

    case 'minDmg': {
      if (prop in itemProps) {
        let propLabel = isShield ? 'Smite' : 'One-Hand';
        let result = <span>{itemProps.minDmg}-{itemProps.maxDmg}</span>;
        let dataTooltip = `Base ${propLabel} Damage: ${selectedBase.minDmg}-${selectedBase.maxDmg}`;
        let rhSlot = gear.find(g => g.slot === 'right-hand');
        let rhDmgMod = rhSlot?.mods.length ? getItemMod(rhSlot?.mods, 'dmg').value : 0;

        if (itemProps.minDmg > selectedBase.minDmg || itemProps.maxDmg > selectedBase.maxDmg) {
          if (isWeapon) {
            offWeaponItems.forEach(g => {
              if (['minDmg', 'maxDmg'].includes(Object.keys(g.mods)[0])) {
                dataTooltip += `\n${capitalize(g.props.name!)}: +${getItemMod(g.mods, 'minDmg').value || 0}-${getItemMod(g.mods, 'maxDmg').value || 0}`;
              }
            });
          }

          if (isShield && rhDmgMod) {
            dataTooltip += `\n${rhSlot?.props.name || rhSlot?.slot} Damage: +${rhDmgMod}`;
          }

          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.minDmg}-{itemProps.maxDmg}</Tooltip>
        }

        if (charClass !== 'barbarian' && selectedBase.twoHanded && selectedBase.oneOrTwoHanded) {
          return null;
        }

        return <li>{propLabel} Damage: {result}</li>
      }
      return null;
    }

    case 'twoHandMinDmg': {
      if (prop in itemProps) {
        let result = <span>{itemProps.twoHandMinDmg}-{itemProps.twoHandMaxDmg}</span>;
        let dataTooltip = `Base Two-Hand Damage: ${selectedBase.twoHandMinDmg}-${selectedBase.twoHandMaxDmg}`;

        if (itemProps.twoHandMinDmg > selectedBase.twoHandMinDmg || itemProps.twoHandMaxDmg > selectedBase.twoHandMaxDmg) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.twoHandMinDmg}-{itemProps.twoHandMaxDmg}</Tooltip>
        }

        return <li>Two-Hand Damage: {result}</li>
      }
      return null;
    }

    case 'throwMinDmg': {
      if (prop in itemProps) {
        let result = <span>{itemProps.throwMinDmg}-{itemProps.throwMaxDmg}</span>;
        let dataTooltip = `Base Throw Damage: ${selectedBase.throwMinDmg}-${selectedBase.throwMaxDmg}`;

        if (itemProps.throwMinDmg > selectedBase.throwMinDmg || itemProps.throwMaxDmg > selectedBase.throwMaxDmg) {
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.throwMinDmg}-{itemProps.throwMaxDmg}</Tooltip>
        }

        return <li>Throw Damage: {result}</li>
      }
      return null;
    }

    case 'block': {
      if (prop in itemProps) {
        let dataTooltip = `${capitalize(charClass)} Block Factor: ${charData.stats.block}%\nBase Block: ${selectedBase.block}%\nMax Block Allowed: 75%`;
        return <li>Chance to Block: <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.block! > 75 ? 75 : itemProps.block!}%</Tooltip></li>
      }
      return null;
    }

    case 'levelReq': {
      if (prop in itemProps) {
        let result = <span>{itemProps.levelReq}</span>;

        if (charLevel < itemProps.levelReq) {
          result = <Tooltip as="span" className="warn" center data-tooltip={`Current Character Level: ${charLevel}`}>{selectedBase.levelReq}</Tooltip>;
        }

        return <li>Required Level: {result}</li>
      }
      return null;
    }

    case 'strReq':
    case 'dexReq': {
      if (prop in itemProps) {
        let attrName: keyof IAttrs;

        if (prop === 'strReq') attrName = 'strength';
        if (prop === 'dexReq') attrName = 'dexterity';

        let attrReq = itemProps[prop];
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
      if (prop in itemProps) {
        return <li>Max Sockets: <span>{selectedBase.sockets}</span></li>
      }
      return null;
    }

    case 'speed': {
      if (isWeapon) {
        let classWeaponSpeed = charData.classWeaponSpeed[selectedBase.weaponClass];
        let baseSpeed = (itemProps.speed || 0) - (getItemMod(itemMods, 'ias').value || 0);
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