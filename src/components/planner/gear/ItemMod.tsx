import { useEffect, useRef } from "react"

export default function ItemMod<K extends keyof IGearMods>({ mod, value }: {
  mod: K;
  //value: IGearMods[K];
  value: any;
}) {

  const gearModsStringMap: Partial<Record<keyof IGearMods, string>> = {
    allAttrs: `+{a} To All Attributes`,
    strength: '+{a} To Strength',
    dexterity: '+{a} To Dexterity',
    vitality: '+{a} To Vitality',
    energy: '+{a} To Energy'
  }

  const htmlStr = `<h1>DUDA</h1>`;
  const divRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function convertModStr() {
      let strNode = gearModsStringMap[mod]?.match(/(\-|\+)?(\{\w\})(\%)?/g);
      return gearModsStringMap[mod]?.replace(/(\-|\+)?(\{\w\})(\%)?/g, `<span>${strNode}</span>`).replace(/\{\w\}/g, value);
    }
    divRef.current!.innerHTML = convertModStr() || '';
  }, [htmlStr, gearModsStringMap])

  return <><div ref={divRef}></div></>
}