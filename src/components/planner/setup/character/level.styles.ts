import styled from "styled-components";
import Button from "components/ui/Button";
import GoldenFrame, { FrameContent } from "components/ui/GoldenFrame";
import { Input } from "components/ui/Input";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${GoldenFrame}{
    flex-direction: column;
  };
  ${FrameContent} {
    form {
      flex: 1;
      display: flex;
    }
  }
  ${Button} {
    margin-top: var(--spacing-md);
  }
`;

export const LevelInput = styled(Input)`
  padding: 0;
  font-size: 4rem;
  text-align: center;
`;

export const Result = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gold);
  font-family: var(--font-family-main);
  font-weight: bold;
  font-size: 5rem;
  letter-spacing: -.15em;
  text-indent: -.15em;
`;