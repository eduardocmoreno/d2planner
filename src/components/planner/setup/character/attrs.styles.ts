import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

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

export const StatsWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: .5em 0;
`;