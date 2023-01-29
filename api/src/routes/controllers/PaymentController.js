const env = require("dotenv")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
    const {amount}= req.body
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount,
        payment_method_types: ["card"],
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
}

module.exports= payment;