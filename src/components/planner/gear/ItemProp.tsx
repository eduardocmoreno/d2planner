import Tooltip from "components/ui/Tooltip";
import { capitalize } from "helpers";
import { PlannerContext } from "pages/Planner";
import { useContext } from "react";

export default function ItemProp({ itemProps, selectedBase, prop }: { itemProps: Partial<IGearProps>, selectedBase: Partial<IGearProps>, prop: TItemPropsToRender }) {
  const {charClass, charData, charLevel, attrs} = useContext(PlannerContext);
  
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
        return <li>
          {['shie', 'ashd'].includes(itemProps.type!) ? 'Smite Damage: ' : 'One-Hand Damage: '}
          <span>{selectedBase.minDmg}-{selectedBase.maxDmg}</span>
        </li>
      }
      return null;
    }

    case 'twoHandMinDmg': {
      if (prop in itemProps!) {
        return <li>Two-Hand Damage: <span>{selectedBase.twoHandMinDmg}-{selectedBase.twoHandMaxDmg}</span></li>
      }
      return null;
    }

    case 'throwMinDmg': {
      if (prop in itemProps!) {
        return <li>Two-Hand Damage: <span>{selectedBase.throwMinDmg}-{selectedBase.throwMaxDmg}</span></li>
      }
      return null;
    }

    case 'block': {
      if (prop in itemProps!) {
        let dataTooltip = `${capitalize(charClass)} Block Factor: ${charData.stats.block}%\nBase Block: ${selectedBase.block}%`;
        return <li>Chance to Block: <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{itemProps.block! + charData.stats.block}%</Tooltip></li>
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
        let attrReq = itemProps![prop];
        let reqVal = attrReq || selectedBase[prop] || 0;
        let isMod = attrReq! < selectedBase[prop]!;
        let result = <span>{attrReq}</span>
        let dataTooltip = `Current Character Strength: ${attrs.strength.total}`;

        if (isMod) {
          dataTooltip += `\nBase Requirement: ${selectedBase[prop]!}`;
          result = <Tooltip as="span" className="highlight" center data-tooltip={dataTooltip}>{attrReq}</Tooltip>
        }

        if (attrs.strength.total! < reqVal) {
          result = <Tooltip as="span" className="warn" center data-tooltip={dataTooltip}>{reqVal}</Tooltip>
        }

        return <li>Required Strength: {result}</li>
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