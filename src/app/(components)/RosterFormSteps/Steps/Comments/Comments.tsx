"use client";

import Form from "@/app/(components)/Form/FormFragments";
import { Fragment } from "react";
import { TextInputLong } from "@/app/(components)/Form/FormFragments/TextInput";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
import { ACTIONS } from "@/app/contexts/form";

export function Comments() {
  const { additionComments, dispatchAdditionComments } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();

  const { saveValueToLocalStorage } = useLocalStorage();

  function validateForm() {
    return true;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "formComments",
        JSON.stringify({
          additionComments: additionComments.value,
        })
      );
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Additional Comments"
          description="Please provide any additional comments or feedback you may have."
        />

        <div className="mt-5 flex flex-col gap-4">
          <TextInputLong
            label="Additional Comments"
            placeholder="Enter your comments here"
            value={additionComments.value}
            onChange={(value) =>
              dispatchAdditionComments({
                type: ACTIONS.SET_VALUE,
                value,
              })
            }
          />
        </div>
      </Form.Card>
      <StepperControl
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  );
}
