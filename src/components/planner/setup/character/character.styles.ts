import styled from "styled-components";

export const MainWrapper = styled.div`
  display: flex;
  height: 10.5em;
`;

export const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  :nth-child(1){
    flex: 1;
  }
  :nth-child(2){
    flex: 4;
    margin-left: 2em;
  }
`;