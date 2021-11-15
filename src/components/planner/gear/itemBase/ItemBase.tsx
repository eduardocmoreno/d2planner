import { SetStateAction, useContext, useEffect, useRef } from "react";
import { PlannerContext } from "pages/Planner";
import ItemProp from "./ItemBaseProp";
import { Wrapper } from "./itemBase.styles"
import { getItemMod, percent } from "helpers";

export default function ItemBase({ base, setBase, mods, selectedBase }: {
  base: IGearBase,
  setBase: React.Dispatch<SetStateAction<IGearBase>>,
  mods: IGearMod[],
  selectedBase: IGearBase
}) {
  const { charData, charLevel, gear } = useContext(PlannerContext);
  const baseVisibleProps = useRef<TGearBaseVisibleProps[]>(['minDef', 'block', 'minDmg', 'twoHandMinDmg', 'throwMinDmg', 'levelReq', 'strReq', 'dexReq', 'sockets', 'speed']);

  const rhDmgMod: number = gear.find(g => g.slot === 'right-hand')?.mods.find(m => m.name === 'dmg')?.value || 0;
  const offWeaponMods: Partial<Record<TGearModName, number>> = {
    minDmg: gear
      .filter(g => !g.base.weaponClass && g.mods.find(m => m.name === 'minDmg'))
      .map(g => g.mods.find(m => m.name === 'minDmg')?.value)
      .reduce((a, b) => a! + b!, 0) || 0,


    maxDmg: gear
      .filter(g => !g.base.weaponClass && g.mods.find(m => m.name === 'maxDmg'))
      .map(g => g.mods.find(m => m.name === 'maxDmg')?.value)
      .reduce((a, b) => a! + b!, 0) || 0
  }

  useEffect(() => {
    let newBaseProps = { ...selectedBase };

    //defenses
    if (selectedBase.maxDef) {
      newBaseProps.maxDef = Math.floor(selectedBase.maxDef * ((getItemMod(mods, 'eDef')?.value || 0) / 100 + 1) + (getItemMod(mods, 'def')?.value || 0) + ((getItemMod(mods, 'def/lvl')?.value || 0) * charLevel))
    }

    //requirements 
    if (selectedBase.strReq) {
      newBaseProps.strReq = Math.floor(percent(selectedBase.strReq, -(getItemMod(mods, 'req')?.value || 0)));
    }

    if (selectedBase.dexReq) {
      newBaseProps.dexReq = Math.floor(percent(selectedBase.dexReq, -(getItemMod(mods, 'req')?.value || 0)));
    }

    //block
    if (selectedBase.block) {
      newBaseProps.block = charData.stats.block + selectedBase.block + (getItemMod(mods, 'block')?.value || 0);
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
          if (getItemMod(mods, 'eDmg')?.value) {
            //weapon eDmg mod reflects directly to the weapon base damage,
            //BUT, eDmg mod from other items is classified as off-weapon
            newBaseProps[min] = Math.floor(percent(selectedBase[min], getItemMod(mods, 'eDmg')?.value || 0));
            newBaseProps[max] = Math.floor(percent(selectedBase[max], getItemMod(mods, 'eDmg')?.value || 0));
          }

          if (getItemMod(mods, 'eMaxDmg/lvl')?.value) {
            //eDmg + eMaxDmg/lvl
            newBaseProps[max] = Math.floor(percent(selectedBase[max], (getItemMod(mods, 'eDmg')?.value || 0) + ((getItemMod(mods, 'eMaxDmg/lvl')?.value || 0) * charLevel)));
          }

          if (getItemMod(mods, 'maxDmg/lvl')?.value) {
            //maxDmg/lvl only for weapons
            newBaseProps[max] = (newBaseProps[max] || selectedBase[max]) + (Math.floor((getItemMod(mods, 'maxDmg/lvl')?.value || 0) * charLevel));
          }

          if (getItemMod(mods, 'maxDmg')?.value || offWeaponMods.maxDmg) {
            //maxDmg from all items reflects to the weapon base damage
            newBaseProps[max] = (newBaseProps[max] || selectedBase[max]) + (getItemMod(mods, 'maxDmg')?.value || 0) + (offWeaponMods.maxDmg || 0);
          }

          if (getItemMod(mods, 'minDmg')?.value || offWeaponMods.minDmg) {
            //minDmg from all items reflects to the weapon base damage
            newBaseProps[min] = (newBaseProps[min] || selectedBase[min]) + (getItemMod(mods, 'minDmg')?.value || 0) + (offWeaponMods.minDmg || 0);
            if (newBaseProps[min] >= (newBaseProps[max] || selectedBase[max])) {
              newBaseProps[max] = newBaseProps[min] + 1;
            }
          }

          if (getItemMod(mods, 'dmg')?.value || 0) {
            //dmg mod is available only for weapons
            newBaseProps[min] = (newBaseProps[min] || selectedBase[min]) + (getItemMod(mods, 'dmg')?.value || 0);
            newBaseProps[max] = (newBaseProps[max] || selectedBase[max]) + (getItemMod(mods, 'dmg')?.value || 0);
          }
        }
      });
    }

    //damage (shields only)
    if (['shie', 'ashd'].includes(selectedBase.type!) && rhDmgMod) {
      //dmg mod from weapons reflects to shield base damage
      newBaseProps['minDmg'] = selectedBase['minDmg'] + rhDmgMod;
      newBaseProps['maxDmg'] = selectedBase['maxDmg'] + rhDmgMod;
    }

    //speed (TODO: implement IAS mod to it)
    if (selectedBase.speed) {
      newBaseProps.speed = selectedBase.speed;
    }

    setBase(() => {
      return {
        ...selectedBase,
        ...newBaseProps
      }
    });
  }, [charData, charLevel, selectedBase, mods, rhDmgMod, setBase, offWeaponMods.minDmg, offWeaponMods.maxDmg]);

  return (
    <Wrapper>
      {baseVisibleProps.current.map(prop =>
        <ItemProp key={prop} {...{ base, mods, selectedBase, prop }} />
      )}
    </Wrapper>
  )
}