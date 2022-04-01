import { useCallback, useContext, useEffect, useRef } from "react";
import { PlannerContext } from "pages/Planner";
import { GearContext } from "./Gear";
import BaseProp from "./BaseProp";
import FakeSelector from "components/ui/FakeSelector";
import { BasePropsList, BaseSelector } from "./base.styles";

export default function Base({ baseList }: {
  baseList: Item[];
}) {
  /* const { charLevel, charData, dispatchGear } = useContext(PlannerContext);
  const { selectedSlot: { slot, base, mods } } = useContext(GearContext);

  const baseListOpts = Object.fromEntries(baseList.map(({ code, name }) => [code, name]));
  const baseCodeRef = useRef<string | null>(null);
  const visibleBaseProps: ItemVisibleProps[] = ['minDef', 'block', 'minDmg', 'twoHandMinDmg', 'throwMinDmg', 'levelReq', 'strReq', 'dexReq', 'sockets', 'speed'];

  const handleBase = useCallback((code: string) => {
    if (code !== baseCodeRef.current) {
      dispatchGear({
        type: 'BASE',
        payload: {
          slot,
          base: baseList.find(i => i.code === code),
          charLevel
        }
      });
    }
  }, [slot, charLevel, baseList, dispatchGear]);

  useEffect(() => {
    baseCodeRef.current = base.code!;
  }, [base.code]);

  useEffect(() => {
    handleBase(baseCodeRef.current as string);
  }, [handleBase]); */

  return (
    <>
      {/* <FakeSelector options={baseListOpts} callBack={handleBase} align="center" textAlign="center">
        <BaseSelector>{base.name || `Select`}<i className='icon-arrow-down' /></BaseSelector>
      </FakeSelector> */}

      {/* base.code &&
        <BasePropsList>
          {visibleBaseProps.map(prop =>
            <BaseProp key={prop} {...{ base, mods, cleanBase: baseList.find(i => i.code === base.code) || {} as ItemBaseData, prop }} />
          )}
        </BasePropsList>
       */}
    </>
  )
}