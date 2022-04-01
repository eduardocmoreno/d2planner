import styled, { css } from "styled-components";
import { GoldenFrameStyle } from "components/ui/GoldenFrame";
import { pseudo } from "styles/mixins";

export const Title = styled.h3`
  width: 100%;
  color: var(--color-gold);
  line-height: 100%;
  ${pseudo('before','after')}
  :before,
  :after {
    top: 50%;
    width: 100%;
    border-top: 1px solid var(--color-gold-800);
  }
  :before {
    left: 0;
  }
  :after {
    right: 0;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 !important;
  width: 2em;
  height: 2em;
  border-width: 0 0 2px 2px !important;
  font-size: 1.6rem;
`;

export const Aside = styled.div`
  flex: 1;
  box-shadow: inset 10px 0 20px rgba(0 0 0 / .5);
  background: rgba(0 0 0 / .15);
`;

export const Controller = styled.div`
  flex: 2;
  padding: 1em;
`;

export const PanelWrapper = styled.div(({ position }: { position: number | null }) => css`
  ${GoldenFrameStyle};
  position: relative;
  margin-top: calc(${(position || 0) * -1}px + .25em);
  width: 100%;
  box-shadow: var(--inner-shadow), 0 20px 50px rgba(0 0 0 / .5);
  background: var(--color-blue-900);
  float: left;
`);