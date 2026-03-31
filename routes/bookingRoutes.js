var express = require("express")
var router = express.Router()
var bookingController = require("../controllers/bookingController")
var Booking = require("../models/Booking")

// Get all bookings for a specific showtime
router.get("/showtime", function(req, res) {
  var { date, time, screen } = req.query
  Booking.find({
    "showtime.date": date,
    "showtime.time": time,
    "showtime.screen": screen
  })
    .then(function(bookings) {
      res.json({ success: true, data: bookings })
    })
    .catch(function(err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

router.get("/", bookingController.getAllBookings)
router.get("/user/:email", bookingController.getBookingsByEmail)
router.get("/:id", bookingController.getBookingById)
router.post("/", bookingController.createBooking)
router.delete("/:id", bookingController.cancelBooking)

module.exports = router