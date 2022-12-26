import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate, createSearchParams } from "react-router-dom";
import styles from "./styles.module.css";
import Cookie from 'js-cookie';
import { useEffect } from "react";

const Login = () => {
	const navigate=useNavigate()
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	// const [userData, setUserData] = useState({});
	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	// useEffect(() => {
	// 	handleSubmit();
	// }, [])
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			// const { data: res } = await axios.post(url, data)
			axios.post(url, data)

			.then((res)=>{
				// console.log("role"+res.data.role)
			Cookie.set('cookieData', res.data._id)
			// console.log("role"+res.data.role)
			// setUserData(res.data.firstName)
			// alert(userData.firstName)
			// console.log("firstname"+userData.firstName)
			if(res.data.role === "admin")
			{
				window.location = "/dashboard";
			}
			else{
				// navigate("/emp",{state:{id:res.data._id}})
				navigate({
					pathname:"/emp/dashboard",
					search:createSearchParams({
						id:res.data._id
					}).toString()
				});

				//window.location = "/emp";
			}
			})
			
			
			// localStorage.setItem("token", res.data);
			//  window.location = "/";
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
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>Login</h1>
					{/* <h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link> */}
				</div>
			</div>
		</div>
	);
};

export default Login;