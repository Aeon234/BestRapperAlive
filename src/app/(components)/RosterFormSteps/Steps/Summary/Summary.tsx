"use client";

import Form from "@/app/(components)/Form/FormFragments";
import { Fragment, useEffect, useState } from "react";
import { useFormStep } from "@/app/hooks/use-form-step";
import { StepperControl } from "@/app/(components)/Form/StepperControl";
import { useLocalStorage } from "@/app/hooks/use-local-storage";

export function Summary() {
  const { handleNextStep, handlePreviousStep } = useFormStep();
  const { getValueFromLocalStorage } = useLocalStorage();

  const [playerInfo, setPlayerInfo] = useState<any>();
  const [charactersInfo, setCharactersInfo] = useState<any>();
  const [salesEventsInfo, setSalesEventsInfo] = useState<any>();
  const [leadershipInfo, setLeadershipInfo] = useState<any>();
  const [commentsInfo, setCommentsInfo] = useState<any>();

  useEffect(() => {
    setPlayerInfo(getValueFromLocalStorage("formPlayer"));
    setCharactersInfo(getValueFromLocalStorage("formCharacters"));
    setSalesEventsInfo(getValueFromLocalStorage("formSalesEvents"));
    setLeadershipInfo(getValueFromLocalStorage("formLeadership"));
    setCommentsInfo(getValueFromLocalStorage("formComments"));
  }, []); // Add an empty dependency array to ensure this effect runs only once

  function handleGoForwardStep() {
    console.log("Form Submitted");
    console.log("Player Info: ", playerInfo);
    console.log("Characters Info: ", charactersInfo);
    console.log("Sales Events Info: ", salesEventsInfo);
    console.log("Leadership Info: ", leadershipInfo);
    console.log("Comments Info: ", commentsInfo);

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
          {playerInfo && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Player Info
              </h2>
              <p className="text-gray-300">Name: {playerInfo.name}</p>
            </div>
          )}

          {/* Characters Info */}
          {charactersInfo && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Characters
              </h2>
              {charactersInfo.characters.map(
                (character: any, index: number) => (
                  <p key={index} className="text-gray-300">
                    Choice {index + 1}: {character.role} - {character.class} -{" "}
                    {character.spec}
                  </p>
                )
              )}
            </div>
          )}

          {/* Sales & Events Info */}
          {salesEventsInfo && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Sales & Events
              </h2>
              <div className="flex justify-left items-center gap-4">
                <p className="text-gray-300">
                  Sales Interest: {salesEventsInfo.salesInterest ? "Yes" : "No"}
                </p>
                <p className="text-gray-300">
                  Other Games Interest:{" "}
                  {salesEventsInfo.otherGamesInterest ? "Yes" : "No"}
                </p>
                <p className="text-gray-300">
                  Movie Night Interest:{" "}
                  {salesEventsInfo.movieNightInterest ? "Yes" : "No"}
                </p>
              </div>
              <p className="text-gray-300">
                Additional Comments: {salesEventsInfo.otherEventsComment}
              </p>
            </div>
          )}

          {/* Leadership Info */}
          {leadershipInfo && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Leadership
              </h2>
              <div className="flex justify-left items-center gap-4">
                <p className="text-gray-300">
                  Recruitment: {leadershipInfo.recruitInterest ? "Yes" : "No"}
                </p>
                <p className="text-gray-300">
                  Recruitment Comments: {leadershipInfo.recruitInterestComment}
                </p>
              </div>
              <div className="flex justify-left items-center gap-4">
                <p className="text-gray-300">
                  Sales Leadership:{" "}
                  {leadershipInfo.salesLeadershipInterest ? "Yes" : "No"}
                </p>
                <p className="text-gray-300">
                  Sales Leadership Comments:{" "}
                  {leadershipInfo.salesLeadershipInterestComment}
                </p>
              </div>
            </div>
          )}

          {/* Additional Comments */}
          {commentsInfo && (
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Additional Comments
              </h2>
              <p className="text-gray-300">{commentsInfo.additionComments}</p>
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
