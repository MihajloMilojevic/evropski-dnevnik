import Choice from "../models/choice";
const StatusCodes = require("http-status-codes");

const createChoice = async (req, res) => {
    const choice = await Choice.create(req.body);
    res.status(StatusCodes.CREATED).json({ok: true, choice});
}

module.exports= {
    createChoice
}