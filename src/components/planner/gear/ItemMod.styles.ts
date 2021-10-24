import styled, { css } from "styled-components";

export const Remove = styled.div.attrs(() => ({
  className: 'icon-close'
}))`
  [class^=icon-] {
    display: block;
    color: var(--color-red);
    font-size: 1.2rem;
    line-height: 1.1;
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
  align-items: center;
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
  .unit {
    color: var(--color-gold);
  }
`;

export const Input = styled.input(({ width }: { width: number }) => css`
  width: ${width > 0 ? `${width}em` : '1.2em'};
  background: transparent;
  color: var(--color-gold);
  border-bottom: 1px dotted transparent;
  font-size: 1.8rem;
  line-height: 1.1;
  text-align: center;
  :hover,
  :focus{
    border-bottom-color: #222;
  }
`);

