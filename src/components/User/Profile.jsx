import React, { useState } from "react";
import axios from "axios";
import ls from "localstorage-slim";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const userIds = ls.get("empId");
  const [data, setData] = useState({
    userId:userIds,
    photo:"",

	});
  const handlePhoto = (e) => setData({...data, photo: e.target.files[0] })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('userId', data.userId);
    formData.append('photo', data.photo);
      axios
      .post("http://localhost:8080/api/profile/storeProfile", formData)
      .then((res) => {
        alert("Profile Image uploaded successfully");

        navigate("/emp/profile");
        // console.log("checkin Successfully");
      });
    
  };

  return (
    <>
    <div class="p-5 shadow-lg">
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div class="mb-4 mt-8 ml-40 mr-40">
          <label
            for="photo"
            class="block mb-7 text-sm font-medium text-gray-900 dark:text-white"
          >
            Upload Profile Photo
          </label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"  
            class=" border border-gray-300"       
            onChange={handlePhoto}
          />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default Profile;
