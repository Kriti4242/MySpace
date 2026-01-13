const router = require("express").Router()
const Note = require("../models/Note")
const auth = require("../middleware/auth")

// Get notes
router.get("/", auth, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id })
  res.json(notes)
})

// Add note
router.post("/", auth, async (req, res) => {
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.user.id
  })
  res.json(note)
})

// Delete note
router.delete("/:id", auth, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.json("Deleted")
})

router.patch("/:id", auth, async (req,res)=>{
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.json(note)
})

module.exports = router
