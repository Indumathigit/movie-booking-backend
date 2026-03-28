var express = require("express")
var mongoose = require("mongoose")
var cors = require("cors")
var dotenv = require("dotenv")

var movieRoutes = require("./routes/movieRoutes")
var bookingRoutes = require("./routes/bookingRoutes")
var theaterRoutes = require("./routes/theaterRoutes")
var authRoutes = require("./routes/authRoutes")

dotenv.config()

var app = express()

app.use(cors())
app.use(express.json())

app.get("/", function (req, res) {
  res.json({ message: "PopcornPass API is running!" })
})

app.use("/api/movies", movieRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/theaters", theaterRoutes)
app.use("/api/auth", authRoutes)

var PORT = process.env.PORT || 5000
var MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(function () {
    console.log("MongoDB connected!")
    app.listen(PORT, function () {
      console.log("Server running on port " + PORT)
    })
  })
  .catch(function (err) {
    console.log("MongoDB connection error:", err)
  })