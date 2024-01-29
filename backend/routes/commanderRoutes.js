const express = require("express");
const router = express.Router();
const {
    getAllCommanders,
	getCommanderById,
    updateCommanderById,
    deleteCommander,
    addNewCommander,
	getCommandersForCharter
} = require("../controllers/commanderController.js");

router.route("/")
	.get(getAllCommanders)
	.post(addNewCommander);

router
	.route("/:id")
	.get(getCommanderById)
	.put(updateCommanderById)
	.delete(deleteCommander);

router.route("/charter/:charterId").get(getCommandersForCharter)


module.exports = router;