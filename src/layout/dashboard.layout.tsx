import type React from "react";
import Sidebar from "../components/dashboard/sideBar/Sidebar.component";
import Topbar from "../components/dashboard/topBar/Topbar.component";
import { useState } from "react";
import { Outlet } from "react-router";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        handleClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex flex-col w-full">
        <Topbar
          isOpen={isSidebarOpen}
          handleOpen={() => setIsSidebarOpen(true)}
        />
        <main>
          <h1>cdsdsfdfsdfsdfsdfsdfsdf</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
