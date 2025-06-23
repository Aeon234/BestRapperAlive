import React from "react";
import { useFormControls } from "../(components)/AppHook/useForm";
import { Step } from "./Form";

function Stepper({ steps }: { steps: Step[] }) {
  const { currentPageIndex, setPage } = useFormControls();

  return (
    <div
      className=" sm:grid sm:grid-cols-3 sm:grid-rows-2 sm:gap-8
      sm:w-fit sm:m-auto lg:flex justify-center gap-4 lg:flex-col lg:gap-8 top-0 bottom-0 m-auto select-none"
    >
      {steps.map((step, idx) => {
        const isActive = idx > currentPageIndex + 1 || idx === currentPageIndex;
        const isCompleted = idx < currentPageIndex;
        // const hasError = step.inputs.some((key) => errors[key] !== undefined);
        return (
          <div
            key={step.id}
            className={`flex flex-row items-center justify-start gap-6 
                ${
                  isActive
                    ? "text-gold"
                    : isCompleted
                    ? "text-lime-400"
                    : "text-white"
                }
          `}
          >
            <div
              className={`aspect-[1] w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                isActive
                  ? "border-gold"
                  : isCompleted
                  ? "border-lime-400"
                  : "border-white"
              } "bg-none"`}
            >
              <span className={`text-xl font-bold `}>
                {isCompleted ? <span>&#10004;</span> : step.id}
              </span>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:gap-2">
              <span
                className={`text-base ${
                  isActive
                    ? "text-gold"
                    : isCompleted
                    ? "text-lime-400"
                    : "text-light-blue"
                }   font-normal leading-3`}
              >
                STEP {step.id}
              </span>
              <strong className="text-sm  font-bold leading-3 uppercase tracking-[1px]">
                {step.title}
              </strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
