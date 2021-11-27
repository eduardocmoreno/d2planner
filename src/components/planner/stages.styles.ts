import styled, { css } from "styled-components";

export const StagesWrapper = styled.div`
  padding: 2em 1em 1em;
  border-top: 2px solid var(--color-red-700);
  box-shadow: inset 0 0 120px rgb(0 0 0 / .65);
`;

export const Stage = styled.div(({ isActive }: { isActive: boolean }) => css`
  ${!isActive && css`
    display: none;
  `}
`);