const { Router } = require("express");
const { registerCtrl, loginCtrl } = require("../controllers/AuthControllers.js");


const authRouter = Router();

authRouter.post("/login", loginCtrl)

authRouter.post("/register", registerCtrl)