import { useContext, useLayoutEffect, useRef } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "./Gear";
import { Contents, Icon, Title, SlotWrapper } from "./slot.styles";
import { capitalize } from "helpers";

export default function Slot({ name, icon }: {
  name: Gear['slot'];
  icon: string;
}) {
  const { planner, newGear } = useContext(PlannerContext);
  const { selectedSlot, setSelectedSlot } = useContext(GearContext);

  const currentSlot = newGear.find(g => g.slot === name)!;
  const wrapperElem = useRef<HTMLDivElement>(null);

  function getPosition() {
    return (wrapperElem.current?.offsetTop || 0) + (wrapperElem.current?.offsetHeight || 0);
  }

  function handleOnClick() {
    setSelectedSlot(prev => {
      if (!prev.name || prev.name !== name) {
        return {
          name, position: getPosition()
        }
      }
      return {} as GearSlotSelected;
    });
  };
  
  useLayoutEffect(() => {
    if (selectedSlot.name === name && !!currentSlot.base.name && planner.find(p => p.isActive)?.name === 'Gear') {
      setSelectedSlot({
        name, position: getPosition()
      });
    };
  }, [name, selectedSlot, currentSlot.base.name, setSelectedSlot, planner]);

  return (
    <SlotWrapper ref={wrapperElem} onClick={handleOnClick} {...(selectedSlot.name === name && { className: 'active' })} >
      <Contents haveProps={!!(currentSlot.base.code || currentSlot.mods.length)} title="Click to add/edit">
        <Title>{capitalize(currentSlot.base.name || name)}</Title>

        <Icon>
          <img src={require(`assets/images/items/${icon}.png`).default} alt={name} />
        </Icon>
      </Contents>
    </SlotWrapper>
  )
}