import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  button {
    border: 0;
    background: transparent;
    color: var(--color-gold);
    :hover {
      color: var(--color-red);
    }
  }
  :not(:hover){
    button {
      display: none;
    }
  }
`;

export const LevelInput = styled.input`
  //display: flex;
  //flex: 1;
  //padding: 0;
  width: 2em;
  height: 2em;
  border: 1px solid var(--color-gold-900);
  background: rgba(0 0 0 / .3);
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  //font-family: var(--font-family-main);
  //line-height: 100%;
  :focus-within {
    box-shadow: 0 0 10px rgba(var(--color-blue-rgb), .3);
  }
`;