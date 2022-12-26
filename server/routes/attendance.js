const router = require("express").Router();
const { Attendance } = require("../models/attendance");

router.get("/read/:id", async (req, res) => {
  try {
    const attendance = await Attendance.find(
      { userId: req.params.id },
      {}
    ).sort({ Date: -1 });
    // console.log("single Record"+attendance)
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/read/checkin/:id", async (req, res) => {
  try {
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    const attendancecheckin = await Attendance.find(
      { userId: req.params.id, Date: date},
      {}
    );
    res.status(201).json(attendancecheckin);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/read/checkout/:id", async (req, res) => {
	try {
	  const today = new Date();
	  const date =
		today.getDate() +
		"/" +
		(today.getMonth() + 1) +
		"/" +
		today.getFullYear();
	  const attendancecheckin = await Attendance.find(
		{ userId: req.params.id, Date: date,checkOutTime:null},
		{}
	  );
	  res.status(201).json(attendancecheckin);
	} catch (error) {
	  res.status(500).send({ message: "Internal Server Error" });
	}
  });

router.post("/checkIn", async (req, res) => {
  try {
    const userIds = req.body.userId;
    // console.log("id"+userIds)
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    hour = today.getHours() < 12 ? today.getHours() : today.getHours() - 12;
    const time = hour + ":" + today.getMinutes() + ":" + today.getSeconds();
    // console.log(time)
    await new Attendance({
      userId: userIds,
      Date: date,
      checkInTime: time,
      checkOutTime: null,
    }).save();

    res.status(201).send({ message: "check In successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/checkOut/:id", async (req, res) => {
  try {
    const today = new Date();
    const date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    hour = today.getHours() < 12 ? today.getHours() : today.getHours() - 12;
    const time = hour + ":" + today.getMinutes() + ":" + today.getSeconds();
    // console.log(time)
    await Attendance.updateOne(
      { userId: req.params.id, Date: date },
      { checkOutTime: time }
    );

    res.status(201).send({ message: "checkout successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
