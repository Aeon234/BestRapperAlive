import { useFormStep } from "@/app/hooks/use-form-step";
import { Stepper } from "./Stepper";

import bg from "../../../../../public/formStepper/AzjKahet.jpg";

export function Sidebar() {
  const { currentStep, steps } = useFormStep();

  return (
    <div
      className="FormStepper flex justify-center items-start pt-8 h-[172px] w-full bg-no-repeat bg-auto bg-bottom
      lg:flex-col lg:justify-start lg:items-start lg:p-8 lg:w-[260px] lg:h-full lg:bg-cover lg:rounded-lg lg:bg-left"
      style={{ backgroundImage: `url(${bg.src})` }} // Dynamically set the background image
    >
      <div className="flex flex-row gap-4 lg:flex-col lg:gap-8 top-0 bottom-0 m-auto unselectable">
        {steps.map((step) => {
          return (
            <Stepper
              key={step.number}
              step={step}
              isActive={step.number === currentStep}
              isCompleted={step.number < currentStep}
            />
          );
        })}
      </div>
    </div>
  );
}
