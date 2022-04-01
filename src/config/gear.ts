const gearPropsInit = {
  base: {} as Item,
  mods: [] as ItemMod[]
}

const gearInit: Gear[] = [
  {
    slot: 'head',
    icon: 'icon-head',
    ...gearPropsInit
  },
  {
    slot: 'amulet',
    icon: 'icon-amulet',
    ...gearPropsInit
  },
  {
    slot: 'right-hand',
    icon: 'icon-weapons',
    ...gearPropsInit
  },
  {
    slot: 'torso',
    icon: 'icon-torso',
    ...gearPropsInit
  },
  {
    slot: 'left-hand',
    icon: 'icon-shield',
    ...gearPropsInit
  },
  {
    slot: 'right-ring',
    icon: 'icon-ring1',
    ...gearPropsInit
  },
  {
    slot: 'gloves',
    icon: 'icon-gloves',
    ...gearPropsInit
  },
  {
    slot: 'belt',
    icon: 'icon-belt',
    ...gearPropsInit
  },
  {
    slot: 'boots',
    icon: 'icon-boots',
    ...gearPropsInit
  },
  {
    slot: 'left-ring',
    icon: 'icon-ring2',
    ...gearPropsInit
  },
  {
    slot: 'small-charms',
    icon: 'icon-small-charm',
    ...gearPropsInit
  },
  {
    slot: 'large-charms',
    icon: 'icon-large-charm',
    ...gearPropsInit
  },
  {
    slot: 'grand-charms',
    icon: 'icon-grand-charm',
    ...gearPropsInit
  },
  {
    slot: 'torch',
    icon: 'icon-torch',
    ...gearPropsInit
  },
  {
    slot: 'annihilus',
    icon: 'icon-annihilus',
    ...gearPropsInit
  }
]

export default gearInit;