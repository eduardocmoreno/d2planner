import styled, { css } from "styled-components";

const fieldHoverEffect = css`
  box-shadow: 0 0 10px rgba(var(--color-gold-rgb), .35);
  border-radius: 4px;
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
  .selector-ph {
    padding: 0 .15em;
    margin: 0 -.15em;
    cursor: pointer;
    :hover,
    :focus-within {
      ${fieldHoverEffect};
      color: var(--color-gold-300);
    }
    [class^=icon-] {
      font-size: 1.2rem;
    }
  }
  .fake-selector {
    display: inline-block;
  }
`);

export const Input = styled.input(({ width }: { width: number }) => css`
  padding: 0 .075em;
  width: ${width > 0 ? `${width + .15}em` : '1.2em'};
  background: transparent;
  color: var(--color-gold);
  border-bottom: 1px dotted transparent;
  font-size: 1.6rem;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
  :hover,
  :focus{
    color: var(--color-gold-300);
    ${fieldHoverEffect};
  }
  :focus {
    //min-width: 1em;
  }
  ::selection{
    background: rgba(var(--color-blue-rgb), .35);
  }  
`);

