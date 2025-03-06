const express = require("express");
const Note = require("../models/Note"); // Ensure this model exists
const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

// Add a new note
router.post("/", async (req, res) => {
  try {
    const { teacherId, subject, unit, pdfUrl } = req.body;

    const newNote = new Note({ teacherId, subject, unit, pdfUrl });
    await newNote.save();

    res.json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error adding note", error });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const { subject, unit, pdfUrl } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { subject, unit, pdfUrl },
      { new: true }
    );

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

module.exports = router;
