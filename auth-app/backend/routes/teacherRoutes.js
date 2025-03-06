const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const verifyTeacherToken = require("../middleware/authTeacher"); // Import middleware

const router = express.Router();
const SECRET_KEY = "your_secret_key";

// 🔐 Teacher Login Route
router.post("/login", async (req, res) => {
  try {
    const { empid, password } = req.body;

    if (!empid || !password) {
      return res.status(400).json({ error: "Employee ID and password are required" });
    }

    const teacher = await Teacher.findOne({ empid });
    if (!teacher) {
      return res.status(400).json({ error: "Teacher not found!" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Employee ID or password!" });
    }

    const token = jwt.sign({ empid: teacher.empid, email: teacher.email }, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({ message: "✅ Login successful!", token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔒 Protected Teacher Route Example
router.get("/dashboard", verifyTeacherToken, (req, res) => {
  res.status(200).json({ message: "Welcome to Teacher Dashboard!", teacher: req.teacher });
});

module.exports = router;
