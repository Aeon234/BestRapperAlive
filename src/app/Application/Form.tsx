"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AppSchema, AppFormSchema } from "./AppSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControlsProvider } from "../(components)/AppHook/useForm";
import { motion } from "framer-motion";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import AppSteps from "./AppSteps";

import Player from "../(components)/AppSteps/Step1_Player";
import Characters from "../(components)/AppSteps/Step2_Characters";
import Sales from "../(components)/AppSteps/Step3_Sales";
import Leadership from "../(components)/AppSteps/Step4_Leadership";
import Comments from "../(components)/AppSteps/Step5_Comments";
import Summary from "../(components)/AppSteps/Step6_Summary";

import header from "../../../public/header.jpg";

export type Step = {
  id: string;
  title: string;
  description: React.ReactNode;
  component: () => React.JSX.Element;
  inputs: (keyof AppFormSchema)[];
};

const steps = [
  {
    id: "1",
    title: "Player Info",
    description: "Enter your player information",
    component: Player,
    inputs: ["playerName"],
  },
  {
    id: "2",
    title: "Characters",
    description: (
      <>
        Fill out the characters you&apos;re interested in playing during Mythic
        Progression.
        <br />
        <span className="font-bold text-red-500">NOTE: </span>
        What you select is what you&apos;re
        <span className="mx-1 underline underline-offset-2 decoration-2 decoration-amber-600 font-bold">
          committing
        </span>
        to for
        <span className="ml-1 underline underline-offset-2 decoration-2 decoration-amber-600 font-bold">
          Mythic Progression
        </span>
        .
      </>
    ),
    component: Characters,
    inputs: ["role1", "class1", "spec1", "role2", "class2", "spec2"],
  },
  {
    id: "3",
    title: "Sales",
    description:
      "Are you interested in participating in sales so that the guild and you can generate income?",
    component: Sales,
    inputs: ["salesInterest", "salesComments"],
  },
  {
    id: "4",
    title: "Leadership",
    description: (
      <>
        Are you interested in a leadership position? Select{" "}
        <span className="underline underline-offset-2 decoration-2 decoration-red-500 font-bold">
          all
        </span>{" "}
        positions you are interested in.
        <br />
        <span className="font-bold text-red-500">NOTE: </span>
        No position is guaranteed. If you are picked for a position you
        selected, it will be on a trial basis.
      </>
    ),
    component: Leadership,
    inputs: ["salesInterest", "salesComments"],
  },
  {
    id: "5",
    title: "Additional Comments",
    description: "Provide any additional comments or feedback you may have.",
    component: Comments,
    inputs: ["comments"],
  },
  {
    id: "6",
    title: "Summary",
    description: "Review the information you have entered before submitting.",
    component: Summary,
    inputs: [],
  },
] satisfies Step[];

function Form() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { reset } = useForm();
  const form = useForm<AppFormSchema>({
    resolver: zodResolver(AppSchema),
    defaultValues: {
      playerName: "",
      role1: "",
      class1: "",
      spec1: "",
      role2: "",
      class2: "",
      spec2: "",
      salesInterest: false,
      salesComments: "",
      meleeOfficer: false,
      rangedOfficer: false,
      logsOfficer: false,
      recruitOfficer: false,
      salesOfficer: false,
      eventsOfficer: false,
      officerComments: "",
      comments: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const onSubmit = (data: AppFormSchema) => {
    setSubmitting(true);
    console.log(data);

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyxDDrn6AyOYkli0vLeBIX7lFaIwONrb_WqSVe0tolNExOySzLlUQcjOX_fPRSfvrt-/exec";

    // Prep Data
    const formData = new FormData();

    const currentDate = new Date();
    const formattedDate = `${
      currentDate.getMonth() + 1
    }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    formData.append("Date Submitted", formattedDate);
    formData.append("Timezone", data.timezone || "");
    formData.append("Timestamp", currentDate.toString());
    formData.append("Name", data.playerName);
    formData.append("Role 1", data.role1);
    formData.append("Class 1", data.class1);
    formData.append("Spec 1", data.spec1);
    formData.append("Role 2", data.role2 || "");
    formData.append("Class 2", data.class2 || "");
    formData.append("Spec 2", data.spec2 || "");
    formData.append("Sales Interest", String(data.salesInterest || false));
    formData.append(
      "Sales Interest Comments",
      String(data.salesComments || false)
    );
    formData.append(
      "Melee Officer Interest",
      String(data.meleeOfficer || false)
    );
    formData.append(
      "Ranged Officer Interest",
      String(data.rangedOfficer || false)
    );
    formData.append(
      "Recruiting Interest",
      String(data.recruitOfficer || false)
    );
    formData.append("Sales Lead Interest", String(data.salesOfficer || false));
    formData.append("Leadership Interest Comments", data.officerComments || "");
    formData.append("Additional Comments", data.comments || "");

    // Handle Submission
    fetch(scriptUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form Submitted");
          reset();
          setSubmitting(false);
          setSubmitted(true);
        } else {
          setSubmitting(false);
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };

  return (
    <>
      <div className="sm:aspect-[1/1.6180334] lg:aspect-[1.6180334] sm:w-140 md:w-180 lg:w-250 mt-10 bg-[#0d0d11] rounded-2xl border-2 border-gray-600 grid gap-0 sm:grid-rows-9 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-9">
        <FormControlsProvider steps={steps}>
          <FormProvider {...form}>
            <div
              className="sm:row-span-2 lg:col-span-2 content-center border-0 bg-gray-400 bg-blend-multiply bg-cover bg-bottom  lg:bg-center rounded-tl-2xl rounded-bl-2xl pt-4 sm:px-8 lg:px-6"
              style={{ backgroundImage: `url(${header.src})` }}
            >
              <Stepper steps={steps} />
            </div>
            <div className="sm:row-span-7 lg:col-span-7 ">
              <form
                id="seasonalApp"
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-full w-full grid grid-rows-9 concent-center"
              >
                <div className="row-span-8 rounded-tr-2xl pt-4 sm:px-8 lg:px-6">
                  <AppSteps steps={steps} />
                </div>
                <div className="rounded-br-2xl content-center">
                  <StepperControl steps={steps} submitting={submitting} />
                </div>
              </form>
            </div>
          </FormProvider>
        </FormControlsProvider>
      </div>
      {submitted && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut", type: "tween" }}
          className="absolute grid z-1 sm:aspect-[1/1.6180334] lg:aspect-[1.6180334] bg-blend-multiply bg-cover sm:w-140 md:w-180 lg:w-250 mt-10 bg-gray-800 rounded-2xl border-2 border-gray-600 place-items-center"
          style={{ backgroundImage: `url(${header.src})` }}
        >
          <div className="grid gap-2 justify-center text-center">
            <svg
              className="mx-auto h-20 w-20 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>

            <h2 className="text-2xl font-semibold text-gray-200 mb-2">
              Your Application has been submitted!
            </h2>

            <p className="text-sm text-gray-300 pb-30">
              Updates on next season&apos;s roster will be provided in the
              Announcements channel.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Form;
