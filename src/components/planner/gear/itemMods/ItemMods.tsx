import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "../Gear";
import ItemMod from "./ItemMod";
import FakeSelector from "components/ui/FakeSelector";
import Button from "components/ui/Button";
import { capitalize } from "helpers";
import { CallToAction, Mods } from "./itemMods.styles";

/* 
const mod = 'dmg%';
const values = Object.values(allItems).filter(u => {
    return Object.values(u).includes(mod);
}).map(o => {
    let prop = Object.entries(o).filter(([k, v]) => v === mod)[0]; //['prop1','ac/lvl']
    let propName = prop[0]; //'prop1'
    let propDigit;
    let param = Object.entries(o)
      .filter(([k, v]) => {
        //^prop ==> ^par OR ^max
        if(propName.match(/^prop/g)){
          propDigit = propName.match(/\d{1,2}$/g)[0];
          let max = k === 'max' + propDigit;
          let par = ('max' + propDigit in o) ? false : k === 'par' + propDigit;
          return max || par;
        }

        //^aprop ==> ^apar OR ^amax
        if(propName.match(/^aprop/g)){
          propDigit = propName.match(/\d{1,2}(?=\w)/g)[0];
          let max = k === 'amax' + propDigit + 'a';
          let par = ('amax' + propDigit + 'a' in o) ? false : k === 'apar' + propDigit + 'a';
          return max || par;
        }

        //^t1code ==> ^t1param OR ^t1max
        if(propName.match(/^t1code/g)){
          propDigit = propName.match(/\d{1,2}$/g)[0];
          let max = k === 't1max' + propDigit;
          let par = ('t1max' + propDigit in o) ? false : k === 't1param' + propDigit;
          return max || par;
        }
    })[0];
    //return [o.name || o.index, param[0], param[1]]; //for a complete obj table
    //return Object.fromEntries([[o.code || o.set, o.name || o.index], prop, param]); //for a complete obj table
    //return Object.fromEntries([prop, param]); //for a complete obj table
    return param[1];
})
//.sort((a,b) => a - b);
.sort((a,b) => a[2] - b[2]);
values.filter((v,i) => i === values.indexOf(v));
*/

export default function ItemMods({ mods, setMods, selectedBase, reset }: {
  mods: IGearMod[];
  setMods: React.Dispatch<React.SetStateAction<IGearMod[]>>;
  selectedBase: IGearBase,
  reset: Function
}) {
  const { charData } = useContext(PlannerContext);
  const { modsData, partialClassSkillMods } = useContext(GearContext);

  const modsListOpts = useMemo<Partial<Record<TGearModName, string>>>(() => {
    let opts = Object.fromEntries((Object.values(modsData) as IGearModData[]).map((mod: IGearModData) => {
      return [mod.name, (mod.shortDescr || mod.descr)];
    }));

    if(selectedBase.nodurability) {
      delete opts.ethereal;
    }

    return opts;
  }, [modsData, selectedBase]);

  const treeSkillsOpts = useRef(Object.fromEntries(
    charData.skills.trees.map(({ id, name }) => [id, capitalize(name)])
  ));

  const singleSkillOpts = useRef(Object.fromEntries(
    charData.skills.list.map(({ id, name }) => [id, capitalize(name)])
  ));

  const subModOptsInit = {
    treeSkills: {
      all: treeSkillsOpts.current,
      available: treeSkillsOpts.current,
      str: 'Tree'
    },
    singleSkill: {
      all: singleSkillOpts.current,
      available: singleSkillOpts.current,
      str: 'Skill'
    }
  }

  const [selectedMod, setSelectedMod] = useState<TGearModName | null>(null);
  const [subModOptions, setSubModOptions] = useState(subModOptsInit);

  useEffect(() => {
    let treeSkillsAvailableOpts = { ...treeSkillsOpts.current };
    mods.filter(m => m.name === 'treeSkills').forEach(m => {
      delete treeSkillsAvailableOpts[m.subModId!];
    });

    let singleSkillAvailableOpts = { ...singleSkillOpts.current };
    mods.filter(m => m.name === 'singleSkill').forEach(m => {
      delete singleSkillAvailableOpts[m.subModId!];
    });

    setSubModOptions(prev => {
      return {
        treeSkills: {
          ...prev.treeSkills,
          available: treeSkillsAvailableOpts
        },
        singleSkill: {
          ...prev.singleSkill,
          available: singleSkillAvailableOpts
        }
      }
    });

    setSelectedMod(null);
  }, [mods]);


  useEffect(() => {
    if (!selectedMod) return;

    setMods(prev => {
      //partial class skill mod validation
      if (partialClassSkillMods.includes(selectedMod)) {
        //max number of times to add tree skills is 2
        if (prev.filter(m => m.name === 'treeSkills').length === 2) {
          return prev;
        }

        //max number of times to add single skills is 5
        if (prev.filter(m => m.name === 'singleSkill').length === 5) {
          return prev;
        }

        //Just one mod is allowed at a time!
        //We MUST verify if the first one already have a subModName defined.
        //For multi level mods we must use the subModName as a key-id in the
        //loop instead of the modName to avoid conflicts.
        if (prev.find(m => m.name === selectedMod && !m.subModName)) {
          return prev;
        }
      }

      //regular mod validation
      else {
        //Just one instance of each regular mod is allowed
        if (prev.find(m => m.name === selectedMod)) {
          return prev;
        }
      }

      //add a brand new instance of mod
      return [
        ...prev,
        { name: selectedMod }
      ]
    });
  }, [selectedMod, setMods, partialClassSkillMods]);

  return (
    <>
      {mods.length > 0 &&
        <Mods>
          {mods.map(mod => <ItemMod key={mod.subModName || mod.name} {...{ mod, setMods, subModOptions }} />)}
        </Mods>
      }

      <CallToAction>
        <FakeSelector options={modsListOpts} callBack={setSelectedMod}>
          <Button blue arrowLeft={Object.entries(mods).length > 0 || Object.entries(selectedBase).length > 0}>Add Mod</Button>
        </FakeSelector>

        {//RESET BUTON IS LOCATED HERE DUE TO BETTER POSITIONING INTO THE LAYOUT
          (Object.entries(mods).length > 0 || Object.entries(selectedBase).length > 0) &&
          <Button red arrowRight onClick={() => reset()}>reset item</Button>
        }
      </CallToAction>
    </>
  )
}