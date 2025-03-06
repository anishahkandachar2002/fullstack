const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Teacher", teacherSchema);
