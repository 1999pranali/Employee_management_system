import React, { useEffect, useState } from "react";
import axios from "axios";
import ls from "localstorage-slim";

export default function Attendance() {
  const userId = ls.get("empId");
  const [attendance, setAttendance] = useState([]);
  const [CheckIn, setCheckIn] = useState(true);
  const [CheckOut, setCheckOut] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/attendance/read/${userId}`)
      .then((res) => {
        setAttendance(res.data);
        //  console.log("Attendance Data" +attendance.Date);
      });

    axios
      .get(`http://localhost:8080/api/attendance/read/checkin/${userId}`)
      .then((res) => {
        // console.log(
        //   "check the value is present in database or not",
        //   res.data.length
        // );
        if (res.data.length !== 0) {
          // console.log("disable true");
          setCheckIn(true);
          // setCheckOut(false);
        } else {
          // console.log("disable false");
          setCheckIn(false);
          // setCheckOut(true);
        }
      });

      axios
      .get(`http://localhost:8080/api/attendance/read/checkout/${userId}`)
      .then((res) => {
        console.log(
          "check the value is present in database or not",
          res.data.length
        );
        if (res.data.length !== 0) {
          console.log("disable true");
          // setCheckIn(true);
           setCheckOut(false);
        } else {
          console.log("disable false");
          // setCheckIn(false);
            setCheckOut(true);
        }
      });
  }, []);

  const checkIn = () => {
    // alert("checked In" +userId)
    axios
      .post("http://localhost:8080/api/attendance/checkIn", { userId: userId })
      .then((res) => {
        alert("checkIn successfully");
        window.location.reload(true);
        // console.log("checkin Successfully");
      });
  };

  const checkOut = () => {
    // alert("checked In" +userId)

    axios
      .post(`http://localhost:8080/api/attendance/checkOut/${userId}`)
      .then((res) => {
        alert("checkOut successfully");
        window.location.reload(true);

        // console.log("checkout Successfully");
      });
  };
  return (
    <>
      <div class="grid justify-center m-8 md:flex md:justify-center">
        <button
          type="button"
          
          className={CheckIn ? "text-white cursor-not-allowed bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 " :"text-white bg-blue-700 focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 " }
          onClick={() => checkIn()}
          disabled={CheckIn}
        >
          Check In
        </button>
        <button
          type="button"
          className={CheckOut ? "text-white cursor-not-allowed bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 " :"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "}
          onClick={() => checkOut()}
          disabled={CheckOut}
        >
          Check Out
        </button>
      </div>
      <div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6 text-center">
                Date
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                CheckIn
              </th>
              <th scope="col" class="py-3 px-6 text-center">
                CheckOut
              </th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((empattendance, key) => (
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={empattendance._id}
              >
                <td class="py-4 px-6 text-center">{empattendance.Date}</td>
                <td class="py-4 px-6 text-center">{empattendance.checkInTime}</td>
                <td class="py-4 px-6 text-center">{empattendance.checkOutTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
