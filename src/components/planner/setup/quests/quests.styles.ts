import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  margin-top: 2em;
`;

export const listHoverEffect = css`
  user-select: none;
  transition: var(--duration-fast);
  &:hover {
    cursor: pointer;
    color: var(--color-gold);
    text-shadow: 0 0 10px rgba(var(--color-gold-rgb), 0.5);
  }
`;

export const List = styled.div`
  padding: 0 0.7em 0.7em;
  background: rgba(0 0 0 / 0.3);
`;

export const Item = styled.div(({ head }: { head?: boolean }) => css`
  display: grid;
  grid-template-columns: 1.5fr 0.7fr 1fr 0.5fr;
  &:not(:first-child) {
    margin-top: 1em;
  }
  ${head && css`
    margin-bottom: 0.5em;
    padding: 0.7em 0 0.5em;
    border-bottom: 1px solid var(--color-gold);
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
  color: var(--color-blue);
  font-size: 1.2rem;
  font-style: italic;
`;

export const Difficulty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleController = styled.div`
  margin-top: 1.5em;
  color: $gold;
  text-align: center;
  user-select: none;
  input {
    margin-right: 0.5em;
  }
`;