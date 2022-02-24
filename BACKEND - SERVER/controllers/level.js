import Level from "../models/level";
import Mith from "../models/mith";
import Choice from "../models/choice";
const StatusCodes = require("http-status-codes");
const { NotFoundError } = require("../errors");

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const createLevel = async (req, res) => {
    const level = await Level.create(req.body);
    res.status(StatusCodes.CREATED).json({ok: true, level});
}

const getLevel = async (req, res) => {
    const levelId = Number(req.params.level);
    const level = await Level.find({level: levelId});
    if(!level)
        throw new NotFoundError("Level ne postoji");
    switch(level.type) 
    {
        case "mith":
            const miths = await Mith.where("level").lte(levelId);
            const randomMith = miths[randomNumber(0, miths.length)];
            res.status(StatusCodes.OK).json({ ok: true, mith: randomMith});
            break;
        case "quiz":
            const questions = await Choice.find({type: "quiz"}).where("level").lte(levelId);
            const randomQuestion = questions[randomNumber(0, questions.length)];
            res.status(StatusCodes.OK).json({ ok: true, quiz: randomQuestion});
            break;
        case "image":
            const questions = await Choice.find({type: "image"}).where("level").lte(levelId);
            const randomQuestion = questions[randomNumber(0, questions.length)];
            res.status(StatusCodes.OK).json({ ok: true, quiz: randomQuestion});
            break;
    }
    throw new Error();
}

module.exports = {
    createLevel,
    getLevel
}