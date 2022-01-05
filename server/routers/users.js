const express = require("express");
const {register, getAllUsers, DeleteUserById, DeleteUserByEmail, DeleteUserByUsername} = require("../controllers/users");

const router = express.Router();

const deleteRouter = express.Router();
deleteRouter.route("/id/:id").delete(DeleteUserById);
deleteRouter.route("/email/:email").delete(DeleteUserByEmail);
deleteRouter.route("/username/:username").delete(DeleteUserByUsername);

router.use("/delete", deleteRouter);
router.route("/register").post(register);
router.route("/").get(getAllUsers);


module.exports = router;