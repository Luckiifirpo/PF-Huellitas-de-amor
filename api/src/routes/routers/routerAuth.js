const { Router } = require("express");
const { loginCtrl } = require("../controllers/AuthControllers.js");


const authRouter = Router();

authRouter.post("/login", loginCtrl)

module.exports = authRouter