const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const hashed = await bcrypt.hash(password, 10)

    await User.create({
      name,
      email,
      password: hashed
    })

    res.json({ message: "User Registered" })
  } catch (err) {
    res.status(400).json({ message: "Email already exists" })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ message: "User not found" })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(400).json({ message: "Wrong password" })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  })
})

module.exports = router

const auth = require("../middleware/auth")

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password")
  res.json(user)
})

const crypto = require("crypto")

router.post("/forgot-password", async (req,res)=>{
  const {email} = req.body
  const user = await User.findOne({email})
  if(!user) return res.status(404).json({message:"User not found"})

  const token = crypto.randomBytes(32).toString("hex")

  user.resetToken = token
  user.resetTokenExpiry = Date.now() + 15*60*1000
  await user.save()

  console.log("RESET LINK:")
  console.log(`http://localhost:3000/reset/${token}`)

  res.json({message:"Reset link sent to email"})
})

router.post("/reset-password/:token", async (req,res)=>{
  const {token} = req.params
  const {password} = req.body

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: {$gt: Date.now()}
  })

  if(!user) return res.status(400).json({message:"Token expired"})

  user.password = await bcrypt.hash(password,10)
  user.resetToken = null
  user.resetTokenExpiry = null
  await user.save()

  res.json({message:"Password updated"})
})
