const User = require("../models/User")

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      subjects: user.subjects,
      experience: user.experience,
      childName: user.childName,
      childAge: user.childAge,
      profilePicture: user.profilePicture,
    })
  } else {
    res.status(404).json({ message: "User not found" })
  }
}

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.subjects = req.body.subjects || user.subjects
    user.experience = req.body.experience || user.experience
    user.childName = req.body.childName || user.childName
    user.childAge = req.body.childAge || user.childAge
    user.profilePicture = req.body.profilePicture || user.profilePicture

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      subjects: updatedUser.subjects,
      experience: updatedUser.experience,
      childName: updatedUser.childName,
      childAge: updatedUser.childAge,
      profilePicture: updatedUser.profilePicture,
    })
  } else {
    res.status(404).json({ message: "User not found" })
  }
}

exports.getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

