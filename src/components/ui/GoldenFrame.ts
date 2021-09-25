import styled from "styled-components";

const GoldenFrame = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.25em;
  border: 2px solid;
  border-color: var(--golden-border);
  box-shadow: inset 0 0 1.5em rgba(0 0 0 / .5);
  background: var(--color-blue-900);
`;

export const FrameLabel = styled.div`
  --letter-spacing: -.1em;
  padding: 0.3em 0;
  color: var(--color-gold);
  font-family: var(--font-family-main);
  text-align: center;
  text-transform: uppercase;
  text-indent: var(--letter-spacing);
  letter-spacing: var(--letter-spacing);
`;

export const FrameContent = styled.div`
  flex: 1;
  display: flex;
`;

export default GoldenFrame;