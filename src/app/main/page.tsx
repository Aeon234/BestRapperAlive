"use client";
import React, { useState } from "react";
import { FormProvider } from "../contexts/form";
import { FormStepProvider } from "../contexts/form-step";
import { Sidebar } from "../(components)/Form/Stepper";
import { FormStep } from "../(components)/RosterFormSteps/Steps";

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Player", "Characters", "Leadership", "Comments", "Summary"];

  return (
    <div className="RosterApp animated animatedFadeInUp fadeInUp">
      <FormStepProvider>
        <FormProvider>
          <div className="Stepper">
            {/* Stepper */}
            <Sidebar />
          </div>
          <div className="application_Form w-full h-full grid">
            {/* Main Content */}
            <FormStep />
          </div>
        </FormProvider>
      </FormStepProvider>
    </div>
  );
};

export default App;
