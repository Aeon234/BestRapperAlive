"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

ChartJS.register(ArcElement, Tooltip, Legend);

const wowRoles: string[] = ["Tank", "Healer", "DPS"];

const wowClasses: string[] = [
  "Death Knight",
  "Demon Hunter",
  "Druid",
  "Evoker",
  "Hunter",
  "Mage",
  "Monk",
  "Paladin",
  "Priest",
  "Rogue",
  "Shaman",
  "Warlock",
  "Warrior",
];

const wowSpecializations: string[] = [
  // Death Knight
  "Blood",
  "Frost",
  "Unholy",
  // Demon Hunter
  "Havoc",
  "Vengeance",
  // Druid
  "Balance",
  "Feral",
  "Guardian",
  "Restoration",
  // Evoker
  "Devastation",
  "Preservation",
  "Augmentation",
  // Hunter
  "Beast Mastery",
  "Marksmanship",
  "Survival",
  // Mage
  "Arcane",
  "Fire",
  "Frost",
  // Monk
  "Brewmaster",
  "Mistweaver",
  "Windwalker",
  // Paladin
  "Holy",
  "Protection",
  "Retribution",
  // Priest
  "Discipline",
  "Holy",
  "Shadow",
  // Rogue
  "Assassination",
  "Outlaw",
  "Subtlety",
  // Shaman
  "Elemental",
  "Enhancement",
  "Restoration",
  // Warlock
  "Affliction",
  "Demonology",
  "Destruction",
  // Warrior
  "Arms",
  "Fury",
  "Protection",
];

