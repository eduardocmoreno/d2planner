import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
  background: rgba(0 0 0 / .3);
`;

export const Icon = styled.div`
  width: 60px;
  img {
    display: block;
  }
`;

export const HeadingStyle = css`
  padding: var(--spacing-sm) 0;
  color: var(--color-gold);
  border-bottom: 1px solid var(--color-gold);
  font-size: 2.2rem;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  ${HeadingStyle};
`;

export const BaseSelector = styled(Title)`
  ${HeadingStyle};
  display: flex;
  align-items: center;
  [class^=icon-]{
    margin-left: auto;
    color: var(--color-blue);
    font-size: 1.6rem;
  }
  :hover {
    color: var(--color-gold-200);
    cursor: pointer;
  }
`;

export const Contents = styled.div`
  --class: item-contents;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

export const CallToAction = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
`;