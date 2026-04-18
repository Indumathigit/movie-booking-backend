var express = require("express")
var router = express.Router()
var User = require("../models/User")

// Register
router.post("/register", function(req, res) {
  var { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }

  User.findOne({ email: email })
    .then(function(existing) {
      if (existing) {
        return res.status(400).json({ success: false, message: "Email already registered" })
      }
      var newUser = new User({ name, email, password })
      return newUser.save()
    })
    .then(function(user) {
      if (!user) return
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin || false   // ✅ include isAdmin
        }
      })
    })
    .catch(function(err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// Login
router.post("/login", function(req, res) {
  var { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" })
  }

  User.findOne({ email: email })
    .then(function(user) {
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" })
      }
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid email or password" })
      }
      res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin || false   // ✅ include isAdmin
        }
      })
    })
    .catch(function(err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

// Reset password
router.post("/reset", function(req, res) {
  var { email, newPassword } = req.body
  User.findOneAndUpdate(
    { email: email },
    { password: newPassword },
    { new: true }
  )
    .then(function(user) {
      if (!user) return res.status(404).json({ success: false, message: "User not found" })
      res.json({ success: true, message: "Password reset successful" })
    })
    .catch(function(err) {
      res.status(500).json({ success: false, message: err.message })
    })
})

module.exports = router