"use client";

import { ScrollText, Coins } from "lucide-react";
import Form from "@/app/(components)/Form/FormFragments";
import { Fragment } from "react";
import { TextInput } from "@/app/(components)/Form/FormFragments/TextInput";
import { StandaloneToggleButton } from "@/app/(components)/Form/FormFragments/TextCheckbox";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { ACTIONS } from "@/app/contexts/form";
import { StepperControl } from "@/app/(components)/Form/StepperControl";

export function Leadership() {
  const {
    recruitInterest,
    setRecruitInterest,
    recruitInterestComment,
    dispatchRecruitInterestComment,
    salesLeadershipInterest,
    setsalesLeadershipInterest,
    salesLeadershipInterestComment,
    dispatchsalesLeadershipInterestComment,
  } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();

  const { saveValueToLocalStorage } = useLocalStorage();

  function validateForm() {
    let formHasError = false;

    if (recruitInterest && !recruitInterestComment.value) {
      dispatchRecruitInterestComment({
        type: ACTIONS.SET_ERROR,
        errorMessage: "",
      });
      formHasError = true;
    }

    if (salesLeadershipInterest && !salesLeadershipInterestComment.value) {
      dispatchsalesLeadershipInterestComment({
        type: ACTIONS.SET_ERROR,
        errorMessage: "",
      });
      formHasError = true;
    }

    return !formHasError;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "formLeadership",
        JSON.stringify({
          recruitInterest,
          recruitInterestComment: recruitInterestComment.value,
          salesLeadershipInterest,
          salesLeadershipInterestComment: salesLeadershipInterestComment.value,
        })
      );
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Leadership Interest"
          description="Are you interested in being part of leadership and helping with any of
          the following:"
        />

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:ml-4">
            <StandaloneToggleButton
              className="w-[140px]"
              label="Recruitment"
              icon={ScrollText}
              value={recruitInterest}
              onChange={setRecruitInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
            <TextInput
              label=""
              placeholder="Provide prior experience or other related comments"
              value={recruitInterestComment.value}
              onChange={(value) =>
                dispatchRecruitInterestComment({
                  type: ACTIONS.SET_VALUE,
                  value,
                })
              }
              errorMessage={recruitInterestComment.errorMessage}
              hasError={recruitInterestComment.hasError}
              clearError={() =>
                dispatchRecruitInterestComment({ type: ACTIONS.CLEAR_ERROR })
              }
              disabled={!recruitInterest}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:ml-4">
            <StandaloneToggleButton
              className="w-[140px]"
              label="Sales"
              icon={Coins}
              value={salesLeadershipInterest}
              onChange={setsalesLeadershipInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
            <TextInput
              label=""
              placeholder="Provide prior experience or other related comments"
              value={salesLeadershipInterestComment.value}
              onChange={(value) =>
                dispatchsalesLeadershipInterestComment({
                  type: ACTIONS.SET_VALUE,
                  value,
                })
              }
              errorMessage={salesLeadershipInterestComment.errorMessage}
              hasError={salesLeadershipInterestComment.hasError}
              clearError={() =>
                dispatchsalesLeadershipInterestComment({
                  type: ACTIONS.CLEAR_ERROR,
                })
              }
              disabled={!salesLeadershipInterest}
            />
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
