import React, { useContext, useEffect, useRef, useState } from "react"
import { PlannerContext } from "pages/Planner";
import { capitalize, includes, modInputValuesValidator } from "helpers";
import { Input, Mod, Remove, Wrapper } from "./mod.styles";
import { GearContext } from "./Gear";
import FakeSelector from "components/ui/FakeSelector";
import Tooltip from "components/ui/Tooltip";

export default function ItemMod({ currentMod }: {
  currentMod: ItemMod;
}) {
  /* const { charClass, charLevel, charData, dispatchGear } = useContext(PlannerContext);
  const { armorData, weaponsData, modsData, partialClassSkillMods, boclMods, booleanMods, rangeMods, selectedSlot } = useContext(GearContext);

  const isBoclMod = includes(boclMods, currentMod.name);
  const isRangeMod = includes(rangeMods, currentMod.name);
  const isBooleanMod = includes(booleanMods, currentMod.name);
  const isPartialClassSkillMod = includes(partialClassSkillMods, currentMod.name);

  const currentMainValue = currentMod.value?.toString() || currentMod.minVal?.toString() || '';
  const currentHelperValue = currentMod.maxVal?.toString() || '';

  const [mainInput, setMainInput] = useState(currentMainValue);
  const [helperInput, setHelperInput] = useState(currentHelperValue);
  const [isValid, setIsValid] = useState<boolean>(isBooleanMod ? true : false);

  const wrapperElem = useRef<HTMLDivElement>(null);
  const mainInputElem = useRef<HTMLInputElement>(null);
  const helperInputElem = useRef<HTMLInputElement>(null);

  const modDescr = modsData[currentMod.name].descr;
  const sign = modDescr.match(/-|\+/g);
  const unit = modDescr.match(/%/g);
  const splitStr = modDescr
    .replace(/-|\+/g, `<span class="sign">${sign}</span>`)
    .replace(/%/g, `<span class="unit">${unit}</span>`)
    .replace('{class}', capitalize(charClass))
    .split(/\{\w\}|\{tree\}|\{skill\}/gi);

  const inputMaxLength = modsData[currentMod.name].inputMax?.toString().length || 0;
  const inputLengthFactor = isBoclMod ? inputMaxLength + 4 : inputMaxLength;
  const inputWidthFactor = .55;

  const mainInputProps = {
    type: "number",
    placeholder: "00",
    min: modsData[currentMod.name].inputMin,
    max: modsData[currentMod.name].inputMax,
    step: modsData[currentMod.name].step,
    ref: mainInputElem,
    value: mainInput,
    width: mainInput.length * inputWidthFactor,
    //onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => e.target.select(),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => e.target.value.length <= inputLengthFactor && setMainInput(e.target.value),
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && mainInputElem.current?.blur(),
    onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => handleInputOnBlur(e.target.value, isRangeMod ? 'minVal' : 'value')
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

  function getCleanBase() {
    return [...armorData, ...weaponsData].find(b => b.code === selectedSlot.base.code) || {} as ItemBaseData;
  }

  function subOpts() {
    if (isPartialClassSkillMod) {
      const configProps: Record<ItemModPartialClassSkill, {
        dataProp: keyof CharData['skills'];
        str: string;
      }> = {
        treeSkills: {
          dataProp: 'trees',
          str: 'Tree'
        },
        singleSkill: {
          dataProp: 'list',
          str: 'Skill'
        }
      }

      const classSkillMod = configProps[currentMod.name as ItemModPartialClassSkill];

      const allOpts = Object.fromEntries(
        charData.skills[classSkillMod.dataProp].map(({ id, name }) => [id, capitalize(name)])
      );

      const availableOpts = { ...allOpts };
      selectedSlot.mods.filter(m => m.name === currentMod.name).forEach(m => {
        m.subId && delete availableOpts[m.subId];
      });

      return {
        str: classSkillMod.str,
        all: allOpts,
        available: availableOpts
      }
    }

    return {} as ItemSubOptions;
  };

  function handleUpdate(newProps: Partial<ItemMod>) {
    dispatchGear({
      type: 'UPDATE_MOD',
      payload: {
        slot: selectedSlot.slot,
        base: getCleanBase(),
        targetMod: currentMod,
        charLevel,
        newMod: {
          name: currentMod.name,
          ...newProps
        }
      }
    });
  }

  function handleInputOnBlur(inputVal: string, prop: keyof ItemMod) {
    const validVal: number | null = modInputValuesValidator(inputVal, modsData[currentMod.name].inputMin!, modsData[currentMod.name].inputMax!, isBoclMod);

    if (validVal && validVal !== currentMod[prop]) {
      // dispatchGear({
      //   type: 'UPDATE_MOD',
      //   payload: {
      //     slot: selectedSlot.slot,
      //     base: getCleanBase(),
      //     targetMod: currentMod,
      //     charLevel,
      //     newMod: {
      //       name: currentMod.name,
      //       [prop]: validVal
      //     }
      //   }
      // });
      handleUpdate({ [prop]: validVal });
    } else {
      setMainInput(currentMainValue);
      setHelperInput(currentHelperValue);
    }
  };

  function handleSubProps(id: string) {
    const subName = subOpts().all[parseInt(id)];
    const subId = parseInt(id);

    dispatchGear({
      type: 'UPDATE_MOD',
      payload: {
        slot: selectedSlot.slot,
        base: getCleanBase(),
        targetMod: currentMod,
        charLevel,
        newMod: {
          name: currentMod.name,
          subName,
          subId
        }
      }
    });
  };

  useEffect(() => {
    !!currentMainValue && setMainInput(currentMainValue);
    !!currentHelperValue && setHelperInput(currentHelperValue);
    !currentMainValue && mainInputElem.current?.focus();
    !currentHelperValue && currentMainValue && helperInputElem.current?.focus();
  }, [currentMainValue, currentHelperValue]);


  useEffect(() => {
    if (!isBooleanMod) {
      let condition = !mainInput;

      if (isPartialClassSkillMod) {
        condition = !mainInput || !currentMod.subId;
      }

      if (isRangeMod) {
        condition = !mainInput || !helperInput;
      }

      setIsValid(condition ? false : true);
    }
  }, [mainInput, helperInput, isBooleanMod, isPartialClassSkillMod, isRangeMod, currentMod]);

  let content: React.ReactNode;

  if (isBoclMod) {
    content = <>
      <label> {charLevel}
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <span className="value">{Math.floor(parseFloat(mainInput) * charLevel) || '00'}</span>
        <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
        <Input {...mainInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[2] }} />
      </label>
    </>;
  }

  else if (isPartialClassSkillMod) {
    const { available, str } = subOpts();

    content = <>
      <label>
        <span dangerouslySetInnerHTML={{ __html: splitStr[0] }} />
        <Input {...mainInputProps} />
        <span dangerouslySetInnerHTML={{ __html: splitStr[1] }} />
      </label>
      <FakeSelector
        options={available}
        callBack={handleSubProps}
        search={!(currentMod.name === 'treeSkills')}>
        <span className="selector-ph">
          {currentMod.subName || <>Select {str} <i className="icon-arrow-down"></i></>}
        </span>
      </FakeSelector>
      <span dangerouslySetInnerHTML={{ __html: splitStr[2] }} />
    </>;
  }

  else if (isBooleanMod) {
    content = modsData[currentMod.name].descr;
  }

  else if (isRangeMod) {
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

  return (
    <Wrapper>
      <Mod ref={wrapperElem} isValid={isValid}>{content}</Mod>
      <Tooltip
        center
        as={Remove}
        data-tooltip="Remove Mod?"
        onClick={() => dispatchGear({
          type: 'DELETE_MOD',
          payload: {
            slot: selectedSlot.slot,
            base: getCleanBase(),
            targetMod: currentMod,
            charLevel
          }
        })}
      >
        <i className="icon-close"></i>
      </Tooltip>
    </Wrapper>
  ); */
  return (<>asdasd</>)
};