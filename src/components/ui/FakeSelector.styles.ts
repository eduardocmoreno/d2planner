import styled, { css } from "styled-components";

export const ChildSlot = styled.div``;

export const ListItem = styled.div(({ isActive }: { isActive: boolean; }) => css`
  padding: .3em .5em;
  color: #999;
  font-size: 1.5rem;
  ${isActive && css`
    color: #fff;
    background: var(--color-blue-800);
  `}
  :hover {
    cursor: pointer;
  }
`);

export const List = styled.div(({ isEmpty }: { isEmpty: boolean }) => css`
  display: ${isEmpty ? 'none' : 'block'};
  margin-top: .25em;
  max-height: 25vh;
  overflow-y: auto;
  
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-gold);
  }

  scrollbar-width: thin;
  scrollbar-color: var(--color-gold) transparent;
}
`);

export const Selector = styled.div``;

export const Wrapper = styled.div(({ isActive, position, vpRepos, align, textAlign }: {
  isActive: boolean;
  position: 'bottom' | 'right';
  vpRepos: boolean;
  align: 'left' | 'center' | 'right';
  textAlign: 'left' | 'center' | 'right';
}) => css`
  position: relative;
  ${ChildSlot}{
    display: flex;
    ${isActive && css`
      position: relative;
      :after {
        position: absolute;
        top: ${position === 'right' ? 'calc(50% - 5px)' : vpRepos ? '-17px' : 'calc(100% + 7px)'};
        left: ${position === 'right' ? 'calc(100% + 7px)' : 'calc(50% - 5px)'};
        height: 10px;
        width: 10px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--color-gold-800) var(--color-gold) transparent transparent;
        transform: rotate(${position === 'right' ? '-135deg' : vpRepos ? '135deg' : '-45deg'});
        content: '';
        z-index: 1;
      }
    `}
  }
  ${Selector}{
    --topPos: ${vpRepos ? '-12px' : 'calc(100% + 12px)'};
    --rightPos: auto;
    --leftPos: auto;
    ${position === 'bottom' && css`
      ${align === 'center' && css`
        --leftPos: 50%;
      `}
      ${align === 'right' && css`
        --rightPos: 0;
      `}
    `}
    ${position === 'right' && css`
      --topPos: 0;
      --leftPos: calc(100% + 12px);
      ${vpRepos && css`
        --topPos: 100%;
      `}
    `}
    display: ${isActive ? 'block' : 'none'};
    position: absolute;
    top: var(--topPos);
    right: var(--rightPos);
    left: var(--leftPos);
    padding: 2px;
    width: max-content;
    min-width: 100%;
    background: var(--color-blue-900);
    text-align: ${textAlign};
    transform: translate(${align === 'center' ? '-50%' : '0'}, ${vpRepos ? '-100%' : '0'});
    z-index: 2;
    input {
      padding-right: 10px;
      text-align: inherit;
    }
  }
`);