import { useContext } from "react";
import { PlannerContext } from "pages/Planner";
import styled from "styled-components";
import { pseudo } from "styles/mixins";

const Tabs = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Tab = styled.div`
  --inner-glow: inset 0 -.5em 1em rgba(0 0 0 / 0.5);
  --inner-glow-hover: inset 0 -.8em 2em rgba(0 0 0 / 0.8);
  display: flex;
  flex: auto;
  align-items: center;
  justify-content: center;
  padding: 0.75em 0;
  color: var(--color-gold);
  text-align: center;
  font-family: var(--font-family-main);
  text-transform: uppercase;
  cursor: default;
  &:not(.active) {
    margin-top: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
    background: var(--color-blue-900);
    box-shadow: var(--inner-glow);
    font-size: 1.6rem;
    &:not(.active) {
      cursor: pointer;
      transition-duration: var(--duration-default);
      transition-property: background-color, box-shadow;
      &:hover {
        background: var(--color-blue-800);
        box-shadow: var(--inner-glow-hover);
      }
    }
  }
  &.active {
    margin-bottom: -2px;
    border-bottom: 2px solid var(--color-gold);
    box-shadow: var(--inner-glow-hover);
    background: var(--color-red-700);
    font-size: 2rem;
    font-weight: bold;
    ${pseudo('after')}
    &::after {
      top: calc(100% - 3px);
      height: 0;
      width: 0;
      border-width: 5px;
      border-style: solid;
      border-color: var(--color-gold) var(--color-gold-800) transparent transparent;
      transform: rotate(135deg);
    }
  }
`;

export default function PlannerTabs() {
  //context: planner
  const { planner, setPlanner } = useContext(PlannerContext);

  //handle: tabs
  const handleTabs = (id: number) => {
    setPlanner(planner.map((t: IPlanner) => {
      return {
        ...t,
        isActive: id === t.id ? true : false
      }
    }))
  }

  return (
    <Tabs>
      {planner.map(({ id, name, isActive }: IPlanner) =>
        <Tab
          key={id}
          className={isActive ? 'active' : ''}
          onClick={() => handleTabs(id)}
        >{name}</Tab>
      )}
    </Tabs>
  )
}
