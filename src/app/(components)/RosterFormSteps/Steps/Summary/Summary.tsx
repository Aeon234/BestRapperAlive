"use client";

import Form from "@/app/(components)/Form/FormFragments";
import { Fragment, useContext } from "react";
import { useForm } from "@/app/hooks/use-form";
import { useFormStep } from "@/app/hooks/use-form-step";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
// import { FormContext } from "@/app/context/FormContext"; // Adjust the path based on your folder structure
import { FormContext } from "@/app/contexts/form";

export function Summary() {
  const { handleNextStep, handlePreviousStep } = useFormStep();
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
    recruitInterest,
    recruitInterestComment,
    salesLeadershipInterest,
    salesLeadershipInterestComment,
    additionComments,
  } = useContext(FormContext);

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbyk0fXddO5b7SOyGtfjlXKaf_XmgMpIQ4AlXqTVwba7OwL6PQVfAeakvGZmRqg47IQw/exec";
  const SubmittingInProgress = false;

  function handleGoForwardStep() {
    console.log("Form Submitted");
    console.log("Player Info:", { name: nameField.value });
    console.log("Characters Info:", [
      { role: role1.value, class: class1.value, spec: spec1.value },
      { role: role2.value, class: class2.value, spec: spec2.value },
      { role: role3.value, class: class3.value, spec: spec3.value },
    ]);
    console.log("Sales Events Info:", {
      salesInterest,
      otherGamesInterest,
      movieNightInterest,
      otherEventsComment: otherEventsComment.value,
    });
    console.log("Leadership Info:", {
      recruitInterest,
      recruitInterestComment: recruitInterestComment.value,
      salesLeadershipInterest,
      salesLeadershipInterestComment: salesLeadershipInterestComment.value,
    });
    console.log("Additional Comments:", additionComments.value);

    // Submission
    // Prep Data
    const formData = new FormData();

    formData.append("Date Submitted", Date());
    formData.append("Name", nameField.value);
    formData.append("Role 1", role1.value);
    formData.append("Class 1", class1.value);
    formData.append("Spec 1", spec1.value);
    formData.append("Role 2", role2.value);
    formData.append("Class 2", class2.value);
    formData.append("Spec 2", spec2.value);
    formData.append("Role 3", role3.value);
    formData.append("Class 3", class3.value);
    formData.append("Spec 3", spec3.value);
    formData.append("Sales Interest", salesInterest.toString());
    formData.append("Other Games Interest", otherGamesInterest.toString());
    formData.append("Movie Night Interest", movieNightInterest.toString());
    formData.append("Other Events Comments", otherEventsComment.value);
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
          // setIsSubmittedPopUpVisible(!isSubmittedPopupVisible);
          console.log("Form Submitted");
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    // handleNextStep();
  }

  return (
    <Fragment>
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
            <h2 className="text-lg font-semibold text-gray-100">Characters</h2>
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
      />
    </Fragment>
  );
}
