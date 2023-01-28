const env = require("dotenv")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const configPayment = (req, res)=> {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
}

module.exports = configPayment;