import styled from "styled-components";
import { pseudo } from "styles/mixins";

export const PageTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5em 0;
  text-align: center;
  text-shadow: 0 3px 7px #000;
  white-space: nowrap;
  &:first-child {
    margin-top: 0.5em;
  }
  ${pseudo('before', 'after')}
  &::before,
  &::after {
    top: 50%;
    position: relative;
    width: 100%;
    height: 4px;
    background: linear-gradient(var(--color-gold) 50%, var(--color-gold-900) 50%);
  }
  &::before {
    margin-right: 1em;
  }
  &::after {
    margin-left: 1em;
  }
`;

export const SectionTitle = styled.h3`
  margin: 1em 0;
  color: var(--color-gold);
  text-align: center;
  font-size: 2.2rem;
  & + p {
    margin-top: -1.2em;
  }
`;

export const SectionDescription = styled.p`
  text-align: center;
  font-size: 1.4rem;
`;