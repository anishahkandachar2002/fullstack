const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  unit_number: Number,
  unit_name: String,
  pdf_link: String,
});

const subjectSchema = new mongoose.Schema({
  subject: { type: String, required: true, unique: true },
  units: [unitSchema],
});

// Ensure it uses "notes" collection inside "auth-app"
module.exports = mongoose.model("Note", subjectSchema, "notes");
