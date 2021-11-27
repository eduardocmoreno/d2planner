import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  padding: 1em 0 !important;
  height: 8em;
  & > div {
    flex: 1;
    :not(:first-child){
      border-left: var(--golden-dotted-line);
    }
  }
`;

export const Results = styled.div(({ isActive }: { isActive: boolean }) => css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-family: var(--font-family-main);
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 100%;
  ${isActive && css`
    color: var(--color-gold);
    font-size: 3.5rem;
    text-indent: -.05em;
    letter-spacing: -.05em;
  `}
`);

export const PointsRemaining = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
  margin-top: 1em;
  font-size: 1.4rem;
  line-height: 1;
  white-space: nowrap;
  strong {
    margin-right: .15em;
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 2rem;
  }
  hr {
    width: 100%;
    border: 0;
    border-bottom: var(--golden-dotted-line);
  }
`;