import {
  MdCelebration,
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
        path: "/students/add",
        icon: MdOutlinePersonAdd,
      },
      {
        title: "Student List",
        path: "/students/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
  },
  {
    title: "Notices",
    icon: MdOutlinePerson,
    children: [
      {
        title: "Add Notice",
        path: "/notices/add",
        icon: MdOutlinePersonAdd,
      },

      {
        title: "Add Notice",
        path: "/notices/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
  },
  {
    title: "Events",
    icon: MdCelebration,
    children: [
      {
        title: "Add Event",
        path: "/events/add",
        icon: MdOutlinePersonAdd,
      },

      {
        title: "Add Event",
        path: "/events/list",
        icon: MdOutlineFormatListBulleted,
      },
    ],
  },
];

export default sidebarMenuItems;
