import { useFormStep } from "@/app/hooks/use-form-step";

interface StepperControlProps {
  handleGoBack: () => void;
  handleGoForwardStep: () => void;
}

export function StepperControl({
  handleGoBack,
  handleGoForwardStep,
}: StepperControlProps) {
  const { currentStep, steps } = useFormStep();

  const numberOfSteps = steps.length;
  const isLastStep = currentStep === numberOfSteps;

  return (
    <footer className="p-4 flex justify-between items-center">
      <button
        onClick={handleGoBack}
        className={`bg-slate-400 ${
          currentStep === 1 ? "invisible" : "visible"
        } py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg`}
      >
        Go back
      </button>
      <button
        onClick={handleGoForwardStep}
        className={`${
          isLastStep ? "bg-lime-400" : "bg-amber-500"
        } py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg`}
      >
        {isLastStep ? "Confirm" : "Next"}
      </button>
    </footer>
  );
}
