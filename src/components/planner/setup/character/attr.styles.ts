import styled from "styled-components";
import Button from "components/ui/Button";
import GoldenFrame, { FrameLabel } from "components/ui/GoldenFrame";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${GoldenFrame}{
    flex-direction: column;
    border-bottom: 0;
  };
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  ${Button}{
    flex: 1;
    padding-right: 0;
    padding-left: 0;
    :not(:first-child){
      flex: .5;
      border-left: 0;
    }
  }
`;

export const Label = styled(FrameLabel)`
  font-size: 1.2rem;
`;

export const Results = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-family: var(--font-family-main);
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 1;
  span {
    color: var(--color-gold);
    font-size: 2.8rem;
  }
`;