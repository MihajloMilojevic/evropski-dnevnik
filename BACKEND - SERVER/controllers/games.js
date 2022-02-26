const Mith = require("../models/mith");
const Choice = require("../models/choice");
const Memory = require("../models/memory");
const StatusCodes = require("http-status-codes");

const createMith = async (req, res) => {
	const mith = await Mith.create(req.body);
	res.status(StatusCodes.CREATED).json({ok: true, mith});
}

const createChoice = async (req, res) => {
    const choice = await Choice.create(req.body);
    res.status(StatusCodes.CREATED).json({ok: true, choice});
}

const createMemory = async (req, res) => {
	const memory = await Memory.create(req.body);
	res.status(StatusCodes.OK).json({ok: true, memory})
}

module.exports= {
	createMith,
    createChoice,
	createMemory
}