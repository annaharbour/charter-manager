const Charter = require("../models/Charters");
const asyncHandler = require('../middleware/asyncHandler')

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

		console.log("Found Charter:", charter);

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
	  const charters = await Charter.find();
  
	  if (!charters || charters.length === 0) {
		console.log("No charters found");
		return res.status(404).json({ error: "No charters found" });
	  }
  
	  console.log("Found Charters:", charters);
  
	  res.json({ charters });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  });
  

// New Charter
// Route POST @ /api/charters
const addNewCharter = asyncHandler(async (req, res) => {
	const charter = new Charter({});

	const newCharter = await charter.save();

	res.status(201).json(newCharter);
});

module.exports = {getCharterById, addNewCharter, getAllCharters}