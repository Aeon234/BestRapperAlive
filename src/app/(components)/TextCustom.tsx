import React from "react";
import {
  useFormContext,
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

type TextCustomProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label: string;
  placeholder?: string;
  disabled?: boolean;
} & Omit<UseControllerProps<TFieldValues, TName>, "control" | "name">;

export function TextCustom<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  placeholder = "",
  disabled = false,
  ...controllerProps
}: TextCustomProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...controllerProps,
  });

  const hasError = Boolean(error);
  const errorMessage = error?.message;

  return (
    <div
      className={`flex flex-col gap-1 w-full ${
        disabled ? "hidden" : "visible"
      }`}
    >
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-gray-100 text-base sm:text-lg font-medium"
        >
          {label}
        </label>
        {hasError && (
          <span className="text-red-500 text-xs sm:text-sm font-medium">
            {errorMessage}
          </span>
        )}
      </div>

      <div className="relative w-full h-full">
        <input
          id={name}
          className={`
            px-4 py-3 rounded ${
              hasError ? "border-red-500" : "border-gray-500"
            } border-[2px] text-base text-gray-100 bg-zinc-800 font-medium  
            placeholder-gray-400  placeholder:font-medium w-full h-12
            
            `}
          type="text"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export function TextCustomArea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  placeholder = "",
  disabled = false,
  ...controllerProps
}: TextCustomProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    ...controllerProps,
  });

  const hasError = Boolean(error);
  const errorMessage = error?.message;

  return (
    <div
      className={`flex flex-col gap-1 w-full ${
        disabled ? "hidden" : "visible"
      }`}
    >
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-gray-100 text-base sm:text-lg font-medium"
        >
          {label}
        </label>
        {hasError && (
          <span className="text-red-500 text-xs sm:text-sm font-medium">
            {errorMessage}
          </span>
        )}
      </div>

      <div className="relative w-full h-full">
        <textarea
          id={name}
          className="px-4 py-3 rounded border-gray-500 border-[2px] text-base text-gray-100 bg-zinc-800 font-medium  
            placeholder-gray-400  w-full h-[200px] resize-none"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
