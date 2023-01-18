const { Router } = require("express");
const { getAllUsers, postUser, deleteUser } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.post("/", postUser)

usersRouter.delete("/:id", deleteUser)


module.exports = usersRouter;