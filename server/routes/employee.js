const router = require("express").Router();
const { Employee, validate } = require("../models/employee");
const bcrypt = require("bcrypt");

router.post("/store", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const employee = await Employee.findOne({ email: req.body.email });
		if (employee)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new Employee({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/read", async (req, res) => {
	try {	

		const emp = await Employee.find({});
		res.status(201).json(emp)
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/edit/:id", async (req, res) => {
	// console.log(req.params)
	
		try 
		{
			const emp = await Employee.findOne({ _id: req.params.id })
			res.status(201).json(emp)
		}
			catch (error) {
				res.status(500).send({ message: "Internal Server Error" });
			}
		});
	
		router.post("/update/:id", async (req, res) => {
			try {
				// const { error } = validate(req.body);
				// if (error)
				// 	return res.status(400).send({message:  error.details[0].message +"error message" });
		
				// const employee = await Employee.findOne({ email: req.body.email });
				// if (employee)
				// 	return res
				// 		.status(409)
				// 		.send({ message: "User with given email already Exist!" });
		
				// const salt = await bcrypt.genSalt(Number(process.env.SALT));
				// const hashPassword = await bcrypt.hash(req.body.password, salt);
				const data=req.body;
				const emp = await Employee.updateOne({ _id: req.params.id },data )
				// await Employee({ ...req.body, password: hashPassword }).save();
				res.status(201).send({ message: "User updated successfully" });
			} catch (error) {
				res.status(500).send({ message: "Internal Server Error" });
			}
		});
router.delete("/delete/:id", async (req, res) => {
	// console.log(req.params)
	const emp = await Employee.findByIdAndRemove({ _id: req.params.id })
		try 
		{
		res.json(err);
		}
		catch (error)
		{
			 res.json(emp);
		}
		});
	

module.exports = router;
