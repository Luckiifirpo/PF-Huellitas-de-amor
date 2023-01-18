const { Router } = require("express");
const { getAllUsers, postUser, deleteUser, updateUser } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.post("/", postUser)

usersRouter.delete("/:id", deleteUser)

usersRouter.put("/:id", updateUser)


module.exports = usersRouter;