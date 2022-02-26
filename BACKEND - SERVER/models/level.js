const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
	level: {
		type: Number,
		min: 1,
		max: 12,
		unique: true,
		required: [true, "Level je obavezan"]
	},
    type: {
        type: String,
        enum: ["mith", "quiz", "image", "memory"]
    }
})

module.exports = mongoose.model("Level", levelSchema);