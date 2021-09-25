import { MouseEvent, useContext } from "react";
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import GoldenFrame, { FrameContent, FrameLabel } from "components/ui/GoldenFrame";
import Button from "components/ui/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: var(--spacing-md);
  border: 2px solid;
  border-color: var(--golden-border);
  ${Button}{
    padding-right: 0;
    padding-left: 0;
    border: 0;
    text-transform: none;
    :not(:first-child){
      border-left: 2px solid var(--color-gold-800);
    }
  }
`;

const Label = styled(FrameLabel)`
  font-size: 1.2rem;
`;

const StatResults = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-family: var(--font-family-main);
  font-size: 2.2rem;
  line-height: 1;
  .active {
    color: var(--color-gold);
    font-size: 2.7rem;
  }
`;

let active = false;

export default function Attr({ name }: { name: keyof IAttrsState }) {

  const { attrs, dispatchAttrs } = useContext(PlannerContext);
  const { total, applied, extras, base } = attrs[name];

  function batch(shift: boolean): number {
    return shift ? 10 : 1;
  }

  // function increase(e: MouseEvent<HTMLButtonElement>) {
  //   let newStat = batch(e.shiftKey);

  //   if (newStat > statPoints) {
  //     newStat = 0;
  //   }

  //   statPoints > 0 && setState(state + batch(e.shiftKey));
  // }

  // function decrease(e: MouseEvent<HTMLButtonElement>) {
  //   active && setState(state - batch(e.shiftKey));
  // }

  // function reset() {
  //   setState(charDefaultStats[stat]);
  // }

  function handle(e: MouseEvent<HTMLButtonElement>, type: IAttrsAction['type']) {
    dispatchAttrs({
      type: type,
      payload: {
        attr: name,
        prop: "applied",
        batch: batch(e.shiftKey)
      }
    });
  }

  function add(e: MouseEvent<HTMLButtonElement>) {
    dispatchAttrs({
      type: 'ADD',
      payload: {
        attr: name,
        prop: "applied",
        batch: batch(e.shiftKey)
      }
    });
  }

  function sub(e: MouseEvent<HTMLButtonElement>) {
    dispatchAttrs({
      type: 'SUB',
      payload: {
        attr: name,
        prop: "applied",
        batch: batch(e.shiftKey)
      }
    });
  }

  return (
    <Wrapper>
      <GoldenFrame>
        <Label>{name}</Label>
        <FrameContent>
          <StatResults>
            <strong className={active ? 'active' : ''}>{total}</strong>
            <div>a: {applied}</div>
            <div>e: {extras}</div>
            <div>b: {base}</div>
          </StatResults>
        </FrameContent>
      </GoldenFrame>

      <ButtonsWrapper>
        <Button blue arrowLeft onClick={(e) => handle(e, 'ADD')}>t</Button>
        <Button blue noArrows onClick={(e) => handle(e, 'SUB')}>-</Button>
        <Button red arrowRight>0</Button>
      </ButtonsWrapper>
    </Wrapper>
  )
}
