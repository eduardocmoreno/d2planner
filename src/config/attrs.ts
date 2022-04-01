const initProps: AttrProps = {
  base: 0,
  applied: 0,
  bonus: 0,
  total: 0
}

const attrsInit: Attrs = {
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