"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const processSheetData = (sheetData: string[][]) => {
  // Step 1: Remove the first record if it starts with "Date Submitted"
  const headerRow = sheetData[0];
  const dataRows =
    headerRow[0] === "Date Submitted" ? sheetData.slice(1) : sheetData;

  // Step 2: Extract roles from Role 1, Role 2, and Role 3 columns (indices 2, 5, 8)
  const roles = dataRows
    .flatMap((row) => [row[2], row[5], row[8]])
    .filter((role) => role && role !== "undefined");

  // Step 2.1: Extract classes from Class 1, Class 2, and Class 3 columns (indices 3, 6, 9)
  const classes = dataRows
    .flatMap((row) => [row[3], row[6], row[9]])
    .filter((cls) => cls && cls !== "undefined");

  // Step 3: Extract unique roles
  const uniqueRoles = Array.from(new Set(roles));

  // Step 3.1: Extract unique classes and sort them alphabetically
  const uniqueClasses = Array.from(new Set(classes)).sort();

  // Step 4: Count occurrences of each role
  const roleCounts = uniqueRoles.map(
    (role) => roles.filter((r) => r === role).length
  );

  // Step 4.1: Count occurrences of each class
  const classCounts = uniqueClasses.map(
    (cls) => classes.filter((c) => c === cls).length
  );

  // Step 5: Ensure roles are ordered as Tank, Healer, DPS
  const orderedRoles = ["Tank", "Healer", "DPS"];
  const orderedRoleCounts = orderedRoles.map(
    (role) => roleCounts[uniqueRoles.indexOf(role)] || 0
  );

  return {
    uniqueRoles: orderedRoles,
    roleCounts: orderedRoleCounts,
    uniqueClasses,
    classCounts,
  };
};

function RosterData() {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbz0vbKj0oXK6H_kweUXmmd-xIvz9x3VBlrO8LPCIaqhxsuYzX10hmOTD6c-vdUoSp3k/exec";

  const [uniqueRoles, setUniqueRoles] = useState<string[]>([]);
  const [roleCounts, setRoleCounts] = useState<number[]>([]);
  const [uniqueClasses, setUniqueClasses] = useState<string[]>([]);
  const [classCounts, setClassCounts] = useState<number[]>([]);

  useEffect(() => {
    fetch(`${scriptUrl}?method=GET`, {
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const sheetData = JSON.parse(result);
        console.log(sheetData);

        // Process the sheet data
        const { uniqueRoles, roleCounts, uniqueClasses, classCounts } =
          processSheetData(sheetData);
        setUniqueRoles(uniqueRoles);
        setRoleCounts(roleCounts);
        setUniqueClasses(uniqueClasses);
        setClassCounts(classCounts);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const roleData = {
    labels: uniqueRoles,
    datasets: [
      {
        label: " # of players",
        data: roleCounts,
        backgroundColor: [
          "rgba(0,112,221, 0.9)",
          "rgba(51,147,127, 0.9)",
          "rgba(196,30,58, 0.9)",
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(0,112,221, 1)",
          "rgba(76, 163, 128, 1)",
          "rgba(196,30,58, 1)",
          // "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const classData = {
    labels: uniqueClasses,
    datasets: [
      {
        label: " # of players",
        data: classCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="RosterApp animated animatedFadeInUp fadeInUp h-[900px] max-h-[1000px]">
      <h1 className="text-2xl text-white font-bold text-center m-2">
        Roster Data
      </h1>
      <div className="flex justify-between items-start space-x-4 text-center">
        <div className=" text-white p-10 rounded shadow-lg flex-1">
          <h1 className="text-xl text-white font-bold">Role Breakdown</h1>
          <Pie data={roleData} />
        </div>
        <div className="bg-slate-800 text-white p-10 rounded shadow-lg flex-1">
          <h1 className="text-xl text-white font-bold">Class Breakdown</h1>
          <Pie data={classData} />
        </div>
      </div>
      <div className="bg-slate-800 text-white p-10 rounded shadow-lg flex-1">
        <h1 className="text-xl text-white font-bold text-center">
          Specialization Breakdown
        </h1>
      </div>
    </div>
  );
}

export default RosterData;
