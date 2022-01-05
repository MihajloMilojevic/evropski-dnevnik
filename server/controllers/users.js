const User = require("../models/user")
const StatusCodes = require("http-status-codes");
const { CustomAPIError } = require('../errors');

const getAllUsers = async(req, res) => {
	const users = await User.find();
	res.status(StatusCodes.OK).json({ok: true, users})
}

const login = async (req, res) => {
	
}

const register = async (req, res) => {
	const {username, email, password} = req.body;

	const usersByUsername = await User.find({username});
	if(usersByUsername.length !== 0)
		throw new CustomAPIError("Korisničko ime je zauzeto", 400);
	const usersByEmail = await User.find({email});

	if(usersByEmail.length !== 0)
		throw new CustomAPIError("Email je zauzet", 400);
	
	const user = await User.create({ username, password, email});
	res.status(StatusCodes.CREATED).json({ ok: true , user })
}

const DeleteUserById = async (req, res) => {
	const id = req.params.id;
	const deleted = await User.findOneAndDelete({_id: id});
	res.status(StatusCodes.OK).json({ok: true, deleted})
}

const DeleteUserByUsername = async (req, res) => {
	const username = req.params.username;
	const deleted = await User.findOneAndDelete({username});
	res.status(StatusCodes.OK).json({ok: true, deleted})
}

const DeleteUserByEmail = async (req, res) => {
	const email = req.params.email;
	const deleted = await User.findOneAndDelete({email});
	res.status(StatusCodes.OK).json({ok: true, deleted})
}

module.exports = {
    register,
	getAllUsers,
	DeleteUserById,
	DeleteUserByEmail,
	DeleteUserByUsername
}