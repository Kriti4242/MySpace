const mongoose = require("mongoose")

module.exports = mongoose.model("Task", new mongoose.Schema({
  title: String,
  userId: mongoose.Schema.Types.ObjectId
}))
