const mongoose = require("mongoose")

module.exports = mongoose.model("Note", new mongoose.Schema({
  title: String,
  content: String,
  userId: mongoose.Schema.Types.ObjectId
}))
