import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlinePerson } from "react-icons/md";
import { Link } from "react-router";
import sidebarMenuItems from "../../../constants/sidebarMenuItems";

function Sidebar({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={isOpen ? " z-40 min-w-64  h-screen" : "hidden"}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-end pl-2.5 ">
          <button
            onClick={handleClose}
            className="p-2  rounded-full cursor-pointer hover:bg-gray-700 transition"
          >
            <FaChevronLeft color="white" size={15} />
          </button>
        </div>
        <ul className="space-y-2 font-medium">
          {sidebarMenuItems.map((item) =>
            item.children.length === 0 ? (
              <li key={item.path}>
                <Link
                  to={item.path || "#"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdOutlineDashboard size={20} />

                  <span className="ms-3">{item.title}</span>
                </Link>
              </li>
            ) : (
              <li key={item.title}>
                <Link
                  to={item.path || "#"}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdOutlineDashboard size={20} />

                  <span className="ms-3">{item.title}</span>
                </Link>
                <ul key={item.title} className="space-y-2">
                  {item.children.map((child: any) => (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className="flex items-center ml-5 p-2 font-light text-sm text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <MdOutlineDashboard size={20} />
                        <span className="ms-3">{child.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
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
