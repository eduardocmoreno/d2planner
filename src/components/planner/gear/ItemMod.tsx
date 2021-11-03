import React, { useContext, useEffect, useRef, useState } from "react"
import { PlannerContext } from "pages/Planner";
import { capitalize, includes } from "helpers";
import { Input, Mod, Remove, Wrapper } from "./ItemMod.styles";
import { GearContext } from "./Gear";
import FakeSelector from "components/ui/FakeSelector";
import Tooltip from "components/ui/Tooltip";

export default function ItemMod({ mod, setItemModsArray, subModOptions }: {
  mod: IGearMod;
  setItemModsArray: React.Dispatch<React.SetStateAction<IGearMod[]>>;
  subModOptions: TGearMultiLevelModsOpts;
}) {
  const { charData, charClass } = useContext(PlannerContext);
  const { mods } = useContext(GearContext);

  const [input, setInput] = useState(mod.value?.toString() || '');
  const [selectedSubMod, setSelectedSubMod] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const inputValRef = useRef(input);
  const selectedSubModRef = useRef(selectedSubMod);
  const inputRef = useRef<HTMLInputElement>(null);

  const multiLvlMods = useRef<TGearMultiLevelMods[]>(['treeSkills', 'singleSkill']);

  const modDescr = mods[mod.name]!;
  const sign = modDescr.match(/-|\+/g);
  const unit = modDescr.match(/%/g);

  const splitStr = modDescr
    .replace(/-|\+/g, `<span class="sign">${sign}</span>`)
    .replace(/%/g, `<span class="unit">${unit}</span>`)
    .replace('{class}', capitalize(charClass))
    .split(/\{\w\}|\{tree\}|\{skill\}/g);

  const primaryInputProps = {
    type: "number",
    placeholder: "00",
    maxLength: 4,
    ref: inputRef,
    width: input.length * .6,
    value: input,
    required: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && inputRef.current?.blur()
  }

  let content: React.ReactNode;

  switch (mod.name) {
    case 'treeSkills':
    case 'singleSkill': {
      const { all, available, str } = subModOptions[mod.name!] as IGearSubModOptions;

      content = <>
        <label>
          <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
          <Input {...primaryInputProps} />
          <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
        </label>
        <FakeSelector
          options={available}
          callBack={setSelectedSubMod}
          search={!(mod.name === 'treeSkills')}>
          <span className="selector-ph">
            {capitalize(all[mod.subModId || parseInt(selectedSubMod)] || '') || <>Select {str} <i className="icon-arrow-down"></i></>}
          </span>
        </FakeSelector>
        <span dangerouslySetInnerHTML={{ __html: splitStr[2] }} />
      </>;
      
      break;
    }

    case 'fireDmg':
    case 'coldDmg':
    case 'ltngDmg': {
      content = <div>ELEMENTAL DMG</div>;
      break;
    }

    default: {
      content = <>
        <label>
          <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
          <Input
            {...primaryInputProps}
            onBlur={
              e => {
                setItemModsArray(prev => {
                  return prev.map(p => {
                    if (p.name === mod.name) {
                      return {
                        ...p,
                        value: parseInt(e.target.value) || null
                      }
                    }
                    return p;
                  });
                });

                setIsValid((!e.target.value || e.target.value === '0') ? false : true);
              }
            } />
          <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
        </label>
      </>;

      break;
    }
  }

  useEffect(() => {
    !mod.value && inputRef.current?.focus();
  }, [mod.value]);

  useEffect(() => {
    if (!includes(multiLvlMods.current, mod.name)) {
      return;
    }

    if (inputValRef.current !== input || selectedSubModRef.current !== selectedSubMod) {
      setItemModsArray(prev => {
        return prev.map(p => {
          if (p.subModName ? p.subModName === mod.subModName : p.name === mod.name) {
            return {
              ...p,
              subModName: subModOptions[mod.name as TGearMultiLevelMods].all[parseInt(selectedSubMod)] || mod.subModName || null,
              subModId: parseInt(selectedSubMod) || mod.subModId || null,
              value: parseInt(input) || null
            }
          }
          return p;
        });
      });
      inputValRef.current !== input && (inputValRef.current = input);
      selectedSubModRef.current !== selectedSubMod && (selectedSubModRef.current = selectedSubMod);
      setIsValid((!input || !mod.subModId) ? false : true);
    }
  }, [mod, subModOptions, setItemModsArray, input, selectedSubMod, charData]);

  return (
    <Wrapper>
      <Mod isValid={isValid}>{content}</Mod>
      {<Remove
        center
        as={Tooltip}
        data-tooltip="Remove Mod?"
        onClick={() => setItemModsArray(prev => prev.filter(p => p.subModName !== mod.subModName || p.name !== mod.name))}>
        <i className="icon-close"></i>
      </Remove>}
    </Wrapper>
  );
};