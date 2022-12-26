import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Employee() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState([]);

  const [showModal, setshowModal] = useState(false);
  const [data, setData] = useState({});
  
  const editModal = (id) => {
    setshowModal((current) => !current);
    axios.get(`http://localhost:8080/api/employee/edit/${id}`).then((res) => {
      setData(res.data);
      console.log("edit response data"+res.data.firstName);
    });
  };

  const editcloseModal = () => {
    setshowModal(false);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/api/employee/read").then((res) => {
      setEmployeeList(res.data);
      console.log(res.data);
    });
  }, []);
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/api/employee/delete/${id}`).then(() => {
      window.location.reload(false);
    });
  };

  const onOptionChangeHandler = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  console.log(setData._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      axios.post(`http://localhost:8080/api/employee/update/${data._id}`,data)
      .then((res)=>{
        navigate("/employee");
      console.log(res.message);
      })

      // const { data: res } = await axios.post(url, data);
      
   
      // if (
      //   error.response &&
      //   error.response.status >= 400 &&
      //   error.response.status <= 500
      // ) {
      //   setError(error.response.data.message);
      // }
    
  };
  return (
    <>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg p-8">
        <div class="p-2">
          {/* <a href="/add-user"><button type="button" class="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Employee                 
                </button></a> */}
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Employee name
              </th>
              <th scope="col" class="py-3 px-6">
                Email ID
              </th>
              <th scope="col" class="py-3 px-6">
                Department
              </th>
              <th scope="col" class="py-3 px-6">
                Role
              </th>
              <th scope="col" class="py-3 px-6">
                Mobile No
              </th>
              <th scope="col" class="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee, key) => (
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={employee._id}
              >
                <td class="py-4 px-6">
                  {employee.firstName} {employee.lastName}
                </td>
                <td class="py-4 px-6">{employee.email}</td>
                <td class="py-4 px-6">{employee.department}</td>
                <td class="py-4 px-6">{employee.role}</td>
                <td class="py-4 px-6">{employee.mbno}</td>
                <td class="py-4 px-6">
                  <button
                    type="button"
                    onClick={() => editModal(employee._id)}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                  {/* <Link to={`/edit/${employee._id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</Link> */}
                  <button
                    onClick={() => deleteEmployee(employee._id)}
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                </td>
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
                <div class="grid grid-cols-2 gap-8">
                  <div class="m-5">
                    <div class="mb-6">
                      <label
                        for="firstName"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={data.firstName}
                        onChange={onOptionChangeHandler}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="address"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <textarea
                        name="address"
                        id="address"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Address...."
                        onChange={onOptionChangeHandler}
                        value={data.address}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="gender"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Gender
                      </label>
                      <div onChange={onOptionChangeHandler} name="gender">
                        <input class="m-2" type="radio" value="Male" name="gender" />Male
                        <input class="m-2" type="radio" value="Female" name="gender" />Female
                      </div>
                      {/* <input type="text" name="gender" id="gender" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter First Name" onChange={onOptionChangeHandler} value={data.gender} required /> */}
                      {/* <select onChange={onOptionChangeHandler} name="gender" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select> */}
                    </div>
                    <div class="mb-6">
                      <label
                        for="department"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Department
                      </label>
                      {/* <input type="text" name="department" id="department" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter department" onChange={onOptionChangeHandler} value={data.department} required /> */}
                      <select
                        onChange={onOptionChangeHandler}
                        name="department"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      >
                        <option value="">Select Department</option>
                        <option value="software">Software Department</option>
                        <option value="iot">IoT Department</option>
                      </select>
                    </div>
                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@flowbite.com"
                        onChange={onOptionChangeHandler}
                        value={data.email}
                        required
                      />
                    </div>
                  </div>
                  <div class="m-5">
                    <div class="mb-6">
                      <label
                        for="lastName"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Last Name"
                        onChange={onOptionChangeHandler}
                        value={data.lastName}
                        required
                      />
                    </div>
                    <div class="mb-10">
                      <label
                        for="dob"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter First Name"
                        onChange={onOptionChangeHandler}
                        value={data.dob}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="mbno"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile No
                      </label>
                      <input
                        type="text"
                        name="mbno"
                        id="mbno"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Mobile No"
                        onChange={onOptionChangeHandler}
                        value={data.mbno}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="role"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        id="role"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Enter Role"
                        onChange={onOptionChangeHandler}
                        value={data.role}
                        required
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        onChange={onOptionChangeHandler}
                        value={data.password}
                        required
                      />
                    </div>
                  </div>
                  {/* {error && <div className="">{error}</div>} */}
                  <div class="flex items-center space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    class="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  </div>
                  
                </div>
              </form>
            </div>

            {/* <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
