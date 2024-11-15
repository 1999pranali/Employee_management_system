import React, { useState } from "react";
import { NavLink } from "react-router-dom";


function Sidebar({sidebarshow}) {

  const [showdrop,setShowDrop]=useState(false);
  const showEcommerce = () => {
    setShowDrop(current => !current);
  };

  return (
    <>
      <aside aria-label="Sidebar">
        <div
          class={
            "overflow-y-auto py-4 px-3 bg-white h-screen rounded dark:bg-gray-800 md:block md:w-auto transition-all delay-200" +
            (sidebarshow ? " md:w-20 w-72" : " md:w-72 w-20")
          }
        >
          {/* <img src="img\velocelogo.png" alt="veloce logo" /> */}
          <img src={process.env.PUBLIC_URL + '/img/velocelogo.png'} alt="veloce logo" />
          <ul class="space-y-2">
            <li>
            <NavLink
                to="/emp/dashboard"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Dashboard</span>
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/emp/attendance"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                 <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Attendance</span>
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/emp/leave-report"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Leave</span>
                </NavLink>
            </li>
            {/* <li>
              
              <button
                type="button"
                class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={showEcommerce}
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>
                  E-commerce
                </span>
                <svg
                  sidebar-toggle-item
                 class={"w-6 h-6" + (sidebarshow ? " block md:hidden" : " hidden md:block")}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul id="dropdown-example" className={"py-2 space-y-2" + (showdrop ? " block" : " hidden")}>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Billing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Invoice
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li>
            <NavLink
                to="/employee"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Employees</span>
                </NavLink>
            </li>
            <li>
            <NavLink
                to="/add-user"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Add Employee</span>
                </NavLink>
            </li>
            <li>
            <NavLink
                to="/leave-tracker"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Leave Tracker</span>
                </NavLink>
            </li>
            <li>
            <NavLink
                to="/reports"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Reports</span>
                </NavLink>
            </li> */}
            {/* <li>
            <NavLink
                to="#"
                className={({isActive})=>{
                  return "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 " + (isActive ? "bg-veloceblue text-yellow-50 hover:text-black" : "bg-sky-500 text-gray-900")
                }}              
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class={"ml-3" + (sidebarshow ? " block md:hidden" : " hidden md:block")}>Sign Up</span>
              </NavLink>
            </li> */}
             </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
