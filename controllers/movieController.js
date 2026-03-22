var Movie = require("../models/Movie")

function getAllMovies(req, res) {
  Movie.find()
    .then(function (movies) {
      res.json({ success: true, data: movies })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function getMovieById(req, res) {
  Movie.findById(req.params.id)
    .then(function (movie) {
      if (!movie) {
        return res.status(404).json({ success: false, message: "Movie not found" })
      }
      res.json({ success: true, data: movie })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function createMovie(req, res) {
  var newMovie = new Movie(req.body)
  newMovie.save()
    .then(function (movie) {
      res.status(201).json({ success: true, data: movie })
    })
    .catch(function (err) {
      res.status(400).json({ success: false, message: err.message })
    })
}

function updateMovie(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function (movie) {
      if (!movie) {
        return res.status(404).json({ success: false, message: "Movie not found" })
      }
      res.json({ success: true, data: movie })
    })
    .catch(function (err) {
      res.status(400).json({ success: false, message: err.message })
    })
}

function deleteMovie(req, res) {
  Movie.findByIdAndDelete(req.params.id)
    .then(function (movie) {
      if (!movie) {
        return res.status(404).json({ success: false, message: "Movie not found" })
      }
      res.json({ success: true, message: "Movie deleted successfully" })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
}