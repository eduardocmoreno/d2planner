import { GoldenFrameStyle } from "components/ui/GoldenFrame";
import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

export const Icon = styled.div``;

export const Title = styled.h2`
  flex: 1;
  align-items: center;
  display: flex;
  margin-bottom: 1em;
  color: var(--color-gold);
  font-size: 1.4rem;
  font-weight: normal;
  text-transform: uppercase;
  text-align: center;
  text-indent: -.1em;
  letter-spacing: -.1em;
  line-height: 100%;
`;

export const Contents = styled.div(({ haveProps }: { haveProps: boolean }) => css`
  ${GoldenFrameStyle};
  flex-direction: column;
  align-items: center;
  padding: 1.25em .45em;
  max-width: 100%;
  ${!haveProps && css`
    background: none;
  `}
`);

export const SlotWrapper = styled.div`
  display: flex;
  padding: .125em;
  cursor: pointer;
  :nth-child(1) { grid-area: 1 / 4 / 2 / 6; }
  :nth-child(2) { grid-area: 1 / 6 / 2 / 8; }
  :nth-child(3) { grid-area: 2 / 3 / 3 / 5; }
  :nth-child(4) { grid-area: 2 / 5 / 3 / 7; }
  :nth-child(5) { grid-area: 2 / 7 / 3 / 9; }
  :nth-child(6) { grid-area: 3 / 1 / 4 / 3; }
  :nth-child(7) { grid-area: 3 / 3 / 4 / 5; }
  :nth-child(8) { grid-area: 3 / 5 / 4 / 7; }
  :nth-child(9) { grid-area: 3 / 7 / 4 / 9; }
  :nth-child(10) { grid-area: 3 / 9 / 4 / 11; }
  :nth-child(11) { grid-area: 4 / 3 / 5 / 5; }
  :nth-child(12) { grid-area: 4 / 5 / 5 / 7; }
  :nth-child(13) { grid-area: 4 / 7 / 5 / 9; }
  :nth-child(14) { grid-area: 5 / 4 / 6 / 6; }
  :nth-child(15) { grid-area: 5 / 6 / 6 / 8; }
  &.active {
    z-index: 1;
    ${Contents}{
      background: linear-gradient(rgba(var(--color-blue-rgb), .1), var(--color-blue-900));
      
      
      //--bottom-gap: calc(-.25em - 2px);
      //margin-bottom: var(--bottom-gap);
      //padding-bottom: calc(1.25em + .25em + 4px);
      //border-bottom:0;
      // ${pseudo('before')}
      // :before {
      //   bottom: 0;
      //   width: calc(100% - 1em);
      //   border-bottom: var(--golden-dotted-line);
      // }
    }
  }
  :hover:not(.active) {
    ${Contents}{
      box-shadow: inset 0 0 1.5em rgba(0 0 0 / .75);
      background: rgba(var(--color-blue-rgb), .1);
    }
  }
`;