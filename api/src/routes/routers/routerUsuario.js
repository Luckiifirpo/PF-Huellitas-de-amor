const { Router } = require("express");
const { getAllUsers, deleteUser } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.delete('/', deleteUser)


module.exports = usersRouter;