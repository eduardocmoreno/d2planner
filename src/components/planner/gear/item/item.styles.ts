import styled, { css } from "styled-components";

export const Icon = styled.div`
  width: 60px;
  align-self: flex-start;
  img {
    display: block;
  }
`;

export const HeadingStyle = css`
  color: var(--color-gold);
  font-size: 2.2rem;
  text-transform: uppercase;
  line-height: 100%;
`;

export const CallToAction = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
`;

export const Title = styled.h2`
  ${HeadingStyle};
  & + ${CallToAction}{
    margin-top: var(--spacing-md);
  }
`;

export const BaseSelector = styled(Title)`
  ${HeadingStyle};
  display: flex;
  align-items: center;
  [class^=icon-]{
    margin-left: var(--spacing-sm);
    color: var(--color-blue);
    font-size: 1.6rem;
  }
  :hover {
    color: var(--color-gold-200);
    cursor: pointer;
  }
`;

export const Contents = styled.div``;

export const Wrapper = styled.div(({ haveProps }: { haveProps: boolean}) => css`
  display: flex;
  gap: 1.5em;
  align-items: center;
  padding: 1.25em;
  background: rgba(0 0 0 / .3);
  border: 1px dotted var(--color-gold-900);
  ${haveProps && css`
    border: 2px solid;
    border-color: var(--golden-border);
    background: rgba(0 0 0 / .4);
    order: -1;
  `}
`);

// export const Wrapper = styled.div(({ isEquiped }: { isEquiped: boolean }) => css`
//   display: flex;
//   gap: 1em;
//   flex: calc(50% - calc(var(--spacing-md)/2));
//   padding: var(--spacing-lg);
//   background: rgba(0 0 0 / .2);
//   box-shadow: inset 0 0 30px rgba(0 0 0 / .75);
//   ${isEquiped && css`
//     padding: 1.5em calc(var(--spacing-lg) - 2px);
//     border: 2px solid var(--color-gold-900);
//     ${pseudo('before')};
//     :before {
//       top: 2px;
//       left: 2px;
//       height: 0;
//       border: 5px solid var(--color-blue);
//       border-right-color: transparent;
//       border-bottom-color: transparent;
//     }
//   `}
//   ${!isEquiped && css`
//     background: rgba(0 0 0 / .2);
//     box-shadow: none;
//   `}
// `);