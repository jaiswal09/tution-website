const Assignment = require("../models/Assignment")
const User = require("../models/User")

exports.createAssignment = async (req, res) => {
  const { studentId, tutorId, subject, fee } = req.body

  const assignment = new Assignment({
    student: studentId,
    tutor: tutorId,
    subject,
    fee,
    status: "pending",
  })

  const createdAssignment = await assignment.save()

  res.status(201).json(createdAssignment)
}

exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find({}).populate("student", "name").populate("tutor", "name")
  res.json(assignments)
}

exports.getAssignmentById = async (req, res) => {
  const assignment = await Assignment.findById(req.params.id).populate("student", "name").populate("tutor", "name")

  if (assignment) {
    res.json(assignment)
  } else {
    res.status(404).json({ message: "Assignment not found" })
  }
}

exports.updateAssignmentStatus = async (req, res) => {
  const { status, denyReason } = req.body

  const assignment = await Assignment.findById(req.params.id)

  if (assignment) {
    assignment.status = status
    if (status === "denied") {
      assignment.denyReason = denyReason
    }

    const updatedAssignment = await assignment.save()
    res.json(updatedAssignment)
  } else {
    res.status(404).json({ message: "Assignment not found" })
  }
}

exports.getTutorAssignments = async (req, res) => {
  const assignments = await Assignment.find({ tutor: req.user._id })
    .populate("student", "name")
    .populate("tutor", "name")
  res.json(assignments)
}

exports.getParentAssignments = async (req, res) => {
  const assignments = await Assignment.find({ student: req.user._id })
    .populate("student", "name")
    .populate("tutor", "name")
  res.json(assignments)
}

