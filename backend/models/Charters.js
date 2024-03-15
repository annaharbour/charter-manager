const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharterSchema = new Schema(
	{
		postNum: {
			type: Number,
			required: true,
		},
		dateIssued: {
			type: String,
			required: true,
		},
		charterImage: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Charter", CharterSchema);
