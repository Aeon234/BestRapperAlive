"use client";

import Form from "@/app/(components)/Form/FormFragments";
import { Fragment } from "react";
import { TextInput } from "@/app/(components)/Form/FormFragments/TextInput";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { ACTIONS } from "@/app/contexts/form";
import { StepperControl } from "@/app/(components)/Form/StepperControl";

export function Player() {
  const { nameField, dispatchNameField } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();

  const { saveValueToLocalStorage } = useLocalStorage();

  function validateForm() {
    let formHasError = false;

    if (!nameField.value) {
      dispatchNameField({
        type: ACTIONS.SET_ERROR,
        errorMessage: "Name is required",
      });
      formHasError = true;
    }

    return !formHasError;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "formPlayer",
        JSON.stringify({
          name: nameField.value,
        })
      );
      handleNextStep();
    }
  }
  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Player Info"
          description="Please provide the player name everyone knows you by."
        />

        <div className="mt-5 flex flex-col gap-4">
          <TextInput
            label="Name"
            placeholder="e.g. Aeon"
            value={nameField.value}
            onChange={(value: string) =>
              dispatchNameField({ type: ACTIONS.SET_VALUE, value })
            }
            errorMessage={nameField.errorMessage}
            clearError={() => dispatchNameField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={nameField.hasError}
          />
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
