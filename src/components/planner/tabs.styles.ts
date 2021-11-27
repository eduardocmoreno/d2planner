import styled from "styled-components";
import { pseudo } from "styles/mixins";

export const Tabs = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

export const Tab = styled.div`
  --inner-glow: inset 0 -.5em 1em rgba(0 0 0 / 0.5);
  --inner-glow-hover: inset 0 -1em 2em rgba(0 0 0 / 0.9);
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
    background: rgba(var(--color-blue-900-rgb), .75);
    box-shadow: var(--inner-glow);
    font-size: 1.6rem;
    &:not(.active) {
      cursor: pointer;
      &:hover {
        background: rgba(var(--color-blue-rgb), .35);
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
    &:after {
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