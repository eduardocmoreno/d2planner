import React, { useEffect, useRef, useState } from "react";
import { Input } from "components/ui/Input";
import { List, ListItem, Selector, Wrapper } from "./FakeSelector.styles";

export default function FakeSelector({ children, position = 'bottom', options, callBack }: {
  children: React.ReactNode;
  position?: 'bottom' | 'right';
  options: {};
  callBack: Function;
}) {

  //refs
  const optionsRefs = useRef<any>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optIdxRef = useRef<number>(0);

  //state
  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [optIdx, setOptIdx] = useState(0);
  const [vpRepos, setVpRepos] = useState<boolean>(false);
  
  //to prevent scrolling "jumping" bug
  const [eventType, setEventType] = useState<'mouseMove' | 'keyDown' | null>(null)
  
  //to prevent the selector window "jumping" bug
  const [show, setShow] = useState<boolean>(false);


  function focusOptionByKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    setEventType('keyDown');

    e.key === 'ArrowDown' && setOptIdx(prev => prev < Object.keys(filteredOptions).length - 1 ? prev + 1 : prev);
    e.key === 'ArrowUp' && setOptIdx(prev => prev > 0 ? prev - 1 : prev);
    e.key === 'Escape' && setIsActive(false);

    if (e.key === 'Enter' && Object.keys(filteredOptions).length > 0) {
      callBack(Object.keys(filteredOptions)[optIdx]);
      setIsActive(false);
    }
  }

  useEffect(() => {
    setInput('');
    setVpRepos(!!(selectorRef.current!.getBoundingClientRect().top + selectorRef.current!.offsetHeight > window.innerHeight));
    setShow(selectorRef.current!.offsetHeight > 0);
  }, [isActive]);

  useEffect(() => {
    const filtered = Object.fromEntries(Object.entries(options).filter(([k, v]) => (k as string).toUpperCase().includes(input.toUpperCase()) || (v as string).toUpperCase().includes(input.toUpperCase())));
    setFilteredOptions(filtered);
    setOptIdx(0);
  }, [options, input]);

  useEffect(() => {
    inputRef.current?.focus();

    if (!optionsRefs.current.length || Object.entries(filteredOptions).length < 1) {
      return;
    }

    let up = optIdx < optIdxRef.current;
    let down = optIdx > optIdxRef.current;

    let list = listRef.current!;
    let listOffTop = list.offsetTop;
    let listOffHeight = list.offsetHeight;

    let item = optionsRefs.current[optIdx];
    let itemOffTop = item.offsetTop;
    let itemOffHeight = item.offsetHeight;

    let ruleUp = itemOffTop < listOffTop + listRef.current!.scrollTop;
    let ruleDown = itemOffTop - listOffTop + itemOffHeight - listRef.current!.scrollTop > listOffHeight;

    if (down && ruleDown && eventType !== 'mouseMove') {
      listRef.current!.scroll({
        top: itemOffTop - listOffTop + itemOffHeight - listOffHeight
      });
    }

    if (up && ruleUp && eventType !== 'mouseMove') {
      listRef.current!.scroll({
        top: itemOffTop - listOffTop
      });
    }

    optIdxRef.current = optIdx;
  });

  useEffect(() => {
    //Please, keep this handle fn in a separated into it`s own useEffect hook
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <Wrapper className="fake-selector" ref={wrapperRef} onMouseMove={() => setEventType('mouseMove')}>
      <div onClick={() => setIsActive(prev => !prev)}>{children}</div>

      <Selector {...{ isActive, position, vpRepos, show }}
        ref={selectorRef}
        onKeyDown={e => focusOptionByKeyDown(e)}>

        <Input
          ref={inputRef}
          placeholder="Search"
          value={input}
          onChange={
            e => setInput(e.target.value)
          } />

        <List ref={listRef}>
          {Object.entries(filteredOptions).map(([k, v], i) => {
            return (
              <ListItem
                ref={el => optionsRefs.current[i] = el}
                isActive={optIdx === i}
                key={k}
                onMouseMove={() => setOptIdx(i)}
                onClick={() => {
                  callBack(k);
                  setIsActive(prev => !prev);
                  setInput('');
                }}>
                {v as string}
              </ListItem>
            );
          })}
        </List>
      </Selector>
    </Wrapper>
  );
}