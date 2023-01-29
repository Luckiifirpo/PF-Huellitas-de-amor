const { Router } = require("express");
const { loginCtrl, federatedLoginCtrl, getLogout } = require("../controllers/AuthControllers.js");


const authRouter = Router();


authRouter.post("/login", loginCtrl);

authRouter.post("/federated_login", federatedLoginCtrl);

authRouter.get("/logout", getLogout)

module.exports = authRouter