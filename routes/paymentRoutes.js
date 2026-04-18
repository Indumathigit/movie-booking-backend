var express = require("express")
var router = express.Router()
var paymentController = require("../controllers/paymentController")

// ✅ Create Stripe PaymentIntent - required for real card validation
router.post("/create-intent", function(req, res) {
  var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
  var { amount } = req.body

  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" })
  }

 stripe.paymentIntents.create({
  amount: Math.round(amount * 100),
  currency: "inr",
  payment_method_types: ["card"],
  description: "PopcornPass Movie Ticket Booking",
  confirm: false
})

    .then(function(paymentIntent) {
      res.json({
        success: true,
        clientSecret: paymentIntent.client_secret
      })
    })
    .catch(function(err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

module.exports = router