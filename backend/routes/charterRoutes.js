const express = require("express");
const router = express.Router();
const {
	getCharterById,
	addNewCharter,
} = require("../controllers/charterController.js");

router.get("/:charterId", getCharterById);
router.route("/").post(addNewCharter);


module.exports = router;