const processSheetData = (sheetData: string[][]) => {
  // Step 1: Remove the first record if it starts with "Date Submitted"
  const headerRow = sheetData[0];
  const dataRows =
    headerRow[0] === "Date Submitted" ? sheetData.slice(1) : sheetData;

  // Step 2.1: Extract roles
  const roles = dataRows
    // .flatMap((row) => [row[2], row[5], row[8]])
    .flatMap((row) => [row[2]])
    .filter((role) => role && role !== "undefined");

  // Step 2.2: Extract classes
  const classes = dataRows
    // .flatMap((row) => [row[3], row[6], row[9]])
    .flatMap((row) => [row[3]])
    .filter((cls) => cls && cls !== "undefined");

  // Step 2.3: Extract specializations
  const specializations = dataRows
    // .flatMap((row) => [row[4], row[7], row[10]])
    .flatMap((row) => [row[4]])
    .filter((spec) => spec && spec !== "undefined");

  // Step 3.1: Count occurrences of each role
  const roleCounts = wowRoles.map(
    (role) => roles.filter((r) => r === role).length
  );

  // Step 3.2: Count occurrences of each class
  const classCounts = wowClasses.map(
    (cls) => classes.filter((c) => c === cls).length
  );

  // Step 3.3: Count occurrences of each specialization
  const specCounts = wowSpecializations.map(
    (spec) => specializations.filter((c) => c === spec).length
  );

  return {
    uniqueRoles: wowRoles,
    roleCounts,
    uniqueClasses: wowClasses,
    classCounts,
    uniqueSpecs: wowSpecializations,
    specCounts,
  };
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function RosterData() {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbz0vbKj0oXK6H_kweUXmmd-xIvz9x3VBlrO8LPCIaqhxsuYzX10hmOTD6c-vdUoSp3k/exec";

  const [uniqueRoles, setUniqueRoles] = useState<string[]>([]);
  const [roleCounts, setRoleCounts] = useState<number[]>([]);
  const [uniqueClasses, setUniqueClasses] = useState<string[]>([]);
  const [classCounts, setClassCounts] = useState<number[]>([]);
  const [uniqueSpecs, setUniqueSpecs] = useState<string[]>([]);
  const [specCounts, setSpecCounts] = useState<number[]>([]);
  const [sheetData, setSheetData] = useState<string[][]>([]);

  useEffect(() => {
    fetch(`${scriptUrl}?method=GET`, {
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const sheetData = JSON.parse(result);
        console.log(sheetData);

        // Process the sheet data
        const {
          uniqueRoles,
          roleCounts,
          uniqueClasses,
          classCounts,
          uniqueSpecs,
          specCounts,
        } = processSheetData(sheetData);
        setUniqueRoles(uniqueRoles);
        setRoleCounts(roleCounts);
        setUniqueClasses(uniqueClasses);
        setClassCounts(classCounts);
        setUniqueSpecs(uniqueSpecs);
        setSpecCounts(specCounts);
        setSheetData(sheetData); // Save the sheet data
      })
      .catch((error) => console.log("error", error));
  }, []);

  const roleData = {
    labels: uniqueRoles,
    datasets: [
      {
        label: "   #",
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
        label: "   #",
        data: classCounts,
        backgroundColor: [
          "rgba(196, 30, 59, 1)", // Death Knight
          "rgba(163, 48, 201, 1)", // Demon Hunter
          "rgba(255, 125, 10, 1)", // Druid
          "rgba(51, 147, 127, 1)", // Evoker
          "rgba(170, 211, 114, 1)", // Hunter
          "rgba(63, 199, 235, 1)", // Mage
          "rgba(0, 255, 150, 1)", // Monk
          "rgba(244, 140, 186, 1)", // Paladin
          "rgba(255, 255, 255, 1)", // Priest
          "rgba(255, 245, 105, 1)", // Rogue
          "rgba(0, 112, 222, 1)", // Shaman
          "rgba(135, 135, 237, 1)", // Warlock
          "rgba(199, 156, 110, 1)", // Warrior
        ],
        borderColor: [
          "rgba(196, 30, 59, 1)", // Death Knight
          "rgba(163, 48, 201, 1)", // Demon Hunter
          "rgba(255, 125, 10, 1)", // Druid
          "rgba(51, 147, 127, 1)", // Evoker
          "rgba(170, 211, 114, 1)", // Hunter
          "rgba(63, 199, 235, 1)", // Mage
          "rgba(0, 255, 150, 1)", // Monk
          "rgba(244, 140, 186, 1)", // Paladin
          "rgba(255, 255, 255, 1)", // Priest
          "rgba(255, 245, 105, 1)", // Rogue
          "rgba(0, 112, 222, 1)", // Shaman
          "rgba(135, 135, 237, 1)", // Warlock
          "rgba(199, 156, 110, 1)", // Warrior
        ],
        borderWidth: 1,
      },
    ],
  };

  const specData = {
    labels: uniqueSpecs,
    datasets: [
      {
        label: "   #",
        data: specCounts,
        backgroundColor: [
          // Death Knight
          "rgba(196, 30, 59, 1)", // Blood
          "rgba(196, 30, 59, 1)", // Frost
          "rgba(196, 30, 59, 1)", // Unholy
          // Demon Hunter
          "rgba(163, 48, 201, 1)", // Havoc
          "rgba(163, 48, 201, 1)", // Vengeance
          // Druid
          "rgba(255, 125, 10, 1)", // Balance
          "rgba(255, 125, 10, 1)", // Feral
          "rgba(255, 125, 10, 1)", // Guardian
          "rgba(255, 125, 10, 1)", // Restoration
          // Evoker
          "rgba(51, 147, 127, 1)", // Devastation
          "rgba(51, 147, 127, 1)", // Preservation
          "rgba(51, 147, 127, 1)", // Augmentation
          // Hunter
          "rgba(170, 211, 114, 1)", // Beast Mastery
          "rgba(170, 211, 114, 1)", // Marksmanship
          "rgba(170, 211, 114, 1)", // Survival
          // Mage
          "rgba(63, 199, 235, 1)", // Arcane
          "rgba(63, 199, 235, 1)", // Fire
          "rgba(63, 199, 235, 1)", // Frost
          // Monk
          "rgba(0, 255, 150, 1)", // Brewmaster
          "rgba(0, 255, 150, 1)", // Mistweaver
          "rgba(0, 255, 150, 1)", // Windwalker
          // Paladin
          "rgba(244, 140, 186, 1)", // Holy
          "rgba(244, 140, 186, 1)", // Protection
          "rgba(244, 140, 186, 1)", // Retribution
          // Priest
          "rgba(255, 255, 255, 1)", // Discipline
          "rgba(255, 255, 255, 1)", // Holy
          "rgba(255, 255, 255, 1)", // Shadow
          // Rogue
          "rgba(255, 245, 105, 1)", // Assassination
          "rgba(255, 245, 105, 1)", // Outlaw
          "rgba(255, 245, 105, 1)", // Subtlety
          // Shaman
          "rgba(0, 112, 222, 1)", // Elemental
          "rgba(0, 112, 222, 1)", // Enhancement
          "rgba(0, 112, 222, 1)", // Restoration
          // Warlock
          "rgba(135, 135, 237, 1)", // Affliction
          "rgba(135, 135, 237, 1)", // Demonology
          "rgba(135, 135, 237, 1)", // Destruction
          // Warrior
          "rgba(199, 156, 110, 1)", // Arms
          "rgba(199, 156, 110, 1)", // Fury
          "rgba(199, 156, 110, 1)", // Protection
        ],
        borderColor: [
          // Death Knight
          "rgba(196, 30, 59, 1)", // Blood
          "rgba(196, 30, 59, 1)", // Frost
          "rgba(196, 30, 59, 1)", // Unholy
          // Demon Hunter
          "rgba(163, 48, 201, 1)", // Havoc
          "rgba(163, 48, 201, 1)", // Vengeance
          // Druid
          "rgba(255, 125, 10, 1)", // Balance
          "rgba(255, 125, 10, 1)", // Feral
          "rgba(255, 125, 10, 1)", // Guardian
          "rgba(255, 125, 10, 1)", // Restoration
          // Evoker
          "rgba(51, 147, 127, 1)", // Devastation
          "rgba(51, 147, 127, 1)", // Preservation
          "rgba(51, 147, 127, 1)", // Augmentation
          // Hunter
          "rgba(170, 211, 114, 1)", // Beast Mastery
          "rgba(170, 211, 114, 1)", // Marksmanship
          "rgba(170, 211, 114, 1)", // Survival
          // Mage
          "rgba(63, 199, 235, 1)", // Arcane
          "rgba(63, 199, 235, 1)", // Fire
          "rgba(63, 199, 235, 1)", // Frost
          // Monk
          "rgba(0, 255, 150, 1)", // Brewmaster
          "rgba(0, 255, 150, 1)", // Mistweaver
          "rgba(0, 255, 150, 1)", // Windwalker
          // Paladin
          "rgba(244, 140, 186, 1)", // Holy
          "rgba(244, 140, 186, 1)", // Protection
          "rgba(244, 140, 186, 1)", // Retribution
          // Priest
          "rgba(255, 255, 255, 1)", // Discipline
          "rgba(255, 255, 255, 1)", // Holy
          "rgba(255, 255, 255, 1)", // Shadow
          // Rogue
          "rgba(255, 245, 105, 1)", // Assassination
          "rgba(255, 245, 105, 1)", // Outlaw
          "rgba(255, 245, 105, 1)", // Subtlety
          // Shaman
          "rgba(0, 112, 222, 1)", // Elemental
          "rgba(0, 112, 222, 1)", // Enhancement
          "rgba(0, 112, 222, 1)", // Restoration
          // Warlock
          "rgba(135, 135, 237, 1)", // Affliction
          "rgba(135, 135, 237, 1)", // Demonology
          "rgba(135, 135, 237, 1)", // Destruction
          // Warrior
          "rgba(199, 156, 110, 1)", // Arms
          "rgba(199, 156, 110, 1)", // Fury
          "rgba(199, 156, 110, 1)", // Protection
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="RosterApp animated animatedFadeInUp fadeInUp">
      <h1 className="text-2xl text-white font-bold text-center m-2">
        Roster Data
      </h1>
      <h2 className="text-xl text-white  text-center">
        Across all 3 character preferences
      </h2>
      <div className="flex flex-wrap justify-between items-start space-x-4 text-center">
        <div className="text-white p-10 rounded shadow-lg flex-1 min-w-[300px]">
          <h1 className="text-xl text-white font-bold">Role Breakdown</h1>
          {uniqueRoles.length > 0 ? (
            <Pie data={roleData} />
          ) : (
            <Stack spacing={1}>
              <Skeleton
                sx={{ bgcolor: "grey.800" }}
                variant="circular"
                width={570}
                height={570}
              />
            </Stack>
          )}
        </div>
        <div className="text-white p-10 rounded shadow-lg flex-1 min-w-[300px]">
          <h1 className="text-xl text-white font-bold">Class Breakdown</h1>
          {uniqueClasses.length > 0 ? (
            <Pie data={classData} />
          ) : (
            <Stack spacing={1}>
              <Skeleton
                sx={{ bgcolor: "grey.800" }}
                variant="circular"
                width={570}
                height={570}
              />
            </Stack>
          )}
        </div>
      </div>
      <div className="text-white p-10 rounded shadow-lg flex-1">
        <h1 className="text-xl text-white font-bold text-center m-2">
          Specialization Breakdown
        </h1>
        {uniqueSpecs.length > 0 ? (
          <Bar
            data={specData}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#E5E7EB",
                  },
                },
                y: {
                  grid: {
                    color: "RGBA(229, 231, 235,0.3)",
                  },
                  ticks: {
                    color: "#E5E7EB",
                  },
                },
              },
            }}
          />
        ) : (
          <Stack spacing={1}>
            <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
            <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
            <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
            <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
            <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
            <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
          </Stack>
        )}
      </div>
      <div className="text-white p-10 rounded shadow-lg flex-1">
        <h1 className="text-xl text-white font-bold text-center">
          Submissions
        </h1>
        {uniqueSpecs ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {[
                    "Date Submitted",
                    "Name",
                    "Role 1",
                    "Class 1",
                    "Spec 1",
                    "Role 2",
                    "Class 2",
                    "Spec 2",
                    "Role 3",
                    "Class 3",
                    "Spec 3",
                  ].map((header) => (
                    <TableCell key={header}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sheetData.slice(1).map((row, index) => (
                  <TableRow key={index}>
                    {row.slice(0, 11).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {cellIndex === 0 ? formatDate(cell) : cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Skeleton sx={{ bgcolor: "grey.800" }} height={102} />
        )}
      </div>
    </div>
  );
}

export default RosterData;
