import mongoose, { type Document, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "admin" | "tutor" | "parent"
  subjects?: string[]
  experience?: string
  childName?: string
  childAge?: number
  profilePicture?: string
  matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "tutor", "parent"] },
  subjects: [String],
  experience: String,
  childName: String,
  childAge: Number,
  profilePicture: String,
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<IUser>("User", userSchema)

export default User

