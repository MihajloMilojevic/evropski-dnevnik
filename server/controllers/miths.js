const Mith = require("../models/mith");
const StatusCodes = require("http-status-codes");
const { NotFoundError } = require("../errors");

const randomNumber = (min, max) => {
	return Math.floor((Math.random() * (max - min)) + min)
}

const getRandomMith = async (req, res) => {
	const allMiths = await Mith.find({});
	if(allMiths.length === 0)
		throw new NotFoundError("Ne postoji nijedan mit")
	const ind = randomNumber(0, allMiths.length);
	res.status(StatusCodes.OK).json({ok: true, mith: allMiths[ind]})
}

const createMith = async (req, res) => {
	const mith = await Mith.create(req.body);
	res.status(StatusCodes.CREATED).json({ok:true, mith});
}

module.exports = {
	createMith,
	getRandomMith
}