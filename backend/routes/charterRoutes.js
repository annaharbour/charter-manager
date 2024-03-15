const express = require("express");
const router = express.Router();
const {
	getCharterById,
	addNewCharter,
	getAllCharters,
	updateCharterById,
	deleteCharter
} = require("../controllers/charterController.js");

router.route("/:charterId").get(getCharterById).put(updateCharterById).delete(deleteCharter)
router.route("/").get(getAllCharters).post(addNewCharter);

module.exports = router;
