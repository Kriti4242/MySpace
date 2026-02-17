require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

// ✅ CORS (production + localhost)
app.use(cors({
  origin: [
    "https://my-space-eight-lake.vercel.app",
    "http://localhost:3000"
  ],
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
app
