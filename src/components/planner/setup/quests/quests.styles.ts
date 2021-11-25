import styled, { css } from "styled-components";

export const listHoverEffect = css`
  user-select: none;
  transition: var(--duration-fast);
  &:hover {
    cursor: pointer;
    color: var(--color-gold-200);
  }
`;

export const List = styled.div`
  flex-direction: column;
  margin: 2em 0 0;
  padding: 1.25em;
`;

export const Item = styled.div(({ head }: { head?: boolean }) => css`
  display: grid;
  grid-template-columns: 1.5fr 0.7fr 1fr 0.5fr;
  &:not(:first-child) {
    margin-top: 1em;
  }
  ${head && css`
    //margin-bottom: 0.5em;
    padding-bottom: .75em;
    border-bottom: 1px solid var(--color-gold-900);
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    ${Difficulty} {
      ${listHoverEffect}
    }
  `}
`);

export const Description = styled.div`
  color: var(--color-gold);
  text-align: left;
  ${listHoverEffect}
`;

export const Name = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3em;
  font-size: 1.4rem;
`;

export const Details = styled.small`
  display: block;
  color: var(--color-blue-300);
  font-size: 1.2rem;
  font-style: italic;
`;

export const Difficulty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleController = styled.div`
  margin-top: 1em;
  padding-top: 1em;
  border-top: 1px solid var(--color-gold-800);
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-gold);
    text-align: center;
    user-select: none;
    input {
      margin-left: 0.5em;
    }
    :hover {
      color: var(--color-gold-200);
    }
  }
`;