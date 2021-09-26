const initProps = {
  base: 0,
  applied: 0,
  bonnus: 0,
  total: 0
}

const attrsInit: IAttrsState = {
  strength: {
    ...initProps
  },
  dexterity: {
    ...initProps
  },
  vitality: {
    ...initProps
  },
  energy: {
    ...initProps
  }
}

export default attrsInit;