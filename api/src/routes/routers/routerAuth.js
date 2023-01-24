const { Router } = require("express");
const { loginCtrl, federatedLoginCtrl } = require("../controllers/AuthControllers.js");


const authRouter = Router();

authRouter.post("/login", loginCtrl)

authRouter.post("/federated_login", federatedLoginCtrl)

module.exports = authRouter