const router = require("express").Router();
const { Leave } = require("../models/leave");

router.get("/read/:id", async (req, res) => {
	try {
	  const leave = await Leave.find(
		{ userId: req.params.id },
		{}
	  ).sort({ userDate: -1 });
	  // console.log("single Record"+leave)
	  res.status(201).json(leave);
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

router.post("/store", async (req, res) => {
	try {
        const userIds = req.body.userId;
		const today = new Date();
		const date =
		  today.getDate() +
		  "/" +
		  (today.getMonth() + 1) +
		  "/" +
		  today.getFullYear();
		await new Leave({userId:userIds,leaveType:req.body.leaveType,reason:req.body.reason,fromDate:req.body.fromDate,toDate:req.body.toDate,userDate:date,adminDate:null,status:"pending"}).save();
		res.status(201).send({ message: "leave added successfully" });
	} catch (error) {
		res.status(500).send({ message: message.error });
	}
});	

router.get("/read", async (req, res) => {
	try {

		const leave = await Leave.aggregate([
			{
				$lookup:
					{
						from: "employees",
						let: { pid: "$userId" },
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ["$_id", { $toObjectId: "$$pid" }]
									}
								}
							}
						],
						as: "employees"
					}
			},
			{
				$set: {
					employees: {
						$arrayElemAt: ["$employees", 0]
					}
				}
			}
		])
		// const leave = await Leave.aggregate([
		// 	{ $lookup:
		// 	   {
		// 		 from: 'Employee',
		// 		 localField: '_id',
		// 		 foreignField: 'userId',
		// 		 as:"users_details"
				 
		// 	   }
		// 	 }
		// 	])

	//   const leave = await Leave.find(
	// 	{}
	//   ).sort({ userDate: -1 });
	//   console.log("All Leave Record"+leave.fromDate)
	  res.status(201).json(leave);
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  });

  router.get("/edit/:id", async (req, res) => {
	try {
	  const leave = await Leave.findOne({ _id: req.params.id });
	  // console.log("single Record"+leave)
	  res.status(201).json(leave);
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

  router.post("/update/:id", async (req, res) => {
	try { 
		const data=req.body.status;
		const today = new Date();
		const date =
		  today.getDate() +
		  "/" +
		  (today.getMonth() + 1) +
		  "/" +
		  today.getFullYear();
		const leave = await Leave.updateOne({ _id: req.params.id },{adminDate:date,status:data} )
		res.status(201).send({ message: "User updated successfully" });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

router.get("/leavecount/:id", async (req, res) => {
	try {
	  const leave = await Leave.find({ userId: req.params.id , status:"approved"},{})
	//    console.log(" Record"+leave)
	  res.status(201).json(leave);
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

//   router.get("/counts/:id", async (req, res) => {
// 	try {

//   const leave = await Leave.aggregate(
// 	[
// 	   {
// 		  $project:
// 			 {
// 				Start: "$fromDate",
// 				End: "$toDate",
				
// 				days:
// 				   {
// 					  $dateDiff:
// 						 {
// 							startDate: "$fromDate",
// 							endDate: "$toDate",
// 							unit: "day"
// 						 }
// 				   },
// 				_id: 0
// 			 }
// 		}
// 	]
//   )
//   res.status(201).json(leave);
//   console.log("leave count"+ JSON.stringify(leave))
// 	} catch (error) {
// 	  res.status(500).send({ message: error.message });
// 	}
//   });

module.exports = router;


