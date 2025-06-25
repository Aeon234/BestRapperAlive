import { AppFormSchema } from "@/app/Application/AppSchema";
import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { TextCustom } from "../TextCustom";

function Player() {
  const { control } = useFormContext<AppFormSchema>();

  return (
    <div className="w-full">
      <TextCustom name="playerName" label="Name" placeholder="e.g. Aeon" />
    </div>
  );
}

export default Player;
