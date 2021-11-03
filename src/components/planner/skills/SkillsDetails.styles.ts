import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  height: calc(2.7em - var(--spacing-sm));
  box-shadow: inset 0 0 2em rgba(0 0 0 / .5);
  background: var(--color-green-800);
  color: #fff;
  strong {
    font-family: var(--font-family-main);
    font-size: 2rem;
  }
  small {
    font-size: 1.2rem;
  }
`;

export const Details = styled.div`
  flex: 1;
  padding: 1em .75em;
  background: rgba(0 0 0 / .6);
  border-width: 2px 0;
  border-style: solid;
  border-color: var(--color-green-600);
`;

export const SkillTitle = styled.h3`
  font-size: 1.6rem;
  text-align: center;
  text-transform: uppercase;
  & + p {
    margin-top: .5em;
  }
`;

export const SkillDescription = styled.p`
  color: #666;
  font-style: italic;
  font-size: 1.2rem;
  text-align: center;
  span {
    text-transform: capitalize;
  }
`;

export const SkillProps = styled.ul`
  display: flex;
  gap: var(--spacing-md);
  flex-direction: column;
  margin: 1.5em 0;
`;

export const PropDetails = styled.li`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  ::before {
    flex: 1;
    order: 2;
    margin: 0 .3em .3em;
    border-bottom: 1px dashed #333;
    content: '';
  }
`;

export const PropName = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gold);
  order: 1;
  letter-spacing: -.03em;
`;

export const PropValue = styled.div(({ isActive, warn }: { isActive: boolean, warn?: boolean }) => css`
  --prop-color: #444;
  ${isActive && css`
    --prop-color: var(--color-green);
  `}
  ${warn && css`
    --prop-color: var(--color-red);
  `}
  color: var(--prop-color);
  order: 3;
`);

export const PropBonus = styled.div`
  flex: 100%;
  margin-bottom: .25em;
  font-family: var(--font-family-main);
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: -.1em;
`;

export const InfoIcon = styled.i`
  display: block;
  margin-left: .25em;
  color: var(--color-blue-700);
`;