const User = require("../models/user")
const StatusCodes = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')

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
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ ok: true, user: { username: user.username,email: user.email, _id: user["_id"],  }, token })
}

const register = async (req, res) => {
	let user = await User.create(req.body);
	const {_id, username, email} = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ ok: true, user: { username: user.username,email: user.email, _id: user["_id"],  }, token })
}

const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndRemove({_id: req.user.userId});
  if (!deleted) {
    throw new NotFoundError(`Korisnik ne postoji`)
  }
  res.status(StatusCodes.OK).json({ok: true});
}

module.exports = {
  register,
  login,
  deleteUser
}