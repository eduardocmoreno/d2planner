import styled from 'styled-components';
import { pseudo } from 'styles/mixins';
import boxBgImg from 'assets/images/deamon-box-bg.png';

const Main = styled.main`
  padding: 2.5em;
  margin: 0 auto;
  max-width: 43em;
  box-shadow: 0 0 150px rgba(var(--color-red-rgb), .5);
  ${pseudo('before', 'after')}
  &::before {
    background: url(${boxBgImg}) top center;
    inset: 0;
    filter: saturate(50%);
    z-index: -2;
  }
  &::after {
    border: 4px solid;
    border-color: var(--color-red) var(--color-red-700) var(--color-red-900);
    box-shadow: 0 0 30px #000, inset 0 0 60px #000;
    background-size: contain;
    inset: 1.5rem;
    z-index: -1;
  }
`;

export default Main;