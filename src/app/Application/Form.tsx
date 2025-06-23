"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AppSchema, AppFormSchema } from "./AppSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Player from "../(components)/AppSteps/Step1_Player";
import { FormControlsProvider } from "../(components)/AppHook/useForm";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import AppSteps from "./AppSteps";

export type Step = {
  id: string;
  title: string;
  description: string;
  component: () => React.JSX.Element;
  inputs: (keyof AppFormSchema)[];
};

const steps = [
  {
    id: "1",
    title: "Player",
    description: "Enter your player information",
    component: Player,
    inputs: ["playerName"],
  },
  {
    id: "2",
    title: "Characters",
    description:
      "Please provide any additional comments or feedback you may have.",
    component: Player,
    inputs: ["role1", "class1", "spec1", "role2", "class2", "spec2"],
  },
  {
    id: "3",
    title: "Sales",
    description:
      "Are you interested in participating in sales so that the guild and you can generate income?",
    component: Player,
    inputs: ["salesInterest", "salesComments"],
  },
  {
    id: "4",
    title: "Leadership",
    description: "blah blah blah",
    component: Player,
    inputs: ["salesInterest", "salesComments"],
  },
  {
    id: "5",
    title: "Comments",
    description: "Provide any additional comments or feedback you may have.",
    component: Player,
    inputs: ["comments"],
  },
  {
    id: "6",
    title: "Summary",
    description: "Review the information you have entered before submitting.",
    component: Player,
    inputs: [],
  },
] satisfies Step[];

function Form() {
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
    console.log(data);
  };

  return (
    <div className="sm:aspect-[1/1.6180334] lg:aspect-[1.6180334] sm:w-140 md:w-180 lg:w-250 mt-10 bg-[#0d0d11] rounded-2xl border-2 border-gray-600 grid gap-0 sm:grid-rows-9 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-9">
      <FormProvider {...form}>
        <FormControlsProvider steps={steps}>
          <div className="sm:row-span-2 lg:col-span-2 content-center border-0 bg-[url(/header.jpg)] bg-cover bg-bottom  lg:bg-center rounded-tl-2xl rounded-bl-2xl pt-4 sm:px-8 lg:px-6">
            <Stepper steps={steps} />
          </div>
          <div className="sm:row-span-7 lg:col-span-7 ">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full w-full grid grid-rows-9 concent-center"
            >
              <div className="row-span-8 rounded-tr-2xl pt-4 sm:px-8 lg:px-6">
                <AppSteps steps={steps} />
              </div>
              <div className="rounded-br-2xl content-center">
                <StepperControl steps={steps} />
              </div>
            </form>
          </div>
        </FormControlsProvider>
      </FormProvider>
    </div>
  );
}

export default Form;
