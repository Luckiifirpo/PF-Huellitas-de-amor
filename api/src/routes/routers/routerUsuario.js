const { Router } = require("express");
const { getAllUsers } = require("../controllers/UsersControllers.js");


const usersRouter = Router();

usersRouter.get('/', getAllUsers);


module.exports = usersRouter;