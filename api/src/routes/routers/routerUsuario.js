const { Router } = require("express");
const { getAllUsers, postUser, deleteUser, updateUser, updatePasswordUser } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.post("/", postUser)

usersRouter.delete("/:id", deleteUser)

usersRouter.put("/:id", updateUser)

usersRouter.put("/password", updatePasswordUser)


module.exports = usersRouter;