const Commander = require("../models/Commanders");
const asyncHandler = require("../middleware/asyncHandler");

// Get all commanders
// Route GET @ api/commanders
const getAllCommanders = asyncHandler(async (req, res) => {
	try {
		const commanders = await Commander.find();
		if (commanders && commanders.length > 0) {
			res.json({ commanders });
		} else {
			res.json({ message: "No commanders found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Add a new commander to the database
// Route POST @ api/commanders
const addNewCommander = asyncHandler(async (req, res) => {
	try {
		const { name, image, dateStart, dateEnd, isDeceased, postNum } = req.body;

		const commander = new Commander({
			name: name || "Sample name",
			image: image || "default image",
			dateStart: dateStart || Date.now(),
			dateEnd: dateEnd || Date.now(),
			isDeceased: isDeceased || false,
			postNum: postNum || 123,
		});

		const newCommander = await commander.save();
		res.status(201).json(newCommander);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get a commander to the database by their id
// Route GET @ api/commanders/:id
const getCommanderById = asyncHandler(async (req, res) => {
	try {
		const commander = await Commander.findById(req.params.id);

		if (commander) {
			res.json(commander);
		} else {
			res.status(404).json({ message: "Commander not found" });
			throw new Error("Commander not found");
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Update Commander by id
// Route PUT @ api/commanders/:id
const updateCommanderById = asyncHandler(async (req, res) => {
	try {
		const { name, image, dateStart, dateEnd, isDeceased, postNum } = req.body;
		if (
			!name ||
			!dateStart ||
			!dateEnd ||
			typeof isDeceased === "undefined" ||
			!postNum
		) {
			return res
				.status(400)
				.json({ error: "Missing required fields in the request body" });
		}

		const commander = await Commander.findByIdAndUpdate(req.params.id);

		if (commander) {
			commander.name = name;
			commander.image = image;
			commander.dateStart = dateStart;
			commander.dateEnd = dateEnd;
			commander.isDeceased = isDeceased;
			commander.postNum = postNum;

			const updatedCommander = await commander.save();
			res.json(updatedCommander);
		} else {
			res.status(404).json({ message: "Commander not found" });
			throw new Error("Commander not found");
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Delete Commander
// // Route DELETE @ api/commanders/:id
const deleteCommander = asyncHandler(async (req, res) => {
	const commander = await Commander.findById(req.params.id);

	if (commander) {
		await Commander.deleteOne({ _id: commander._id });
		res.status(200).json({ message: "Commander deleted" });
	} else {
		res.status(404);
		throw new Error("Commander not found");
	}
});

module.exports = {
	getAllCommanders,
	getCommanderById,
	updateCommanderById,
	deleteCommander,
	addNewCommander,
};
