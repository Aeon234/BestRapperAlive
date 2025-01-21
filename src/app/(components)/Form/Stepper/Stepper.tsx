interface StepProps {
  step: {
    number: number;
    title?: string;
  };
  isActive?: boolean;
  isCompleted?: boolean;
}

export function Stepper({
  step,
  isActive = false,
  isCompleted = false,
}: StepProps) {
  return (
    <div
      className={`flex flex-row items-center justify-start gap-6 
        ${isActive ? "text-gold" : isCompleted ? "text-lime-400" : "text-white"}
      `}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
          isActive
            ? "border-gold"
            : isCompleted
            ? "border-lime-400"
            : "border-white"
        } "bg-none"`}
      >
        <span className={`text-xl font-bold `}>
          {isCompleted ? <span>&#10004;</span> : step.number}
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
          STEP {step.number}
        </span>
        <strong className="text-sm  font-bold leading-3 uppercase tracking-[1px]">
          {step.title}
        </strong>
      </div>
    </div>
  );
}
