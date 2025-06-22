import React from "react";
import Step1_Player from "./FormSteps/Step1_Player";

function Form() {
  return (
    <div className="sm:aspect-[1/1.6180334] lg:aspect-[1.6180334] sm:w-140 md:w-180 lg:w-250 mt-10 bg-[#0d0d11] rounded-2xl border-2 border-gray-600 grid gap-0 sm:grid-rows-9 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-9">
      <div className="sm:row-span-2 lg:col-span-2 border-0 bg-[url(/header.jpg)] bg-cover bg-position-center rounded-tl-2xl rounded-bl-2xl"></div>
      <div className="sm:row-span-7 lg:col-span-7 grid grid-rows-9">
        <div className="row-span-8 rounded-tr-2xl pt-4 sm:px-8 lg:px-6">
          <Step1_Player />
        </div>
        <div className=" bg-red-500 rounded-br-2xl"></div>
      </div>
    </div>
  );
}

export default Form;
