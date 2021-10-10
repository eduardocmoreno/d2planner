import { SetStateAction, useContext, useEffect, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";
import Tooltip from "components/ui/Tooltip";
import Button from "components/ui/Button";

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

export default function Item({
  bases, name, icon, setHasTwoHanded
}: {
  bases?: IGearProps[],
  name: string,
  icon: string,
  setHasTwoHanded?: React.Dispatch<SetStateAction<boolean>>
}) {

  const { charLevel, charData, gears, setGears, attrs } = useContext(PlannerContext);
  const [selectedBase, setSelectedBase] = useState({} as Partial<IGearProps>);
  const [itemProps, setItemProps] = useState(gears.find(g => g.name === name)?.props);
  const [itemMods, setItemMods] = useState(gears.find(g => g.name === name)?.mods);

  let gear: Partial<IGear> = gears.find(g => g.name === name)!;

  useEffect(() => {
    setGears(prev => {
      return prev.map(p => {
        if (p.name === name) {
          return {
            ...p,
            props: {
              ...itemProps
            },
            mods: {
              ...itemMods
            }
          }
        }
        return p;
      })
    })
  }, [name, itemProps, itemMods, setGears]);

  useEffect(() => {
    setItemProps(prev => {
      let newProps = prev;

      //defenses
      if (selectedBase.defMax && (itemMods?.defense || itemMods?.defenseBonus || itemMods?.defenseBocl)) {
        newProps!.defMax = Math.floor(selectedBase.defMax * ((itemMods?.defenseBonus || 0) / 100 + 1) + (itemMods?.defense || 0) + ((itemMods?.defenseBocl || 0) * charLevel))
      }

      //requirements
      if (selectedBase.strReq && itemMods?.requirements) {
        newProps!.strReq = Math.floor(selectedBase.strReq - (selectedBase.strReq * (itemMods.requirements || 0) / 100))
      }

      if (selectedBase.dexReq && itemMods?.requirements) {
        newProps!.dexReq = Math.floor(selectedBase.dexReq - (selectedBase.dexReq * (itemMods.requirements || 0) / 100))
      }

      return {
        ...prev,
        ...newProps
      };
    })
  }, [charLevel, selectedBase, itemMods, setItemProps]);

  function handleBaseSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let id = event.target.value;
    let base = bases?.find(i => i.id === id);
    setHasTwoHanded && setHasTwoHanded(base?.TwoHanded ? true : false);
    setSelectedBase(id ? bases!.find(i => i.id === id)! : {});

    //TODO:
    //handle gear item props (requirements, damage, speed/IAS)
    //handle skills
    //how mods are printed
  }

  function addModExample() {
    setItemMods(prev => {
      return {
        ...prev,
        energy: 111,
        defense: 5,
        defenseBonus: 12,
        defenseBocl: .75,
        requirements: 10
      }
    });
  }

  return (
    <Wrapper>
      <Icon>
        <img src={require(`assets/images/gears/${icon}.png`).default} alt={name} />
      </Icon>
      <Contents>
        {bases ?
          <>
            <BaseSelector as="select" onChange={handleBaseSelect}>
              <option value="">{name}</option>
              {bases.map(({ id, name }) =>
                <option value={id} key={id}>{name}</option>
              )}
            </BaseSelector>
            {'id' in selectedBase &&
              <ItemProps>
                {'defMax' in selectedBase &&
                  <li>
                    Defense: {gear.props?.defMax ?
                      <Tooltip as="span" className="highlight" center data-tooltip={`Base Defense: ${selectedBase.defMax}`}>{gear.props?.defMax}</Tooltip>
                      :
                      <span className={gear.props?.defMax ? 'highlight' : ''}>{gear.props?.defMax || selectedBase.defMax}</span>
                    }
                  </li>
                }

                {'block' in selectedBase &&
                  <li>Chance to Block: <span>{selectedBase.block! + charData.stats.block}%</span></li>
                }

                {'dmgMin' in selectedBase && !('TwoHanded' in selectedBase) &&
                  <li>
                    {['shie', 'ashd'].includes(selectedBase.type!) ? 'Smite Damage: ' : 'One-Hand Damage: '}
                    <span>{selectedBase.dmgMin}-{selectedBase.dmgMax}</span>
                  </li>
                }

                {'TwoHandedDmgMin' in selectedBase &&
                  <li>Two-Hand Damage: <span>{selectedBase.TwoHandedDmgMin}-{selectedBase.TwoHandedDmgMax}</span></li>
                }

                {'MisDmgMin' in selectedBase &&
                  <li>Throw Damage: <span>{selectedBase.MisDmgMin}-{selectedBase.MisDmgMax}</span></li>
                }

                {'levelReq' in selectedBase &&
                  <li>
                    Required Level: {charLevel < selectedBase.levelReq! ?
                      <Tooltip as="span" className="warn" center data-tooltip={`Current Level: ${charLevel}`}>{selectedBase.levelReq}</Tooltip>
                      :
                      <span>{selectedBase.levelReq}</span>
                    }
                  </li>
                }

                {'strReq' in selectedBase &&
                  <li>
                    Required Strength: {attrs.strength.total! < (gear?.props?.strReq || selectedBase.strReq || 0) &&
                      <Tooltip as="span" className="warn" center data-tooltip={`Current Strength: ${attrs.strength.total}`}>{gear.props?.strReq || selectedBase.strReq!}</Tooltip>
                    }

                    {gear?.props?.strReq ?
                      <Tooltip as="span" className="highlight" center data-tooltip={`Base: ${selectedBase.strReq!}`}>{gear.props?.strReq}</Tooltip>
                      :
                      <span>{selectedBase.strReq!}</span>
                    }

                  </li>
                }

                {'dexReq' in selectedBase &&
                  <li>
                    Required Dexteity: {attrs.dexterity.total! < (gear?.props?.dexReq || selectedBase.dexReq || 0) &&
                      <Tooltip as="span" className="warn" center data-tooltip={`Current Dexterity: ${attrs.dexterity.total}`}>{gear.props?.dexReq || selectedBase.dexReq!}</Tooltip>
                    }

                    {gear?.props?.dexReq ?
                      <Tooltip as="span" className="highlight" center data-tooltip={`Base: ${selectedBase.dexReq!}`}>{gear.props?.dexReq}</Tooltip>
                      :
                      <span>{selectedBase.dexReq!}</span>
                    }
                  </li>
                }

                {'sockets' in selectedBase &&
                  <li>Max Sockets: <span>{selectedBase.sockets}</span></li>
                }

                {'speed' in selectedBase &&
                  /* HANDLE SPEED WITH WEAPON CLASS MODIFIER TABLE */
                  <li>Item Class (ex. AXE CLASS): <span>{selectedBase.speed}</span></li>
                }
              </ItemProps>
            }
          </>
          :
          <Title>{name}</Title>
        }
        {gear &&
          <ItemMods>
            {Object.entries(gear.mods!).map(([k, v], i) =>
              <li key={k}>+{v} to {k}</li>
            )}
          </ItemMods>
        }
        <Button blue onClick={addModExample}>t</Button>
        <Form>
        </Form>
        <Button red>RESET ITEM</Button>
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
