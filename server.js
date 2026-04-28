require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
  next()
})

app.use(express.json())

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log("DB ERROR:", err);
    process.exit(1); 
  });

// ✅ Routes
app.use("/auth", require("./routes/auth"))
app.use("/tasks", require("./routes/tasks"))
app.use("/study", require("./routes/study"))
app.use("/jobs", require("./routes/jobs"))
app.use("/notes", require("./routes/notes"))

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


