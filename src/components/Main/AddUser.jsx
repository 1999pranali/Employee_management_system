import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState({
		firstName: "",
		lastName: "",
    gender:"",
    dob:"",
    role:"",
    mbno:"",
		email: "",
		password: "",
	});
  const onOptionChangeHandler = (e) => setData({...data, [e.target.name]: e.target.value })

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const url = "http://localhost:8080/api/employee/store";
    const { data: res } = await axios.post(url, data);
    toast.info("Employee Added Successfully!", {
      position: "top-right",
      autoClose: 5000,          
      pauseOnHover: true,          
      theme: "colored",
      });
    navigate("/employee");
    console.log(res.message);
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      setError(error.response.data.message);
    }
  }
};

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div class="grid grid-cols-2 gap-8 m-8">
            <div class="m-5">
                    <div class="mb-6">
                      <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input type="text" name="firstName" id="firstName" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter First Name" onChange={onOptionChangeHandler} value={data.firstName} required />
                    </div>
                    <div class="mb-6">
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                      <textarea name="address" id="address" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Address...." onChange={onOptionChangeHandler} value={data.address} required />
                    </div>
                    <div class="mb-6">
                      <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                      <div onChange={onOptionChangeHandler} name="gender">
                      <input class="m-2" type="radio" value="Male" name="gender"/> Male
                      <input class="m-2" type="radio" value="Female" name="gender" /> Female
                      </div>
                      {/* <input type="text" name="gender" id="gender" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter First Name" onChange={onOptionChangeHandler} value={data.gender} required /> */}
                      {/* <select onChange={onOptionChangeHandler} name="gender" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select> */}
                    </div>
                    <div class="mb-6">
                      <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                      {/* <input type="text" name="department" id="department" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter department" onChange={onOptionChangeHandler} value={data.department} required /> */}
                      <select onChange={onOptionChangeHandler} name="department" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                      <option value="">Select Department</option>
                      <option value="software">Software Department</option>
                      <option value="iot">IoT Department</option>
                    </select>
                    </div>
                    <div class="mb-6">
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" onChange={onOptionChangeHandler} value={data.email} required />
                    </div>
            </div>
            <div class="m-5">
                  <div class="mb-6">
                      <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input type="text" name="lastName" id="lastName" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Last Name" onChange={onOptionChangeHandler} value={data.lastName} required />
                    </div>
                    <div class="mb-10">
                      <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                      <input type="date" name="dob" id="dob" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter First Name" onChange={onOptionChangeHandler} value={data.dob} required />
                    </div>
                    <div class="mb-6">
                      <label for="mbno" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile No</label>
                      <input type="text" name="mbno" id="mbno" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Mobile No" onChange={onOptionChangeHandler} value={data.mbno} required />
                    </div>
                    <div class="mb-6">
                      <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                      <input type="text" name="role" id="role" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter Role" onChange={onOptionChangeHandler} value={data.role} required />
                    </div>
                  <div class="mb-6">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={onOptionChangeHandler} value={data.password} required />
                  </div>
                  
            </div> 
            {error && <div className="">{error}</div>}
            <button type="submit" class="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save                
                </button>
            </div>
        </form>      


    </>
  )
}

export default AddUser