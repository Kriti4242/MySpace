const mongoose = require("mongoose")

module.exports = mongoose.model("Job", new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  userId: mongoose.Schema.Types.ObjectId
}))
