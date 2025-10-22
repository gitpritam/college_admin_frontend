import type React from "react";
import Sidebar from "../components/dashboard/sideBar/Sidebar.component";
import Topbar from "../components/dashboard/topBar/Topbar.component";
import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router";
import useDashboardContext from "../context/dashboard/useDashboardContext";

const DashboardLayout: React.FC = () => {
  const { setPageName } = useDashboardContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useLayoutEffect(() => {
    setPageName("Dashboard");
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    // sm breakpoint
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsSidebarOpen(event.matches);
    };
    //initial checking
    // Initial check
    setIsSidebarOpen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [setIsSidebarOpen,setPageName]);

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden ">
      <Sidebar
        isOpen={isSidebarOpen}
        handleClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col w-full">
        <Topbar
          isOpen={isSidebarOpen}
          handleOpen={() => setIsSidebarOpen(true)}
        />
        <main
          className="overflow-scroll scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
