const express = require("express");
const router = express.Router();
const {
	getCommandersForCharter,
	addNewCharter,
} = require("../controllers/charterController.js");

router.get("/:charterId", getCommandersForCharter);
router.route("/").post(addNewCharter);


module.exports = router;
