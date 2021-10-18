import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import GoldenFrame from "./GoldenFrame";

export default function DropdownMenu({ options, callBack }: {
  options: {};
  callBack: Function;
}) {

  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setFilteredOptions(
      Object.fromEntries(
        Object.entries(options)
          .filter(([k, v]) => (k as string).toUpperCase().includes(input.toUpperCase()) || (v as string).toUpperCase().includes(input.toUpperCase())
          )));
  }, [options, input, setFilteredOptions]);

  return (
    <Wrapper>
      <SelectorBox as={GoldenFrame} {...{ isActive }}>
        <Header>
          <Placeholder>Select...</Placeholder> <ToggleButton onClick={() => setIsActive(prev => !prev)}>@</ToggleButton>
        </Header>
        <Selector {...{ isActive }}>
          <Input placeholder="Search" onChange={e => setInput(e.target.value)} />
          <List>
            {Object.entries(filteredOptions).map(([k, v]) => {
              return <ListItem key={k} onClick={() => callBack(k)}>{v as string}</ListItem>;
            })}
          </List>
        </Selector>
      </SelectorBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  height: 2.5em;
`;

const Header = styled.div`
  display: flex;
  height: calc(2em - 4px);
  background: red;
`;

const ToggleButton = styled.div`
  cursor: pointer;
`;

const Placeholder = styled.div`
  flex: 1;
`;

const SelectorBox = styled.div(({ isActive }: { isActive: boolean }) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: ${isActive ? 'auto' : '100%'};
  width: 100%;
`);

const Selector = styled.div(({ isActive }: { isActive: boolean }) => css`
  display: ${isActive ? 'block' : 'none'};
  margin-top: var(--spacing-sm);
`);

const Input = styled.input`
  width: 100%;
  padding: .5em;
`;

const List = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: var(--spacing-sm);
`;

const ListItem = styled.div`
  padding: var(--spacing-sm);
  color: #999;
  font-size: 1.4rem;
  :hover {
    color: #fff;
    cursor: pointer;
  }
`;