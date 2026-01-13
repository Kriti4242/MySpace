const router = require("express").Router()
const Study = require("../models/Study")
const auth = require("../middleware/auth")

// Get all study items
router.get("/", auth, async (req, res) => {
  const items = await Study.find({ userId: req.user.id })
  res.json(items)
})

// Add study item
router.post("/", auth, async (req, res) => {
  const item = await Study.create({
    subject: req.body.subject,
    topic: req.body.topic,
    deadline: req.body.deadline,
    userId: req.user.id
  })
  res.json(item)
})

// Delete study item
router.delete("/:id", auth, async (req, res) => {
  await Study.findByIdAndDelete(req.params.id)
  res.json("Deleted")
})

module.exports = router
