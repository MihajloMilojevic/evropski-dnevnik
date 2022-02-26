const express = require("express");
const {createLevel, getLevel, fillLevels} = require("../controllers/level");

const router = express.Router();

// router.get("/", fillLevels);

router.post("/", createLevel);
router.get("/:level", getLevel);

module.exports = router;