import React, { useEffect, useState } from "react";
import axios from "axios";
import ls from "localstorage-slim";
import { Link} from 'react-router-dom';
import { format } from 'date-fns'
function LeaveReport() {
    const userId = ls.get("empId");
    const [leave, setLeave] = useState([]);
    useEffect(() => {
        axios
          .get(`http://localhost:8080/api/leave/read/${userId}`)
          .then((res) => {
            setLeave(res.data);
            //  console.log("Attendance Data" +attendance.Date);
          });
    
      }, []);
  return (
    <>
        <div class="flex flex-wrap m-8 justify-end md:flex md:justify-center">
        <Link to="/emp/leave">
            <button
                type="button" 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                
                >
                Add Leave
                </button>
                </Link>
        
      </div>
        <div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6 text-center">
                Date of Leave
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                Leave Type
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                From Date
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                To Date
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {leave.map((empleave, key) => (
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={empleave._id}
              >
                <td class="py-4 px-6 text-center">{empleave.userDate}</td>
                <td class="py-4 px-6 text-center capitalize">{empleave.leaveType} Leave</td>
                <td class="py-4 px-6 text-center">
                  {new Date(empleave.fromDate ).getDate()}/
                {new Date(empleave.fromDate ).getMonth()+1}/
                {new Date(empleave.fromDate ).getFullYear()}
                </td>
                <td class="py-4 px-6 text-center">
                {new Date(empleave.toDate ).getDate()}/
                {new Date(empleave.toDate ).getMonth()+1}/
                {new Date(empleave.toDate ).getFullYear()}
                </td>
                <td class="py-4 px-6 text-center">
                <button
                             type="button"
                             class={ empleave.status == "pending" ? "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  capitalize"
                             :
                             empleave.status == "approved" ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800  capitalize" :"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 capitalize"
                            }
                           >
                             {empleave.status}
                           </button>
                  
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default LeaveReport