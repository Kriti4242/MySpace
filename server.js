require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

// ✅ CORS
app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// ✅ Routes
app.use("/auth", require("./routes/auth"))
app.use("/tasks", require("./routes/tasks"))
app.use("/study", require("./routes/study"))
app.use("/jobs", require("./routes/jobs"))
app.use("/notes", require("./routes/notes"))

// ✅ Server
app.listen(5000, () => {
  console.log("Server running on port 5000")
})

