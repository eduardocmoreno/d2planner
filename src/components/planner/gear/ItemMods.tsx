import { gearModsCategNames, gearModsByCategories, gearMods } from "config/gear";
import { SetStateAction, useEffect, useState } from "react";
import { Wrapper } from "./ItemMods.styles";
import Button from "components/ui/Button";
import ItemMod from "./ItemMod";

export default function ItemMods({ itemMods, setItemMods }: {
  itemMods: IGearMods,
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>
}) {
  const [selectedCategory, setSelectedCategory] = useState<TGearModsCategNames>();
  const [modsByCategory, setModsByCategory] = useState({});
  const [selectedMod, setSelectedMod] = useState<keyof IGearMods>();
  const [inputLvl1, setInputLvl1] = useState<number | null>();
  const [inputLvl2, setInputLvl2] = useState<number | null>();
  const [selectLvl1, setSelectLvl1] = useState();

  function handleModsForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setItemMods(prev => {
      return {
        ...prev,
        [selectedMod!]: null
      }
    });
  }

  useEffect(() => {
    setModsByCategory(gearModsByCategories[selectedCategory!]);
  }, [selectedCategory, setModsByCategory]);


  console.log(itemMods);


  return (
    <Wrapper>
      {Object.entries(itemMods).map(([mod, value], i) =>
        <ItemMod key={i} {...{ 
          mod: mod as keyof IGearMods,
          setItemMods
          //value: value as ValueOf<IGearMods> 
        }} />
      )}
      <form onSubmit={handleModsForm}>
        <select onChange={e => setSelectedCategory(e.target.value as TGearModsCategNames)}>
          <option value="">Add mod</option>
          {gearModsCategNames.map((m, i) => {
            return <option key={i} value={m}>{m}</option>
          })}
        </select>
        {modsByCategory &&
          <select onChange={e => setSelectedMod(e.target.value as keyof IGearMods)}>
            <option value="">Add mod</option>
            {Object.entries(modsByCategory).map(([mod, value]) => {
              return <option key={mod} value={mod}>{value as string}</option>
            })}
          </select>
        }
        {/* selectedMod &&
          <>
            <input type="number" placeholder="Numbers only" onChange={e => setInputLvl1(parseInt(e.target.value))} />
          </>
         */}
        <Button blue type="submit">OK</Button>
      </form>
    </Wrapper>
  )
}