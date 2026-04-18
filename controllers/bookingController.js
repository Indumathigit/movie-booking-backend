var Booking = require("../models/Booking")
var sendEmail = require("../utils/sendEmail")

function getAllBookings(req, res) {
  Booking.find()
    .then(function (bookings) {
      res.json({ success: true, data: bookings })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function getBookingById(req, res) {
  Booking.findOne({ bookingId: req.params.id })
    .then(function (booking) {
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" })
      }
      res.json({ success: true, data: booking })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function createBooking(req, res) {
  var newBooking = new Booking(req.body)
  newBooking.save()
    .then(function (booking) {
      // send confirmation email
      sendEmail.sendBookingConfirmation(booking)
      res.status(201).json({ success: true, data: booking })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function cancelBooking(req, res) {
  Booking.findOneAndUpdate(
    { bookingId: req.params.id },
    { status: "cancelled" },
    { new: true }
  )
    .then(function (booking) {
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" })
      }
      res.json({ success: true, data: booking })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function getUserBookings(req, res) {
  Booking.find({ "user.email": req.params.email })
    .then(function (bookings) {
      res.json({ success: true, data: bookings })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  cancelBooking,
  getUserBookings
}