import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "./Gear";
import { Aside, CloseBtn, Controller, PanelWrapper, Title } from "./panel.styles";
import Items from "./Items";
import Button from "components/ui/Button";

export default function Panel({ position }: {
  position: number;
}) {

  const { } = useContext(PlannerContext);
  const { selectedSlot, setSelectedSlot } = useContext(GearContext);

  function closePanel(){
    setSelectedSlot({} as GearSlotSelected);
  }

  return (
    <PanelWrapper position={position}>
      <Aside>
        {/* <Items baseList={baseList[selectedSlot.name]} /> */}
      </Aside>

      <Controller>
        {/* <Title>{selectedSlot.name}</Title> */}
      </Controller>

      <Button as={CloseBtn} noArrows red onClick={closePanel}><i className="icon-close" /></Button>
    </PanelWrapper>
  )
}
{/* isBaselessItem ?
  <Title>{capitalize(selectedSlot.slot)}</Title>
  :
  <Base baseList={baseList[selectedSlot.slot]} />
}

{(isBaselessItem || selectedSlot.base?.code) &&
  <Mods />
  */}

{/* <div>
    items.map(i => {
    return (
      <div key={i.id}>
        <img src={require(`assets/images/items/${i.image || baseList.find(b => b.code === i.code)?.image}.png`).default} alt={i.name} />
        <h4>{i.name} {baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)?.name}</h4>
        <div>
          Defense: {
            Math.floor(
              baseList
                .find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)!.maxDef
              * ((getItemMod(i.mods!, 'eDef')?.value || 0) / 100 + 1) + (getItemMod(i.mods!, 'def')?.value || 0) + ((getItemMod(i.mods!, 'def/lvl')?.value || 0) * charLevel)
            )
          } ({baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)!.maxDef})
        </div>

        <div>
          Level required: {i.lvlReq || baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)?.lvlReq} ({baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)?.lvlReq})
        </div>

        <div>
          Strength Required: {i.strReq || baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)?.strReq} ({baseList.find(b => b.code === i.ultraCode || b.code === i.uberCode || b.code === i.code)?.strReq})
        </div>
        <br /><br />
      </div>
    )
  })
  </div> */}