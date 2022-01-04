const User = require("../models/user")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ ok: true , users })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: `Doslo je do greske. Probaj ponovo kasnije`});
    }
}

const createUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.create({ username: username, password: password});
        res.status(201).json({ ok: true , user })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: `Doslo je do greske. Probaj ponovo kasnije`});
    }
}

module.exports = {
    getAllUsers,
    createUser
}