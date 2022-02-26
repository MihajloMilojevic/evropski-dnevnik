const {createMith, createChoice, createMemory} = require("../controllers/games")

const express = require('express');
const router = express.Router();

router.post("/mith", createMith);
router.post("/choice", createChoice);
router.post("/memory", createMemory);

module.exports = router