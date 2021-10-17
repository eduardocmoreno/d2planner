import { gearMods } from "config/gear";
import { useContext, useEffect, useRef, useState } from "react"

export default function ItemMod<T>({ mod, setItemMods }: {
  mod: keyof IGearMods;
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>;
  //value: ValueOf<IGearMods>;
  /* value: number | {
    a: number | string;
    b: number | string;
    c?: number | string;
    d?: number | string;
  }; */
}) {
  
  const divRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState(0);
  
  const inputRef = useRef(0);

  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  useEffect(() => {
    console.log('teste');
    input > 0 && 
    setItemMods(prev => {
      return {
        ...prev,
        [mod]: input
      }
    })
  }, [input]);
    
  let splitStr = gearMods[mod]!.split(/\{\w\}/g);
  
  useEffect(() => {
    function convertModStr() {
      //let strNode = modStr.match(/(\-|\+)?(\{\w\})(\%)?/g);
      //return modStr.replace(/(\-|\+)?(\{\w\})(\%)?/g, `<span>${strNode}</span>`).replace(/\{\w\}/g, value.toString());
      return '';
    }
    //divRef.current!.innerHTML = convertModStr() || '';
  }, [])

  return <>{splitStr[0]}<input value={input} placeholder="0" onChange={e => setInput(parseInt(e.target.value))} />{splitStr[1]}</>
}