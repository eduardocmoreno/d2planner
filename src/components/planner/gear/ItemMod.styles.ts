import styled, { css } from "styled-components";

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

export const Mod = styled.div`
  color: var(--color-blue);
  font-size: 1.6rem;
  .sign,
  .unit,
  .selector-ph {
    color: var(--color-gold);
  }
  .unit {
    font-size: 1.4rem;
  }
  .selector-ph {
    border-bottom: 1px dotted transparent;
    cursor: pointer;
    :hover,
    :focus-within {
      color: var(--color-gold-300);
      border-bottom-color: #222;
    }
    [class^=icon-] {
      font-size: 1.2rem;
    }
  }
  .fake-selector {
    display: inline-block;
  }
`;

export const Input = styled.input(({ width }: { width: number }) => css`
  width: ${width > 0 ? `${width}em` : '1.2em'};
  background: transparent;
  color: var(--color-gold);
  border-bottom: 1px dotted transparent;
  font-size: 1.8rem;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
  :hover,
  :focus{
    color: var(--color-gold-300);
    border-bottom-color: #222;
  }
`);

