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
  padding: 0.3em 0.7em;
  margin: 0;
  box-shadow: inset 0 0 10px rgba(0 0 0 / 0.5);
  border: 2px solid;
  border-color: var(--golden-border);
  box-shadow: inset 0 0 1em rgba(0 0 0 / 0.8);
  color: var(--color-gold);
  text-align: center;
  text-transform: uppercase;
  font-family: var(--font-family-main);
  font-size: ${big ? '2.2rem' : '1.6rem'};
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  transition: var(--duration-default);
  ${!noArrows && css`
    ${pseudo('before', 'after')};
    
    &::before,
    &::after {
      top: calc(50% - 4px);
      border-top: 4px solid var(--color-gold);
      border-right: 4px solid var(--color-gold-900);
      border-bottom: 4px solid transparent;
      border-left: 4px solid transparent;
    }
    
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
    
    &::after {
      left: -6px;
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
