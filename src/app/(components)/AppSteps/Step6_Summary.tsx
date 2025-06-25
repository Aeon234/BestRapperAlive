import React from "react";
import { useFormContext } from "react-hook-form";
import { AppFormSchema } from "@/app/Application/AppSchema";

function Summary() {
  const { watch } = useFormContext<AppFormSchema>();

  const {
    playerName,
    role1,
    class1,
    spec1,
    role2,
    class2,
    spec2,
    salesInterest,
    salesComments,
    meleeOfficer,
    rangedOfficer,
    logsOfficer,
    recruitOfficer,
    salesOfficer,
    eventsOfficer,
    officerComments,
    comments,
  } = watch();

  const officerRoles = [
    meleeOfficer && "Melee",
    rangedOfficer && "Ranged",
    logsOfficer && "Logs",
    recruitOfficer && "Recruit",
    salesOfficer && "Sales",
    eventsOfficer && "Events",
  ]
    .filter(Boolean)
    .join(", ");

  const truncate = (text: string, max = 100) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  return (
    <div className="space-y-4">
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Player Name:</strong> {playerName || "—"}
        </li>
        <li>
          <strong>Primary Character:</strong> {role1} / {class1} / {spec1}
        </li>
        {role2 && (
          <li>
            <strong>Secondary Character:</strong> {role2} / {class2} / {spec2}
          </li>
        )}
        <li>
          <strong>Sales Interest:</strong> {salesInterest ? "Yes" : "No"}
        </li>
        {salesInterest && (
          <li>
            <strong>Sales Comments:</strong>{" "}
            {salesComments ? truncate(salesComments) : "—"}
          </li>
        )}
        <li>
          <strong>Leadership Roles:</strong> {officerRoles || "None"}
        </li>
        {officerRoles && (
          <li>
            <strong>Officer Comments:</strong>{" "}
            {officerComments ? truncate(officerComments) : "—"}
          </li>
        )}
        <li>
          <strong>Additional Comments:</strong>{" "}
          {comments ? truncate(comments) : "—"}
        </li>
      </ul>
    </div>
  );
}

export default Summary;
