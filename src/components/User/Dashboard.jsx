import React, { useEffect, useState } from "react";
import axios from "axios";
import ls from "localstorage-slim";
import moment from "moment";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
// import { Chart, ArcElement ,Title} from "chart.js";
// Chart.register(ArcElement);
// Chart.register(Title);
export default function Dashboard() {
  // const [charts, setCharts] = useState([]);
  const [leaveRecord, setLeaveRecord] = useState([]);
  const userId = ls.get("empId");
  const [profile, setProfile] = useState({first: ""});
  const [counter, setCounter] = useState(0);
  const list = [];

  useEffect(() => {

    axios.get(`http://localhost:8080/api/leave/leavecount/${userId}`).then((res) => {
      setLeaveRecord(res.data);
      console.log("leave records response data ======== " + JSON.stringify(res.data));
      console.log("leave records data ======== " + JSON.stringify(leaveRecord));
      //  setCharts({...charts, first: res.data });   
      for (let user of leaveRecord) {
        // const diffdate = calDate("11-19-2021","11-20-2021")
        const newStartDate = new Date(user.toDate);
        const newEndDate = new Date(user.fromDate);
        const toDate = newStartDate.getMonth() + 1;
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        // console.log("month========="+todayMonth)

        let result = moment(newStartDate).diff(newEndDate, "days") + 1;

        // return result;
        if (todayMonth == toDate) {
          console.log("counter===", result);
          list.push(result);
          // setCounter({ ...counter, first: result + counter  });
          //  console.log("state counter=", counter);
        }
      }
      var sum = 0;

      for (let num of list) {
        sum = sum + num;
      }
      setCounter({ ...counter, first: sum });
      console.log(sum);
      // console.log("Result of counter" + counter.first);
      // console.log("Result of counter"+counter)

    });
    
    
    axios
      .get(`http://localhost:8080/api/profile/userprofile/${userId}`)
      .then((res) => {
        if (res.data.length == 0) {
          setProfile({ ...profile, photo: "null" });
        } else {
          setProfile(res.data[0]);
          // console.log("data="+profile);
        }

        // setProfile(res.data[0]);
        //  console.log(" User Data=" +JSON.stringify(res.data));
      });



  }, [leaveRecord[0]?._id]);
  
    const data = {
      labels: ["Absent", "Present"],
      datasets: [
        {
          // data: [charts.first, 30-charts.first],
          data: [counter?.first, 30 - counter?.first],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderWidth: 2,
        },
      ],
    };
  return (
    <div class="flex flex-row m-8">
      <div class="p-3  max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 ">
        <div class="pl-14 pr-14">
          {profile.photo == "null" ? (
            <img
              class="w-40 h-40 rounded-full"
              src="/img/user.png"
              alt="user photo"
            />
          ) : (
            <img
              class="w-40 h-40 rounded-full"
              src={"/profileImages/" + profile.photo}
              alt=""
            />
          )}
        </div>
        <div class="p-5">
          <div class="pt-2 pb-2">
            <strong>
              Name : {profile.employees && profile.employees.firstName}
              {profile.employees && profile.employees.lastName} 
              {/* {leaveRecord[0]?._id} */}
            </strong>
          </div>
          <hr />
          <div class="pt-2 pb-2">
            <strong>
              Date of Birth : {new Date(profile.employees?.dob).getDate()}/
              {new Date(profile.employees?.dob).getMonth() + 1}/
              {new Date(profile.employees?.dob).getFullYear()}
            </strong>
          </div>
          <hr />
          <div class="pt-2 pb-2">
            <strong> Email : {profile.employees?.email}</strong>
          </div>
          <hr />
          <div class="pt-2 pb-2">
            <strong> Mobile No. : {profile.employees?.mbno}</strong>
          </div>
          <hr />
          <div class="pt-2 pb-2">
            <strong> Address : {profile.employees?.address}</strong>
          </div>
          <hr />
        </div>
      </div>
      <div class="w-150 p-20">
        {/* {  console.log(" charts=" +charts.first)} */}
        <Doughnut data={data} />
      </div>
    </div>
  );
}
