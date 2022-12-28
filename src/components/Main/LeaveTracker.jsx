import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LeaveTracker() {
    const navigate = useNavigate();
    const [showModal, setshowModal] = useState(false);
    const [data, setData] = useState({
        
    });
    
    const editModal = (id) => {
      setshowModal((current) => !current);
      axios.get(`http://localhost:8080/api/leave/edit/${id}`).then((res) => {
        setData(res.data);
        // console.log("edit response data"+res.data.firstName);
      });
    };
  
    const editcloseModal = () => {
      setshowModal(false);
    };
    const onOptionChangeHandler = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  console.log(setData._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      axios.post(`http://localhost:8080/api/leave/update/${data._id}`,data)
      .then((res)=>{
        toast.info("Employee Leave Status Successfully!", {
          position: "top-right",
          autoClose: 5000,          
          pauseOnHover: true,          
          theme: "colored",
          });
        window.location.reload(true)
      console.log(res.message);
      })
    };
    const [leave, setLeave] = useState([]);
    useEffect(() => {
        axios
          .get(`http://localhost:8080/api/leave/read`)
          .then((res) => {
            setLeave(res.data);
             console.log(" All Attendance Data=" +JSON.stringify(res.data));
          });
    
      }, []);
  return (
    <>
         <div class="m-8">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" class="py-3 px-6 text-center">
                Employee Name
              </th>
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
              <th scope="col" class="py-3 px-6 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {leave.map((empleave, key) => (
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={empleave._id}
              >
                <td class="py-4 px-6 text-center">{empleave.employees.firstName} {empleave.employees.lastName}</td>
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
                             class={ empleave.status == "pending" ? "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 capitalize"
                             :
                             empleave.status == "approved" ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 capitalize" :"text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 capitalize"
                            }
                           >
                             {empleave.status}
                           </button>
                  
               
                    
                    
                    </td>
                <td class="py-4 px-6 text-center"> <button
                    type="button"
                    onClick={() => editModal(empleave._id)}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Update Status
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        id="defaultModal"
        tabindex="-1"
        aria-hidden="true"
        class={
          "fixed top-0 right-0 ml-80 mr-80 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full" +
          (showModal ? " block" : " hidden")
        }
      >
        <div class="relative ml-40 w-full h-full max-w-2xl md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Employee Details
              </h3>
              <button
                type="button"
                onClick={editcloseModal}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-2 space-y-6">
              <form onSubmit={handleSubmit}>
              <div class=" p-4">
                      <label
                        for="reason"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Reason
                      </label>
                      <textarea
                        name="reason"
                        id="reason"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       
                        onChange={onOptionChangeHandler}
                        value={data.reason}
                        disabled
                      />
                    </div>
                <div class="grid grid-cols-2 gap-8">
                  <div class="m-5">
                  
                    <div class="mb-3">
                      <label
                        for="status"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                     
                      <select
                        onChange={onOptionChangeHandler}
                        name="status"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                   
                  </div>               
                 
                  
                </div>
                <div class="flex items-center justify-center space-x-2 border-t p-3 border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    class="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaveTracker