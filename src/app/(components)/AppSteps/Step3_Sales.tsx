import React from "react";
import { TextCustomArea } from "../TextCustom";
import { ToggleButtonDescCustom } from "../TextCheckbox";
import { useFormContext, useWatch } from "react-hook-form";
import { AppFormSchema } from "@/app/Application/AppSchema";

import { Coins } from "lucide-react";

function Sales() {
  const { control } = useFormContext<AppFormSchema>();

  const salesInterest = useWatch({ control, name: "salesInterest" });

  return (
    <div className="w-full">
      <ToggleButtonDescCustom
        name="salesInterest"
        label=""
        icon={Coins}
        description="Guild should do sales and I want to be part of it."
      />
      <br />
      {salesInterest && (
        <div>
          <div className="pb-2">
            <span className="font-bold text-red-500">NOTE: </span>
            By checking this toggle
            <span className="mx-1 underline underline-offset-2 decoration-2 decoration-amber-600 font-bold">
              ON
            </span>
            you are committing to being
            <span className="ml-1 underline underline-offset-2 decoration-2 decoration-amber-600 font-bold">
              PRESENT
            </span>{" "}
            at sales.
          </div>
          <TextCustomArea
            name="salesComments"
            label="Sales Comments"
            placeholder="Enter your comments here"
          />
        </div>
      )}
    </div>
  );
}

export default Sales;
