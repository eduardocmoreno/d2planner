import styled from "styled-components";
import { pseudo } from "../../styles/mixins";

const Splitter = styled.div`
  margin: 2em 0;
  padding: 12px 0;
  ${pseudo('before', 'after')};
  &:before {
    top: 50%;
    left: 50%;
    width: 11px;
    height: 11px;
    border: 2px solid;
    border-color: var(--color-gold) var(--color-gold-900) var(--color-gold-900) var(--color-gold);
    background: linear-gradient(135deg, var(--color-blue) 30%, var(--color-blue-800) 60%);
    transform: translate(-50%, -50%) rotate(45deg);
    z-index: 1;
  }
  &:after {
    top: calc(50% - 2px);
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(var(--color-gold) 50%, var(--color-gold-900) 50%);
  }
`;

export default Splitter;