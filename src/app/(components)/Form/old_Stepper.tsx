// import React, { useState, useEffect, useRef } from "react";

// interface Step {
//   description: string;
//   completed: boolean;
//   selected: boolean;
// }

// interface StepperProps {
//   currentStep: number;
//   steps: string[];
// }

// function Stepper({ currentStep, steps }: StepperProps) {
//   const [newStep, setNewStep] = useState<Step[]>([]);
//   const stepsRef = useRef<Step[] | null>(null);

//   const updateStep = (stepNumber: number, steps: Step[]): Step[] => {
//     const newSteps = [...steps];
//     let count = 0;

//     while (count < newSteps.length) {
//       if (count === stepNumber) {
//         // Current step
//         newSteps[count] = {
//           ...newSteps[count],
//           selected: true,
//           completed: true,
//         };

//         // Next step, if exists
//         if (count + 1 < newSteps.length) {
//           newSteps[count + 1] = {
//             ...newSteps[count + 1],
//             selected: true,
//             completed: false,
//           };
//         }
//       } else if (count < stepNumber) {
//         // Steps already completed
//         newSteps[count] = {
//           ...newSteps[count],
//           selected: false,
//           completed: true,
//         };
//       } else {
//         // Steps pending
//         newSteps[count] = {
//           ...newSteps[count],
//           selected: false,
//           completed: false,
//         };
//       }
//       count++;
//     }

//     return newSteps;
//   };

//   useEffect(() => {
//     const stepsState: Step[] = steps.map((step, index) => ({
//       description: step,
//       completed: false,
//       selected: index === 0,
//     }));

//     stepsRef.current = stepsState;
//     const current = updateStep(currentStep - 1, stepsRef.current);
//     setNewStep(current);
//   }, [steps, currentStep]);

//   const stepsDisplay = newStep.map((step, index) => (
//     <div
//       key={index}
//       className={`StepInfo ${
//         step.completed ? "stepCompleted" : step.selected ? "stepSelected" : ""
//       }`}
//     >
//       <div
//         className={`Step ${
//           step.completed ? "stepCompleted" : step.selected ? "stepSelected" : ""
//         }`}
//       >
//         {step.completed ? (
//           <span>&#10004;</span>
//         ) : index === newStep.length - 1 ? (
//           <span>&#9778;</span>
//         ) : (
//           index + 1
//         )}
//       </div>
//       <div>
//         <p className="label">
//           {index === newStep.length - 1 ? "Finalize" : `STEP ${index + 1}`}
//         </p>
//         <p className="info">{step.description}</p>
//       </div>
//     </div>
//   ));

//   return <div className="AppSteps">{stepsDisplay}</div>;
// }

// export default Stepper;
