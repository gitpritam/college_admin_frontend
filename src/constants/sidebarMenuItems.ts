import {
  MdOutlineDashboard,
  MdOutlineFormatListBulleted,
  MdOutlinePerson,
  MdOutlinePersonAdd,
} from "react-icons/md";

const sidebarMenuItems = [
  {
    title: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/dashboard",
    children: [],
  },
  {
    title: "Faculty",
    icon: MdOutlinePerson,
    children: [
      {
        title: "Add Faculty",
        path: "/faculty/add",
        icon: MdOutlinePersonAdd,
      },
      {
        title: "Faculty List",
        path: "/faculty/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
  },
  {
    title: "Students",
    icon: MdOutlinePerson,
    children: [
      {
        title: "Add Student",
        path: "/student/add",
        icon: MdOutlinePersonAdd,
      },
      {
        title: "Student List",
        path: "/student/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
  },
];

export default sidebarMenuItems;
