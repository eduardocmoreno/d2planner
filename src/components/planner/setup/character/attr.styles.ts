import styled from "styled-components";
import { FrameLabel } from "components/ui/GoldenFrame";

export const ButtonsWrapper = styled.div`
  display: flex;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: .5em 0;
    margin: -.5em 0;
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

export const Label = styled(FrameLabel)`
  padding: 0;
  font-size: 1.3rem;
`;

export const Results = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-family: var(--font-family-main);
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 100%;
  span {
    color: var(--color-gold);
    font-size: 3.5rem;
    text-indent: -.05em;
    letter-spacing: -.05em;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  :before {
    top: -.5em;
  }
  :after {
    top: calc(-.5em + 2px);
  }
  :not(:hover){
    ${ButtonsWrapper}{
      display: none;
    }
  }
  :not(:first-child){
    border-left: var(--golden-dotted-line);
  }
`;