const router = require("express").Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let UserProfile  = require("../models/userprofile");
const { Employee, validate } = require("../models/employee");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'E:/veloce/public/profileImages');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.route('/storeProfile').post(upload.single('photo'), (req, res) => {
    const userId = req.body.userId;
    const photo = req.file.filename;

    const newUserData = {
        userId,
        photo
    }

    // const emp = UserProfile.updateOne({ userId: userId },newUserData )
    const newUser = new UserProfile(newUserData);

    newUser.save()
           .then(() => res.json('User Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/read/:id", async (req, res) => {
	try {	

		const profile = await UserProfile.find({ userId: req.params.id },{});
		res.status(201).json(profile)
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
router.get("/userprofile/:id", async (req, res) => {
	try {
        const ID= req.params.id
		const profile = await UserProfile.aggregate([
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
			},
            {
                $match: {
                    'userId': ID
                }
            }
		])
		
	//   console.log("All profile Record"+profile)
	  res.status(201).json(profile);
	} catch (error) {
	  res.status(500).send({ message: error.message });
	}
  });

  router.get("/users/:id", async (req, res) => {
	try {	

		const user = await Employee.find({ _id: req.params.id });
		res.status(201).json(user)
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
