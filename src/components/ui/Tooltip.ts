import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

export interface ITooltip {
  'data-tooltip': string;
  focus?: boolean;
  center?: boolean;
}

const Tooltip = styled.div<ITooltip>(({ focus, center }) => css`
  cursor: default;
  ${pseudo('before','after')};
  ::before,
  ::after {
    display: none;
  }
  ::before {
    content: attr(data-tooltip);
    top: 0;
    left: 0;
    padding: 0.5em 0.75em;
    border-bottom: 1px solid var(--color-gold);
    background: var(--color-blue-800);
    box-shadow: 0 0 20px rgba(0 0 0 / 0.5), inset 0 -5px 20px rgba(0 0 0 / 0.5);
    color: var(--color-gold);
    font-style: italic;
    font-size: 1.4rem;
    text-align: center;
    transform: translateY(calc(-100% - 1rem));
    line-height: 1.5;
    white-space: pre;
  }
  ::after {
    top: -1.4rem;
    left: 1rem;
    width: 7px;
    height: 7px;
    border-style: solid;
    border-color: var(--color-gold);
    border-width: 0 0 1px 1px;
    background: linear-gradient(45deg, var(--color-blue-900) 50%, transparent 50%);
    transform: rotate(-45deg);
  }
  ${focus ? ':focus-within' : ':hover'} {
    ::before,
    ::after {
      display: block;
      //animation: fadeIn var(--duration-default);
    }
  }
  ${center && css`
    ::before {
      left: 50%;
      transform: translate(-50%, calc(-100% - 1rem));
    }
    ::after {
      left: 50%;
      transform: translateX(-50%) rotate(-45deg);
    }
  `}
`);

export default Tooltip;