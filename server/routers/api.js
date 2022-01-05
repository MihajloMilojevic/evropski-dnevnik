const express = require("express");
const usersRouter = require("./users");

const router = express.Router();
router.use("/users", usersRouter);
//router.route("/register").post(register);

module.exports = router;