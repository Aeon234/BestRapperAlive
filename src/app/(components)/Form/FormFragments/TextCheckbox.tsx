import { Coins, Gamepad2, Popcorn, ScrollText } from "lucide-react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { LucideIcon } from "lucide-react";
import ToggleButton from "@mui/material/ToggleButton";

interface TextToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  errorMessage: string;
  hasError: boolean;
  clearError: () => void;
}

export function TextCheckbox({
  label,
  value,
  onChange,
  errorMessage,
  hasError,
  clearError,
}: TextToggleProps) {
  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked);
  }

  return (
    <div className="flex flex-col gap-1">
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
      <div className="relative w-full">
        <FormControlLabel
          className="text-gray-100 text-base sm:text-lg font-medium"
          control={
            <Checkbox
              checked={value}
              onChange={handleCheckboxChange}
              onFocus={() => clearError()}
              size="large"
              sx={{
                color: hasError ? "#ED4337" : "#505050",
                "&.Mui-checked": {
                  color: hasError ? "#ED4337" : "#d46f13",
                },
              }}
            />
          }
          label={label}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "1.125rem",
              fontWeight: 500,
            },
          }}
        />
      </div>
    </div>
  );
}

interface StandaloneToggleButtonProps {
  className?: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  errorMessage: string;
  hasError: boolean;
  clearError: () => void;
  icon: LucideIcon;
}

const getColor = (Icon: LucideIcon) => {
  if (Icon === Coins) return "#FFA500";
  if (Icon === Popcorn) return "#EE82EE";
  if (Icon === Gamepad2) return "#FF033E";
  if (Icon === ScrollText) return "#32de84";
  return "#505050";
};

export function StandaloneToggleButton({
  className,
  label,
  value,
  onChange,
  errorMessage,
  hasError,
  clearError,
  icon: Icon,
}: StandaloneToggleButtonProps) {
  function handleToggleChange() {
    onChange(!value);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-base sm:text-lg font-medium">
          {/* {label} */}
        </label>
        {hasError && (
          <span className="text-red text-xs sm:text-lg font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <ToggleButton
          className={className}
          value="check"
          selected={value}
          onChange={handleToggleChange}
          onFocus={() => clearError()}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "2px solid",
            borderColor: !value ? "gray" : getColor(Icon),
            color: hasError ? "#ED4337" : !value ? "#FFFFFF" : "#FFA500",
            "&:hover": {
              color: getColor(Icon),
              borderColor: getColor(Icon),
            },
            "&.Mui-selected": {
              color: hasError ? "#ED4337" : !value ? "#FFFFFF" : getColor(Icon),
            },
          }}
        >
          <Icon style={{ marginRight: 10 }} />
          <div className="flex flex-col flex-grow items-center">
            <span className="font-bold ">{label}</span>
          </div>
        </ToggleButton>
      </div>
    </div>
  );
}

interface ToggleButtonDescProps extends StandaloneToggleButtonProps {
  description: string;
}

export function ToggleButtonDesc({
  className,
  label,
  value,
  onChange,
  errorMessage,
  hasError,
  clearError,
  icon: Icon,
  description,
}: ToggleButtonDescProps) {
  function handleToggleChange() {
    onChange(!value);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-gray-100 text-base sm:text-lg font-medium">
          {/* {label} */}
        </label>
        {hasError && (
          <span className="text-red text-xs sm:text-lg font-medium">
            {errorMessage}
          </span>
        )}
      </div>
      <div className="relative w-full">
        <ToggleButton
          className={`${className}`}
          value="check"
          selected={value}
          onChange={handleToggleChange}
          onFocus={() => clearError()}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "2px solid",
            borderColor: !value ? "gray" : getColor(Icon),
            color: hasError ? "#ED4337" : !value ? "#FFFFFF" : "#FFA500",
            "&:hover": {
              color: getColor(Icon),
              borderColor: getColor(Icon),
            },
            "&.Mui-selected": {
              color: hasError ? "#ED4337" : !value ? "#FFFFFF" : getColor(Icon),
            },
          }}
        >
          <Icon style={{ marginRight: 10, marginLeft: 4 }} />
          <div className="flex flex-col flex-grow items-start">
            <span className="font-bold ">{label}</span>
            <p className=" text-xs normal-case ">{description}</p>
          </div>
        </ToggleButton>
      </div>
    </div>
  );
}
