const router = require("express").Router();
const { Employee } = require("../models/employee");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await Employee.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		// const token = user.generateAuthToken();
		// res.status(200).send({  message: "logged in successfully" });
		 res.status(200).json(user);
		// res.status(201).send({ message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({message: error.message + "catch error"});
	}
});


router.get("/user/:id", async (req, res) => {
	try {
		const emp = await Employee.findOne({ _id: req.params.id })
		 res.status(200).json(emp);
	} catch (error) {
		res.status(500).send({message: error.message + "catch error"});
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
