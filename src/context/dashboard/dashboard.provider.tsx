import React from "react";
import dashboardContext from "./dashboard.context";

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pageName, setPageName] = React.useState<string>("Dashboard");

  return (
    <dashboardContext.Provider value={{ pageName, setPageName }}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;
