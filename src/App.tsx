import { useState } from "react";
import "./App.css";
import DashboardLayout from "./layout/dashboard.layout";
import AddFacultyPage from "./pages/faculty/addFaculty/AddFaculty.page";

function App() {
  return (
    <div>
      {/* <div>this is app</div> */}
      {/* <DashboardLayout /> */}
      <AddFacultyPage />
    </div>
  );
}

export default App;
