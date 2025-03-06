const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define Notes Schema
const NoteSchema = new mongoose.Schema({
  subject: String,
  units: [
    {
      unit_number: Number,
      unit_name: String,
      pdf_link: String
    }
  ]
});

const Note = mongoose.model("notes", NoteSchema); // Collection name is 'notes'

// ✅ API to Fetch Notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

module.exports = router;
