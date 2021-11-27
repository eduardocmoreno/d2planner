import styled, { css } from "styled-components";
import { pseudo } from "styles/mixins";

interface ITooltip {
  'data-tooltip': string;
  focus?: boolean;
}

const Tooltip = styled.div<ITooltip>(({ focus }) => css`
  ${pseudo('before','after')};
  :before,
  :after {
    display: none;
    z-index: 2;
  }
  :before {
    content: attr(data-tooltip);
    top: 0;
    left: 50%;
    padding: .5em .75em .25em;
    border-bottom: 1px solid var(--color-gold);
    background: var(--color-blue-800);
    box-shadow: 0 0 20px rgba(0 0 0 / 0.5), inset 0 -5px 20px rgba(0 0 0 / 0.5);
    color: var(--color-gold);
    font-style: italic;
    font-size: 1.2rem;
    font-family: var(--font-family-pair);
    text-align: center;
    transform: translate(-50%, calc(-100% - 10px));
    line-height: 1.4;
    white-space: pre;
  }
  :after {
    top: 0;
    left: 50%;
    border-width: 3px;
    border-style: solid;
    border-color: transparent transparent var(--color-gold) var(--color-gold-800);
    transform: translate(-50%, calc(-100% - 7px)) rotate(-45deg);
  }
  ${focus ? ':focus-within' : ':hover'} {
    :before,
    :after {
      display: block;
    }
  }
`);

export default Tooltip;