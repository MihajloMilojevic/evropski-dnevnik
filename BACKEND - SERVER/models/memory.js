const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema({
    urls: {
		type: [String],
		required: [true, "Slike su obavezne"]
	},
	table: {
		type: [[Number]],
		required: [true, "Tabela je obavezna"]
	},
	level: {
		type: Number,
		min: 1,
		max: 12,
		required: [true, "Level je obavezan"]
	}
})

module.exports = mongoose.model("Memory", memorySchema);