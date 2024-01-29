const express = require("express");
const router = express.Router();
const {
	getCharterById,
	addNewCharter,
	getAllCharters
} = require("../controllers/charterController.js");

router.get("/:charterId", getCharterById);
router.route("/").get(getAllCharters).post(addNewCharter);


module.exports = router;
