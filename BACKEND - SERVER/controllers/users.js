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
  delete user.password;
  console.log(user);
  const returnUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    level: user.level
  }
  res.status(StatusCodes.OK).json({ ok: true, user: returnUser, token })
}

const register = async (req, res) => {
	let user = await User.create(req.body);
  const token = user.createJWT();
  delete user.password;
  console.log(user)
  const returnUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    level: user.level
  }
  res.status(StatusCodes.CREATED).json({ ok: true, user: returnUser, token })
}



const passLevel = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  const passedLevel = Number(req.params.level);
  if(user.level == passedLevel)
  {
    user.level++;
    await user.save();
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({ok: true, levelup: true, user, token})
  }
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ok: true, levelup: false, user, token})
}

module.exports = {
  register,
  login,
  passLevel
}