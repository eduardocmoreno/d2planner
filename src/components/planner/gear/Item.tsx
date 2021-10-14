import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";
import Button from "components/ui/Button";
import ItemProp from "./ItemProp";
import { percent } from "helpers";

/* 
WEAPON CLASS MODIFIER TABLE
                                Act 1 Rogue Act 2 Guard Act 5 Barbarian Amazon Assassin
Dagger                                                                    12      14
1h-"Swing"                                                    16          13      14
2h-Sword                                                      16          17      22
2h-Axe, Staff, Polearm                            8                       17      18
2h-Mace (Maul, wsm 10)                                                    20      21
Claw                                                                              13.5
Javelin, Spear                                    8                       15      22
Bow                                  15                                   13      15
Crossbow                                                                  19      20


                                Barbarian Druid (in wereform) Necromancer Paladin Sorceress
Dagger                             13       20         22         18        16       16
1h-"Swing"                         13       20         22         18        14       17
2h-Sword                           17       21         25         22        17.5     21
2h-Axe, Staff, Polearm             18       17         20         19        17       15
2h-Mace (Maul, wsm 10)             21       20         23         22        20       17
Orb                                                                                  17
Javelin, Spear                     18       23         27         23        19       20
Bow                                14       15         19         17        15       16
Crossbow                           19       19         24         19        19       19
*/

/* 
  absolute final dmg = base + off-weap% (regular values plus demons dmg% or undead dmg%) + elem-dmg
  ***dmg to demons or undead are OFF-WEAPON properties!--------^--------------^
*/


//TODO:
//handle gear item props by mods (damage, speed/IAS)
//apply "percend" helper function on old calcs
//handle skills
//how mods are printed

export default function Item({
  bases, slot, icon, setHasTwoHanded
}: {
  bases?: IGearProps[],
  slot: IGear['slot'],
  icon: string,
  setHasTwoHanded?: React.Dispatch<SetStateAction<boolean>>
}) {

  const { charData, charLevel, gears, setGears } = useContext(PlannerContext);
  const [selectedBase, setSelectedBase] = useState({} as Partial<IGearProps>);
  const [itemProps, setItemProps] = useState(gears.find(g => g.slot === slot)!.props);
  const [itemMods, setItemMods] = useState(gears.find(g => g.slot === slot)!.mods);

  const itemPropsToRender: TItemPropsToRender[] = ['minDef', 'block', 'minDmg', 'twoHandMinDmg', 'throwMinDmg', 'levelReq', 'strReq', 'dexReq', 'sockets', 'speed'];
  const gear: Partial<IGear> = gears.find(g => g.slot === slot)!;
  const rhMods: Partial<IGearMods> = gears.find(g => g.slot === 'right-hand')?.mods || {};
  const htmlSelector = useRef<HTMLSelectElement>(null);

  const offWeaponMods: Partial<IGearMods> = {
    minDmg: gears.filter(g => !g.props.weaponClass && g.mods.minDmg).map(g => g.mods.minDmg).reduce((a, b) => a! + b!, 0),
    maxDmg: gears.filter(g => !g.props.weaponClass && g.mods.maxDmg).map(g => g.mods.maxDmg).reduce((a, b) => a! + b!, 0)
  }

  function handleBaseSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let code = event.target.value;
    setSelectedBase(code ? bases?.find(i => i.code === code)! : {});
  }

  function addModExample() {
    setItemMods(prev => {
      return {
        ...prev,
        minDmg: 15,

      }
    });
  }

  function addModExample2() {
    setItemMods(prev => {
      return {
        ...prev,
        maxDmg: 10
      }
    });
  }

  function reset() {
    setSelectedBase({});
    setItemProps({});
    setItemMods({});
    htmlSelector.current!.selectedIndex = 0;
  }

  useEffect(() => {
    let newProps = { ...selectedBase };

    //defenses
    if (selectedBase.maxDef) {
      newProps.maxDef = Math.floor(selectedBase.maxDef * ((itemMods?.eDef || 0) / 100 + 1) + (itemMods?.def || 0) + ((itemMods?.defBocl || 0) * charLevel))
    }

    //requirements
    if (selectedBase.strReq) {
      newProps.strReq = Math.floor(selectedBase.strReq - (selectedBase.strReq * (itemMods.req || 0) / 100));
    }

    if (selectedBase.dexReq) {
      newProps.dexReq = Math.floor(selectedBase.dexReq - (selectedBase.dexReq * (itemMods.req || 0) / 100));
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

    setHasTwoHanded && setHasTwoHanded(selectedBase?.twoHanded ? true : false);
  }, [charData, charLevel, selectedBase, itemMods, rhMods.dmg, setItemProps, setHasTwoHanded, offWeaponMods.minDmg, offWeaponMods.maxDmg]);

  useEffect(() => {
    setGears(prev => {
      return prev.map(p => {
        if (p.slot === slot) {
          return {
            ...p,
            base: { ...itemProps },
            props: { ...itemProps },
            mods: { ...itemMods }
          }
        }
        return p;
      })
    });
  }, [slot, itemProps, itemMods, setGears]);

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/gears/${icon}.png`).default} alt={slot} />
      </Icon>
      <Contents>
        {bases ?
          <>
            <BaseSelector ref={htmlSelector} as="select" onChange={handleBaseSelect}>
              <option value="">{slot}</option>
              {bases.map(({ code, name }) =>
                <option value={code} key={code}>{name}</option>
              )}
            </BaseSelector>
            {Object.keys(selectedBase).length > 0 &&
              <ItemProps>
                {itemPropsToRender.map(prop =>
                  <ItemProp key={prop} {...{ slot, itemProps, selectedBase, prop }} />
                )}
              </ItemProps>
            }
          </>
          :
          <Title>{slot}</Title>
        }
        {gear &&
          <ItemMods>
            {Object.entries(gear.mods!).map(([k, v], i) =>
              <li key={k}>+{v} to {k}</li>
            )}
          </ItemMods>
        }
        <Button blue onClick={addModExample}>1</Button>
        <Button blue onClick={addModExample2}>2</Button>
        <Button red onClick={reset}>RESET ITEM</Button>
        <Form>
        </Form>
      </Contents>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
  background: rgba(0 0 0 / .3);
`;

const Icon = styled.div`
  width: 60px;
  img {
    display: block;
  }
`;

const HeadingStyle = css`
  padding-bottom: var(--spacing-sm);
  color: var(--color-gold);
  border-bottom: 1px solid var(--color-gold);
  font-size: 2.2rem;
  text-transform: uppercase;
`;

const Title = styled.h2`
  ${HeadingStyle}
`;

const BaseSelector = styled(Title).attrs<React.SelectHTMLAttributes<HTMLSelectElement>>({ as: 'select' })`
  ${HeadingStyle}
  border-width: 0 0 1px 0;
  background-color: transparent;
  font-family: var(--font-family-main);
  font-weight: bold;
  option {
    color: #333;
    font-family: arial, sans-serif;
    font-weight: normal;
    font-size: 1.6rem;
    :not(:first-child) {
      text-transform: none;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const ItemProps = styled.ul`
  margin-top: .75em;
  font-size: 1.4rem;
  li {
    :not(:first-child){
      margin-top: .25em;
    }
    span {
      color: var(--color-gold);
      &.warn {
        color: var(--color-red);
      }
      &.highlight {
        color: var(--color-blue);
      }
    }
  }
`;

const ItemMods = styled.ul`
  margin-top: .75em;
  color: var(--color-blue);
  font-family: var(--font-family-main);
  text-transform: uppercase;
`;

const Form = styled.form`
  ${Button}{
    text-transform: none;
  }
`;
