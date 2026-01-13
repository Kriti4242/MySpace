const router = require("express").Router()
const Task = require("../models/Task")
const auth = require("../middleware/auth")

// Get all tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id })
  res.json(tasks)
})

// Add task
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id
  })
  res.json(task)
})

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: "Task deleted" })
})

module.exports = router
