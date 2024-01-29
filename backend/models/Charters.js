const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharterSchema = new Schema(
	{
		charterDate: {
			type: Date
		}
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Charter", CharterSchema);
