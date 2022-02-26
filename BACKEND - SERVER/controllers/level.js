const Level = require("../models/level");
const Mith = require("../models/mith");
const Choice = require("../models/choice");
const Memory = require("../models/memory");
const StatusCodes = require("http-status-codes");
const { NotFoundError } = require("../errors");

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const createLevel = async (req, res) => {
    const level = await Level.create(req.body);
    res.status(StatusCodes.CREATED).json({ok: true, level});
}

const fillLevels = async (req, res) => {
    const levels = [
        {level: 1, type: "mith"},
        {level: 2, type: "quiz"},
        {level: 3, type: "image"},
        {level: 4, type: "memory"},
        {level: 5, type: "mith"},
        {level: 6, type: "quiz"},
        {level: 7, type: "image"},
        {level: 8, type: "memory"},
        {level: 9, type: "mith"},
        {level: 10, type: "quiz"},
        {level: 11, type: "image"},
        {level: 12, type: "memory"}
    ];
    const created = await Level.create(levels);
    res.status(StatusCodes.CREATED).json({ok: true, levels: created})
}

const getLevel = async (req, res) => {
    const levelId = Number(req.params.level);
    const level = await Level.findOne({level: levelId});
    if(!level)
    throw new NotFoundError("Level ne postoji");
    switch(level.type) 
    {
        case "mith":
            console.log("MITH CASE");
            const miths = await Mith.where("level").lte(levelId);
            const randomMith = miths[randomNumber(0, miths.length)];
            console.log(randomMith);
            return res.status(StatusCodes.OK).json({ ok: true, type: level.type, mith: randomMith});
        case "quiz":
            console.log("QUIZ CASE");
            const quizes = await Choice.find({type: "quiz"}).where("level").lte(levelId);
            const randomQuiz = quizes[randomNumber(0, quizes.length)];
            return res.status(StatusCodes.OK).json({ ok: true, type: level.type, quiz: randomQuiz});
        case "image":
            console.log("IMAGE CASE");
            const images = await Choice.find({type: "image"}).where("level").lte(levelId);
            const randomImage= images[randomNumber(0, images.length)];
            return res.status(StatusCodes.OK).json({ ok: true, type: level.type, quiz: randomImage});
        case "memory":
            console.log("MEMORY CASE");
            const memory = await Memory.find({}).where("level").lte(levelId);
            const randomMemory= memory[randomNumber(0, memory.length)];
            return res.status(StatusCodes.OK).json({ ok: true, type: level.type, memory: randomMemory});
    }
    throw new Error();
}

module.exports = {
    createLevel,
    getLevel,
    fillLevels
}