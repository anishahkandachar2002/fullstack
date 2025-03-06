const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  subject: { type: String, required: true },
  unit: { type: String, required: true },
  pdfUrl: { type: String, required: true },
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
