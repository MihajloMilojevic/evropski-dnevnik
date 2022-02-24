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
	},
	level: {
		type: Number,
		min: 1,
		max: 12,
		required: [true, "Level je obavezan"]
	}
})

module.exports = mongoose.model("Mith", mithSchema);