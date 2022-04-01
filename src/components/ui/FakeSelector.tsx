import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "components/ui/Input";
import { ChildSlot, List, ListItem, Selector, Wrapper } from "./FakeSelector.styles";
import GoldenFrame from "./GoldenFrame";

export default function FakeSelector({ children, position = 'bottom', align = 'left', textAlign = 'left', search = true, options, callBack }: {
  children: React.ReactNode;
  position?: 'bottom' | 'right';
  align?: 'left' | 'center' | 'right';
  textAlign?: 'left' | 'center' | 'right';
  search?: boolean;
  options: {};
  callBack: Function;
}) {
  //refs
  const listHTMLElements = useRef<any[]>([]);
  const optIdxRef = useRef<number>(0);
  const wrapperElem = useRef<HTMLDivElement>(null);
  const selectorElem = useRef<HTMLDivElement>(null);
  const searchInputElem = useRef<HTMLInputElement>(null);
  const listElem = useRef<HTMLDivElement>(null);

  //state
  const [searchInput, setSearchInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [optIdx, setOptIdx] = useState(0);
  const [vpRepos, setVpRepos] = useState<boolean>(false);

  //to prevent scrolling "jumping" bug
  const [eventType, setEventType] = useState<'mouseMove' | 'keyDown' | null>(null);

  //focus list items by key press (up, down), and control visibility by escape key press
  function focusOptionByKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    setEventType('keyDown');

    e.key === 'ArrowDown' && setOptIdx(prev => prev < Object.keys(filteredOptions).length - 1 ? prev + 1 : prev);
    e.key === 'ArrowUp' && setOptIdx(prev => prev > 0 ? prev - 1 : prev);
    e.key === 'Escape' && setIsActive(false);

    if (e.key === 'Enter' && !!Object.keys(filteredOptions).length) {
      callBack(Object.keys(filteredOptions)[optIdx]);
      setIsActive(false);
    }
  }

  //filtering list opts
  useEffect(() => {
    if (searchInput) {
      const filtered = Object.fromEntries(Object.entries(options).filter(([k, v]) => (k as string).toUpperCase().includes(searchInput.toUpperCase()) || (v as string).toUpperCase().includes(searchInput.toUpperCase())));
      setFilteredOptions(filtered);
      setOptIdx(0);
    } else {
      setFilteredOptions(options);
    }
  }, [options, searchInput]);

  //watch activeness to control the selector positioning relative to the view port (vp)
  useLayoutEffect(() => {
    const vpReposRule: boolean = isActive && !!(selectorElem.current!.getBoundingClientRect().top + selectorElem.current!.offsetHeight > window.innerHeight);
    setVpRepos(vpReposRule);

    //reset any past search input value
    setSearchInput('');
    setOptIdx(0);
  }, [isActive]);

  useLayoutEffect(() => {
    //if no options, no filter opts nor is active, then return false
    if (!isActive || !listHTMLElements.current.length || Object.entries(filteredOptions).length < 1) {
      return;
    }

    searchInputElem.current?.focus();

    //capture the navigation event (going up? or down?)
    //when selecting options by using key press
    let up = optIdx < optIdxRef.current;
    let down = optIdx > optIdxRef.current;

    //capture the html list elem layout position
    let list = listElem.current!;
    let listOffTop = list.offsetTop;
    let listOffHeight = list.offsetHeight;

    //capture the html list option elem layout position
    let item = listHTMLElements.current[optIdx];
    let itemOffTop = item.offsetTop;
    let itemOffHeight = item.offsetHeight;

    //rules to go up or down
    let ruleUp = itemOffTop < listOffTop + listElem.current!.scrollTop;
    let ruleDown = itemOffTop - listOffTop + itemOffHeight - listElem.current!.scrollTop > listOffHeight;

    //rules to control the html list elem inner scrolling (excluding the mouse event)
    if (down && ruleDown && eventType !== 'mouseMove') {
      listElem.current!.scroll({
        top: itemOffTop - listOffTop + itemOffHeight - listOffHeight
      });
    }

    if (up && ruleUp && eventType !== 'mouseMove') {
      listElem.current!.scroll({
        top: itemOffTop - listOffTop
      });
    }

    //store the last index selected to help controlling
    //the navigation by usgin key up or down
    optIdxRef.current = optIdx;
  });

  useLayoutEffect(() => {
    //Please, keep this handle fn in a separated into it`s own useEffect hook
    function handleClickOutside(event: any) {
      if (wrapperElem.current && !wrapperElem.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <Wrapper
      ref={wrapperElem}
      onMouseMove={() => setEventType('mouseMove')}
      {...{ isActive, position, vpRepos, align, textAlign }}>

      <ChildSlot onClick={() => setIsActive(prev => !prev)}>{children}</ChildSlot>

      {isActive &&
        <Selector as={GoldenFrame} ref={selectorElem} onKeyDown={focusOptionByKeyDown}>

          {search &&
            <Input
              ref={searchInputElem}
              placeholder="Search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)} />
          }

          {filteredOptions &&
            <List ref={listElem} isEmpty={Object.entries(filteredOptions).length === 0}>
              {Object.entries(filteredOptions).map(([k, v], i) => {
                return (
                  <ListItem
                    isActive={optIdx === i}
                    ref={el => listHTMLElements.current[i] = el}
                    key={k}
                    onMouseMove={() => setOptIdx(i)}
                    onClick={() => {
                      callBack(k);
                      setIsActive(prev => !prev);
                      setSearchInput('');
                    }}>
                    {v as string}
                  </ListItem>
                );
              })}
            </List>
          }
        </Selector>
      }
    </Wrapper>
  );
}