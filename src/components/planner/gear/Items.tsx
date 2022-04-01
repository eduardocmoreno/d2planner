import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { getItemMod } from "helpers";
import { ItemsWrapper } from "./items.styles";

export default function Items({ baseList }: {
  baseList: Item[]
}) {
  const { items } = useContext(PlannerContext);
  
  return (
    <ItemsWrapper>
      {items.map(i => {
        return (
          <div key={i.id}>
            <img src={require(`assets/images/items/${i.image || baseList.find(b => b.code === i.code)?.image}.png`).default} alt={i.name} />
            <h4>{i.name} {baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)?.name}</h4>
          </div>
        )
      })}
    </ItemsWrapper>
  )
}
