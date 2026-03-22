 
var mongoose = require("mongoose")

var theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  facilities: [String],
  screens: Number
}, { timestamps: true })

module.exports = mongoose.model("Theater", theaterSchema)