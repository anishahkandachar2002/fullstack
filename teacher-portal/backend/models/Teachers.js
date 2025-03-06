import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },  // ✅ Teacher's Name
  employeeID: { type: String, required: true },  // ❌ Removed unique constraint
  password: { type: String, required: true },  // ✅ Hashed Password
}, { timestamps: true });

export default mongoose.model("Teacher", TeacherSchema);
