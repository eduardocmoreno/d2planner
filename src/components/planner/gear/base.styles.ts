import styled from "styled-components";
import { /* HeadingStyle, Title */ } from "./panel.styles";

export const BaseSelector = styled.h2`
  align-items: center;
  [class^=icon-]{
    margin-left: var(--spacing-sm);
    color: var(--color-blue);
    font-size: 1.6rem;
  }
  :hover {
    color: var(--color-gold-200);
    cursor: pointer;
  }
`;

export const BasePropsList = styled.ul`
  margin-top: var(--spacing-lg);
  font-size: 1.4rem;
  li {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    text-align: center;
    :not(:first-child){
      margin-top: .25em;
    }
    span {
      color: var(--color-gold);
      &.warn {
        color: var(--color-red);
      }
      &.highlight {
        color: var(--color-blue);
      }
    }
  }
`;