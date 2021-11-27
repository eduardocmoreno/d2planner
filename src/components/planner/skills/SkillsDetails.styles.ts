import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  flex-direction: column;
  padding: .75em;
`;

export const PointsRemaining = styled.div`
  margin: 1em 0 1.5em;
  padding-bottom: 1.5em;
  border-bottom: var(--golden-dotted-line);
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
  margin: 1.5em 0;
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

export const Details = styled.div(({ isActive }: { isActive: boolean }) => css`
  flex: 1;
  //padding: 1em .75em;
  //background: rgba(0 0 0 / .6);
  //border-width: 2px 0 0;
  //border-style: solid;
  //border-color: var(--color-gold-900);
  
  ${isActive && css`
    ${PropName}{
      color: var(--color-gold);
    }
    ${PropValue}{
      color: #eee;
    }
  `}
`);