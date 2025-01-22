"use client";

import { Coins, Gamepad2, Popcorn } from "lucide-react";
import Form from "@/app/(components)/Form/FormFragments";
import { Fragment } from "react";
import { ToggleButtonDesc } from "@/app/(components)/Form/FormFragments/TextCheckbox";
import { TextInputLong } from "@/app/(components)/Form/FormFragments/TextInput";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { useLocalStorage } from "@/app/hooks/use-local-storage";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
import { ACTIONS } from "@/app/contexts/form";

export function SalesEvents() {
  const {
    salesInterest,
    setSalesInterest,
    otherGamesInterest,
    setOtherGamesInterest,
    movieNightInterest,
    setMovieNightInterest,
    otherEventsComment,
    dispatchOtherEventsComment,
  } = useForm();

  const { handleNextStep, handlePreviousStep } = useFormStep();

  const { saveValueToLocalStorage } = useLocalStorage();

  function validateForm() {
    return true;
  }

  function handleGoForwardStep() {
    const isValid = validateForm();
    if (isValid) {
      saveValueToLocalStorage(
        "formSalesEvents",
        JSON.stringify({
          salesInterest,
          otherGamesInterest,
          movieNightInterest,
          otherEventsComment: otherEventsComment.value,
        })
      );
      handleNextStep();
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Sales & Events Interest"
          description="Are you interested in participating in any of the following activities?"
        />

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex gap-8 ml-4">
            <ToggleButtonDesc
              className=""
              label="Sales"
              description="Guild should do sales"
              icon={Coins}
              value={salesInterest}
              onChange={setSalesInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
            <ToggleButtonDesc
              className=""
              label="Other Games"
              description="Host events for other games"
              icon={Gamepad2}
              value={otherGamesInterest}
              onChange={setOtherGamesInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
            <ToggleButtonDesc
              className=""
              label="Movie Night"
              description="Host movie nights"
              icon={Popcorn}
              value={movieNightInterest}
              onChange={setMovieNightInterest}
              errorMessage=""
              hasError={false}
              clearError={() => {}}
            />
          </div>

          <TextInputLong
            label="Additional Comments"
            placeholder="Enter your comments here"
            value={otherEventsComment.value}
            onChange={(value) =>
              dispatchOtherEventsComment({
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
        isDisabled={false}
      />
    </Fragment>
  );
}
