import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

interface IButtonProps {
  red?: boolean;
  blue?: boolean;
  big?: boolean;
  arrowLeft?: boolean;
  arrowRight?: boolean;
  noArrows?: boolean;
}

const Button = styled.button<IButtonProps>(({ disabled, big, blue, red, arrowLeft, arrowRight, noArrows }) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25em 0.7em;
  margin: 0;
  box-shadow: inset 0 0 10px rgba(0 0 0 / 0.5);
  border: 2px solid;
  border-color: var(--golden-border);
  box-shadow: inset 0 0 1em rgba(0 0 0 / 0.8);
  color: var(--color-gold);
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-family-main);
  font-size: ${big ? '1.6rem' : '1.2rem'};
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  transition: var(--duration-default);
  line-height: 1.1;
  ${!noArrows && css`
    ${pseudo('before', 'after')};
    
    &::before,
    &::after {
      top: calc(50% - 3px);
      border-top: 3px solid var(--color-gold);
      border-right: 3px solid var(--color-gold-900);
      border-bottom: 3px solid transparent;
      border-left: 3px solid transparent;
    }
    
    &::before {
      right: -5px;
      transform: rotate(45deg);
    }
    
    &::after {
      left: -5px;
      transform: rotate(-45deg) scaleX(-1);
    }

    ${arrowRight && css`
      ::after {
        display: none;
      }
    `}

    ${arrowLeft && css`
      ::before {
        display: none;
      }
    `}
  `}
  
  ${red && !disabled && css`
    background: var(--color-red-600);
    &:hover {
      background: var(--color-red);
    }
  `}
    
  ${blue && !disabled && css`
    background: var(--color-blue-800);
    &:hover {
      background: var(--color-blue-700);
    }
  `}

  ${disabled && css`
    background: #222;
    color: #444;
    cursor: default;
  `}
`);

export default Button;
