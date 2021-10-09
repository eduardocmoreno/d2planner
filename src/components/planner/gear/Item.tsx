import { SetStateAction, useContext, useState } from "react";
import { PlannerContext } from "pages/Planner";
import styled, { css } from "styled-components";
import Tooltip from "components/ui/Tooltip";

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

  let gear: Partial<IGear> = gears.find(g => g.name === name)!;

  function handleBaseSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let id = event.target.value;
    let base = bases?.find(i => i.id === id);
    setHasTwoHanded && setHasTwoHanded(base?.TwoHanded ? true : false);
    setSelectedBase(id ? bases!.find(i => i.id === id)! : {});
    if (gear.mods?.defense) {
      setGears(prev => {
        return prev.map(p => {
          if (p.name === name) {
            return {
              ...p,
              props: {
                ...p.props,
                defMax: (base?.defMax || 0) + (gear.mods?.defense || 0)
              }
            }
          }
          return p;
        })
      })
    }

    //handle attrs
    //handle gear item props
    //handle skills
  }

  //list of gears
  //head, torso, belt, gloves, boots, left hand, right hand, amulet, left ring, right ring, charms (all - props separated for charms?)
  //example:
  //head
  //- 1.select type: "shako"
  //  Pull all usable helms by class with requirements props, sockets and infer prop (defense for armors and damage for weapons)
  //- 2.select prop
  //  Pull all category props (defenses, damage, resists, etc...)
  //- 3.select sub-prop
  //  Pull all sub-props (ex.: tree skills ==> [comb skills, off auras, def auras])
  //- 4.input: 1
  //  Type the value into the input text
  //- 5.submit
  //  Handle Gear props fn ==> dispatch gears reducer fn
  //result
  //+45 Defense
  //and go on...


  //GEAR PROPS
  /*  const gearProps = [
     {
       id: 'allSkills',
       descr: '{a} To All Skills'
     },
     {
       id: 'classSkills',
       descr: '{a} To All {b} Skills'
     },
     {
       id: 'treeSkills',
       descr: '{a} To All {b} ({c} only)',
       options: true
     },
     {
       id: 'skill',
       descr: 'To A Single Class Skill'
     },
     {
       id: 'allAttrs',
       descr: '{a} To All Attributes'
     },
     {
       id: 'toStrength',
       descr: '{a} To Strength'
     },
     {
       id: 'toDexterity',
       descr: '{a} To Dexterity'
     },
     {
       id: 'toVitality',
       descr: '{a} To Vitality'
     },
     {
       id: 'toEnergy',
       descr: '{a} To Energy'
     },
   ] */

  //selected tree skills
  //options? === true?
  //create a form select for the next step
  //select options loop = getGearPropOptions(id: 'treeSkills'): array[all class tree skills list]
  //

  /* function getGearProp(id: string) {
    return gearProps.find(g => g.id === id);
  }

  function getGearPropOptions(id: string) {
    switch (id) {
      case 'treeSkills': {
        return 'charData.skills.trees.map(t => t.name)';
      }
    }
    return;
  }

  function handleGearProps<T>(id: string, args: T) {
    switch (id) {
      case 'classSkills': {
        let a = 1;
        let b = 'Paladin'
        let result = getGearProp(id)?.descr?.replace(`{a}`, `<span>+${a}</span>`);
        return getGearProp(id)?.descr?.replace(`{a}`, `<span>+${a}</span>`).replace(`{b}`, `<span>${b}</span>`);
      }
      case 'treeSkills': {
        let a = 3;
        let b = 'Offensive Auras';
        let c = 'Paladin';
        return getGearProp(id)?.descr!
          .replace(`{a}`, `<span>+${a}</span>`)
          .replace(`{b}`, `<span>${b}</span>`)
          .replace(`{c}`, `${c}`);
      }
      case 'skill': {
        return 'ISkill[]'
      }
      default: {
        return {
          id,
          print: getGearProp(id)?.descr?.replace(`{a}`, `<span>+${args}</span>`)
        };
      }
    }
    return;
  } */

  //GEARS
  /* 
  {
    item: [
      {
        [prop: keyof gearProps]: 
          | number
          | { min: number, max: number } --> min max damage props (ex.: adds min-max fire dmg)
          | { skillId: number, level: number } --> to single skill
          | { treeName: string, batch: number } --> adds skill lvl for all tree skills (+3 combat skills [paladin only])
          | { skillId: number, level: number, chance: number, isActive: boolean } --> chance to cast skill
      }
    ]
  }
  */


  /* const gearsInit: IGear[] = [
    {
      id: 'head',
      name: 'Head',
      type: null,
      props: []
    },
    {
      id: 'gloves',
      name: 'Gloves',
      type: null,
      props: []
    }
  ] */

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

                {'levelReq' in selectedBase && selectedBase.levelReq! > 0 &&
                  <li>
                    Required Level: {charLevel < selectedBase.levelReq! ?
                      <Tooltip as="span" className="warn" center data-tooltip={`Current Level: ${charLevel}`}>{selectedBase.levelReq}</Tooltip>
                      :
                      <span>{selectedBase.levelReq}</span>
                    }
                  </li>
                }

                {'strReq' in selectedBase && selectedBase.strReq! > 0 &&
                  <li>
                    Required Strength: {attrs.strength.total! < selectedBase.strReq! ?
                      <Tooltip as="span" className="warn" center data-tooltip={`Current Strength: ${attrs.strength.total}`}>{selectedBase.strReq}</Tooltip>
                      :
                      <span>{selectedBase.strReq}</span>
                    }
                  </li>
                }

                {'dexReq' in selectedBase && selectedBase.dexReq! > 0 &&
                  <li>Required Dexteity: <span className={attrs.dexterity.total! < selectedBase.dexReq! ? 'warn' : ''}>{selectedBase.dexReq}</span></li>
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
        <Form></Form>
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

const Form = styled.form``;
