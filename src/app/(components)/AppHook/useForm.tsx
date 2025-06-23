import { Step } from "@/app/Application/Form";
import { createContext, useContext, useState } from "react";

interface FormControlsContextProps {
  currentPageIndex: number;
  previousPageIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFinalPage: boolean;
  handleNext: () => void;
  handleBack: () => void;
  setCurrentPageIndex: (index: number) => void;
  setPreviousPageIndex: (index: number) => void;
  setPage: (index: number) => void;
}

const FormControlsContext = createContext<FormControlsContextProps | undefined>(
  undefined
);

interface FormControlsProviderProps {
  children: React.ReactNode;
  steps: Step[];
}

export const FormControlsProvider: React.FC<FormControlsProviderProps> = ({
  children,
  steps,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [previousPageIndex, setPreviousPageIndex] = useState<number>(0);

  const hasNextPage = currentPageIndex < steps.length - 1;
  const hasPreviousPage = currentPageIndex > 0;
  const isFinalPage = currentPageIndex === steps.length - 1;

  const handleNext = () => {
    if (currentPageIndex === steps.length - 1) return;
    setPreviousPageIndex(currentPageIndex);
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const handleBack = () => {
    if (currentPageIndex === 0) return;
    setPreviousPageIndex(currentPageIndex);
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const setPage = (index: number) => {
    if (index === currentPageIndex) return;
    if (index > currentPageIndex + 1) return;

    setPreviousPageIndex(currentPageIndex);
    setCurrentPageIndex(index);
  };

  return (
    <FormControlsContext.Provider
      value={{
        currentPageIndex,
        previousPageIndex,
        hasNextPage,
        hasPreviousPage,
        isFinalPage,
        handleNext,
        handleBack,
        setCurrentPageIndex,
        setPreviousPageIndex,
        setPage,
      }}
    >
      {children}
    </FormControlsContext.Provider>
  );
};

export const useFormControls = (): FormControlsContextProps => {
  const context = useContext(FormControlsContext);
  if (!context) {
    throw new Error(
      "useFormControls must be used within a FormControlsProvider"
    );
  }
  return context;
};
