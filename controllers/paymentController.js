var Stripe = require("stripe")
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

function createPaymentIntent(req, res) {
  var amount = req.body.amount
  var currency = req.body.currency || "inr"

  stripe.paymentIntents.create({
    amount: amount * 100,
    currency: currency,
    payment_method_types: ["card"]
  })
    .then(function (paymentIntent) {
      res.json({
        success: true,
        clientSecret: paymentIntent.client_secret
      })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

module.exports = { createPaymentIntent }