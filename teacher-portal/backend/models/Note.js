const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  units: [
    {
      unit_name: { type: String, required: true },
      pdf_link: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Note", NoteSchema);
