const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
	userId: { type: String },
	Date: { type: String },
    checkInTime: { type: String },
    checkOutTime: { type: String },
},{timestamps:true});

const Attendance = mongoose.model("attendance", attendanceSchema);

module.exports = { Attendance };
