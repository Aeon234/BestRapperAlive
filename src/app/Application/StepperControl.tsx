import { useFormContext } from "react-hook-form";
import { useFormControls } from "../(components)/AppHook/useForm";
import { Step } from "./Form";

function StepperControl({ steps }: { steps: Step[] }) {
  const {
    handleBack,
    handleNext,
    hasNextPage,
    hasPreviousPage,
    isFinalPage,
    currentPageIndex,
  } = useFormControls();
  const { trigger } = useFormContext();

  return (
    <footer className="p-4 flex justify-between items-center">
      <>
        <button
          onClick={handleBack}
          type="button"
          disabled={!hasPreviousPage}
          // onClick={handleGoBack}
          className={`bg-slate-400 ${
            !hasPreviousPage ? "invisible" : "visible"
          } py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg`}
        >
          Go back
        </button>
        <button
          type="button"
          // onClick={handleGoForwardStep}
          // disabled={isDisabled}
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
            isFinalPage
              ? "bg-lime-400"
              : !hasNextPage
              ? "bg-gray-600"
              : "bg-amber-500"
          }  py-2 px-1 h-10 w-32 rounded text-sm text-gray-800 font-bold sm:text-lg transition-colors duration-300 cursor-pointer`}
        >
          {isFinalPage ? "Confirm" : "Next"}
        </button>
      </>
    </footer>
  );
}

export default StepperControl;
