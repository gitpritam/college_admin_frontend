import { createContext } from "react";
export type DashboardContextType = {
  pageName: string;
  setPageName: (name: string) => void;
};

const dashboardContext = createContext<DashboardContextType | null>(null);

export default dashboardContext;
