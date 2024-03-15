const Commander = require("../models/Commanders");
const Charter = require("../models/Charters");
const asyncHandler = require("../middleware/asyncHandler");
const mongoose = require("mongoose");

// Get all commanders
// Route GET @ api/commanders
const getAllCommanders = asyncHandler(async (req, res) => {
	try {
		const commanders = await Commander.find().populate("charters");
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

const addNewCommander = asyncHandler(async (req, res) => {
	try {
		const { name, image, dateStart, dateEnd, isDeceased, charters } =
			req.body;

		const commander = new Commander({
			name: name || "Sample name",
			image: image || "default image",
			dateStart: dateStart || Date.now(),
			dateEnd: dateEnd || Date.now(),
			isDeceased: isDeceased || false,
			charters: charters,
		});

		const newCommander = await commander.save();
		await Commander.populate(newCommander, { path: "charters" });
		res.status(201).json(newCommander);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get commanders for charter
// Route @ api/commanders/:charterId
const getCommandersForCharter = asyncHandler(async (req, res) => {
	try {
		const { charterId } = req.params;

		const commanders = await Commander.find({ charters: charterId })
			.populate("charters")
			.sort({ createdAt: "desc" });

		if (!commanders || commanders.length === 0) {
			console.log("No commanders found for the charter");
			return res
				.status(404)
				.json({ error: "No commanders found for the charter" });
		}

		res.json({ commanders });
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

const updateCommanderById = asyncHandler(async (req, res) => {
	try {
		const { name, image, dateStart, dateEnd, isDeceased, charters } =
			req.body;
		if (
			!name ||
			!dateStart ||
			!dateEnd ||
			typeof isDeceased === "undefined" 
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
			commander.charters = charters;
			const updatedCommander = await commander.save();
			await updatedCommander.populate("charters");
			res.json(updatedCommander);
		} else {
			return res.status(404).json({ message: "Commander not found" });
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
	addNewCommander,
	getCommanderById,
	getCommandersForCharter,
	updateCommanderById,
	deleteCommander,
};
