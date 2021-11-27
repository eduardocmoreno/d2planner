import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  flex-direction: column;
  padding: 1em .75em;
`;

export const PointsRemaining = styled.div`
  color: #fff;
  text-align: center;
  strong {
    display: block;
    color: var(--color-gold);
    font-family: var(--font-family-main);
    font-size: 4rem;
    letter-spacing: -.1em;
    text-indent: -.1em;
    line-height: 100%;
  }
  small {
    font-size: 1.2rem;
  }
`;

export const SkillTitle = styled.h3`
  color: var(--color-gold);
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
  margin: 1.25em 0;
  :last-child{
    margin-bottom: 0;
  }
`;

export const PropDetails = styled.li`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  :before {
    flex: 1;
    order: 2;
    margin: 0 .3em .3em;
    border-bottom: 1px dotted rgba(255 255 255 / .07);
    content: '';
  }
`;

export const PropName = styled.div`
  display: flex;
  align-items: center;
  color: #444;
  order: 1;
  letter-spacing: -.03em;
`;

export const PropValue = styled.div(({ warn }: { warn?: boolean }) => css`
  color: #444;
  order: 3;
  ${warn && css`
    color: var(--color-red);
  `}
`);

export const PropBonus = styled.div`
  flex: 100%;
  margin-bottom: .25em;
  color: #666;
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

export const ResetSkills = styled.div`
  display: flex;
  justify-content: center;
  button {
    background: transparent;
    border: 0;
    color: var(--color-gold);
    font-size: 1.2rem;
    text-transform: uppercase;
    :hover {
      color: var(--color-red);
    }
  }
`;

export const Details = styled.div(({ isActive }: { isActive: boolean }) => css`
  flex: 1;
  margin: 1em 0;
  padding: 1em 0;
  border: var(--golden-dotted-line);
  border-width: 1px 0;
  
  ${isActive && css`
    ${PropName}{
      color: var(--color-gold);
    }
    ${PropValue},
    ${PropBonus}{
      color: #eee;
    }
  `}
`);