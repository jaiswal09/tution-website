const express = require("express")
const router = express.Router()
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignmentStatus,
  getTutorAssignments,
  getParentAssignments,
} = require("../controllers/assignmentController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").post(protect, admin, createAssignment).get(protect, admin, getAssignments)
router.route("/:id").get(protect, getAssignmentById).put(protect, updateAssignmentStatus)
router.route("/tutor").get(protect, getTutorAssignments)
router.route("/parent").get(protect, getParentAssignments)

module.exports = router

