import { gearMods } from "config/gear";
import { useEffect, useRef } from "react"
import styled from "styled-components";

export default function ItemMod({ mod, value }: {
  mod: keyof IGearMods;
  value: ValueOf<IGearMods>;
  /* value: number | {
    a: number | string;
    b: number | string;
    c?: number | string;
    d?: number | string;
  }; */
}) {

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function convertModStr() {
      let strNode = gearMods[mod]!.match(/(-|\+)?(\{\w\})(%)?/g);
      return gearMods[mod]!.replace(/(-|\+)?(\{\w\})(%)?/g, `<span>${strNode}</span>`).replace(/\{\w\}/g, value.toString());
    }
    divRef.current!.innerHTML = convertModStr() || '';
  }, [mod, value]);

  return <Mod ref={divRef}></Mod>
}

const Mod = styled.div`
  color: var(--color-blue);
  span {
    color: var(--color-gold);
  }
`;