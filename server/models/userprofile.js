const mongoose = require("mongoose");

const userprofileSchema = new mongoose.Schema({
	userId: { type: String},
	photo: { type: String},
});

const UserProfile = mongoose.model("userprofile", userprofileSchema);

module.exports =  UserProfile ;
