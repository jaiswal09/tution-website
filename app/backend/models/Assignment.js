const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  fee: { type: Number, required: true },
  status: { type: String, required: true, enum: ["pending", "accepted", "denied", "completed"] },
  denyReason: String,
})

const Assignment = mongoose.model("Assignment", assignmentSchema)

module.exports = Assignment

