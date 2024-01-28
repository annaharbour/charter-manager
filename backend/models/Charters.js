const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharterSchema = new Schema(
	{
		charterDate: {
			type: Date
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Charter", CharterSchema);

// Any other differentiating factors for the Charters? Is there a number, id, etc?
// Add charter?
