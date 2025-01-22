"use client";

import React from "react";
import SiteProvider from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main
        className={`max-w-[calc(1200px_+_8em)] absolute mt-14 mx-auto px-0 py-px inset-x-4 top-12`}
      >
        {children}
      </main>
    </div>
  );
};

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SiteProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </SiteProvider>
  );
};

export default AppWrapper;
