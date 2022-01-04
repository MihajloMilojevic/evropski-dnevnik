require("dotenv").config();
const connetDB = require("./database/connect")
const notFound = require("./middleware/notFound");
const express = require('express');

const server = express();

const port = process.env.PORT || 5000;


server.use(express.json())

server.use(notFound);

const startServer = async () => {
	try {
		await connetDB(process.env.MONGO_URI);
		server.listen(port, () => console.log(`Server slusa na portu ${port}`))
	} catch (error) {
		console.error(error);
	}
}

startServer();