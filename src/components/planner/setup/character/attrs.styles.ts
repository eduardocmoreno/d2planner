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
  margin-bottom: 1.4em;
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
    border-bottom: 1px solid var(--color-gold-800);
  }
`;

export const StatsWrapper = styled.div`
  flex: 1;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, 1fr);
`;