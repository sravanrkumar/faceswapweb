import React, { FC } from "react";
import { Label } from "./label";
import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

interface SelectmultipleProps {
  id: string;
  tagsOption: string[];
  selectLabel: string;
  defaultValue: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  errorMessage?: string;
}
interface Option {
  value: string;
  label: string;
}

const Selectmultiple: FC<SelectmultipleProps> = ({
  id,
  defaultValue,
  tagsOption,
  selectLabel,
  errorMessage,
  register,
  setValue,
}) => {
  const [selected, setSelected] = useState<Option[]>([]);
  function valuesExistInArray(arr1: string[], arr2: string[]): boolean {
    // Check if every element in arr1 exists in arr2
    const allValuesExist = arr1.every((value) => arr2.includes(value));

    return allValuesExist;
  }
  useEffect(() => {
    if (valuesExistInArray(defaultValue, tagsOption)) {
      setSelected(
        defaultValue?.map((defaulttagoptions) => ({
          value: defaulttagoptions,
          label: defaulttagoptions,
        })),
      );
    } else {
      setSelected([]);
      setValue(id, null);
    }
  }, [tagsOption]);
  const options: Option[] = tagsOption?.map((tag) => ({
    value: tag,
    label: tag,
  }));

  return (
    <>
      <Label htmlFor={id} className="font-bold text-xs">
        {selectLabel}
      </Label>

      <MultiSelect
        options={options}
        value={selected}
        {...register(id, { required: "This field is required." })}
        onChange={(selectedValues: Option[]) => {
          setSelected(selectedValues);
          setValue(id, selectedValues);
        }}
        labelledBy={id}
        isCreatable={true}
      />
      {errorMessage && selected.length < 1 && (
        <p className="font-medium text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </>
  );
};

export default Selectmultiple;
