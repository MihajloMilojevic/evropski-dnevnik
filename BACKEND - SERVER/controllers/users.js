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
    level: user.level,
    points: user.points
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
    level: user.level,
    points: user.points
  }
  res.status(StatusCodes.CREATED).json({ ok: true, user: returnUser, token })
}



const passLevel = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  console.log(user);
  const passedLevel = Number(req.params.level);
  let pointsToAdd = (passLevel - 1) / 4 + 1;
  user.points += pointsToAdd;
  if(user.level == passedLevel)
  {
    user.level++;
    user.points += 2;
    pointsToAdd += 2;
    await user.save();
    const token = user.createJWT();
    return res.status(StatusCodes.OK).json({ok: true, levelup: true, user, token, points: pointsToAdd})
  }
  user.save();
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ok: true, levelup: false, user, token, points: pointsToAdd})
}

module.exports = {
  register,
  login,
  passLevel
}