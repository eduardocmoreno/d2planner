import styled, { css } from "styled-components";

export const Stage = styled.div(({ isActive }: { isActive: boolean }) => css`
  padding: 2em 1em 1em;
  border-top: 2px solid var(--color-red-700);
  box-shadow: inset 0 0 200px rgb(0 0 0 / .65);
  background: rgba(0 0 0 / .1);
  ${!isActive && css`
    display: none;
  `}
`);