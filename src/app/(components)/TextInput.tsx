interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: any) => void;
  errorMessage: string;
  hasError: boolean;
  clearError: () => void;
  disabled?: boolean;
}

export function TextInput({
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
  hasError,
  clearError,
  disabled,
}: TextInputProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChange(value);
  }

  return (
    <div
      className={`flex flex-col gap-1 w-full ${
        disabled ? "hidden" : "visible"
      }`}
    >
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-base sm:text-lg font-medium">
          {label}
        </label>
        {hasError && (
          <span className="text-red text-xs sm:text-lg font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full h-full">
        <input
          className={`form_Input
              px-4 py-3 rounded ${
                hasError ? "border-red" : "border-gray-500"
              } border-[2px] text-base text-gray-100 bg-zinc-800 font-medium  
              placeholder:text-grey-900 w-full
              
              `}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => clearError()}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

interface TextInputLongProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export function TextInputLong({
  label,
  placeholder,
  value,
  onChange,
  disabled,
}: TextInputLongProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    onChange(value);
  }

  return (
    <div
      className={`flex flex-col gap-1 w-full h-full ${
        disabled ? "hidden" : "visible"
      }`}
    >
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-base sm:text-lg font-medium">
          {label}
        </label>
      </div>
      <div className="relative w-full h-full">
        <textarea
          className={`form_Input
              px-4 py-3 rounded border-gray-500 border-[2px] text-base text-gray-100 bg-zinc-800 font-medium  
              placeholder:text-grey-900 w-full h-[200px] resize-none
              `}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
