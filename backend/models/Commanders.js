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
			type: String,
			required: true,
		},
		dateEnd: {
			type: String,
			required: true,
		},
		isDeceased: {
			type: Boolean,
			required: true,
			default: false,
		},
		charters: [{ type: Schema.Types.ObjectId, ref: 'Charter' }]
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Commander", CommanderSchema);
