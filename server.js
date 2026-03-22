var express = require("express")
var mongoose = require("mongoose")
var cors = require("cors")
var dotenv = require("dotenv")

var movieRoutes = require("./routes/movieRoutes")
var bookingRoutes = require("./routes/bookingRoutes")

dotenv.config()

var app = express()

app.use(cors())
app.use(express.json())

app.use("/api/movies", movieRoutes)
app.use("/api/bookings", bookingRoutes)

app.get("/", function (req, res) {
  res.json({ message: "PopcornPass API is running!" })
})

var PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log("MongoDB connected")
    app.listen(PORT, function () {
      console.log("Server running on port " + PORT)
    })
  })
  .catch(function (err) {
    console.log("MongoDB connection error:", err)
  })