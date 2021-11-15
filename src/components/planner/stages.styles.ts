import styled, { css } from "styled-components";

export const StagesWrapper = styled.div`
  padding: 2rem;
  background: rgba(0 0 0 / 0.3);
  border: solid var(--color-red-700);
  border-width: 2px 0;
`;

export const Stage = styled.div(({ isActive }: { isActive: boolean }) => css`
  ${!isActive && css`
    display: none;
  `}
`);