const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharterSchema = new Schema(
	{
		dateIssued: {
			type: Date,
			required: true,
		},
		charterImage: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Charter", CharterSchema);
