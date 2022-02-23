const express = require("express");
const {register, login, passLevel} = require("../controllers/users");
const auth = require("../middleware/authentication");

const router = express.Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/level/pass/:level").get(auth, passLevel);

module.exports = router;