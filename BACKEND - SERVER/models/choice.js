const mongoose = require("mongoose");

const choiceSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["quiz", "image"],
        required: [true, "Tip je obavezan"]
    },
    image: {
        type: String,
        default: ""
    },
    question: {
        type: String,
        required: [true, "Pitanje je obavezno"]
    },
    answers: {
        type: [String],
        default: [],
        required: [true, "Ponudjeni odgovori su obavezni"]
    },
    correct: {
        type: Number,
        required: [true, "Index tačnog odgovorora je obavezan"],
        min: 0
    },
	level: {
		type: Number,
		min: 1,
		max: 12,
		required: [true, "Level je obavezan"]
	}
})

module.exports = mongoose.model("Choice", choiceSchema);