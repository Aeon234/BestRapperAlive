import { useFormStep } from "@/app/hooks/use-form-step";
import { Player } from "./Player/Player";
import { Characters } from "./Characters/Characters";
import { SalesEvents } from "./SalesEvents/SalesEvents";
import { Leadership } from "./Leadership/Leadership";
import { Comments } from "./Comments/Comments";
import { Summary } from "./Summary/Summary";

const steps = [
  {
    step: 1,
    component: Player,
  },
  {
    step: 2,
    component: Characters,
  },
  {
    step: 3,
    component: SalesEvents,
  },
  {
    step: 4,
    component: Leadership,
  },
  {
    step: 5,
    component: Comments,
  },
  {
    step: 6,
    component: Summary,
  },
];

export function FormStep() {
  const { currentStep } = useFormStep();

  const step = steps.find(({ step }) => step === currentStep);

  return (
    <div className="flex flex-col flex-1 justify-between min-w-0">
      {step && step.component()}
    </div>
  );
}
