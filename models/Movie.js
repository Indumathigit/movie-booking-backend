var mongoose = require("mongoose")

var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  imdb: {
    type: Number,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ["now_showing", "coming_soon"],
    default: "now_showing"
  }
}, { timestamps: true })

var Movie = mongoose.model("Movie", movieSchema)

module.exports = Movie