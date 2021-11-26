import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

export const Wrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
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
  gap: var(--spacing-sm);
  height: 2.7em;
`;

export const Tab = styled.div(({ active }: { active: boolean }) => css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-main);
  text-align: center;
  text-transform: uppercase;
  white-space: pre;
  z-index: 1;
  ${!active && css`
    margin: 0 0 var(--spacing-sm);
    box-shadow: inset 0 -.5em 2em rgba(0 0 0 / 0.5);
    background: rgba(255 255 255 / .06);
    color: var(--color-gold);
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color var(--duration-default);
    :hover {
      background: rgba(255 255 255 / .085);
    }
  `}
  ${active && css`
    margin-bottom: -2px;
    border-bottom: 2px solid var(--color-gold);
    box-shadow: inset 0 -.5em 2em rgba(0 0 0 / 1);
    color: #fff;
    background: var(--color-gold-700);
    font-size: 1.4rem;
    line-height: 1;
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
  flex: 1;
  padding: 30px 15px;
  border-width: 2px 0;
  border-style: solid;
  border-top-color: var(--color-gold-900);
  border-bottom-color: var(--color-gold);
  background: rgba(0 0 0 / .3);
`;