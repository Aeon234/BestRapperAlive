import { useFormContext } from "react-hook-form";
import { useFormControls } from "../(components)/AppHook/useForm";
import { Step } from "./Form";

function StepperControl({
  steps,
  submitting,
}: {
  steps: Step[];
  submitting?: boolean;
}) {
  const {
    handleBack,
    handleNext,
    hasNextPage,
    hasPreviousPage,
    isFinalPage,
    currentPageIndex,
  } = useFormControls();
  const { trigger } = useFormContext();

  const onClick = () => {
    const form = document.getElementById("seasonalApp");
    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
    }
  };

  return (
    <footer className="p-4 flex justify-between items-center">
      <>
        <button
          onClick={handleBack}
          type="button"
          disabled={!hasPreviousPage}
          className={`bg-slate-400 ${
            !hasPreviousPage ? "invisible" : "visible"
          } py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg cursor-pointer`}
        >
          Go back
        </button>
        {isFinalPage ? (
          <button
            type="button"
            onClick={onClick}
            disabled={submitting}
            className="bg-lime-400 py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300 cursor-pointer disabled:cursor-progress  disabled:bg-gray-500"
          >
            {submitting ? "Submitting" : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={async () => {
              const res = await trigger(steps[currentPageIndex].inputs, {
                shouldFocus: true,
              });
              if (!res) {
                return;
              }
              handleNext();
            }}
            disabled={!hasNextPage}
            className={`${
              !hasNextPage ? "bg-gray-600" : "bg-amber-500"
            }  py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300 cursor-pointer`}
          >
            {isFinalPage ? "Confirm" : "Next"}
          </button>
        )}
      </>
    </footer>
  );
}

export default StepperControl;
