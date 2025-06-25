import React from "react";
import {
  useFormContext,
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import ToggleButton from "@mui/material/ToggleButton";
import { LucideIcon } from "lucide-react";
import {
  Coins,
  Gamepad2,
  Popcorn,
  ScrollText,
  Sword,
  Wand,
  Map,
  PartyPopper,
} from "lucide-react";

const getColor = (Icon: LucideIcon) => {
  if (Icon === Coins) return "#FFA500";
  if (Icon === Popcorn) return "#EE82EE";
  if (Icon === Gamepad2) return "#FF033E";
  if (Icon === ScrollText) return "#32de84";
  if (Icon === Sword) return "#dc3c31";
  if (Icon === Wand) return "#1e87db";
  if (Icon === Map) return "#8265a8";
  if (Icon === PartyPopper) return "#f95ca4";
  return "#505050";
};

type ToggleButtonCustomProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label: string;
  icon: LucideIcon;
  className?: string;
  disabled?: boolean;
} & Omit<UseControllerProps<TFieldValues, TName>, "control" | "name">;

export function ToggleButtonCustom<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  icon: Icon,
  className,
  disabled = false,
  ...controllerProps
}: ToggleButtonCustomProps<TFieldValues, TName>) {
  const { control, clearErrors } = useFormContext<TFieldValues>();
  const {
    field: { value, onChange },
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
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-base sm:text-lg font-medium">
          {/* {label} */}
        </label>
        {hasError && (
          <span className="text-red-500 text-xs sm:text-sm font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <ToggleButton
          className={className}
          value="check"
          selected={value}
          onChange={() => onChange(!value)}
          onFocus={() => clearErrors(name)}
          disabled={disabled}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "2px solid",
            borderColor: !value ? "gray" : getColor(Icon),
            color: hasError ? "#ED4337" : !value ? "#FFFFFF" : getColor(Icon),
            "&:hover": {
              color: getColor(Icon),
              borderColor: getColor(Icon),
            },
            "&.Mui-selected": {
              color: hasError ? "#ED4337" : getColor(Icon),
            },
          }}
        >
          <Icon style={{ marginRight: 10 }} />
          <div className="flex flex-col flex-grow items-center">
            <span className="font-bold">{label}</span>
          </div>
        </ToggleButton>
      </div>
    </div>
  );
}

type ToggleButtonDescCustomProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ToggleButtonCustomProps<TFieldValues, TName> & {
  description: string;
};

export function ToggleButtonDescCustom<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  icon: Icon,
  description,
  className,
  disabled = false,
  ...controllerProps
}: ToggleButtonDescCustomProps<TFieldValues, TName>) {
  const { control, clearErrors } = useFormContext<TFieldValues>();
  const {
    field: { value, onChange },
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
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-base sm:text-lg font-medium">
          {/* {label} */}
        </label>
        {hasError && (
          <span className="text-red-500 text-xs sm:text-sm font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <ToggleButton
          className={className}
          value="check"
          selected={value}
          onChange={() => {
            onChange(!value);
          }}
          onFocus={() => clearErrors(name)}
          disabled={disabled}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "2px solid",
            borderColor: !value ? "gray" : getColor(Icon),
            color: hasError ? "#ED4337" : !value ? "#FFFFFF" : getColor(Icon),
            "&:hover": {
              color: getColor(Icon),
              borderColor: getColor(Icon),
            },
            "&.Mui-selected": {
              color: hasError ? "#ED4337" : getColor(Icon),
            },
          }}
        >
          <Icon style={{ marginRight: 10, marginLeft: 4 }} />
          <div className="flex flex-col flex-grow items-start">
            <span className="font-bold">{label}</span>
            <p className="text-xs normal-case">{description}</p>
          </div>
        </ToggleButton>
      </div>
    </div>
  );
}
