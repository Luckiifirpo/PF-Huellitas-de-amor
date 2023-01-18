const { Router } = require("express");
const { getAllUsers, postUser } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);

usersRouter.post("/", postUser)


module.exports = usersRouter;