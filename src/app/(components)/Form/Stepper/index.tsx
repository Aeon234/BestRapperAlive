import { useFormStep } from "@/app/hooks/use-form-step";
import { Stepper } from "./Stepper";

export function Sidebar() {
  const { currentStep, steps } = useFormStep();

  return (
    <div
      className="FormStepper
      flex justify-center items-start pt-8 h-[172px] w-full bg-no-repeat bg-auto bg-[url('/formStepper/vertical.jpg')] bg-bottom
      sm:flex-col sm:justify-start sm:items-start sm:p-8 sm:w-[260px] sm:h-full sm:bg-cover sm:bg-[url('/formStepper/AzjKahet.jpg')] sm:rounded-lg sm:bg-left"
    >
      <div className="flex flex-row gap-4 sm:flex-col sm:gap-8 top-0 bottom-0 m-auto unselectable">
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
