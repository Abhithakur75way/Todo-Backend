import mongoose, { Document, Schema } from "mongoose";

// User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// User Schema
const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// User Model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
