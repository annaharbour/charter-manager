const Charter = require("../models/Charters");
const asyncHandler = require('../middleware/asyncHandler')

const getCommandersForCharter = asyncHandler(async (req, res) => {
	try {
		const { charterId } = req.params;

		console.log("Charter ID:", charterId);

		// const charter = await Charter.findById(charterId).populate("commanders");
		const charter = await Charter.findById(charterId);

		if (!charter) {
			console.log("Charter not found");
			return res.status(404).json({ error: "Charter not found" });
		}

		console.log("Found Charter:", charter);

		res.json({ commanders: charter.commanders });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});


const addNewCharter = asyncHandler(async (req, res) => {
	const charter = new Charter({});

	const newCharter = await charter.save();

	res.status(201).json(newCharter);
});

module.exports = {getCommandersForCharter, addNewCharter}