"use client";

import { ScrollText, Coins, Wand, Sword } from "lucide-react";
import Form from "@/app/(components)/Form/FormFragments";
import { Fragment } from "react";
import { TextInput } from "@/app/(components)/Form/FormFragments/TextInput";
import { StandaloneToggleButton } from "@/app/(components)/Form/FormFragments/TextCheckbox";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { ACTIONS } from "@/app/contexts/form";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
import Divider from "@mui/material/Divider";

export function Leadership() {
  const {
    meleeOfficerInterest,
    setMeleeOfficerInterest,
    meleeOfficerInterestComment,
    dispatchmeleeOfficerInterestComment,
    rangedOfficerInterest,
    setRangedOfficerInterest,
    rangedOfficerInterestComment,
    dispatchRangedOfficerInterestComment,
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

    if (meleeOfficerInterest && !meleeOfficerInterestComment.value) {
      dispatchmeleeOfficerInterestComment({
        type: ACTIONS.SET_ERROR,
        errorMessage: "",
      });
      formHasError = true;
    }

    if (rangedOfficerInterest && !rangedOfficerInterestComment.value) {
      dispatchRangedOfficerInterestComment({
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
          meleeOfficerInterest,
          meleeOfficerInterestComment: meleeOfficerInterestComment.value,
          rangedOfficerInterest,
          rangedOfficerInterestComment: rangedOfficerInterestComment.value,
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
          description="We are thinking of potentially expanding leadership. While nothing is set in stone just yet, if we were to have either of the two positions below or wanted to expand into doing recruitment and sales we want to see who would be interested in putting their name in the ring for consideration. Are you interested in being part of leadership and helping with any of
          the following:"
        />

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:ml-4">
            <StandaloneToggleButton
              className="w-[180px]"
              label="Melee Officer"
              icon={Sword}
              value={meleeOfficerInterest}
              onChange={setMeleeOfficerInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
            <TextInput
              label=""
              placeholder="Provide prior experience or other related comments"
              value={meleeOfficerInterestComment?.value ?? ""}
              onChange={(value) =>
                dispatchmeleeOfficerInterestComment({
                  type: ACTIONS.SET_VALUE,
                  value,
                })
              }
              errorMessage={meleeOfficerInterestComment.errorMessage}
              hasError={meleeOfficerInterestComment.hasError}
              clearError={() =>
                dispatchmeleeOfficerInterestComment({
                  type: ACTIONS.CLEAR_ERROR,
                })
              }
              disabled={!meleeOfficerInterest}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:ml-4">
            <StandaloneToggleButton
              className="w-[180px]"
              label="Ranged Officer"
              icon={Wand}
              value={rangedOfficerInterest}
              onChange={setRangedOfficerInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
            <TextInput
              label=""
              placeholder="Provide prior experience or other related comments"
              value={rangedOfficerInterestComment.value}
              onChange={(value) =>
                dispatchRangedOfficerInterestComment({
                  type: ACTIONS.SET_VALUE,
                  value,
                })
              }
              errorMessage={rangedOfficerInterestComment.errorMessage}
              hasError={rangedOfficerInterestComment.hasError}
              clearError={() =>
                dispatchRangedOfficerInterestComment({
                  type: ACTIONS.CLEAR_ERROR,
                })
              }
              disabled={!rangedOfficerInterest}
            />
          </div>
          <Divider sx={{ bgcolor: "white" }} />
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:ml-4">
            <StandaloneToggleButton
              className="w-[180px]"
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
              className="w-[180px]"
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
