import React from "react";

function RosterData() {
  return (
    <div className="RosterApp animated animatedFadeInUp fadeInUp h-[900px] max-h-[1000px]">
      <h1 className="text-2xl text-white font-bold text-center m-2">
        Roster Application Data Results
      </h1>
      <div className="flex justify-between items-start space-x-4 text-center">
        <div className="bg-slate-800 text-white p-10 rounded shadow-lg flex-1">
          <h1 className="text-xl text-white font-bold">Role Breakdown</h1>
        </div>
        <div className="bg-slate-800 text-white p-10 rounded shadow-lg flex-1">
          <h1 className="text-xl text-white font-bold">Class Breakdown</h1>
        </div>
        <div className="bg-slate-800 text-white p-10 rounded shadow-lg flex-1">
          <h1 className="text-xl text-white font-bold">
            Specialization Breakdown
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RosterData;
