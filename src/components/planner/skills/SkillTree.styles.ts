import styled, { css } from "styled-components";

export const Wrapper = styled.div(({ isActive, charClass, name, img }: {
  isActive: boolean,
  charClass?: string,
  name?: string,
  img: string
}) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 25px 0;
  width: 340px;
  background: url(${img}) top left no-repeat;
  ${!isActive && css`
    display: none;
  `}
`);

export const TreeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CellFigure = styled.figure(({ isIterable, isActive, isGranted }: {
  isIterable: boolean,
  isActive: boolean,
  isGranted: boolean
}) => css`
  padding: 3px;
  box-shadow: inset 0 0 5px rgba(0 0 0 / 0.75);
  img {
    width: 64px;
    height: 64px;
    filter: saturate(120%);
  }
  ${!isIterable && !isActive && !isGranted && css`
    img {
      filter: brightness(30%) saturate(0%);
      opacity: .5;
    }
  `}
  ${isIterable && css`
    cursor: pointer;
    :active {
      img {
        transform: translate(1px, 1px) scale(.98);
      }
    }
    :hover {
      filter: brightness(130%) saturate(100%);
    }
  `}
  ${isIterable && !isActive && !isGranted && css`
    :not(:hover) {
      img {
        filter: brightness(85%) saturate(50%);
      }
    }
  `}
  ${isGranted && css`
    position: relative;
    :after {
      position: absolute;
      inset: 3px;
      background: rgba(var(--color-blue-rgb), .2);
      box-shadow: inset 0 0 15px rgba(var(--color-blue-rgb), 1);
      mix-blend-mode: color;
      content: '';
    }
    img {
      filter: saturate(0%);
    }
  `}
`);

export const CellCount = styled.div`
  position: absolute;
  right: 100%;
  top: 0;
`;

export const Count = styled.div(({ hasBonus }: {
  hasBonus: boolean
}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  width: 25px;
  background: rgba(0 0 0 / 0.3);
  color: #666;
  box-shadow: inset 0 0 5px rgba(0 0 0 / 0.5);
  font-size: 1.4rem;
  font-family: var(--font-family-main);
  text-align: center;
  letter-spacing: -.15rem;
  line-height: 1;
  ${hasBonus && css`
    color: var(--color-blue);
    font-size: 1.7rem;
    font-weight: bold;
  `}
`);

export const CellContent = styled.div`
  position: relative;
`;