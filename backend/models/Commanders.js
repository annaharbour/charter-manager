const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommanderSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		dateStart: {
			type: Date,
			required: true,
		},
		dateEnd: {
			type: Date,
			required: true,
		},
		postNum: {
			type: Number,
			required: true,
		},

		isDeceased: {
			type: Boolean,
			required: true,
			default: false,
		},
		charters: [
			{
				charter: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Charter",
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Commander", CommanderSchema);
