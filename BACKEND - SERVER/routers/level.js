const express = require("express");
const {createLevel, getLevel} = require("../controllers/level");

const router = express.Router();


router.post("/", createLevel);
router.get("/:level", getLevel);

module.exports = router;