import styled from "styled-components";

export const Wrapper = styled.ul`
  margin-top: .75em;
  font-size: 1.4rem;
  li {
    display: flex;
    gap: var(--spacing-sm);
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