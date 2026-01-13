require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()   

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.use("/auth", require("./routes/auth"))
app.use("/tasks", require("./routes/tasks"))

app.listen(5000, () => {
  console.log("Server running on port 5000")
})

app.use("/auth", require("./routes/auth"))
app.use("/tasks", require("./routes/tasks"))
app.use("/study", require("./routes/study"))
app.use("/jobs", require("./routes/jobs"))
app.use("/notes", require("./routes/notes"))
