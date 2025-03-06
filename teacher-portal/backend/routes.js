const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("./models");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, employeeID, password } = req.body;

  try {
    let teacher = await Teacher.findOne({ employeeID });
    if (teacher) return res.status(400).json({ message: "Employee ID already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    teacher = new Teacher({ name, employeeID, password: hashedPassword });
    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { employeeID, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ employeeID });
    if (!teacher) return res.status(400).json({ message: "Invalid Employee ID" });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: teacher.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, teacher: { name: teacher.name, employeeID: teacher.employeeID } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
