const { Router } = require("express");
const { getAllUsers, postUser, deleteUser, updateUser, updatePasswordUser, getUserById } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/:user_id', getUserById);

usersRouter.post("/", postUser)

usersRouter.delete("/:id", deleteUser)

usersRouter.put("/user_info/:id", updateUser)

usersRouter.put("/user_password/:id", updatePasswordUser)


module.exports = usersRouter;