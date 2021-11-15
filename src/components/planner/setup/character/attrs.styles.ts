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
  ::before,
  ::after {
    content: "";
    width: 100%;
    border-top: 1px dashed var(--color-gold);
  }
  strong {
    margin-right: .15em;
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 2rem;
  }
`;

export const StatsWrapper = styled.div`
  flex: 1;
  display: grid;
  gap: 1.5em;
  grid-template-columns: repeat(4, 1fr);
`;