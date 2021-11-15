import Level from "./Level";
import Attrs from "./Attrs";
import { MainWrapper, SubWrapper } from "./character.styles";

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
