// import React from "react";

// interface StepperControlProps {
//   handleClick: (direction: "back" | "next") => void;
//   currentStep: number;
//   steps: string[];
// }

// const StepperControl = ({
//   handleClick,
//   currentStep,
//   steps,
// }: StepperControlProps) => {
//   return (
//     <div className="RosterApp_StepperControl">
//       {/* Back Button */}
//       <button
//         className="appButton backStep"
//         disabled={currentStep == 0}
//         onClick={() => handleClick("back")}
//       >
//         Back
//       </button>
//       {/* Next Button */}
//       <button
//         className="appButton nextStep"
//         onClick={() => handleClick("next")}
//       >
//         {currentStep === steps.length - 1 ? "Submit" : "Next Step"}
//       </button>
//     </div>
//   );
// };

// export default StepperControl;
