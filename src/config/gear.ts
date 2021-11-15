const gearPropsInit = {
  base: {} as IGearBase,
  mods: [] as IGearMod[]
}

const gearInit: IGear[] = [
  {
    slot: 'head',
    ...gearPropsInit
  },
  {
    slot: 'torso',
    ...gearPropsInit
  },
  {
    slot: 'right-hand',
    ...gearPropsInit
  },
  {
    slot: 'left-hand',
    ...gearPropsInit
  },
  {
    slot: 'gloves',
    ...gearPropsInit
  },
  {
    slot: 'belt',
    ...gearPropsInit
  },
  {
    slot: 'boots',
    ...gearPropsInit
  },
  {
    slot: 'amulet',
    ...gearPropsInit
  },
  {
    slot: 'left-ring',
    ...gearPropsInit
  },
  {
    slot: 'right-ring',
    ...gearPropsInit
  },
  {
    slot: 'torch',
    ...gearPropsInit
  },
  {
    slot: 'annihilus',
    ...gearPropsInit
  },
  {
    slot: 'charms',
    ...gearPropsInit
  },
]

export default gearInit;