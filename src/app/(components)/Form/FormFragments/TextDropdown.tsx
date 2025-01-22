import React from "react";
import Select, { StylesConfig } from "react-select";
import Image from "next/image";

// Styles Configuration
const customStyles: StylesConfig<any, false> = {
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

const customStylesError: StylesConfig<any, false> = {
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

interface TextDropdownProps {
  className?: string;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string | null; // Allow null for cases where no value is selected
  onChange: (value: string | null) => void;
  errorMessage: string;
  hasError: boolean;
  clearError: () => void;
  disabled?: boolean;
}

export function TextDropdown({
  className,
  label,
  placeholder,
  options,
  value,
  onChange,
  errorMessage,
  hasError,
  clearError,
  disabled,
}: TextDropdownProps) {
  function handleDropdownChange(
    selectedOption: { value: string; label: string } | null
  ) {
    onChange(selectedOption ? selectedOption.value : null);
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-xs sm:text-lg font-medium">
          {label}
        </label>
        {hasError && (
          <span className="text-red text-xs sm:text-lg font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <Select
          className={`react-select-container ${
            hasError ? "border-red" : "border-gray-500"
          }`}
          classNamePrefix="react-select"
          options={options}
          placeholder={placeholder}
          value={options.find((option) => option.value === value) || null}
          onChange={handleDropdownChange}
          onFocus={clearError}
          isDisabled={disabled}
          // styles={{
          //   control: (provided, state) => ({
          //     ...provided,
          //     backgroundColor: "#1c1c1e",
          //     borderColor: hasError ? "red" : "#6b7280",
          //     color: "#f3f4f6",
          //     boxShadow: state.isFocused
          //       ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
          //       : undefined,
          //   }),
          //   singleValue: (provided) => ({
          //     ...provided,
          //     color: "#f3f4f6",
          //   }),
          //   placeholder: (provided) => ({
          //     ...provided,
          //     color: "#6b7280",
          //   }),
          // }}
          styles={hasError ? customStylesError : customStyles}
        />
      </div>
    </div>
  );
}

export function TextDropdownImage({
  className,
  label,
  placeholder,
  options,
  value,
  onChange,
  errorMessage,
  hasError,
  clearError,
  disabled,
}: TextDropdownProps) {
  function handleDropdownChange(
    selectedOption: { value: string; label: string } | null
  ) {
    onChange(selectedOption ? selectedOption.value : null);
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-xs sm:text-lg font-medium">
          {label}
        </label>
        {hasError && (
          <span className="text-red text-xs sm:text-lg font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <Select
          className={`react-select-container ${
            hasError ? "border-red" : "border-gray-500"
          }`}
          classNamePrefix="react-select"
          options={options}
          placeholder={placeholder}
          value={options.find((option) => option.value === value) || null}
          onChange={handleDropdownChange}
          onFocus={clearError}
          isDisabled={disabled}
          styles={hasError ? customStylesError : customStyles}
          formatOptionLabel={(e) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={e.icon}
                alt={e.value}
                width={20}
                height={20}
                style={{ marginRight: 10 }}
              />
              {e.label}
            </div>
          )}
        />
      </div>
    </div>
  );
}
