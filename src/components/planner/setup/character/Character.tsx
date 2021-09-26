import styled from "styled-components"
import Level from "./Level";
import Attrs from "./Attrs";

const MainWrapper = styled.div`
  display: flex;
  //height: 10.5em;
`;

const SubWrapper = styled.div`
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

export default function Character() {
  return (
    <MainWrapper>
      <SubWrapper>
        <Level />
      </SubWrapper>

      <SubWrapper>
        <Attrs />
      </SubWrapper>
    </MainWrapper>
  )
}
