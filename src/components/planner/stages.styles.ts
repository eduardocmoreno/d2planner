import styled, { css } from "styled-components";

export const StagesWrapper = styled.div`
  padding: 2em 1em 1em;
  background: rgba(0 0 0 / 0.3);
  border-top: 2px solid var(--color-red-700);
`;

export const Stage = styled.div(({ isActive }: { isActive: boolean }) => css`
  ${!isActive && css`
    display: none;
  `}
`);