import React from "react";

import { ToggleButtonCustom } from "../TextCheckbox";
import { useFormContext, useWatch } from "react-hook-form";
import { AppFormSchema } from "@/app/Application/AppSchema";

import { ScrollText, Coins, Wand, Sword, Map, PartyPopper } from "lucide-react";
import { TextCustomArea } from "../TextCustom";

function Leadership() {
  const { control } = useFormContext<AppFormSchema>();

  const meleeOfficer = useWatch({ control, name: "meleeOfficer" });
  const rangedOfficer = useWatch({ control, name: "rangedOfficer" });
  const logsOfficer = useWatch({ control, name: "logsOfficer" });
  const recruitOfficer = useWatch({ control, name: "recruitOfficer" });
  const salesOfficer = useWatch({ control, name: "salesOfficer" });
  const eventsOfficer = useWatch({ control, name: "eventsOfficer" });

  const OfficerToggled =
    meleeOfficer ||
    rangedOfficer ||
    logsOfficer ||
    recruitOfficer ||
    salesOfficer ||
    eventsOfficer;

  return (
    <div>
      <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 mb-4 gap-4 items-center">
        <ToggleButtonCustom
          className="w-[180px]"
          name="meleeOfficer"
          label="Melee Officer"
          icon={Sword}
        />
        <ToggleButtonCustom
          className="w-[180px]"
          name="rangedOfficer"
          label="Ranged Officer"
          icon={Wand}
        />
        <ToggleButtonCustom
          className="w-[180px]"
          name="logsOfficer"
          label="Logs Officer"
          icon={Map}
        />
        <ToggleButtonCustom
          className="w-[180px]"
          name="recruitOfficer"
          label="Recruiter"
          icon={ScrollText}
        />
        <ToggleButtonCustom
          className="w-[180px]"
          name="salesOfficer"
          label="Sales Officer"
          icon={Coins}
        />
        <ToggleButtonCustom
          className="w-[180px]"
          name="eventsOfficer"
          label="Events Officer"
          icon={PartyPopper}
        />
      </div>
      {OfficerToggled && (
        <div>
          <TextCustomArea
            name="officerComments"
            label="Leadership Position Comments"
            placeholder="Provide details on your choices and list top 3."
          />
        </div>
      )}
    </div>
  );
}

export default Leadership;
