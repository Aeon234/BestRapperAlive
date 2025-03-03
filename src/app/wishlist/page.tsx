"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";

import WowheadItemSelection from "../(components)/WowheadItem";

function wishlist() {
  const [playerName, setPlayerName] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    {
      slot: string;
      slot2: string;
      boss: string;
      name: string;
    }[]
  >([]);

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

  // 1 wep, 2 trinkets, 1 rare item
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
    // Prep Data
    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    selectedItems.forEach((item) => {
      const formData = new FormData();
      formData.append("Raw Date", Date());
      formData.append("Date Submitted", formattedDate);
      formData.append("Player", playerName);
      formData.append("Item Type", item.slot);
      formData.append("Boss", item.boss);
      formData.append("Item Name", item.name);

      // Handle Submission
      fetch(scriptUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Form Submitted");
            console.log(formData);
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        // .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error:", error);
        });
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
          disabled={!playerName}
          className={`${
            playerName
              ? "bg-lime-400"
              : !playerName
              ? "bg-gray-600"
              : "bg-amber-500"
          }
             my-5 py-2 px-1 h-10 w-full rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300`}
        >
          {playerName ? "Submit" : "Enter your name to submit"}
        </button>
      </div>
    </>
  );
}

export default wishlist;
