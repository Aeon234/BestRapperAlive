"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";

import WowheadItemSelection from "../(components)/WowheadItem";

function Wishlist() {
  const [playerName, setPlayerName] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    {
      slot: string;
      slot2: string;
      boss: string;
      name: string;
    }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [showPopup, setShowPopup] = useState(false); // New state for showing popup

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure the script runs only once
      if (!document.getElementById("wowhead-tooltip-script")) {
        const script = document.createElement("script");
        script.src = "https://wow.zamimg.com/js/tooltips.js";
        script.id = "wowhead-tooltip-script";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const items = [
    {
      id: 230197,
      name: "Geargrinder's Spare Keys",
      ilvl: 662,
      boss: "Vexie and the Geargrinders",
      bossnum: 1,
      bonus: '"11991:4824"',
      slot: "Trinket",
      slot2: "Primary Stat",
      isSelected: false,
    },
    {
      id: 230019,
      name: "Vexie's Pit Whistle",
      ilvl: 662,
      boss: "Vexie and the Geargrinders",
      bossnum: 1,
      bonus: '"11991:4824"',
      slot: "Trinket",
      slot2: "Agility/Strength",
      isSelected: false,
    },
    {
      id: 230190,
      name: "Torq's Big Red Button",
      ilvl: 665,
      boss: "Cauldron of Carnage",
      bossnum: 2,
      bonus: '"11992:4824"',
      slot: "Trinket",
      slot2: "Strength",
      isSelected: false,
    },
    {
      id: 230191,
      name: "Flarendo's Pilot Light",
      ilvl: 665,
      boss: "Cauldron of Carnage",
      bossnum: 2,
      bonus: '"11992:4824"',
      slot: "Trinket",
      slot2: "Intellect",
      isSelected: false,
    },
    {
      id: 230194,
      name: "Reverb Radio",
      ilvl: 665,
      boss: "Rik Reverb",
      bossnum: 3,
      bonus: '"11992:4824"',
      slot: "Trinket",
      slot2: "Primary Stat",
      isSelected: false,
    },
    {
      id: 230189,
      name: "Junkmaestro's Mega Magnet",
      ilvl: 668,
      boss: "Stix Bunkjunker",
      bossnum: 4,
      bonus: '"11992:4824"',
      slot: "Trinket",
      slot2: "Agility",
      isSelected: false,
    },
    {
      id: 230026,
      name: "Scrapfield 9001",
      ilvl: 668,
      boss: "Stix Bunkjunker",
      bossnum: 4,
      bonus: '"11992:4824"',
      slot: "Trinket",
      slot2: "Agility/Strength (Tank)",
      isSelected: false,
    },
    {
      id: 230186,
      name: "Mister Pick-Me-Up",
      ilvl: 665,
      boss: "Sprocketmonger Lockenstock",
      bossnum: 5,
      bonus: '"11993:4824"',
      slot: "Trinket",
      slot2: "Intellect (Healer)",
      isSelected: false,
    },
    {
      id: 230193,
      name: "Mister Lock-N-Stalk",
      ilvl: 665,
      boss: "Sprocketmonger Lockenstock",
      bossnum: 5,
      bonus: '"11993:4824"',
      slot: "Trinket",
      slot2: "Haste",
      isSelected: false,
    },
    {
      id: 230027,
      name: "House of Cards",
      ilvl: 668,
      boss: "One-Armed Bandit",
      bossnum: 6,
      bonus: '"11993:4824"',
      slot: "Trinket",
      slot2: "Primary Stat",
      isSelected: false,
    },
    {
      id: 230188,
      name: "Gallagio Bottle Service",
      ilvl: 668,
      boss: "One-Armed Bandit",
      bossnum: 6,
      bonus: '"11994:4824"',
      slot: "Trinket",
      slot2: "Haste (Healer)",
      isSelected: false,
    },
    {
      id: 230199,
      name: "Zee's Thug Hotline",
      ilvl: 672,
      boss: "Mug'Zee",
      bossnum: 7,
      bonus: '"11994:4824"',
      slot: "Trinket",
      slot2: "Agility/Strength",
      isSelected: false,
    },
    {
      id: 230192,
      name: "Mug's Moxie Jug",
      ilvl: 672,
      boss: "Mug'Zee",
      bossnum: 7,
      bonus: '"11994:4824"',
      slot: "Trinket",
      slot2: "Intellect",
      isSelected: false,
    },
    {
      id: 230198,
      name: "Eye of Kezan",
      ilvl: 672,
      boss: "Gallywix",
      bossnum: 8,
      bonus: '"11994:4824"',
      slot: "Trinket",
      slot2: "Primary Stat",
      isSelected: false,
    },
    {
      id: 230029,
      name: "Chromebustible Bomb Suit",
      ilvl: 672,
      boss: "Gallywix",
      bossnum: 8,
      bonus: '"11996:4824"',
      slot: "Trinket",
      slot2: "Haste (Tank)",
      isSelected: false,
    },
    {
      id: 228844,
      name: "Test Pilot's Go-Pack",
      ilvl: 678,
      boss: "Sprocketmonger Lockenstock",
      bossnum: 5,
      bonus: '"11993:4824"',
      slot: "Very Rare",
      slot2: "Back",
      isSelected: false,
    },
    {
      id: 231265,
      name: "The Jastor Diamond",
      ilvl: 678,
      boss: "Gallywix",
      bossnum: 8,
      bonus: '"11996:4824"',
      slot: "Very Rare",
      slot2: "Ring",
      isSelected: false,
    },
    {
      id: 231268,
      name: "Blastfurious Machete",
      ilvl: 662,
      boss: "Vexie and the Geargrinders",
      bossnum: 1,
      bonus: '"11991:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228892,
      name: "Greasemonkey's Shift-Stick",
      ilvl: 662,
      boss: "Vexie and the Geargrinders",
      bossnum: 1,
      bonus: '"11991:4824"',
      slot: "Weapon",
      slot2: "Two-Handed",
      isSelected: false,
    },
    {
      id: 228904,
      name: "Crowd Favorite",
      ilvl: 665,
      boss: "Cauldron of Carnage",
      bossnum: 2,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228900,
      name: "Tournament Arc",
      ilvl: 665,
      boss: "Cauldron of Carnage",
      bossnum: 2,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "Ranged",
      isSelected: false,
    },
    {
      id: 228890,
      name: "Superfan's Beater-Buzzer",
      ilvl: 665,
      boss: "Cauldron of Carnage",
      bossnum: 2,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "Off-Hand",
      isSelected: false,
    },
    {
      id: 228897,
      name: "Pyrotechnic Needle-Dropper",
      ilvl: 665,
      boss: "Rik Reverb",
      bossnum: 3,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228895,
      name: "Remixed Ignition Saber",
      ilvl: 665,
      boss: "Rik Reverb",
      bossnum: 3,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 231311,
      name: "Frontman's Wondrous Wall",
      ilvl: 665,
      boss: "Rik Reverb",
      bossnum: 3,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "Shield",
      isSelected: false,
    },
    {
      id: 228896,
      name: "Stix's Metal Detector",
      ilvl: 668,
      boss: "Stix Bunkjunker",
      bossnum: 4,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228903,
      name: "Dumpster Diver",
      ilvl: 668,
      boss: "Stix Bunkjunker",
      bossnum: 4,
      bonus: '"11992:4824"',
      slot: "Weapon",
      slot2: "Two-Handed",
      isSelected: false,
    },
    {
      id: 228894,
      name: "GIGADEATH Chainblade",
      ilvl: 665,
      boss: "Sprocketmonger Lockenstock",
      bossnum: 5,
      bonus: '"11993:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228898,
      name: "Alphacoil Ba-Boom Stick",
      ilvl: 665,
      boss: "Sprocketmonger Lockenstock",
      bossnum: 5,
      bonus: '"11993:4824"',
      slot: "Weapon",
      slot2: "Two-Handed",
      isSelected: false,
    },
    {
      id: 231266,
      name: "Random Number Perforator",
      ilvl: 668,
      boss: "One-Armed Bandit",
      bossnum: 6,
      bonus: '"11993:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228906,
      name: "Operator's Fraud Detector",
      ilvl: 668,
      boss: "One-Armed Bandit",
      bossnum: 6,
      bonus: '"11993:4824"',
      slot: "Weapon",
      slot2: "Off-Hand",
      isSelected: false,
    },
    {
      id: 232526,
      name: "Best-in-Slots",
      ilvl: 668,
      boss: "One-Armed Bandit",
      bossnum: 6,
      bonus: '"11993:4824"',
      slot: "Weapon",
      slot2: "Two-Handed",
      isSelected: false,
    },
    {
      id: 228905,
      name: "Giga Bank-Breaker",
      ilvl: 668,
      boss: "One-Armed Bandit",
      bossnum: 6,
      bonus: '"11993:4824"',
      slot: "Weapon",
      slot2: "Two-Handed",
      isSelected: false,
    },
    {
      id: 232804,
      name: "Capo's Molten Knuckles",
      ilvl: 672,
      boss: "Mug'Zee",
      bossnum: 7,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228901,
      name: "Big Earner's Bludgeon",
      ilvl: 672,
      boss: "Mug'Zee",
      bossnum: 7,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228902,
      name: "Wiseguy's Refused Offer",
      ilvl: 672,
      boss: "Mug'Zee",
      bossnum: 7,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228893,
      name: '"Tiny Pal"',
      ilvl: 672,
      boss: "Mug'Zee",
      bossnum: 7,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "Ranged",
      isSelected: false,
    },
    {
      id: 228899,
      name: "Gallywix's Iron Thumb",
      ilvl: 672,
      boss: "Gallywix",
      bossnum: 8,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "One-Handed",
      isSelected: false,
    },
    {
      id: 228889,
      name: "Titan of Industry",
      ilvl: 672,
      boss: "Gallywix",
      bossnum: 8,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "Shield",
      isSelected: false,
    },
    {
      id: 228891,
      name: "Capital Punisher",
      ilvl: 672,
      boss: "Gallywix",
      bossnum: 8,
      bonus: '"11994:4824"',
      slot: "Weapon",
      slot2: "Two-Handed",
      isSelected: false,
    },
  ];

  // Sort items by slot, then by bossnum, then by name
  const groupedAndSortedItems = items
    .sort(
      (a, b) =>
        a.slot.localeCompare(b.slot) ||
        a.bossnum - b.bossnum ||
        a.name.localeCompare(b.name)
    )
    .reduce((acc: { [key: string]: typeof items }, item) => {
      if (!acc[item.slot]) {
        acc[item.slot] = [];
      }
      acc[item.slot].push(item);
      return acc;
    }, {});

  const handleSelectItem = (item: any, isSelected: boolean) => {
    const newItem = {
      slot: item.slot,
      slot2: item.slot2,
      boss: item.boss,
      name: item.name,
    };

    setSelectedItems((prev) => {
      if (isSelected) {
        if (item.slot === "Trinket") {
          const trinkets = prev.filter(
            (selected) => selected.slot === "Trinket"
          );
          if (trinkets.length >= 2) {
            return prev;
          }
        } else if (item.slot === "Very Rare") {
          const veryRareItems = prev.filter(
            (selected) => selected.slot === "Very Rare"
          );
          if (veryRareItems.length >= 1) {
            return prev;
          }
        } else if (item.slot === "Weapon") {
          const weapons = prev.filter((selected) => selected.slot === "Weapon");
          if (weapons.length >= 1) {
            return prev;
          }
        }
        return [...prev, newItem];
      } else {
        return prev.filter((selected) => selected.name !== item.name);
      }
    });
  };

  // Submission
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzUrTsyE4dBMxd2tengCw297kTRp5Eqs0CDo28kT3z9Lvg466qeM5g-IaIZTdQa00eV4Q/exec";
  function handleSubmit() {
    setIsSubmitting(true); // Disable the submit button
    // Prep Data
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    const submissionPromises = selectedItems.map((item) => {
      const formData = new FormData();
      formData.append("Raw Date", Date());
      formData.append("Date Submitted", formattedDate);
      formData.append("Player", playerName);
      formData.append("Item Type", item.slot);
      formData.append("Boss", item.boss);
      formData.append("Item Name", item.name);

      // Handle Submission
      return fetch(scriptUrl, {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
      });
    });

    Promise.all(submissionPromises)
      .then(() => {
        console.log("All forms submitted");
        setPlayerName(""); // Reset player name
        setShowPopup(true); // Show popup
        setTimeout(() => {
          setShowPopup(false); // Hide popup after 3 seconds
          window.location.reload(); // Reload the page
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable the submit button
      });
  }

  return (
    <>
      {/* Configure Wowhead tooltips */}
      <Script id="wowhead-config" strategy="beforeInteractive">
        {`const whTooltips = {iconSize: 'medium',colorLinks: true, iconizeLinks: true, renameLinks: false };`}
      </Script>

      {/* Load Wowhead tooltips script */}
      {/* <Script
        src="https://wow.zamimg.com/js/tooltips.js"
        strategy="lazyOnload"
      /> */}
      <div className="RosterApp block animated animatedFadeInUp fadeInUp p-6">
        {/* Popup message */}
        {showPopup && (
          <div className="absolute z-50  top-[50%] text-center font-extrabold p-6 text-white">
            <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center justify-center bg-gray-800 border-2 border-amber-500 p-5 rounded-md shadow-lg bg-opacity-90 unselectable font-bold text-lg text-gray-100 w-[50%] h-[25%]">
                  <p className="mt-2 text-green-500">Wishlist Submitted</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {isSubmitting && (
          <div className="absolute z-40  top-[50%] text-center font-extrabold p-6 text-white">
            <div className="fixed inset-0 flex items-center justify-center transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center justify-center bg-gray-800 border-2  p-5 rounded-md shadow-lg bg-opacity-90 unselectable font-bold text-lg text-gray-100 w-[50%] h-[25%]">
                  <p className="mt-2">Submission in Progress...</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-white text-center text-xl font-bold mb-10">
          Liberation of Undermine Item Wishlist
        </h1>
        <div className="my-5 flex flex-col gap-4">
          <div className={`flex flex-col gap-1 w-full`}>
            <div className="flex items-center justify-between">
              <label className="text-gray-100 text-base sm:text-lg font-medium">
                Name
              </label>
            </div>
            <div className="relative w-full h-full">
              <input
                className={`form_Input
            px-4 py-3 rounded border-gray-500
            border-[2px] text-base text-gray-100 bg-zinc-800 font-medium  
            placeholder:text-grey-900 w-full
            `}
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => {
                  setPlayerName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {Object.entries(groupedAndSortedItems).map(([slot, slotItems]) => (
          <div key={slot} className="mb-6">
            <h2 className="text-white text-lg font-semibold mb-2">{slot}</h2>
            <WowheadItemSelection
              items={slotItems}
              onItemSelect={handleSelectItem}
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          disabled={!playerName || isSubmitting} // Disable button if submitting
          className={`${
            playerName && !isSubmitting
              ? "bg-lime-400"
              : !playerName
              ? "bg-gray-600"
              : "bg-amber-500"
          }
             my-5 py-2 px-1 h-10 w-full rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300`}
        >
          {isSubmitting
            ? "Submitting..."
            : playerName
            ? "Submit"
            : "Enter your name to submit"}
        </button>
      </div>
    </>
  );
}

export default Wishlist;
