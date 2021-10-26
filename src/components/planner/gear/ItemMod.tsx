import React, { useContext, useEffect, useRef, useState } from "react"
import { useArrayIncludes } from "hooks/useArrayIncludes";
import { PlannerContext } from "pages/Planner";
import { capitalize } from "helpers";
import { Input, Mod, Remove, Wrapper } from "./ItemMod.styles";
import { GearContext } from "./Gear";
import FakeSelector from "components/ui/FakeSelector";
import Tooltip from "components/ui/Tooltip";

export default function ItemMod({ mod, setItemMods }: {
  mod: keyof IGearMods;
  setItemMods: React.Dispatch<React.SetStateAction<IGearMods>>
}) {
  const { charData, charClass } = useContext(PlannerContext);
  const { mods } = useContext(GearContext);

  const multiPropsMod = useArrayIncludes(['treeSkills', 'singleSkill'] as const, mod);

  const [input, setInput] = useState('');
  const [selectedSubMod, setSelectedSubMod] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const modDescr = useRef(mods[mod]!);

  const sign = modDescr.current.match(/-|\+/g);
  const unit = modDescr.current.match(/%/g);

  const splitStr = useRef(
    modDescr.current
      .replace(/-|\+/g, `<span class="sign">${sign}</span>`)
      .replace(/%/g, `<span class="unit">${unit}</span>`)
      .replace('{class}', capitalize(charClass))
      .split(/\{\w\}|\{tree\}|\{skill\}/g)
  );

  const primaryInputProps = {
    type: "text",
    placeholder: "00",
    maxLength: 4,
    ref: inputRef,
    width: input.length * .6,
    value: input,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && inputRef.current?.blur()
  }

  let content: React.ReactNode;

  switch (mod) {
    case 'treeSkills':
    case 'singleSkill': {
      const modProps = {
        treeSkills: {
          options: Object.fromEntries(
            charData.skills.trees.map(({ id, name }) => [id, capitalize(name)])
          ),
          str: 'Tree'
        },
        singleSkill: {
          options: Object.fromEntries(
            charData.skills.list.map(({ id, name }) => [id, capitalize(name)])
          ),
          str: 'Skill'
        }
      }

      const options = modProps[mod].options;

      content = <>
        <span dangerouslySetInnerHTML={{ __html: splitStr.current[0] }} />
        <Input
          {...primaryInputProps}
          onBlur={e => setItemMods(prev => {
            return {
              ...prev,
              [mod]: {
                ...prev[mod],
                level: parseInt(e.target.value),
              }
            }
          })} />
        <span dangerouslySetInnerHTML={{ __html: splitStr.current[1] }} />
        <FakeSelector options={options} callBack={setSelectedSubMod}>
          <span className="selector-ph">
            {options[selectedSubMod] || <>Select {modProps[mod].str} <i className="icon-arrow-down"></i></>}
          </span>
        </FakeSelector>
        <span dangerouslySetInnerHTML={{ __html: splitStr.current[2] }} />
      </>;
      break;
    }

    default: {
      content = <>
        <span dangerouslySetInnerHTML={{ __html: splitStr.current[0] }} />
        <Input
          {...primaryInputProps}
          onBlur={e => setItemMods(prev => {
            return {
              ...prev,
              [mod]: parseInt(e.target.value)
            }
          })} />
        <span dangerouslySetInnerHTML={{ __html: splitStr.current[1] }} />
      </>;
      break;
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    multiPropsMod && setItemMods(prev => {
      return {
        ...prev,
        [mod]: {
          ...prev[mod],
          id: parseInt(selectedSubMod) || 0
        }
      }
    });
  }, [mod, setItemMods, selectedSubMod, multiPropsMod]);

  return (
    <Wrapper>
      <Mod>
        {content}
      </Mod>
      <Remove
        center
        as={Tooltip}
        data-tooltip="Remove Mod?"
        onClick={() => setItemMods(prev => {
          const { [mod]: modValue, ...mods } = prev;
          return mods as IGearMods;
        })}>
        <i className="icon-close"></i>
      </Remove>
    </Wrapper>
  );
};