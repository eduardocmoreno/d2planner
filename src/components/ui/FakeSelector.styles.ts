import styled, { css } from "styled-components";
import GoldenFrame from "./GoldenFrame";

export const Wrapper = styled.div`
  position: relative;
`;

export const Selector = styled(GoldenFrame)(({ isActive, position, vpRepos, show }: {
  isActive: boolean,
  position: 'bottom' | 'right',
  vpRepos: boolean,
  show: boolean
}) => css`
  display: ${isActive ? 'block' : 'none'};
  visibility: ${show ? 'visible' : 'hidden'};
  position: absolute;
  min-width: 100%;
  width: max-content;
  z-index: 1;
  ${position === 'bottom' && !vpRepos && css`
    top: calc(100% + 2px);
    left: 0;
  `}
  ${position === 'right' && css`
    top: 0;
    left: calc(100% + 10px);
  `}
  ${vpRepos && position === 'bottom' && css`
    top: -2px;
    transform: translateY(-100%);
  `}
  ${vpRepos && position === 'right' && css`
    top: 100%;
    transform: translateY(-100%);
  `}
`);

export const List = styled.div`
  max-height: 25vh;
  overflow-y: auto;
  margin-top: var(--spacing-sm);
  
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-gold);
  }

  scrollbar-width: thin;
  scrollbar-color: var(--color-gold) transparent;
}
`;

export const ListItem = styled.div(({ isActive }: { isActive: boolean }) => css`
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