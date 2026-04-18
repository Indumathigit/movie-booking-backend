var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }   // ✅ added
}, { timestamps: true })

var User = mongoose.model("User", userSchema)
module.exports = User