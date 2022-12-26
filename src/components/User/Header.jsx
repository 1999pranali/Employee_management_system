import React, { Fragment,useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookie from 'js-cookie';
import ls from 'localstorage-slim';

function Header({toggleNav}) {

  const userId = Cookie.get('cookieData')
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/profile/read/${userId}`)
      .then((res) => {
        if(res.data.length==0)
        {
          setProfile({...profile, photo: "null" });
         
        }
        else{
          setProfile(res.data[0]);
          // console.log("data="+res.data.length);
        }    
        
      });
    },[]);
  // const [showdrop,setShowDrop]=useState(false);
  // const showProfile = () => {
  //   alert("show profile")
  //   setShowDrop(true);
  // };
  // const cookiedata=Cookies.get('cookieData');
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("logout successfully")
    Cookie.remove('cookieData');
    ls.remove('empId');
    // localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Fragment>
      <nav class="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-md flex relative">
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
            <ul class="flex flex-row justify-end p-4 mt-4 space-x-8 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              {/* <li>
              <button type="button" class="inline-flex relative items-center p-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  <span class="sr-only">Notifications</span>
              <div class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">20</div>
            </button>
              </li> */}
            <li>
                  <Link to="/emp/profile">
                    {/* <h1>{profile.photo}</h1> */}
                  {/* <img class="w-10 h-10 rounded-full" src="/img/user.png" alt="user photo" /> */}
                  {/* {console.log("profile Data" +JSON.stringify(profile.photo))} */}
                  {/* <img class="w-10 h-10 rounded-full" src={"/profileImages/" + profile.photo }  alt="" /> */}
                  { profile.photo == "null"  ? <img class="w-10 h-10 rounded-full" src="/img/user.png" alt="user photo" />:<img class="w-10 h-10 rounded-full" src={"/profileImages/" + profile.photo }  alt="" />}
                  

                    </Link>
              </li>
            {/* <li>
           
            <button data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" onClick={showProfile}>
            <img class="w-10 h-10 rounded-full" src="/img/user.png" alt="user photo" />
              
              </button>
          <div class={"z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600"  + (showdrop ? " block" : " hidden")}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-400">
                  <li>
                  <Link to="/emp/profile">
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                    </Link>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                </ul>
                <div class="py-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                </div>
            </div>
        </li> */}
              <li>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={handleLogout}
                >
                  {/* {profile.photo} */}
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
