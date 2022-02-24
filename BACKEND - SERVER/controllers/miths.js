const Mith = require("../models/mith");
const StatusCodes = require("http-status-codes");

const createMith = async (req, res) => {
	const mith = await Mith.create(req.body);
	res.status(StatusCodes.CREATED).json({ok: true, mith});
}

module.exports = {
	createMith,
}