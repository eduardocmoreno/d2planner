import { addNewModValidation } from "helpers";

export default function itemsReducer(prev: Item[], action: ItemsReducer): Item[] {
  const id = action.payload.id;

  switch (action.type) {
    case 'CREATE_ITEM': {
      return [
        ...prev, //all other items
        {
          id,
          code: action.payload.code!,
          rarity: 'normal'
        } as Item
      ]
    }

    case 'UPDATE_ITEM': {
      return prev.map(p => {
        if (p.id === id) { //find current item
          return {
            ...p, //id, mods, etc...
            code: action.payload.code || p.code,
            rarity: action.payload.rarity || p.rarity
          }
        }
        return p;
      });
    }

    case 'DELETE_ITEM': {
      return prev.filter(p => p.id !== id);
    }

    case 'ADD_MOD': {
      return prev.map(p => {
        if (p.id === id) {//finding current item
          const prevMods = p.mods || [] as ItemMod[];
          const newMod = action.payload.mod!;

          if (addNewModValidation(newMod, prevMods)) { //validate mod before adding it
            return {
              ...p, //id, code, etc...
              mods: [ 
                ...prevMods, //all other mods
                newMod 
              ]
            }
          }

          return p;
        }
        return p;
      });
    }

    case 'UPDATE_MOD': {
      return prev.map(p => {
        const updatedMod = action.payload.mod!;

        if (p.id === id) {//finding current item by ID
          return {
            ...p, //id, code, etc...
            mods: p.mods!.map(m => {
              if (m.id ? m.id === updatedMod.id : m.name === updatedMod.name) { //find the mod you want to update
                return updatedMod; //ex. { name: 'allSkills', value: 2 }
              }
              return m;
            })
          }

        }

        return p;
      });
    }

    case 'DELETE_MOD': {
      const targetMod = action.payload.mod!;

      return prev.map(p => {
        if (p.id === id) { //find current item
          return {
            ...p,
            mods: p.mods!.filter(p => p.id !== targetMod.id || p.name !== targetMod.name)
          }
        }
        return p;
      });
    }

    case 'CLEAR_MODS': {
      return prev.map(p => {
        if (p.id === id) { //find current item
          return {
            ...p,
            mods: [] as ItemMod[]
          }
        }
        return p;
      });
    }
  }
}