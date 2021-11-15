import React, { useContext, useEffect, useRef, useState } from "react"
import { PlannerContext } from "pages/Planner";
import { capitalize } from "helpers";
import { Input, Mod, Remove, Wrapper } from "./itemMod.styles";
import { GearContext } from "../Gear";
import FakeSelector from "components/ui/FakeSelector";
import Tooltip from "components/ui/Tooltip";

export default function ItemMod({ mod, setMods, subModOptions }: {
  mod: IGearMod;
  setMods: React.Dispatch<React.SetStateAction<IGearMod[]>>;
  subModOptions: TGearMultiLevelModOpts;
}) {
  const { charClass, charLevel } = useContext(PlannerContext);
  const { modsData, partialClassSkillMods, boclMods, booleanMods } = useContext(GearContext);

  const [input, setInput] = useState(mod.value?.toString() || '');
  const [selectedSubMod, setSelectedSubMod] = useState(mod.subModId?.toString() || '');
  const [isValid, setIsValid] = useState<boolean>(booleanMods.includes(mod.name) ? true : false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSubModOpts = useRef(subModOptions[mod.name]?.all || {});

  const inputMaxLength = modsData[mod.name].inputMax?.toString().length || 0;
  const inputLengthFactor = boclMods.includes(mod.name) ? inputMaxLength + 4 : inputMaxLength;

  const modDescr = modsData[mod.name].descr;
  const sign = modDescr.match(/-|\+/g);
  const unit = modDescr.match(/%/g);

  const splitStr = modDescr
    .replace(/-|\+/g, `<span class="sign">${sign}</span>`)
    .replace(/%/g, `<span class="unit">${unit}</span>`)
    .replace('{class}', capitalize(charClass))
    .split(/\{\w\}|\{tree\}|\{skill\}/gi);

  const primaryInputProps = {
    type: "number",
    placeholder: "00",
    ref: inputRef,
    width: input.length * .55,
    value: input,
    min: modsData[mod.name].inputMin,
    max: modsData[mod.name].inputMax,
    step: modsData[mod.name].step,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value.length <= inputLengthFactor && setInput(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && inputRef.current?.blur(),
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => handleModValueOnBlur(e.target.value)
  }

  let content: React.ReactNode;

  function validateInputValue(number: number) {
    if (boclMods.includes(mod.name)) {
      let factor = number / 0.025;
      if ((number / 1) === 0) {
        return '';
      }
      
      if (Number.isInteger(factor)) {
        return number;
      }
      
      return Math.floor(((Math.floor(factor) * 0.025) + 0.025) * 1000) / 1000;
    }

    if ((number / 1) === 0) {
      return '';
    };

    return number;
  }

  function handleModValueOnBlur(targetValue: string) {
    if (targetValue) {
      let newValue = parseFloat(targetValue);
      if (newValue > modsData[mod.name].inputMax) newValue = modsData[mod.name].inputMax;
      if (newValue > 0 && newValue < modsData[mod.name].inputMin) newValue = modsData[mod.name].inputMin;
      setMods(prev => {
        return prev.map(p => {
          if (p.subModName ? p.subModName === mod.subModName : p.name === mod.name) {
            return {
              ...p,
              value: validateInputValue(newValue) || null
            }
          }
          return p;
        });
      });
      setInput(validateInputValue(newValue).toString());
    }
  }

  if (boclMods.includes(mod.name)) {
    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <span className="value">{Math.floor(parseFloat(input) * charLevel) || '00'}</span>
        <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
        <Input {...primaryInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[2] }} />
      </label>
    </>;
  }

  else if (partialClassSkillMods.includes(mod.name)) {
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
  }

  else if(booleanMods.includes(mod.name)) {
    content = modsData[mod.name].descr;
  }

  else {
    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <Input {...primaryInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
      </label>
    </>;
  }

  useEffect(() => {
    !input && inputRef.current?.focus();
  }, [input]);

  useEffect(() => {
    if(!booleanMods.includes(mod.name)) {
      let condition = partialClassSkillMods.includes(mod.name) ? (!input || !selectedSubMod) : !input;
      setIsValid(condition ? false : true);
    }
  }, [input, selectedSubMod, partialClassSkillMods, booleanMods, mod.name]);

  useEffect(() => {
    if (selectedSubMod && selectedSubMod !== mod.subModId?.toString()) {
      setMods(prev => {
        return prev.map(p => {
          if (p.subModName ? p.subModName === mod.subModName : p.name === mod.name) {
            return {
              ...p,
              subModName: allSubModOpts.current[parseInt(selectedSubMod)],
              subModId: parseInt(selectedSubMod),
            }
          }
          return p;
        });
      });
    }
  }, [setMods, selectedSubMod, mod.name, mod.subModName, mod.subModId]);

  return (
    <Wrapper>
      <Mod ref={wrapperRef} isValid={isValid}>{content}</Mod>
      <Remove
        center
        as={Tooltip}
        data-tooltip="Remove Mod?"
        onClick={() => setMods(prev => prev.filter(p => p.subModName !== mod.subModName || p.name !== mod.name))}>
        <i className="icon-close"></i>
      </Remove>
    </Wrapper>
  );
};