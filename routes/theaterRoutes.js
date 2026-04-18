var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")

// ─── Showtime Schema ──────────────────────────────────────────────
var showtimeSchema = new mongoose.Schema({
  movieId: Number,
  theaterId: Number,
  date: String,
  time: String,
  screen: String,
  format: String,
  price: {
    standard: { type: Number, default: 180 },
    premium: { type: Number, default: 280 },
    recliner: { type: Number, default: 450 }
  },
  availableSeats: { type: Number, default: 96 }
}, { timestamps: true })

var Showtime = mongoose.models.Showtime || mongoose.model("Showtime", showtimeSchema)

// GET /api/theaters/showtimes  — list all (optionally filter by movieId or date)
router.get("/showtimes", function (req, res) {
  var filter = {}
  if (req.query.movieId) filter.movieId = parseInt(req.query.movieId)
  if (req.query.theaterId) filter.theaterId = parseInt(req.query.theaterId)
  if (req.query.date) filter.date = req.query.date

  Showtime.find(filter).sort({ date: 1, time: 1 })
    .then(function (data) {
      res.json({ success: true, data: data })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// POST /api/theaters/showtimes  — add a new showtime
router.post("/showtimes", function (req, res) {
  var showtime = new Showtime(req.body)
  showtime.save()
    .then(function (saved) {
      res.json({ success: true, data: saved })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// PUT /api/theaters/showtimes/:id  — update showtime (pricing, seats, time etc.)
router.put("/showtimes/:id", function (req, res) {
  Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function (updated) {
      if (!updated) return res.status(404).json({ success: false, message: "Showtime not found" })
      res.json({ success: true, data: updated })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// DELETE /api/theaters/showtimes/:id  — remove a showtime
router.delete("/showtimes/:id", function (req, res) {
  Showtime.findByIdAndDelete(req.params.id)
    .then(function (deleted) {
      if (!deleted) return res.status(404).json({ success: false, message: "Showtime not found" })
      res.json({ success: true, message: "Showtime removed" })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

module.exports = router