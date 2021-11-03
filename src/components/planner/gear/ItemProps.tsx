import { SetStateAction, useContext, useEffect, useRef } from "react";
import { PlannerContext } from "pages/Planner";
import ItemProp from "./ItemProp";
import { Wrapper } from "./ItemProps.styles"
import { getItemMod, percent } from "helpers";


export default function ItemProps({ slot, itemProps, setItemProps, itemMods, selectedBase }: {
  slot: IGear['slot'],
  itemProps: IGearProps,
  setItemProps: React.Dispatch<SetStateAction<IGearProps>>,
  itemMods: IGearMod[],
  selectedBase: IGearProps
}) {
  const { charData, charLevel, gear } = useContext(PlannerContext);
  const itemPropsToRender = useRef<TItemPropsToRender[]>(['minDef', 'block', 'minDmg', 'twoHandMinDmg', 'throwMinDmg', 'levelReq', 'strReq', 'dexReq', 'sockets', 'speed']);

  const rhDmgMod: number = gear.find(g => g.slot === 'right-hand')?.mods.find(m => m.name === 'dmg')?.value || 0;
  const offWeaponMods: Partial<Record<TGearModName, number>> = {
    minDmg: gear
      .filter(g => !g.props.weaponClass && g.mods.find(m => m.name === 'minDmg'))
      .map(g => g.mods.find(m => m.name === 'minDmg')?.value)
      .reduce((a, b) => a! + b!, 0) || 0,


    maxDmg: gear
      .filter(g => !g.props.weaponClass && g.mods.find(m => m.name === 'maxDmg'))
      .map(g => g.mods.find(m => m.name === 'maxDmg')?.value)
      .reduce((a, b) => a! + b!, 0) || 0
  }

  useEffect(() => {
    let newProps = { ...selectedBase };

    //defenses
    if (selectedBase.maxDef) {
      newProps.maxDef = Math.floor(selectedBase.maxDef * ((getItemMod(itemMods, 'eDef').value || 0) / 100 + 1) + (getItemMod(itemMods, 'eDef').value || 0) + ((getItemMod(itemMods, 'defBocl').value || 0) * charLevel))
    }

    //requirements 
    if (selectedBase.strReq) {
      newProps.strReq = Math.floor(percent(selectedBase.strReq, -(getItemMod(itemMods, 'req').value || 0)));
    }

    if (selectedBase.dexReq) {
      newProps.dexReq = Math.floor(percent(selectedBase.dexReq, -(getItemMod(itemMods, 'req').value || 0)));
    }

    //block
    if (selectedBase.block) {
      newProps.block = charData.stats.block + selectedBase.block + (getItemMod(itemMods, 'block').value || 0);
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
          if (getItemMod(itemMods, 'eDmg').value || 0) {
            //weapon eDmg mod reflects directly to the weapon base damage,
            //BUT, eDmg mod from other items is classified as off-weapon
            newProps[min] = Math.floor(percent(selectedBase[min]!, getItemMod(itemMods, 'eDmg').value || 0));
            newProps[max] = Math.floor(percent(selectedBase[max]!, getItemMod(itemMods, 'eDmg').value || 0));
          }

          if (getItemMod(itemMods, 'maxDmg').value || 0 || offWeaponMods.maxDmg) {
            //maxDmg from all items reflects to the weapon base damage
            newProps[max] = (newProps[max] || selectedBase[max]!) + (getItemMod(itemMods, 'maxDmg').value || 0) + (offWeaponMods.maxDmg || 0);
          }

          if (getItemMod(itemMods, 'minDmg').value || 0 || offWeaponMods.minDmg) {
            //minDmg from all items reflects to the weapon base damage
            newProps[min] = (newProps[min] || selectedBase[min]!) + (getItemMod(itemMods, 'minDmg').value || 0) + (offWeaponMods.minDmg || 0);
            if (newProps[min]! > (newProps[max] || selectedBase[max]!)) {
              newProps[max] = newProps[min]! + 1;
            }
          }

          if (getItemMod(itemMods, 'dmg').value || 0) {
            //dmg mod is available only for weapons
            newProps[min] = (newProps[min] || selectedBase[min]!) + (getItemMod(itemMods, 'dmg').value || 0);
            newProps[max] = (newProps[max] || selectedBase[max]!) + (getItemMod(itemMods, 'dmg').value || 0);
          }
        }
      });
    }

    //damage (shields only)
    if (['shie', 'ashd'].includes(selectedBase.type!) && rhDmgMod) {
      //dmg mod from weapons reflects to shield base damage
      newProps['minDmg'] = selectedBase['minDmg']! + rhDmgMod;
      newProps['maxDmg'] = selectedBase['maxDmg']! + rhDmgMod;
    }

    //speed (TODO: implement IAS mod to it)
    if (selectedBase.speed) {
      newProps.speed = selectedBase.speed;
    }

    setItemProps(() => {
      return {
        ...selectedBase,
        ...newProps
      }
    });
  }, [charData, charLevel, selectedBase, itemMods, rhDmgMod, setItemProps, offWeaponMods.minDmg, offWeaponMods.maxDmg]);

  return (
    <Wrapper>
      {itemPropsToRender.current.map(prop =>
        <ItemProp key={prop} {...{ itemProps, itemMods, selectedBase, prop }} />
      )}
    </Wrapper>
  )
}