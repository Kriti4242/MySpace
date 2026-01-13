const mongoose = require("mongoose")

module.exports = mongoose.model("Study", new mongoose.Schema({
  subject: String,
  topic: String,
  deadline: String,
  userId: mongoose.Schema.Types.ObjectId
}))
