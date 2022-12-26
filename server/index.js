require("dotenv").config();
const express = require("express");
const session = require('express-session');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const attendanceRoutes = require("./routes/attendance");
const leaveRoutes = require("./routes/leave");
const profileRoutes = require("./routes/userprofile");

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
//   }))
  
// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employee",employeeRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/leave",leaveRoutes);
app.use("/api/profile",profileRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
