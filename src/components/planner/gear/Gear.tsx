//list of gears
//head, torso, belt, gloves, boots, left hand, right hand, amulet, left ring, right ring, charms (all - props separated for charms?)
//example:
//head
//- 1.select type: "shako"
//  Pull all usable helms by class with requirements props, sockets and infer prop (defense for armors and damage for weapons)
//- 2.select prop: defenses
//  Pull all category props (defenses, damage, resists, etc...)
//- 3.select sub-prop: defense +XXX
//  Pull all sub-props (defenses: defense, defense bocl, defense %, dmg reduction, etc...)
//- 4.input: 45
//  Type the value into the input text
//- 5.submit
//  Dispatch gears reducer fn
//result
//+45 Defense
//and go on...

//GEAR PROPS

const gearProps = [
  {
    id: 'allSkills',
    prints: '+{value} To All Skills'
  },
  {
    id: 'classSkills',
    prints: '+{value} To All {charClass} Skills'
  },
  {
    id: 'treeSkills',
    prints: '+{value} To All {tree} ({charClass} only)'
  },
  {
    id: 'skill',
    prints: 'To A Single Class Skill'
  },
  {
    id: 'allAttrs',
    prints: 'To All Attributes'
  },
  {
    id: 'toStrength',
    prints: 'To Strength'
  },
  {
    id: 'toDexterity',
    prints: 'To Dexterity'
  },
  {
    id: 'toVitality',
    prints: 'To Vitality'
  },
  {
    id: 'toEnergy',
    prints: 'To Energy'
  },
]

function getGearProp(id: string) {
  return gearProps.find(g => g.id === id);
}

function handleGearProps(id: string) {
  switch(id){
    case 'treeSkills': {
      return 'ISkillTree[]'
    }
    case 'skill': {
      return 'ISkill[]'
    }
    default: {
      let value = 1;
      let result = getGearProp(id)?.prints?.replace('{value}', `${value}`);
      return result;
    }
  }
  return;
}

console.log(handleGearProps('allSkills'));

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

const gearsInit: IGear[] = [
  {
    id: 'head',
    name: 'Head',
    type: null,
    props: [
      {
        render: `{value}`
      }
    ]
  },
  {
    id: 'gloves',
    name: 'Gloves',
    type: null,
    props: []
  }
]

export default function Gear() {
  return (
    handleGearProps('allSkills')
  )
}
