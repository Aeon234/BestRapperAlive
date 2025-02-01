"use client";

import Form from "@/app/(components)/Form/FormFragments";
import { Fragment, useContext } from "react";
// import { useRouter } from "next/router";
import { useFormStep } from "@/app/hooks/use-form-step";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
import { FormContext } from "@/app/contexts/form";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

export function Summary() {
  const { handlePreviousStep } = useFormStep();
  const {
    nameField,
    role1,
    class1,
    spec1,
    role2,
    class2,
    spec2,
    role3,
    class3,
    spec3,
    salesInterest,
    otherGamesInterest,
    movieNightInterest,
    otherEventsComment,
    meleeOfficerInterest,
    meleeOfficerInterestComment,
    rangedOfficerInterest,
    rangedOfficerInterestComment,
    recruitInterest,
    recruitInterestComment,
    salesLeadershipInterest,
    salesLeadershipInterestComment,
    additionComments,
    characterError,
    setCharacterError,
    isSubmitting,
    setIsSubmitting,
    router,
  } = useContext(FormContext);

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbz0vbKj0oXK6H_kweUXmmd-xIvz9x3VBlrO8LPCIaqhxsuYzX10hmOTD6c-vdUoSp3k/exec";

  function handleGoForwardStep() {
    // Validate before beginning submission
    const characters = [
      { role: role1.value, class: class1.value, spec: spec1.value },
      { role: role2.value, class: class2.value, spec: spec2.value },
      { role: role3.value, class: class3.value, spec: spec3.value },
    ];

    const isValidEntry = characters.some(
      (char) => char.role && char.class && char.spec
    );

    const hasPartialEntry = characters.some(
      (char) =>
        (char.role || char.class || char.spec) &&
        !(char.role && char.class && char.spec)
    );

    if (!isValidEntry || hasPartialEntry) {
      setCharacterError(
        "Characters are missing or incomplete. Go back and fill out the character sheet before submitting again."
      );
      setIsSubmitting(false);
      return;
    }

    // Clear existing errors
    setCharacterError(null);
    setIsSubmitting(true);

    // Prep Data
    const formData = new FormData();

    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    formData.append("Date Submitted", formattedDate);
    formData.append("Name", nameField.value);
    formData.append("Role 1", role1.value ?? "");
    formData.append("Class 1", class1.value ?? "");
    formData.append("Spec 1", spec1.value ?? "");
    formData.append("Role 2", role2.value ?? "");
    formData.append("Class 2", class2.value ?? "");
    formData.append("Spec 2", spec2.value ?? "");
    formData.append("Role 3", role3.value ?? "");
    formData.append("Class 3", class3.value ?? "");
    formData.append("Spec 3", spec3.value ?? "");
    formData.append("Sales Interest", salesInterest.toString());
    formData.append("Other Games Interest", otherGamesInterest.toString());
    formData.append("Movie Night Interest", movieNightInterest.toString());
    formData.append("Other Events Comments", otherEventsComment.value);

    formData.append("Melee Officer Interest", meleeOfficerInterest.toString());
    formData.append(
      "Melee Officer Interest Comments",
      meleeOfficerInterestComment.value
    );
    formData.append(
      "Ranged Officer Interest",
      rangedOfficerInterest.toString()
    );
    formData.append(
      "Ranged Officer Interest Comments",
      rangedOfficerInterestComment.value
    );

    formData.append("Recruiting Interest", recruitInterest.toString());
    formData.append(
      "Recruiting Interest Comments",
      recruitInterestComment.value
    );
    formData.append("Sales Lead Interest", salesLeadershipInterest.toString());
    formData.append(
      "Sales Lead Interest Comments",
      salesLeadershipInterestComment.value
    );
    formData.append("Additional Comments", additionComments.value);

    // Handle Submission
    fetch(scriptUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form Submitted");
          setIsSubmitting(false);
          router.push("/rosterData");
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
        setIsSubmitting(false);
      });

    // handleNextStep();
  }

  return (
    <Fragment>
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isSubmitting ? "opacity-100 visible" : "opacity-0 collapse"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center bg-gray-600 p-5 rounded shadow-lg bg-opacity-80 unselectable font-bold text-lg text-gray-100">
            <CircularProgress
              size={80}
              thickness={5}
              variant="indeterminate"
              sx={{ "svg circle": { stroke: "#F59E0B" } }}
            />
            <p className="mt-2">Submitting...</p>
          </div>
        </div>
      </div>

      <Form.Card>
        <Form.Header
          title="Summary"
          description="Review the information you have entered."
        />

        <div className="mt-5 flex flex-col gap-4">
          {/* Player Info */}
          {nameField.value && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Player Info
              </h2>
              <p className="text-gray-300">Name: {nameField.value}</p>
            </div>
          )}

          {/* Characters Info */}
          <div>
            <h2
              className={`text-lg font-semibold ${
                characterError ? "text-red-500" : "text-gray-100"
              }`}
            >
              Characters
            </h2>
            {characterError && (
              <p className="text-red-500 text-sm">
                {characterError?.toString()}
              </p>
            )}
            {[role1, role2, role3].map((role, index) => {
              const characterClass = [class1, class2, class3][index];
              const spec = [spec1, spec2, spec3][index];
              return (
                role.value && (
                  <p key={index} className="text-gray-300">
                    Choice {index + 1}: {role.value} - {characterClass.value} -{" "}
                    {spec.value}
                  </p>
                )
              );
            })}
          </div>

          {/* Sales & Events Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-100">
              Sales & Events
            </h2>
            <div className="flex justify-left items-center gap-4">
              <p className="text-gray-300">
                Sales Interest: {salesInterest ? "Yes" : "No"}
              </p>
              <p className="text-gray-300">
                Other Games Interest: {otherGamesInterest ? "Yes" : "No"}
              </p>
              <p className="text-gray-300">
                Movie Night Interest: {movieNightInterest ? "Yes" : "No"}
              </p>
            </div>
            <p className="text-gray-300">
              Additional Comments: {otherEventsComment.value}
            </p>
          </div>

          {/* Leadership Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Leadership</h2>

            <div className="flex justify-left items-center gap-4">
              <p className="text-gray-300">
                Recruitment: {meleeOfficerInterest ? "Yes" : "No"}
              </p>
              <p className="text-gray-300">
                Recruitment Comments: {meleeOfficerInterestComment.value}
              </p>
            </div>

            <div className="flex justify-left items-center gap-4">
              <p className="text-gray-300">
                Recruitment: {rangedOfficerInterest ? "Yes" : "No"}
              </p>
              <p className="text-gray-300">
                Recruitment Comments: {rangedOfficerInterestComment.value}
              </p>
            </div>

            <div className="flex justify-left items-center gap-4">
              <p className="text-gray-300">
                Recruitment: {recruitInterest ? "Yes" : "No"}
              </p>
              <p className="text-gray-300">
                Recruitment Comments: {recruitInterestComment.value}
              </p>
            </div>
            <div className="flex justify-left items-center gap-4">
              <p className="text-gray-300">
                Sales Leadership: {salesLeadershipInterest ? "Yes" : "No"}
              </p>
              <p className="text-gray-300">
                Sales Leadership Comments:{" "}
                {salesLeadershipInterestComment.value}
              </p>
            </div>
          </div>

          {/* Additional Comments */}
          {additionComments.value && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Additional Comments
              </h2>
              <p className="text-gray-300">{additionComments.value}</p>
            </div>
          )}
        </div>
      </Form.Card>
      <StepperControl
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
        isDisabled={isSubmitting}
      />
    </Fragment>
  );
}
