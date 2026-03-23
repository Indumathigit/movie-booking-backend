var Theater = require("../models/Theater")

function getAllTheaters(req, res) {
  Theater.find()
    .then(function (theaters) {
      res.json({ success: true, data: theaters })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function createTheater(req, res) {
  var newTheater = new Theater(req.body)
  newTheater.save()
    .then(function (theater) {
      res.status(201).json({ success: true, data: theater })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

function deleteTheater(req, res) {
  Theater.findByIdAndDelete(req.params.id)
    .then(function () {
      res.json({ success: true, message: "Theater deleted" })
    })
    .catch(function (err) {
      res.status(500).json({ success: false, message: err.message })
    })
}

module.exports = {
  getAllTheaters,
  createTheater,
  deleteTheater
}