const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

module.exports = (err, req, res, next) => {
	console.error(err);
	if (err instanceof CustomAPIError) {
	  return res.status(err.statusCode).json({ ok: false,  message: err.message })
	}
	return res
	  .status(StatusCodes.INTERNAL_SERVER_ERROR)
	  .json({ ok: false,  message: "Došlo je do greške, probajte ponovo kasnije" })
  }