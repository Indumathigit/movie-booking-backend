var express = require("express")
var router = express.Router()
var { sendBookingConfirmation } = require("../utils/emailService")

// You likely already have a Booking model — adjust the path if needed
var Booking = require("../models/Booking")

// GET /api/bookings?email=xxx
router.get("/", function (req, res) {
  var email = req.query.email
  if (!email) return res.status(400).json({ success: false, message: "Email required" })

  Booking.find({ "user.email": email })
    .sort({ bookedAt: -1 })
    .then(function (bookings) {
      res.json({ success: true, data: bookings })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// POST /api/bookings
router.post("/", function (req, res) {
  var bookingData = req.body

  var booking = new Booking(bookingData)
  booking.save()
    .then(function (saved) {
      // ✅ Send confirmation email after successful save
      sendBookingConfirmation(saved)
      res.json({ success: true, data: saved })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// PUT /api/bookings/:id/cancel
router.put("/:id/cancel", function (req, res) {
  var bookingId = req.params.id

  Booking.findOneAndUpdate(
    {
      $or: [
        { bookingId: bookingId },
        { _id: bookingId.match(/^[a-f\d]{24}$/i) ? bookingId : null }
      ]
    },
    { status: "cancelled" },
    { new: true }
  )
    .then(function (updated) {
      if (!updated) return res.status(404).json({ success: false, message: "Booking not found" })
      res.json({ success: true, data: updated })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

module.exports = router