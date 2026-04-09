var mongoose = require("mongoose")

var bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  user: { name: String, email: String },
  movie: { title: String, poster: String, genre: [String] },
  showtime: {
    time: String,
    format: String,
    screen: String,
    date: String,
    theaterId: Number,
    price: { standard: Number, premium: Number, recliner: Number }
  },
  seats: [
    new mongoose.Schema({
      id: String,
      row: String,
      number: Number,
      type: String
    }, { _id: false })
  ],
  totalAmount: { type: Number, required: true },
  paymentDetails: { method: String, transactionId: String, status: String, paidAt: String },
  bookedAt: { type: String, required: true },
  // ✅ Added status field
  status: { type: String, default: "confirmed", enum: ["confirmed", "cancelled"] }
}, { timestamps: true })

var Booking = mongoose.model("Booking", bookingSchema)
module.exports = Booking