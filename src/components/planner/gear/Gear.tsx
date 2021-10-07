import { PlannerContext } from "pages/Planner";
import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import Item from "./Item";

export default function Gear() {
  const { charData } = useContext(PlannerContext);
  const armors = useRef([] as IGearItem[]);
  const weapons = useRef([] as IGearItem[]);

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
  const gearProps = [
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
  ]

  //selected tree skills
  //options? === true?
  //create a form select for the next step
  //select options loop = getGearPropOptions(id: 'treeSkills'): array[all class tree skills list]
  //

  function getGearProp(id: string) {
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
  }

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


  const gearsInit: IGear[] = [
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
  ]

  useEffect(() => {
    //setIsLoading(true);
    fetch(`/data/items/armor.json`)
      .then(res => res.json())
      .then((data: IGearItem[]) => {
        armors.current = data;
      });

    fetch(`/data/items/weapons.json`)
      .then(res => res.json())
      .then((data: IGearItem[]) => {
        weapons.current = data.filter(i => charData.classItems?.includes(i.type));
      });
  }, []);

  return (
    <Gears>
      <Item items={armors.current.filter(a => a.type! === 'helm')} title="head" icon="icon-head" />
      <Item items={weapons.current} title="left hand" icon="icon-head" />
    </Gears>
  )
}

interface IGearProp {
  name: string,
  value: number | Partial<ISkill>
}

interface IGear {
  id: string,
  name: string,
  type: string | null,
  props?: any
}

const Gears = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

