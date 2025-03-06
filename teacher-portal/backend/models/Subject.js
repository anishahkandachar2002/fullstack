const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subject: String,
  units: [{ unit_number: Number, unit_name: String, pdf_link: String }],
});

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
