const mongoose = require("mongoose");

const mithSchema = new mongoose.Schema({
    title: {
		type: String,
		required: [true, "Naslov je obavezan"],
		trim: true,
	},
	correct: {
		type: Boolean,
		required: [true, "Ispravnost je obavezna"]
	},
	description: {
		type: String,
		trim: true
	}
})

module.exports = mongoose.model("Mith", mithSchema);