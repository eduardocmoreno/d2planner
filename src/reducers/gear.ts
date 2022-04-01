import { applyModsOnBase, includes } from "helpers";

export default function gearReducer(prev: Gear[], action: GearReducer) {
  const newMod = action.payload?.newMod || {} as ItemMod;
  const targetMod = action.payload?.targetMod || {} as ItemMod;
  const cleanBase = action.payload?.base || {} as Item;
  const charLevel = action.payload?.charLevel || 1;

  switch (action.type) {
    case 'BASE': {
      console.log('BASE');
      return prev.map(p => {
        if (p.slot === action.payload.slot) {
          return {
            ...p, //slot and mods
            base: applyModsOnBase(prev, p.mods, cleanBase, charLevel)
          }
        }
        return p;
      });
    }

    case 'ADD_MOD': {
      
      console.log('ADD_MOD');
      const newMod = action.payload.newMod || {} as ItemMod;

      return prev.map(p => {
        if (p.slot === action.payload.slot) { //find current item/slot (ex.: HEAD)
          const currentMods = p.mods;
          const isPartialClassSkillMod = includes(['tab-skill', 'single-skill'] as ItemModPartialClassSkill[], newMod.name);

          //validate treeSkills mod instances
          if (newMod.name === 'tab-skill' && currentMods.filter(m => m.name === newMod.name).length === 2) {
            return p;
          }

          //validate treeSkills mod instances
          if (newMod.name === 'single-skill' && currentMods.filter(m => m.name === newMod.name).length === 5) {
            return p;
          }

          //Just one mod is allowed at a time!
          //We MUST verify if the first one already have a subName defined.
          //For multi level mods we must use the subName as a key-id in the
          //loop instead of the modName to avoid conflicts.
          if (isPartialClassSkillMod && currentMods.find(m => m.name === newMod.name && !m.id)) {
            return p;
          }

          //Just one instance of all other mods is allowed
          if (!isPartialClassSkillMod && currentMods.find(m => m.name === newMod.name)) {
            return p;
          }

          return {
            ...p, //slot and base
            mods: [...p.mods, newMod]
          }
        }

        return p;
      });
    }

    case 'UPDATE_MOD': {
      console.log('UPDATE_MOD');
      if (!(newMod.id || newMod.name)) {
        return prev;
      }

      return prev.map(p => {
        //CURRENT SLOT
        if (p.slot === action.payload.slot) { //find current item
          const mods = p.mods.map(m => {
            if (m.id ? m.id === targetMod.id : m.name === targetMod.name) { //find current mod
              return { ...m, ...newMod }
            }
            return m;
          });

          return {
            ...p, //slot
            base: applyModsOnBase(prev, mods, cleanBase, charLevel),
            mods
          }
        }

        return p;
      });
    }

    case 'DELETE_MOD': {
      const targetMod = action.payload.targetMod || {} as ItemMod;

      return prev.map(p => {
        if (p.slot === action.payload.slot) { //find current item
          const newMods = p.mods.filter(p => p.id !== targetMod.id || p.name !== targetMod.name);

          return {
            ...p, //slot and base
            base: applyModsOnBase(prev, newMods, cleanBase, charLevel),
            mods: newMods
          }
        }
        return p;
      });
    }

    case 'RESET': {
      return prev.map(p => {
        if (p.slot === action.payload.slot) {
          return {
            ...p, //slot
            base: {} as Item,
            mods: [] as ItemMod[]
          }
        }
        return p;
      });
    }
  }
}