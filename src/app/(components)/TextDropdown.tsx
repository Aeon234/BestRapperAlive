import React from "react";
import Select, { StylesConfig } from "react-select";
import Image from "next/image";
import {
  useFormContext,
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

interface Option {
  value: string;
  label: string;
  icon?: string;
}

export type SelectCustomProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label: string;
  placeholder?: string;
  options: Option[];
  isDisabled?: boolean;
} & Omit<UseControllerProps<TFieldValues, TName>, "control" | "name">;

const customStyles: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    "&:hover": { border: "2px solid #d46f13" },
    border: state.isFocused ? "2px solid #d46f13" : "2px solid #505050",
    backgroundColor: "#2b2a33",
    boxShadow:
      "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075), 0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)",
    color: "#ffffff",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#181a1b" : "#2b2a33",
    color: "#ffffff",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2b2a33",
    color: "#ffffff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
};
const customStylesError: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    "&:hover": { border: "2px solid #d46f13" },
    border: state.isFocused ? "2px solid #d46f13" : "2px solid #ED4337",
    backgroundColor: "#2b2a33",
    boxShadow:
      "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.1), 0 0 0 1px hsla(230, 13%, 9%, 0.075), 0 0.3px 0.4px hsla(230, 13%, 9%, 0.02), 0 0.9px 1.5px hsla(230, 13%, 9%, 0.045), 0 3.5px 6px hsla(230, 13%, 9%, 0.09)",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#181a1b" : "#2b2a33",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2b2a33",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#ffffff",
  }),
};

export function SelectCustom<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  placeholder = "",
  options,
  isDisabled = false,
  ...controllerProps
}: SelectCustomProps<TFieldValues, TName>) {
  const { control, clearErrors } = useFormContext<TFieldValues>();

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...controllerProps,
  });

  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name as string}
          className="text-gray-100 text-base sm:text-lg font-medium"
        >
          {label}
        </label>
        {hasError && (
          <span className="text-red-500 text-xs sm:text-sm font-medium">
            {error?.message}
          </span>
        )}
      </div>

      <Select
        inputId={name as string}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        value={
          options.find((option) => option.value === value) ??
          (value ? { value, label: value } : null)
        }
        onChange={(opt) => onChange(opt ? opt.value : null)}
        onBlur={onBlur}
        onFocus={() => clearErrors(name)}
        styles={hasError ? customStylesError : customStyles}
        formatOptionLabel={(opt: Option) => (
          <div className="flex items-center">
            {opt.icon && (
              <Image
                src={opt.icon}
                alt={opt.label}
                width={20}
                height={20}
                className="mr-2"
              />
            )}
            {opt.label}
          </div>
        )}
      />
    </div>
  );
}
