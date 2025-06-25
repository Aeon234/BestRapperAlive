import React from "react";
import { Step } from "./Form";
import { useFormControls } from "../(components)/AppHook/useForm";
import { motion } from "framer-motion";
import { Header } from "../(components)/Card/Header";

function AppSteps({ steps }: { steps: Step[] }) {
  const { currentPageIndex, delta } = useFormControls();
  const step = steps[currentPageIndex];
  const Comp = step.component;
  if (!Comp) return null;

  return (
    <motion.div
      key={currentPageIndex}
      initial={{ opacity: 0, x: delta > 0 ? "10%" : "-10%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", type: "tween" }}
      className="md:px-7 flex flex-col gap-y-4 flex-1"
    >
      <div>
        <Header title={step.title} description={step.description} />
      </div>
      {Comp && <Comp />}
    </motion.div>
  );
}

export default AppSteps;
