import { useEffect } from "react";
import useDashboardContext from "../../context/dashboard/useDashboardContext";

function DashboardPage() {
  const { setPageName } = useDashboardContext();
  useEffect(() => {
    setPageName("Dashboard")  ;
  }, [setPageName]); 

 /* return (
    <div className="flex w-full p-6 flex-col"></div>
  )*/
}
export default DashboardPage;