import React from "react";
import { TextCustom } from "../TextCustom";

function Player() {
  return (
    <div className="w-full">
      <TextCustom name="playerName" label="Name" placeholder="e.g. Aeon" />
    </div>
  );
}

export default Player;
