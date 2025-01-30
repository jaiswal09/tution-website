const User = require("../models/User")
const generateToken = require("../utils/generateToken")

exports.registerUser = async (req, res) => {
  const { name, email, password, role, subjects, experience, childName, childAge, profilePicture } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    subjects,
    experience,
    childName,
    childAge,
    profilePicture,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ message: "Invalid user data" })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ message: "Invalid email or password" })
  }
}

