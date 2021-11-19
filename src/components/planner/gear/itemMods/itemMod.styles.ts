import styled, { css } from "styled-components";

const fieldHoverFocusEffect = css`
  border-bottom: 1px dashed transparent;
  :hover,
  :focus-within {
    color: var(--color-gold-200);
    border-bottom-color: rgba(var(--color-gold-rgb), .35);
  }
`;

export const Remove = styled.div.attrs(() => ({
  className: 'icon-close'
}))`
  display: flex;
  align-items: center;
  [class^=icon-] {
    display: block;
    color: var(--color-red);
    font-size: 1.2rem;
  }
  :hover {
    cursor: pointer;
    [class^=icon-] {
      transform: scale(1.4);
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  align-items: stretch;
  :not(:hover){
    ${Remove}{
      display: none;
    }
  }
`;

export const Mod = styled.div(({ isValid }: { isValid?: boolean }) => css`
  color: var(--color-blue);
  ${!isValid && css`
    color: var(--color-red-400);
  `}
  font-size: 1.6rem;
  .sign,
  .unit,
  .value,
  .selector-ph {
    color: var(--color-gold);
  }
  .unit {
    font-size: 1.4rem;
  }
  .value {
    padding: 0 .1em;
  }
  .selector-ph {
    ${fieldHoverFocusEffect};
    cursor: pointer;
    [class^=icon-] {
      font-size: 1.2rem;
    }
  }
  .fake-selector {
    display: inline-block;
  }
`);

export const Input = styled.input(({ width }: { width: number }) => css`
  ${fieldHoverFocusEffect};
  padding: 0 .075em;
  width: ${width > 0 ? `${width + .15}em` : '1.2em'};
  background: transparent;
  color: var(--color-gold);
  font-size: 1.6rem;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  :focus {
    //min-width: 1em;
  }
  ::selection{
    background: rgba(var(--color-blue-rgb), .35);
  }  
`);

