const CustomAPIError = require("./customAPIError");
const UnauthenticatedError = require("./unauthenticated");
const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");

module.exports = {
	CustomAPIError,
	UnauthenticatedError,
	BadRequestError,
	NotFoundError
}