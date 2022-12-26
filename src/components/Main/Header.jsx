import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';

function Header({toggleNav}) {
  // const cookiedata=Cookies.get('cookieData');
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("logout successfully")
    Cookie.remove('cookieData');
    // localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Fragment>
      <nav class="px-2 bg-white border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700 flex">
        <button
          onClick={toggleNav}
          data-collapse-toggle="navbar-dropdown"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg "
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="container flex flex-wrap items-center justify-end mx-auto">
          <div class=" w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              <li>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header;
