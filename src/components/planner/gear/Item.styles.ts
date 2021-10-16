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
  padding-bottom: var(--spacing-sm);
  color: var(--color-gold);
  border-bottom: 1px solid var(--color-gold);
  font-size: 2.2rem;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  ${HeadingStyle};
`;

export const BaseSelector = styled(Title).attrs<React.SelectHTMLAttributes<HTMLSelectElement>>({ as: 'select' })`
  ${HeadingStyle};
  border-width: 0 0 1px 0;
  background-color: transparent;
  font-family: var(--font-family-main);
  font-weight: bold;
  option {
    color: #333;
    font-family: arial, sans-serif;
    font-weight: normal;
    font-size: 1.6rem;
    :not(:first-child) {
      text-transform: none;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;