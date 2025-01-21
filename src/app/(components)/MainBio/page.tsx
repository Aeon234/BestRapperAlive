import React from "react";

function MainBio() {
  return (
    <div className="AboutMe_Section text-gray-50 bg-neutral-800">
      <div className="MyInfo_Section">
        <p className="MyInfo_Title font-bold text-sm underline-offset-0">
          About Me
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          scelerisque luctus urna sit amet bibendum. Nullam eget elementum sem,
          nec efficitur sem. Nullam justo odio, facilisis ac neque et,
          condimentum feugiat nisi. Vivamus fringilla tincidunt lorem quis
          sagittis. Vivamus ligula sem, convallis nec placerat id, pretium non
          ex. Vestibulum tempus, quam quis consequat cursus, arcu sem mattis
          libero, at condimentum eros tortor quis velit. Nunc vehicula felis
          vitae odio hendrerit, quis sodales turpis ultricies. Proin efficitur
          sodales mauris quis bibendum. Pellentesque et felis lorem.
        </p>
      </div>
      <div className="Timeline_Section">
        <p className="col-span-2 col-start-1 font-bold text-sm underline-offset-0">
          Event
        </p>
        <p className="col-span-2 col-start-3 font-bold text-sm">Description</p>
        <p className="col-span-2 col-start-1 col-end-3">
          eWorld Enterprise Solutions
          <br></br>
          2024-Present
        </p>
        <p className="col-span-4 col-start-3">Power Platform Developer</p>
        <p className="col-span-2 col-start-1 col-end-3">
          City of Hope, Comprehensive Cancer Center
          <br></br>
          2018-2024
        </p>
        <p className="col-span-4 col-start-3">
          Starting as a Clinical Research Associate I and transitioned into a
          Clinical Research Coordinator role in 2021. Research focused on
          Hematologic Cancer, Population Sciences and Cardiology.
        </p>
        <p className="col-span-2 col-start-1 col-end-3">
          UC, Santa Cruz
          <br></br>
          2013-2017
        </p>
        <p className="col-span-4 col-start-3">Attained Neuroscience B.S</p>
      </div>
    </div>
  );
}

export default MainBio;
