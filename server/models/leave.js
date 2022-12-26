const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
	userId: { type: String },
    leaveType: { type: String },
	reason: { type: String },
    fromDate: { type: String },
    toDate: { type: String },
    userDate: { type: String },
    adminDate: { type: String },
    status: { type: String },
	
});

const Leave = mongoose.model("leave", leaveSchema);

module.exports = { Leave };
