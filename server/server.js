require("dotenv").config();
require("express-async-errors");
const connetDB = require("./database/connect")
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const apiRouter = require("./routers/api");
const express = require('express');
const server = express();

const port = process.env.PORT || 5000;


server.use(express.json())

server.use("/api", apiRouter);

server.use(notFound);
server.use(errorHandler);

const startServer = async () => {
	try {
		await connetDB(process.env.MONGO_URI);
		server.listen(port, () => console.log(`Server slusa na portu ${port}`))
	} catch (error) {
		console.error(error);
	}
}

startServer();