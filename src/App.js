import { Route, Routes, Navigate, useNavigate,useLocation } from "react-router-dom";
import Signup  from "./components/Signup";
import Login from "./components/Login";
import Layout from "./components/Layout";
import AddUser from "./components/Main/AddUser";
import Employee from "./components/Main/Employee";
import LeaveTracker from "./components/Main/LeaveTracker";

import LayoutEmp from "./components/User/Layout";
import DashboardEmp from "./components/User/Dashboard";
import AttendanceEmp from "./components/User/Attendance";
import LeaveReportEmp from "./components/User/LeaveReport";
import LeaveEmp from "./components/User/Leave";
import ProfileEmp from "./components/User/Profile";
import Cookies from 'js-cookie';
import { useEffect} from "react";
import Dashboard from "./components/Main/Dashboard";
import { ToastContainer} from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

function App() {
	// const user = localStorage.getItem("token");
// 	const location = useLocation();
//   const name=location.state.id
	const navigate = useNavigate();
	const cookiedata=Cookies.get('cookieData');
	useEffect(()=>{
		if(!cookiedata)
		{
			navigate("/login")
		}
	},[]);
	return (
		<>
		<ToastContainer />
		<Routes>
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			
				<Route path="/" exact element={<Layout />}>
					<Route exact path="/dashboard" element={<Dashboard />}/>
					<Route exact path="/employee" element={<Employee />}/>
					<Route exact path="/add-user" element={<AddUser />}/>
					<Route exact path="/leave-tracker" element={<LeaveTracker />}/>
					
				</Route>
							
				 <Route path="/emp" exact element={<LayoutEmp />}>
				<Route exact path="/emp/dashboard" element={<DashboardEmp  />}/>
				<Route exact path="/emp/attendance" element={<AttendanceEmp />}/>
				<Route exact path="/emp/leave-report" element={<LeaveReportEmp />}/>
				<Route exact path="/emp/leave" element={<LeaveEmp />}/>
				<Route exact path="/emp/profile" element={<ProfileEmp />}/>

				</Route>

			<Route path="/" element={<Navigate replace to="/login" />} />	
		</Routes>
		</>
	);
}

export default App;