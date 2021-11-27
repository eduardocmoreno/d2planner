import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

export const Wrapper = styled.div`
  display: flex;
  gap: .5em;
  min-height: 10em;
  & > :nth-child(2){
    flex: 1;
  }
`;

export const TreesSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TreesTabs = styled.div`
  display: flex;
  gap: .25em;
  height: 2.7em;
  z-index: 1;
`;

export const Tab = styled.div(({ active }: { active: boolean }) => css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-family: var(--font-family-main);
  text-align: center;
  text-transform: uppercase;
  white-space: pre;
  ${!active && css`
    margin: 0 0 .25em;
    box-shadow: inset 0 -.8em 2em rgba(0 0 0 / 0.5);
    background: rgba(255 255 255 / .06);
    color: var(--color-gold);
    cursor: pointer;
    :hover {
      background: rgba(255 255 255 / .15);
      box-shadow: inset 0 -1em 2em rgba(0 0 0 / 0.8);
    }
  `}
  ${active && css`
    margin-bottom: -2px;
    padding-bottom: 2px;
    border-bottom: 2px solid var(--color-gold);
    box-shadow: inset 0 -.5em 2em rgba(0 0 0 / 1);
    color: #fff;
    background: var(--color-gold-700);
    cursor: default;
    ${pseudo('after')}
    &:after {
      top: calc(100% - 3px);
      height: 0;
      width: 0;
      border-width: 5px;
      border-style: solid;
      border-color: var(--color-gold) var(--color-gold-800) transparent transparent;
      transform: rotate(135deg);
    }
  `}
`);

export const Trees = styled.div`
  padding: 30px 15px;
  border-top-color: var(--color-gold-900) !important;
`;