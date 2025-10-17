import { createBrowserRouter, Navigate } from "react-router";
import DashboardLayout from "../layout/dashboard.layout";
import AddFacultyPage from "../pages/faculty/addFaculty/AddFaculty.page";
import AddStudentPage from "../pages/student/addStudent/AddStudent.page";
import AddNoticePage from "../pages/notice/AddNotice.page";
import AddEventPage from "../pages/eventss/AddEvent.page";
import LoginPage from "../pages/auth/login.page";
import EventList from "../pages/eventss/list/eventList.page";
import NoticeList from "../pages/notice/list/noticeList.page";
import FacultyList from "../pages/faculty/list/facultyList.page";
import StudentList from "../pages/student/list/studentList.page";
import NoticePreview from "../pages/notice/preview/NoticePreview.page";
import EventPreview from "../pages/eventss/preview/eventPreview.page";
import FacultyPreview from "../pages/faculty/preview/facultyPreview.page";
import StudentPreview from "../pages/student/preview/studentPreview.page";
import ProtectedRoute from "../components/ProtectedRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<DashboardLayout />} />,
    children: [
      {
        path: "dashboard", // /dashboard
        element: <h1>Dashboard</h1>,
      },
      {
        path: "faculty",
        children: [
          {
            path: "list",
            element: <FacultyList />,
          },
          {
            path: "add",
            element: <AddFacultyPage />,
          },
          {
            path: ":faculty_id",
            element: <FacultyPreview />,
          },
        ],
      },
      {
        path: "students",
        children: [
          {
            path: "list",
            element: <StudentList />,
          },
          {
            path: "add",
            element: <AddStudentPage />,
          },
          {
            path: ":student_id",
            element: <StudentPreview />,
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
            element: <NoticeList />,
          },
          {
            path: "add",
            element: <AddNoticePage />,
          },
          {
            path: ":notice_id",
            element: <NoticePreview />,
          },
        ],
      },
      {
        path: "events",
        children: [
          {
            path: "list",
            element: <EventList />,
          },
          {
            path: "add",
            element: <AddEventPage />,
          },
          {
            path: ":event_id", //param similar to url param in backend
            element: <EventPreview />,
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
