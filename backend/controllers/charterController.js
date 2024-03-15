const Charter = require("../models/Charters");
const asyncHandler = require("../middleware/asyncHandler");

// Get charter by id
// Route @ api/charters/:id
const getCharterById = asyncHandler(async (req, res) => {
	try {
		const { charterId } = req.params;

		console.log("Charter ID:", charterId);

		const charter = await Charter.findById(charterId);

		if (!charter) {
			console.log("Charter not found");
			return res.status(404).json({ error: "Charter not found" });
		}

		res.json({ charter });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get all Charters
// Route GET @ /api/charters
const getAllCharters = asyncHandler(async (req, res) => {
	try {
		const charters = await Charter.find().sort({dateIssued: -1});

		if (!charters || charters.length === 0) {
			console.log("No charters found");
			return res.status(404).json({ error: "No charters found" });
		}

		res.json({ charters });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});


const updateCharterById = asyncHandler(async (req, res) => {
	try {
		const { charterImage, postNum, dateIssued } =
			req.body;
		if (
			!charterImage ||
			!postNum ||
			!dateIssued
		) {
			return res
				.status(400)
				.json({ error: "Missing required fields in the request body" });
		}

		const charter = await Charter.findByIdAndUpdate(req.params.charterId);
		if (charter) {
			charter.postNum = postNum;
			charter.charterImage = charterImage;
			charter.dateIssued = dateIssued;
			
			const updatedCharter = await charter.save();
			res.json(updatedCharter);
		} else {
			return res.status(404).json({ message: "Charter not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Delete Charter
// Route DELETE @ / api/charters/:id
const deleteCharter = asyncHandler(async (req, res) => {
	const charterId = req.params.charterId;
	try {
	  const charter = await Charter.findById(charterId);
	  if (charter) {
		await Charter.deleteOne({ _id: charterId });
		res.status(200).json({ message: "Charter deleted" });
	  } else {
		res.status(404).json({ message: "Charter not found" });
	  }
	} catch (error) {
	  console.error("Error deleting charter:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
  

// New Charter
// Route POST @ /api/charters
const addNewCharter = asyncHandler(async (req, res) => {
	try {
		const { dateIssued, charterImage, postNum } = req.body;

		const charter = new Charter({ dateIssued, postNum, charterImage });

		const newCharter = await charter.save();

		res.status(201).json(newCharter);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = { getCharterById, addNewCharter, getAllCharters, updateCharterById, deleteCharter };
