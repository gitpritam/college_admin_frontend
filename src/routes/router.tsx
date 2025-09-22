import { createBrowserRouter, Navigate } from "react-router";
import DashboardLayout from "../layout/dashboard.layout";
import AddFacultyPage from "../pages/faculty/addFaculty/AddFaculty.page";
import AddStudentPage from "../pages/student/addStudent/AddStudent.page";
import AddNoticePage from "../pages/notice/AddNotice.page";
import AddEventPage from "../pages/eventss/AddEvent.page";
import LoginPage from "../pages/auth/login.page";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard", // /dashboard
        element: <h1>Dashboard</h1>,
      },
      {
        path: "faculty",
        children: [
          {
            path: "list", // /faculty/list
            element: <h1>Faculty List</h1>,
          },
          {
            path: "add", // /faculty/add
            element: <AddFacultyPage />,
          },
        ],
      },
      {
        path: "students",
        children: [
          {
            path: "list",
            element: <h1>Student List</h1>,
          },
          {
            path: "add",
            element: <AddStudentPage />,
          },
        ],
      },
      {
        path: "notices",
        children: [
          {
            index: true,
            element: <Navigate to="list" replace />,
          },
          {
            path: "list",
            element: <h1>Notice List</h1>,
          },
          {
            path: "add",
            element: <AddNoticePage />,
          },
        ],
      },
      {
        path: "events",
        children: [
          {
            path: "list",
            element: <h1>Event List</h1>,
          },
          {
            path: "add",
            element: <AddEventPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default Router;
