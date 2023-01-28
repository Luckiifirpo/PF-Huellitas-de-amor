const { Router } = require("express");
const configPayment =require("../controllers/ConfigPaymentController")
const payment =require("../controllers/PaymentController")

const configPaymentRouter = Router();

configPaymentRouter.get("/", configPayment);
configPaymentRouter.post("/", payment);


module.exports = configPaymentRouter;