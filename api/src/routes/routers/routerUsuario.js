const { Router } = require("express");
const { getAllUsers, postUser, deleteUser, updateUser, updatePasswordUser, getUserById, forgotPassword } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.get('/:user_id', getUserById);

usersRouter.post("/", postUser)

usersRouter.delete("/:id", deleteUser)

usersRouter.put("/user_info/:id", updateUser)

usersRouter.put("/user_password/:id", updatePasswordUser)

usersRouter.post("/forgot-password", forgotPassword)

// usersRouter.put("/resetpassaword/:id", resetpassword)


module.exports = usersRouter;