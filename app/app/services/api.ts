import axios from "axios"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import Assignment from "@/models/Assignment"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const login = async (email: string, password: string) => {
  await dbConnect()
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    return { data: { token: "dummy-token", role: user.role } }
  }
  throw new Error("Invalid email or password")
}

export const register = async (userData: any) => {
  await dbConnect()
  const user = await User.create(userData)
  return { data: { token: "dummy-token", role: user.role } }
}

export const getUserProfile = async () => {
  await dbConnect()
  // In a real app, you'd get the user ID from the token
  const user = await User.findOne().select("-password")
  return { data: user }
}

export const updateUserProfile = async (userData: any) => {
  await dbConnect()
  // In a real app, you'd get the user ID from the token
  const user = await User.findOneAndUpdate({}, userData, { new: true }).select("-password")
  return { data: user }
}

export const getAssignments = async () => {
  await dbConnect()
  const assignments = await Assignment.find().populate("student", "name").populate("tutor", "name")
  return { data: assignments }
}

export const createAssignment = async (assignmentData: any) => {
  await dbConnect()
  const assignment = await Assignment.create(assignmentData)
  return { data: assignment }
}

export const updateAssignmentStatus = async (id: string, status: string, denyReason?: string) => {
  await dbConnect()
  const assignment = await Assignment.findByIdAndUpdate(id, { status, denyReason }, { new: true })
  return { data: assignment }
}

export const getTutorAssignments = async () => {
  await dbConnect()
  // In a real app, you'd get the tutor ID from the token
  const tutor = await User.findOne({ role: "tutor" })
  const assignments = await Assignment.find({ tutor: tutor._id }).populate("student", "name")
  return { data: assignments }
}

export const getParentAssignments = async () => {
  await dbConnect()
  // In a real app, you'd get the parent ID from the token
  const parent = await User.findOne({ role: "parent" })
  const assignments = await Assignment.find({ student: parent._id }).populate("tutor", "name")
  return { data: assignments }
}

export default api

