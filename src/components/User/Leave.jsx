import React, { useState } from "react";
import axios from "axios";
import ls from "localstorage-slim";
import { useNavigate } from "react-router-dom";

export default function Leave() {
  const navigate = useNavigate();
  const userId = ls.get("empId");
  const [data, setData] = useState({
    leaveType:"",
		reason:"",
    fromDate:"",
    toDate:"",
	});
  const onOptionChangeHandler = (e) => setData({...data, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault();
   
      axios
      .post("http://localhost:8080/api/leave/store", { userId: userId,leaveType:data.leaveType,reason:data.reason,fromDate:data.fromDate,toDate:data.toDate })
      .then((res) => {
        // alert("checkIn successfully");

        navigate("/emp/leave-report");
        // console.log("checkin Successfully");
      });
    
  };

  return (
    <>
      
<div class="w-30 m-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Leave Details</h5>
        
      <form onSubmit={handleSubmit}>
      <div class="mb-4 mt-8">
          <select onChange={onOptionChangeHandler} name="leaveType" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                      <option value="">Select Reason for leave</option>
                      <option value="sick">Sick Leave</option>
                      <option value="casual ">Casual  Leave</option>
                      <option value="maternity">Maternity Leave</option>
                    </select>
                    </div>
          <div class="mb-4 mt-8">
            <label for="reason" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reason for Leave</label>
            <textarea name="reason" id="reason" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={onOptionChangeHandler} value={data.reason} placeholder="Reason...." required />
          </div>
         
            <div class="grid grid-cols-2 gap-8">                

            <div class="">
                    <div class="mb-6">
                      <label for="fromDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date</label>
                      <input type="date" name="fromDate" id="fromDate" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={onOptionChangeHandler} value={data.fromDate} required />
                    </div>
            </div>
            <div class="">
                  
                    <div class="mb-6">
                      <label for="toDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date</label>
                      <input type="date" name="toDate" id="toDate" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={onOptionChangeHandler} value={data.toDate} required />
                    </div>
                  
            </div>            
            </div>
            <div class="flex justify-center">
            <button type="submit" class="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save                
                </button>
            </div>
        </form>
   
</div>



    </>
  )
}