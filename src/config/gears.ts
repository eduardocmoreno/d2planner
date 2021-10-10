const gearPropsModsInit = {
  props: {},
  mods: {}
}


const gearsInit: IGear[] = [
  {
    name: 'head',
    props: {},
    mods: {
      strength: 10
    }
  },
  {
    name: 'torso',
    ...gearPropsModsInit
  },
  {
    name: 'left-hand',
    ...gearPropsModsInit
  },
  {
    name: 'right-hand',
    ...gearPropsModsInit
  },
  {
    name: 'gloves',
    ...gearPropsModsInit
  },
  {
    name: 'belt',
    ...gearPropsModsInit
  },
  {
    name: 'boots',
    ...gearPropsModsInit
  },
  {
    name: 'amulet',
    props: {},
    mods: {
      allAttrs: 5,
      defense: 33
    }
  },
  {
    name: 'left-ring',
    props: {},
    mods: {
      vitality: 5
    }
  },
  {
    name: 'right-ring',
    props: {},
    mods: {
      dexterity: 15
    }
  },
  {
    name: 'torch',
    ...gearPropsModsInit
  },
  {
    name: 'annihilus',
    ...gearPropsModsInit
  },
  {
    name: 'charms',
    ...gearPropsModsInit
  },
]

export default gearsInit;