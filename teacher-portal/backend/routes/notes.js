const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Note = require("../models/Note");
require("dotenv").config();

const router = express.Router();

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileExtension = file.originalname.split('.').pop().toLowerCase(); // Get file extension
    return {
      folder: "notes",
      resource_type: "raw", // Store as a file (not an image)
      format: fileExtension, // Keeps the file type (ppt or pptx)
      public_id: file.originalname.split(".")[0], // Keeps original filename without extension
    };
  },
});








const upload = multer({ storage });

// 🟢 Fetch all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Note.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects", error });
  }
});

// 🔵 Add a new subject
router.post("/", async (req, res) => {
  try {
    const { subject, units } = req.body;
    const newSubject = new Note({ subject, units });
    await newSubject.save();
    res.json(newSubject);
  } catch (error) {
    res.status(500).json({ message: "Error adding subject", error });
  }
});

// 🔵 Add a unit with file upload to Cloudinary
router.post("/upload/:subjectId", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File is required!" });

    const { unit_name } = req.body;
    const subject = await Note.findById(req.params.subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const fileLink = req.file.path; 
    // ✅ Ensure correct Cloudinary URL
    console.log("Uploaded PDF URL:", fileLink); // Debugging

    const newUnit = { unit_name, pdf_link: fileLink };
    subject.units.push(newUnit);
    await subject.save();

    res.json(subject);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading unit", error });
  }
});


// 🟠 Update a subject
router.put("/:id", async (req, res) => {
  try {
    const { subject, units } = req.body;
    const updatedSubject = await Note.findByIdAndUpdate(
      req.params.id,
      { subject, units },
      { new: true }
    );
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Error updating subject", error });
  }
});

// 🔴 Delete a subject
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subject", error });
  }
});

module.exports = router;
