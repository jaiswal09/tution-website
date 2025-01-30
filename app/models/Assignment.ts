import mongoose, { type Document, Schema } from "mongoose"

export interface IAssignment extends Document {
  student: mongoose.Types.ObjectId
  tutor: mongoose.Types.ObjectId
  subject: string
  fee: number
  status: "pending" | "accepted" | "denied" | "completed"
  denyReason?: string
}

const assignmentSchema = new Schema<IAssignment>({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tutor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  fee: { type: Number, required: true },
  status: { type: String, required: true, enum: ["pending", "accepted", "denied", "completed"] },
  denyReason: String,
})

const Assignment = mongoose.model<IAssignment>("Assignment", assignmentSchema)

export default Assignment

