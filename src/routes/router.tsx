import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layout/dashboard.layout";
import AddFacultyPage from "../pages/faculty/addFaculty/AddFaculty.page";
import AddStudentPage from "../pages/student/addStudent/AddStudent.page";
import AddNoticePage from "../pages/notice/AddNotice.page";

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
        path: "notice",
        children: [
          {
            path: "list", 
            element: <h1>Notice List</h1>,
          },
          {
            path: "add", 
            element: <AddNoticePage/>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <h1>Login page</h1>
      // <Login />
    ),
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);

export default Router;
