const express = require("express");
const router = express.Router();
const {createMith, getRandomMith} = require("../controllers/miths")

router.route("/").get(getRandomMith).post(createMith);

module.exports = router;