import styled from "styled-components";

export const Input = styled.input`
  --inner-glow: inset 0 0 15px rgba(0 0 0 / .5);
  flex: 1;
  width: 100%;
  padding: .25em;
  box-shadow: var(--inner-glow);
  background: rgba(0 0 0 / .3);
  color: #fff;
  font-size: 1.6rem;
  :focus{
    box-shadow: var(--inner-glow), 0 0 15px rgba(var(--color-blue-rgb), .5);
  }
`;