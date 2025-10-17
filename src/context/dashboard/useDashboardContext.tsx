import React from "react";
import dashboardContext from "./dashboard.context";

const useDashboardContext = () => {
  const context = React.useContext(dashboardContext);
  if (context === undefined || context === null) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider",
    );
  }
  return context;
};

export default useDashboardContext;
