import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

export const Slots = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  margin: -.125em;
`;

export const GearWrapper = styled.div(({ anySlotSelected }: { anySlotSelected: boolean }) => css`
  ${pseudo('after')};
  :after{
    position: relative;
    width: 100%;
    display: block;
    clear: both;
  }
  // $_{Items}$_{!anySlotSelected ? ':hover' : ''}{}
  ${anySlotSelected && css`
    ${Slots}{
      & > * {
        &:not(.active):not(:hover){
          opacity: .35;
          filter: saturate(0%);
        }
      }
    }
  `}
`);