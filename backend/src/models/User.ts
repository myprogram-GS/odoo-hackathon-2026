import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  companyName: { type: String },
  country: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    default: "employee"
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);