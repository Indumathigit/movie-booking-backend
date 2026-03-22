var express = require("express")
var router = express.Router()
var bookingController = require("../controllers/bookingController")

router.get("/", bookingController.getAllBookings)
router.get("/user/:email", bookingController.getBookingsByEmail)
router.get("/:id", bookingController.getBookingById)
router.post("/", bookingController.createBooking)
router.delete("/:id", bookingController.cancelBooking)

module.exports = router
