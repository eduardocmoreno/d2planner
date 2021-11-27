import styled from "styled-components";

const GoldenFrame = styled.div`
  flex: 1;
  display: flex;
  border: 2px solid;
  border-color: var(--golden-border);
  box-shadow: inset 0 0 1.5em rgba(0 0 0 / .5);
  background: rgba(var(--color-blue-900-rgb), .5);
`;

export const FrameLabel = styled.div`
  --letter-spacing: -.1em;
  color: var(--color-gold);
  font-family: var(--font-family-main);
  font-size: 1.4rem;
  text-align: center;
  text-transform: uppercase;
  text-indent: var(--letter-spacing);
  letter-spacing: var(--letter-spacing);
`;

export default GoldenFrame;