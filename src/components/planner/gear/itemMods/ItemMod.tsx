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
  const { modsData, partialClassSkillMods, boclMods, booleanMods, rangeMods } = useContext(GearContext);

  const [mainInput, setMainInput] = useState(mod.value?.toString() || mod.minVal?.toString() || '');
  const [helperInput, setHelperInput] = useState(mod.maxVal?.toString() || '');
  const [selectedSubMod, setSelectedSubMod] = useState(mod.subModId?.toString() || '');
  const [isValid, setIsValid] = useState<boolean>(booleanMods.includes(mod.name) ? true : false);

  const wrapperElem = useRef<HTMLDivElement>(null);
  const mainInputElem = useRef<HTMLInputElement>(null);
  const helperInputElem = useRef<HTMLInputElement>(null);

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

  const inputWidthFactor = .55;

  const mainInputProps = {
    type: "number",
    placeholder: "00",
    min: modsData[mod.name].inputMin,
    max: modsData[mod.name].inputMax,
    step: modsData[mod.name].step,
    ref: mainInputElem,
    value: mainInput,
    width: mainInput.length * inputWidthFactor,
    //onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select(),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value.length <= inputLengthFactor && setMainInput(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && mainInputElem.current?.blur(),
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => handleInputOnBlur(e.target.value, rangeMods.includes(mod.name) ? 'minVal' : 'value')
  }

  const helperInputProps = {
    ...mainInputProps,
    ref: helperInputElem,
    value: helperInput,
    width: helperInput.length * inputWidthFactor,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value.length <= inputLengthFactor && setHelperInput(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && helperInputElem.current?.blur(),
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => handleInputOnBlur(e.target.value, 'maxVal')
  }

  function validateInputValue(value: string): number | null {
    let number = parseFloat(value) || 0;

    if (number === 0 || (number / 1) === 0) {
      return null;
    };

    if (number > modsData[mod.name].inputMax) {
      number = modsData[mod.name].inputMax
    };

    if (number > 0 && number < modsData[mod.name].inputMin) {
      number = modsData[mod.name].inputMin
    };

    if (boclMods.includes(mod.name)) {
      let factor = number / 0.025;

      if (Number.isInteger(factor)) {
        return number;
      }

      return Math.floor(((Math.floor(factor) * 0.025) + 0.025) * 1000) / 1000;
    }

    return number;
  }

  function handleInputOnBlur(targetValue: string, prop: keyof IGearMod) {
    let validatedVal: number | null = validateInputValue(targetValue);

    setMods(prev => {
      return prev.map(p => {
        if (p.subModName ? p.subModName === mod.subModName : p.name === mod.name) {
          return { ...p, [prop]: validatedVal }
        }
        return p;
      });
    });

    if(prop === 'maxVal'){
      setHelperInput(validatedVal ? validatedVal.toString() : '');
      !mainInput && mainInputElem.current?.focus();
    } 
    
    else {
      setMainInput(validatedVal ? validatedVal.toString() : '');
      !helperInput && helperInputElem.current?.focus();
    }

  }

  let content: React.ReactNode;

  if (boclMods.includes(mod.name)) {
    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <span className="value">{Math.floor(parseFloat(mainInput) * charLevel) || '00'}</span>
        <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
        <Input {...mainInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[2] }} />
      </label>
    </>;
  }

  else if (partialClassSkillMods.includes(mod.name)) {
    const { all, available, str } = subModOptions[mod.name!] as IGearSubModOptions;

    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <Input {...mainInputProps} />
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

  else if (booleanMods.includes(mod.name)) {
    content = modsData[mod.name].descr;
  }

  else if (rangeMods.includes(mod.name)) {
    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <Input {...mainInputProps} />
      </label>
      <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
      <label>
        <Input {...helperInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[2] }} />
      </label>
    </>;
  }

  else {
    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <Input {...mainInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
      </label>
    </>;
  }

  useEffect(() => {
    !mainInput && mainInputElem.current?.focus();
  }, [mainInput]);

  useEffect(() => {
    if (!booleanMods.includes(mod.name)) {
      let condition = !mainInput;

      if (partialClassSkillMods.includes(mod.name)) {
        condition = !mainInput || !selectedSubMod;
      }

      if (rangeMods.includes(mod.name)) {
        condition = !mainInput || !helperInput;
      }

      setIsValid(condition ? false : true);
    }
  }, [mainInput, helperInput, selectedSubMod, partialClassSkillMods, booleanMods, rangeMods, mod.name]);

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
      <Mod ref={wrapperElem} isValid={isValid}>{content}</Mod>
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