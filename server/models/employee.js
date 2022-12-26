const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const employeeSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
	address: {type:String,required:true},
	department: {type:String,required:true},
    role: { type: String, required: true },
    mbno: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	
},{timestamps:true});

// employeeSchema.methods.generateAuthToken = function () {
// 	const token = jwt.sign({ _id: this._id },`${process.env.JWTPRIVATEKEY}`, {
// 		expiresIn: "7d",
// 	});
// 	return token;
// };

const Employee = mongoose.model("employee", employeeSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
        gender: Joi.string().required().label("Gender"),
        dob:Joi.string().required().label("dob"),
		address:Joi.string().required().label("address"),
		department:Joi.string().required().label("department"),
        role: Joi.string().required().label("role"),
        mbno:Joi.string().required().label("mbno"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { Employee, validate };
