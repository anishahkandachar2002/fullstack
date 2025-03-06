const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TeacherSchema = new mongoose.Schema({
  empid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;
