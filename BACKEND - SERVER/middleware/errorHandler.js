const { StatusCodes } = require('http-status-codes')

module.exports = (err, req, res, next) => {
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Doslo je do greske, probajte ponovo kasnije",
	  }
	
	  if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
		  .map((item) => item.message)
		  .join(', ')
		customError.statusCode = StatusCodes.BAD_REQUEST;
	  }
	  if (err.code && err.code === 11000) {
		customError.msg = err.keyValue.username ? "Korisničko ime je zauzeto" : "Email je zauzet";
		customError.statusCode = StatusCodes.BAD_REQUEST;
	  }
	  if (err.name === 'CastError') {
		customError.msg = `Pogrešan id: ${err.value}`
		customError.statusCode = StatusCodes.NOT_FOUND;
	  }
	
	  return res.status(customError.statusCode).json({ ok: false, message: customError.msg })
  }