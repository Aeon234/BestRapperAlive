import React, { useEffect } from "react";
import { SelectCustom } from "../TextDropdown";
import { AppFormSchema } from "@/app/Application/AppSchema";
import { StaticImageData } from "next/image";

// Role Icons
import tankicon from "../../../../public/wowRoles/tank.png";
import healericon from "../../../../public/wowRoles/healer.png";
import dpsicon from "../../../../public/wowRoles/dps.png";
import { useFormContext } from "react-hook-form";
import { RotateCcw } from "lucide-react";

// Types
type Role = "Tank" | "Healer" | "DPS";
type Specialization = {
  spec: string;
  role: Role;
  icon: StaticImageData;
};
type WoWClass = {
  class: string;
  color: string;
  specializations: Specialization[];
};

// WoW Classes Data
const wowData: WoWClass[] = [
  {
    class: "Death Knight",
    color: "#C41E3A",
    specializations: [
      { spec: "Blood", role: "Tank", icon: tankicon },
      { spec: "Frost", role: "DPS", icon: dpsicon },
      { spec: "Unholy", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Demon Hunter",
    color: "#A330C9",
    specializations: [
      { spec: "Havoc", role: "DPS", icon: dpsicon },
      { spec: "Vengeance", role: "Tank", icon: tankicon },
    ],
  },
  {
    class: "Druid",
    color: "#FF7C0A",
    specializations: [
      { spec: "Balance", role: "DPS", icon: dpsicon },
      { spec: "Feral", role: "DPS", icon: dpsicon },
      { spec: "Guardian", role: "Tank", icon: tankicon },
      { spec: "Restoration", role: "Healer", icon: healericon },
    ],
  },
  {
    class: "Evoker",
    color: "#33937F",
    specializations: [
      { spec: "Devastation", role: "DPS", icon: dpsicon },
      { spec: "Preservation", role: "Healer", icon: healericon },
      { spec: "Augmentation", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Hunter",
    color: "#AAD372",
    specializations: [
      { spec: "Beast Mastery", role: "DPS", icon: dpsicon },
      { spec: "Marksmanship", role: "DPS", icon: dpsicon },
      { spec: "Survival", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Mage",
    color: "#3FC7EB",
    specializations: [
      { spec: "Arcane", role: "DPS", icon: dpsicon },
      { spec: "Fire", role: "DPS", icon: dpsicon },
      { spec: "Frost", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Monk",
    color: "#00FF98",
    specializations: [
      { spec: "Brewmaster", role: "Tank", icon: tankicon },
      { spec: "Mistweaver", role: "Healer", icon: healericon },
      { spec: "Windwalker", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Paladin",
    color: "#F48CBA",
    specializations: [
      { spec: "Holy", role: "Healer", icon: healericon },
      { spec: "Protection", role: "Tank", icon: tankicon },
      { spec: "Retribution", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Priest",
    color: "#FFFFFF",
    specializations: [
      { spec: "Discipline", role: "Healer", icon: healericon },
      { spec: "Holy", role: "Healer", icon: healericon },
      { spec: "Shadow", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Rogue",
    color: "#FFF468",
    specializations: [
      { spec: "Assassination", role: "DPS", icon: dpsicon },
      { spec: "Outlaw", role: "DPS", icon: dpsicon },
      { spec: "Subtlety", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Shaman",
    color: "#0070DD",
    specializations: [
      { spec: "Elemental", role: "DPS", icon: dpsicon },
      { spec: "Enhancement", role: "DPS", icon: dpsicon },
      { spec: "Restoration", role: "Healer", icon: healericon },
    ],
  },
  {
    class: "Warlock",
    color: "#8788EE",
    specializations: [
      { spec: "Affliction", role: "DPS", icon: dpsicon },
      { spec: "Demonology", role: "DPS", icon: dpsicon },
      { spec: "Destruction", role: "DPS", icon: dpsicon },
    ],
  },
  {
    class: "Warrior",
    color: "#C69B6D",
    specializations: [
      { spec: "Arms", role: "DPS", icon: dpsicon },
      { spec: "Fury", role: "DPS", icon: dpsicon },
      { spec: "Protection", role: "Tank", icon: tankicon },
    ],
  },
];

const roleIcons = {
  Tank: tankicon,
  Healer: healericon,
  DPS: dpsicon,
};

const uniqueRoles = Array.from(
  new Set(wowData.flatMap((w) => w.specializations.map((s) => s.role)))
).map((role) => ({
  value: role,
  label: role,
  icon: (roleIcons[role] as StaticImageData).src, // convert to string URL
}));

const getFilteredClasses = (role: string) =>
  wowData
    .filter((w) => w.specializations.some((s) => s.role === role))
    .map((w) => ({ value: w.class, label: w.class }));

interface Exclude {
  cls: string;
  specs: string[];
}

const getFilteredSpecs = (
  role: string,
  cls: string,
  exclude?: { cls: string; specs: string[] }
) =>
  wowData
    .find((w) => w.class === cls)
    ?.specializations.filter(
      (s) =>
        s.role === role &&
        // only exclude if both class and spec match the exclusion
        !(exclude?.cls === cls && exclude.specs.includes(s.spec))
    )
    .map((s) => ({ value: s.spec, label: s.spec })) || [];
function Characters() {
  const {
    watch,
    resetField,
    clearErrors,
    formState: { errors },
  } = useFormContext<AppFormSchema>();

  // watch the six fields
  const [role1, class1, spec1, role2, class2, spec2] = watch([
    "role1",
    "class1",
    "spec1",
    "role2",
    "class2",
    "spec2",
  ]) as [string, string, string, string, string, string];

  // exclude specs already chosen in 1 & 2
  const exclude1 = { cls: class1, specs: spec1 ? [spec1] : [] };
  const exclude2 =
    class2 === class1 && spec1 ? { cls: class1, specs: [spec1] } : undefined;

  //
  // 2) whenever role1 changes → reset class1+spec1
  //
  useEffect(() => {
    // resetField will clear its value back to defaultValue (usually "")
    resetField("class1");
    resetField("spec1");
    // clear any error messages
    clearErrors(["class1", "spec1"]);
  }, [role1, resetField, clearErrors]);

  //
  // 3) whenever class1 changes → reset spec1
  //
  useEffect(() => {
    resetField("spec1");
    clearErrors("spec1");
  }, [class1, resetField, clearErrors]);

  //
  // 4) same logic for the 2nd row
  //
  useEffect(() => {
    resetField("class2");
    resetField("spec2");
    clearErrors(["class2", "spec2"]);
  }, [role2, resetField, clearErrors]);

  useEffect(() => {
    resetField("spec2");
    clearErrors("spec2");
  }, [class2, resetField, clearErrors]);

  // reset handler for the 1st row
  const resetCharacter1 = () => {
    // clear values
    resetField("role1");
    resetField("class1");
    resetField("spec1");
    resetField("role2");
    resetField("class2");
    resetField("spec2");
    // clear errors
    clearErrors(["role1", "class1", "spec1", "role2", "class2", "spec2"]);
  };

  // reset handler for the 2nd row
  const resetCharacter2 = () => {
    // clear values
    resetField("role2");
    resetField("class2");
    resetField("spec2");
    // clear errors
    clearErrors(["role2", "class2", "spec2"]);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-extrabold pb-3">
        Proposed{" "}
        <mark className=" px-1 text-white  rounded-sm bg-blue-700">Main</mark>
      </h1>
      <div className="w-full grid sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-[5fr_6fr_8fr_1fr] lg:grid-rows-1 gap-4">
        <SelectCustom<AppFormSchema>
          name="role1"
          label="Role"
          placeholder="Role"
          options={uniqueRoles}
        />
        <SelectCustom<AppFormSchema>
          name="class1"
          label="Class"
          placeholder="Class"
          options={getFilteredClasses(role1)}
          isDisabled={!role1}
        />
        <SelectCustom<AppFormSchema>
          name="spec1"
          label="Spec"
          placeholder="Spec"
          options={getFilteredSpecs(role1, class1, exclude1)}
          isDisabled={!class1}
        />
        <button
          onClick={resetCharacter1}
          disabled={!role1}
          className={`
          ${
            role1
              ? "bg-amber-500 hover:bg-amber-600 cursor-pointer"
              : "bg-gray-400"
          }
          py-[6px] px-[6px] h-10 w-10 rounded text-sm text-gray-800 font-bold
          transition-colors duration-200 self-end flex items-center justify-center
        `}
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="my-6 md:my-10">
        <div className="divider div-transparent"></div>
      </div>

      <h1 className="text-xl font-extrabold pb-3">
        Willing to play if team
        <mark className="mx-1 px-1 text-white rounded-sm bg-orange-600">
          needs
        </mark>
        it
      </h1>
      <div className="w-full grid sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-[5fr_6fr_8fr_1fr] lg:grid-rows-1 gap-4">
        <SelectCustom<AppFormSchema>
          name="role2"
          label="Role"
          placeholder="Role"
          options={uniqueRoles}
          isDisabled={!spec1}
        />
        <SelectCustom<AppFormSchema>
          name="class2"
          label="Class"
          placeholder="Class"
          options={getFilteredClasses(role2)}
          isDisabled={!role2}
        />
        <SelectCustom<AppFormSchema>
          name="spec2"
          label="Spec"
          placeholder="Spec"
          options={getFilteredSpecs(role2, class2, exclude2)}
          isDisabled={!class2}
        />
        <button
          onClick={resetCharacter2}
          disabled={!role2}
          className={`
          ${
            role2
              ? "bg-amber-500 hover:bg-amber-600 cursor-pointer"
              : "bg-gray-400"
          }
          py-[6px] px-[6px] h-10 w-10 rounded text-sm text-gray-800 font-bold
          transition-colors duration-200 self-end flex items-center justify-center
        `}
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
}

export default Characters;
