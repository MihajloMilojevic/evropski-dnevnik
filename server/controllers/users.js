const User = require("../models/user")
const StatusCodes = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
	const { email, password } = req.body;

  if (!email ) {
    throw new BadRequestError("Email je obavezan")
  }

  if (!password) {
    throw new BadRequestError("Lozinka je obavezna")
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Pogrešan email')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Pogrešna lozinka')
  }
  res.status(StatusCodes.OK).json({ user: { username: user.username,email: user.email, _id: user["_id"],  } })
}

const register = async (req, res) => {
	let user = await User.create(req.body);
	const {_id, username, email} = user;
	res.status(StatusCodes.CREATED).json({ ok: true , user: {_id, username, email} })
}

module.exports = {
  register,
  login,
}