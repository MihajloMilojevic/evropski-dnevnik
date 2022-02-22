require("dotenv").config();
require("express-async-errors");
const connetDB = require("./database/connect")
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routers/users");
const mithRouter = require("./routers/miths");
const express = require('express');
const server = express();

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const port = process.env.PORT || 3000;

server.set('trust proxy', 1);
server.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(xss());

server.use(express.static("public"))
server.use("/api/users", userRouter);
server.use("/api/miths", mithRouter);

server.get("/", (req, res) => res.send("Hello"))

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