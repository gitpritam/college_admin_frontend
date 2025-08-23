const sidebarMenuItems = [
  {
    title: "Dashboard",
    // icon: <MdOutlineDashboard size={20} />,
    path: "/dashboard",
    children: [],
  },
  {
    title: "Faculty",
    // icon: <MdOutlinePerson size={20} />,
    path: "/faculty",
    children: [
      {
        title: "Add Faculty",
        path: "/faculty/add",
      },
      {
        title: "Faculty List",
        path: "/faculty/list",
      },
      {
        title: "View Faculty",
        path: "/faculty/view",
      },
    ],
  },
  {
    title: "Students",
    children: [
      {
        title: "Add Student",
        path: "/students/add",
      },
      {
        title: "Student List",
        path: "/students/list",
      },
      {
        title: "View Student",
        path: "/students/view",
      },
    ],
  },
];

export default sidebarMenuItems;
