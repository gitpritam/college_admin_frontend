import { FaChevronLeft } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Link, useLocation } from "react-router";
import sidebarMenuItems from "../../../constants/sidebarMenuItems";
import { useState } from "react";

function Sidebar({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  console.log(location);
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={isOpen ? " z-40 min-w-64  h-screen" : "hidden"}
      aria-label="Sidebar"
    >
      <div className="h-full  overflow-y-auto bg-gray-800">
      <div className="z-50 sticky top-0 flex items-center justify-between px-3 py-4 h-15 border-b border-b-[#29384d] bg-gray-800 shadow-md">
       {/*logo*/}
        <img
        src="https://img.icons8.com/?size=100&id=XrRlSqHqjxqc&format=png&color=000000"
       /*src="https://img.icons8.com/?size=100&id=XwL1uwivrCEF&format=png&color=000000"*/
        alt="Logo"
        className="w-10 h-10 rounded-full font-bold"
        />
        
          {/* Single main button */}
          <button
            onClick={handleClose}
            className="items-center h-8 w-8 rounded-full cursor-pointer hover:bg-gray-700 transition justify-items-center-safe "
          >
            <FaChevronLeft color="white" size={15} />
          </button>
        </div>
        <ul className="space-y-2 px-3 py-4 font-medium">
          {sidebarMenuItems.map((item) =>
            item.children.length === 0 ? (
              <li key={item.path}>
                <Link
                  to={item.path || "#"}
                  className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group ${
                    location.pathname === item.path ? "bg-[#244061]" : ""
                  }`}
                >
                  {/* <MdOutlineDashboard size={20} /> */}
                  {item.icon && <item.icon size={20} />}

                  <span className="ms-3">{item.title}</span>
                </Link>
              </li>
            ) : (
              <li key={item.title}>
                <Link
                  onClick={() => {
                    setOpenSubmenu(
                      openSubmenu === item.title ? null : item.title,
                    );
                  }}
                  to={item.path || "#"}
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
                >
                  {item.icon && <item.icon size={20} />}
                  <span className="ms-3 flex-grow">{item.title}</span>
                  {openSubmenu === item.title ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </Link>
                {openSubmenu === item.title && (
                  <ul key={item.title} className="space-y-2">
          
                    {item.children.map((child) => (
                      <li key={child.path}>
                        {/* child main button */}
                        <Link
                          to={child.path}
                          className={`flex items-center ml-5 p-2  text-white rounded-lg hover:bg-gray-700 group ${
                            location.pathname === child.path
                              ? "bg-[#244061]"
                              : ""
                          }`}
                        >
                          {child.icon && <child.icon size={18} />}
                          <span className="ms-3">{child.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ),
          )}

          {/* <li>
            <button
              type="button"
              onClick={() => {}}
              id="faculty-dropdown"
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <MdOutlinePerson size={20} />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Faculty
              </span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <ul id="faculty-dropdown-list" className="hidden py-2 space-y-2">
              <li>
                <Link
                  to="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Billing
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Invoice
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
     
    </aside>
  );
}

export default Sidebar;
