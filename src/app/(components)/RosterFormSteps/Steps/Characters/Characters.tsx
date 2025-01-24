"use client";

import Form from "@/app/(components)/Form/FormFragments";
import { Fragment } from "react";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { ACTIONS } from "@/app/contexts/form";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
import {
  TextDropdown,
  TextDropdownImage,
} from "@/app/(components)/Form/FormFragments/TextDropdown";
import { StaticImageData } from "next/image";
import { RotateCcw } from "lucide-react";

// Role Icons
import tankicon from "../../../../../../public/wowRoles/tank.png";
import healericon from "../../../../../../public/wowRoles/healer.png";
import dpsicon from "../../../../../../public/wowRoles/dps.png";

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

const getFilteredSpecializations = (
  roleValue: string,
  classValue: string,
  excludeSpecs: string[] = []
) =>
  wowData
    .find((wowClass) => wowClass.class === classValue)
    ?.specializations.filter(
      (spec) => spec.role === roleValue && !excludeSpecs.includes(spec.spec)
    )
    .map((spec) => ({
      value: spec.spec,
      label: spec.spec,
    })) || [];

export function Characters() {
  const {
    role1,
    dispatchRole1Field,
    class1,
    dispatchClass1Field,
    spec1,
    dispatchSpec1Field,
    role2,
    dispatchRole2Field,
    class2,
    dispatchClass2Field,
    spec2,
    dispatchSpec2Field,
    role3,
    dispatchRole3Field,
    class3,
    dispatchClass3Field,
    spec3,
    dispatchSpec3Field,
  } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();

  const { saveValueToLocalStorage } = useLocalStorage();

  function validateForm() {
    let formHasError = false;

    // Validate fields for the first character
    [
      { field: role1, dispatch: dispatchRole1Field, label: "Role" },
      { field: class1, dispatch: dispatchClass1Field, label: "Class" },
      { field: spec1, dispatch: dispatchSpec1Field, label: "Specialization" },
    ].forEach(({ field, dispatch }) => {
      if (!field.value) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          errorMessage: `Missing`,
        });
        formHasError = true;
      }
    });

    // If no error in the first character, validate the second character
    if (!formHasError && role2.value) {
      [
        { field: class2, dispatch: dispatchClass2Field, label: "Class" },
        { field: spec2, dispatch: dispatchSpec2Field, label: "Specialization" },
      ].forEach(({ field, dispatch }) => {
        if (!field.value) {
          dispatch({
            type: ACTIONS.SET_ERROR,
            errorMessage: `Missing`,
          });
          formHasError = true;
        }
      });
    }

    // If no error in the second character, validate the third character
    if (!formHasError && role3.value) {
      [
        { field: class3, dispatch: dispatchClass3Field, label: "Class" },
        { field: spec3, dispatch: dispatchSpec3Field, label: "Specialization" },
      ].forEach(({ field, dispatch }) => {
        if (!field.value) {
          dispatch({
            type: ACTIONS.SET_ERROR,
            errorMessage: `Missing`,
          });
          formHasError = true;
        }
      });
    }

    return !formHasError;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "formCharacters",
        JSON.stringify({
          characters: [
            { role: role1.value, class: class1.value, spec: spec1.value },
            { role: role2.value, class: class2.value, spec: spec2.value },
            { role: role3.value, class: class3.value, spec: spec3.value },
          ],
        })
      );
      handleNextStep();
    }
  }

  function resetCharacter2() {
    dispatchRole2Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchClass2Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchSpec2Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchRole3Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchClass3Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchSpec3Field({ type: ACTIONS.SET_VALUE, value: "" });
  }
  function resetCharacter3() {
    dispatchRole3Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchClass3Field({ type: ACTIONS.SET_VALUE, value: "" });
    dispatchSpec3Field({ type: ACTIONS.SET_VALUE, value: "" });
  }

  const uniqueRoles = Array.from(
    new Set(
      wowData.flatMap((wowClass) =>
        wowClass.specializations.map((spec) => spec.role)
      )
    )
  ).map((role) => ({ value: role, label: role, icon: roleIcons[role] }));

  const getFilteredClasses = (roleValue: string) =>
    wowData
      .filter((wowClass) =>
        wowClass.specializations.some((spec) => spec.role === roleValue)
      )
      .map((wowClass) => ({
        value: wowClass.class,
        label: wowClass.class,
      }));

  const excludeSpecs = [spec1.value, spec2.value];

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Character Info"
          description="Fill out the classes and specializations you're interested in playing during Mythic Progression."
        />

        <div className="mt-5 flex flex-col gap-6">
          {/* Character 1 */}
          <div className="mb-0 unselectable text-xl font-semibold text-gray-100">
            <p>First Choice*</p>
          </div>
          <div className="flex gap-8 ml-4">
            <TextDropdownImage
              className="w-[180px]"
              label="Role"
              placeholder="Select a role"
              options={uniqueRoles}
              value={role1.value}
              onChange={(value) => {
                dispatchRole1Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                });
                dispatchClass1Field({ type: ACTIONS.SET_VALUE, value: "" });
                dispatchSpec1Field({ type: ACTIONS.SET_VALUE, value: "" });
              }}
              errorMessage={role1.errorMessage}
              hasError={role1.hasError}
              clearError={() =>
                dispatchRole1Field({ type: ACTIONS.CLEAR_ERROR })
              }
            />
            <TextDropdown
              className="w-[180px]"
              label="Class"
              placeholder="Select a class"
              options={getFilteredClasses(role1.value)}
              value={class1.value}
              onChange={(value) => {
                dispatchClass1Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                });
                dispatchSpec1Field({ type: ACTIONS.SET_VALUE, value: "" });
              }}
              errorMessage={class1.errorMessage}
              hasError={class1.hasError}
              clearError={() =>
                dispatchClass1Field({ type: ACTIONS.CLEAR_ERROR })
              }
            />
            <TextDropdown
              className="w-[220px]"
              label="Specialization"
              placeholder="Select a specialization"
              options={getFilteredSpecializations(role1.value, class1.value)}
              value={spec1.value}
              onChange={(value) =>
                dispatchSpec1Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                })
              }
              errorMessage={spec1.errorMessage}
              hasError={spec1.hasError}
              clearError={() =>
                dispatchSpec1Field({ type: ACTIONS.CLEAR_ERROR })
              }
            />
          </div>
          {/* Character 2 */}
          <div className="mb-0 unselectable text-xl font-semibold text-gray-100">
            <p>Second Choice</p>
          </div>
          <div className="flex gap-8 ml-4">
            <TextDropdownImage
              className="w-[180px]"
              label="Role"
              placeholder="Select a role"
              options={uniqueRoles}
              value={role2.value}
              onChange={(value) => {
                dispatchRole2Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                });
                dispatchClass2Field({ type: ACTIONS.SET_VALUE, value: "" });
                dispatchSpec2Field({ type: ACTIONS.SET_VALUE, value: "" });
              }}
              errorMessage={role2.errorMessage}
              hasError={role2.hasError}
              clearError={() =>
                dispatchRole2Field({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!role1.value || !class1.value || !spec1.value}
            />
            <TextDropdown
              className="w-[180px]"
              label="Class"
              placeholder="Select a class"
              options={getFilteredClasses(role2.value)}
              value={class2.value}
              onChange={(value) => {
                dispatchClass2Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                });
                dispatchSpec2Field({ type: ACTIONS.SET_VALUE, value: "" });
              }}
              errorMessage={class2.errorMessage}
              hasError={class2.hasError}
              clearError={() =>
                dispatchClass2Field({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!role1.value || !class1.value || !spec1.value}
            />
            <TextDropdown
              className="w-[220px]"
              label="Specialization"
              placeholder="Select a specialization"
              options={getFilteredSpecializations(role2.value, class2.value, [
                spec1.value,
              ])}
              value={spec2.value}
              onChange={(value) =>
                dispatchSpec2Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                })
              }
              errorMessage={spec2.errorMessage}
              hasError={spec2.hasError}
              clearError={() =>
                dispatchSpec2Field({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!role1.value || !class1.value || !spec1.value}
            />
            <div className="flex flex-col gap-1 w-[220px] justify-end mb-1">
              <button
                onClick={resetCharacter2}
                className={`${
                  role2.value ? "bg-amber-500" : "bg-gray-500"
                } py-[6px] px-[6px] h-10 w-10 rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300`}
                disabled={!role2.value}
              >
                <RotateCcw />
              </button>
            </div>
          </div>
          {/* Character 3 */}
          <div className="mb-0 unselectable text-xl font-semibold text-gray-100">
            <p>Third Choice</p>
          </div>
          <div className="flex gap-8 ml-4">
            <TextDropdownImage
              className="w-[180px]"
              label="Role"
              placeholder="Select a role"
              options={uniqueRoles}
              value={role3.value}
              onChange={(value) => {
                dispatchRole3Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                });
                dispatchClass3Field({ type: ACTIONS.SET_VALUE, value: "" });
                dispatchSpec3Field({ type: ACTIONS.SET_VALUE, value: "" });
              }}
              errorMessage={role3.errorMessage}
              hasError={role3.hasError}
              clearError={() =>
                dispatchRole3Field({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!role2.value || !class2.value || !spec2.value}
            />
            <TextDropdown
              className="w-[180px]"
              label="Class"
              placeholder="Select a class"
              options={getFilteredClasses(role3.value)}
              value={class3.value}
              onChange={(value) => {
                dispatchClass3Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                });
                dispatchSpec3Field({ type: ACTIONS.SET_VALUE, value: "" });
              }}
              errorMessage={class3.errorMessage}
              hasError={class3.hasError}
              clearError={() =>
                dispatchClass3Field({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!role2.value || !class2.value || !spec2.value}
            />
            <TextDropdown
              className="w-[220px]"
              label="Specialization"
              placeholder="Select a specialization"
              options={getFilteredSpecializations(
                role3.value,
                class3.value,
                excludeSpecs
              )}
              value={spec3.value}
              onChange={(value) =>
                dispatchSpec3Field({
                  type: ACTIONS.SET_VALUE,
                  value: value || "",
                })
              }
              errorMessage={spec3.errorMessage}
              hasError={spec3.hasError}
              clearError={() =>
                dispatchSpec3Field({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!role2.value || !class2.value || !spec2.value}
            />
            <div className="flex flex-col gap-1 w-[220px] justify-end mb-1">
              <button
                onClick={resetCharacter3}
                className={`${
                  role3.value ? "bg-amber-500" : "bg-gray-500"
                } py-[6px] px-[6px] h-10 w-10 rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300`}
                disabled={!role3.value}
              >
                <RotateCcw />
              </button>
            </div>
          </div>
        </div>
      </Form.Card>
      <StepperControl
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
        isDisabled={false}
      />
    </Fragment>
  );
}

export default Characters;
