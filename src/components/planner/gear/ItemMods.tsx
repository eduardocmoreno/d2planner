import styled from "styled-components";
import ItemMod from "./ItemMod";

export default function ItemMods({ itemMods, setItemMods }: {
  itemMods: IGearMods,
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>
}) {

  return (
    <Wrapper>
      {Object.keys(itemMods).map(mod =>
        <ItemMod key={mod} {...{
          mod: mod as keyof IGearMods,
          setItemMods
        }} />
      )}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
`;