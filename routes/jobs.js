const router = require("express").Router()
const Job = require("../models/Job")
const auth = require("../middleware/auth")

// Get all jobs
router.get("/", auth, async (req, res) => {
  const jobs = await Job.find({ userId: req.user.id })
  res.json(jobs)
})

// Add job
router.post("/", auth, async (req, res) => {
  const job = await Job.create({
    company: req.body.company,
    role: req.body.role,
    status: req.body.status,
    userId: req.user.id
  })
  res.json(job)
})

// Delete job
router.delete("/:id", auth, async (req, res) => {
  await Job.findByIdAndDelete(req.params.id)
  res.json("Deleted")
})

router.patch("/:id", auth, async (req, res) => {
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  )
  res.json(job)
})



module.exports = router
