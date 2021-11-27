import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: .2em 0;
    border: 0;
    background: transparent;
    color: var(--color-gold);
    font-weigth: normal;
    line-height: 100%;
    :hover {
      color: var(--color-gold-200);
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  :not(:hover){
    ${ButtonsWrapper}{
      display: none;
    }
  }
`;