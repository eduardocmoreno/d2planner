import { SetStateAction, useContext, useEffect } from "react";
import { PlannerContext } from "pages/Planner";
import ItemProp from "./ItemProp";
import { Wrapper } from "./ItemProps.styles"
import { percent } from "helpers";


export default function ItemProps({ slot, itemProps, setItemProps, itemMods, selectedBase }: {
  slot: IGear['slot'],
  itemProps: IGearProps,
  setItemProps: React.Dispatch<SetStateAction<IGearProps>>,
  itemMods: IGearMods,
  selectedBase: IGearProps
}) {
  const { charData, charLevel, gear } = useContext(PlannerContext);
  const itemPropsToRender: TItemPropsToRender[] = ['minDef', 'block', 'minDmg', 'twoHandMinDmg', 'throwMinDmg', 'levelReq', 'strReq', 'dexReq', 'sockets', 'speed'];
  const rhMods: Partial<IGearMods> = gear.find(g => g.slot === 'right-hand')?.mods || {};
  const offWeaponMods: Partial<IGearMods> = {
    minDmg: gear.filter(g => !g.props.weaponClass && g.mods.minDmg).map(g => g.mods.minDmg).reduce((a, b) => a! + b!, 0),
    maxDmg: gear.filter(g => !g.props.weaponClass && g.mods.maxDmg).map(g => g.mods.maxDmg).reduce((a, b) => a! + b!, 0)
  }

  useEffect(() => {
    let newProps = { ...selectedBase };

    //defenses
    if (selectedBase.maxDef) {
      newProps.maxDef = Math.floor(selectedBase.maxDef * ((itemMods?.eDef || 0) / 100 + 1) + (itemMods?.def || 0) + ((itemMods?.defBocl || 0) * charLevel))
    }

    //requirements
    if (selectedBase.strReq) {
      newProps.strReq = Math.floor(percent(selectedBase.strReq, -(itemMods.req || 0)));
    }

    if (selectedBase.dexReq) {
      newProps.dexReq = Math.floor(percent(selectedBase.dexReq, -(itemMods.req || 0)));
    }

    //block
    if (selectedBase.block) {
      newProps.block = charData.stats.block + selectedBase.block + (itemMods.block || 0);
    }

    //damage (weapons only)
    if (selectedBase.weaponClass) {
      let dmgProps: {
        min: 'minDmg' | 'twoHandMinDmg' | 'throwMinDmg';
        max: 'maxDmg' | 'twoHandMaxDmg' | 'throwMaxDmg';
      }[] = [
          {
            min: 'minDmg',
            max: 'maxDmg'
          },
          {
            min: 'twoHandMinDmg',
            max: 'twoHandMaxDmg'
          },
          {
            min: 'throwMinDmg',
            max: 'throwMaxDmg'
          }
        ];

      dmgProps.forEach(({ min, max }) => {
        if ((min || max) in selectedBase) {
          if (itemMods.eDmg) {
            //weapon eDmg mod reflects directly to the weapon base damage,
            //BUT, eDmg mod from other items is classified as off-weapon
            newProps[min] = Math.floor(percent(selectedBase[min]!, itemMods.eDmg));
            newProps[max] = Math.floor(percent(selectedBase[max]!, itemMods.eDmg));
          }

          if (itemMods.maxDmg || offWeaponMods.maxDmg) {
            //maxDmg from all items reflects to the weapon base damage
            newProps[max] = (newProps[max] || selectedBase[max]!) + (itemMods.maxDmg || 0) + (offWeaponMods.maxDmg || 0);
          }

          if (itemMods.minDmg || offWeaponMods.minDmg) {
            //minDmg from all items reflects to the weapon base damage
            newProps[min] = (newProps[min] || selectedBase[min]!) + (itemMods.minDmg || 0) + (offWeaponMods.minDmg || 0);
            if (newProps[min]! > (newProps[max] || selectedBase[max]!)) {
              newProps[max] = newProps[min]! + 1;
            }
          }

          if (itemMods.dmg) {
            //dmg mod is available only for weapons
            newProps[min] = (newProps[min] || selectedBase[min]!) + itemMods.dmg;
            newProps[max] = (newProps[max] || selectedBase[max]!) + itemMods.dmg;
          }
        }
      });
    }

    //damage (shields only)
    if (['shie', 'ashd'].includes(selectedBase.type!) && rhMods.dmg) {
      //dmg mod from weapons reflects to shield base damage
      newProps['minDmg'] = selectedBase['minDmg']! + rhMods.dmg;
      newProps['maxDmg'] = selectedBase['maxDmg']! + rhMods.dmg;
    }

    setItemProps(() => {
      return {
        ...selectedBase,
        ...newProps
      }
    });
  }, [charData, charLevel, selectedBase, itemMods, rhMods.dmg, setItemProps, offWeaponMods.minDmg, offWeaponMods.maxDmg]);

  return (
    <Wrapper>
      {itemPropsToRender.map(prop =>
        <ItemProp key={prop} {...{ slot, itemProps, selectedBase, prop }} />
      )}
    </Wrapper>
  )
}