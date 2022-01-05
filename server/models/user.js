const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
	email: {
		type: String,
        required: true,
        trim: true,
        unique: true
	},
    password: {
        type: String,
        required: true,
        trim: true
    }
})

const User = mongoose.model("User", userShema);

module.exports = User;